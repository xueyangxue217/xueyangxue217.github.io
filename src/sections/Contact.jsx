import { useI18n } from '../i18n';
import { useUI } from '../ui';
import Reveal from '../components/Reveal';
import Rise from '../components/Rise';
import './Contact.css';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Wuhan+China';

export default function Contact() {
  const { t } = useI18n();
  const { openResume } = useUI();
  const c = t.contact;

  // only render channels that actually have a value (no dead links)
  const rows = [
    c.email && { k: c.emailLabel, v: c.email, href: `mailto:${c.email}` },
    c.linkedin && { k: c.linkedinLabel, v: c.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: c.linkedin, ext: true },
    c.wechat && { k: c.wechatLabel, v: c.wechat },
    c.calendly && { k: c.calendlyLabel, v: c.calendlyText, href: c.calendly, ext: true },
    { k: c.resumeLabel, v: c.resumeCta, onClick: openResume },
    { k: c.locationLabel, v: c.location, href: MAPS_URL, ext: true },
  ].filter(Boolean);

  return (
    <div className="co">
      <div className="shell co__inner">
        <div className="co__head">
          <Reveal><p className="eyebrow">{c.eyebrow}</p></Reveal>
          <Rise as="h1" className="co__title" delay={0.05}>{c.title}</Rise>
          <Reveal delay={0.1}><p className="co__blurb">{c.blurb}</p></Reveal>
        </div>

        <Reveal className="co__channels" delay={0.08}>
          {rows.map((r, i) => (
            <div className="co__row" key={i}>
              <span className="co__k">{r.k}</span>
              {r.href ? (
                <a className="co__v" href={r.href} {...(r.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {r.v} <span aria-hidden>↗</span>
                </a>
              ) : r.onClick ? (
                <button className="co__v" onClick={r.onClick}>{r.v}</button>
              ) : (
                <span className="co__v co__v--static">{r.v}</span>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
