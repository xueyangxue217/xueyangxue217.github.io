import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { useUI } from '../ui';
import Reveal from '../components/Reveal';
import './Home.css';

// wide covers for the three featured case studies (reuse the hero crops)
const FEAT_COVER = {
  'proj-1': '/assets/hero/cannes.jpg',
  'proj-5': '/assets/hero/croisements.jpg',
  'proj-4': '/assets/hero/wuhanopen.jpg',
};

const EMAIL = 'yangxue-217@hotmail.com';

// count a number up from 0 → target when it first scrolls into view
function useCountUp(target, run) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const start = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return val;
}

function Stat({ n, l, run }) {
  const num = parseInt(n, 10) || 0;
  const suffix = n.replace(/[0-9]/g, ''); // "+" etc.
  const val = useCountUp(num, run);
  return (
    <div className="stat">
      <b className="stat__n">{val}{suffix}</b>
      <span className="stat__l">{l}</span>
    </div>
  );
}

export default function Home({ onNavigate }) {
  const { t } = useI18n();
  const { openResume } = useUI();
  const h = t.home;

  // trigger the number count-up once the strip is visible
  const numsRef = useRef(null);
  const [numsIn, setNumsIn] = useState(false);
  useEffect(() => {
    const el = numsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setNumsIn(true); io.disconnect(); } },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="lp">
      {/* ── Hero ── */}
      <header className="lp__hero shell">
        <Reveal className="lp__hero-text">
          <p className="lp__eyebrow">{h.hero.eyebrow}</p>
          <h1 className="lp__h1">
            {h.hero.titleLines.map((line, i) => (
              <span key={i} className="lp__h1-line">{line}</span>
            ))}
          </h1>
          <p className="lp__sub">
            {h.hero.subEm && h.hero.sub.includes(h.hero.subEm) ? (
              <>
                {h.hero.sub.split(h.hero.subEm)[0]}
                <span className="lp__sub-em">{h.hero.subEm}</span>
                {h.hero.sub.split(h.hero.subEm)[1]}
              </>
            ) : h.hero.sub}
          </p>
          <div className="lp__cta-row">
            <button className="btn btn--solid" onClick={() => onNavigate('work')}>{h.hero.ctaWork}</button>
          </div>
        </Reveal>
        <Reveal className="lp__portrait" delay={0.1}>
          <div className="lp__portrait-img">
            <img src="/assets/home/portrait.jpg" alt={h.hero.portraitAlt} />
          </div>
        </Reveal>
      </header>

      {/* ── Trust numbers ── */}
      <section className="lp__nums" ref={numsRef}>
        <div className="lp__nums-inner shell">
          {h.nums.map((s, i) => <Stat key={i} n={s.n} l={s.l} run={numsIn} />)}
        </div>
      </section>

      {/* ── Featured work ── */}
      <section className="lp__sec shell">
        <Reveal>
          <p className="eyebrow">{h.featuredEyebrow}</p>
          <h2 className="section-title">{h.featuredTitle}</h2>
        </Reveal>
        <div className="lp__work">
          {h.featured.map((f, i) => (
            <Reveal key={f.slug} delay={i * 0.08}>
              <button className="wc" onClick={() => onNavigate('work')}>
                <div className="wc__img">
                  <img src={FEAT_COVER[f.slug]} alt={f.title} loading="lazy" />
                </div>
                <p className="wc__cat">{f.cat}</p>
                <h3 className="wc__title">{f.title}</h3>
                <p className="wc__meta">{f.meta}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="lp__services">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{h.servicesEyebrow}</p>
            <h2 className="section-title">{h.servicesTitle}</h2>
          </Reveal>
          <div className="lp__svc">
            {h.services.map((s, i) => (
              <Reveal key={s.n} className="svc" delay={(i % 2) * 0.06}>
                <p className="svc__n">{s.n}</p>
                <h3 className="svc__t">{s.t}</h3>
                <p className="svc__d">{s.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lp__svc-cta">
            <button className="link-arrow" onClick={() => onNavigate('services')}>{h.servicesCta}</button>
          </Reveal>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="lp__cta shell">
        <Reveal>
          <h2 className="lp__cta-title">{h.ctaTitle}</h2>
          <p className="lp__cta-text">{h.ctaText}</p>
          <button className="btn btn--solid" onClick={() => onNavigate('contact')}>{h.ctaBtn}</button>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="lp__foot">
        <div className="lp__foot-inner shell">
          <span className="lp__foot-brand">{h.footer.rights}<span className="lp__foot-tag"> · {h.footer.tagline}</span></span>
          <nav className="lp__foot-links">
            <a href={`mailto:${EMAIL}`}>Email</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            <button onClick={openResume}>Résumé ↗</button>
          </nav>
        </div>
      </footer>
    </div>
  );
}
