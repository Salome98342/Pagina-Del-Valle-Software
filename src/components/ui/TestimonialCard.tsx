import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Quote, Star } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="flex flex-col justify-between p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/30 transition-colors duration-300 relative group"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <Quote className="w-8 h-8 text-slate-700 group-hover:text-sky-500/40 transition-colors" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed italic">"{testimonial.review}"</p>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/50 border border-sky-500/30 text-sky-300 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>{testimonial.resultsMetric}</span>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white">{testimonial.clientName}</h4>
          <p className="text-xs text-slate-400">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-1 rounded">
          {testimonial.serviceReceived}
        </span>
      </div>
    </motion.div>
  );
};
