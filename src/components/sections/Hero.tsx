import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_PHONE, COMPANY_PHONE_RAW } from '../../data/companyData';
import {
  ArrowRight,
  Sparkles,
  CalendarCheck2,
  MessageCircle,
  Instagram,
  Facebook,
  TrendingUp,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { HeroFeatureCard } from '../ui/HeroFeatureCard';

const heroSequence = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const heroFeatures = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

interface HeroProps {
  onScheduleClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScheduleClick }) => {
  return (
    <section id="inicio" className="hero-section pt-32 pb-20 md:pt-40 md:pb-28 text-slate-100">
      {/* Background ambient lighting effects matching Del Valle cyan/blue motif */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[800px] sm:h-[450px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-400/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-[320px] h-[320px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
          variants={heroSequence}
          initial="hidden"
          animate="visible"
        >
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <motion.div variants={heroItem} className="hero-badge mb-6 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-sky-600 animate-spin-slow" />
            <span>Transformación Digital & Software a Medida</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
            <span className="text-slate-600 hidden sm:inline">Valle del Cauca & Colombia</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={heroItem} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Software que impulsa tu trabajo.{' '}
            <span className="block mt-2 bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Visibilidad que multiplica tu alcance.
            </span>
          </motion.h1>

          {/* Subtitle with user's core mission */}
          <motion.p variants={heroItem} className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            En <strong className="text-[#0d477a] font-bold">Del Valle Software</strong> desarrollamos
            sistemas de gestión que eliminan tareas repetitivas y gestionamos tus redes sociales con
            estrategia profesional para que tu empresa crezca de forma integral.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div variants={heroItem} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-7">
            <a
              id="hero-cta-agendar"
              href="#contacto"
              onClick={onScheduleClick}
              className="hero-button hero-button--primary w-full sm:w-auto px-8 py-4 text-base"
            >
              <CalendarCheck2 className="w-5 h-5" />
              <span>Agendar Visita de Diagnóstico</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              id="hero-cta-whatsapp"
              href={`https://wa.me/${COMPANY_PHONE_RAW}?text=${encodeURIComponent(
                'Hola equipo de Del Valle Software, me interesa conocer más sobre sus servicios de software y redes sociales.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button hero-button--secondary w-full sm:w-auto px-7 py-4 text-base"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>Hablar por WhatsApp ({COMPANY_PHONE})</span>
            </a>

          </motion.div>

          <motion.div variants={heroItem} className="mb-14">
            <p className="text-sm font-semibold text-[#245d99] mb-3">Visita nuestras redes sociales</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/delvallesoftware/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-button hero-button--instagram w-full sm:w-auto px-6 py-3 text-sm"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/people/Del-Valle-Software/61594659355228/#"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-button hero-button--facebook w-full sm:w-auto px-6 py-3 text-sm"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>
          </motion.div>

          {/* Feature Highlights Banner */}
          <motion.div variants={heroFeatures} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            <motion.div variants={heroItem}>
            <HeroFeatureCard
              icon={Layers}
              label="Proyectos Listos"
              title="Sistema de Gestión ERP"
              description="Control de stock, ventas y caja"
              accentClass="text-sky-400"
              labelClass="text-slate-400"
            />
            </motion.div>
            <motion.div variants={heroItem}>
            <HeroFeatureCard
              icon={TrendingUp}
              label="Redes Sociales"
              title="Estrategia de Alcance"
              description="Visibilidad que genera clientes"
              accentClass="text-cyan-400"
              labelClass="text-slate-400"
            />
            </motion.div>
            <motion.div variants={heroItem}>
            <HeroFeatureCard
              icon={ShieldCheck}
              label="Enfoque 360°"
              title="Transformación Total"
              description="Software interno + ventas online"
              accentClass="text-emerald-400"
              labelClass="text-slate-400"
            />
            </motion.div>
            <motion.div variants={heroItem}>
            <HeroFeatureCard
              icon={CalendarCheck2}
              label="Google Calendar"
              title="Agendamiento Directo"
              description="Sincroniza visitas y reuniones"
              accentClass="text-blue-400"
              labelClass="text-slate-400"
            />
            </motion.div>
          </div>
        </div>
        </motion.div>
    </section>
  );
};
