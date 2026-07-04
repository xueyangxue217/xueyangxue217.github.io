import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import Stack from '../components/Stack';
import media from '../data/media.json';
import './Life.css';

export default function Life({ onBack }) {
  const { t } = useI18n();
  const l = t.life;
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setAiOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aiOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [aiOpen]);

  const cards = media.life.map((src, i) => (
    <img key={i} src={src} alt={`life-${i + 1}`} className="card-image" />
  ));

  return (
    <section className="life shell">
      <button className="life__back" onClick={onBack}>← {l.back}</button>

      <div className="life__cols">
        {/* left — quote + dock-like tiles */}
        <Reveal className="life__left">
          <h1 className="life__quote">
            {l.quoteA} <span className="life__script">{l.quoteB}</span>
          </h1>

          <ul className="life__list">
            {l.tiles.map((tile, i) => (
              <li key={tile.id}>
                <button
                  className={`life__item${tile.link ? ' life__item--link' : ''}`}
                  onClick={tile.link ? () => setAiOpen(true) : undefined}
                >
                  <span className="life__idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="life__label">{tile.label}</span>
                  {tile.link && <span className="life__link-mark" aria-hidden>↗</span>}
                  {tile.desc && <span className="life__desc">{tile.desc}</span>}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* right — autoplay photo stack */}
        <Reveal className="life__right" delay={0.1}>
          <div className="life__stack">
            <Stack
              cards={cards}
              autoplay
              autoplayDelay={3000}
              pauseOnHover
              randomRotation
              sendToBackOnClick
              sensitivity={160}
            />
          </div>
        </Reveal>
      </div>

      {/* AI lab overlay — showcases the two things I built */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div
            className="ailab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAiOpen(false)}
          >
            <motion.div
              className="ailab__panel"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="ailab__close" onClick={() => setAiOpen(false)}>
                {l.ai.close} ✕
              </button>

              <header className="ailab__head">
                <p className="ailab__eyebrow">{l.ai.eyebrow}</p>
                <h2 className="ailab__title">{l.ai.title}</h2>
                <p className="ailab__intro">{l.ai.intro}</p>
              </header>

              <div className="ailab__grid">
                {l.ai.projects.map((p) => (
                  <article key={p.id} className="ailab__card">
                    <div className="ailab__card-top">
                      <h3 className="ailab__name">{p.name}</h3>
                      <p className="ailab__tag">{p.tag}</p>
                    </div>
                    <p className="ailab__desc">{p.desc}</p>
                    <ul className="ailab__stack">
                      {p.stack.map((s) => (
                        <li key={s} className="ailab__chip">{s}</li>
                      ))}
                    </ul>
                    <div className="ailab__links">
                      {p.links.map((lnk) => (
                        <a
                          key={lnk.url}
                          className={`ailab__link${lnk.primary ? ' ailab__link--primary' : ''}`}
                          href={lnk.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {lnk.label} ↗
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
