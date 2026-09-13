import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../data/companyData';
import { auth, googleSignIn, logoutGoogle, initAuth } from '../services/googleWorkspace';
import { User } from 'firebase/auth';
import {
  PhoneCall,
  Calendar,
  Menu,
  X,
  LogIn,
  LogOut,
  User as UserIcon,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser) => {
        setUser(currentUser);
      },
      () => {
        setUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleAuth = async () => {
    if (user) {
      await logoutGoogle();
      setUser(null);
    } else {
      setIsLoggingIn(true);
      try {
        const result = await googleSignIn();
        if (result) {
          setUser(result.user);
        }
      } catch (err: any) {
        if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
          console.warn('Aviso de autenticación:', err?.message || err);
        }
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Equipo', href: '#equipo' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1">
          <Logo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-sky-400 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Quick Phone Call Button */}
          <a
            href={`tel:${COMPANY_PHONE_RAW}`}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-full transition-all"
            title="Llamada directa"
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>{COMPANY_PHONE}</span>
          </a>

          {/* Google Account Status / Sync Indicator */}
          <button
            id="btn-google-auth-nav"
            onClick={handleGoogleAuth}
            disabled={isLoggingIn}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              user
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-sky-500/50 hover:text-white'
            }`}
            title={user ? `Conectado como ${user.displayName || user.email}` : 'Conectar Google Calendar & Sheets'}
          >
            {user ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="max-w-[100px] truncate">{user.displayName?.split(' ')[0] || 'Conectado'}</span>
                <LogOut className="w-3 h-3 text-slate-400 hover:text-rose-400 ml-1" />
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Google Sync</span>
              </>
            )}
          </button>

          {/* Primary CTA: Agendar Visita */}
          <a
            href="#contacto"
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 rounded-full shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Visita</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent('Hola Del Valle Software, deseo agendar una visita o cotización de software.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-sky-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
            title="WhatsApp"
          >
            <MessageSquare className="w-5 h-5" />
          </a>

          <button
            id="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-slate-950/95 border-b border-slate-800 px-5 pt-3 pb-6 space-y-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-base font-medium text-slate-200 hover:text-sky-400 hover:bg-slate-900/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <a
              href={`tel:${COMPANY_PHONE_RAW}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-slate-900 text-slate-200 border border-slate-800"
            >
              <PhoneCall className="w-4 h-4 text-sky-400" />
              <span>Llamar: {COMPANY_PHONE}</span>
            </a>

            <button
              onClick={handleGoogleAuth}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-medium bg-slate-900 text-slate-200 border border-slate-800"
            >
              {user ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Conectado ({user.displayName?.split(' ')[0]}) - Cerrar</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Conectar Google Calendar & Sheets</span>
                </>
              )}
            </button>

            <a
              href="#contacto"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-cyan-500 shadow-md shadow-sky-500/25"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Visita / Diagnóstico</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
