import React from 'react';
import { TESTIMONIALS_DATA } from '../../data/companyData';
import { SectionHeader } from '../ui/SectionHeader';
import { TestimonialCard } from '../ui/TestimonialCard';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonios" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          chip="Opiniones & Confianza"
          title="La confianza de nuestros clientes es nuestro mejor respaldo"
          subtitle="Escucha cómo empresas y emprendedores han recuperado el control de su tiempo y dinamizado sus ventas con las soluciones de Del Valle Software."
        />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
