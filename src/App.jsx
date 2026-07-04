import './App.css';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from './i18n';
import CoverIntro from './components/CoverIntro';
import Nav from './sections/Nav';
import Home from './sections/Home';
import AboutMe from './sections/AboutMe';
import Work from './sections/Work';
import Life from './sections/Life';
import Contact from './sections/Contact';

// Refining the CONTENTS pages one by one. 'about' is built; the others show a
// simple placeholder until we build them. Fuller legacy sections are kept on
// disk for when we bring them back.

function ComingSoon({ onBack }) {
  const { t } = useI18n();
  return (
    <section className="shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBlock: '130px 100px' }}>
      <button className="am__back" style={{ alignSelf: 'flex-start', background: 'none', border: 0, color: 'var(--text-dim)', fontSize: 13, letterSpacing: '0.08em', marginBottom: 48 }} onClick={onBack}>
        ← {t.aboutme.back}
      </button>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,4vw,52px)', color: 'var(--text-faint)', margin: 0 }}>{t.comingSoon}</p>
    </section>
  );
}

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const VIEWS = ['home', 'about', 'work', 'life', 'contact'];
const viewFromHash = () => {
  const h = window.location.hash.replace('#', '');
  return VIEWS.includes(h) ? h : 'home';
};

export default function App() {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState(viewFromHash); // 'home' | 'about' | 'work' | 'life' | 'contact'

  // Sync the section with the URL hash so the browser's back/forward buttons
  // (and shareable #section links) work even though this is a single page.
  useEffect(() => {
    window.history.replaceState({ view }, '', `#${view}`);
    const onPop = () => setView(viewFromHash());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = (v) => {
    if (v === view) return;
    setView(v);
    window.history.pushState({ view: v }, '', `#${v}`);
  };

  const goHome = () => navigate('home');

  return (
    <>
      <AnimatePresence>
        {!entered && <CoverIntro key="cover" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <Nav />
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" {...fade}>
              <Home onSelect={navigate} />
            </motion.div>
          )}
          {view === 'about' && (
            <motion.div key="about" {...fade}>
              <AboutMe onBack={goHome} />
            </motion.div>
          )}
          {view === 'work' && (
            <motion.div key="work" {...fade}>
              <Work onBack={goHome} />
            </motion.div>
          )}
          {view === 'life' && (
            <motion.div key="life" {...fade}>
              <Life onBack={goHome} />
            </motion.div>
          )}
          {view === 'contact' && (
            <motion.div key="contact" {...fade}>
              <Contact onBack={goHome} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
