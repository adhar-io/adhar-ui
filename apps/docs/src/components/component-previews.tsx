/**
 * Curated preview "schematics" for the components gallery.
 *
 * Real demo components rendered at scale-[0.7] look cramped and unprofessional
 * inside the gallery cards. These previews are hand-designed mini illustrations
 * that visually convey what each component is — like Stripe / Linear / Vercel
 * component galleries do.
 *
 * Each preview is sized for a ~200x110 card region with consistent padding
 * and uses theme tokens (--primary, --border, etc.) so they look correct in
 * both light and dark mode.
 */
import React from 'react';

// ─── Preview kinds ───────────────────────────────────────────────────────────
type PreviewKind =
  | 'button' | 'icon-button' | 'button-group'
  | 'input' | 'search-input' | 'number-input' | 'textarea' | 'otp' | 'tag-input'
  | 'select' | 'combobox' | 'multi-select' | 'date-picker' | 'color-picker'
  | 'switch' | 'checkbox' | 'radio' | 'toggle' | 'toggle-group' | 'slider'
  | 'progress' | 'gauge' | 'spinner' | 'skeleton' | 'streaming'
  | 'avatar' | 'avatar-group' | 'badge' | 'kbd' | 'tag-list'
  | 'card' | 'stat-card' | 'aspect'
  | 'tabs' | 'accordion' | 'breadcrumb' | 'pagination' | 'stepper' | 'navigation' | 'menubar'
  | 'dialog' | 'sheet' | 'drawer' | 'bottom-sheet' | 'popover' | 'tooltip' | 'hover-card' | 'context-menu' | 'dropdown-menu' | 'command'
  | 'alert' | 'callout' | 'toast' | 'notification' | 'feedback'
  | 'calendar' | 'table' | 'data-table' | 'tree' | 'list' | 'sortable' | 'transfer'
  | 'sidebar' | 'split' | 'resizable' | 'scroll-area'
  | 'image' | 'image-upload' | 'file-upload' | 'empty'
  | 'chat' | 'message' | 'prompt-input' | 'suggestion' | 'thinking' | 'token-counter' | 'model-selector'
  | 'code'
  | 'chart-area' | 'chart-bar' | 'chart-line' | 'chart-pie' | 'chart-radar' | 'chart-scatter' | 'chart-candlestick' | 'chart-funnel' | 'chart-treemap' | 'chart-heatmap' | 'chart-sparkline'
  | 'kanban' | 'carousel' | 'rich-text' | 'separator' | 'label'
  | 'form'
  | 'generic';

// ─── Slug → kind mapping ─────────────────────────────────────────────────────
const SLUG_TO_KIND: Record<string, PreviewKind> = {
  button: 'button',
  'copy-button': 'icon-button',
  'feedback-buttons': 'feedback',
  toggle: 'toggle',
  'toggle-group': 'toggle-group',

  input: 'input',
  'search-input': 'search-input',
  'number-input': 'number-input',
  textarea: 'textarea',
  'input-otp': 'otp',
  'tag-input': 'tag-input',
  label: 'label',

  select: 'select',
  combobox: 'combobox',
  'multi-select': 'multi-select',
  'dropdown-menu': 'dropdown-menu',
  'date-picker': 'date-picker',
  'color-picker': 'color-picker',
  'model-selector': 'model-selector',

  switch: 'switch',
  checkbox: 'checkbox',
  'radio-group': 'radio',
  slider: 'slider',
  progress: 'progress',
  'gauge-chart': 'gauge',
  spinner: 'spinner',
  skeleton: 'skeleton',
  'streaming-text': 'streaming',
  'thinking-indicator': 'thinking',
  'token-counter': 'token-counter',

  avatar: 'avatar',
  'avatar-group': 'avatar-group',
  badge: 'badge',
  kbd: 'kbd',

  card: 'card',
  'stat-card': 'stat-card',
  'aspect-ratio': 'aspect',

  tabs: 'tabs',
  accordion: 'accordion',
  collapsible: 'accordion',
  breadcrumb: 'breadcrumb',
  pagination: 'pagination',
  stepper: 'stepper',
  'navigation-menu': 'navigation',
  menubar: 'menubar',

  dialog: 'dialog',
  'alert-dialog': 'dialog',
  sheet: 'sheet',
  drawer: 'drawer',
  'bottom-sheet': 'bottom-sheet',
  popover: 'popover',
  tooltip: 'tooltip',
  'hover-card': 'hover-card',
  'context-menu': 'context-menu',
  command: 'command',

  alert: 'alert',
  toast: 'toast',
  notification: 'notification',

  calendar: 'calendar',
  table: 'table',
  'data-table': 'data-table',
  'tree-view': 'tree',
  'sortable-list': 'sortable',
  'transfer-list': 'transfer',
  'scroll-area': 'scroll-area',

  sidebar: 'sidebar',
  'responsive-sidebar': 'sidebar',
  'split-view': 'split',
  resizable: 'resizable',

  image: 'image',
  'file-upload': 'file-upload',
  'empty-state': 'empty',
  separator: 'separator',

  chat: 'chat',
  'message-bubble': 'message',
  'prompt-input': 'prompt-input',
  'suggestion-chips': 'suggestion',

  'code-block': 'code',
  'rich-text-editor': 'rich-text',
  form: 'form',
  'form-builder': 'form',

  // Charts
  chart: 'chart-line',
  'area-chart': 'chart-area',
  'bar-chart': 'chart-bar',
  'line-chart': 'chart-line',
  'pie-chart': 'chart-pie',
  'radar-chart': 'chart-radar',
  'scatter-chart': 'chart-scatter',
  'candlestick-chart': 'chart-candlestick',
  'funnel-chart': 'chart-funnel',
  treemap: 'chart-treemap',
  heatmap: 'chart-heatmap',
  sparkline: 'chart-sparkline',

  'kanban-board': 'kanban',
  carousel: 'carousel',
  'drag-and-drop': 'sortable',
};

// ─── Shared visual primitives ────────────────────────────────────────────────
const Bar = ({ w, h = 6, opacity = 1, color = 'bg-foreground' }: { w: string | number; h?: number; opacity?: number; color?: string }) => (
  <div className={`rounded-sm ${color}`} style={{ width: w, height: h, opacity: opacity * 0.18 }} />
);
const Pill = ({ label, primary = false }: { label?: string; primary?: boolean }) => (
  <div className={`h-5 px-2 rounded-md text-[9px] font-semibold flex items-center ${primary ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground/70'}`}>
    {label || ''}
  </div>
);
const Dot = ({ color = 'bg-primary', size = 6 }: { color?: string; size?: number }) => (
  <div className={`rounded-full ${color}`} style={{ width: size, height: size }} />
);
const Frame = ({ children, pad = true, className = '' }: { children: React.ReactNode; pad?: boolean; className?: string }) => (
  <div className={`relative w-full h-full ${pad ? 'p-4' : ''} flex items-center justify-center ${className}`}>
    {children}
  </div>
);

// ─── The preview renderer ────────────────────────────────────────────────────
function Render({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    // ── Buttons ─────────────────────────────────────────────────────────
    case 'button':
      return (
        <Frame>
          <div className='flex gap-2'>
            <div className='h-7 px-3 rounded-md bg-foreground text-background text-[11px] font-semibold flex items-center shadow-sm'>Button</div>
            <div className='h-7 px-3 rounded-md border border-border bg-card text-[11px] font-medium text-foreground/80 flex items-center'>Outline</div>
          </div>
        </Frame>
      );
    case 'icon-button':
      return (
        <Frame>
          <div className='flex gap-2'>
            <button className='w-8 h-8 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground'>
              <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7'><rect x='9' y='9' width='13' height='13' rx='2' /><path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' /></svg>
            </button>
            <button className='w-8 h-8 rounded-md border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-500'>
              <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'><path d='M5 13l4 4L19 7' /></svg>
            </button>
          </div>
        </Frame>
      );
    case 'feedback':
      return (
        <Frame>
          <div className='flex gap-1.5'>
            {['😞', '😐', '🙂', '😄'].map((e, i) => (
              <button key={i} className={`w-8 h-8 rounded-full border ${i === 2 ? 'border-primary bg-primary/10' : 'border-border bg-card'} flex items-center justify-center text-base`}>{e}</button>
            ))}
          </div>
        </Frame>
      );

    // ── Inputs ──────────────────────────────────────────────────────────
    case 'input':
      return (
        <Frame>
          <div className='w-full max-w-[160px] h-8 rounded-md border border-border bg-card px-2.5 flex items-center'>
            <span className='text-[11px] text-muted-foreground/50'>Type something</span>
            <span className='ml-1 w-px h-3 bg-foreground/40 animate-pulse' />
          </div>
        </Frame>
      );
    case 'search-input':
      return (
        <Frame>
          <div className='w-full max-w-[160px] h-8 rounded-md border border-border bg-card px-2.5 flex items-center gap-1.5'>
            <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-muted-foreground/50'><circle cx='11' cy='11' r='8' /><path d='m21 21-4.3-4.3' /></svg>
            <span className='text-[11px] text-muted-foreground/50'>Search…</span>
          </div>
        </Frame>
      );
    case 'number-input':
      return (
        <Frame>
          <div className='w-full max-w-[120px] h-8 rounded-md border border-border bg-card flex items-center'>
            <button className='w-7 h-full border-r border-border text-muted-foreground text-sm'>−</button>
            <span className='flex-1 text-center text-[11px] font-mono'>42</span>
            <button className='w-7 h-full border-l border-border text-muted-foreground text-sm'>+</button>
          </div>
        </Frame>
      );
    case 'textarea':
      return (
        <Frame>
          <div className='w-full max-w-[170px] h-[68px] rounded-md border border-border bg-card p-2 flex flex-col gap-1.5'>
            <Bar w='80%' h={4} opacity={0.6} />
            <Bar w='95%' h={4} opacity={0.4} />
            <Bar w='60%' h={4} opacity={0.4} />
          </div>
        </Frame>
      );
    case 'otp':
      return (
        <Frame>
          <div className='flex gap-1.5'>
            {[2, 0, 4, 7].map((d, i) => (
              <div key={i} className={`w-7 h-9 rounded-md border ${i === 2 ? 'border-primary ring-2 ring-primary/20' : 'border-border'} bg-card flex items-center justify-center text-sm font-mono font-bold`}>
                {d}
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'tag-input':
      return (
        <Frame>
          <div className='w-full max-w-[170px] min-h-8 rounded-md border border-border bg-card p-1 flex items-center gap-1 flex-wrap'>
            <span className='h-5 px-1.5 rounded bg-primary/10 text-[9px] text-primary font-medium flex items-center gap-1'>react <span>×</span></span>
            <span className='h-5 px-1.5 rounded bg-primary/10 text-[9px] text-primary font-medium flex items-center gap-1'>vue <span>×</span></span>
            <span className='text-[10px] text-muted-foreground/40'>+ tag…</span>
          </div>
        </Frame>
      );
    case 'label':
      return (
        <Frame>
          <div className='flex flex-col gap-1.5 w-full max-w-[160px]'>
            <span className='text-[10px] font-semibold text-foreground/80'>Email address</span>
            <div className='h-7 rounded-md border border-border bg-card' />
          </div>
        </Frame>
      );

    // ── Select / Dropdown ──────────────────────────────────────────────
    case 'select':
    case 'model-selector':
      return (
        <Frame>
          <div className='w-full max-w-[160px] h-8 rounded-md border border-border bg-card px-2.5 flex items-center justify-between'>
            <span className='text-[11px] text-foreground/80 font-medium'>Choose option</span>
            <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-muted-foreground/60'><path d='m6 9 6 6 6-6' /></svg>
          </div>
        </Frame>
      );
    case 'combobox':
      return (
        <Frame>
          <div className='w-full max-w-[160px]'>
            <div className='h-8 rounded-t-md border border-border bg-card px-2.5 flex items-center justify-between'>
              <span className='text-[11px] text-foreground/80'>Search…</span>
              <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-muted-foreground/60'><path d='m6 9 6 6 6-6' /></svg>
            </div>
            <div className='border border-t-0 border-border rounded-b-md bg-card divide-y divide-border'>
              <div className='px-2.5 py-1 text-[10px] bg-primary/5 text-primary font-medium'>React</div>
              <div className='px-2.5 py-1 text-[10px] text-muted-foreground'>Vue</div>
            </div>
          </div>
        </Frame>
      );
    case 'multi-select':
      return (
        <Frame>
          <div className='w-full max-w-[170px] min-h-8 rounded-md border border-border bg-card px-1.5 py-1 flex items-center gap-1 flex-wrap'>
            <Pill label='React' />
            <Pill label='Vue' />
            <Pill label='+2' />
          </div>
        </Frame>
      );
    case 'dropdown-menu':
    case 'context-menu':
      return (
        <Frame>
          <div className='rounded-lg border border-border bg-card shadow-md py-1 w-40'>
            <div className='px-2.5 py-1.5 text-[11px] font-medium hover:bg-accent flex items-center justify-between'>
              <span>Edit</span><kbd className='text-[9px] text-muted-foreground'>⌘E</kbd>
            </div>
            <div className='px-2.5 py-1.5 text-[11px] font-medium hover:bg-accent flex items-center justify-between'>
              <span>Duplicate</span><kbd className='text-[9px] text-muted-foreground'>⌘D</kbd>
            </div>
            <div className='border-t border-border my-1' />
            <div className='px-2.5 py-1.5 text-[11px] font-medium text-destructive hover:bg-destructive/5'>Delete</div>
          </div>
        </Frame>
      );
    case 'date-picker':
      return (
        <Frame>
          <div className='w-full max-w-[160px] h-8 rounded-md border border-border bg-card px-2.5 flex items-center gap-2'>
            <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' className='text-muted-foreground'><rect x='3' y='4' width='18' height='18' rx='2' /><path d='M16 2v4M8 2v4M3 10h18' /></svg>
            <span className='text-[11px] font-medium'>Mar 15, 2026</span>
          </div>
        </Frame>
      );
    case 'color-picker':
      return (
        <Frame>
          <div className='flex gap-1.5'>
            {['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#A8E6CF'].map((c, i) => (
              <div key={i} className={`w-6 h-6 rounded-full ring-2 ${i === 1 ? 'ring-foreground ring-offset-2' : 'ring-transparent'}`} style={{ background: c }} />
            ))}
          </div>
        </Frame>
      );

    // ── Toggles ─────────────────────────────────────────────────────────
    case 'switch':
      return (
        <Frame>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-5 rounded-full bg-muted flex items-center px-0.5'>
              <div className='w-4 h-4 rounded-full bg-card shadow-sm' />
            </div>
            <div className='w-9 h-5 rounded-full bg-primary flex items-center justify-end px-0.5'>
              <div className='w-4 h-4 rounded-full bg-primary-foreground shadow-sm' />
            </div>
          </div>
        </Frame>
      );
    case 'checkbox':
      return (
        <Frame>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 rounded bg-primary flex items-center justify-center'>
                <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' className='text-primary-foreground'><path d='M5 13l4 4L19 7' /></svg>
              </div>
              <span className='text-[11px] font-medium'>Accept terms</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 rounded border-2 border-border' />
              <span className='text-[11px] text-muted-foreground'>Email me updates</span>
            </div>
          </div>
        </Frame>
      );
    case 'radio':
      return (
        <Frame>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center'>
                <div className='w-2 h-2 rounded-full bg-primary' />
              </div>
              <span className='text-[11px] font-medium'>Standard</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 rounded-full border-2 border-border' />
              <span className='text-[11px] text-muted-foreground'>Express</span>
            </div>
          </div>
        </Frame>
      );
    case 'toggle':
      return (
        <Frame>
          <div className='flex gap-1'>
            {['B', 'I', 'U'].map((c, i) => (
              <button key={c} className={`w-8 h-8 rounded-md ${i === 0 ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent/50'} flex items-center justify-center text-xs font-bold`}>{c}</button>
            ))}
          </div>
        </Frame>
      );
    case 'toggle-group':
      return (
        <Frame>
          <div className='flex rounded-lg border border-border bg-card p-0.5 gap-0.5'>
            {['Daily', 'Weekly', 'Monthly'].map((l, i) => (
              <div key={l} className={`px-3 h-6 rounded-md text-[10px] font-medium flex items-center ${i === 1 ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'}`}>{l}</div>
            ))}
          </div>
        </Frame>
      );

    // ── Slider / Progress ───────────────────────────────────────────────
    case 'slider':
      return (
        <Frame>
          <div className='w-full max-w-[160px]'>
            <div className='h-1.5 rounded-full bg-muted relative'>
              <div className='absolute left-0 top-0 h-full w-[60%] rounded-full bg-primary' />
              <div className='absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-card border-2 border-primary shadow-sm' />
            </div>
            <div className='flex justify-between mt-2 text-[9px] font-mono text-muted-foreground/60'>
              <span>0</span><span>60</span><span>100</span>
            </div>
          </div>
        </Frame>
      );
    case 'progress':
      return (
        <Frame>
          <div className='w-full max-w-[160px] flex flex-col gap-1'>
            <div className='flex justify-between text-[10px] font-medium'>
              <span className='text-muted-foreground'>Uploading</span>
              <span className='text-foreground tabular-nums'>72%</span>
            </div>
            <div className='h-1.5 rounded-full bg-muted overflow-hidden'>
              <div className='h-full w-[72%] rounded-full bg-gradient-to-r from-primary to-primary/70' />
            </div>
          </div>
        </Frame>
      );
    case 'gauge':
      return (
        <Frame>
          <svg width='100' height='60' viewBox='0 0 100 60'>
            <path d='M10 50 A40 40 0 0 1 90 50' fill='none' stroke='hsl(var(--muted))' strokeWidth='8' strokeLinecap='round' />
            <path d='M10 50 A40 40 0 0 1 70 18' fill='none' stroke='hsl(var(--primary))' strokeWidth='8' strokeLinecap='round' />
            <text x='50' y='48' textAnchor='middle' fontSize='14' fontWeight='700' fill='hsl(var(--foreground))'>75</text>
          </svg>
        </Frame>
      );

    // ── Spinners / loaders ──────────────────────────────────────────────
    case 'spinner':
      return (
        <Frame>
          <svg width='32' height='32' viewBox='0 0 24 24' fill='none' className='animate-spin text-primary'>
            <circle cx='12' cy='12' r='10' stroke='currentColor' strokeOpacity='0.2' strokeWidth='3' />
            <path d='M22 12a10 10 0 0 0-10-10' stroke='currentColor' strokeWidth='3' strokeLinecap='round' />
          </svg>
        </Frame>
      );
    case 'skeleton':
      return (
        <Frame>
          <div className='w-full max-w-[170px] flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-muted animate-pulse' />
              <div className='flex-1 flex flex-col gap-1.5'>
                <div className='h-2 rounded bg-muted animate-pulse' />
                <div className='h-2 w-2/3 rounded bg-muted animate-pulse' />
              </div>
            </div>
            <div className='h-12 rounded-md bg-muted animate-pulse' />
          </div>
        </Frame>
      );
    case 'streaming':
      return (
        <Frame>
          <div className='flex flex-col gap-1.5 w-full max-w-[170px]'>
            <div className='flex items-center gap-1'>
              <div className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
              <div className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' style={{ animationDelay: '0.15s' }} />
              <div className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' style={{ animationDelay: '0.3s' }} />
              <span className='text-[10px] text-muted-foreground ml-1 font-mono'>Generating</span>
            </div>
            <Bar w='100%' h={4} opacity={0.5} />
            <Bar w='90%' h={4} opacity={0.5} />
            <Bar w='40%' h={4} opacity={0.5} />
          </div>
        </Frame>
      );
    case 'thinking':
      return (
        <Frame>
          <div className='flex gap-1.5'>
            {[0, 0.2, 0.4].map((d, i) => (
              <div key={i} className='w-2.5 h-2.5 rounded-full bg-primary animate-bounce' style={{ animationDelay: `${d}s` }} />
            ))}
          </div>
        </Frame>
      );
    case 'token-counter':
      return (
        <Frame>
          <div className='w-full max-w-[170px] flex flex-col gap-1.5'>
            <div className='flex justify-between text-[10px]'>
              <span className='text-muted-foreground font-medium'>Tokens</span>
              <span className='font-mono text-foreground'>1,847 <span className='text-muted-foreground/50'>/ 4,096</span></span>
            </div>
            <div className='h-1.5 rounded-full bg-muted overflow-hidden'>
              <div className='h-full w-[45%] rounded-full bg-emerald-500' />
            </div>
          </div>
        </Frame>
      );

    // ── Avatar / Badge ──────────────────────────────────────────────────
    case 'avatar':
      return (
        <Frame>
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-base shadow-sm'>SA</div>
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm shadow-sm'>MC</div>
            <div className='w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-sm'>JK</div>
          </div>
        </Frame>
      );
    case 'avatar-group':
      return (
        <Frame>
          <div className='flex -space-x-2'>
            {['SA', 'MC', 'JK', 'PR'].map((init, i) => (
              <div key={i} className={`w-9 h-9 rounded-full ring-2 ring-card flex items-center justify-center text-white font-bold text-[11px] shadow-sm`}
                style={{ background: ['linear-gradient(135deg,#7C3AED,#EC4899)', 'linear-gradient(135deg,#F59E0B,#EF4444)', 'linear-gradient(135deg,#10B981,#06B6D4)', 'linear-gradient(135deg,#3B82F6,#6366F1)'][i] }}>
                {init}
              </div>
            ))}
            <div className='w-9 h-9 rounded-full ring-2 ring-card bg-muted flex items-center justify-center text-foreground/70 font-medium text-[10px]'>+12</div>
          </div>
        </Frame>
      );
    case 'badge':
      return (
        <Frame>
          <div className='flex flex-wrap gap-1.5 items-center justify-center'>
            <span className='px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold'>Active</span>
            <span className='px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-semibold'>Pending</span>
            <span className='px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold'>v2.1</span>
            <span className='px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-semibold'>3</span>
          </div>
        </Frame>
      );
    case 'kbd':
      return (
        <Frame>
          <div className='flex items-center gap-1.5'>
            <kbd className='px-2 py-1 rounded-md border border-border bg-card text-[11px] font-mono font-semibold shadow-sm'>⌘</kbd>
            <span className='text-muted-foreground text-xs'>+</span>
            <kbd className='px-2 py-1 rounded-md border border-border bg-card text-[11px] font-mono font-semibold shadow-sm'>K</kbd>
          </div>
        </Frame>
      );

    // ── Card-like containers ────────────────────────────────────────────
    case 'card':
      return (
        <Frame>
          <div className='w-full max-w-[170px] rounded-lg border border-border bg-card p-3 flex flex-col gap-1.5'>
            <Bar w='60%' h={6} opacity={1} />
            <Bar w='100%' h={4} opacity={0.6} />
            <Bar w='80%' h={4} opacity={0.6} />
            <div className='flex justify-end mt-1'>
              <div className='h-5 px-2 rounded text-[9px] font-semibold bg-primary text-primary-foreground flex items-center'>Action</div>
            </div>
          </div>
        </Frame>
      );
    case 'stat-card':
      return (
        <Frame>
          <div className='w-full max-w-[170px] rounded-lg border border-border bg-card p-3 flex flex-col gap-1'>
            <span className='text-[9px] text-muted-foreground uppercase tracking-wider font-semibold'>Revenue</span>
            <div className='text-xl font-bold tabular-nums'>$48.2K</div>
            <div className='flex items-center gap-1 text-[10px] text-emerald-500 font-medium'>
              <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'><path d='m6 15 6-6 6 6' /></svg>
              <span>+12.4% vs. last month</span>
            </div>
          </div>
        </Frame>
      );
    case 'aspect':
      return (
        <Frame>
          <div className='w-32 rounded-md border border-border bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-[10px] font-mono text-muted-foreground' style={{ aspectRatio: '16/9' }}>
            16 : 9
          </div>
        </Frame>
      );

    // ── Navigation ──────────────────────────────────────────────────────
    case 'tabs':
      return (
        <Frame>
          <div className='w-full max-w-[180px]'>
            <div className='flex border-b border-border'>
              {['Overview', 'Activity', 'Settings'].map((t, i) => (
                <div key={t} className={`px-3 py-1.5 text-[10px] font-medium ${i === 0 ? 'text-foreground border-b-2 border-primary -mb-px' : 'text-muted-foreground'}`}>{t}</div>
              ))}
            </div>
            <div className='py-2 space-y-1'>
              <Bar w='100%' h={3} opacity={0.5} />
              <Bar w='80%' h={3} opacity={0.5} />
            </div>
          </div>
        </Frame>
      );
    case 'accordion':
      return (
        <Frame>
          <div className='w-full max-w-[180px] divide-y divide-border border border-border rounded-md bg-card'>
            <div className='px-3 py-1.5 flex items-center justify-between text-[11px] font-medium'>
              <span>Section 1</span>
              <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-muted-foreground'><path d='m6 9 6 6 6-6' /></svg>
            </div>
            <div className='px-3 py-2 bg-muted/20'>
              <Bar w='100%' h={3} opacity={0.5} />
              <div className='h-1' />
              <Bar w='70%' h={3} opacity={0.5} />
            </div>
            <div className='px-3 py-1.5 flex items-center justify-between text-[11px] text-muted-foreground'>
              <span>Section 2</span>
              <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='m6 9 6 6 6-6' /></svg>
            </div>
          </div>
        </Frame>
      );
    case 'breadcrumb':
      return (
        <Frame>
          <div className='flex items-center gap-1 text-[11px] font-medium'>
            <span className='text-muted-foreground'>Home</span>
            <span className='text-muted-foreground/40'>/</span>
            <span className='text-muted-foreground'>Settings</span>
            <span className='text-muted-foreground/40'>/</span>
            <span className='text-foreground'>Profile</span>
          </div>
        </Frame>
      );
    case 'pagination':
      return (
        <Frame>
          <div className='flex items-center gap-1'>
            <button className='w-7 h-7 rounded-md border border-border bg-card text-muted-foreground'>‹</button>
            <button className='w-7 h-7 rounded-md text-[11px] font-medium text-muted-foreground'>1</button>
            <button className='w-7 h-7 rounded-md bg-primary text-primary-foreground text-[11px] font-bold'>2</button>
            <button className='w-7 h-7 rounded-md text-[11px] font-medium text-muted-foreground'>3</button>
            <button className='w-7 h-7 rounded-md border border-border bg-card text-muted-foreground'>›</button>
          </div>
        </Frame>
      );
    case 'stepper':
      return (
        <Frame>
          <div className='flex items-center w-full max-w-[180px]'>
            {[1, 2, 3].map((n, i) => (
              <React.Fragment key={n}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${i < 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {i < 1 ? '✓' : n}
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 ${i < 1 ? 'bg-primary' : 'bg-muted'}`} />}
              </React.Fragment>
            ))}
          </div>
        </Frame>
      );
    case 'navigation':
    case 'menubar':
      return (
        <Frame>
          <div className='flex items-center gap-1 rounded-lg border border-border bg-card p-1'>
            {['File', 'Edit', 'View', 'Help'].map((t, i) => (
              <div key={t} className={`px-2.5 h-6 rounded text-[10px] font-medium ${i === 1 ? 'bg-accent text-foreground' : 'text-muted-foreground'} flex items-center`}>{t}</div>
            ))}
          </div>
        </Frame>
      );

    // ── Overlays ────────────────────────────────────────────────────────
    case 'dialog':
      return (
        <Frame pad={false}>
          <div className='absolute inset-0 bg-foreground/5 backdrop-blur-sm' />
          <div className='relative w-[80%] max-w-[180px] rounded-lg border border-border bg-card p-3 shadow-xl'>
            <div className='flex items-start justify-between mb-1.5'>
              <span className='text-[11px] font-bold'>Confirm action</span>
              <span className='text-muted-foreground text-xs'>×</span>
            </div>
            <Bar w='100%' h={3} opacity={0.5} />
            <div className='h-1' />
            <Bar w='80%' h={3} opacity={0.5} />
            <div className='flex justify-end gap-1 mt-2'>
              <Pill label='Cancel' />
              <Pill label='OK' primary />
            </div>
          </div>
        </Frame>
      );
    case 'sheet':
      return (
        <Frame pad={false}>
          <div className='absolute inset-0 bg-foreground/5' />
          <div className='absolute right-2 top-2 bottom-2 w-[40%] rounded-md border border-border bg-card p-2 shadow-lg flex flex-col gap-1.5'>
            <Bar w='60%' h={4} opacity={0.7} />
            <Bar w='100%' h={3} opacity={0.5} />
            <Bar w='80%' h={3} opacity={0.5} />
          </div>
        </Frame>
      );
    case 'drawer':
    case 'bottom-sheet':
      return (
        <Frame pad={false}>
          <div className='absolute inset-0 bg-foreground/5' />
          <div className='absolute left-2 right-2 bottom-2 h-[55%] rounded-t-xl border border-border bg-card p-3 shadow-lg'>
            <div className='w-8 h-1 rounded-full bg-muted-foreground/30 mx-auto mb-2' />
            <Bar w='60%' h={4} opacity={0.7} />
            <div className='h-1' />
            <Bar w='100%' h={3} opacity={0.5} />
            <div className='h-1' />
            <Bar w='80%' h={3} opacity={0.5} />
          </div>
        </Frame>
      );
    case 'popover':
    case 'hover-card':
      return (
        <Frame>
          <div className='relative'>
            <div className='w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold'>i</div>
            <div className='absolute left-full ml-2 top-0 w-32 rounded-md border border-border bg-card p-2 shadow-md'>
              <div className='absolute -left-1 top-3 w-2 h-2 bg-card border-l border-t border-border rotate-45' />
              <Bar w='100%' h={3} opacity={0.5} />
              <div className='h-1' />
              <Bar w='80%' h={3} opacity={0.5} />
            </div>
          </div>
        </Frame>
      );
    case 'tooltip':
      return (
        <Frame>
          <div className='relative inline-block'>
            <div className='absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-foreground text-background text-[10px] font-medium whitespace-nowrap'>
              Quick tip
              <div className='absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45 -mt-1' />
            </div>
            <button className='h-7 px-3 rounded-md border border-border bg-card text-[11px] font-medium'>Hover me</button>
          </div>
        </Frame>
      );
    case 'command':
      return (
        <Frame pad={false}>
          <div className='absolute inset-x-3 top-3 rounded-md border border-border bg-card shadow-md'>
            <div className='px-2.5 py-1.5 border-b border-border flex items-center gap-1.5'>
              <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-muted-foreground'><circle cx='11' cy='11' r='8' /><path d='m21 21-4.3-4.3' /></svg>
              <span className='text-[10px] text-muted-foreground'>Type a command…</span>
              <kbd className='ml-auto text-[8px] font-mono text-muted-foreground/60'>⌘K</kbd>
            </div>
            <div className='py-1'>
              <div className='px-2.5 py-1 text-[10px] bg-primary/10 text-primary font-medium'>→ New file</div>
              <div className='px-2.5 py-1 text-[10px] text-muted-foreground'>Open project…</div>
            </div>
          </div>
        </Frame>
      );

    // ── Notifications ───────────────────────────────────────────────────
    case 'alert':
      return (
        <Frame>
          <div className='w-full max-w-[170px] rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2 flex gap-2'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-emerald-500 shrink-0 mt-0.5'><path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' /><path d='m9 11 3 3L22 4' /></svg>
            <div className='flex-1'>
              <div className='text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mb-0.5'>Successfully saved</div>
              <div className='text-[9px] text-emerald-600/80 dark:text-emerald-400/70'>Your changes are now live.</div>
            </div>
          </div>
        </Frame>
      );
    case 'toast':
      return (
        <Frame pad={false}>
          <div className='absolute right-3 bottom-3 w-44 rounded-md border border-border bg-card p-2 shadow-md flex items-start gap-2'>
            <div className='w-1 self-stretch rounded-full bg-primary' />
            <div className='flex-1'>
              <div className='text-[10px] font-bold mb-0.5'>New message</div>
              <div className='text-[9px] text-muted-foreground'>Sofia sent you a comment</div>
            </div>
            <span className='text-muted-foreground text-xs'>×</span>
          </div>
        </Frame>
      );
    case 'notification':
      return (
        <Frame>
          <div className='w-full max-w-[180px] flex flex-col gap-1.5'>
            {[
              { dot: 'bg-primary', label: 'Marcus replied to your comment', time: '2m' },
              { dot: 'bg-emerald-500', label: 'Deployment succeeded', time: '15m' },
            ].map((n, i) => (
              <div key={i} className='flex items-start gap-2 p-1.5 rounded-md hover:bg-accent/30'>
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${n.dot}`} />
                <div className='flex-1'>
                  <div className='text-[10px] font-medium'>{n.label}</div>
                </div>
                <span className='text-[9px] text-muted-foreground/60'>{n.time}</span>
              </div>
            ))}
          </div>
        </Frame>
      );

    // ── Calendar / table ────────────────────────────────────────────────
    case 'calendar':
      return (
        <Frame>
          <div className='w-full max-w-[170px] rounded-md border border-border bg-card p-2'>
            <div className='flex items-center justify-between text-[10px] font-semibold mb-1.5'>
              <span>March 2026</span>
              <div className='flex gap-0.5 text-muted-foreground'>
                <span>‹</span><span>›</span>
              </div>
            </div>
            <div className='grid grid-cols-7 gap-0.5 text-center'>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className='text-[8px] text-muted-foreground/60 font-medium py-0.5'>{d}</div>
              ))}
              {Array.from({ length: 21 }).map((_, i) => {
                const day = i + 1;
                const active = day === 14;
                const today = day === 17;
                return (
                  <div key={i} className={`text-[9px] py-0.5 rounded ${active ? 'bg-primary text-primary-foreground font-bold' : today ? 'ring-1 ring-primary text-foreground' : 'text-foreground/70'}`}>
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </Frame>
      );
    case 'table':
    case 'data-table':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border border-border bg-card overflow-hidden'>
            <div className='flex items-center px-2 py-1.5 border-b border-border bg-muted/30 gap-2'>
              {['Name', 'Status', 'Date'].map((h) => (
                <div key={h} className='flex-1 text-[9px] font-bold text-muted-foreground uppercase tracking-wide'>{h}</div>
              ))}
            </div>
            {[
              { n: 'Alice', s: 'Active', sc: 'bg-emerald-500/15 text-emerald-600' },
              { n: 'Bob', s: 'Pending', sc: 'bg-amber-500/15 text-amber-600' },
              { n: 'Carol', s: 'Active', sc: 'bg-emerald-500/15 text-emerald-600' },
            ].map((r, i) => (
              <div key={i} className='flex items-center px-2 py-1 border-b border-border/50 last:border-0 gap-2'>
                <div className='flex-1 text-[10px] font-medium'>{r.n}</div>
                <div className='flex-1'>
                  <span className={`text-[8px] font-semibold px-1.5 py-px rounded-full ${r.sc}`}>{r.s}</span>
                </div>
                <div className='flex-1 text-[9px] text-muted-foreground font-mono'>Mar 1{i + 5}</div>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'tree':
      return (
        <Frame>
          <div className='w-full max-w-[170px] flex flex-col gap-0.5 text-[10px] font-mono'>
            <div className='flex items-center gap-1'>▾ <span className='font-medium'>src</span></div>
            <div className='ml-3 flex items-center gap-1 text-muted-foreground'>▾ components</div>
            <div className='ml-6 flex items-center gap-1 text-muted-foreground/70'>• Button.tsx</div>
            <div className='ml-6 flex items-center gap-1 text-primary font-semibold'>• Card.tsx</div>
            <div className='ml-3 flex items-center gap-1 text-muted-foreground'>▸ pages</div>
          </div>
        </Frame>
      );
    case 'sortable':
      return (
        <Frame>
          <div className='w-full max-w-[170px] flex flex-col gap-1'>
            {['First item', 'Second item', 'Third item'].map((label, i) => (
              <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-card ${i === 1 ? 'shadow-md ring-1 ring-primary/20' : ''}`}>
                <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-muted-foreground/40'><line x1='3' y1='6' x2='21' y2='6' /><line x1='3' y1='12' x2='21' y2='12' /><line x1='3' y1='18' x2='21' y2='18' /></svg>
                <span className='text-[10px] font-medium'>{label}</span>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'transfer':
      return (
        <Frame>
          <div className='flex items-center gap-2'>
            <div className='w-16 h-16 rounded-md border border-border bg-card p-1.5 flex flex-col gap-0.5'>
              <Bar w='100%' h={3} opacity={0.5} />
              <Bar w='80%' h={3} opacity={0.5} />
              <Bar w='100%' h={3} opacity={0.5} />
            </div>
            <div className='flex flex-col gap-1 text-muted-foreground text-xs'>›<br />‹</div>
            <div className='w-16 h-16 rounded-md border border-border bg-card p-1.5 flex flex-col gap-0.5'>
              <Bar w='80%' h={3} opacity={0.5} />
              <Bar w='100%' h={3} opacity={0.5} />
            </div>
          </div>
        </Frame>
      );

    // ── Layout ──────────────────────────────────────────────────────────
    case 'sidebar':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border border-border bg-card overflow-hidden flex'>
            <div className='w-[35%] bg-muted/20 border-r border-border p-1.5 flex flex-col gap-1'>
              <div className='h-3 rounded-sm bg-primary/30 w-full' />
              <div className='h-3 rounded-sm bg-muted-foreground/15 w-full' />
              <div className='h-3 rounded-sm bg-muted-foreground/15 w-full' />
            </div>
            <div className='flex-1 p-1.5 flex flex-col gap-1'>
              <Bar w='80%' h={4} opacity={0.6} />
              <Bar w='100%' h={3} opacity={0.4} />
              <Bar w='90%' h={3} opacity={0.4} />
            </div>
          </div>
        </Frame>
      );
    case 'split':
    case 'resizable':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border border-border bg-card flex'>
            <div className='flex-1 p-1.5 flex flex-col gap-1'><Bar w='100%' h={4} opacity={0.6} /><Bar w='80%' h={3} opacity={0.4} /></div>
            <div className='w-px bg-border relative'>
              <div className='absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-6 rounded-full bg-primary/40' />
            </div>
            <div className='flex-1 p-1.5 flex flex-col gap-1'><Bar w='100%' h={4} opacity={0.6} /><Bar w='90%' h={3} opacity={0.4} /></div>
          </div>
        </Frame>
      );
    case 'scroll-area':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border border-border bg-card overflow-hidden flex flex-col gap-1 p-2 pr-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <Bar key={i} w='100%' h={4} opacity={0.4 + (i % 2) * 0.2} />
            ))}
            <div className='absolute right-1 top-2 bottom-2 w-1 rounded-full bg-muted'>
              <div className='absolute top-1 w-full h-4 rounded-full bg-foreground/30' />
            </div>
          </div>
        </Frame>
      );

    // ── Media / empty ───────────────────────────────────────────────────
    case 'image':
      return (
        <Frame>
          <div className='w-24 h-16 rounded-md bg-gradient-to-br from-primary/15 via-primary/5 to-transparent flex items-center justify-center'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.4' className='text-muted-foreground/50'><rect x='3' y='3' width='18' height='18' rx='2' /><circle cx='9' cy='9' r='2' /><path d='m21 15-5-5L5 21' /></svg>
          </div>
        </Frame>
      );
    case 'image-upload':
    case 'file-upload':
      return (
        <Frame>
          <div className='w-full max-w-[170px] h-16 rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 bg-muted/10'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' className='text-muted-foreground'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' /><path d='M17 8 12 3 7 8' /><path d='M12 3v12' /></svg>
            <span className='text-[10px] font-medium text-muted-foreground'>Drop file here</span>
          </div>
        </Frame>
      );
    case 'empty':
      return (
        <Frame>
          <div className='flex flex-col items-center gap-1'>
            <div className='w-9 h-9 rounded-full bg-muted/40 flex items-center justify-center'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' className='text-muted-foreground'><rect x='3' y='3' width='18' height='18' rx='2' /></svg>
            </div>
            <span className='text-[10px] font-medium text-muted-foreground'>Nothing here yet</span>
          </div>
        </Frame>
      );

    // ── Chat / AI ───────────────────────────────────────────────────────
    case 'chat':
    case 'message':
      return (
        <Frame>
          <div className='w-full max-w-[180px] flex flex-col gap-1.5'>
            <div className='self-start max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-2.5 py-1.5'>
              <Bar w={60} h={3} opacity={0.7} />
            </div>
            <div className='self-end max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-2.5 py-1.5'>
              <div className='h-1 w-12 rounded bg-primary-foreground/70' />
            </div>
            <div className='self-start max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-2.5 py-1.5 flex items-center gap-1'>
              <Dot color='bg-foreground/30' size={3} />
              <Dot color='bg-foreground/30' size={3} />
              <Dot color='bg-foreground/30' size={3} />
            </div>
          </div>
        </Frame>
      );
    case 'prompt-input':
      return (
        <Frame>
          <div className='w-full max-w-[180px] rounded-xl border border-border bg-card p-2'>
            <Bar w='90%' h={3} opacity={0.5} />
            <div className='h-1' />
            <Bar w='60%' h={3} opacity={0.5} />
            <div className='flex items-center gap-1 mt-2'>
              <button className='w-5 h-5 rounded text-muted-foreground border border-border'>📎</button>
              <div className='flex-1' />
              <button className='h-5 px-2 rounded bg-primary text-primary-foreground text-[9px] font-bold'>Send ↑</button>
            </div>
          </div>
        </Frame>
      );
    case 'suggestion':
      return (
        <Frame>
          <div className='flex flex-wrap gap-1.5 justify-center'>
            {['Summarize', 'Translate', 'Explain code', 'Refactor'].map((s) => (
              <span key={s} className='px-2.5 py-1 rounded-full border border-border bg-card text-[10px] font-medium text-foreground/80'>
                ✦ {s}
              </span>
            ))}
          </div>
        </Frame>
      );

    // ── Code ────────────────────────────────────────────────────────────
    case 'code':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md bg-zinc-950 dark:bg-zinc-900 p-2 font-mono text-[9px] flex flex-col gap-0.5 overflow-hidden'>
            <div><span className='text-purple-400'>const</span> <span className='text-blue-300'>app</span> <span className='text-zinc-400'>=</span> <span className='text-emerald-300'>'Adhar'</span><span className='text-zinc-400'>;</span></div>
            <div><span className='text-purple-400'>function</span> <span className='text-yellow-300'>render</span><span className='text-zinc-400'>() {`{`}</span></div>
            <div className='pl-3'><span className='text-purple-400'>return</span> <span className='text-zinc-400'>&lt;</span><span className='text-rose-300'>App</span> <span className='text-zinc-400'>/&gt;;</span></div>
            <div className='text-zinc-400'>{`}`}</div>
          </div>
        </Frame>
      );
    case 'rich-text':
      return (
        <Frame>
          <div className='w-full max-w-[180px] rounded-md border border-border bg-card overflow-hidden'>
            <div className='flex items-center gap-0.5 px-1.5 py-1 border-b border-border bg-muted/20'>
              {['B', 'I', 'U'].map((b) => (
                <div key={b} className='w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center text-muted-foreground'>{b}</div>
              ))}
              <div className='w-px h-3 bg-border mx-0.5' />
              <div className='w-5 h-5 rounded text-[9px] flex items-center justify-center text-muted-foreground'>•</div>
            </div>
            <div className='p-2 flex flex-col gap-1'>
              <Bar w='100%' h={3} opacity={0.5} />
              <Bar w='80%' h={3} opacity={0.5} />
            </div>
          </div>
        </Frame>
      );

    // ── Charts ──────────────────────────────────────────────────────────
    case 'chart-area':
      return (
        <Frame>
          <svg width='160' height='70' viewBox='0 0 160 70'>
            <defs><linearGradient id='area-g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stopColor='hsl(var(--primary))' stopOpacity='0.4' /><stop offset='1' stopColor='hsl(var(--primary))' stopOpacity='0' /></linearGradient></defs>
            <path d='M0 50 Q 30 20 60 35 T 120 25 T 160 30 L 160 70 L 0 70 Z' fill='url(#area-g)' />
            <path d='M0 50 Q 30 20 60 35 T 120 25 T 160 30' fill='none' stroke='hsl(var(--primary))' strokeWidth='1.5' />
          </svg>
        </Frame>
      );
    case 'chart-line':
      return (
        <Frame>
          <svg width='160' height='70' viewBox='0 0 160 70'>
            <polyline points='0,55 25,40 50,48 75,25 100,30 125,18 160,22' fill='none' stroke='hsl(var(--primary))' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' />
            <polyline points='0,60 25,55 50,58 75,45 100,50 125,40 160,38' fill='none' stroke='hsl(var(--primary))' strokeOpacity='0.4' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round' strokeDasharray='3 2' />
            {[[0,55],[25,40],[50,48],[75,25],[100,30],[125,18],[160,22]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r='1.8' fill='hsl(var(--primary))' />
            ))}
          </svg>
        </Frame>
      );
    case 'chart-bar':
      return (
        <Frame>
          <div className='flex items-end gap-1.5 h-16'>
            {[35, 60, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className='w-3 rounded-t-sm bg-gradient-to-t from-primary to-primary/60' style={{ height: `${h}%` }} />
            ))}
          </div>
        </Frame>
      );
    case 'chart-pie':
      return (
        <Frame>
          <svg width='80' height='80' viewBox='0 0 100 100'>
            <circle cx='50' cy='50' r='40' fill='hsl(var(--muted))' />
            <path d='M50 50 L 50 10 A 40 40 0 0 1 88 65 Z' fill='hsl(var(--primary))' />
            <path d='M50 50 L 88 65 A 40 40 0 0 1 30 82 Z' fill='hsl(var(--primary))' fillOpacity='0.6' />
            <circle cx='50' cy='50' r='18' fill='hsl(var(--card))' />
          </svg>
        </Frame>
      );
    case 'chart-radar':
      return (
        <Frame>
          <svg width='90' height='90' viewBox='-50 -50 100 100'>
            {[20, 35, 45].map((r, i) => (
              <polygon key={i} points={Array.from({ length: 5 }).map((_, j) => { const a = (j / 5) * Math.PI * 2 - Math.PI / 2; return `${r * Math.cos(a)},${r * Math.sin(a)}`; }).join(' ')} fill='none' stroke='hsl(var(--border))' strokeWidth='0.6' />
            ))}
            <polygon points='0,-32 28,-10 18,28 -18,28 -28,-10' fill='hsl(var(--primary))' fillOpacity='0.25' stroke='hsl(var(--primary))' strokeWidth='1.2' />
          </svg>
        </Frame>
      );
    case 'chart-scatter':
      return (
        <Frame>
          <svg width='160' height='70' viewBox='0 0 160 70'>
            <line x1='0' y1='65' x2='160' y2='65' stroke='hsl(var(--border))' />
            <line x1='5' y1='0' x2='5' y2='65' stroke='hsl(var(--border))' />
            {[[20,40],[35,50],[55,30],[80,55],[100,20],[125,45],[145,28],[60,15],[90,40]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r='3' fill='hsl(var(--primary))' fillOpacity='0.6' />
            ))}
          </svg>
        </Frame>
      );
    case 'chart-candlestick':
      return (
        <Frame>
          <svg width='160' height='70' viewBox='0 0 160 70'>
            {[
              { x: 15, h: 8, o: 22, c: 38, color: '#10b981' },
              { x: 35, h: 12, o: 45, c: 30, color: '#ef4444' },
              { x: 55, h: 18, o: 32, c: 50, color: '#10b981' },
              { x: 75, h: 5, o: 55, c: 40, color: '#ef4444' },
              { x: 95, h: 8, o: 38, c: 60, color: '#10b981' },
              { x: 115, h: 14, o: 60, c: 45, color: '#ef4444' },
              { x: 135, h: 6, o: 48, c: 62, color: '#10b981' },
            ].map((c, i) => (
              <g key={i}>
                <line x1={c.x} y1={c.h} x2={c.x} y2={c.h + c.o} stroke={c.color} strokeWidth='1' />
                <rect x={c.x - 4} y={Math.min(c.o, c.c)} width='8' height={Math.abs(c.c - c.o)} fill={c.color} />
              </g>
            ))}
          </svg>
        </Frame>
      );
    case 'chart-funnel':
      return (
        <Frame>
          <div className='flex flex-col gap-0.5 items-center'>
            {[100, 75, 55, 35, 18].map((w, i) => (
              <div key={i} className='h-3 rounded-sm bg-primary' style={{ width: `${w}%`, opacity: 1 - i * 0.15 }} />
            ))}
          </div>
        </Frame>
      );
    case 'chart-treemap':
      return (
        <Frame>
          <div className='grid grid-cols-3 gap-0.5 w-full max-w-[150px] h-16'>
            <div className='col-span-2 row-span-2 rounded bg-primary' />
            <div className='rounded bg-primary/70' />
            <div className='rounded bg-primary/50' />
            <div className='rounded bg-primary/40' />
            <div className='rounded bg-primary/60' />
            <div className='rounded bg-primary/30' />
          </div>
        </Frame>
      );
    case 'chart-heatmap':
      return (
        <Frame>
          <div className='grid grid-cols-7 gap-0.5'>
            {Array.from({ length: 28 }).map((_, i) => {
              const v = Math.sin(i * 0.7) * 0.5 + 0.5;
              return <div key={i} className='w-3 h-3 rounded-sm' style={{ background: `hsl(var(--primary) / ${v.toFixed(2)})` }} />;
            })}
          </div>
        </Frame>
      );
    case 'chart-sparkline':
      return (
        <Frame>
          <div className='flex items-baseline gap-3 w-full max-w-[170px]'>
            <div className='text-xl font-bold tabular-nums'>$48K</div>
            <svg width='80' height='30' viewBox='0 0 80 30'>
              <polyline points='0,22 12,18 24,20 36,12 48,15 60,8 80,10' fill='none' stroke='hsl(var(--primary))' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </Frame>
      );

    // ── Specialized ─────────────────────────────────────────────────────
    case 'kanban':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 grid grid-cols-3 gap-1.5'>
            {['Todo', 'Doing', 'Done'].map((c, i) => (
              <div key={c} className='rounded-md bg-muted/30 p-1 flex flex-col gap-1'>
                <div className='text-[8px] font-bold uppercase tracking-wide text-muted-foreground'>{c}</div>
                <div className='rounded-sm bg-card p-1 shadow-sm h-5' />
                {i !== 2 && <div className='rounded-sm bg-card p-1 shadow-sm h-5' />}
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'carousel':
      return (
        <Frame>
          <div className='w-full max-w-[170px] rounded-md bg-gradient-to-br from-primary/15 via-primary/8 to-transparent h-16 flex flex-col items-center justify-center gap-1 relative'>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.4' className='text-muted-foreground'><rect x='3' y='3' width='18' height='18' rx='2' /><circle cx='9' cy='9' r='2' /><path d='m21 15-5-5L5 21' /></svg>
            <div className='absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1'>
              <div className='w-1.5 h-1.5 rounded-full bg-primary' />
              <div className='w-1.5 h-1.5 rounded-full bg-muted-foreground/30' />
              <div className='w-1.5 h-1.5 rounded-full bg-muted-foreground/30' />
            </div>
            <div className='absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-card/80 shadow-sm flex items-center justify-center text-[10px]'>‹</div>
            <div className='absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-card/80 shadow-sm flex items-center justify-center text-[10px]'>›</div>
          </div>
        </Frame>
      );
    case 'separator':
      return (
        <Frame>
          <div className='w-full max-w-[170px] flex flex-col gap-2 items-center'>
            <span className='text-[10px] text-muted-foreground'>Account</span>
            <div className='w-full h-px bg-border' />
            <span className='text-[10px] text-muted-foreground'>Settings</span>
          </div>
        </Frame>
      );
    case 'form':
      return (
        <Frame>
          <div className='w-full max-w-[170px] flex flex-col gap-2'>
            <div className='flex flex-col gap-0.5'>
              <span className='text-[9px] font-semibold text-muted-foreground'>Name</span>
              <div className='h-6 rounded border border-border bg-card' />
            </div>
            <div className='flex flex-col gap-0.5'>
              <span className='text-[9px] font-semibold text-muted-foreground'>Email</span>
              <div className='h-6 rounded border border-border bg-card' />
            </div>
            <div className='h-6 rounded bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center'>Submit</div>
          </div>
        </Frame>
      );

    // ── Generic fallback ────────────────────────────────────────────────
    case 'generic':
    default:
      return (
        <Frame>
          <div className='flex flex-col items-center gap-1.5 text-muted-foreground/40'>
            <svg className='w-7 h-7' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'>
              <rect x='3' y='3' width='18' height='18' rx='3' />
              <path d='M9 9h6M9 13h4' strokeLinecap='round' />
            </svg>
            <span className='text-[9px] font-semibold tracking-wider uppercase'>Component</span>
          </div>
        </Frame>
      );
  }
}

// ─── Public component ────────────────────────────────────────────────────────
export function ComponentPreview({ slug, className = '' }: { slug: string; className?: string }) {
  const kind = SLUG_TO_KIND[slug] || 'generic';
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Render kind={kind} />
    </div>
  );
}
