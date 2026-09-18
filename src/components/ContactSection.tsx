import React, { useState, useEffect } from 'react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, SERVICES_DATA } from '../data/companyData';
import { VisitRequestForm } from '../types';
import {
  googleSignIn,
  initAuth,
  getAccessToken,
  createGoogleCalendarEvent,
  logInquiryToGoogleSheets,
  buildGoogleCalendarWebUrl,
} from '../services/googleWorkspace';
import { User } from 'firebase/auth';
import {
  PhoneCall,
  Calendar as CalendarIcon,
  MessageCircle,
  CheckCircle2,
  Video,
  MapPin,
  ExternalLink,
  Info,
} from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { ContactStatusBanner, StatusMessage, StatusType } from './ui/ContactStatusBanner';
import { PANEL_CARD, SOFT_PANEL, CTA_BUTTON } from './ui/uiTokens';

interface ContactSectionProps {
  selectedServicePreset?: string;
}

const FORM_FIELD_CLASS =
  'w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors';
const LABEL_CLASS = 'block text-xs font-semibold text-slate-300 mb-1.5';

const getTomorrowDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const buildWhatsAppText = (formData: VisitRequestForm) => {
  return [
    '*SOLICITUD DE ASESORÍA / VISITA - DEL VALLE SOFTWARE*',
    `👤 *Nombre:* ${formData.name || 'No especificado'}`,
    `🏢 *Empresa:* ${formData.company || 'Independiente'}`,
    `📱 *Teléfono:* ${formData.phone || 'No especificado'}`,
    formData.email ? `✉️ *Email:* ${formData.email}` : '',
    `💼 *Servicio de Interés:* ${formData.serviceType}`,
    `📅 *Modalidad:* ${formData.meetingType === 'virtual' ? 'Reunión Virtual (Google Meet)' : 'Visita Presencial'}`,
    `⏰ *Fecha y Hora solicitada:* ${formData.date} a las ${formData.time}`,
    `📝 *Detalles del Proyecto:* ${formData.projectDetails || 'Quiero conocer más información'}`,
  ]
    .filter(Boolean)
    .join('\n');
};

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedServicePreset }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const [formData, setFormData] = useState<VisitRequestForm>({
    name: '',
    company: '',
    phone: '',
    email: '',
    serviceType: selectedServicePreset || SERVICES_DATA[0].title,
    meetingType: 'virtual',
    date: getTomorrowDateString(),
    time: '10:00',
    projectDetails: '',
  });

  useEffect(() => {
    if (selectedServicePreset) {
      setFormData((prev) => ({ ...prev, serviceType: selectedServicePreset }));
    }
  }, [selectedServicePreset]);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser) => {
        setUser(currentUser);
        if (currentUser.email && !formData.email) {
          setFormData((prev) => ({
            ...prev,
            email: currentUser.email || '',
            name: prev.name || currentUser.displayName || '',
          }));
        }
      },
      () => {
        setUser(null);
      }
    );

    return () => unsubscribe();
  }, [formData.email]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    setStatusMessage(null);

    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setStatusMessage({
          type: 'info',
          text: `Conectado exitosamente como ${result.user.displayName || result.user.email}. Ahora puedes agendar directamente en Google Calendar y registrar en Google Sheets.`,
        });
      }
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
        const isAccessDenied =
          error?.code === 'auth/access_denied' ||
          String(error?.message || '').includes('access_denied') ||
          String(error?.message || '').includes('403');

        if (isAccessDenied) {
          setStatusMessage({
            type: 'info',
            text: 'Google bloqueó el acceso porque la app está en "Modo Prueba" en Google Cloud.',
            details:
              'Para que ese correo pueda iniciar sesión con la API, debes agregarlo como "Usuario de prueba" en Google Cloud Console. Sin embargo, no te preocupes: puedes agendar la cita y abrirla en Google Calendar con 1 solo clic sin permisos usando el enlace directo.',
            calendarUrl: buildGoogleCalendarWebUrl(formData),
          });
        } else {
          setStatusMessage({
            type: 'error',
            text: 'No se pudo completar la conexión con Google.',
            details: error.message || 'Verifica los permisos e intenta de nuevo.',
          });
        }
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSubmitWithGoogleWorkspace = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor ingresa al menos tu nombre y número de teléfono/WhatsApp.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const currentToken = await getAccessToken();

      if (currentToken && user) {
        let calendarLink = '';
        try {
          const calendarResult = await createGoogleCalendarEvent(currentToken, formData);
          calendarLink = calendarResult.htmlLink;
        } catch (calendarError: any) {
          console.warn('Calendar sync notice:', calendarError);
        }

        let sheetsLink = '';
        try {
          const sheetsResult = await logInquiryToGoogleSheets(currentToken, formData);
          sheetsLink = sheetsResult.spreadsheetUrl;
        } catch (sheetsError: any) {
          console.warn('Sheets sync notice:', sheetsError);
        }

        setStatusMessage({
          type: 'success',
          text: '¡Visita agendada y sincronizada con Google Workspace!',
          details:
            'Se ha creado la cita en Google Calendar y se ha registrado en Google Sheets. Puedes consultar el evento o notificar a WhatsApp para confirmación inmediata.',
          calendarUrl: calendarLink || buildGoogleCalendarWebUrl(formData),
          sheetsUrl: sheetsLink,
        });
        return;
      }

      const directUrl = buildGoogleCalendarWebUrl(formData);
      setStatusMessage({
        type: 'success',
        text: '¡Visita registrada con éxito en Del Valle Software!',
        details:
          'Hemos preparado tu cita para la fecha y hora seleccionada. Haz clic en "Añadir a Google Calendar" para guardarla en tu calendario sin necesidad de autorizaciones o envíanos los detalles por WhatsApp.',
        calendarUrl: directUrl,
      });
    } catch (error: any) {
      console.error('Error in workspace submission:', error);
      setStatusMessage({
        type: 'error',
        text: 'Ocurrió un detalle al procesar la solicitud.',
        details:
          error.message ||
          'Puedes usar el botón "Añadir a Google Calendar (Enlace Directo)" o escribirnos directamente a WhatsApp.',
        calendarUrl: buildGoogleCalendarWebUrl(formData),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = buildWhatsAppText(formData);
    const url = `https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const directCalendarUrl = buildGoogleCalendarWebUrl(formData);

  return (
    <section id="contacto" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          chip="Contacto & Agendamiento"
          title="Agenda tu visita o diagnóstico tecnológico"
          subtitle="Cuéntanos sobre tu negocio. Programamos una sesión de asesoría virtual o presencial y la conectamos a tu Google Calendar y Google Sheets."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className={`${PANEL_CARD} p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 shadow-xl space-y-6`}>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <PhoneCall className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Línea Directa Oficial
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-wide">{COMPANY_PHONE}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Atención personalizada con el equipo fundador de Del Valle Software. Puedes llamarnos o
                escribirnos de inmediato por WhatsApp para resolver dudas rápidas.
              </p>

              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chatear ahora por WhatsApp</span>
              </button>
            </div>

            <div className={`${SOFT_PANEL} p-5 text-xs sm:text-sm text-slate-300 space-y-2.5`}>
              <div className="flex items-center gap-2 text-sky-400 font-semibold">
                <Info className="w-4 h-4 shrink-0" />
                <span>Canales de Comunicación en Despliegue</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Actualmente nuestro canal oficial prioritario es telefónico y WhatsApp directo{' '}
                <strong className="text-slate-300">({COMPANY_PHONE})</strong>. Próximamente habilitaremos
                correos corporativos y redes sociales oficiales para complementar esta plataforma web.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/80 border border-sky-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                    <CalendarIcon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Google Workspace Habilitado</h4>
                    <span className="text-[11px] text-slate-400">Calendar & Sheets</span>
                  </div>
                </div>

                {user ? (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Conectado
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isAuthenticating}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 transition-colors"
                  >
                    {isAuthenticating ? 'Conectando...' : 'Conectar Google'}
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-400">
                Al enviar el formulario, agendaremos automáticamente el evento en tu calendario y
                organizaremos los detalles en una hoja de Google Sheets.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className={`${PANEL_CARD} p-6 sm:p-8 shadow-2xl space-y-6`}>
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">
                  Formulario de Solicitud de Visita & Diagnóstico
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Completa los campos para coordinar el horario más cómodo para tu equipo.
                </p>
              </div>

              {statusMessage && <ContactStatusBanner {...statusMessage} />}

              <form onSubmit={handleSubmitWithGoogleWorkspace} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL_CLASS}>
                      Nombre Completo <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ej: Carlos Gómez"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={FORM_FIELD_CLASS}
                    />
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>Empresa o Negocio</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Ej: Distribuidora del Valle"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={FORM_FIELD_CLASS}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL_CLASS}>
                      Teléfono / WhatsApp <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Ej: +57 300 1234567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={FORM_FIELD_CLASS}
                    />
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>Correo Electrónico (para invitación de calendario)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={FORM_FIELD_CLASS}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL_CLASS}>Servicio Principal de Interés</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className={FORM_FIELD_CLASS}
                    >
                      {SERVICES_DATA.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>Modalidad de Visita</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, meetingType: 'virtual' }))}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                          formData.meetingType === 'virtual'
                            ? 'bg-sky-950/80 border-sky-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5 text-sky-400" />
                        <span>Google Meet</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, meetingType: 'presencial' }))}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                          formData.meetingType === 'presencial'
                            ? 'bg-sky-950/80 border-sky-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Presencial</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL_CLASS}>Fecha sugerida para la visita</label>
                    <input
                      type="date"
                      name="date"
                      min={getTomorrowDateString()}
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className={FORM_FIELD_CLASS}
                    />
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>Hora sugerida</label>
                    <input
                      type="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className={FORM_FIELD_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label className={LABEL_CLASS}>
                    ¿Qué proceso te gustaría mejorar o qué necesidad tienes?
                  </label>
                  <textarea
                    name="projectDetails"
                    rows={3}
                    placeholder="Ej: Necesitamos ordenar el inventario de 2 bodegas y queremos aumentar clientes con redes sociales..."
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    className={FORM_FIELD_CLASS}
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={CTA_BUTTON + ' w-full'}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        <span>Procesando agendamiento...</span>
                      </>
                    ) : (
                      <>
                        <CalendarIcon className="w-4 h-4" />
                        <span>Agendar Visita de Diagnóstico</span>
                      </>
                    )}
                  </button>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1">
                    <a
                      href={directCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto text-center px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <CalendarIcon className="w-3.5 h-3.5 text-sky-400" />
                      <span>Añadir a Google Calendar (Sin permisos / Directo)</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Enviar a WhatsApp ({COMPANY_PHONE})</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
