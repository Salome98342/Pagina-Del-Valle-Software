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
import { MessageCircle, PhoneCall, ChevronUp } from 'lucide-react';

export default function App() {
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServicePreset(serviceTitle);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/20 selection:text-sky-300">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Landing Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onScheduleClick={() => setSelectedServicePreset('')} />

        {/* 2. Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 3. Projects & Finished Work Showcase (Sistema de Gestión ERP & Redes) */}
        <ProjectsSection />

        {/* 4. Testimonials Section */}
        <TestimonialsSection />

        {/* 5. Team Section (Salomé, Sergio, Kevin, David, Manuel) */}
        <TeamSection />

        {/* 6. Contact & Google Workspace (Calendar + Sheets) Scheduling Form */}
        <ContactSection selectedServicePreset={selectedServicePreset} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons (Quick WhatsApp & Scroll to Top) */}
      <aside aria-label="Acciones rápidas" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(
            'Hola Del Valle Software, deseo consultar sobre sus servicios de desarrollo de software y gestión digital.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-950 hover:shadow-emerald-600/30 transition-all hover:scale-105"
          title="Abrir chat en WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
            WhatsApp Directo
          </span>
        </a>

        {/* Scroll To Top Button */}
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
