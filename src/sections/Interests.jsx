import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import Particles from '../components/Particles';
import StarBorder from '../components/StarBorder';
import { FiMusic, FiMapPin, FiFilm, FiCpu } from 'react-icons/fi';

const ICONS = {
  music: <FiMusic size={22} />,
  travel: <FiMapPin size={22} />,
  film: <FiFilm size={22} />,
  ai: <FiCpu size={22} />,
};

export default function Interests() {
  const { t } = useI18n();
  const it = t.interests;

  return (
    <section id="interests" className="interests shell section-pad">
      <Reveal>
        <p className="eyebrow">{it.eyebrow}</p>
        <h2 className="section-title">{it.title}</h2>
        <p className="section-sub">{it.sub}</p>
      </Reveal>

      <div className="int__grid">
        {it.items.map((item, i) => (
          <Reveal key={item.t} className="int__card" delay={(i % 4) * 0.05}>
            <div className="int__icon">{ICONS[item.icon]}</div>
            <h3 className="int__title">{item.t}</h3>
            <p className="int__desc">{item.d}</p>
          </Reveal>
        ))}
      </div>

      {/* NEIGE + particle interaction panel */}
      <Reveal className="neige">
        <div className="neige__particles">
          <Particles />
          <span className="neige__hint">{it.particleHint}</span>
        </div>
        <div className="neige__body">
          <span className="neige__tag">VIBE CODING</span>
          <h3 className="neige__title">{it.neigeTitle}</h3>
          <p className="neige__desc">{it.neigeDesc}</p>
          <StarBorder as="a" href="#" color="#9ec1ff" speed="5s" onClick={(e) => e.preventDefault()}>
            {it.neigeCta} →
          </StarBorder>
        </div>
      </Reveal>
    </section>
  );
}
