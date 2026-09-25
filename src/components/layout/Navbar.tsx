import React, { useEffect, useState } from 'react';
import { Calendar, Menu, MessageSquare, PhoneCall, X } from 'lucide-react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../../data/companyData';
import { Logo } from './Logo';
import { NavLinkItem } from '../ui/NavLinkItem';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'Equipo', href: '#equipo' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header id="main-header" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3' : 'bg-transparent py-4 sm:py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"><Logo size="md" theme="light" /></a>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => <NavLinkItem key={link.label} {...link} />)}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${COMPANY_PHONE_RAW}`} className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-full transition-all" title="Llamada directa">
            <PhoneCall className="w-3.5 h-3.5 text-sky-400 animate-pulse" /><span>{COMPANY_PHONE}</span>
          </a>
          <a href="#contacto" onClick={onOpenBooking} className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 rounded-full shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all hover:scale-105 active:scale-95">
            <Calendar className="w-4 h-4" /><span>Agendar Visita</span>
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <a href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent('Hola Del Valle Software, deseo agendar una visita o cotización de software.')}`} target="_blank" rel="noopener noreferrer" className="p-2 text-sky-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg" title="WhatsApp"><MessageSquare className="w-5 h-5" /></a>
          <button id="mobile-menu-button" onClick={() => setMobileMenuOpen((open) => !open)} className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg focus:outline-none" aria-label="Abrir menú">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-slate-950/95 border-b border-slate-800 px-5 pt-3 pb-6 space-y-4 backdrop-blur-xl transition-all duration-200">
          <div className="space-y-1">{navLinks.map((link) => <NavLinkItem key={link.label} {...link} mobile onClick={() => setMobileMenuOpen(false)} />)}</div>
          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            <a href={`tel:${COMPANY_PHONE_RAW}`} className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-slate-900 text-slate-200 border border-slate-800"><PhoneCall className="w-4 h-4 text-sky-400" /><span>Llamar: {COMPANY_PHONE}</span></a>
            <a href="#contacto" onClick={() => { setMobileMenuOpen(false); onOpenBooking?.(); }} className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-cyan-500 shadow-md shadow-sky-500/25"><Calendar className="w-4 h-4" /><span>Agendar Visita / Diagnóstico</span></a>
          </div>
        </div>
      )}
    </header>
  );
};
