import { createContext, useContext, useEffect, useState } from 'react';
import zh from './zh';
import en from './en';

const DICT = { zh, en };
const KEY = 'yx-lang';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(KEY) || 'en');

  useEffect(() => {
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  const t = DICT[lang];
  const toggle = () => setLang((l) => (l === 'zh' ? 'en' : 'zh'));

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
