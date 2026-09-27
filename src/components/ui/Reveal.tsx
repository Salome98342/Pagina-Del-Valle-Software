import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

const revealItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const useOffscreenReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldReveal, setShouldReveal] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    setShouldReveal(!(bounds.top < window.innerHeight && bounds.bottom > 0));
  }, []);

  return [ref, shouldReveal] as const;
};

export const FadeInSection: React.FC<RevealProps> = ({ children, className }) => {
  const [ref, shouldReveal] = useOffscreenReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={shouldReveal ? 'hidden' : undefined}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={revealItem}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<RevealProps> = ({ children, className }) => {
  const [ref, shouldReveal] = useOffscreenReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={shouldReveal ? 'hidden' : undefined}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<RevealProps> = ({ children, className }) => (
  <motion.div className={className} variants={revealItem}>
    {children}
  </motion.div>
);
