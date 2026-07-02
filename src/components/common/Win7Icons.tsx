import React from 'react';

// 1. My Computer Icon: Detailed 3D LCD monitor + PC Desktop Tower
export const ComputerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
    <defs>
      {/* PC Tower Gradients */}
      <linearGradient id="towerGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2e353d" />
        <stop offset="30%" stopColor="#4a535e" />
        <stop offset="70%" stopColor="#353b43" />
        <stop offset="100%" stopColor="#1e2226" />
      </linearGradient>
      {/* Monitor Bezel */}
      <linearGradient id="bezelGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#373d45" />
        <stop offset="100%" stopColor="#181b20" />
      </linearGradient>
      {/* Screen Gradient */}
      <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1d86e2" />
        <stop offset="50%" stopColor="#0852ad" />
        <stop offset="100%" stopColor="#022a68" />
      </linearGradient>
      {/* Metal Stand */}
      <linearGradient id="standGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#cfd8dc" />
        <stop offset="50%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#90a4ae" />
      </linearGradient>
    </defs>

    {/* PC Tower (Standing behind on the right) */}
    <rect x="29" y="8" width="11" height="30" rx="1.5" fill="url(#towerGrad)" />
    {/* CD-ROM drive line */}
    <line x1="31" y1="12" x2="38" y2="12" stroke="#607d8b" strokeWidth="1" />
    <line x1="31" y1="15" x2="38" y2="15" stroke="#101214" strokeWidth="1" />
    {/* Power Button */}
    <circle cx="34.5" cy="22" r="1.5" fill="#4caf50" filter="drop-shadow(0 0 1px #4caf50)" />
    {/* Tower ventilation grille lines */}
    <line x1="31" y1="28" x2="38" y2="28" stroke="#1e2226" strokeWidth="1" />
    <line x1="31" y1="30" x2="38" y2="30" stroke="#1e2226" strokeWidth="1" />
    <line x1="31" y1="32" x2="38" y2="32" stroke="#1e2226" strokeWidth="1" />

    {/* Monitor Stand Base */}
    <ellipse cx="18" cy="41" rx="9" ry="2.5" fill="url(#standGrad)" stroke="#78909c" strokeWidth="0.5" />
    {/* Monitor Stand Neck */}
    <path d="M 16 33 L 20 33 L 21 40 L 15 40 Z" fill="url(#standGrad)" stroke="#78909c" strokeWidth="0.5" />

    {/* Monitor Main Bezel (Outer) */}
    <rect x="3" y="10" width="30" height="23" rx="2" fill="url(#bezelGrad)" stroke="#101214" strokeWidth="1" />
    {/* Inner Bezel Border */}
    <rect x="4.5" y="11.5" width="27" height="20" rx="1" fill="none" stroke="#546e7a" strokeWidth="0.5" />

    {/* LCD Screen Glass */}
    <rect x="5.5" y="12.5" width="25" height="18" fill="url(#screenGrad)" />
    {/* Screen Glass Reflection Overlay */}
    <path d="M 5.5 12.5 L 30.5 12.5 L 30.5 20 C 20.5 16.5, 12.5 21, 5.5 17.5 Z" fill="rgba(255, 255, 255, 0.22)" />
    
    {/* Green power LED on Monitor */}
    <circle cx="18" cy="31.7" r="0.5" fill="#4caf50" />
  </svg>
);

// 2. Recycle Bin Icon: Translucent glass wastebasket + green arrow symbol + papers
export const RecycleBinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
    <defs>
      <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#cfd8dc" />
      </linearGradient>
      <linearGradient id="binRim" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#e2f1fc" />
        <stop offset="50%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#90caf9" />
      </linearGradient>
      <linearGradient id="binBody" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(144, 202, 249, 0.45)" />
        <stop offset="30%" stopColor="rgba(227, 242, 253, 0.35)" />
        <stop offset="70%" stopColor="rgba(100, 181, 246, 0.4)" />
        <stop offset="100%" stopColor="rgba(30, 136, 229, 0.55)" />
      </linearGradient>
    </defs>

    {/* Crumpled Papers inside the Bin */}
    <path d="M 16 14 Q 13 8, 19 9 L 24 13 Z" fill="url(#paperGrad)" stroke="#b0bec5" strokeWidth="0.5" />
    <path d="M 23 12 Q 26 6, 31 10 L 29 14 Z" fill="url(#paperGrad)" stroke="#b0bec5" strokeWidth="0.5" />
    <path d="M 18 13 L 28 13 L 26 8 L 20 9 Z" fill="#eceff1" />

    {/* Bin Back Wall (Inner shadow look) */}
    <path d="M 12 15 C 12 15, 24 19, 36 15 L 32 41 C 32 41, 24 43, 16 41 Z" fill="rgba(13, 71, 161, 0.15)" />

    {/* Bin Vertical Glass Ribs (Back) */}
    <line x1="17" y1="16" x2="20" y2="40" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
    <line x1="24" y1="17" x2="24" y2="41" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" />
    <line x1="31" y1="16" x2="28" y2="40" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />

    {/* Bin Translucent Body */}
    <path
      d="M 11.5 15 C 11.5 13, 36.5 13, 36.5 15 L 32.5 41.5 C 32.5 43.5, 15.5 43.5, 15.5 41.5 Z"
      fill="url(#binBody)"
      stroke="rgba(255, 255, 255, 0.5)"
      strokeWidth="0.75"
    />

    {/* Bin Front Glass Ribs (Reflective Highlights) */}
    <line x1="14" y1="16" x2="17.5" y2="40" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />
    <line x1="20" y1="17" x2="21.5" y2="41" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.5" />
    <line x1="28" y1="17" x2="26.5" y2="41" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.5" />
    <line x1="34" y1="16" x2="30.5" y2="40" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" />

    {/* Tilted Glass Rim (Aero Glow Effect) */}
    <ellipse cx="24" cy="15" rx="12.5" ry="2.5" fill="none" stroke="url(#binRim)" strokeWidth="1.5" filter="drop-shadow(0 1px 1px rgba(0,0,0,0.15))" />

    {/* Bin Base Rim */}
    <ellipse cx="24" cy="41.5" rx="8.5" ry="1.5" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.75" />

    {/* Green Recycling Logo Overlay on Front */}
    <g transform="translate(18, 22) scale(0.24)" opacity="0.85" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))">
      <path d="M 24 4 C 18 4, 13 8, 10 13 L 14 16 C 16 12, 20 9, 24 9 L 24 14 L 32 8 L 24 2 Z" fill="#2e7d32" />
      <path d="M 40 18 L 32 21 C 34 24, 34 29, 31 33 L 36 37 C 41 32, 42 24, 40 18 Z" fill="#2e7d32" transform="rotate(120, 24, 24)" />
      <path d="M 40 18 L 32 21 C 34 24, 34 29, 31 33 L 36 37 C 41 32, 42 24, 40 18 Z" fill="#2e7d32" transform="rotate(240, 24, 24)" />
    </g>
  </svg>
);

// 3. Internet Explorer Icon: Glossy blue lowercase "e" + golden-yellow orbital ring
export const InternetExplorerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
    <defs>
      {/* Blue Glossy "e" Gradients */}
      <linearGradient id="ieBlueGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4fc3f7" />
        <stop offset="40%" stopColor="#0288d1" />
        <stop offset="80%" stopColor="#01579b" />
        <stop offset="100%" stopColor="#002f6c" />
      </linearGradient>
      {/* Gold Ring Gradients */}
      <linearGradient id="ieGoldGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffe082" />
        <stop offset="35%" stopColor="#ffb300" />
        <stop offset="70%" stopColor="#ff8f00" />
        <stop offset="100%" stopColor="#e65100" />
      </linearGradient>
      {/* Shadow */}
      <filter id="ieDropShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.45" />
      </filter>
    </defs>

    {/* Back part of the Gold Orbit (passes behind the "e") */}
    <path
      d="M 6 36 C -1 26, 4 10, 24 5 C 37 2, 46 8, 44 16 C 43 18, 38 18, 35 15 C 33 13, 27 10, 21 11 C 11 13, 8 23, 13 30 C 15 32, 18 34, 21 34"
      fill="none"
      stroke="url(#ieGoldGrad)"
      strokeWidth="4.5"
      strokeLinecap="round"
      filter="url(#ieDropShadow)"
    />

    {/* The Blue "e" Body */}
    <path
      d="M 37.5 22 C 38.5 22, 39 21, 39 19 C 39 9, 28.5 4, 19.5 7.5 C 9.5 11.5, 6.5 22.5, 9.5 32.5 C 12.5 41.5, 23.5 43.5, 32.5 39.5 C 39.5 36.5, 41 29.5, 39.5 25.5 L 18 25.5 C 17.5 25.5, 17 26, 17 26.5 C 17 28.5, 19.5 33.5, 24.5 33.5 C 29.5 33.5, 31 30.5, 31 29 C 31 28, 30 28, 29.5 28 C 24.5 28, 20.5 27, 18.5 24 C 18 23.5, 18 22.5, 18.5 22.5 L 37.5 22.5 Z"
      fill="url(#ieBlueGrad)"
      filter="url(#ieDropShadow)"
    />
    
    {/* Inner curve of "e" (defines the upper loop hole) */}
    <path
      d="M 18.2 21 C 18.5 15.5, 23.5 12, 28.5 13.5 C 31.5 14.5, 32.5 17.5, 32.5 21 Z"
      fill="#ffffff"
      opacity="0.12"
    />

    {/* Front part of the Gold Orbit (passes in front of the "e") */}
    <path
      d="M 21 34 C 27 34, 38 31, 42.5 24.5 C 47.5 17, 44 9, 34.5 7 C 27.5 5.5, 25 8.5, 24.5 9 C 24 9.5, 24.5 10, 25.5 9.5 C 31.5 7.5, 38 10, 39 15.5 C 40 22, 28 27.5, 16 29 C 11.5 29.5, 7.5 32.5, 6 36"
      fill="none"
      stroke="url(#ieGoldGrad)"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Glass Flare Reflection Highlight across the top-left curve */}
    <path
      d="M 12.5 14.5 C 17 9.5, 26.5 8, 32 12.5 C 27.5 10, 18 11.5, 14 17.5 Z"
      fill="#ffffff"
      opacity="0.55"
    />
  </svg>
);

// 4. File Explorer Icon: 3D Yellow folder with papers inside
export const FolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
    <defs>
      <linearGradient id="folderBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbc02d" />
        <stop offset="100%" stopColor="#f57f17" />
      </linearGradient>
      <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffeb3b" />
        <stop offset="45%" stopColor="#fbc02d" />
        <stop offset="100%" stopColor="#f9a825" />
      </linearGradient>
      <linearGradient id="docGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e0e0e0" />
      </linearGradient>
    </defs>

    {/* Folder Back Cover + Tab */}
    <path d="M 4 8 C 4 6.5, 5.5 5, 7 5 L 18 5 C 20 5, 22 7, 23 8 L 25 10 L 41 10 C 42.5 10, 44 11.5, 44 13 L 44 38 C 44 39.5, 42.5 41, 41 41 L 7 41 C 5.5 41, 4 39.5, 4 38 Z" fill="url(#folderBack)" />

    {/* Documents peaking out */}
    {/* Doc 1 (Back, slightly tilted) */}
    <path d="M 12 7 L 34 7 L 34 22 L 12 22 Z" fill="url(#docGrad)" stroke="#b0bec5" strokeWidth="0.5" transform="rotate(-3, 23, 14.5)" />
    {/* Doc Lines on Doc 1 */}
    <line x1="15" y1="10" x2="28" y2="10" stroke="#78909c" strokeWidth="1" transform="rotate(-3, 23, 14.5)" />
    <line x1="15" y1="13" x2="31" y2="13" stroke="#78909c" strokeWidth="1" transform="rotate(-3, 23, 14.5)" />
    <line x1="15" y1="16" x2="25" y2="16" stroke="#90a4ae" strokeWidth="1" transform="rotate(-3, 23, 14.5)" />

    {/* Doc 2 (Front, straight) */}
    <path d="M 16 9 L 38 9 C 39 9, 39.5 9.5, 39.5 10.5 L 39.5 24 L 16 24 Z" fill="#ffffff" stroke="#90a4ae" strokeWidth="0.5" />
    {/* Blue Picture placeholder inside Doc 2 */}
    <rect x="20" y="12" width="6" height="5" fill="#42a5f5" rx="0.5" />
    <circle cx="21.5" cy="13.5" r="0.75" fill="#ffe082" />
    <line x1="28" y1="13" x2="36" y2="13" stroke="#90a4ae" strokeWidth="1" />
    <line x1="28" y1="16" x2="36" y2="16" stroke="#90a4ae" strokeWidth="1" />
    <line x1="20" y1="20" x2="36" y2="20" stroke="#b0bec5" strokeWidth="1" />

    {/* 3D Folder Front Cover (tilted forward at the top) */}
    <path d="M 4 14 C 4 12.5, 5.5 12, 7 12 L 41 12 C 42.5 12, 44 13.5, 43.5 15.5 L 39.5 39 C 39 40.5, 37.5 41.5, 36 41.5 L 7 41.5 C 5 41.5, 3.5 40, 3.5 38 L 4 14 Z" fill="url(#folderFront)" filter="drop-shadow(0 -2px 3px rgba(0,0,0,0.18))" />

    {/* Front Highlight reflection line */}
    <path d="M 6.8 13.5 L 41.2 13.5 C 42 13.5, 42.5 14, 42.4 14.8 L 41.8 18.5 L 5.8 18.5 Z" fill="rgba(255, 255, 255, 0.25)" />
  </svg>
);

// 5. Notepad Icon: Notepad with blue header, lines, red margin, and pencil
export const NotepadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
    <defs>
      <linearGradient id="padGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fffde7" />
        <stop offset="100%" stopColor="#fff59d" />
      </linearGradient>
      <linearGradient id="pencilGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffb74d" />
        <stop offset="100%" stopColor="#f57c00" />
      </linearGradient>
    </defs>

    {/* Main Notepad Paper Body */}
    <rect x="7" y="6" width="34" height="38" rx="2" fill="url(#padGrad)" stroke="#d4cb79" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))" />
    
    {/* Blue top cover ring section */}
    <path d="M 7 8 C 7 6.5, 8.5 6, 10 6 L 38 6 C 39.5 6, 41 6.5, 41 8 L 41 12 L 7 12 Z" fill="#1e88e5" />
    {/* Spiral Binder Holes */}
    <circle cx="12" cy="9" r="1" fill="#0d47a1" />
    <circle cx="18" cy="9" r="1" fill="#0d47a1" />
    <circle cx="24" cy="9" r="1" fill="#0d47a1" />
    <circle cx="30" cy="9" r="1" fill="#0d47a1" />
    <circle cx="36" cy="9" r="1" fill="#0d47a1" />

    {/* Red Margin Line */}
    <line x1="14" y1="12" x2="14" y2="43" stroke="#e57373" strokeWidth="0.75" />

    {/* Blue Notebook Horizontal Lines */}
    <line x1="15" y1="17" x2="38" y2="17" stroke="#90caf9" strokeWidth="0.75" />
    <line x1="15" y1="21" x2="38" y2="21" stroke="#90caf9" strokeWidth="0.75" />
    <line x1="15" y1="25" x2="38" y2="25" stroke="#90caf9" strokeWidth="0.75" />
    <line x1="15" y1="29" x2="38" y2="29" stroke="#90caf9" strokeWidth="0.75" />
    <line x1="15" y1="33" x2="38" y2="33" stroke="#90caf9" strokeWidth="0.75" />
    <line x1="15" y1="37" x2="38" y2="37" stroke="#90caf9" strokeWidth="0.75" />
    <line x1="15" y1="41" x2="38" y2="41" stroke="#90caf9" strokeWidth="0.75" />

    {/* The Pencil lying diagonally */}
    <g transform="translate(18, 16) rotate(35) scale(0.95)" filter="drop-shadow(1px 2px 2px rgba(0,0,0,0.22))">
      {/* Pencil Body */}
      <rect x="0" y="0" width="22" height="3.5" fill="url(#pencilGrad)" rx="0.5" />
      {/* Pencil Tip (Wood) */}
      <polygon points="0,1.75 -4,0.5 -4,3" fill="#ffe0b2" />
      {/* Pencil Lead */}
      <polygon points="-3,1.3 -4,0.5 -4,3 -3,2.2" fill="#37474f" />
      {/* Silver Band */}
      <rect x="22" y="0" width="2.5" height="3.5" fill="#b0bec5" />
      {/* Red Eraser */}
      <rect x="24.5" y="0" width="3.5" height="3.5" fill="#ff8a80" rx="0.5" />
    </g>
  </svg>
);

// 6. Calculator Icon: Detailed 3D Grid calculator with LCD panel
export const CalculatorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" width="1em" height="1em" {...props}>
    <defs>
      <linearGradient id="calcBezel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#cfd8dc" />
        <stop offset="100%" stopColor="#78909c" />
      </linearGradient>
      <linearGradient id="calcScreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#546e7a" />
        <stop offset="100%" stopColor="#263238" />
      </linearGradient>
      <linearGradient id="numKey" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#cfd8dc" />
      </linearGradient>
      <linearGradient id="opKey" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#b0bec5" />
        <stop offset="100%" stopColor="#78909c" />
      </linearGradient>
      <linearGradient id="equalKey" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffb74d" />
        <stop offset="100%" stopColor="#e65100" />
      </linearGradient>
    </defs>

    {/* Calculator Body Chrome */}
    <rect x="8" y="4" width="32" height="40" rx="3" fill="url(#calcBezel)" stroke="#455a64" strokeWidth="1" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.3))" />
    {/* Inner shadow bevel highlight */}
    <rect x="9.5" y="5.5" width="29" height="37" rx="1.5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />

    {/* LCD Screen Display */}
    <rect x="11" y="8" width="26" height="9" rx="1" fill="url(#calcScreen)" stroke="#1a252c" strokeWidth="0.75" />
    {/* Green LCD numbers glow */}
    <text x="34" y="15" fill="#00e676" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="end" filter="drop-shadow(0 0 1px #00e676)" opacity="0.9">
      7,026.
    </text>

    {/* Keypad Layout */}
    <g transform="translate(11, 20)">
      {/* Row 1 */}
      <rect x="0" y="0" width="5" height="4" rx="0.5" fill="#ef5350" stroke="#c62828" strokeWidth="0.5" />
      <rect x="6" y="0" width="5" height="4" rx="0.5" fill="url(#opKey)" stroke="#455a64" strokeWidth="0.5" />
      <rect x="12" y="0" width="5" height="4" rx="0.5" fill="url(#opKey)" stroke="#455a64" strokeWidth="0.5" />
      <rect x="18" y="0" width="8" height="4" rx="0.5" fill="url(#opKey)" stroke="#455a64" strokeWidth="0.5" />

      {/* Row 2 */}
      <rect x="0" y="5" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      <rect x="6" y="5" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      <rect x="12" y="5" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      <rect x="18" y="5" width="8" height="4" rx="0.5" fill="url(#opKey)" stroke="#455a64" strokeWidth="0.5" />

      {/* Row 3 */}
      <rect x="0" y="10" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      <rect x="6" y="10" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      <rect x="12" y="10" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      <rect x="18" y="10" width="8" height="4" rx="0.5" fill="url(#opKey)" stroke="#455a64" strokeWidth="0.5" />

      {/* Row 4 */}
      <rect x="0" y="15" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      <rect x="6" y="15" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      <rect x="12" y="15" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      
      {/* Large double-height equals key */}
      <rect x="18" y="15" width="8" height="9" rx="0.5" fill="url(#equalKey)" stroke="#d84315" strokeWidth="0.5" />

      {/* Row 5 */}
      <rect x="0" y="20" width="11" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
      <rect x="12" y="20" width="5" height="4" rx="0.5" fill="url(#numKey)" stroke="#90a4ae" strokeWidth="0.5" />
    </g>
  </svg>
);
