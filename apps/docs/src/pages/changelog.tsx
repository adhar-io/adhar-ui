import React from 'react';
import { Badge, PageHeader } from '../components/ui.tsx';

interface ChangelogEntry {
  version: string;
  date: string;
  tag: 'latest' | 'stable' | 'beta' | null;
  changes: {
    type: 'feature' | 'fix' | 'breaking' | 'improve';
    text: string;
  }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: '0.5.0',
    date: 'July 2025',
    tag: 'latest',
    changes: [
      { type: 'feature', text: 'Integrated Storybook viewer in docs portal' },
      { type: 'feature', text: 'Added interactive playground with multi-framework code tabs' },
      { type: 'feature', text: 'New blocks page with copy-paste patterns and page layouts' },
      { type: 'feature', text: 'Changelog page with version history' },
      { type: 'improve', text: 'Redesigned header with top navigation bar' },
      { type: 'improve', text: 'Enhanced sidebar with categories and icons' },
      { type: 'improve', text: 'Added footer with quick links' },
    ],
  },
  {
    version: '0.4.0',
    date: 'June 2025',
    tag: 'stable',
    changes: [
      {
        type: 'feature',
        text: 'Multi-framework code generation (React, Vue, Solid, Svelte, Angular)',
      },
      { type: 'feature', text: 'Component detail pages with section navigation and API tables' },
      { type: 'feature', text: 'Grid/list view toggle on category pages' },
      { type: 'improve', text: 'Redesigned playground with framework tabs and live preview' },
      { type: 'fix', text: 'Fixed Deno + Vite build compatibility' },
    ],
  },
  {
    version: '0.3.0',
    date: 'May 2025',
    tag: null,
    changes: [
      { type: 'feature', text: 'Docs portal with Getting Started, Theming, and CLI guides' },
      { type: 'feature', text: 'Component browser with 96+ components across 10 categories' },
      { type: 'feature', text: 'Interactive demo components' },
      { type: 'improve', text: 'Storybook dev task added to monorepo' },
      { type: 'fix', text: 'Resolved build issues with workspace dependencies' },
    ],
  },
  {
    version: '0.2.0',
    date: 'April 2025',
    tag: null,
    changes: [
      { type: 'feature', text: 'Mitosis compiler for cross-framework output' },
      { type: 'feature', text: 'React, Vue, Solid, Svelte, and Angular packages' },
      { type: 'feature', text: 'Tailwind preset with design tokens' },
      {
        type: 'improve',
        text: 'Accessibility primitives: focus trap, roving tabindex, live region',
      },
      { type: 'breaking', text: 'Moved from single-package to monorepo structure' },
    ],
  },
  {
    version: '0.1.0',
    date: 'March 2025',
    tag: null,
    changes: [
      { type: 'feature', text: 'Initial release with core component primitives' },
      { type: 'feature', text: 'Design token system with light/dark themes' },
      { type: 'feature', text: 'Icon library with tree-shaking support' },
    ],
  },
];

const typeConfig = {
  feature: {
    label: 'Feature',
    icon: '✦',
    colors: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  fix: { label: 'Fix', icon: '⚑', colors: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  breaking: {
    label: 'Breaking',
    icon: '⚠',
    colors: 'bg-red-500/10 text-red-600 border-red-500/20',
  },
  improve: {
    label: 'Improved',
    icon: '△',
    colors: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  },
};

const tagConfig: Record<string, string> = {
  latest: 'bg-emerald-500 text-white',
  stable: 'bg-blue-500 text-white',
  beta: 'bg-amber-500 text-white',
};

export function ChangelogPage() {
  return (
    <div className='space-y-6'>
      <PageHeader
        title='Changelog'
        description='A history of updates, improvements, and fixes to Adhar UI.'
        badge={<Badge variant='outline'>v{changelog[0].version}</Badge>}
      />

      {/* Timeline */}
      <div className='relative'>
        {/* Vertical line */}
        <div className='absolute left-[19px] top-6 bottom-6 w-px bg-border hidden sm:block' />

        <div className='space-y-8'>
          {changelog.map((entry, idx) => (
            <div key={entry.version} className='relative flex gap-5'>
              {/* Timeline dot */}
              <div className='hidden sm:flex flex-col items-center pt-1'>
                <div
                  className={`w-[10px] h-[10px] rounded-full border-2 z-10 ${
                    idx === 0 ? 'border-primary bg-primary' : 'border-border bg-background'
                  }`}
                />
              </div>

              {/* Card */}
              <div
                className={`flex-1 rounded-xl border overflow-hidden transition-all ${
                  idx === 0
                    ? 'border-primary/30 bg-primary/[0.02] shadow-sm'
                    : 'border-border bg-card'
                }`}
              >
                <div className='flex flex-wrap items-center gap-3 px-5 py-3 border-b border-border bg-muted/10'>
                  <h2 className='text-lg font-bold text-foreground font-mono'>v{entry.version}</h2>
                  {entry.tag && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${
                        tagConfig[entry.tag]
                      }`}
                    >
                      {entry.tag}
                    </span>
                  )}
                  <span className='text-xs text-muted-foreground ml-auto'>{entry.date}</span>
                </div>

                <ul className='divide-y divide-border/50'>
                  {entry.changes.map((change, ci) => {
                    const cfg = typeConfig[change.type];
                    return (
                      <li
                        key={ci}
                        className='flex items-start gap-3 px-5 py-3 hover:bg-muted/20 transition-colors'
                      >
                        <span
                          className={`shrink-0 mt-0.5 inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-medium ${cfg.colors}`}
                        >
                          {cfg.icon} {cfg.label}
                        </span>
                        <span className='text-sm text-foreground'>{change.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
