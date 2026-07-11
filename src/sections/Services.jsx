import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import './Services.css';

export default function Services({ onNavigate }) {
  const { t } = useI18n();
  const s = t.services;

  return (
    <div className="sv">
      <div className="shell sv__inner">
        <Reveal className="sv__head">
          <p className="eyebrow">{s.eyebrow}</p>
          <h1 className="sv__title">{s.title}</h1>
          <p className="sv__intro">{s.intro}</p>
        </Reveal>

        {/* expanded services */}
        <div className="sv__list">
          {s.items.map((it, i) => (
            <Reveal key={it.n} className="svc-row" delay={(i % 2) * 0.05}>
              <div className="svc-row__n">{it.n}</div>
              <div className="svc-row__body">
                <h2 className="svc-row__name">{it.name}</h2>
                <p className="svc-row__lead">{it.lead}</p>
                <ul className="svc-row__points">
                  {it.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <p className="svc-row__for">{it.for}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* how we work */}
        <section className="sv__how">
          <Reveal><h2 className="sv__how-title">{s.howTitle}</h2></Reveal>
          <div className="sv__how-grid">
            {s.how.map((step, i) => (
              <Reveal key={step.n} className="how" delay={i * 0.06}>
                <p className="how__n">{step.n}</p>
                <h3 className="how__t">{step.t}</h3>
                <p className="how__d">{step.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="sv__cta">
          <Reveal>
            <h2 className="sv__cta-title">{s.ctaTitle}</h2>
            <p className="sv__cta-text">{s.ctaText}</p>
            <button className="btn btn--solid" onClick={() => onNavigate('contact')}>{s.ctaBtn}</button>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
