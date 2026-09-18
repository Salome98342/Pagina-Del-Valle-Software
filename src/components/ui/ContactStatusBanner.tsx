import React from 'react';
import {
  AlertCircle,
  Calendar as CalendarIcon,
  CheckCircle2,
  ExternalLink,
  FileSpreadsheet,
} from 'lucide-react';

export type StatusType = 'success' | 'error' | 'info';

export interface StatusMessage {
  type: StatusType;
  text: string;
  details?: string;
  calendarUrl?: string;
  sheetsUrl?: string;
}

const getStatusClasses = (type: StatusType) => {
  switch (type) {
    case 'success':
      return 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200';
    case 'error':
      return 'bg-rose-950/60 border-rose-500/40 text-rose-200';
    default:
      return 'bg-sky-950/60 border-sky-500/40 text-sky-200';
  }
};

export const ContactStatusBanner: React.FC<StatusMessage> = ({
  type,
  text,
  details,
  calendarUrl,
  sheetsUrl,
}) => {
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={`p-4 rounded-xl border text-xs sm:text-sm transition-opacity duration-200 ${getStatusClasses(type)}`}
    >
      <div className="flex items-start gap-2.5">
        <Icon
          className={`w-5 h-5 shrink-0 mt-0.5 ${type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}
        />
        <div className="space-y-1">
          <p className="font-bold">{text}</p>
          {details && <p className="text-xs opacity-90">{details}</p>}

          {(calendarUrl || sheetsUrl) && (
            <div className="pt-2 flex flex-wrap gap-2">
              {calendarUrl && (
                <a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-900/80 hover:bg-emerald-800 text-white text-xs font-semibold"
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Ver en Google Calendar</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              )}

              {sheetsUrl && (
                <a
                  href={sheetsUrl}
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
  );
};
