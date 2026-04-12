import React from 'react';
import { Badge, Callout, PageHeader } from '../components/ui.tsx';

interface DesignAsset {
  id: string;
  title: string;
  description: string;
  format: string;
  fileSize: string;
  href: string;
  icon: React.ReactNode;
  tool: 'figma' | 'penpot' | 'universal';
  tags: string[];
}

const assets: DesignAsset[] = [
  {
    id: 'figma-kit',
    title: 'Figma Component Kit',
    description:
      'Complete SVG component library with all Adhar UI components. Import into Figma via File → Place Image or drag-and-drop, then ungroup and detach to edit individual components.',
    format: 'SVG',
    fileSize: '27 KB',
    href: '/downloads/adhar-ui-figma-kit.svg',
    tool: 'figma',
    tags: ['Components', 'Variants', 'Styles'],
    icon: (
      <svg viewBox='0 0 24 24' className='w-7 h-7'>
        <path d='M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z' fill='#F24E1E' />
        <path d='M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z' fill='#FF7262' />
        <path d='M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z' fill='#1ABCFE' />
        <path d='M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z' fill='#0ACF83' />
        <path d='M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z' fill='#A259FF' />
      </svg>
    ),
  },
  {
    id: 'penpot-kit',
    title: 'Penpot Component Kit',
    description:
      'Complete SVG component library optimized for Penpot. Import via Assets panel → Import from file, then convert shapes to components for reuse across your project.',
    format: 'SVG',
    fileSize: '27 KB',
    href: '/downloads/adhar-ui-penpot-kit.svg',
    tool: 'penpot',
    tags: ['Components', 'Open Source', 'Self-hosted'],
    icon: (
      <svg viewBox='0 0 24 24' className='w-7 h-7' fill='none'>
        <path d='M12 2L2 7l10 5 10-5-10-5z' fill='#31EFB8' />
        <path d='M2 17l10 5 10-5' stroke='#31EFB8' strokeWidth='1.5' fill='none' />
        <path d='M2 12l10 5 10-5' stroke='#31EFB8' strokeWidth='1.5' fill='none' />
      </svg>
    ),
  },
  {
    id: 'color-palette',
    title: 'Color Palette',
    description:
      'Full light and dark mode color swatches with hex values. Use as a reference sheet or import into any design tool for quick color picking.',
    format: 'SVG',
    fileSize: '13 KB',
    href: '/downloads/adhar-ui-color-palette.svg',
    tool: 'universal',
    tags: ['Colors', 'Light', 'Dark'],
    icon: (
      <svg viewBox='0 0 24 24' className='w-7 h-7' fill='none' stroke='currentColor' strokeWidth='1.5'>
        <circle cx='13.5' cy='6.5' r='0.5' fill='hsl(var(--primary))' />
        <circle cx='17.5' cy='10.5' r='0.5' fill='hsl(var(--primary))' />
        <circle cx='8.5' cy='7.5' r='0.5' fill='hsl(var(--primary))' />
        <circle cx='6.5' cy='12.5' r='0.5' fill='hsl(var(--primary))' />
        <path
          d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z'
          stroke='hsl(var(--primary))'
        />
      </svg>
    ),
  },
  {
    id: 'design-tokens',
    title: 'Design Tokens (DTCG)',
    description:
      'W3C Design Tokens Community Group format. Contains all semantic colors, spacing, typography, shadows, and border radius values. Import into Style Dictionary, Tokens Studio, or any DTCG-compatible tool.',
    format: 'JSON',
    fileSize: '10 KB',
    href: '/downloads/adhar-ui-design-tokens.json',
    tool: 'universal',
    tags: ['Tokens', 'W3C DTCG', 'Style Dictionary'],
    icon: (
      <svg viewBox='0 0 24 24' className='w-7 h-7' fill='none' stroke='currentColor' strokeWidth='1.5'>
        <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
        <polyline points='14 2 14 8 20 8' />
        <line x1='16' y1='13' x2='8' y2='13' />
        <line x1='16' y1='17' x2='8' y2='17' />
        <polyline points='10 9 9 9 8 9' />
      </svg>
    ),
  },
];

const toolBadge: Record<string, { label: string; className: string }> = {
  figma: { label: 'Figma', className: 'bg-[#F24E1E]/10 text-[#F24E1E] border-[#F24E1E]/20' },
  penpot: { label: 'Penpot', className: 'bg-[#31EFB8]/10 text-[#0d9668] border-[#31EFB8]/30' },
  universal: { label: 'Universal', className: 'bg-primary/10 text-primary border-primary/20' },
};

function DownloadIcon() {
  return (
    <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
    </svg>
  );
}

export function DesignResourcesPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className='space-y-6'>
      <PageHeader
        title='Design Resources'
        description='Download design kits, component libraries, and tokens for Figma and Penpot. Start customizing your design system in minutes.'
        badge={<Badge variant='success'>{assets.length} downloads</Badge>}
      />

      <Callout type='tip'>
        All design files are generated from the same source of truth as the code components.
        When the design system updates, regenerate these files to stay in sync.
      </Callout>

      {/* Asset Grid */}
      <div className='grid gap-4 md:grid-cols-2'>
        {assets.map((asset) => {
          const tb = toolBadge[asset.tool];
          return (
            <div
              key={asset.id}
              className='group rounded-xl border border-border bg-card p-5 hover:shadow-md hover:border-primary/20 transition-all'
            >
              <div className='flex items-start gap-4'>
                <div className='shrink-0 w-12 h-12 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center'>
                  {asset.icon}
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h3 className='text-sm font-semibold text-foreground'>{asset.title}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border ${tb.className}`}
                    >
                      {tb.label}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground leading-relaxed mb-3'>
                    {asset.description}
                  </p>
                  <div className='flex items-center gap-3'>
                    <div className='flex gap-1.5'>
                      {asset.tags.map((tag) => (
                        <span
                          key={tag}
                          className='text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className='text-[10px] text-muted-foreground/60 ml-auto'>
                      {asset.format} · {asset.fileSize}
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-4 pt-4 border-t border-border/50'>
                <a
                  href={asset.href}
                  download
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors shadow-sm'
                >
                  <DownloadIcon />
                  Download {asset.format}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* How to Import */}
      <div className='space-y-6'>
        <h2 className='text-lg font-semibold text-foreground'>How to Import</h2>

        <div className='grid gap-4 md:grid-cols-2'>
          {/* Figma */}
          <div className='rounded-xl border border-border bg-card overflow-hidden'>
            <div className='flex items-center gap-2.5 px-5 py-3 border-b border-border bg-muted/20'>
              <svg viewBox='0 0 24 24' className='w-5 h-5'>
                <path d='M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z' fill='#F24E1E' />
                <path d='M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z' fill='#FF7262' />
                <path d='M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z' fill='#1ABCFE' />
                <path d='M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z' fill='#0ACF83' />
                <path d='M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z' fill='#A259FF' />
              </svg>
              <span className='text-sm font-semibold text-foreground'>Figma Import Guide</span>
            </div>
            <div className='p-5 space-y-3'>
              {[
                'Download the Figma Component Kit SVG',
                'Open Figma → File → Place Image (or drag the SVG onto canvas)',
                'Right-click → Ungroup to access individual components',
                'Select a component → Right-click → Create Component',
                'Import the Design Tokens JSON into Tokens Studio plugin',
                'Map token values to Figma styles and variables',
              ].map((step, i) => (
                <div key={i} className='flex items-start gap-3'>
                  <span className='shrink-0 w-5 h-5 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center font-bold mt-0.5'>
                    {i + 1}
                  </span>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Penpot */}
          <div className='rounded-xl border border-border bg-card overflow-hidden'>
            <div className='flex items-center gap-2.5 px-5 py-3 border-b border-border bg-muted/20'>
              <svg viewBox='0 0 24 24' className='w-5 h-5' fill='none'>
                <path d='M12 2L2 7l10 5 10-5-10-5z' fill='#31EFB8' />
                <path d='M2 17l10 5 10-5' stroke='#31EFB8' strokeWidth='1.5' />
                <path d='M2 12l10 5 10-5' stroke='#31EFB8' strokeWidth='1.5' />
              </svg>
              <span className='text-sm font-semibold text-foreground'>Penpot Import Guide</span>
            </div>
            <div className='p-5 space-y-3'>
              {[
                'Download the Penpot Component Kit SVG',
                'Open Penpot → Create or open a project',
                'Drag the SVG file onto the canvas',
                'Ungroup the imported content (Ctrl+Shift+G)',
                'Select shapes → Right-click → Create Component',
                'Use the Color Palette SVG as a reference for your color library',
              ].map((step, i) => (
                <div key={i} className='flex items-start gap-3'>
                  <span className='shrink-0 w-5 h-5 rounded-md bg-[#31EFB8]/20 text-[#0d9668] text-xs flex items-center justify-center font-bold mt-0.5'>
                    {i + 1}
                  </span>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div>
        <h2 className='text-lg font-semibold text-foreground mb-4'>What's Included</h2>
        <div className='grid sm:grid-cols-3 gap-4'>
          {[
            {
              title: '98 Components',
              desc: 'All primitives, composites, enterprise, and AI components including Button, Card, Data Table, Charts, Drag & Drop, Chat, Calendar, and more.',
              icon: '📦',
            },
            {
              title: 'All Variants',
              desc: 'Every component includes all visual variants (default, secondary, destructive, outline, ghost) and size options (xs, sm, default, lg, xl).',
              icon: '🎨',
            },
            {
              title: 'Design Tokens',
              desc: 'W3C DTCG tokens with 8 theme presets (zinc, slate, blue, green, violet, rose, orange, teal), spacing, typography, shadows, and radius.',
              icon: '🔧',
            },
          ].map((item) => (
            <div key={item.title} className='rounded-xl border border-border bg-card p-5'>
              <div className='text-2xl mb-2'>{item.icon}</div>
              <h3 className='text-sm font-semibold text-foreground mb-1'>{item.title}</h3>
              <p className='text-xs text-muted-foreground leading-relaxed'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className='rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8 text-center'>
        <h2 className='text-lg font-semibold text-foreground mb-2'>Need the full design sync?</h2>
        <p className='text-sm text-muted-foreground mb-4 max-w-lg mx-auto'>
          Check out the Design Sync guide for bidirectional Figma/Penpot integration with automatic
          token synchronization via webhooks.
        </p>
        <button
          onClick={() => navigate('/guides/design-sync')}
          className='inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm'
        >
          Design Sync Guide
          <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M13 7l5 5m0 0l-5 5m5-5H6' />
          </svg>
        </button>
      </div>
    </div>
  );
}
