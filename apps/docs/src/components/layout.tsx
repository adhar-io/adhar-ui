import React, { useEffect, useRef, useState } from 'react';
import { categories, components } from '../data/components.ts';
import { IconMoon, IconSearch, IconSun, NavIcon } from './icons.tsx';

// Standalone-app URLs. In dev they live on their own ports; in prod they ship
// as static bundles under /storybook and /builder respectively.
const isLocalHost = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const STORYBOOK_URL = isLocalHost ? 'http://localhost:6006' : '/storybook/index.html';
const BUILDER_URL = isLocalHost ? 'http://localhost:5174' : '/builder/index.html';

interface TopNavItem {
  label: string;
  href: string;
  match?: string[];
  external?: boolean;
}

const topNavItems: TopNavItem[] = [
  { label: 'Docs', href: '/getting-started', match: ['/getting-started', '/theming', '/cli', '/'] },
  { label: 'Components', href: '/components/form-controls', match: ['/components'] },
  { label: 'Blocks', href: '/blocks', match: ['/blocks'] },
  { label: 'Guides', href: '/guides/accessibility', match: ['/guides'] },
  { label: 'Storybook', href: STORYBOOK_URL, external: true },
  { label: 'Builder', href: BUILDER_URL, external: true },
];

const navSections = [
  {
    title: 'GETTING STARTED',
    items: [
      { label: 'Overview', href: '/', icon: '🏠' },
      { label: 'Installation', href: '/getting-started', icon: '📦' },
      { label: 'Theming', href: '/theming', icon: '🎨' },
      { label: 'CLI Reference', href: '/cli', icon: '⌨️' },
    ],
  },
  {
    title: 'COMPONENTS',
    items: categories.map((cat) => ({
      label: cat.label,
      icon: cat.icon,
      href: `/components/${cat.id}`,
      count: components.filter((c) => c.category === cat.id).length,
    })),
  },
  {
    title: 'INTERACTIVE',
    items: [
      { label: 'Blocks', href: '/blocks', icon: '💡' },
      { label: 'Storybook', href: STORYBOOK_URL, icon: '📖', external: true },
      { label: 'Page Builder', href: BUILDER_URL, icon: '⬡', external: true },
    ],
  },
  {
    title: 'RESOURCES',
    items: [
      { label: 'Design Resources', href: '/design-resources', icon: '⬡' },
      { label: 'Design Sync', href: '/guides/design-sync', icon: '🔄' },
    ],
  },
  {
    title: 'GUIDES',
    items: [
      { label: 'Accessibility', href: '/guides/accessibility', icon: '♿' },
      { label: 'Multi-Framework', href: '/guides/frameworks', icon: '🧩' },
      { label: 'Contributing', href: '/guides/contributing', icon: '🤝' },
    ],
  },
  {
    title: 'MORE',
    items: [
      { label: 'Changelog', href: '/changelog', icon: '📋' },
    ],
  },
];

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header({
  onToggleSidebar,
  onOpenSearch,
  isDark,
  onToggleDark,
  route,
  navigate,
}: {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  route: string;
  navigate: (path: string) => void;
}) {
  return (
    <header
      className='sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200'
      style={{
        // Layered shadow: tight inset highlight on the bottom edge + soft scrim
        // below so the header floats clearly over scrolled content without
        // looking heavy. Tuned to read in both light and dark themes.
        boxShadow:
          '0 1px 0 hsl(var(--border) / 0.4), ' +
          '0 4px 16px -4px hsl(var(--foreground) / 0.06), ' +
          '0 12px 32px -12px hsl(var(--foreground) / 0.08)',
      }}
    >
      <div className='flex h-14 items-center px-4 lg:px-6 gap-3 min-w-0 overflow-hidden'>
        {/* Mobile hamburger */}
        <button
          onClick={onToggleSidebar}
          className='lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent transition-colors text-muted-foreground'
          aria-label='Toggle sidebar'
        >
          <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>

        {/* Logo */}
        <a
          href='#/'
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          className='flex items-center gap-2.5 shrink-0 group'
        >
          <div className='w-7 h-7 rounded-lg btn-gradient flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:shadow-primary/25 transition-all'>
            <span className='text-white font-bold text-sm'>A</span>
          </div>
          <span className='font-semibold text-foreground hidden sm:inline'>Adhar UI</span>
          <span className='hidden sm:inline text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold'>
            v0.1.0
          </span>
        </a>

        <div className='hidden lg:block w-px h-5 bg-border/60 mx-1' />

        {/* Top nav — desktop */}
        <nav className='hidden lg:flex items-center gap-0.5'>
          {topNavItems.map((item) => {
            // External items (Storybook / Builder) open the standalone app in a new tab
            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-150'
                  title={`Open ${item.label} in a new tab`}
                >
                  {item.label}
                  <svg
                    className='w-3 h-3 opacity-60'
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M7 17L17 7' />
                    <path d='M9 7h8v8' />
                  </svg>
                </a>
              );
            }
            const active = (item.match || []).some((m) => route === m || route.startsWith(m + '/'));
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.href)}
                className={`relative px-3 py-1.5 rounded-md text-[13px] transition-all duration-150 ${
                  active
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                }`}
              >
                {item.label}
                {active && (
                  <span className='absolute bottom-[-13px] left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary' />
                )}
              </button>
            );
          })}
        </nav>

        <div className='flex-1' />

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className='flex items-center gap-2 h-8 px-3 rounded-lg border border-border/60 bg-muted/30 text-muted-foreground text-sm hover:bg-muted/50 hover:border-border transition-colors w-56 max-w-[40vw]'
        >
          <IconSearch size={14} strokeWidth={2} className='shrink-0' />
          <span className='flex-1 text-left truncate text-xs'>Search docs...</span>
          <kbd className='hidden sm:inline-flex items-center gap-0.5 rounded border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/70'>
            ⌘K
          </kbd>
        </button>

        {/* Actions */}
        <div className='flex items-center gap-1'>
          <button
            onClick={onToggleDark}
            className='flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground'
            aria-label='Toggle theme'
          >
            {isDark ? <IconSun size={16} strokeWidth={2} /> : <IconMoon size={16} strokeWidth={2} />}
          </button>
          <a
            href='https://github.com/nicober1/adhar-ui'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground'
            aria-label='GitHub'
          >
            <svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
export function Sidebar({
  isActive,
  navigate,
  isOpen,
  onClose,
}: {
  isActive: (path: string) => boolean;
  navigate: (path: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['GETTING STARTED', 'COMPONENTS', 'INTERACTIVE', 'RESOURCES', 'GUIDES', 'MORE']),
  );

  // Whenever the route changes, ensure any section containing the active item
  // is expanded — so clicking "Guides" in the header reveals + highlights the
  // matching sub-item in the sidebar.
  useEffect(() => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      for (const section of navSections) {
        if (section.items.some((item: any) => isActive(item.href))) {
          next.add(section.title);
        }
      }
      return next;
    });
  }, [isActive]);

  const toggleSection = (title: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const handleNav = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden'
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[264px] border-r border-border/60 bg-background/95 backdrop-blur-md overflow-y-auto transition-transform duration-200 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:z-0 lg:translate-x-0 scrollbar-thin ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile logo — hidden on desktop since header shows it */}
        <div className='sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 lg:hidden'>
          <a
            href='#/'
            className='flex items-center gap-3'
            onClick={(e) => {
              e.preventDefault();
              handleNav('/');
            }}
          >
            <div className='w-8 h-8 rounded-lg btn-gradient flex items-center justify-center shadow-sm'>
              <span className='text-white font-bold text-base'>A</span>
            </div>
            <div>
              <span className='font-bold text-foreground text-base'>Adhar UI</span>
              <span className='ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium'>
                v0.1.0
              </span>
            </div>
          </a>
        </div>

        <nav className='p-3 space-y-1'>
          {navSections.map((section) => (
            <div key={section.title} className='mb-2'>
              <button
                onClick={() => toggleSection(section.title)}
                className='group flex items-center justify-between w-full px-2 py-1.5 text-[11px] font-semibold text-muted-foreground tracking-wider uppercase hover:text-foreground transition-colors'
              >
                {section.title}
                <svg
                  className={`w-3 h-3 transition-transform duration-200 opacity-0 group-hover:opacity-100 ${
                    expandedCategories.has(section.title) ? 'rotate-180' : ''
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                </svg>
              </button>

              {expandedCategories.has(section.title) && (
                <div className='mt-0.5 space-y-0.5 animate-fade-in'>
                  {section.items.map((item: any) => {
                    if (item.external) {
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group/item flex items-center gap-2 w-full px-2.5 py-[6px] rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          title={`Open ${item.label} in a new tab`}
                        >
                          {item.icon && <NavIcon icon={item.icon} className='text-muted-foreground group-hover/item:text-foreground' />}
                          <span className='flex-1 text-left truncate'>{item.label}</span>
                          <svg className='w-3 h-3 opacity-50 group-hover/item:opacity-80' aria-hidden='true' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M7 17L17 7' />
                            <path d='M9 7h8v8' />
                          </svg>
                        </a>
                      );
                    }
                    const active = isActive(item.href);
                    return (
                      <button
                        key={item.href}
                        onClick={() => handleNav(item.href)}
                        className={`group/item flex items-center gap-2 w-full px-2.5 py-[6px] rounded-md text-[13px] ${
                          active
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        {item.icon && <NavIcon icon={item.icon} className={active ? 'text-primary' : 'text-muted-foreground group-hover/item:text-foreground'} />}
                        <span className='flex-1 text-left truncate'>{item.label}</span>
                        {item.count !== undefined && (
                          <span
                            className={`text-[10px] px-1.5 rounded-full tabular-nums leading-relaxed ${
                              active
                                ? 'bg-primary/15 text-primary'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className='p-3 mt-2 mx-3 mb-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10'>
          <p className='text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5'>
            <svg
              className='w-3.5 h-3.5 text-primary'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            Need help?
          </p>
          <p className='text-[11px] text-muted-foreground leading-relaxed'>
            Join our community or check the{' '}
            <button
              onClick={() => handleNav('/guides/contributing')}
              className='text-primary hover:underline font-medium'
            >
              contributing guide
            </button>.
          </p>
        </div>
      </aside>
    </>
  );
}

// ─── SearchDialog ─────────────────────────────────────────────────────────────
export function SearchDialog({
  open,
  onClose,
  navigate,
}: {
  open: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const pages = [
    { label: 'Overview', href: '/', section: 'Pages' },
    { label: 'Installation', href: '/getting-started', section: 'Pages' },
    { label: 'Theming', href: '/theming', section: 'Pages' },
    { label: 'CLI Reference', href: '/cli', section: 'Pages' },
    { label: 'Storybook ↗', href: STORYBOOK_URL, section: 'Interactive', external: true },
    { label: 'Blocks', href: '/blocks', section: 'Interactive' },
    { label: 'Page Builder ↗', href: BUILDER_URL, section: 'Interactive', external: true },
    { label: 'Changelog', href: '/changelog', section: 'Pages' },
    { label: 'Accessibility Guide', href: '/guides/accessibility', section: 'Guides' },
    { label: 'Design Sync Guide', href: '/guides/design-sync', section: 'Guides' },
    { label: 'Multi-Framework Guide', href: '/guides/frameworks', section: 'Guides' },
    { label: 'Contributing Guide', href: '/guides/contributing', section: 'Guides' },
    { label: 'Design Resources', href: '/design-resources', section: 'Resources' },
  ];

  const q = query.toLowerCase();
  const filteredComponents = query
    ? components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.includes(q),
    )
    : components.slice(0, 8);

  const filteredPages = query ? pages.filter((p) => p.label.toLowerCase().includes(q)) : pages;

  const allResults = [
    ...filteredPages.map((p) => ({ ...p, type: 'page' as const })),
    ...filteredComponents.map((c) => ({
      label: c.name,
      href: `/components/detail/${c.slug}`,
      section: `${categories.find((cat) => cat.id === c.category)?.label || 'Components'}`,
      type: 'component' as const,
      tier: c.tier,
    })),
  ];

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (href: string, external?: boolean) => {
    if (external || /^https?:\/\//.test(href)) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, allResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && allResults[selectedIndex]) {
      const r: any = allResults[selectedIndex];
      handleSelect(r.href, r.external);
    }
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]'>
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in'
        onClick={onClose}
      />
      <div className='relative z-10 w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl overflow-hidden animate-scale-in'>
        <div className='flex items-center gap-3 px-4 border-b border-border'>
          <svg
            className='w-4 h-4 text-primary shrink-0'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Search components, pages, guides...'
            className='flex-1 h-12 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none'
          />
          <kbd className='text-[10px] px-1.5 py-0.5 rounded border border-border bg-muted text-muted-foreground font-mono'>
            ESC
          </kbd>
        </div>

        <div className='max-h-[50vh] overflow-y-auto p-2 scrollbar-thin'>
          {allResults.length === 0
            ? (
              <div className='py-12 text-center'>
                <div className='text-3xl mb-2'>🔍</div>
                <p className='text-sm text-muted-foreground'>
                  No results found for "<span className='text-foreground font-medium'>{query}
                  </span>"
                </p>
              </div>
            )
            : (
              <>
                {Object.entries(
                  allResults.reduce(
                    (acc, item) => {
                      const key = item.section;
                      if (!acc[key]) acc[key] = [];
                      acc[key].push(item);
                      return acc;
                    },
                    {} as Record<string, typeof allResults>,
                  ),
                ).map(([section, items]) => (
                  <div key={section} className='mb-1'>
                    <div className='px-2 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider'>
                      {section}
                    </div>
                    {items.map((item) => {
                      const globalIndex = allResults.indexOf(item);
                      return (
                        <button
                          key={item.href}
                          onClick={() => handleSelect(item.href, (item as any).external)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-100 ${
                            globalIndex === selectedIndex
                              ? 'bg-primary/10 text-primary shadow-sm'
                              : 'text-foreground hover:bg-muted/50'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 ${
                              globalIndex === selectedIndex
                                ? 'bg-primary/20 text-primary'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {item.type === 'component' ? '◇' : item.type === 'page' ? '◈' : '◎'}
                          </span>
                          <span className='flex-1 text-left truncate'>{item.label}</span>
                          {item.type === 'component' && 'tier' in item && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                              item.tier === 1 ? 'badge-basic' : item.tier === 2 ? 'badge-advanced' : 'badge-enterprise'
                            }`}>
                              {item.tier === 1 ? 'Basic' : item.tier === 2 ? 'Advanced' : 'Enterprise'}
                            </span>
                          )}
                          {globalIndex === selectedIndex && (
                            <svg
                              className='w-3 h-3 shrink-0 text-primary'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M13 7l5 5-5 5'
                              />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </>
            )}
        </div>

        <div className='flex items-center gap-4 px-4 py-2 border-t border-border text-[11px] text-muted-foreground bg-muted/20'>
          <span className='flex items-center gap-1'>
            <kbd className='px-1 py-0.5 rounded border border-border bg-background font-mono'>
              ↑↓
            </kbd>{' '}
            Navigate
          </span>
          <span className='flex items-center gap-1'>
            <kbd className='px-1 py-0.5 rounded border border-border bg-background font-mono'>
              ↵
            </kbd>{' '}
            Select
          </span>
          <span className='flex items-center gap-1'>
            <kbd className='px-1 py-0.5 rounded border border-border bg-muted font-mono'>esc</kbd>
            {' '}
            Close
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Layout Shell ─────────────────────────────────────────────────────────────
export function DocsLayout({
  children,
  route,
  isActive,
  navigate,
}: {
  children: React.ReactNode;
  route: string;
  isActive: (path: string) => boolean;
  navigate: (path: string) => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [route]);

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Header
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onOpenSearch={() => setSearchOpen(true)}
        isDark={isDark}
        onToggleDark={() => setIsDark((prev) => !prev)}
        route={route}
        navigate={navigate}
      />

      <div className='flex'>
        <Sidebar
          isActive={isActive}
          navigate={navigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className='flex-1 min-w-0 overflow-x-hidden'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 animate-fade-in'>
            {children}
          </div>

          {/* Footer */}
          <footer className='border-t border-border/60 mt-12 bg-muted/10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-10'>
                <div>
                  <h4 className='text-xs font-semibold text-foreground uppercase tracking-wider mb-3'>
                    Getting Started
                  </h4>
                  <ul className='space-y-2'>
                    {[
                      { label: 'Installation', href: '/getting-started' },
                      { label: 'Theming', href: '/theming' },
                      { label: 'CLI', href: '/cli' },
                    ].map((l) => (
                      <li key={l.href}>
                        <button
                          onClick={() => navigate(l.href)}
                          className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                        >
                          {l.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className='text-xs font-semibold text-foreground uppercase tracking-wider mb-3'>
                    Interactive
                  </h4>
                  <ul className='space-y-2'>
                    {[
                      { label: 'Blocks', href: '/blocks', external: false },
                      { label: 'Storybook', href: STORYBOOK_URL, external: true },
                      { label: 'Page Builder', href: BUILDER_URL, external: true },
                    ].map((l) => (
                      <li key={l.href}>
                        {l.external ? (
                          <a
                            href={l.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'
                          >
                            {l.label}
                            <svg className='w-3 h-3 opacity-60' aria-hidden='true' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
                              <path d='M7 17L17 7' />
                              <path d='M9 7h8v8' />
                            </svg>
                          </a>
                        ) : (
                          <button
                            onClick={() => navigate(l.href)}
                            className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                          >
                            {l.label}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className='text-xs font-semibold text-foreground uppercase tracking-wider mb-3'>
                    Guides
                  </h4>
                  <ul className='space-y-2'>
                    {[
                      { label: 'Accessibility', href: '/guides/accessibility' },
                      { label: 'Design Sync', href: '/guides/design-sync' },
                      { label: 'Contributing', href: '/guides/contributing' },
                    ].map((l) => (
                      <li key={l.href}>
                        <button
                          onClick={() => navigate(l.href)}
                          className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                        >
                          {l.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className='text-xs font-semibold text-foreground uppercase tracking-wider mb-3'>
                    Community
                  </h4>
                  <ul className='space-y-2'>
                    <li>
                      <a
                        href='https://github.com/nicober1/adhar-ui'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate('/changelog')}
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                      >
                        Changelog
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='flex items-center justify-between pt-8 border-t border-border/60'>
                <div className='flex items-center gap-2.5'>
                  <div className='w-5 h-5 rounded-md btn-gradient flex items-center justify-center'>
                    <span className='text-white font-bold text-[10px]'>A</span>
                  </div>
                  <span className='text-xs text-muted-foreground/80'>
                    Adhar UI — Open Source Design System
                  </span>
                </div>
                <span className='text-[11px] text-muted-foreground/60 hidden sm:inline'>
                  Built with Deno, Vite & Tailwind CSS v4
                </span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        navigate={navigate}
      />
    </div>
  );
}
