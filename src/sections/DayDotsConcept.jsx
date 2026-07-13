import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import ConceptBoard from '../components/ConceptBoard';
import './DayDotsConcept.css';

// A quiet concept page for DayDots — vision, process, progress. Calm and
// reflective, not a product marketing page. Grows as the work does.
export default function DayDotsConcept({ onBack }) {
  const { t } = useI18n();
  const c = t.daydots.concept;

  return (
    <div className="dc">
      <div className="shell dc__inner">
        <button className="dc__back" onClick={onBack}>← {c.back}</button>

        <div className="dc__hero">
          <Reveal className="dc__hero-text">
            <span className="dc__eyebrow"><i className="dc__dot" />{c.eyebrow}</span>
            <h1 className="dc__title">{c.title}</h1>
            <p className="dc__intro">{c.intro}</p>
          </Reveal>
          <Reveal className="dc__hero-visual" delay={0.1}>
            <ConceptBoard />
          </Reveal>
        </div>

        <div className="dc__sections">
          {c.sections.map((s, i) => (
            <Reveal key={s.h} className="dc__block" delay={i * 0.06}>
              <span className="dc__block-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="dc__block-h">{s.h}</h2>
                <p className="dc__block-p">{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
