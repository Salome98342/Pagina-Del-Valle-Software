import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

const revealItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const FadeInSection: React.FC<RevealProps> = ({ children, className }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={revealItem}
  >
    {children}
  </motion.div>
);

export const StaggerContainer: React.FC<RevealProps> = ({ children, className }) => (
  <motion.div
    className={className}
    initial="hidden"
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

export const StaggerItem: React.FC<RevealProps> = ({ children, className }) => (
  <motion.div className={className} variants={revealItem}>
    {children}
  </motion.div>
);
