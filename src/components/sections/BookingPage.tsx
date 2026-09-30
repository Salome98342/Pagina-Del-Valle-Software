import React from 'react';
import { Footer, Navbar } from '../layout';
import { ContactSection } from './ContactSection';

export const BookingPage: React.FC = () => {
  const selectedServicePreset =
    typeof window === 'undefined'
      ? undefined
      : new URLSearchParams(window.location.search).get('servicio') || undefined;

  return (
    <div className="page-shell">
      <Navbar />
      <main className="min-h-screen bg-slate-950">
        <ContactSection selectedServicePreset={selectedServicePreset} />
      </main>
      <Footer />
    </div>
  );
};
