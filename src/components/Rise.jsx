import { motion } from 'motion/react';

// Clip-mask reveal: text rises out of an overflow-hidden frame. Used for
// headings — a touch more premium than a plain fade. `onLoad` plays on mount
// (for above-the-fold hero); otherwise it plays when scrolled into view.
export default function Rise({ children, as = 'div', className, delay = 0, onLoad = false }) {
  const Tag = as;
  const anim = onLoad
    ? { animate: { y: 0 } }
    : { whileInView: { y: 0 }, viewport: { once: true, amount: 0.5 } };
  return (
    <Tag className={className} style={{ overflow: 'hidden' }}>
      <motion.span
        style={{ display: 'block', willChange: 'transform' }}
        initial={{ y: '115%' }}
        {...anim}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
