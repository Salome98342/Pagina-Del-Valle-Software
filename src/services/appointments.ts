import { VisitRequestForm } from '../types';

export interface AppointmentResult {
  calendarUrl: string;
  meetUrl: string;
  location: string;
}

const apiBaseUrl = import.meta.env.VITE_APPOINTMENT_API_URL || '/api';

export const createAppointment = async (formData: VisitRequestForm): Promise<AppointmentResult> => {
  const response = await fetch(`${apiBaseUrl}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'No se pudo agendar la cita.');
  }

  return payload;
};
