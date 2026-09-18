import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { COMPANY_PHONE_RAW } from './data/companyData';
import { MessageCircle, ChevronUp } from 'lucide-react';

export default function App() {
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServicePreset(serviceTitle);
  };

  const handleScheduleClick = () => {
    setSelectedServicePreset('');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-shell">
      <Navbar />

      <main>
        <Hero onScheduleClick={handleScheduleClick} />
        <ServicesSection onSelectService={handleSelectService} />
        <ProjectsSection />
        <TestimonialsSection />
        <TeamSection />
        <ContactSection selectedServicePreset={selectedServicePreset} />
      </main>

      <Footer />

      <aside aria-label="Acciones rápidas" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <a
          href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(
            'Hola Del Valle Software, deseo consultar sobre sus servicios de desarrollo de software y gestión digital.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-action group"
          title="Abrir chat en WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
            WhatsApp Directo
          </span>
        </a>

        <button
          onClick={handleScrollToTop}
          className="p-2.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-lg"
          title="Subir al inicio"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </aside>
    </div>
  );
}
