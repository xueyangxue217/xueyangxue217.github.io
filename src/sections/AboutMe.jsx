import { useI18n } from '../i18n';
import { useUI } from '../ui';
import Reveal from '../components/Reveal';
import Rise from '../components/Rise';
import './AboutMe.css';

export default function AboutMe() {
  const { t } = useI18n();
  const { openResume } = useUI();
  const a = t.aboutme;
  const ai = t.life?.ai; // reuse the NEIGE / gesture showcase data

  return (
    <div className="ab">
      <div className="shell ab__inner">
        <Reveal className="ab__top">
          <p className="eyebrow">{a.eyebrow}</p>
          <button className="ab__resume" onClick={openResume}>{a.resumeCta} ↗</button>
        </Reveal>

        {/* intro — portrait + identity */}
        <div className="ab__hero">
          <Reveal className="ab__portrait">
            <img src="/assets/about/portrait.jpg" alt={a.name} loading="lazy" />
          </Reveal>
          <div className="ab__lede">
            <Rise as="h1" className="ab__name" delay={0.05}>{a.name}</Rise>
            <Reveal delay={0.14}>
              <p className="ab__title">{a.title}</p>
              <p className="ab__lead">{a.lead}</p>
              {a.bio.map((p, i) => <p key={i} className="ab__bio">{p}</p>)}
            </Reveal>
          </div>
        </div>

        {/* quick facts */}
        <Reveal className="ab__facts">
          {a.facts.map((f) => (
            <div key={f.k} className="ab__fact">
              <span className="ab__fact-k">{f.k}</span>
              <span className="ab__fact-v">{f.v}</span>
            </div>
          ))}
        </Reveal>

        {/* career timeline */}
        <section className="ab__block">
          <Reveal><h2 className="ab__block-title">{a.timelineTitle}</h2></Reveal>
          <div className="ab__timeline">
            {a.timeline.map((job, i) => (
              <Reveal key={i} className="tl" delay={i * 0.05}>
                <div className="tl__period">{job.period}</div>
                <div className="tl__body">
                  <h3 className="tl__org">{job.org}</h3>
                  <p className="tl__role">{job.role}</p>
                  <ul className="tl__points">
                    {job.points.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* why AI */}
        <section className="ab__block ab__why">
          <Reveal>
            <p className="eyebrow">{a.whyAiTitle}</p>
            <p className="ab__why-text">{a.whyAi}</p>
          </Reveal>
        </section>

        {/* AI projects — reused NEIGE / gesture showcase */}
        {ai && (
          <section className="ab__block">
            <Reveal>
              <p className="eyebrow">{ai.eyebrow}</p>
              <h2 className="ab__block-title">{ai.title}</h2>
              <p className="ab__ai-intro">{ai.intro}</p>
            </Reveal>
            <div className="ab__ai-grid">
              {ai.projects.map((p) => (
                <Reveal key={p.id} className="aic" delay={0.06}>
                  <div className="aic__top">
                    <h3 className="aic__name">{p.name}</h3>
                    <p className="aic__tag">{p.tag}</p>
                  </div>
                  <p className="aic__desc">{p.desc}</p>
                  <ul className="aic__stack">
                    {p.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <div className="aic__links">
                    {p.links.map((lnk) => (
                      <a
                        key={lnk.url}
                        className={`aic__link${lnk.primary ? ' aic__link--primary' : ''}`}
                        href={lnk.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lnk.label} ↗
                      </a>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
