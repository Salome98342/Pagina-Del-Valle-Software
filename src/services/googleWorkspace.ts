import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { VisitRequestForm } from '../types';

// Reuse existing Firebase app instance if already initialized
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Provider with required Google Workspace scopes
export const googleProvider = new GoogleAuthProvider();
export const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/spreadsheets',
];

SCOPES.forEach((scope) => {
  googleProvider.addScope(scope);
});

// Flag to track sign-in state
let isSigningIn = false;
// Token cached ONLY in-memory (per security guidelines)
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    if (
      error?.code === 'auth/popup-closed-by-user' ||
      error?.code === 'auth/cancelled-popup-request'
    ) {
      // User closed the popup or cancelled the sign-in prompt; return null gracefully
      return null;
    }
    console.warn('Aviso en inicio de sesión con Google:', error?.message || error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Creates an event in user's primary Google Calendar via Google Calendar API v3
 */
export const createGoogleCalendarEvent = async (
  token: string,
  formData: VisitRequestForm
): Promise<{ id: string; htmlLink: string }> => {
  const startDateTime = new Date(`${formData.date}T${formData.time || '10:00'}:00`);
  // Default meeting duration: 45 minutes
  const endDateTime = new Date(startDateTime.getTime() + 45 * 60 * 1000);

  const summary = `Visita Diagnóstico Tecnológico - Del Valle Software (${formData.company || formData.name})`;
  const description = [
    `Solicitud de Asesoría Tecnológica con Del Valle Software`,
    `Cliente: ${formData.name}`,
    `Empresa: ${formData.company || 'Independiente'}`,
    `Teléfono / WhatsApp: ${formData.phone}`,
    formData.email ? `Email: ${formData.email}` : '',
    `Servicio requerido: ${formData.serviceType}`,
    `Modalidad: ${formData.meetingType === 'virtual' ? 'Reunión Virtual (Google Meet)' : 'Visita Presencial'}`,
    `Detalles del proyecto: ${formData.projectDetails}`,
    `Contacto directo Del Valle Software: +57 318 4235926`,
  ]
    .filter(Boolean)
    .join('\n');

  const eventPayload: any = {
    summary,
    description,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Bogota',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Bogota',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  if (formData.email) {
    eventPayload.attendees = [{ email: formData.email }];
  }

  if (formData.meetingType === 'virtual') {
    eventPayload.conferenceData = {
      createRequest: {
        requestId: `dvs-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    };
  }

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Error al crear evento en Google Calendar (${response.status})`
    );
  }

  const data = await response.json();
  return { id: data.id, htmlLink: data.htmlLink };
};

/**
 * Creates or appends a visit inquiry into a Google Spreadsheet using Google Sheets API v4
 */
export const logInquiryToGoogleSheets = async (
  token: string,
  formData: VisitRequestForm,
  existingSpreadsheetId?: string
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  let spreadsheetId = existingSpreadsheetId;
  let spreadsheetUrl = '';

  const timestamp = new Date().toLocaleString('es-CO');
  const rowValues = [
    timestamp,
    formData.name,
    formData.company || 'N/A',
    formData.phone,
    formData.email || 'N/A',
    formData.serviceType,
    formData.meetingType,
    `${formData.date} ${formData.time}`,
    formData.projectDetails,
    'Pendiente de Visita',
  ];

  // If no spreadsheet ID is provided, create a dedicated new spreadsheet
  if (!spreadsheetId) {
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title: `Del Valle Software - Solicitudes y Visitas (${new Date().toLocaleDateString('es-CO')})`,
        },
        sheets: [
          {
            properties: {
              title: 'Solicitudes Clientes',
              gridProperties: { rowCount: 100, columnCount: 10 },
            },
            data: [
              {
                startRow: 0,
                startColumn: 0,
                rowData: [
                  {
                    values: [
                      { userEnteredValue: { stringValue: 'Fecha de Registro' } },
                      { userEnteredValue: { stringValue: 'Nombre' } },
                      { userEnteredValue: { stringValue: 'Empresa' } },
                      { userEnteredValue: { stringValue: 'Teléfono' } },
                      { userEnteredValue: { stringValue: 'Email' } },
                      { userEnteredValue: { stringValue: 'Servicio de Interés' } },
                      { userEnteredValue: { stringValue: 'Modalidad' } },
                      { userEnteredValue: { stringValue: 'Fecha y Hora Cita' } },
                      { userEnteredValue: { stringValue: 'Detalles del Proyecto' } },
                      { userEnteredValue: { stringValue: 'Estado' } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json().catch(() => ({}));
      throw new Error(err.error?.message || 'Error al crear Google Sheet');
    }

    const sheetData = await createRes.json();
    spreadsheetId = sheetData.spreadsheetId;
    spreadsheetUrl = sheetData.spreadsheetUrl;
  }

  // Append data row
  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range: 'A1',
        majorDimension: 'ROWS',
        values: [rowValues],
      }),
    }
  );

  if (!appendRes.ok) {
    const err = await appendRes.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Error al agregar registro en Google Sheets');
  }

  return {
    spreadsheetId: spreadsheetId!,
    spreadsheetUrl: spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
  };
};

/**
 * Universal fallback link to add to Google Calendar without OAuth login
 */
export const buildGoogleCalendarWebUrl = (formData: VisitRequestForm): string => {
  const start = new Date(`${formData.date}T${formData.time || '10:00'}:00`);
  const end = new Date(start.getTime() + 45 * 60 * 1000);

  const formatCalTime = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d+/g, '');

  const dates = `${formatCalTime(start)}/${formatCalTime(end)}`;
  const title = encodeURIComponent(`Visita Diagnóstico Del Valle Software - ${formData.company || formData.name}`);
  const details = encodeURIComponent(
    `Reunión de asesoría y diagnóstico tecnológico con Del Valle Software.\n` +
      `Cliente: ${formData.name} (${formData.phone})\n` +
      `Servicio: ${formData.serviceType}\n` +
      `Detalles: ${formData.projectDetails}\n` +
      `Contacto Del Valle Software: +57 318 4235926`
  );
  const location = encodeURIComponent(
    formData.meetingType === 'virtual' ? 'Reunión Virtual (Google Meet / WhatsApp)' : 'Oficina del Cliente / Presencial'
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
};
