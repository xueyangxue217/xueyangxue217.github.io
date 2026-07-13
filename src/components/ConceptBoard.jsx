// A quiet "designer's workspace" concept board for DayDots — sketches,
// sticky notes, a flow, a wireframe and brand dots. Not an app screenshot.
// Green-accented, light, hand-drawn feel. Pure SVG so it scales cleanly.
export default function ConceptBoard() {
  return (
    <svg className="dd-board" viewBox="0 0 520 440" role="img" aria-label="DayDots concept board" xmlns="http://www.w3.org/2000/svg">
      {/* panel */}
      <rect x="0" y="0" width="520" height="440" rx="18" fill="#F4F8F5" />

      {/* faint grid dots */}
      <g fill="#DCE7E0">
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 9 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={40 + c * 55} cy={44 + r * 55} r="1.4" />
          ))
        )}
      </g>

      {/* — DayDots wordmark + logo dots — */}
      <g>
        <circle cx="52" cy="52" r="7" fill="#2F9E77" />
        <circle cx="68" cy="52" r="4.5" fill="#8FCBB1" />
        <circle cx="80" cy="52" r="2.8" fill="#C6E3D6" />
        <text x="96" y="57" fontFamily="Inter, sans-serif" fontSize="17" fontWeight="700" fill="#1F2A25">DayDots</text>
      </g>

      {/* — brand color dots (a small palette) — */}
      <g>
        <text x="44" y="98" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="1.5" fill="#8A968F">PALETTE</text>
        <circle cx="50" cy="118" r="9" fill="#2F9E77" />
        <circle cx="74" cy="118" r="9" fill="#E0A458" />
        <circle cx="98" cy="118" r="9" fill="#D97A6C" />
        <circle cx="122" cy="118" r="9" fill="#6B8AA6" />
        <circle cx="146" cy="118" r="9" fill="#EFE7DA" />
      </g>

      {/* — wireframe card (hand-drawn) — */}
      <g transform="translate(300 40) rotate(-3)" stroke="#B9C6BF" strokeWidth="1.6" fill="none">
        <rect x="0" y="0" width="150" height="110" rx="10" fill="#FFFFFF" />
        <rect x="14" y="16" width="46" height="46" rx="8" fill="#EAF3EE" stroke="none" />
        <line x1="72" y1="22" x2="132" y2="22" />
        <line x1="72" y1="34" x2="120" y2="34" />
        <line x1="14" y1="78" x2="136" y2="78" />
        <line x1="14" y1="90" x2="100" y2="90" />
        <rect x="96" y="82" width="40" height="18" rx="9" fill="#2F9E77" stroke="none" />
      </g>

      {/* — sticky note — */}
      <g transform="translate(60 210) rotate(-5)">
        <rect x="0" y="0" width="118" height="104" rx="4" fill="#FBF6C9" />
        <path d="M118 78 L118 104 L92 104 Z" fill="#EDE4A6" />
        <g stroke="#B9AE63" strokeWidth="2" strokeLinecap="round">
          <line x1="16" y1="30" x2="96" y2="30" />
          <line x1="16" y1="48" x2="96" y2="48" />
          <line x1="16" y1="66" x2="70" y2="66" />
        </g>
      </g>

      {/* — hand sketch squiggle — */}
      <path d="M210 176 C 232 160, 250 196, 274 176 S 316 160, 338 180" stroke="#D97A6C" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* — flow diagram — */}
      <g transform="translate(212 250)">
        <g fill="#FFFFFF" stroke="#B9C6BF" strokeWidth="1.6">
          <rect x="0" y="0" width="64" height="34" rx="8" />
          <rect x="96" y="0" width="64" height="34" rx="8" />
          <rect x="200" y="0" width="72" height="34" rx="8" />
        </g>
        <g fill="#4A574F" fontFamily="Inter, sans-serif" fontSize="11" textAnchor="middle">
          <text x="32" y="21">Idea</text>
          <text x="128" y="21">Design</text>
          <text x="236" y="21">Build</text>
        </g>
        <g stroke="#9DB3A8" strokeWidth="1.6" markerEnd="url(#dd-arrow)">
          <line x1="64" y1="17" x2="92" y2="17" />
          <line x1="160" y1="17" x2="196" y2="17" />
        </g>
        <circle cx="236" cy="52" r="4" fill="#2F9E77" />
      </g>

      {/* — small UI fragment (toggle + pill) — */}
      <g transform="translate(330 360)">
        <rect x="0" y="0" width="150" height="46" rx="12" fill="#FFFFFF" stroke="#E3ECE7" strokeWidth="1.4" />
        <rect x="14" y="14" width="34" height="18" rx="9" fill="#CDE7DA" />
        <circle cx="39" cy="23" r="7" fill="#2F9E77" />
        <line x1="62" y1="19" x2="120" y2="19" stroke="#C7D2CC" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="62" y1="29" x2="104" y2="29" stroke="#DDE5E0" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      <defs>
        <marker id="dd-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#9DB3A8" />
        </marker>
      </defs>
    </svg>
  );
}
