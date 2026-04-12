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

// ─── Animated illustration components ────────────────────────────────

export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Layered UI mockup — browser window with stacked component previews */}
      <div className='relative w-full max-w-[460px] mx-auto'>
        {/* Soft ambient glow behind the mockup */}
        <div className='absolute inset-0 -inset-x-8 -inset-y-4 rounded-3xl bg-gradient-to-b from-primary/[0.07] via-primary/[0.03] to-transparent blur-2xl pointer-events-none' />

        {/* ─── Browser window ─── */}
        <div className='relative rounded-xl border border-border/80 bg-card shadow-2xl shadow-primary/[0.06] overflow-hidden'>
          {/* Title bar */}
          <div className='flex items-center gap-2 px-4 py-2.5 bg-muted/40 border-b border-border/60'>
            <div className='flex gap-1.5'>
              <div className='w-[10px] h-[10px] rounded-full bg-[#FF5F57]/80' />
              <div className='w-[10px] h-[10px] rounded-full bg-[#FEBC2E]/80' />
              <div className='w-[10px] h-[10px] rounded-full bg-[#28C840]/80' />
            </div>
            <div className='flex-1 flex justify-center'>
              <div className='px-6 py-0.5 rounded-md bg-background/60 border border-border/40 text-[10px] text-muted-foreground/60 font-mono'>
                my-app / components / ui
              </div>
            </div>
          </div>

          {/* Content area — IDE-like layout */}
          <div className='flex'>
            {/* Mini sidebar */}
            <div className='w-[52px] bg-muted/20 border-r border-border/40 py-3 flex flex-col items-center gap-2.5 shrink-0'>
              {['bg-primary/60', 'bg-muted-foreground/20', 'bg-muted-foreground/20', 'bg-muted-foreground/15', 'bg-muted-foreground/10'].map((bg, i) => (
                <div key={i} className={`w-5 h-5 rounded ${bg} ${i === 0 ? 'ring-1 ring-primary/30' : ''}`} />
              ))}
            </div>

            {/* Main content */}
            <div className='flex-1 p-4 space-y-3 min-h-[240px]'>
              {/* Component preview: Button row */}
              <div>
                <div className='text-[9px] text-muted-foreground/50 font-mono mb-1.5 tracking-wide uppercase'>Button</div>
                <div className='flex items-center gap-2 flex-wrap'>
                  <div className='h-7 px-3.5 rounded-md bg-gradient-to-r from-primary to-primary/80 text-[10px] text-primary-foreground font-medium flex items-center shadow-sm'>Primary</div>
                  <div className='h-7 px-3.5 rounded-md border border-border text-[10px] text-foreground/80 font-medium flex items-center'>Outline</div>
                  <div className='h-7 px-3.5 rounded-md bg-secondary text-[10px] text-secondary-foreground/70 font-medium flex items-center'>Secondary</div>
                  <div className='h-6 px-2.5 rounded text-[9px] text-muted-foreground/60 font-medium flex items-center hover:bg-muted/50'>Ghost</div>
                </div>
              </div>

              {/* Component preview: Input */}
              <div>
                <div className='text-[9px] text-muted-foreground/50 font-mono mb-1.5 tracking-wide uppercase'>Input</div>
                <div className='h-7 rounded-md border border-border/80 bg-background px-2.5 flex items-center'>
                  <span className='text-[10px] text-muted-foreground/40'>Search components...</span>
                </div>
              </div>

              {/* Component preview: Card with stats */}
              <div>
                <div className='text-[9px] text-muted-foreground/50 font-mono mb-1.5 tracking-wide uppercase'>Card</div>
                <div className='grid grid-cols-3 gap-2'>
                  {[
                    { label: 'Components', val: '97' },
                    { label: 'Frameworks', val: '5' },
                    { label: 'Themes', val: '8' },
                  ].map((s) => (
                    <div key={s.label} className='rounded-lg border border-border/60 bg-card p-2.5 text-center'>
                      <div className='text-sm font-bold text-foreground/90'>{s.val}</div>
                      <div className='text-[8px] text-muted-foreground/50 mt-0.5'>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component preview: Badge + Toggle row */}
              <div className='flex items-center gap-2'>
                <div className='h-5 px-2 rounded-full bg-primary/10 text-[9px] text-primary font-medium flex items-center'>v0.1.0</div>
                <div className='h-5 px-2 rounded-full bg-emerald-500/10 text-[9px] text-emerald-600 font-medium flex items-center'>Stable</div>
                <div className='flex-1' />
                <div className='w-7 h-4 rounded-full bg-primary/80 relative'>
                  <div className='absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white shadow-sm' />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Framework row beneath the window ─── */}
        <div className='flex items-center justify-center gap-3 mt-4'>
          {[
            { name: 'React', color: '#61DAFB' },
            { name: 'Vue', color: '#4FC08D' },
            { name: 'Solid', color: '#4377BB' },
            { name: 'Svelte', color: '#FF3E00' },
            { name: 'Angular', color: '#DD0031' },
          ].map((fw) => (
            <div key={fw.name} className='flex items-center gap-1 px-2.5 py-1 rounded-full border border-border/50 bg-card/80 text-[9px] font-medium' style={{ color: fw.color, borderColor: `${fw.color}30` }}>
              <div className='w-2 h-2 rounded-full' style={{ backgroundColor: fw.color, opacity: 0.7 }} />
              {fw.name}
            </div>
          ))}
        </div>
      </div>
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
