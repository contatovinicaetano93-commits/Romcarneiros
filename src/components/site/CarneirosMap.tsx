export function CarneirosMap() {
  return (
    <svg
      viewBox="0 0 420 520"
      className="map-enter h-auto w-full max-w-md drop-shadow-lg"
      role="img"
      aria-label="Mapa estilizado do litoral de Pernambuco com destaque em Carneiros"
    >
      <defs>
        <pattern id="oceanDots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="#9aa36a" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="420" height="520" rx="18" fill="#ebe6da" opacity="0.92" />
      <rect x="0" y="0" width="170" height="520" fill="url(#oceanDots)" opacity="0.45" />
      <path
        d="M168 28c42 8 70 34 78 72 10 48-6 78 10 118 14 36 48 52 58 92 12 48-8 78 6 120 10 30 40 48 48 78 6 24-4 48-28 62H168V28Z"
        fill="#d6d7ce"
      />
      <path
        d="M168 28c28 6 52 22 62 52 14 42-2 70 12 104 12 30 40 44 48 78 10 40-4 68 8 104 8 24 32 40 38 66 4 18-2 36-20 48H168V28Z"
        fill="#c9cbbf"
      />
      <path
        d="M168 210c36 10 58 28 64 58 8 36-8 58 6 90 10 24 34 36 40 60 6 22-2 40-18 52H168V210Z"
        fill="#ebe6da"
      />
      <g>
        <line x1="250" y1="95" x2="264" y2="95" stroke="#8a8c82" strokeWidth="1" />
        <circle cx="250" cy="95" r="4" fill="#a8aaa0" stroke="#fff" strokeWidth="1.5" />
        <text x="268" y="99" fill="#2c2e28" fontSize="11" fontWeight="500" fontFamily="system-ui,sans-serif">
          Recife
        </text>
      </g>
      <g>
        <line x1="235" y1="175" x2="249" y2="175" stroke="#8a8c82" strokeWidth="1" />
        <circle cx="235" cy="175" r="4" fill="#a8aaa0" stroke="#fff" strokeWidth="1.5" />
        <text x="253" y="179" fill="#2c2e28" fontSize="11" fontWeight="500" fontFamily="system-ui,sans-serif">
          Porto de Galinhas
        </text>
      </g>
      <g>
        <line x1="248" y1="268" x2="262" y2="268" stroke="#7a8041" strokeWidth="1" />
        <circle cx="248" cy="268" r="6" fill="#7a8041" stroke="#fff" strokeWidth="1.5" />
        <text x="266" y="272" fill="#2c2e28" fontSize="13" fontWeight="700" fontFamily="system-ui,sans-serif">
          Carneiros
        </text>
      </g>
      <g>
        <line x1="255" y1="340" x2="269" y2="340" stroke="#8a8c82" strokeWidth="1" />
        <circle cx="255" cy="340" r="4" fill="#a8aaa0" stroke="#fff" strokeWidth="1.5" />
        <text x="273" y="344" fill="#2c2e28" fontSize="11" fontWeight="500" fontFamily="system-ui,sans-serif">
          Tamandaré
        </text>
      </g>
      <g>
        <line x1="270" y1="420" x2="284" y2="420" stroke="#8a8c82" strokeWidth="1" />
        <circle cx="270" cy="420" r="4" fill="#a8aaa0" stroke="#fff" strokeWidth="1.5" />
        <text x="288" y="424" fill="#2c2e28" fontSize="11" fontWeight="500" fontFamily="system-ui,sans-serif">
          São José da Coroa Grande
        </text>
      </g>
      <g transform="translate(24 430)">
        <line x1="0" y1="12" x2="56" y2="12" stroke="#9aa36a" strokeWidth="1" />
        <circle cx="0" cy="12" r="3" fill="#7a8041" />
        <text x="64" y="10" fill="#2c2e28" fontSize="11" fontFamily="system-ui,sans-serif">
          Operação Rom
        </text>
        <text x="64" y="26" fill="#5a5c54" fontSize="10" fontFamily="system-ui,sans-serif">
          26/12 → 03/01 · 10h–22h
        </text>
      </g>
    </svg>
  );
}
