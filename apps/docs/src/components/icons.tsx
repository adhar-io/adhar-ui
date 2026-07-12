/**
 * Premium custom SVG icon system for the docs site.
 * Clean, consistent 24x24 stroke icons with optional animation.
 * Replaces all emoji usage with polished vector icons.
 */
import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

const I = ({
  className = '',
  size = 18,
  strokeWidth = 1.5,
  children,
}: IconProps & { children: React.ReactNode }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    {children}
  </svg>
);

// ─── Navigation / Pages ──────────────────────────────────────────────

export const IconHome = (p: IconProps) => (
  <I {...p}>
    <path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' />
    <path d='M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
  </I>
);

export const IconPackage = (p: IconProps) => (
  <I {...p}>
    <path d='m7.5 4.27 9 5.15' />
    <path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' />
    <path d='m3.3 7 8.7 5 8.7-5' />
    <path d='M12 22V12' />
  </I>
);

export const IconPalette = (p: IconProps) => (
  <I {...p}>
    <circle cx='13.5' cy='6.5' r='0.5' fill='currentColor' />
    <circle cx='17.5' cy='10.5' r='0.5' fill='currentColor' />
    <circle cx='8.5' cy='7.5' r='0.5' fill='currentColor' />
    <circle cx='6.5' cy='12.5' r='0.5' fill='currentColor' />
    <path d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z' />
  </I>
);

export const IconTerminal = (p: IconProps) => (
  <I {...p}>
    <polyline points='4 17 10 11 4 5' />
    <line x1='12' x2='20' y1='19' y2='19' />
  </I>
);

export const IconPlay = (p: IconProps) => (
  <I {...p}>
    <polygon points='6 3 20 12 6 21 6 3' />
  </I>
);

export const IconBook = (p: IconProps) => (
  <I {...p}>
    <path d='M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20' />
  </I>
);

export const IconLightbulb = (p: IconProps) => (
  <I {...p}>
    <path d='M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5' />
    <path d='M9 18h6' />
    <path d='M10 22h4' />
  </I>
);

export const IconAccessibility = (p: IconProps) => (
  <I {...p}>
    <circle cx='16' cy='4' r='1' fill='currentColor' />
    <path d='m18 19 1-7-6 1' />
    <path d='m5 8 3-3 5.5 3-2.36 3.5' />
    <path d='M4.24 14.5a5 5 0 0 0 6.88 6' />
    <path d='M13.76 17.5a5 5 0 0 0-6.88-6' />
  </I>
);

export const IconRefresh = (p: IconProps) => (
  <I {...p}>
    <path d='M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' />
    <path d='M21 3v5h-5' />
    <path d='M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' />
    <path d='M8 16H3v5' />
  </I>
);

export const IconPuzzle = (p: IconProps) => (
  <I {...p}>
    <path d='M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z' />
  </I>
);

export const IconHandshake = (p: IconProps) => (
  <I {...p}>
    <path d='m11 17 2 2a1 1 0 1 0 3-3' />
    <path d='m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4' />
    <path d='m21 3 1 11h-2' />
    <path d='M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3' />
    <path d='M3 4h8' />
  </I>
);

export const IconClipboard = (p: IconProps) => (
  <I {...p}>
    <rect width='8' height='4' x='8' y='2' rx='1' ry='1' />
    <path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
    <path d='M12 11h4' />
    <path d='M12 16h4' />
    <path d='M8 11h.01' />
    <path d='M8 16h.01' />
  </I>
);

// ─── Component Categories ────────────────────────────────────────────

export const IconFormInput = (p: IconProps) => (
  <I {...p}>
    <path d='M11 3h10v8H11zM3 13h10v8H3z' />
    <path d='M14 3v8M6 13v8' />
  </I>
);

export const IconEye = (p: IconProps) => (
  <I {...p}>
    <path d='M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' />
    <circle cx='12' cy='12' r='3' />
  </I>
);

export const IconDisplay = (p: IconProps) => (
  <I {...p}>
    <rect x='2' y='3' width='20' height='14' rx='2' />
    <path d='M8 21h8' />
    <path d='M12 17v4' />
    <path d='M7 8h4' />
    <path d='M7 11h6' />
  </I>
);

export const IconLayout = (p: IconProps) => (
  <I {...p}>
    <rect width='18' height='18' x='3' y='3' rx='2' />
    <path d='M3 9h18' />
    <path d='M9 21V9' />
  </I>
);

export const IconMessageSquare = (p: IconProps) => (
  <I {...p}>
    <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
  </I>
);

export const IconLayers = (p: IconProps) => (
  <I {...p}>
    <path d='m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z' />
    <path d='m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65' />
    <path d='m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65' />
  </I>
);

export const IconNavigation = (p: IconProps) => (
  <I {...p}>
    <polygon points='3 11 22 2 13 21 11 13 3 11' />
  </I>
);

export const IconGrid = (p: IconProps) => (
  <I {...p}>
    <rect width='7' height='7' x='3' y='3' rx='1' />
    <rect width='7' height='7' x='14' y='3' rx='1' />
    <rect width='7' height='7' x='14' y='14' rx='1' />
    <rect width='7' height='7' x='3' y='14' rx='1' />
  </I>
);

export const IconBuilding = (p: IconProps) => (
  <I {...p}>
    <rect width='16' height='20' x='4' y='2' rx='2' ry='2' />
    <path d='M9 22v-4h6v4' />
    <path d='M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01' />
  </I>
);

export const IconSparkles = (p: IconProps) => (
  <I {...p}>
    <path d='M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' />
    <path d='M20 3v4' />
    <path d='M22 5h-4' />
  </I>
);

export const IconSmartphone = (p: IconProps) => (
  <I {...p}>
    <rect width='14' height='20' x='5' y='2' rx='2' ry='2' />
    <path d='M12 18h.01' />
  </I>
);

// ─── Feature icons ───────────────────────────────────────────────────

export const IconCode = (p: IconProps) => (
  <I {...p}>
    <polyline points='16 18 22 12 16 6' />
    <polyline points='8 6 2 12 8 18' />
  </I>
);

export const IconBrush = (p: IconProps) => (
  <I {...p}>
    <path d='m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08' />
    <path d='M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z' />
  </I>
);

export const IconShield = (p: IconProps) => (
  <I {...p}>
    <path d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' />
    <path d='m9 12 2 2 4-4' />
  </I>
);

export const IconGlobe = (p: IconProps) => (
  <I {...p}>
    <circle cx='12' cy='12' r='10' />
    <path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' />
    <path d='M2 12h20' />
  </I>
);

export const IconZap = (p: IconProps) => (
  <I {...p}>
    <path d='M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z' />
  </I>
);

export const IconLink = (p: IconProps) => (
  <I {...p}>
    <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
    <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
  </I>
);

export const IconArrowRight = (p: IconProps) => (
  <I {...p}>
    <path d='M5 12h14' />
    <path d='m12 5 7 7-7 7' />
  </I>
);

export const IconCheck = (p: IconProps) => (
  <I {...p}>
    <path d='M20 6 9 17l-5-5' />
  </I>
);

export const IconStar = (p: IconProps) => (
  <I {...p}>
    <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
  </I>
);

export const IconHeart = (p: IconProps) => (
  <I {...p}>
    <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
  </I>
);

export const IconSearch = (p: IconProps) => (
  <I {...p}>
    <circle cx='11' cy='11' r='8' />
    <path d='m21 21-4.3-4.3' />
  </I>
);

export const IconSun = (p: IconProps) => (
  <I {...p}>
    <circle cx='12' cy='12' r='4' />
    <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' />
  </I>
);

export const IconMoon = (p: IconProps) => (
  <I {...p}>
    <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
  </I>
);

// ─── Framework brand logos (Simple Icons, CC0) ──────────────────────
// Single-fill paths so they render reliably anywhere on the page.

interface BrandLogoProps {
  size?: number;
  className?: string;
}

const Brand = ({ size = 18, className = '', color, path, name }: BrandLogoProps & { color: string; path: string; name: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    role='img'
    aria-label={name}
    className={className}
    style={{ display: 'inline-block', flexShrink: 0 }}
  >
    <title>{name}</title>
    <path fill={color} d={path} />
  </svg>
);

// React: built from SVG primitives (atom = nucleus + 3 rotated orbitals).
// Renders identically everywhere — no path complexity, no fill-rule pitfalls.
export const ReactLogo = ({ size = 18, className = '' }: BrandLogoProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='-11.5 -10.232 23 20.464'
    role='img'
    aria-label='React'
    className={className}
    style={{ display: 'inline-block', flexShrink: 0 }}
  >
    <title>React</title>
    {/* nucleus */}
    <circle cx='0' cy='0' r='2.05' fill='#61DAFB' />
    {/* three orbital ellipses */}
    <g stroke='#61DAFB' strokeWidth='1' fill='none'>
      <ellipse rx='11' ry='4.2' />
      <ellipse rx='11' ry='4.2' transform='rotate(60)' />
      <ellipse rx='11' ry='4.2' transform='rotate(120)' />
    </g>
  </svg>
);

export const NextLogo = (p: BrandLogoProps) => (
  <Brand
    {...p}
    name='Next.js'
    color='currentColor'
    path='M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.105.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z'
  />
);

export const VueLogo = (p: BrandLogoProps) => (
  <Brand
    {...p}
    name='Vue.js'
    color='#4FC08D'
    path='M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z'
  />
);

export const SvelteLogo = (p: BrandLogoProps) => (
  <Brand
    {...p}
    name='Svelte'
    color='#FF3E00'
    path='M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.109 4.109 0 0 1-.703-3.107 3.898 3.898 0 0 1 .134-.522l.105-.321.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063-.02.208a1.253 1.253 0 0 0 .226.83 1.337 1.337 0 0 0 1.435.533 1.232 1.232 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778 1.242 1.242 0 0 0-.211-.937 1.338 1.338 0 0 0-1.435-.533 1.232 1.232 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.108 4.108 0 0 1-.702-3.108 3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.499 4.44 4.44 0 0 1 4.765 1.767 4.109 4.109 0 0 1 .703 3.107 3.943 3.943 0 0 1-.134.522l-.105.321-.286-.21a7.204 7.204 0 0 0-2.187-1.093l-.208-.063.02-.207a1.255 1.255 0 0 0-.226-.831 1.337 1.337 0 0 0-1.435-.532 1.232 1.232 0 0 0-.343.15L8.62 9.368a1.162 1.162 0 0 0-.524.778 1.24 1.24 0 0 0 .211.937 1.338 1.338 0 0 0 1.435.533 1.235 1.235 0 0 0 .344-.151l2.132-1.36a4.067 4.067 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.766 4.108 4.108 0 0 1 .702 3.108 3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.499m10.358-17.95C18.484-.026 14.082-.663 10.9 1.36l-5.59 3.562a6.412 6.412 0 0 0-2.896 4.295 6.753 6.753 0 0 0 .666 4.336 6.43 6.43 0 0 0-.96 2.396 6.833 6.833 0 0 0 1.168 5.167c2.229 3.2 6.63 3.838 9.812 1.815l5.59-3.562a6.41 6.41 0 0 0 2.896-4.295 6.756 6.756 0 0 0-.665-4.336 6.429 6.429 0 0 0 .958-2.396 6.831 6.831 0 0 0-1.167-5.168Z'
  />
);

export const AngularLogo = (p: BrandLogoProps) => (
  <Brand
    {...p}
    name='Angular'
    color='#DD0031'
    path='M9.93 12.645h4.134L11.996 7.74M11.996.009L.686 4.029l1.725 14.971 9.585 5.998 9.588-5.998L23.308 4.03 11.996.01zm7.058 18.297h-2.636l-1.42-3.501H8.995l-1.42 3.501H4.937l7.06-15.648 7.057 15.648z'
  />
);

// Solid (SolidJS) — real official logo with three stacked wave layers.
// Each instance generates unique gradient IDs to avoid SVG <defs> ID
// collisions when the same logo is rendered multiple times on a page.
export const SolidLogo = ({ size = 18, className = '' }: BrandLogoProps) => {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 166 155.3'
      role='img'
      aria-label='Solid'
      className={className}
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      <title>Solid</title>
      <defs>
        <linearGradient id={`solid-a-${id}`} x1='27.5' y1='3' x2='152' y2='63.5' gradientUnits='userSpaceOnUse'>
          <stop offset='.1' stopColor='#76B3E1' />
          <stop offset='.3' stopColor='#DCF2FD' />
          <stop offset='1' stopColor='#76B3E1' />
        </linearGradient>
        <linearGradient id={`solid-b-${id}`} x1='95.8' y1='32.6' x2='74' y2='105.2' gradientUnits='userSpaceOnUse'>
          <stop offset='0' stopColor='#76B3E1' />
          <stop offset='.5' stopColor='#4377BB' />
          <stop offset='1' stopColor='#1F3B77' />
        </linearGradient>
        <linearGradient id={`solid-c-${id}`} x1='18.4' y1='64.2' x2='144.3' y2='149.8' gradientUnits='userSpaceOnUse'>
          <stop offset='0' stopColor='#315AA9' />
          <stop offset='.5' stopColor='#518AC8' />
          <stop offset='1' stopColor='#315AA9' />
        </linearGradient>
        <linearGradient id={`solid-d-${id}`} x1='75.2' y1='74.5' x2='24.4' y2='260.8' gradientUnits='userSpaceOnUse'>
          <stop offset='0' stopColor='#4FA8D6' />
          <stop offset='.3' stopColor='#3F7AC1' />
          <stop offset='1' stopColor='#1F3B77' />
        </linearGradient>
      </defs>
      {/* outer top wave */}
      <path
        fill={`url(#solid-a-${id})`}
        d='M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z'
      />
      <path
        fill={`url(#solid-b-${id})`}
        opacity='.3'
        d='M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z'
      />
      {/* middle wave */}
      <path
        fill={`url(#solid-c-${id})`}
        d='M52 35l-4 1c-17 5-22 21-13 33 10 11 30 17 47 12l60-21S89 21 52 35z'
      />
      <path
        opacity='.3'
        fill={`url(#solid-d-${id})`}
        d='M52 35l-4 1c-17 5-22 21-13 33 10 11 30 17 47 12l60-21S89 21 52 35z'
      />
      {/* lower wave (official SolidJS path) */}
      <path
        fill={`url(#solid-c-${id})`}
        d='M134 80a45 45 0 00-47-12L27 89C16 92 7 100 3 110l-3 12 109 18 19-34c4-7 3-15-1-22z'
      />
      <path
        fill={`url(#solid-d-${id})`}
        d='M125 96a45 45 0 00-47-12L18 105S57 145 95 137l34-7c8-9 6-23-4-34z'
      />
    </svg>
  );
};

export const TailwindLogo = (p: BrandLogoProps) => (
  <Brand
    {...p}
    name='Tailwind CSS'
    color='#06B6D4'
    path='M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z'
  />
);

export const TypeScriptLogo = (p: BrandLogoProps) => (
  <Brand
    {...p}
    name='TypeScript'
    color='#3178C6'
    path='M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z'
  />
);

export const FRAMEWORK_LOGOS = [
  { name: 'React', Logo: ReactLogo, color: '#61DAFB' },
  { name: 'Next.js', Logo: NextLogo, color: '#000000' },
  { name: 'Vue', Logo: VueLogo, color: '#4FC08D' },
  { name: 'Svelte', Logo: SvelteLogo, color: '#FF3E00' },
  { name: 'Angular', Logo: AngularLogo, color: '#DD0031' },
  { name: 'Solid', Logo: SolidLogo, color: '#2C4F7C' },
  { name: 'Tailwind', Logo: TailwindLogo, color: '#06B6D4' },
  { name: 'TypeScript', Logo: TypeScriptLogo, color: '#3178C6' },
] as const;

// ─── Animated illustration components ────────────────────────────────

export function HeroIllustration({ className = '' }: { className?: string }) {
  // Six frameworks at clock positions around a central design-system mark.
  // Coordinates are pre-computed (radius 150 from center) so the layout is
  // deterministic and renders identically in SSR & client.
  const W = 460;
  const H = 380;
  const CX = W / 2;
  const CY = H / 2;
  const R = 150;

  // Clock positions — top, top-right, bottom-right, bottom, bottom-left, top-left
  const angles = [-90, -30, 30, 90, 150, 210];
  const orbits = [
    { angle: -90,  Logo: ReactLogo,   name: 'React',   size: 56, dur: 6 },
    { angle: -30,  Logo: NextLogo,    name: 'Next.js', size: 56, dur: 7 },
    { angle: 30,   Logo: AngularLogo, name: 'Angular', size: 56, dur: 5.5 },
    { angle: 90,   Logo: SvelteLogo,  name: 'Svelte',  size: 56, dur: 6.5 },
    { angle: 150,  Logo: SolidLogo,   name: 'Solid',   size: 56, dur: 7.5 },
    { angle: 210,  Logo: VueLogo,     name: 'Vue',     size: 56, dur: 6 },
  ];
  const pos = (angle: number, r = R) => {
    const rad = (angle * Math.PI) / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
  };

  return (
    <div className={`relative ${className}`} style={{ width: '100%', maxWidth: W + 'px', margin: '0 auto', aspectRatio: `${W} / ${H}` }}>
      {/* ─── Layered ambient backdrop ─────────────────────────────── */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: `
            radial-gradient(60% 50% at 50% 50%, hsl(var(--primary) / 0.16), transparent 70%),
            radial-gradient(80% 70% at 50% 50%, hsl(var(--primary) / 0.05), transparent 65%)
          `,
        }}
      />

      {/* ─── Concentric orbit rings ──────────────────────────────── */}
      <svg
        className='absolute inset-0 w-full h-full pointer-events-none'
        viewBox={`0 0 ${W} ${H}`}
        fill='none'
        aria-hidden
      >
        <defs>
          <radialGradient id='hero-ring-grad' cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor='hsl(var(--primary))' stopOpacity='0.45' />
            <stop offset='100%' stopColor='hsl(var(--primary))' stopOpacity='0.05' />
          </radialGradient>
          <radialGradient id='hero-pulse' cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor='hsl(var(--primary))' stopOpacity='0.45' />
            <stop offset='80%' stopColor='hsl(var(--primary))' stopOpacity='0' />
          </radialGradient>
        </defs>

        {/* Outer ring */}
        <circle cx={CX} cy={CY} r={R + 10} stroke='url(#hero-ring-grad)' strokeWidth='1' strokeDasharray='2 5' />
        {/* Mid ring */}
        <circle cx={CX} cy={CY} r={R - 22} stroke='hsl(var(--primary))' strokeOpacity='0.12' strokeWidth='1' strokeDasharray='4 4' />
        {/* Inner subtle ring */}
        <circle cx={CX} cy={CY} r='62' stroke='hsl(var(--primary))' strokeOpacity='0.18' strokeWidth='1' />
        {/* Soft center pulse */}
        <circle cx={CX} cy={CY} r='90' fill='url(#hero-pulse)' opacity='0.55' />

        {/* Subtle radial spokes from center to each logo */}
        {angles.map((a, i) => {
          const p = pos(a, R - 28);
          const inner = pos(a, 60);
          return (
            <line
              key={i}
              x1={inner.x} y1={inner.y}
              x2={p.x} y2={p.y}
              stroke='hsl(var(--primary))'
              strokeOpacity='0.10'
              strokeWidth='1'
              strokeLinecap='round'
            />
          );
        })}

        {/* Orbital "dot" markers — small ticks where each framework sits on the ring */}
        {angles.map((a, i) => {
          const p = pos(a, R + 10);
          return (
            <circle key={i} cx={p.x} cy={p.y} r='2' fill='hsl(var(--primary))' opacity='0.35' />
          );
        })}
      </svg>

      {/* ─── Central design-system card ──────────────────────────── */}
      <div
        className='absolute z-10 flex items-center justify-center'
        style={{
          left: CX,
          top: CY,
          width: 128,
          height: 128,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className='relative w-full h-full rounded-[28px] flex flex-col items-center justify-center gap-2'
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.78) 100%)',
            boxShadow:
              '0 24px 60px -12px hsl(var(--primary) / 0.5), ' +
              '0 8px 20px -6px hsl(var(--primary) / 0.35), ' +
              'inset 0 1px 0 hsl(0 0% 100% / 0.25)',
          }}
        >
          {/* Glossy highlight */}
          <div
            className='absolute inset-0 rounded-[28px] pointer-events-none'
            style={{ background: 'linear-gradient(180deg, hsl(0 0% 100% / 0.22) 0%, transparent 55%)' }}
          />
          {/* Adhar mark */}
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinejoin='round'
            strokeLinecap='round'
            className='w-12 h-12 text-primary-foreground relative z-10'
          >
            <path d='M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z' fill='currentColor' fillOpacity='0.22' />
            <path d='M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z' />
          </svg>
          {/* Brand label INSIDE the card */}
          <div className='relative z-10 text-center leading-none'>
            <div className='text-[13px] font-bold tracking-tight text-primary-foreground'>Adhar UI</div>
            <div className='text-[8px] font-medium tracking-[0.12em] uppercase mt-0.5 text-primary-foreground/65'>
              Design System
            </div>
          </div>
        </div>
      </div>

      {/* ─── Framework satellites ───────────────────────────────── */}
      {orbits.map((fw, i) => {
        const p = pos(fw.angle);
        return (
          <div
            key={fw.name}
            className='group absolute z-[5]'
            style={{
              left: p.x,
              top: p.y,
              width: fw.size,
              height: fw.size,
              transform: 'translate(-50%, -50%)',
              animation: `hero-bob ${fw.dur}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <div
              className='w-full h-full rounded-2xl bg-card flex items-center justify-center transition-transform duration-300 group-hover:scale-110'
              style={{
                border: '1px solid hsl(var(--border))',
                boxShadow:
                  '0 14px 28px -10px hsl(var(--foreground) / 0.18), ' +
                  '0 4px 10px -4px hsl(var(--foreground) / 0.10), ' +
                  'inset 0 1px 0 hsl(var(--background))',
              }}
            >
              <fw.Logo size={28} />
            </div>
            {/* Tiny floating name label */}
            <div
              className='absolute left-1/2 -translate-x-1/2 px-1.5 py-px rounded text-[9px] font-medium text-muted-foreground/80 bg-card/90 border border-border/60 backdrop-blur-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
              style={{ top: 'calc(100% + 4px)' }}
            >
              {fw.name}
            </div>
          </div>
        );
      })}

      {/* Subtle bobbing animation */}
      <style>{`
        @keyframes hero-bob {
          0%, 100% { transform: translate(-50%, -50%); }
          50%      { transform: translate(-50%, calc(-50% - 6px)); }
        }
      `}</style>
    </div>
  );
}

export function DesignSyncIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox='0 0 320 160' fill='none' xmlns='http://www.w3.org/2000/svg' className={`w-full h-auto ${className}`}>
      {/* Figma side */}
      <rect x='20' y='40' width='80' height='80' rx='12' fill='hsl(var(--card))' stroke='hsl(var(--border))' strokeWidth='1'>
        <animate attributeName='stroke-opacity' values='0.5;1;0.5' dur='2s' repeatCount='indefinite' />
      </rect>
      <circle cx='45' cy='65' r='8' fill='#F24E1E' opacity='0.8' />
      <circle cx='45' cy='82' r='8' fill='#A259FF' opacity='0.8' />
      <circle cx='75' cy='65' r='8' fill='#1ABCFE' opacity='0.8' />
      <circle cx='75' cy='82' r='8' fill='#0ACF83' opacity='0.8' />
      <text x='38' y='110' fill='hsl(var(--muted-foreground))' fontSize='9' fontFamily='system-ui'>Figma</text>

      {/* Arrows */}
      <g>
        <path d='M110 70 L150 70' stroke='hsl(var(--primary))' strokeWidth='1.5' strokeDasharray='4 3'>
          <animate attributeName='stroke-dashoffset' values='0;-14' dur='1s' repeatCount='indefinite' />
        </path>
        <path d='M150 90 L110 90' stroke='hsl(var(--primary))' strokeWidth='1.5' strokeDasharray='4 3'>
          <animate attributeName='stroke-dashoffset' values='0;14' dur='1s' repeatCount='indefinite' />
        </path>
        <polygon points='150,66 158,70 150,74' fill='hsl(var(--primary))' opacity='0.8' />
        <polygon points='110,86 102,90 110,94' fill='hsl(var(--primary))' opacity='0.8' />
      </g>

      {/* DTCG center */}
      <rect x='135' y='50' width='50' height='60' rx='8' fill='hsl(var(--primary))' opacity='0.1' stroke='hsl(var(--primary))' strokeWidth='1' strokeDasharray='3 3'>
        <animate attributeName='stroke-dashoffset' values='0;-12' dur='2s' repeatCount='indefinite' />
      </rect>
      <text x='143' y='84' fill='hsl(var(--primary))' fontSize='8' fontWeight='700' fontFamily='monospace'>DTCG</text>

      {/* More arrows */}
      <g>
        <path d='M195 70 L230 70' stroke='hsl(var(--primary))' strokeWidth='1.5' strokeDasharray='4 3'>
          <animate attributeName='stroke-dashoffset' values='0;-14' dur='1s' repeatCount='indefinite' />
        </path>
        <path d='M230 90 L195 90' stroke='hsl(var(--primary))' strokeWidth='1.5' strokeDasharray='4 3'>
          <animate attributeName='stroke-dashoffset' values='0;14' dur='1s' repeatCount='indefinite' />
        </path>
        <polygon points='230,66 238,70 230,74' fill='hsl(var(--primary))' opacity='0.8' />
        <polygon points='195,86 187,90 195,94' fill='hsl(var(--primary))' opacity='0.8' />
      </g>

      {/* Code side */}
      <rect x='220' y='40' width='80' height='80' rx='12' fill='hsl(var(--card))' stroke='hsl(var(--border))' strokeWidth='1'>
        <animate attributeName='stroke-opacity' values='0.5;1;0.5' dur='2s' begin='1s' repeatCount='indefinite' />
      </rect>
      <rect x='232' y='54' width='30' height='4' rx='2' fill='#c678dd' opacity='0.7' />
      <rect x='265' y='54' width='20' height='4' rx='2' fill='#98c379' opacity='0.7' />
      <rect x='232' y='64' width='45' height='4' rx='2' fill='#e5c07b' opacity='0.7' />
      <rect x='232' y='74' width='25' height='4' rx='2' fill='#61afef' opacity='0.7' />
      <rect x='260' y='74' width='30' height='4' rx='2' fill='#98c379' opacity='0.7' />
      <rect x='232' y='84' width='40' height='4' rx='2' fill='#abb2bf' opacity='0.5' />
      <rect x='232' y='94' width='35' height='4' rx='2' fill='#e06c75' opacity='0.7' />
      <text x='240' y='110' fill='hsl(var(--muted-foreground))' fontSize='9' fontFamily='system-ui'>Code</text>

      {/* Label */}
      <text x='100' y='148' fill='hsl(var(--muted-foreground))' fontSize='10' fontFamily='system-ui' textAnchor='middle'>Bidirectional Design Token Sync</text>
    </svg>
  );
}

/**
 * Icon map for sidebar navigation — replaces emoji with custom SVG icons.
 */
export const navIconMap: Record<string, React.ComponentType<IconProps>> = {
  '🏠': IconHome,
  '📦': IconPackage,
  '🎨': IconPalette,
  '🖥️': IconDisplay,
  '⌨️': IconTerminal,
  '▶️': IconPlay,
  '📖': IconBook,
  '💡': IconLightbulb,
  '♿': IconAccessibility,
  '🔄': IconRefresh,
  '🧩': IconPuzzle,
  '🤝': IconHandshake,
  '📋': IconClipboard,
  '📝': IconFormInput,
  '📐': IconLayout,
  '💬': IconMessageSquare,
  '🪟': IconLayers,
  '🧭': IconNavigation,
  '🏢': IconBuilding,
  '🤖': IconSparkles,
  '📱': IconSmartphone,
  '⬡': IconGrid,
  '◈': IconBook,
  '◧': IconLightbulb,
  '◉': IconClipboard,
};

/**
 * Resolve an emoji or key to a rendered icon.
 * Falls back to the original string if no icon found.
 */
export function NavIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const IconComp = navIconMap[icon];
  if (IconComp) {
    return <IconComp className={`shrink-0 ${className}`} size={16} strokeWidth={1.75} />;
  }
  return <span className={`shrink-0 text-sm ${className}`}>{icon}</span>;
}

// ─── Framework Logos (real SVG brand marks) ───────────────────────────

const frameworkLogos: Record<string, (size: number) => React.ReactNode> = {
  react: (s) => (
    <svg viewBox='0 0 24 24' width={s} height={s} fill='#61DAFB'>
      <circle cx='12' cy='12' r='2.139' />
      <ellipse cx='12' cy='12' rx='11' ry='4.2' fill='none' stroke='#61DAFB' strokeWidth='1' />
      <ellipse cx='12' cy='12' rx='11' ry='4.2' fill='none' stroke='#61DAFB' strokeWidth='1' transform='rotate(60 12 12)' />
      <ellipse cx='12' cy='12' rx='11' ry='4.2' fill='none' stroke='#61DAFB' strokeWidth='1' transform='rotate(120 12 12)' />
    </svg>
  ),
  vue: (s) => (
    <svg viewBox='0 0 24 24' width={s} height={s} fill='none'>
      <path d='M2 3h4l6 10.2L18 3h4L12 21z' fill='#4FC08D' />
      <path d='M7.2 3L12 10.9 16.8 3h-4L12 5 11.2 3z' fill='#35495E' />
    </svg>
  ),
  solid: (s) => (
    <svg viewBox='0 0 128 128' width={s} height={s}>
      <path fill='#76b3e1' d='M128 29.7S85.3-1.7 52.3 5.5l-2.4.8c-4.8 1.6-8.9 4-11.3 7.3l-1.6 2.4-12.1 20.9 20.9 4c8.9 5.7 20.1 8.1 30.6 5.7L128 29.7z' />
      <path fill='#518ac8' d='m38.6 29.7-3.2.8C21.7 34.5 17.7 47.4 25 58.7c8 10.5 25 16.1 38.6 12.1l49.9-16.9S70.8 22.4 38.6 29.7z' />
      <path fill='#315aa9' d='M104.7 65.9a36.2 36.2 0 0 0-38.7-12.1L16.1 69.9 0 98.1l90.2 15.3 16.1-29c3.2-5.6 2.4-12.1-1.6-18.5z' />
      <path fill='#1a336b' d='M88.6 94.1a36.2 36.2 0 0 0-38.7-12.1L0 98.1s42.7 32.2 75.7 24.2l2.4-.8c13.7-4 18.5-16.9 10.5-27.4z' />
    </svg>
  ),
  svelte: (s) => (
    <svg viewBox='0 0 24 24' width={s} height={s}>
      <path d='M19.824 5.293a5.586 5.586 0 0 0-7.68-1.968L7.26 6.79a4.648 4.648 0 0 0-2.106 3.128 4.862 4.862 0 0 0 .48 3.392 4.607 4.607 0 0 0-.672 2.16 4.884 4.884 0 0 0 .84 3.744 5.586 5.586 0 0 0 7.68 1.968l4.884-3.465a4.648 4.648 0 0 0 2.106-3.128 4.861 4.861 0 0 0-.48-3.392 4.608 4.608 0 0 0 .672-2.16 4.884 4.884 0 0 0-.84-3.744z' fill='#FF3E00' />
      <path d='M9.876 19.683a3.349 3.349 0 0 1-3.6-1.32 2.944 2.944 0 0 1-.504-2.256 2.54 2.54 0 0 1 .096-.408l.12-.336.312.216a5.6 5.6 0 0 0 1.704.84l.168.048-.024.168a.888.888 0 0 0 .168.576 1.02 1.02 0 0 0 1.092.408.94.94 0 0 0 .264-.12l4.86-3.465a.85.85 0 0 0 .384-.576.888.888 0 0 0-.156-.672 1.02 1.02 0 0 0-1.092-.408.94.94 0 0 0-.264.12l-1.86 1.32a3.094 3.094 0 0 1-.864.384 3.349 3.349 0 0 1-3.6-1.32 2.944 2.944 0 0 1-.504-2.256 2.792 2.792 0 0 1 1.272-1.896l4.86-3.465a3.094 3.094 0 0 1 .864-.384 3.349 3.349 0 0 1 3.6 1.32 2.944 2.944 0 0 1 .504 2.256 2.54 2.54 0 0 1-.096.408l-.12.336-.312-.216a5.6 5.6 0 0 0-1.704-.84l-.168-.048.024-.168a.888.888 0 0 0-.168-.576 1.02 1.02 0 0 0-1.092-.408.94.94 0 0 0-.264.12l-4.86 3.465a.85.85 0 0 0-.384.576.888.888 0 0 0 .156.672 1.02 1.02 0 0 0 1.092.408.94.94 0 0 0 .264-.12l1.86-1.32a3.094 3.094 0 0 1 .864-.384 3.349 3.349 0 0 1 3.6 1.32 2.944 2.944 0 0 1 .504 2.256 2.792 2.792 0 0 1-1.272 1.896l-4.86 3.465a3.094 3.094 0 0 1-.864.384z' fill='#fff' />
    </svg>
  ),
  angular: (s) => (
    <svg viewBox='0 0 24 24' width={s} height={s}>
      <path d='M12 2L2.7 5.5l1.4 12.2L12 22l7.9-4.3 1.4-12.2z' fill='#DD0031' />
      <path d='M12 2v20l7.9-4.3 1.4-12.2z' fill='#C3002F' />
      <path d='M12 2L6.5 14.4h2.1l1.1-2.7h4.6l1.1 2.7h2.1L12 2zm1.5 8h-3L12 6.3l1.5 3.7z' fill='#fff' />
    </svg>
  ),
};

/**
 * Renders a real framework SVG logo.
 * Use instead of single-letter icon badges.
 */
export function FrameworkLogo({
  id,
  size = 16,
  className = '',
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const render = frameworkLogos[id];
  if (render) {
    return <span className={`inline-flex shrink-0 ${className}`}>{render(size)}</span>;
  }
  return <span className={`inline-flex shrink-0 items-center justify-center rounded text-[10px] font-bold text-white bg-muted w-[${size}px] h-[${size}px] ${className}`}>{id[0].toUpperCase()}</span>;
}
