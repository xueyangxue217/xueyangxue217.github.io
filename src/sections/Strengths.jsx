import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';

export default function Strengths() {
  const { t } = useI18n();
  const s = t.strengths;

  return (
    <section id="strengths" className="strengths shell section-pad">
      <Reveal>
        <p className="eyebrow">{s.eyebrow}</p>
        <h2 className="section-title">{s.title}</h2>
        <p className="section-sub">{s.sub}</p>
      </Reveal>

      <div className="str__grid">
        {s.items.map((it, i) => (
          <Reveal key={it.t} className="str__card" delay={(i % 3) * 0.06}>
            <span className="str__num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="str__title">{it.t}</h3>
            <p className="str__desc">{it.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
