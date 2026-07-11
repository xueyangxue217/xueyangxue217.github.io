import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import './Nav.css';

// Sticky consulting-style header: wordmark + section links + primary CTA +
// language. Gains a solid surface + hairline once the page scrolls.
export default function Nav({ view, onNavigate }) {
  const { t, lang, toggle } = useI18n();
  const n = t.home.nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`snav ${scrolled ? 'snav--solid' : ''}`}>
      <div className="snav__inner shell">
        <button className="snav__logo" onClick={() => onNavigate('home')}>XUE&nbsp;YANG</button>

        <nav className="snav__links" aria-label="Primary">
          <button className={view === 'work' ? 'is-active' : ''} onClick={() => onNavigate('work')}>{n.work}</button>
          <button className={view === 'services' ? 'is-active' : ''} onClick={() => onNavigate('services')}>{n.services}</button>
          <button className={view === 'about' ? 'is-active' : ''} onClick={() => onNavigate('about')}>{n.about}</button>
          <button className={view === 'contact' ? 'is-active' : ''} onClick={() => onNavigate('contact')}>{n.talk}</button>
          <button className="snav__lang" onClick={toggle} aria-label="switch language">
            <span className={lang === 'en' ? 'on' : ''}>EN</span>
            <span className="sep">/</span>
            <span className={lang === 'zh' ? 'on' : ''}>中</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
