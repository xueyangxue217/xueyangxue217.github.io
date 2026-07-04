import './Logotype.css';

// Plain "YANG XUE" wordmark (special effect removed).
export default function Logotype({ onClick, size = 'md' }) {
  return (
    <button className={`logotype logotype--${size}`} onClick={onClick} aria-label="YANG XUE — home">
      <span className="lt-word">YANG XUE</span>
    </button>
  );
}
