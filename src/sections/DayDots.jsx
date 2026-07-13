import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import ConceptBoard from '../components/ConceptBoard';
import './DayDots.css';

// A quiet "currently building" section that closes the Work page. Intentionally
// lighter and calmer than the portfolio cards, with a green accent — future
// potential rather than a finished commercial project.
export default function DayDots({ onView }) {
  const { t } = useI18n();
  const d = t.daydots;

  return (
    <motion.section
      className="dd"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="dd__card">
        <div className="dd__text">
          <span className="dd__badge"><i className="dd__dot" />{d.badge}</span>
          <h2 className="dd__title">{d.title}</h2>
          <p className="dd__subtitle">{d.subtitle}</p>

          <div className="dd__why">
            <p className="dd__why-title">{d.whyTitle}</p>
            {d.why.map((p, i) => <p key={i} className="dd__why-p">{p}</p>)}
          </div>

          <ul className="dd__tags">
            {d.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>

          <ol className="dd__journey" aria-label="journey">
            {d.journey.map((step, i) => {
              const active = i === d.journey.length - 1;
              return (
                <li key={step} className={`dd__step${active ? ' is-active' : ''}`}>
                  <span className="dd__step-dot" />
                  <span className="dd__step-label">{step}</span>
                </li>
              );
            })}
          </ol>

          <div className="dd__actions">
            <button className="dd__cta" onClick={onView}>{d.cta} <span aria-hidden>→</span></button>
            <a className="dd__live" href="https://www.getdaydots.com/" target="_blank" rel="noreferrer">{d.live} <span aria-hidden>↗</span></a>
          </div>
        </div>

        <div className="dd__visual">
          <ConceptBoard />
        </div>
      </div>
    </motion.section>
  );
}
