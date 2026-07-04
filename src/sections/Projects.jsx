import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import media from '../data/media.json';

export default function Projects() {
  const { t } = useI18n();
  const p = t.projects;
  const [open, setOpen] = useState(null); // project index

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const active = open != null ? media.projects[open] : null;

  return (
    <section id="projects" className="projects shell section-pad">
      <Reveal>
        <p className="eyebrow">{p.eyebrow}</p>
        <h2 className="section-title">{p.title}</h2>
        <p className="section-sub">{p.sub}</p>
      </Reveal>

      <div className="proj__grid">
        {media.projects.map((proj, i) => (
          <Reveal key={proj.slug} className="proj__card-wrap" delay={(i % 2) * 0.08}>
            <button className="proj__card" onClick={() => setOpen(i)}>
              <div className="proj__media">
                <img src={proj.cover} alt={proj.title} loading="lazy" />
                <span className="proj__count">{proj.images.length} {p.viewImages}</span>
              </div>
              <div className="proj__meta">
                <h3 className="proj__title">{proj.title}</h3>
                {/* text description area — placeholder, user fills later */}
                <p className="proj__desc proj__desc--placeholder">{p.descPlaceholder}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="lightbox__panel"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox__bar">
                <h3>{active.title}</h3>
                <button className="lightbox__close" onClick={() => setOpen(null)}>
                  {p.close} ✕
                </button>
              </div>
              <p className="lightbox__desc">{p.descPlaceholder}</p>
              <div className="lightbox__grid">
                {active.images.map((src) => (
                  <img key={src} src={src} alt={active.title} loading="lazy" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
