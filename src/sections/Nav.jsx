import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import Logotype from '../components/Logotype';

export default function Nav() {
  const { lang, toggle } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <div className="nav__inner shell">
        <Logotype onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

        <button className="nav__lang" onClick={toggle} aria-label="switch language">
          <span className={lang === 'zh' ? 'on' : ''}>中</span>
          <span className="sep">/</span>
          <span className={lang === 'en' ? 'on' : ''}>EN</span>
        </button>
      </div>
    </header>
  );
}
