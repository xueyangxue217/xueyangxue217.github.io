import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import Posters from './Posters';
import media from '../data/media.json';
import './Work.css';

const AUTOPLAY_MS = 5600;

// dedicated wide 16:9 backgrounds for the featured hero (from 项目图片/),
// independent of each project's lightbox gallery
const HERO_IMAGES = {
  'proj-1': 'assets/hero/cannes.jpg',      // 戛纳 · CHINA FILM NIGHT 背景墙
  'proj-4': 'assets/hero/wuhanopen.jpg',   // 武网 · 满场球馆
  'proj-5': 'assets/hero/croisements.jpg', // 中法 · 观展巴黎人艺术墙
};

export default function Work({ onBack }) {
  const { t } = useI18n();
  const w = t.work;
  const [open, setOpen] = useState(null);   // project index (into media.projects) → lightbox
  const [cur, setCur] = useState(0);        // active featured slide
  const [paused, setPaused] = useState(false);

  // horizontal scroll state for the "more projects" row
  const rowRef = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const updateEdges = () => {
    const el = rowRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft < max - 4 });
  };
  const scrollRow = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // mark the page so the fixed nav switches to light text over the dark hero
  useEffect(() => {
    document.body.classList.add('over-hero');
    return () => document.body.classList.remove('over-hero');
  }, []);

  useEffect(() => {
    document.body.style.overflow = open != null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // map featured entries (by slug) to their media.projects index + a wide cover
  const featured = useMemo(() => {
    return (w.featured || [])
      .map((f) => {
        const index = media.projects.findIndex((p) => p.slug === f.slug);
        const p = media.projects[index];
        const cover = HERO_IMAGES[f.slug] || (p ? (p.landscape && p.landscape[0]) || p.cover : null);
        return { ...f, index, cover };
      })
      .filter((f) => f.index >= 0);
  }, [w.featured]);

  // keep cur in range if the featured list changes (e.g. language toggle)
  useEffect(() => { setCur((c) => (c < featured.length ? c : 0)); }, [featured.length]);

  // preload hero images so switching slides crossfades instantly (no stale-image flash)
  useEffect(() => {
    featured.forEach((f) => { if (f.cover) { const im = new Image(); im.src = f.cover; } });
  }, [featured]);

  // autoplay — resets whenever cur changes or on pause
  useEffect(() => {
    if (paused || featured.length <= 1 || open != null) return;
    const id = setTimeout(() => setCur((c) => (c + 1) % featured.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [cur, paused, featured.length, open]);

  // "more projects" — editorial cards (from i18n); each links to a news / article story.
  // image comes from m.image; falls back to the matching media project cover if any.
  const more = (w.more || [])
    .map((m) => {
      const index = media.projects.findIndex((p) => p.slug === m.slug);
      const p = index >= 0 ? media.projects[index] : null;
      const cover = m.image || (p ? (p.landscape && p.landscape[0]) || p.cover : null);
      return { ...m, index, cover, count: p ? p.images.length : 0 };
    })
    .filter((m) => m.cover);

  // init / refresh the scroll-arrow state once the row is laid out and on resize
  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [more.length]);

  const active = open != null ? media.projects[open] : null;
  const slide = featured[cur];

  return (
    <div className="work">
      {/* ============ full-screen hero — auto-rotating featured ============ */}
      <section
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="hero__stage">
          <AnimatePresence>
            {slide && (
              <motion.img
                key={slide.slug}
                className="hero__img"
                src={slide.cover}
                alt={slide.title}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 0.8, ease: 'easeInOut' }, scale: { duration: 7, ease: 'linear' } }}
              />
            )}
          </AnimatePresence>
          <div className="hero__scrim" />
        </div>

        {/* back button — sits just below the fixed nav */}
        <div className="hero__top shell">
          <button className="hero__back" onClick={onBack}>← {w.back}</button>
        </div>

        {/* bottom caption band — text fades in step with the image; menu stays mounted */}
        {slide && (
          <div className="hero__caption shell">
            <div className="hero__caption-inner">
              {/* keyed text block: re-mounts + fades in on slide change, in sync with the crossfade */}
              <motion.div
                key={slide.slug}
                className="hero__cap-text"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="hero__num">{String(cur + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</p>
                <h2 className="hero__title">{slide.title}</h2>
                <p className="hero__desc">{slide.body}</p>
                <p className="hero__meta">
                  {[...slide.tags, [slide.year, slide.place].filter(Boolean).join(' ')]
                    .filter(Boolean)
                    .join('  ·  ')}
                </p>
                <button className="hero__cta" onClick={() => setOpen(slide.index)}>
                  {w.viewCta} <span aria-hidden>→</span>
                </button>
              </motion.div>

              {/* right — project selector (always mounted → reliable clicks) */}
              <nav className="hero__menu" aria-label={w.featuredLabel}>
                {featured.map((f, i) => (
                  <button
                    key={f.slug}
                    className={`hero__menu-item ${i === cur ? 'is-active' : ''}`}
                    onClick={() => setCur(i)}
                  >
                    <span className="hero__menu-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="hero__menu-name">{f.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </section>

      {/* ============ more projects — editorial grid, each links to a news story ============ */}
      {more.length > 0 && (
        <section className="shell work__more">
          <Reveal>
            <div className="work__more-head">
              <h2 className="work__more-title">{w.moreTitle}</h2>
              <div className="work__more-nav">
                <button
                  className="work__arrow"
                  aria-label="上一批"
                  disabled={!edges.left}
                  onClick={() => scrollRow(-1)}
                >←</button>
                <button
                  className="work__arrow"
                  aria-label="下一批"
                  disabled={!edges.right}
                  onClick={() => scrollRow(1)}
                >→</button>
              </div>
            </div>
          </Reveal>
          <div className={`work__more-scroller ${edges.left ? 'fade-left' : ''} ${edges.right ? 'fade-right' : ''}`}>
          <div
            className="work__more-grid"
            ref={rowRef}
            onScroll={updateEdges}
          >
            {more.map((m, i) => {
              const inner = (
                <>
                  <div className="mc__img">
                    <img src={m.cover} alt={m.title} loading="lazy" />
                  </div>
                  <p className="mc__eyebrow">{m.eyebrow}</p>
                  <h3 className="mc__title">{m.title}</h3>
                  <p className="mc__desc">{m.desc}</p>
                  {m.url
                    ? <span className="mc__cta">{w.readMore} <span aria-hidden>↗</span></span>
                    : <span className="mc__cta mc__cta--muted">{t.projects.viewImages} · {m.count} <span aria-hidden>→</span></span>}
                </>
              );
              return (
                <Reveal key={m.slug} className="mc" delay={(i % 3) * 0.06}>
                  {m.url ? (
                    <a className="mc__link" href={m.url} target="_blank" rel="noopener noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <button className="mc__link" onClick={() => setOpen(m.index)}>
                      {inner}
                    </button>
                  )}
                </Reveal>
              );
            })}
          </div>
          </div>
        </section>
      )}

      {/* past branding-event posters — auto-rotating coverflow */}
      <Posters />

      {/* lightbox — all images of the selected project */}
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
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox__bar">
                <h3>{active.title}</h3>
                <button className="lightbox__close" onClick={() => setOpen(null)}>
                  {t.projects.close} ✕
                </button>
              </div>
              <div className="lightbox__grid">
                {active.images.map((src) => (
                  <img key={src} src={src} alt={active.title} loading="lazy" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
