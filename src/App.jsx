import './App.css';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useI18n } from './i18n';
import Nav from './sections/Nav';
import Home from './sections/Home';
import AboutMe from './sections/AboutMe';
import Work from './sections/Work';
import Services from './sections/Services';
import DayDotsConcept from './sections/DayDotsConcept';
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

const VIEWS = ['home', 'about', 'work', 'services', 'concept', 'contact'];
// hash can be `#work` or a deep link like `#work/proj-1` (opens that case study)
const parseHash = () => {
  const raw = window.location.hash.replace(/^#/, '');
  const [v, slug] = raw.split('/');
  return { view: VIEWS.includes(v) ? v : 'home', slug: slug || null };
};

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const { view, slug } = route;

  useEffect(() => {
    window.history.replaceState(route, '', `#${route.view}${route.slug ? '/' + route.slug : ''}`);
    const onPop = () => setRoute(parseHash());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = (v, s = null) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (v === view && s === slug) return;
    setRoute({ view: v, slug: s });
    window.history.pushState({ view: v, slug: s }, '', `#${v}${s ? '/' + s : ''}`);
  };
  const goHome = () => navigate('home');

  return (
    <MotionConfig reducedMotion="user">
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
              <Work openSlug={slug} onOpen={(s) => navigate('work', s)} onClose={() => navigate('work')} onNavigate={navigate} />
            </motion.div>
          )}
          {view === 'services' && (
            <motion.div key="services" {...fade}>
              <Services onNavigate={navigate} />
            </motion.div>
          )}
          {view === 'concept' && (
            <motion.div key="concept" {...fade}>
              <DayDotsConcept onBack={() => navigate('work')} />
            </motion.div>
          )}
          {view === 'contact' && (
            <motion.div key="contact" {...fade}>
              <Contact onBack={goHome} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
