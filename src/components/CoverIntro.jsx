import { motion } from 'motion/react';
import ShinyText from './ShinyText';
import './CoverIntro.css';

// Fullscreen splash: warm paper ground with a slow, breathing watercolour
// bloom (terracotta/warm-red) diffusing like ink on paper — on-brand with the
// site's warm tone, with an editorial serif title. Clicking anywhere enters.
export default function CoverIntro({ onEnter }) {
  return (
    <motion.div
      className="cover"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={onEnter}
      role="button"
      aria-label="进入网站 enter site"
    >
      <svg className="cover__water" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" aria-hidden="true">
        <defs>
          <filter id="ink" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.008" numOctaves="3" seed="9" result="noise">
              <animate attributeName="baseFrequency" dur="34s" values="0.006 0.008;0.009 0.006;0.006 0.008" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="150" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <radialGradient id="bloomA" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#cf6242" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#d8794f" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#e0a074" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bloomB" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e08a5a" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#e6b48c" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1200" height="800" fill="#f8f6f1" />

        <g filter="url(#ink)">
          <ellipse cx="620" cy="400" rx="300" ry="230" fill="url(#bloomA)">
            <animate attributeName="rx" dur="18s" values="300;330;300" repeatCount="indefinite" />
            <animate attributeName="ry" dur="22s" values="230;250;230" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0; 24 -16; -18 12; 0 0" dur="40s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="720" cy="360" rx="170" ry="150" fill="url(#bloomB)">
            <animate attributeName="rx" dur="26s" values="170;150;170" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0; -22 14; 16 -10; 0 0" dur="46s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>

      <div className="cover__grain" aria-hidden="true" />
      <div className="cover__veil" />

      <div className="cover__center">
        <ShinyText
          className="cover__welcome"
          text="welcome to my world"
          speed={3.4}
          delay={0.8}
          spread={100}
          direction="left"
          color="#9a8877"
          shineColor="#e3d3ba"
        />
        <span className="cover__name">YANG XUE</span>
      </div>

      <span className="cover__hint">点击进入 · click to enter</span>
    </motion.div>
  );
}
