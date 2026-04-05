import React, { useState } from 'react';

const sections = {
  overview: { label: 'Overview' },
  installation: { label: 'Installation' },
  theming: { label: 'Theming' },
  components: { label: 'Components' },
  cli: { label: 'CLI Reference' },
};

const componentsByCategory = [
  {
    category: 'Form Controls',
    tier: 1,
    items: [
      'Button',
      'Input',
      'Textarea',
      'Label',
      'Checkbox',
      'Radio Group',
      'Switch',
      'Select',
      'Slider',
      'Toggle',
      'Toggle Group',
    ],
  },
  {
    category: 'Display',
    tier: 1,
    items: ['Badge', 'Avatar', 'Separator', 'Skeleton', 'Progress', 'Spinner', 'Aspect Ratio'],
  },
  { category: 'Layout', tier: 1, items: ['Card', 'Scroll Area', 'Collapsible', 'Resizable'] },
  { category: 'Feedback', tier: 1, items: ['Alert', 'Alert Dialog', 'Toast'] },
  { category: 'Overlay', tier: 1, items: ['Dialog', 'Sheet', 'Tooltip', 'Popover', 'Hover Card'] },
  {
    category: 'Navigation',
    tier: 1,
    items: [
      'Tabs',
      'Accordion',
      'Dropdown Menu',
      'Context Menu',
      'Menubar',
      'Navigation Menu',
      'Breadcrumb',
      'Pagination',
      'Sidebar',
    ],
  },
  {
    category: 'Composite',
    tier: 2,
    items: [
      'Command',
      'Combobox',
      'Date Picker',
      'Calendar',
      'Color Picker',
      'Form',
      'Input OTP',
      'Table',
      'Carousel',
      'Chart',
      'Drawer',
      'Sonner',
    ],
  },
  {
    category: 'Enterprise',
    tier: 3,
    items: [
      'Data Table',
      'Form Builder',
      'File Upload',
      'Rich Text Editor',
      'Kanban Board',
      'Timeline',
      'Tree View',
      'Stepper',
      'Multi Select',
      'Transfer List',
      'Empty State',
      'Stat Card',
      'Kbd',
      'Copy Button',
    ],
  },
  {
    category: 'AI',
    tier: 3,
    items: [
      'Chat',
      'Prompt Input',
      'Streaming Text',
      'Code Block',
      'Model Selector',
      'Token Counter',
      'Thinking Indicator',
      'Feedback Buttons',
      'Suggestion Chips',
      'Message Bubble',
    ],
  },
  {
    category: 'Responsive Layout',
    tier: 3,
    items: ['Responsive Sidebar', 'Bottom Sheet', 'Split View'],
  },
];

const totalComponents = componentsByCategory.reduce((s, c) => s + c.items.length, 0);

export function App() {
  const [page, setPage] = useState('overview');
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className='min-h-screen bg-background text-foreground'>
        {/* Header */}
        <header className='sticky top-0 z-50 border-b bg-background/95 backdrop-blur'>
          <div className='container mx-auto flex h-14 items-center px-4'>
            <a href='#' onClick={() => setPage('overview')} className='flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className='text-primary'
              >
                <rect width='18' height='18' x='3' y='3' rx='2' />
                <path d='M9 3v18' />
                <path d='m16 15-3-3 3-3' />
              </svg>
              <span className='text-lg font-bold'>Adhar UI</span>
            </a>
            <span className='ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'>
              v0.1.0
            </span>

            <nav className='ml-8 hidden gap-6 md:flex'>
              {Object.entries(sections).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setPage(key)}
                  className={`text-sm transition-colors ${
                    page === key
                      ? 'font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className='ml-auto flex items-center gap-3'>
              <span className='hidden text-xs text-muted-foreground sm:block'>
                {totalComponents} components
              </span>
              <button
                onClick={() => setDark(!dark)}
                className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-input hover:bg-accent transition-colors'
              >
                {dark
                  ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <circle cx='12' cy='12' r='4' />
                      <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' />
                    </svg>
                  )
                  : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
                    </svg>
                  )}
              </button>
            </div>
          </div>
        </header>

        <main className='container mx-auto px-4'>
          {page === 'overview' && <OverviewPage onNavigate={setPage} />}
          {page === 'installation' && <InstallationPage />}
          {page === 'theming' && <ThemingPage />}
          {page === 'components' && <ComponentsPage />}
          {page === 'cli' && <CLIPage />}
        </main>

        <footer className='border-t py-8'>
          <div className='container mx-auto px-4 text-center text-sm text-muted-foreground'>
            <p>Adhar UI - Framework-agnostic design system for the Adhar Platform</p>
            <p className='mt-1'>Built with Deno, Mitosis, Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function OverviewPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className='py-16'>
      <section className='mx-auto max-w-3xl text-center'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
          Build UIs with{' '}
          <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            Adhar UI
          </span>
        </h1>
        <p className='mt-6 text-lg text-muted-foreground leading-relaxed'>
          {totalComponents}{' '}
          production-ready, accessible components. Copy to your project, not installed from npm.
          Works with React, Vue, Solid, Svelte, and Angular.
        </p>
        <div className='mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
          <button
            onClick={() => onNavigate('installation')}
            className='inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors'
          >
            Get Started
          </button>
          <button
            onClick={() => onNavigate('components')}
            className='inline-flex h-11 items-center justify-center rounded-md border border-input px-8 text-sm font-medium hover:bg-accent transition-colors'
          >
            Browse Components
          </button>
        </div>
      </section>

      <section className='mt-24 grid gap-6 md:grid-cols-3'>
        {[
          {
            title: 'Framework Agnostic',
            desc:
              'Write once with Mitosis, compile to React, Vue, Solid, Svelte, Angular. Same components, native output.',
            icon: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' />
              </svg>
            ),
          },
          {
            title: 'Own Your Code',
            desc:
              'Components are copied to your project, not installed from npm. Full customization. No vendor lock-in. Like shadcn/ui.',
            icon: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='m18 16 4-4-4-4' />
                <path d='m6 8-4 4 4 4' />
                <path d='m14.5 4-5 16' />
              </svg>
            ),
          },
          {
            title: 'Enterprise + AI Ready',
            desc:
              'Data tables, form builders, kanban boards. Plus AI components: chat, streaming text, code blocks, prompt input.',
            icon: (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z' />
                <path d='M7 7h.01' />
              </svg>
            ),
          },
        ].map((f) => (
          <div key={f.title} className='rounded-lg border p-6'>
            <div className='mb-3 text-primary'>{f.icon}</div>
            <h3 className='text-lg font-semibold'>{f.title}</h3>
            <p className='mt-2 text-sm text-muted-foreground leading-relaxed'>{f.desc}</p>
          </div>
        ))}
      </section>

      <section className='mt-24'>
        <h2 className='text-2xl font-bold mb-8'>Component Library ({totalComponents})</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {componentsByCategory.map((cat) => (
            <div key={cat.category} className='rounded-lg border p-4'>
              <div className='flex items-center justify-between mb-3'>
                <h4 className='font-semibold text-sm'>{cat.category}</h4>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    cat.tier === 1
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : cat.tier === 2
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                      : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                  }`}
                >
                  Tier {cat.tier}
                </span>
              </div>
              <div className='flex flex-wrap gap-1'>
                {cat.items.map((item) => (
                  <span key={item} className='rounded bg-muted px-1.5 py-0.5 text-xs'>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InstallationPage() {
  return (
    <div className='mx-auto max-w-2xl py-12'>
      <h1 className='text-3xl font-bold mb-8'>Installation</h1>

      <div className='space-y-8'>
        <section>
          <h2 className='text-xl font-semibold mb-4'>Prerequisites</h2>
          <ul className='list-disc pl-6 space-y-2 text-sm text-muted-foreground'>
            <li>A React, Vue, Solid, Svelte, or Angular project</li>
            <li>Tailwind CSS v3 or v4 configured</li>
            <li>TypeScript (recommended) or JavaScript</li>
            <li>Deno 2.x (for the CLI) or Node.js 20+</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>Quick Start</h2>
          {[
            {
              step: '1',
              title: 'Initialize your project',
              cmd: 'deno run -A jsr:@adhar-ui/cli init',
            },
            {
              step: '2',
              title: 'Add components',
              cmd: 'deno run -A jsr:@adhar-ui/cli add button card input dialog',
            },
            {
              step: '3',
              title: 'Import and use',
              cmd:
                `import { Button } from '@/components/ui/button'\n\nexport default function Page() {\n  return <Button variant="outline">Click me</Button>\n}`,
            },
          ].map((s) => (
            <div key={s.step} className='mb-6'>
              <h3 className='text-sm font-medium mb-2'>{s.step}. {s.title}</h3>
              <pre className='rounded-lg border bg-muted p-4 text-sm font-mono overflow-x-auto'>{s.cmd}</pre>
            </div>
          ))}
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>What gets created</h2>
          <pre className='rounded-lg border bg-muted p-4 text-sm font-mono'>{`your-project/
├── adhar-ui.json          # Configuration
├── src/
│   ├── lib/
│   │   └── utils.ts       # cn() utility
│   ├── globals.css         # Theme CSS variables
│   └── components/
│       └── ui/
│           ├── button.tsx  # Your components
│           ├── card.tsx
│           ├── input.tsx
│           └── dialog.tsx`}</pre>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-4'>Framework Support</h2>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-5'>
            {['React', 'Vue', 'Solid', 'Svelte', 'Angular'].map((fw) => (
              <div key={fw} className='rounded-lg border p-3 text-center'>
                <p className='text-sm font-medium'>{fw}</p>
                <p className='text-xs text-muted-foreground mt-1'>Supported</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ThemingPage() {
  const [activeTheme, setActiveTheme] = useState('zinc');
  const themes = ['zinc', 'slate', 'blue', 'green'];

  return (
    <div className='mx-auto max-w-2xl py-12'>
      <h1 className='text-3xl font-bold mb-8'>Theming</h1>

      <section className='mb-12'>
        <h2 className='text-xl font-semibold mb-4'>Built-in Themes</h2>
        <p className='text-sm text-muted-foreground mb-4'>
          Adhar UI includes 4 built-in theme presets. Apply them with the CLI:
        </p>
        <pre className='rounded-lg border bg-muted p-4 text-sm font-mono mb-4'>adhar-ui theme blue</pre>

        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTheme(t)}
              className={`rounded-lg border p-3 text-center transition-colors ${
                activeTheme === t ? 'border-primary ring-2 ring-primary/20' : 'hover:bg-accent'
              }`}
            >
              <div
                className='mx-auto mb-2 h-8 w-8 rounded-full'
                style={{
                  backgroundColor: t === 'zinc'
                    ? '#71717a'
                    : t === 'slate'
                    ? '#64748b'
                    : t === 'blue'
                    ? '#3b82f6'
                    : '#22c55e',
                }}
              />
              <p className='text-sm font-medium capitalize'>{t}</p>
            </button>
          ))}
        </div>
      </section>

      <section className='mb-12'>
        <h2 className='text-xl font-semibold mb-4'>CSS Variables</h2>
        <p className='text-sm text-muted-foreground mb-4'>
          All colors use HSL CSS custom properties for easy runtime theming:
        </p>
        <pre className='rounded-lg border bg-muted p-4 text-sm font-mono overflow-x-auto'>{`:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --muted: 240 4.8% 95.9%;
  --accent: 240 4.8% 95.9%;
  --destructive: 0 84.2% 60.2%;
  --border: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}`}</pre>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-4'>Custom Theme</h2>
        <p className='text-sm text-muted-foreground mb-4'>Create a custom theme file:</p>
        <pre className='rounded-lg border bg-muted p-4 text-sm font-mono'>adhar-ui theme create my-brand</pre>
        <p className='mt-4 text-sm text-muted-foreground'>
          This creates{' '}
          <code className='rounded bg-muted px-1.5 py-0.5 text-xs font-mono'>
            adhar-ui.theme.ts
          </code>{' '}
          where you can override any color token.
        </p>
      </section>
    </div>
  );
}

function ComponentsPage() {
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState<number | null>(null);

  const filtered = componentsByCategory
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter((cat) => cat.items.length > 0 && (filterTier === null || cat.tier === filterTier));

  return (
    <div className='py-12'>
      <h1 className='text-3xl font-bold mb-2'>Components</h1>
      <p className='text-muted-foreground mb-8'>
        {totalComponents} production-ready components across 3 tiers.
      </p>

      <div className='flex flex-col gap-4 sm:flex-row sm:items-center mb-8'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search components...'
          className='flex h-10 w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        />
        <div className='flex gap-2'>
          <button
            onClick={() => setFilterTier(null)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              filterTier === null ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterTier(1)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              filterTier === 1 ? 'bg-blue-600 text-white' : 'border hover:bg-accent'
            }`}
          >
            Tier 1: Core
          </button>
          <button
            onClick={() => setFilterTier(2)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              filterTier === 2 ? 'bg-purple-600 text-white' : 'border hover:bg-accent'
            }`}
          >
            Tier 2: Composite
          </button>
          <button
            onClick={() => setFilterTier(3)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              filterTier === 3 ? 'bg-orange-600 text-white' : 'border hover:bg-accent'
            }`}
          >
            Tier 3: Enterprise
          </button>
        </div>
      </div>

      <div className='space-y-8'>
        {filtered.map((cat) => (
          <div key={cat.category}>
            <div className='flex items-center gap-3 mb-4'>
              <h2 className='text-xl font-semibold'>{cat.category}</h2>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  cat.tier === 1
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : cat.tier === 2
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                }`}
              >
                Tier {cat.tier}
              </span>
            </div>
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {cat.items.map((item) => {
                const slug = item.toLowerCase().replace(/\s+/g, '-');
                return (
                  <div
                    key={item}
                    className='group rounded-lg border p-4 transition-colors hover:bg-accent/50'
                  >
                    <h3 className='text-sm font-semibold'>{item}</h3>
                    <p className='mt-1 text-xs text-muted-foreground'>adhar-ui add {slug}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CLIPage() {
  return (
    <div className='mx-auto max-w-2xl py-12'>
      <h1 className='text-3xl font-bold mb-8'>CLI Reference</h1>

      <div className='space-y-8'>
        {[
          {
            cmd: 'init',
            desc: 'Initialize Adhar UI in your project',
            usage: 'adhar-ui init',
            flags: ['--force: Overwrite existing config', '--defaults: Use defaults (no prompts)'],
          },
          {
            cmd: 'add',
            desc: 'Add components to your project',
            usage: 'adhar-ui add button card dialog\nadhar-ui add --all',
            flags: ['--overwrite: Overwrite existing files', '--all: Add all components'],
          },
          {
            cmd: 'list',
            desc: 'List all available components',
            usage: 'adhar-ui list\nadhar-ui list --category=ai\nadhar-ui list --tier=3',
            flags: [
              '--category: Filter by category',
              '--tier: Filter by tier (1, 2, 3)',
              '--json: Output as JSON',
            ],
          },
          {
            cmd: 'diff',
            desc: 'Compare local vs registry',
            usage: 'adhar-ui diff\nadhar-ui diff button card',
            flags: [],
          },
          {
            cmd: 'theme',
            desc: 'Manage themes',
            usage:
              'adhar-ui theme           # List themes\nadhar-ui theme blue      # Apply preset\nadhar-ui theme create my-brand',
            flags: [],
          },
          {
            cmd: 'doctor',
            desc: 'Validate project setup',
            usage: 'adhar-ui doctor',
            flags: [
              'Checks: config, package.json, framework, TypeScript, Tailwind, utils, deps, UI directory',
            ],
          },
        ].map((c) => (
          <div key={c.cmd} className='rounded-lg border p-6'>
            <h2 className='text-lg font-semibold font-mono'>adhar-ui {c.cmd}</h2>
            <p className='mt-1 text-sm text-muted-foreground'>{c.desc}</p>
            <pre className='mt-3 rounded-md bg-muted p-3 text-sm font-mono overflow-x-auto'>{c.usage}</pre>
            {c.flags.length > 0 && (
              <div className='mt-3'>
                <p className='text-xs font-medium text-muted-foreground mb-1'>Flags:</p>
                <ul className='space-y-1'>
                  {c.flags.map((f) => (
                    <li key={f} className='text-xs text-muted-foreground'>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
