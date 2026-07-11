import './App.css';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from './i18n';
import Nav from './sections/Nav';
import Home from './sections/Home';
import AboutMe from './sections/AboutMe';
import Work from './sections/Work';
import Services from './sections/Services';
import Contact from './sections/Contact';

// Consulting site. Landing is the Home hero (no cover gate). Sections are
// switched via `view` + URL hash; About/Work/Contact are being reskinned to
// the new Ivory + Oxblood system phase by phase.

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

const VIEWS = ['home', 'about', 'work', 'services', 'contact'];
const viewFromHash = () => {
  const h = window.location.hash.replace('#', '');
  return VIEWS.includes(h) ? h : 'home';
};

export default function App() {
  const [view, setView] = useState(viewFromHash);

  useEffect(() => {
    window.history.replaceState({ view }, '', `#${view}`);
    const onPop = () => setView(viewFromHash());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = (v) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (v === view) return;
    setView(v);
    window.history.pushState({ view: v }, '', `#${v}`);
  };
  const goHome = () => navigate('home');

  return (
    <>
      <Nav view={view} onNavigate={navigate} />
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="home" {...fade}>
              <Home onNavigate={navigate} />
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
          {view === 'services' && (
            <motion.div key="services" {...fade}>
              <Services onNavigate={navigate} />
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
