import { useI18n } from '../i18n';
import { useUI } from '../ui';
import Reveal from '../components/Reveal';
import Logotype from '../components/Logotype';
import media from '../data/media.json';

export default function About() {
  const { t } = useI18n();
  const { openResume } = useUI();
  const a = t.about;

  return (
    <section id="about" className="about shell section-pad">
      {/* opening statement */}
      <div className="about__intro">
        <Reveal>
          <p className="eyebrow">{a.eyebrow}</p>
          <div className="about__wordmark">
            <Logotype size="lg" />
          </div>
          <h1 className="about__name">{a.title}</h1>
          <p className="about__role">{a.role}</p>
          <p className="about__tagline">{a.tagline}</p>
        </Reveal>
      </div>

      <div className="about__grid">
        {/* portrait placeholder */}
        <Reveal className="about__portrait" delay={0.05}>
          <div className="portrait">
            <div className="portrait__mono">杨雪</div>
            <span className="portrait__note">人物图占位 · 待替换</span>
          </div>
        </Reveal>

        {/* bio + facts */}
        <Reveal className="about__body" delay={0.12}>
          {a.bio.map((p, i) => (
            <p key={i} className="about__p">{p}</p>
          ))}
          <ul className="about__facts">
            {a.facts.map((f) => (
              <li key={f.k}>
                <span className="fact__k">{f.k}</span>
                <span className="fact__v">{f.v}</span>
              </li>
            ))}
          </ul>
          <div className="about__cta">
            <button className="btn btn--solid" onClick={openResume}>{a.resumeCta}</button>
            <a className="btn btn--ghost" href="#contact">{a.contactCta}</a>
          </div>
        </Reveal>
      </div>

      {/* life fragments */}
      <Reveal className="about__life">
        <div className="life__head">
          <h3 className="about__exp-title">{a.lifeTitle}</h3>
          <p className="section-sub">{a.lifeSub}</p>
        </div>
        <div className="life__grid">
          {media.life.map((src, i) => (
            <Reveal key={src} className="life__item" delay={i * 0.05}>
              <img src={src} alt="" loading="lazy" />
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
