import { useI18n } from '../i18n';
import Reveal from '../components/Reveal';
import './Contact.css';

const EMAIL = 'yangxue-217@hotmail.com';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Wuhan+China';

export default function Contact({ onBack }) {
  const { t } = useI18n();
  const c = t.contact;

  return (
    <section className="co shell">
      <button className="co__back" onClick={onBack}>← {c.back}</button>

      <div className="co__cols">
        {/* left — big serif statement (cover font) */}
        <Reveal className="co__left">
          <span className="co__tick" aria-hidden="true" />
          <h1 className="co__statement">
            {c.statement.map((line, i) => <span key={i}>{line}</span>)}
          </h1>
        </Reveal>

        {/* right — orbit graphic + email + location */}
        <Reveal className="co__right" delay={0.1}>
          <svg className="co__orbit" viewBox="0 0 260 150" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="0.8">
              <circle cx="95" cy="75" r="46" />
              <circle cx="130" cy="75" r="46" />
              <ellipse cx="165" cy="75" rx="18" ry="46" />
              <ellipse cx="165" cy="75" rx="36" ry="46" />
              <circle cx="165" cy="75" r="46" />
              <circle cx="180" cy="75" r="30" />
              <circle cx="188" cy="75" r="16" />
            </g>
          </svg>

          <div className="co__row">
            <p className="co__blurb">{c.blurb}</p>
            <a className="co__email" href={`mailto:${EMAIL}`}>
              {EMAIL} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <hr className="co__rule" />

          <div className="co__row">
            <p className="co__addr">
              <span className="co__label">{c.locationLabel}</span>
              {c.location}
            </p>
            <a className="co__maps" href={MAPS_URL} target="_blank" rel="noreferrer">
              {c.maps} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
