import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const config = process.env;
const TIME_ZONE = 'America/Bogota';
const OFFICE_ADDRESS = 'Calle 12';
const DURATION_MINUTES = 45;
const COMPANY_EMAIL = config.APPOINTMENT_COMPANY_EMAIL || config.COMPANY_EMAIL;
const CALENDAR_ID = config.COMPANY_CALENDAR_ID || config.GOOGLE_CALENDAR_ID;
const TOKEN_FILE = path.resolve('private', 'google-calendar-token.json');
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/calendar.events openid email';
let oauthState = '';

const requireSettings = (keys, label) => {
  const missing = keys.filter((key) => !config[key]);
  if (missing.length) throw new Error(`Faltan variables de ${label}: ${missing.join(', ')}`);
};

const getOAuthSettings = () => {
  requireSettings(['GOOGLE_OAUTH_CLIENT_ID', 'GOOGLE_OAUTH_CLIENT_SECRET', 'GOOGLE_OAUTH_REDIRECT_URI'], 'OAuth de Google');
  if (!CALENDAR_ID) throw new Error('Falta COMPANY_CALENDAR_ID.');
};

const readGoogleToken = async () => {
  try {
    return JSON.parse(await fs.readFile(TOKEN_FILE, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
};

const saveGoogleToken = async (token) => {
  await fs.mkdir(path.dirname(TOKEN_FILE), { recursive: true });
  await fs.writeFile(TOKEN_FILE, JSON.stringify(token), { mode: 0o600 });
};

const requestGoogleToken = async (params) => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error(data.error_description || 'No fue posible autorizar Google Calendar.');
  return data;
};

const getGoogleToken = async () => {
  getOAuthSettings();
  const token = await readGoogleToken();
  if (!token?.refresh_token) {
    throw new Error('Google Calendar no está conectado. Abre /api/google/connect e inicia sesión con el correo de la empresa.');
  }
  if (token.access_token && token.expires_at > Date.now() + 60000) return token.access_token;
  const refreshed = await requestGoogleToken({
    client_id: config.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: config.GOOGLE_OAUTH_CLIENT_SECRET,
    refresh_token: token.refresh_token,
    grant_type: 'refresh_token',
  });
  await saveGoogleToken({ ...token, access_token: refreshed.access_token, expires_at: Date.now() + refreshed.expires_in * 1000 });
  return refreshed.access_token;
};

const startAt = (date, time) => `${date}T${time}:00-05:00`;
const endAt = (date, time) => {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const end = new Date(Date.UTC(year, month - 1, day, hours, minutes + DURATION_MINUTES));
  const pad = (value) => String(value).padStart(2, '0');
  return `${end.getUTCFullYear()}-${pad(end.getUTCMonth() + 1)}-${pad(end.getUTCDate())}T${pad(end.getUTCHours())}:${pad(end.getUTCMinutes())}:00-05:00`;
};

const createCalendarEvent = async (appointment) => {
  const accessToken = await getGoogleToken();
  const virtual = appointment.meetingType === 'virtual';
  const description = [
    'Solicitud de asesoría tecnológica - Del Valle Software',
    `Cliente: ${appointment.name}`,
    `Empresa: ${appointment.company || 'Independiente'}`,
    `Teléfono / WhatsApp: ${appointment.phone}`,
    `Correo: ${appointment.email}`,
    `Servicio: ${appointment.serviceType}`,
    `Modalidad: ${virtual ? 'Reunión virtual por Google Meet' : 'Visita presencial'}`,
    `Dirección: ${virtual ? 'Google Meet (enlace incluido en el evento)' : OFFICE_ADDRESS}`,
    `Detalles: ${appointment.projectDetails || 'Sin detalles adicionales'}`,
  ].join('\n');
  const event = {
    summary: `Visita de diagnóstico - ${appointment.company || appointment.name}`,
    description,
    location: virtual ? 'Google Meet' : OFFICE_ADDRESS,
    start: { dateTime: startAt(appointment.date, appointment.time), timeZone: TIME_ZONE },
    end: { dateTime: endAt(appointment.date, appointment.time), timeZone: TIME_ZONE },
    attendees: [{ email: appointment.email }, { email: COMPANY_EMAIL }],
    reminders: { useDefault: true },
    ...(virtual ? { conferenceData: { createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } } } } : {}),
  };
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?conferenceDataVersion=1&sendUpdates=all`,
    { method: 'POST', headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify(event) }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'No fue posible crear el evento de Calendar.');
  return {
    calendarUrl: data.htmlLink,
    meetUrl: data.conferenceData?.entryPoints?.find((item) => item.entryPointType === 'video')?.uri || '',
  };
};

const icsDate = (value) => value.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escapeIcs = (value = '') => String(value).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
const calendarAttachment = (appointment, calendar) => {
  const start = new Date(startAt(appointment.date, appointment.time));
  const end = new Date(start.getTime() + DURATION_MINUTES * 60000);
  const virtual = appointment.meetingType === 'virtual';
  const details = `Servicio: ${appointment.serviceType}\nCliente: ${appointment.name}\nTeléfono: ${appointment.phone}\n${virtual ? `Enlace de Meet: ${calendar.meetUrl}` : `Dirección: ${OFFICE_ADDRESS}`}`;
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Del Valle Software//Citas//ES', 'METHOD:REQUEST', 'BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}@delvallesoftware.com`, `DTSTAMP:${icsDate(new Date())}`, `DTSTART:${icsDate(start)}`, `DTEND:${icsDate(end)}`,
    `SUMMARY:${escapeIcs(`Visita de diagnóstico - ${appointment.company || appointment.name}`)}`, `DESCRIPTION:${escapeIcs(details)}`,
    `LOCATION:${escapeIcs(virtual ? calendar.meetUrl : OFFICE_ADDRESS)}`, `URL:${calendar.meetUrl || calendar.calendarUrl}`,
    `ATTENDEE;CN=${escapeIcs(appointment.name)}:mailto:${appointment.email}`, `ATTENDEE;CN=Del Valle Software:mailto:${COMPANY_EMAIL}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
};

const sendEmails = async (appointment, calendar) => {
  requireSettings(['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'], 'correo');
  if (!COMPANY_EMAIL) throw new Error('Falta el correo de la empresa.');
  const virtual = appointment.meetingType === 'virtual';
  const detail = virtual ? `Enlace de Google Meet: ${calendar.meetUrl}` : `Dirección: ${OFFICE_ADDRESS}`;
  const transporter = nodemailer.createTransport({ host: config.SMTP_HOST, port: Number(config.SMTP_PORT), secure: Number(config.SMTP_PORT) === 465, auth: { user: config.SMTP_USER, pass: config.SMTP_PASS } });
  await transporter.sendMail({
    from: config.SMTP_FROM, to: [appointment.email, COMPANY_EMAIL].join(','), subject: `Cita confirmada - ${appointment.company || appointment.name}`,
    text: `Hola ${appointment.name},\n\nTu cita con Del Valle Software fue agendada.\n\nServicio: ${appointment.serviceType}\nFecha: ${appointment.date}\nHora: ${appointment.time}\nModalidad: ${virtual ? 'Google Meet' : 'Presencial'}\n${detail}\n\nAdjuntamos la invitación de calendario.`,
    html: `<div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6"><h2>Cita confirmada</h2><p>Hola <strong>${appointment.name}</strong>,</p><p>Tu cita con Del Valle Software fue agendada.</p><ul><li><strong>Servicio:</strong> ${appointment.serviceType}</li><li><strong>Fecha:</strong> ${appointment.date}</li><li><strong>Hora:</strong> ${appointment.time}</li><li><strong>Modalidad:</strong> ${virtual ? 'Google Meet' : 'Presencial'}</li><li><strong>${virtual ? 'Enlace de Meet' : 'Dirección'}:</strong> ${virtual ? `<a href="${calendar.meetUrl}">${calendar.meetUrl}</a>` : OFFICE_ADDRESS}</li></ul><p>Se adjunta la invitación para tu calendario.</p></div>`,
    attachments: [{ filename: 'cita-del-valle.ics', content: calendarAttachment(appointment, calendar), contentType: 'text/calendar; charset=utf-8; method=REQUEST' }],
  });
};

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/api/google/status', async (_req, res) => {
  const token = await readGoogleToken();
  res.json({ connected: Boolean(token?.refresh_token), email: token?.email || '' });
});
app.get('/api/google/connect', (_req, res) => {
  try {
    getOAuthSettings();
    oauthState = crypto.randomUUID();
    const authorizationUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authorizationUrl.search = new URLSearchParams({ client_id: config.GOOGLE_OAUTH_CLIENT_ID, redirect_uri: config.GOOGLE_OAUTH_REDIRECT_URI, response_type: 'code', scope: GOOGLE_SCOPE, access_type: 'offline', prompt: 'consent', state: oauthState }).toString();
    res.redirect(authorizationUrl.toString());
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'No se pudo iniciar la conexión con Google.');
  }
});
app.get('/api/google/callback', async (req, res) => {
  try {
    if (!req.query.code || req.query.state !== oauthState) throw new Error('La autorización de Google no es válida. Inténtalo otra vez.');
    getOAuthSettings();
    const token = await requestGoogleToken({ code: String(req.query.code), client_id: config.GOOGLE_OAUTH_CLIENT_ID, client_secret: config.GOOGLE_OAUTH_CLIENT_SECRET, redirect_uri: config.GOOGLE_OAUTH_REDIRECT_URI, grant_type: 'authorization_code' });
    const identity = JSON.parse(Buffer.from(token.id_token.split('.')[1], 'base64url').toString());
    if (COMPANY_EMAIL && identity.email !== COMPANY_EMAIL) throw new Error(`Inicia sesión únicamente con ${COMPANY_EMAIL}.`);
    await saveGoogleToken({ refresh_token: token.refresh_token, access_token: token.access_token, expires_at: Date.now() + token.expires_in * 1000, email: identity.email });
    oauthState = '';
    res.send('<h2>Google Calendar conectado correctamente.</h2><p>Ya puedes cerrar esta ventana y agendar citas desde la página.</p>');
  } catch (error) {
    res.status(400).send(`<h2>No se pudo conectar Google Calendar</h2><p>${error instanceof Error ? error.message : 'Error desconocido.'}</p>`);
  }
});
app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = req.body;
    if (!appointment?.name || !appointment?.phone || !appointment?.email || !appointment?.date || !appointment?.time) return res.status(400).json({ ok: false, message: 'Nombre, teléfono, correo, fecha y hora son obligatorios.' });
    const calendar = await createCalendarEvent(appointment);
    await sendEmails(appointment, calendar);
    return res.status(201).json({ ok: true, ...calendar, location: appointment.meetingType === 'virtual' ? calendar.meetUrl : OFFICE_ADDRESS });
  } catch (error) {
    console.error('Error al agendar cita:', error);
    return res.status(500).json({ ok: false, message: error instanceof Error ? error.message : 'No se pudo agendar la cita.' });
  }
});

const port = Number(config.PORT || 4000);
app.listen(port, () => console.log(`Appointment service listening on http://localhost:${port}`));
