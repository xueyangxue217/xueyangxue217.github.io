import { createContext, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from './i18n';

const UIContext = createContext(null);
const RESUME_URL = '/resume.pdf';

export function UIProvider({ children }) {
  const [resumeOpen, setResumeOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setResumeOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = resumeOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [resumeOpen]);

  const r = t.resume;

  return (
    <UIContext.Provider value={{ openResume: () => setResumeOpen(true), closeResume: () => setResumeOpen(false) }}>
      {children}
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            className="resume-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setResumeOpen(false)}
          >
            <motion.div
              className="resume-modal__panel"
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="resume-modal__bar">
                <span className="resume-modal__title">{r.title}</span>
                <div className="resume-modal__actions">
                  <a className="resume-modal__link" href={RESUME_URL} download>{r.download}</a>
                  <button className="resume-modal__close" onClick={() => setResumeOpen(false)}>{r.close} ✕</button>
                </div>
              </div>
              <iframe className="resume-modal__frame" src={`${RESUME_URL}#view=FitH`} title={r.title} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
