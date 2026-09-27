import React, { useEffect, useState } from 'react';
import { Footer, Navbar } from './components/layout';
import {
  ContactSection,
  AboutTeaser,
  Hero,
  ServicesSection,
  TestimonialsSection,
} from './components/sections';
import { COMPANY_PHONE_RAW } from './data/companyData';
import { PortfolioPage } from './components/sections/TestimonialsSection';
import { ServiceLandingPage, SERVICE_PAGES } from './components/sections/ServiceLandingPage';
import { AboutPage } from './components/sections/AboutPage';
import { MessageCircle, ChevronUp } from 'lucide-react';

export default function App() {
  const [selectedServicePreset, setSelectedServicePreset] = useState<string>('');
  const currentPath = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/$/, '') || '/';

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get('servicio');
    if (requestedService) setSelectedServicePreset(requestedService);
  }, []);
  if (currentPath === '/portafolio') return <PortfolioPage />;
  if (currentPath === '/nosotros') return <AboutPage />;
  const servicePage = SERVICE_PAGES.find((page) => page.path === currentPath);
  if (servicePage) return <ServiceLandingPage page={servicePage} />;

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
        <TestimonialsSection />
        <AboutTeaser />
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

