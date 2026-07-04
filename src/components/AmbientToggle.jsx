import { useEffect, useRef, useState } from 'react';
import ambient from '../audio/ambient';
import './AmbientToggle.css';

const PREF_KEY = 'yx-ambient';

// A quiet floating control for the generative background music. Browsers block
// sound before a user gesture, so we never autoplay on load — if the visitor
// previously turned it on, we arm a one-time interaction to resume it.
export default function AmbientToggle() {
  const [on, setOn] = useState(false);
  const armed = useRef(false);

  useEffect(() => {
    if (localStorage.getItem(PREF_KEY) !== 'on') return;
    const resume = () => {
      if (armed.current) return;
      armed.current = true;
      ambient.start();
      setOn(true);
      window.removeEventListener('pointerdown', resume);
    };
    window.addEventListener('pointerdown', resume);
    return () => window.removeEventListener('pointerdown', resume);
  }, []);

  const toggle = () => {
    armed.current = true;
    if (on) {
      ambient.stop();
      setOn(false);
      localStorage.setItem(PREF_KEY, 'off');
    } else {
      ambient.start();
      setOn(true);
      localStorage.setItem(PREF_KEY, 'on');
    }
  };

  return (
    <button
      className={`ambient${on ? ' ambient--on' : ''}`}
      onClick={toggle}
      aria-label={on ? 'Mute background music' : 'Play background music'}
      title={on ? '关闭背景音乐' : '开启背景音乐'}
    >
      <span className="ambient__bars" aria-hidden>
        <i /><i /><i /><i />
      </span>
    </button>
  );
}
