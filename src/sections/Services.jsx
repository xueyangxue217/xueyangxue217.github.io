import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import Rise from '../components/Rise';
import './Services.css';

// "How I Create Value" — three timeless cards showing how I think, design and
// build. Not a service list; a window into approach. Subtle green on hover.
export default function Services() {
  const { t } = useI18n();
  const s = t.services;

  return (
    <div className="sv">
      <div className="shell sv__inner">
        <div className="sv__head">
          <Reveal><p className="eyebrow">{s.eyebrow}</p></Reveal>
          <Rise as="h1" className="sv__title" onLoad delay={0.05}>{s.title}</Rise>
          <Reveal delay={0.1}><p className="sv__intro">{s.intro}</p></Reveal>
        </div>

        <div className="sv__cards">
          {s.cards.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.08}>
              <article className="svc-card">
                <span className="svc-card__n">{c.n}</span>
                <h2 className="svc-card__title">{c.title}</h2>
                <p className="svc-card__lead">{c.lead}</p>
                <p className="svc-card__body">{c.body}</p>

                <ul className="svc-card__tags">
                  {c.tags.map((tg) => <li key={tg}>{tg}</li>)}
                </ul>

                <div className="svc-card__process">
                  {c.process.map((p, j) => (
                    <span key={p} className="svc-card__step">
                      {p}
                      {j < c.process.length - 1 && <span className="svc-card__arrow" aria-hidden>→</span>}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
