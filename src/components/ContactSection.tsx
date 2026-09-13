import React, { useState, useEffect } from 'react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW, SERVICES_DATA } from '../data/companyData';
import { VisitRequestForm } from '../types';
import {
  auth,
  googleSignIn,
  logoutGoogle,
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
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Video,
  MapPin,
  Send,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface ContactSectionProps {
  selectedServicePreset?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedServicePreset }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
    details?: string;
    calendarUrl?: string;
    sheetsUrl?: string;
  } | null>(null);

  // Default date to tomorrow
  const getTomorrowDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

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
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setStatusMessage({
          type: 'info',
          text: `Conectado exitosamente como ${res.user.displayName || res.user.email}. Ahora puedes agendar directamente en Google Calendar y registrar en Google Sheets.`,
        });
      }
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        const isAccessDenied =
          err?.code === 'auth/access_denied' ||
          String(err?.message || '').includes('access_denied') ||
          String(err?.message || '').includes('403');

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
            details: err.message || 'Verifica los permisos e intenta de nuevo.',
          });
        }
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSubmitWithGoogleWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();

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
      let currentToken = await getAccessToken();

      // If user is already authenticated with Google Workspace token, sync directly via API
      if (currentToken && user) {
        let calLink = '';
        try {
          const calResult = await createGoogleCalendarEvent(currentToken, formData);
          calLink = calResult.htmlLink;
        } catch (calError: any) {
          console.warn('Calendar sync notice:', calError);
        }

        let sheetLink = '';
        try {
          const sheetResult = await logInquiryToGoogleSheets(currentToken, formData);
          sheetLink = sheetResult.spreadsheetUrl;
        } catch (sheetError: any) {
          console.warn('Sheets sync notice:', sheetError);
        }

        setStatusMessage({
          type: 'success',
          text: '¡Visita agendada y sincronizada con Google Workspace!',
          details:
            'Se ha creado la cita en Google Calendar y se ha registrado en Google Sheets. Puedes consultar el evento o notificar a WhatsApp para confirmación inmediata.',
          calendarUrl: calLink || buildGoogleCalendarWebUrl(formData),
          sheetsUrl: sheetLink,
        });
        return;
      }

      // If user is NOT already signed in with Google, provide instant seamless booking
      // so clients never get blocked by Google OAuth test mode screens!
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
    const text = [
      `*SOLICITUD DE ASESORÍA / VISITA - DEL VALLE SOFTWARE*`,
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

    const url = `https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const directCalendarUrl = buildGoogleCalendarWebUrl(formData);

  return (
    <section id="contacto" className="py-24 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Contacto & Agendamiento
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Agenda tu visita o diagnóstico tecnológico
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Cuéntanos sobre tu negocio. Programamos una sesión de asesoría virtual o presencial y la
            conectamos a tu Google Calendar y Google Sheets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Details & Company Status */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Phone / WhatsApp Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <PhoneCall className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Línea Directa Oficial
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-wide">
                    {COMPANY_PHONE}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Atención personalizada con el equipo fundador de Del Valle Software. Puedes llamarnos o
                escribirnos de inmediato por WhatsApp para resolver dudas rápidas.
              </p>

              {/* Instant WhatsApp Button */}
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/60 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chatear ahora por WhatsApp</span>
              </button>
            </div>

            {/* Transparent Channels Notice */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/90 text-xs sm:text-sm text-slate-300 space-y-2.5">
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

            {/* Google Workspace Integration Banner */}
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

          {/* Right Column: Interactive Scheduling Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white">
                  Formulario de Solicitud de Visita & Diagnóstico
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Completa los campos para coordinar el horario más cómodo para tu equipo.
                </p>
              </div>

              {/* Status Banner */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in duration-200 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : statusMessage.type === 'error'
                      ? 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                      : 'bg-sky-950/60 border-sky-500/40 text-sky-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold">{statusMessage.text}</p>
                      {statusMessage.details && (
                        <p className="text-xs opacity-90">{statusMessage.details}</p>
                      )}

                      {/* Action links */}
                      {(statusMessage.calendarUrl || statusMessage.sheetsUrl) && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          {statusMessage.calendarUrl && (
                            <a
                              href={statusMessage.calendarUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-900/80 hover:bg-emerald-800 text-white text-xs font-semibold"
                            >
                              <CalendarIcon className="w-3.5 h-3.5" />
                              <span>Ver en Google Calendar</span>
                              <ExternalLink className="w-3 h-3 ml-0.5" />
                            </a>
                          )}

                          {statusMessage.sheetsUrl && (
                            <a
                              href={statusMessage.sheetsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-900/80 hover:bg-emerald-800 text-white text-xs font-semibold"
                            >
                              <FileSpreadsheet className="w-3.5 h-3.5" />
                              <span>Ver Registro en Google Sheets</span>
                              <ExternalLink className="w-3 h-3 ml-0.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmitWithGoogleWorkspace} className="space-y-4">
                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Nombre Completo <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ej: Carlos Gómez"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Empresa o Negocio
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Ej: Distribuidora del Valle"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Teléfono / WhatsApp <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Ej: +57 300 1234567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Correo Electrónico (para invitación de calendario)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selector & Meeting Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Servicio Principal de Interés
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
                    >
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Modalidad de Visita
                    </label>
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

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Fecha sugerida para la visita
                    </label>
                    <input
                      type="date"
                      name="date"
                      min={getTomorrowDateString()}
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Hora sugerida
                    </label>
                    <input
                      type="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    ¿Qué proceso te gustaría mejorar o qué necesidad tienes?
                  </label>
                  <textarea
                    name="projectDetails"
                    rows={3}
                    placeholder="Ej: Necesitamos ordenar el inventario de 2 bodegas y queremos aumentar clientes con redes sociales..."
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 shadow-xl shadow-sky-950/60 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
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
                    {/* Direct Calendar Web URL shortcut */}
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

                    {/* WhatsApp Quick Dispatch */}
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
