import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import Rise from '../components/Rise';
import DayDots from './DayDots';
import media from '../data/media.json';
import './Work.css';

const EASE = [0.22, 1, 0.36, 1];

const asset = (p) => (p ? `/${p.replace(/^\//, '')}` : '');

// per-project cover overrides: the three featured share the homepage hero
// crops (for consistency), plus curated covers for other projects.
const HERO_COVER = {
  'proj-1': '/assets/hero/cannes.jpg',
  'proj-5': '/assets/hero/croisements.jpg',
  'proj-4': '/assets/hero/wuhanopen.jpg',
  'proj-3': '/assets/projects/proj-3/cover.jpg',
  'aolu-exhibit': '/assets/projects/aolu-exhibit/cover.jpg',
  'proj-6': '/assets/projects/proj-6/cover.jpg',
};

export default function Work({ openSlug = null, onOpen, onClose, onNavigate }) {
  const { t } = useI18n();
  const w = t.work;
  const [lightbox, setLightbox] = useState(null); // image src for full view

  // Merge real data: media.json galleries + featured (tags/overview/meta) +
  // more (press links / one-liners). Language-correct because it reads t.work.
  const projects = useMemo(() => {
    return media.projects.map((p) => {
      const feat = (w.featured || []).find((f) => f.slug === p.slug);
      const more = (w.more || []).find((m) => m.slug === p.slug);
      const meta = feat ? [feat.year, feat.place].filter(Boolean).join(' · ') : '';
      return {
        slug: p.slug,
        title: feat?.title || more?.title || p.title,
        cat: (feat && feat.tags && feat.tags[0]) || more?.eyebrow || '',
        meta,
        overview: feat?.body || more?.desc || '',
        tags: feat?.tags || [],
        press: more?.url || '',
        cover: HERO_COVER[p.slug] || asset((p.landscape && p.landscape[0]) || p.cover),
        images: p.images.map(asset),
      };
    });
  }, [w.featured, w.more]);

  const active = projects.find((p) => p.slug === openSlug) || null;
  const caseData = active ? (w.cases || {})[active.slug] : null;
  const activeIdx = projects.findIndex((p) => p.slug === openSlug);
  const next = activeIdx >= 0 ? projects[(activeIdx + 1) % projects.length] : null;

  // scroll to top when switching between index / case study
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [openSlug]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && (lightbox ? setLightbox(null) : onClose && onClose());
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  // ── Case study detail ──
  if (active) {
    return (
      <div className="wk">
        <div className="shell wk__cs">
          <button className="wk__back" onClick={onClose}>{w.allWork}</button>

          <div>
            {active.cat && <Reveal><p className="eyebrow">{active.cat}</p></Reveal>}
            <Rise as="h1" className="wk__cs-title" onLoad delay={0.05}>{active.title}</Rise>
            {active.meta && <Reveal delay={0.12}><p className="wk__cs-meta">{active.meta}</p></Reveal>}
          </div>

          <motion.div className="wk__cs-cover"
            initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
            <img src={active.cover} alt={active.title} />
          </motion.div>

          {caseData ? (
            <>
              <Reveal className="wk__cs-body">
                <p className="wk__cs-lead">{caseData.summary}</p>
              </Reveal>

              {caseData.facts && (
                <Reveal className="wk__facts">
                  <p className="wk__facts-label">{w.factsLabel}</p>
                  <div className="wk__facts-grid">
                    {caseData.facts.map((f) => (
                      <div key={f.k} className="wk__fact">
                        <span className="wk__fact-k">{f.k}</span>
                        <span className="wk__fact-v">{f.v}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {caseData.sections.map((sec) => (
                <Reveal key={sec.title} className="wk__section">
                  <h2 className="wk__section-title">{sec.title}</h2>
                  {sec.blocks
                    ? sec.blocks.map((b, i) =>
                        b.h ? <h3 key={i} className="wk__sub">{b.h}</h3>
                        : b.ul ? (
                          <ul key={i} className="wk__bullets">
                            {b.ul.map((x, j) => <li key={j}>{x}</li>)}
                          </ul>
                        )
                        : <p key={i} className="wk__para">{b.p}</p>
                      )
                    : (
                      <>
                        {sec.paras && sec.paras.map((p, i) => <p key={i} className="wk__para">{p}</p>)}
                        {sec.bullets && (
                          <ul className="wk__bullets">
                            {sec.bullets.map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        )}
                        {sec.checks && (
                          <ul className="wk__checks">
                            {sec.checks.map((c, i) => <li key={i}>{c}</li>)}
                          </ul>
                        )}
                      </>
                    )}
                </Reveal>
              ))}
            </>
          ) : active.overview ? (
            <Reveal className="wk__cs-body">
              <p className="wk__cs-label">{w.overviewLabel}</p>
              <p className="wk__cs-overview">{active.overview}</p>
              {active.tags.length > 0 && (
                <ul className="wk__tags">
                  {active.tags.map((tg) => <li key={tg}>{tg}</li>)}
                </ul>
              )}
              {active.press && (
                <a className="wk__press" href={active.press} target="_blank" rel="noreferrer">{w.pressCta}</a>
              )}
            </Reveal>
          ) : null}

          {caseData && caseData.galleries ? (
            caseData.galleries.map((g) => (
              <Reveal key={g.label} className="wk__gallery-wrap">
                <p className="wk__cs-label">{g.label}</p>
                <div className="wk__gallery">
                  {g.images.map((src) => (
                    <button key={src} className="wk__shot" onClick={() => setLightbox(src)}>
                      <img src={src} alt={g.label} loading="lazy" />
                    </button>
                  ))}
                </div>
              </Reveal>
            ))
          ) : (
            <Reveal className="wk__gallery-wrap">
              <p className="wk__cs-label">{w.galleryLabel}</p>
              <div className="wk__gallery">
                {active.images.map((src) => (
                  <button key={src} className="wk__shot" onClick={() => setLightbox(src)}>
                    <img src={src} alt={active.title} loading="lazy" />
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          {next && (
            <button className="wk__next" onClick={() => onOpen(next.slug)}>
              <span className="wk__next-label">{w.nextLabel}</span>
              <span className="wk__next-title">{next.title} →</span>
            </button>
          )}
        </div>

        <AnimatePresence>
          {lightbox && (
            <motion.div className="wk__lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}>
              <img src={lightbox} alt="" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Work index ──
  return (
    <div className="wk">
      <div className="shell wk__index">
        <div className="wk__head">
          <Reveal><p className="eyebrow">{w.eyebrow}</p></Reveal>
          <Rise as="h1" className="wk__title" onLoad delay={0.05}>{w.title}</Rise>
          <Reveal delay={0.1}><p className="wk__sub">{w.sub}</p></Reveal>
        </div>

        <div className="wk__grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07}>
              <button className="pc" onClick={() => onOpen(p.slug)}>
                <motion.div className="pc__img"
                  initial={{ opacity: 0, scale: 1.06 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: EASE }}>
                  <img src={p.cover} alt={p.title} loading="lazy" />
                </motion.div>
                {p.cat && <p className="pc__cat">{p.cat}</p>}
                <h3 className="pc__title">{p.title}</h3>
                {p.meta && <p className="pc__meta">{p.meta}</p>}
              </button>
            </Reveal>
          ))}
        </div>

        <DayDots onView={() => onNavigate && onNavigate('concept')} />
      </div>
    </div>
  );
}
