import { motion } from 'motion/react';

// Fade + rise in on scroll. Thin wrapper so sections stay clean.
export default function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
