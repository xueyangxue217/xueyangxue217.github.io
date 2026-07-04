import { useI18n } from '../i18n';
import { useUI } from '../ui';
import Reveal from '../components/Reveal';
import './AboutMe.css';

export default function AboutMe({ onBack }) {
  const { t } = useI18n();
  const { openResume } = useUI();
  const a = t.aboutme;

  return (
    <section className="am shell">
      <button className="am__back" onClick={onBack}>← {a.back}</button>

      <Reveal className="am__inner">
        <div className="am__header">
          <p className="am__eyebrow">{a.eyebrow}</p>
          <button className="am__resume" onClick={openResume}>
            {a.resumeCta} <span className="am__arrow" aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="am__spread">
          {/* left — portrait, name, intro (image → title → body) */}
          <div className="am__col">
            <div className="am__photo">
              {/* stacked-card gallery framing: offset backing block + hairline border */}
              <img src="/assets/about/selfie.jpg" alt="杨雪 Yang Xue" loading="lazy" />
            </div>
            <h1 className="am__name">{a.name}</h1>
            {a.role && <p className="am__role">{a.role}</p>}
            {a.intro.map((p, i) => (
              <p key={i} className="am__p">{p}</p>
            ))}
          </div>

          {/* right — statement, stats, attribution (quote → body → byline) */}
          <div className="am__col am__col--right">
            {a.quote && (
              <blockquote className="am__quote">
                {a.quote.map((line, i) => <span key={i}>{line}</span>)}
              </blockquote>
            )}

            {a.stats && (
              <div className="am__stats">
                <div className="am__stat-row">
                  {a.stats.map((s, i) => (
                    <div key={i} className="am__stat">
                      <span className="am__stat-n">{s.n}</span>
                      <span className="am__stat-l">{s.l}</span>
                    </div>
                  ))}
                </div>
                {a.statsNote && <p className="am__stats-note">{a.statsNote}</p>}
              </div>
            )}

            <div className="am__meta">
              <span className="am__attr">{a.name} / ABOUT ME</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
