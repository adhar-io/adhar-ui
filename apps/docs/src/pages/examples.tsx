import React, { useMemo, useState } from 'react';
import { Badge, Callout, CodeBlock, PageHeader } from '../components/ui.tsx';
import { BlockPreview } from '../components/block-previews.tsx';
import { getBlocks } from '../../../../packages/registry/src/index.ts';
import { getTemplate } from '../../../../packages/cli/src/templates/index.ts';

// Convert "block-stats-grid" → "StatsGrid" for the import statement
function toComponentName(slug: string): string {
  return slug
    .replace(/^block-/, '')
    .split('-')
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('');
}

// Build a minimal usage example for a block based on its component name
function buildUsageExample(slug: string): string {
  const name = toComponentName(slug);
  const importLine = `import { ${name} } from '@/components/ui/${slug}'`;

  // Provide block-specific minimal usage examples; otherwise empty-prop fallback
  const examples: Record<string, string> = {
    'block-login': `<${name}
  onSubmit={(data) => console.log(data)}
  onSocialLogin={(provider) => signInWith(provider)}
/>`,
    'block-signup': `<${name} onSubmit={(data) => createAccount(data)} />`,
    'block-forgot-password': `<${name} onSubmit={(email) => sendResetEmail(email)} />`,
    'block-otp-verify': `<${name}
  onVerify={(code) => verifyCode(code)}
  onResend={() => resendCode()}
/>`,
    'block-stats-grid': `<${name}
  heading="Performance"
  stats={[
    { label: 'Revenue', value: '$48K', trend: { value: '+12%', positive: true } },
    { label: 'Users',   value: '2,350', trend: { value: '+18%', positive: true } },
    { label: 'MRR',     value: '$12K', trend: { value: '+4%',  positive: true } },
    { label: 'Churn',   value: '2.1%', trend: { value: '-0.3%', positive: false } },
  ]}
/>`,
    'block-team-grid': `<${name}
  members={[
    { name: 'Priya Menon',  role: 'Product Lead' },
    { name: 'Marcus Chen',  role: 'Staff Engineer' },
    { name: 'Sofia Reyes',  role: 'Design Lead' },
  ]}
/>`,
    'block-blog-grid': `<${name}
  posts={[
    { title: 'Shipping faster', excerpt: '…', author: 'Priya', date: 'Mar 18' },
    { title: 'Designing systems', excerpt: '…', author: 'Sofia', date: 'Mar 12' },
  ]}
/>`,
    'block-newsletter': `<${name} onSubscribe={(email) => api.subscribe(email)} />`,
    'block-integrations': `<${name}
  integrations={[
    { name: 'Slack', status: 'available' },
    { name: 'GitHub', status: 'available' },
    { name: 'Linear', status: 'beta' },
  ]}
/>`,
    'block-comparison-table': `<${name}
  plans={[
    { name: 'Starter', price: '$0',  cta: 'Start' },
    { name: 'Pro',     price: '$29', cta: 'Upgrade', popular: true },
    { name: 'Team',    price: '$99', cta: 'Contact' },
  ]}
  features={[
    { label: 'Projects', values: ['3', 'Unlimited', 'Unlimited'] },
    { label: 'Support',  values: [false, true, true] },
  ]}
/>`,
    'block-video-hero': `<${name}
  headline="Watch it in action"
  subheadline="The fastest way to ship modern apps"
  videoSrc="/hero.mp4"
  primaryCta={{ label: 'Get started', onClick: () => {} }}
/>`,
    'block-banner-announcement': `<${name}
  message="🎉 New: Adhar UI v2.0 is here"
  ctaLabel="Read more"
  variant="gradient"
/>`,
    'block-multistep-form': `<${name}
  steps={[
    { id: '1', title: 'Account', content: <AccountStep /> },
    { id: '2', title: 'Profile', content: <ProfileStep /> },
    { id: '3', title: 'Done',    content: <DoneStep /> },
  ]}
  onComplete={() => router.push('/dashboard')}
/>`,
    'block-stepper-form': `<${name}
  steps={[
    { id: '1', title: 'Account', content: <AccountStep /> },
    { id: '2', title: 'Profile', content: <ProfileStep /> },
    { id: '3', title: 'Done',    content: <DoneStep /> },
  ]}
  onComplete={() => router.push('/dashboard')}
/>`,
    'block-billing-invoices': `<${name}
  currentPlan={{ name: 'Pro', price: '$29/mo', nextBilling: 'Apr 15' }}
  invoices={[
    { id: 'INV-001', date: 'Mar 15', amount: '$29.00', status: 'paid' },
    { id: 'INV-002', date: 'Feb 15', amount: '$29.00', status: 'paid' },
  ]}
  onUpgrade={() => router.push('/billing')}
/>`,
    'block-notifications-center': `<${name}
  notifications={[
    { id: '1', title: 'New comment', timestamp: '2m ago', read: false },
    { id: '2', title: 'Deploy succeeded', timestamp: '1h ago', read: true },
  ]}
  onMarkAllRead={() => {}}
/>`,
    'block-search-results': `<${name}
  query="design system"
  total={142}
  results={[
    { id: '1', title: 'Adhar UI', snippet: '…', url: 'adhar.dev' },
  ]}
  onSearch={(q) => router.push(\`/search?q=\${q}\`)}
/>`,
    'block-profile': `<${name}
  name="Priya Menon"
  role="Product Manager"
  bio="Building tools for designers and engineers."
  location="San Francisco"
  joinedDate="Mar 2024"
  stats={[
    { label: 'Projects', value: '12' },
    { label: 'Followers', value: '1.2K' },
  ]}
/>`,
    'block-onboarding': `<${name}
  steps={[
    { id: '1', title: 'Welcome',  description: 'Let’s set up your workspace' },
    { id: '2', title: 'Invite',   description: 'Bring your team along' },
    { id: '3', title: 'Connect',  description: 'Hook up your tools' },
  ]}
  onComplete={() => router.push('/dashboard')}
  onSkip={() => router.push('/dashboard')}
/>`,
    'block-timeline-page': `<${name}
  events={[
    { id: '1', title: 'Deploy succeeded', timestamp: '2m', group: 'Today' },
    { id: '2', title: 'PR merged',         timestamp: '1h', group: 'Today' },
    { id: '3', title: 'Issue created',     timestamp: '1d', group: 'Yesterday' },
  ]}
/>`,
    'block-empty-state-page': `<${name}
  title="No projects yet"
  description="Create your first project to get started."
  primaryCta={{ label: '+ New project', onClick: () => {} }}
/>`,
    'block-loading-page': `<${name} rows={6} />`,
    'block-tabs-page': `<${name}
  heading="Settings"
  tabs={[
    { id: 'overview', label: 'Overview', content: <Overview /> },
    { id: 'activity', label: 'Activity', count: 12, content: <Activity /> },
  ]}
/>`,
    'block-card-grid': `<${name}
  heading="Templates"
  items={[
    { id: '1', title: 'Landing page', description: '…', cta: 'Use template' },
    { id: '2', title: 'Dashboard',    description: '…', cta: 'Use template' },
  ]}
/>`,
  };

  const usage = examples[slug] || `<${name} />`;
  return `${importLine}\n\nexport function Example() {\n  return (\n    ${usage.split('\n').map((l, i) => i === 0 ? l : '    ' + l).join('\n')}\n  )\n}`;
}

// Extract the public prop signature from a block's source (best-effort).
// Walks the source character-by-character with depth counters so nested
// types like `stats: { label: string; value: string }[]` are parsed correctly.
function extractProps(src: string): { name: string; type: string; optional: boolean }[] {
  // Find the index of the first `export function NAME(` or `export const NAME = (`
  const fnIdx = src.search(/export\s+(function|const)\s+\w+/);
  if (fnIdx < 0) return [];
  const after = src.slice(fnIdx);

  // Find the destructuring `(` and walk to the matching `)`.
  const openParen = after.indexOf('(');
  if (openParen < 0) return [];
  let depth = 0;
  let endParen = -1;
  for (let i = openParen; i < after.length; i++) {
    const ch = after[i];
    if (ch === '(' || ch === '{' || ch === '[' || ch === '<') depth++;
    else if (ch === ')' || ch === '}' || ch === ']' || ch === '>') {
      depth--;
      if (depth === 0 && ch === ')') { endParen = i; break; }
    }
  }
  if (endParen < 0) return [];
  const params = after.slice(openParen + 1, endParen);

  // Find the type annotation block: `{ … }: { … }`.
  // We need the second `{ … }` block (the type), since the first is destructuring.
  // Walk to find both top-level brace blocks.
  let firstBlockEnd = -1;
  depth = 0;
  let started = false;
  for (let i = 0; i < params.length; i++) {
    const ch = params[i];
    if (ch === '{') { if (!started) started = true; depth++; }
    else if (ch === '}') { depth--; if (depth === 0 && started) { firstBlockEnd = i; break; } }
  }
  if (firstBlockEnd < 0) return [];
  // After the first block, look for `:` and then the second block.
  const rest = params.slice(firstBlockEnd + 1);
  const colonIdx = rest.indexOf(':');
  if (colonIdx < 0) return [];
  const typeStart = rest.indexOf('{', colonIdx);
  if (typeStart < 0) return [];
  let typeEnd = -1;
  depth = 0;
  for (let i = typeStart; i < rest.length; i++) {
    const ch = rest[i];
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { typeEnd = i; break; } }
  }
  if (typeEnd < 0) return [];
  const typeBlock = rest.slice(typeStart + 1, typeEnd);

  // Split by `;` at top level (depth 0).
  const props: { name: string; type: string; optional: boolean }[] = [];
  let buf = '';
  depth = 0;
  for (const ch of typeBlock) {
    if (ch === '{' || ch === '(' || ch === '<' || ch === '[') depth++;
    else if (ch === '}' || ch === ')' || ch === '>' || ch === ']') depth--;
    if (ch === ';' && depth === 0) {
      const parsed = parseProp(buf);
      if (parsed) props.push(parsed);
      buf = '';
    } else {
      buf += ch;
    }
  }
  const trailing = parseProp(buf);
  if (trailing) props.push(trailing);
  return props;
}

function parseProp(raw: string): { name: string; type: string; optional: boolean } | null {
  const m = raw.trim().match(/^(\w+)(\?)?\s*:\s*([\s\S]+)$/);
  if (!m) return null;
  return { name: m[1], optional: !!m[2], type: m[3].trim().replace(/\s+/g, ' ') };
}

// ─── Category configuration ─────────────────────────────────────────────────
const CATEGORIES: { id: string; label: string; icon: string; description: string }[] = [
  { id: 'all', label: 'All blocks', icon: '◉', description: 'Every block in the library' },
  { id: 'marketing', label: 'Marketing', icon: '✦', description: 'Hero, pricing, features, testimonials & CTAs' },
  { id: 'auth', label: 'Authentication', icon: '🔐', description: 'Sign in, sign up, password & OTP flows' },
  { id: 'dashboard', label: 'Dashboard', icon: '📊', description: 'Stats, charts, activity feeds & overviews' },
  { id: 'app', label: 'App pages', icon: '🪟', description: 'Profile, search, notifications, timeline, etc.' },
  { id: 'settings', label: 'Settings', icon: '⚙', description: 'Profile, account, notifications, billing' },
  { id: 'form', label: 'Forms', icon: '📝', description: 'Multi-step forms & wizards' },
  { id: 'data', label: 'Data', icon: '⊞', description: 'Tables, lists, kanban & detail pages' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛍', description: 'Product, cart & checkout flows' },
  { id: 'ai', label: 'AI', icon: '✨', description: 'Chat & playground UIs' },
  { id: 'navigation', label: 'Navigation', icon: '☰', description: 'Headers, footers & sidebar layouts' },
  { id: 'content', label: 'Content', icon: '📰', description: 'Blog grids & publication pages' },
  { id: 'pricing', label: 'Pricing', icon: '💳', description: 'Plan comparison tables' },
  { id: 'layout', label: 'Layouts', icon: '▦', description: 'Tabbed pages, card grids & generic shells' },
  { id: 'error', label: 'Error pages', icon: '✕', description: '404, 500 & maintenance' },
];

// Category badge color mapping (subtle tinting per category)
const CAT_COLORS: Record<string, string> = {
  marketing: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  auth: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  dashboard: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  app: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  settings: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  form: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  data: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  ecommerce: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  ai: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400',
  navigation: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  content: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  pricing: 'bg-lime-500/10 text-lime-600 dark:text-lime-400',
  layout: 'bg-stone-500/10 text-stone-600 dark:text-stone-400',
  error: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
};

// Pick the most descriptive non-'block' category for a block
function primaryCategory(categories: string[]): string {
  return categories.find((c) => c !== 'block') || 'block';
}

// ─── Page ───────────────────────────────────────────────────────────────────
export function ExamplesPage({ navigate }: { navigate: (path: string) => void }) {
  const blocks = useMemo(() => getBlocks(), []);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return blocks.filter((b) => {
      if (activeCategory !== 'all' && !b.categories.includes(activeCategory)) return false;
      if (search) {
        const q = search.toLowerCase();
        return b.title.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.name.toLowerCase().includes(q);
      }
      return true;
    });
  }, [blocks, activeCategory, search]);

  // Counts per category for sidebar badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: blocks.length };
    for (const b of blocks) {
      for (const c of b.categories) {
        if (c !== 'block') counts[c] = (counts[c] || 0) + 1;
      }
    }
    return counts;
  }, [blocks]);

  const visibleCategories = CATEGORIES.filter((c) => c.id === 'all' || (categoryCounts[c.id] || 0) > 0);

  // ─── Detail view ─────────────────────────────────────────────────────
  const selectedBlock = selected ? blocks.find((b) => b.name === selected) : null;
  if (selectedBlock) {
    return <BlockDetail block={selectedBlock} navigate={navigate} onBack={() => setSelected(null)} />;
  }

  // ─── Grid view ─────────────────────────────────────────────────────────
  return (
    <div className='space-y-6'>
      <PageHeader
        title='Blocks'
        description='Pre-composed page sections built from the design system primitives. Copy, paste, customize, ship.'
        badge={<Badge variant='success'>{blocks.length} blocks</Badge>}
      />

      <div className='grid gap-6 lg:grid-cols-[220px_1fr]'>
        {/* Category sidebar */}
        <aside className='space-y-1'>
          {visibleCategories.map((cat) => {
            const active = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors ${
                  active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent/40 hover:text-foreground'
                }`}
              >
                <span className='text-base'>{cat.icon}</span>
                <span className='text-sm font-medium flex-1'>{cat.label}</span>
                <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded-full font-semibold ${
                  active ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </aside>

        <div className='space-y-4 min-w-0'>
          {/* Search bar */}
          <div className='relative'>
            <svg className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search blocks…'
              className='w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
            />
          </div>

          {/* Active category description */}
          {activeCategory !== 'all' && (
            <p className='text-sm text-muted-foreground'>
              {CATEGORIES.find((c) => c.id === activeCategory)?.description}
            </p>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className='py-16 text-center rounded-xl border bg-card/40'>
              <div className='text-4xl text-muted-foreground/30 mb-2'>◌</div>
              <p className='text-sm text-muted-foreground'>No blocks match your filters.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('all'); }}
                className='text-primary text-sm mt-2 hover:underline font-medium'
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Block grid */}
          <div className='grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
            {filtered.map((block) => {
              const cat = primaryCategory(block.categories);
              return (
                <button
                  key={block.name}
                  onClick={() => setSelected(block.name)}
                  className='group flex flex-col rounded-xl border border-border bg-card overflow-hidden text-left transition-all hover:shadow-md hover:border-primary/30'
                >
                  <div
                    className='relative h-[180px] border-b border-border/60'
                    style={{
                      background: 'radial-gradient(circle at 50% 60%, hsl(var(--primary) / 0.04), transparent 70%), hsl(var(--muted) / 0.15)',
                      backgroundImage: 'radial-gradient(circle at 50% 60%, hsl(var(--primary) / 0.04), transparent 70%), radial-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px)',
                      backgroundSize: 'auto, 14px 14px',
                    }}
                  >
                    <BlockPreview slug={block.name} />
                    <span className={`absolute top-2 right-2 z-10 text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${CAT_COLORS[cat] || 'bg-muted text-muted-foreground'}`}>
                      {cat}
                    </span>
                  </div>
                  <div className='p-4'>
                    <h3 className='text-sm font-semibold text-foreground group-hover:text-primary transition-colors'>
                      {block.title}
                    </h3>
                    <p className='mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed'>
                      {block.description}
                    </p>
                    <div className='mt-3 flex items-center justify-between'>
                      <code className='text-[10px] font-mono text-muted-foreground/70'>{block.name}</code>
                      {block.registryDependencies.length > 0 && (
                        <span className='text-[10px] text-muted-foreground'>
                          {block.registryDependencies.length} dep{block.registryDependencies.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <Callout type='tip'>
        Each block is shipped as plain TypeScript / React source — install with the CLI and you own the file outright. Edit, fork, restyle, no upstream lock-in.
      </Callout>
    </div>
  );
}

// ─── Block detail (tabs: Preview / Code / Documentation) ──────────────────
type BlockEntry = ReturnType<typeof getBlocks>[number];

function BlockDetail({ block, navigate, onBack }: { block: BlockEntry; navigate: (path: string) => void; onBack: () => void }) {
  const [tab, setTab] = useState<'preview' | 'code' | 'docs'>('preview');
  const [copied, setCopied] = useState(false);
  const source = useMemo(() => getTemplate(block.name) || '', [block.name]);
  const props = useMemo(() => extractProps(source), [source]);
  const usage = useMemo(() => buildUsageExample(block.name), [block.name]);
  const installCmd = `npx adhar-ui add ${block.name}`;
  const componentName = toComponentName(block.name);

  async function copySource() {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Older browsers / insecure contexts — fall back to the textarea trick
      const ta = document.createElement('textarea');
      ta.value = source;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
      document.body.removeChild(ta);
    }
  }

  return (
    <div className='space-y-6'>
      <button
        onClick={onBack}
        className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'
      >
        <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M15 19l-7-7 7-7' /></svg>
        Back to all blocks
      </button>

      {/* Header */}
      <div className='flex items-start gap-4 flex-wrap'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-1.5'>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${CAT_COLORS[primaryCategory(block.categories)] || 'bg-muted text-muted-foreground'}`}>
              {primaryCategory(block.categories)}
            </span>
            <Badge variant='outline'>tier {block.tier}</Badge>
            <code className='text-[10px] font-mono text-muted-foreground'>&lt;{componentName} /&gt;</code>
          </div>
          <h1 className='text-2xl font-bold tracking-tight'>{block.title}</h1>
          <p className='mt-1 text-sm text-muted-foreground max-w-2xl leading-relaxed'>{block.description}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className='flex items-center gap-1 border-b border-border'>
        {([
          { id: 'preview', label: 'Preview', icon: '👁' },
          { id: 'code', label: 'Code', icon: '< >' },
          { id: 'docs', label: 'Documentation', icon: '📖' },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className='text-xs'>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'preview' && (
        <div className='space-y-6'>
          <div
            className='rounded-xl border bg-card overflow-hidden'
            style={{
              backgroundImage: 'radial-gradient(hsl(var(--foreground) / 0.04) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          >
            <div className='h-[360px] flex items-center justify-center'>
              <div className='w-[440px] h-[280px] scale-150'>
                <BlockPreview slug={block.name} />
              </div>
            </div>
          </div>
          <div className='space-y-3'>
            <h2 className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>Installation</h2>
            <CodeBlock language='bash' code={installCmd} />
          </div>
          {block.registryDependencies.length > 0 && (
            <div className='space-y-3'>
              <h2 className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>Required components</h2>
              <p className='text-xs text-muted-foreground'>This block depends on these primitives — they'll be installed automatically.</p>
              <div className='flex flex-wrap gap-1.5'>
                {block.registryDependencies.map((dep) => (
                  <button
                    key={dep}
                    onClick={() => navigate(`/components/detail/${dep}`)}
                    className='inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-xs font-mono hover:border-primary/40 hover:bg-accent/30 transition-colors'
                  >
                    <span className='text-primary'>•</span>
                    {dep}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'code' && (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
              <code className='font-mono'>src/components/ui/{block.name}.tsx</code>
              <span>·</span>
              <span>{source.split('\n').length} lines</span>
            </div>
            <button
              onClick={copySource}
              className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                copied
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-card hover:bg-accent'
              }`}
            >
              {copied ? (
                <>
                  <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}><path d='M5 13l4 4L19 7' /></svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><rect x='9' y='9' width='13' height='13' rx='2' /><path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' /></svg>
                  Copy
                </>
              )}
            </button>
          </div>
          {source ? (
            <CodeBlock language='tsx' code={source} />
          ) : (
            <div className='rounded-lg border bg-muted/30 p-6 text-sm text-muted-foreground'>
              Source not available for this block.
            </div>
          )}
        </div>
      )}

      {tab === 'docs' && (
        <div className='space-y-8'>
          {/* Overview */}
          <section>
            <h2 className='text-base font-bold tracking-tight'>Overview</h2>
            <p className='mt-2 text-sm text-muted-foreground leading-relaxed'>{block.description}</p>
          </section>

          {/* Quick start */}
          <section className='space-y-3'>
            <h2 className='text-base font-bold tracking-tight'>Quick start</h2>
            <p className='text-sm text-muted-foreground'>Install the block and import it from your components directory:</p>
            <CodeBlock language='bash' code={installCmd} />
            <CodeBlock language='tsx' code={usage} />
          </section>

          {/* Props */}
          {props.length > 0 && (
            <section className='space-y-3'>
              <h2 className='text-base font-bold tracking-tight'>Props</h2>
              <div className='overflow-x-auto rounded-lg border'>
                <table className='w-full text-sm'>
                  <thead className='bg-muted/30'>
                    <tr>
                      <th className='px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Name</th>
                      <th className='px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Type</th>
                      <th className='px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.map((p) => (
                      <tr key={p.name} className='border-t'>
                        <td className='px-4 py-2.5 font-mono text-sm font-medium'>{p.name}</td>
                        <td className='px-4 py-2.5 font-mono text-xs text-muted-foreground'>{p.type}</td>
                        <td className='px-4 py-2.5'>
                          {p.optional ? (
                            <span className='text-xs text-muted-foreground'>optional</span>
                          ) : (
                            <span className='text-xs font-semibold text-primary'>required</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className='text-xs text-muted-foreground'>
                Inferred from the component signature. The block's source is plain TypeScript — fork it freely once installed.
              </p>
            </section>
          )}

          {/* Dependencies */}
          {(block.registryDependencies.length > 0 || block.dependencies.length > 0) && (
            <section className='space-y-3'>
              <h2 className='text-base font-bold tracking-tight'>Dependencies</h2>
              {block.registryDependencies.length > 0 && (
                <div className='space-y-2'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>Adhar UI components</h3>
                  <div className='flex flex-wrap gap-1.5'>
                    {block.registryDependencies.map((dep) => (
                      <button
                        key={dep}
                        onClick={() => navigate(`/components/detail/${dep}`)}
                        className='inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-xs font-mono hover:border-primary/40 hover:bg-accent/30 transition-colors'
                      >
                        <span className='text-primary'>•</span>
                        {dep}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {block.dependencies.length > 0 && (
                <div className='space-y-2'>
                  <h3 className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>npm packages</h3>
                  <div className='flex flex-wrap gap-1.5'>
                    {block.dependencies.map((dep) => (
                      <span key={dep} className='inline-flex rounded-md bg-muted px-2.5 py-1 text-xs font-mono text-muted-foreground'>
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Customization */}
          <section className='space-y-3'>
            <h2 className='text-base font-bold tracking-tight'>Customization</h2>
            <ul className='space-y-2 text-sm text-muted-foreground'>
              <li className='flex gap-2'>
                <span className='text-primary mt-0.5'>•</span>
                <span>The block lives at <code className='px-1 py-0.5 rounded bg-muted font-mono text-xs'>src/components/ui/{block.name}.tsx</code> after install — edit it directly.</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-primary mt-0.5'>•</span>
                <span>Pass a <code className='px-1 py-0.5 rounded bg-muted font-mono text-xs'>className</code> to extend or override styling.</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-primary mt-0.5'>•</span>
                <span>Restyle via design tokens (CSS variables) — no need to touch the component itself.</span>
              </li>
              <li className='flex gap-2'>
                <span className='text-primary mt-0.5'>•</span>
                <span>Compose with other primitives or replace internal pieces — you own the file outright.</span>
              </li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
