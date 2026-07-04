import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import media from '../data/media.json';

const PREVIEW_COUNT = 10; // curated glimpse; the full archive lives behind "view all"

export default function Posters() {
  const { t } = useI18n();
  const p = t.posters;
  const posters = media.posters;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // an even spread across the archive → variety in the preview
  const step = Math.max(1, Math.floor(posters.length / PREVIEW_COUNT));
  const preview = [];
  for (let i = 0; i < posters.length && preview.length < PREVIEW_COUNT; i += step) {
    preview.push(posters[i]);
  }

  return (
    <section id="posters" className="posters section-pad">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{p.eyebrow}</p>
          <h2 className="section-title">{p.title}</h2>
          <p className="section-sub">{p.sub}</p>
        </Reveal>

        <Reveal className="pw">
          <div className="pw__grid">
            {preview.map((src, i) => (
              <button key={i} className="pw__item" onClick={() => setOpen(true)} aria-label={p.viewAll}>
                <img src={src} alt="" loading="lazy" draggable="false" />
              </button>
            ))}
          </div>
          <div className="pw__more">
            <button className="pw__more-btn" onClick={() => setOpen(true)}>
              {p.viewAll} · {posters.length} <span aria-hidden>→</span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* full archive overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="pw__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div className="pw__overlay-bar">
              <h3 className="pw__overlay-title">{p.title}</h3>
              <button className="pw__overlay-close" onClick={() => setOpen(false)}>
                {t.projects.close} ✕
              </button>
            </div>
            <div className="pw__overlay-grid" onClick={(e) => e.stopPropagation()}>
              {posters.map((src, i) => (
                <img key={i} src={src} alt="" loading="lazy" draggable="false" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
