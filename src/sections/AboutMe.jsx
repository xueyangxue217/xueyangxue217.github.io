import { useI18n } from '../i18n';
import { useUI } from '../ui';
import Reveal from '../components/Reveal';
import Rise from '../components/Rise';
import './AboutMe.css';

export default function AboutMe() {
  const { t } = useI18n();
  const { openResume } = useUI();
  const a = t.aboutme;

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
            <Rise as="h1" className="ab__name" onLoad delay={0.05}>{a.title}</Rise>
            <Reveal delay={0.14}>
              {a.bio.map((p, i) => <p key={i} className="ab__bio">{p}</p>)}
              <p className="ab__closing">{a.closing}</p>
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
      </div>
    </div>
  );
}
