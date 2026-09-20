import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

const TIME_ZONE = 'America/Bogota';
const OFFICE_ADDRESS = process.env.OFFICE_ADDRESS || 'Calle 12';
const DURATION_MINUTES = 45;

const required = (value, label) => {
  if (!value) throw new Error(`Falta la variable ${label}.`);
  return value;
};

const getAccessToken = async () => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: required(process.env.GOOGLE_OAUTH_CLIENT_ID, 'GOOGLE_OAUTH_CLIENT_ID'),
      client_secret: required(process.env.GOOGLE_OAUTH_CLIENT_SECRET, 'GOOGLE_OAUTH_CLIENT_SECRET'),
      refresh_token: required(process.env.GOOGLE_REFRESH_TOKEN, 'GOOGLE_REFRESH_TOKEN'),
      grant_type: 'refresh_token',
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error(data.error_description || 'No fue posible autorizar Google Calendar.');
  return data.access_token;
};

const eventDateTime = (date, time) => `${date}T${time}:00-05:00`;
const endDateTime = (date, time) => {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const end = new Date(Date.UTC(year, month - 1, day, hours, minutes + DURATION_MINUTES));
  const pad = (value) => String(value).padStart(2, '0');
  return `${end.getUTCFullYear()}-${pad(end.getUTCMonth() + 1)}-${pad(end.getUTCDate())}T${pad(end.getUTCHours())}:${pad(end.getUTCMinutes())}:00-05:00`;
};

const createCalendarEvent = async (appointment, companyEmail, calendarId) => {
  const accessToken = await getAccessToken();
  const virtual = appointment.meetingType === 'virtual';
  const event = {
    summary: `Visita de diagnóstico - ${appointment.company || appointment.name}`,
    description: [
      'Solicitud de asesoría tecnológica - Del Valle Software',
      `Cliente: ${appointment.name}`,
      `Empresa: ${appointment.company || 'Independiente'}`,
      `Teléfono / WhatsApp: ${appointment.phone}`,
      `Correo: ${appointment.email}`,
      `Servicio: ${appointment.serviceType || 'No especificado'}`,
      `Modalidad: ${virtual ? 'Reunión virtual por Google Meet' : 'Visita presencial'}`,
      `Detalles: ${appointment.projectDetails || 'Sin detalles adicionales'}`,
    ].join('\n'),
    location: virtual ? 'Google Meet' : OFFICE_ADDRESS,
    start: { dateTime: eventDateTime(appointment.date, appointment.time), timeZone: TIME_ZONE },
    end: { dateTime: endDateTime(appointment.date, appointment.time), timeZone: TIME_ZONE },
    attendees: [{ email: appointment.email }, { email: companyEmail }],
    reminders: { useDefault: true },
    ...(virtual ? { conferenceData: { createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } } } } : {}),
  };
  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`, {
    method: 'POST', headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify(event),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'No fue posible crear el evento de Calendar.');
  return { calendarUrl: data.htmlLink, meetUrl: data.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === 'video')?.uri || '' };
};

const sendConfirmationEmail = async (appointment, calendar, companyEmail) => {
  const transporter = nodemailer.createTransport({
    host: required(process.env.SMTP_HOST, 'SMTP_HOST'),
    port: Number(required(process.env.SMTP_PORT, 'SMTP_PORT')),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: required(process.env.SMTP_USER, 'SMTP_USER'), pass: required(process.env.SMTP_PASS, 'SMTP_PASS') },
  });
  const virtual = appointment.meetingType === 'virtual';
  const place = virtual ? `Enlace de Google Meet: ${calendar.meetUrl}` : `Dirección: ${OFFICE_ADDRESS}`;
  await transporter.sendMail({
    from: required(process.env.SMTP_FROM, 'SMTP_FROM'), to: [appointment.email, companyEmail].join(','),
    subject: `Cita confirmada - ${appointment.company || appointment.name}`,
    text: `Hola ${appointment.name},\n\nTu cita con Del Valle Software fue agendada.\n\nServicio: ${appointment.serviceType || 'No especificado'}\nFecha: ${appointment.date}\nHora: ${appointment.time}\nModalidad: ${virtual ? 'Google Meet' : 'Presencial'}\n${place}`,
  });
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Método no permitido.' });
  try {
    const appointment = req.body || {};
    if (!appointment.name || !appointment.phone || !appointment.email || !appointment.date || !appointment.time) {
      return res.status(400).json({ ok: false, message: 'Nombre, teléfono, correo, fecha y hora son obligatorios.' });
    }
    const companyEmail = required(process.env.APPOINTMENT_COMPANY_EMAIL || process.env.COMPANY_EMAIL, 'COMPANY_EMAIL');
    const calendarId = required(process.env.COMPANY_CALENDAR_ID || process.env.GOOGLE_CALENDAR_ID, 'COMPANY_CALENDAR_ID');
    const calendar = await createCalendarEvent(appointment, companyEmail, calendarId);
    await sendConfirmationEmail(appointment, calendar, companyEmail);
    return res.status(201).json({ ok: true, ...calendar, location: appointment.meetingType === 'virtual' ? calendar.meetUrl : OFFICE_ADDRESS });
  } catch (error) {
    console.error('Error al agendar cita:', error);
    return res.status(500).json({ ok: false, message: error instanceof Error ? error.message : 'No se pudo agendar la cita.' });
  }
}
