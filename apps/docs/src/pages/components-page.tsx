import React, { useMemo, useState } from 'react';
import {
  Badge,
  Callout,
  CodeBlock,
  InstallBlock,
  PageHeader,
  PropsTable,
} from '../components/ui.tsx';
import {
  categories,
  type ComponentData,
  components,
  type FrameworkId,
  frameworks,
  getComponentsByCategory,
  getFrameworkCode,
  getFrameworkExplanation,
  getNextComponent,
  getPrevComponent,
} from '../data/components.ts';
import * as Demos from '../components/demo-components.tsx';
import { FrameworkLogo, NavIcon } from '../components/icons.tsx';
import { ComponentPreview } from '../components/component-previews.tsx';

const demoMap: Record<string, React.ComponentType<any>> = {
  button: Demos.DemoButton,
  input: Demos.DemoInput,
  textarea: Demos.DemoTextarea,
  label: Demos.DemoLabel,
  badge: Demos.DemoBadge,
  switch: Demos.DemoSwitch,
  checkbox: Demos.DemoCheckbox,
  progress: Demos.DemoProgress,
  skeleton: Demos.DemoSkeleton,
  spinner: Demos.DemoSpinner,
  avatar: Demos.DemoAvatar,
  separator: Demos.DemoSeparator,
  alert: Demos.DemoAlert,
  card: Demos.DemoCard,
  tabs: Demos.DemoTabs,
  select: Demos.DemoSelect,
  slider: Demos.DemoSlider,
  tooltip: Demos.DemoTooltip,
  dialog: Demos.DemoDialog,
  accordion: Demos.DemoAccordion,
  toast: Demos.DemoToast,
  'dropdown-menu': Demos.DemoDropdownMenu,
  popover: Demos.DemoPopover,
  sheet: Demos.DemoSheet,
  'radio-group': Demos.DemoRadioGroup,
  toggle: Demos.DemoToggle,
  breadcrumb: Demos.DemoBreadcrumb,
  pagination: Demos.DemoPagination,
  table: Demos.DemoTable,
  kbd: Demos.DemoKbd,
  'hover-card': Demos.DemoHoverCard,
  'scroll-area': Demos.DemoScrollArea,
  collapsible: Demos.DemoCollapsible,
  'alert-dialog': Demos.DemoAlertDialog,
  'aspect-ratio': Demos.DemoAspectRatio,
  'bottom-sheet': Demos.DemoBottomSheet,
  calendar: Demos.DemoCalendar,
  carousel: Demos.DemoCarousel,
  chart: Demos.DemoChart,
  chat: Demos.DemoChat,
  'code-block': Demos.DemoCodeBlock,
  'color-picker': Demos.DemoColorPicker,
  combobox: Demos.DemoCombobox,
  command: Demos.DemoCommand,
  'context-menu': Demos.DemoContextMenu,
  'copy-button': Demos.DemoCopyButton,
  'data-table': Demos.DemoDataTable,
  'date-picker': Demos.DemoDatePicker,
  drawer: Demos.DemoDrawer,
  'empty-state': Demos.DemoEmptyState,
  'feedback-buttons': Demos.DemoFeedbackButtons,
  'file-upload': Demos.DemoFileUpload,
  form: Demos.DemoForm,
  'form-builder': Demos.DemoFormBuilder,
  'input-otp': Demos.DemoInputOTP,
  'kanban-board': Demos.DemoKanbanBoard,
  menubar: Demos.DemoMenubar,
  'message-bubble': Demos.DemoMessageBubble,
  'model-selector': Demos.DemoModelSelector,
  'multi-select': Demos.DemoMultiSelect,
  'navigation-menu': Demos.DemoNavigationMenu,
  'prompt-input': Demos.DemoPromptInput,
  resizable: Demos.DemoResizable,
  'responsive-sidebar': Demos.DemoResponsiveSidebar,
  sidebar: Demos.DemoSidebar,
  'split-view': Demos.DemoSplitView,
  'stat-card': Demos.DemoStatCard,
  stepper: Demos.DemoStepper,
  'streaming-text': Demos.DemoStreamingText,
  'suggestion-chips': Demos.DemoSuggestionChips,
  'thinking-indicator': Demos.DemoThinkingIndicator,
  timeline: Demos.DemoTimeline,
  'toggle-group': Demos.DemoToggleGroup,
  'token-counter': Demos.DemoTokenCounter,
  'transfer-list': Demos.DemoTransferList,
  'tree-view': Demos.DemoTreeView,
  'rich-text-editor': Demos.DemoRichTextEditor,
  'sortable-list': Demos.DemoSortableList,
  'tag-input': Demos.DemoTagInput,
  'avatar-group': Demos.DemoAvatarGroup,
  'search-input': Demos.DemoSearchInput,
  'number-input': Demos.DemoNumberInput,
  'area-chart': Demos.DemoAreaChart,
  'bar-chart': Demos.DemoBarChart,
  'line-chart': Demos.DemoLineChart,
  'pie-chart': Demos.DemoPieChart,
  notification: Demos.DemoNotification,
  image: Demos.DemoImage,
  'radar-chart': Demos.DemoRadarChart,
  'scatter-chart': Demos.DemoScatterChart,
  'gauge-chart': Demos.DemoGaugeChart,
  'candlestick-chart': Demos.DemoCandlestickChart,
  heatmap: Demos.DemoHeatmap,
  sparkline: Demos.DemoSparkline,
  treemap: Demos.DemoTreemap,
  'funnel-chart': Demos.DemoFunnelChart,
  'drag-and-drop': Demos.DemoDragAndDrop,
};

const tierConfig: Record<number, { label: string; css: string }> = {
  1: { label: 'Basic', css: 'badge-basic' },
  2: { label: 'Advanced', css: 'badge-advanced' },
  3: { label: 'Enterprise', css: 'badge-enterprise' },
};

function TierBadge({ tier }: { tier: 1 | 2 | 3 }) {
  const t = tierConfig[tier];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${t.css}`}>
      {t.label}
    </span>
  );
}

// Refined section heading used on the component detail page.
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='text-base font-semibold tracking-tight text-foreground'>{children}</h2>
  );
}

// ─── Storybook deep-link mapping ────────────────────────────────────────────
// Maps a docs component (slug + category) to the full Storybook URL that
// loads the matching story. URL format: ?path=/story/{title-kebab}--{export-kebab}
//
// Title kebab follows Storybook's slugify rule (lowercase, non-alphanumeric → '-').
// Export name kebab is `${slug}-story` for most categories. Two story files
// (Navigation, LayoutFeedback) use bare PascalCase exports without the "Story"
// suffix, so they map slug → kebab(slug) without the suffix.
const STORYBOOK_TITLE_KEBAB: Record<string, string> = {
  'form-controls': 'components-form-controls',
  display: 'components-display',
  overlay: 'components-overlay',
  navigation: 'components-navigation',
  'layout-feedback': 'components-layout-feedback',
  feedback: 'components-layout-feedback',
  layout: 'components-layout-feedback',
  composite: 'components-composite',
  enterprise: 'components-enterprise',
  ai: 'components-ai',
};
const BARE_EXPORT_CATEGORIES = new Set(['layout-feedback', 'feedback', 'layout', 'navigation']);

function getStorybookBaseUrl(): string {
  if (typeof window === 'undefined') return '/storybook/index.html';
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  return isLocal ? 'http://localhost:6006' : '/storybook/index.html';
}

function getStorybookStoryUrl(slug: string, category: string): string {
  const base = getStorybookBaseUrl();
  const titleKebab = STORYBOOK_TITLE_KEBAB[category];
  if (!titleKebab) return base; // Unmapped category — fall back to Storybook home
  const exportKebab = BARE_EXPORT_CATEGORIES.has(category) ? slug : `${slug}-story`;
  return `${base}/?path=/story/${titleKebab}--${exportKebab}`;
}

// ─── Per-component documentation extras ─────────────────────────────────────
// Keyboard shortcuts that apply to specific components. Components without an
// entry here just don't render the keyboard section.
const KEYBOARD_SHORTCUTS: Record<string, { keys: string[]; action: string }[]> = {
  button: [
    { keys: ['Enter'], action: 'Trigger the button' },
    { keys: ['Space'], action: 'Trigger the button (when focused)' },
  ],
  dialog: [
    { keys: ['Esc'], action: 'Close the dialog' },
    { keys: ['Tab'], action: 'Cycle focus through interactive content' },
    { keys: ['Shift', 'Tab'], action: 'Cycle focus in reverse' },
  ],
  'alert-dialog': [
    { keys: ['Esc'], action: 'Cancel and close' },
    { keys: ['Enter'], action: 'Confirm the primary action when focused' },
  ],
  sheet: [
    { keys: ['Esc'], action: 'Close the sheet' },
    { keys: ['Tab'], action: 'Cycle focus through content' },
  ],
  drawer: [
    { keys: ['Esc'], action: 'Close the drawer' },
  ],
  popover: [
    { keys: ['Esc'], action: 'Close the popover' },
    { keys: ['Tab'], action: 'Move focus into / out of popover' },
  ],
  'dropdown-menu': [
    { keys: ['Esc'], action: 'Close the menu' },
    { keys: ['↑', '↓'], action: 'Move between items' },
    { keys: ['Enter'], action: 'Activate focused item' },
    { keys: ['Home'], action: 'Jump to first item' },
    { keys: ['End'], action: 'Jump to last item' },
  ],
  'context-menu': [
    { keys: ['↑', '↓'], action: 'Move between items' },
    { keys: ['Enter'], action: 'Activate focused item' },
    { keys: ['Esc'], action: 'Close the menu' },
  ],
  command: [
    { keys: ['↑', '↓'], action: 'Navigate results' },
    { keys: ['Enter'], action: 'Run selected command' },
    { keys: ['Esc'], action: 'Close palette' },
  ],
  tabs: [
    { keys: ['←', '→'], action: 'Switch tabs (horizontal)' },
    { keys: ['↑', '↓'], action: 'Switch tabs (vertical)' },
    { keys: ['Home'], action: 'First tab' },
    { keys: ['End'], action: 'Last tab' },
  ],
  accordion: [
    { keys: ['↑', '↓'], action: 'Move between triggers' },
    { keys: ['Enter', 'Space'], action: 'Expand / collapse panel' },
    { keys: ['Home', 'End'], action: 'First / last trigger' },
  ],
  select: [
    { keys: ['↑', '↓'], action: 'Move between options' },
    { keys: ['Enter'], action: 'Confirm selection' },
    { keys: ['Esc'], action: 'Close without selecting' },
    { keys: ['Type'], action: 'Jump to matching option' },
  ],
  combobox: [
    { keys: ['↑', '↓'], action: 'Move between filtered options' },
    { keys: ['Enter'], action: 'Select highlighted option' },
    { keys: ['Esc'], action: 'Close listbox' },
  ],
  switch: [
    { keys: ['Space'], action: 'Toggle checked state' },
  ],
  checkbox: [
    { keys: ['Space'], action: 'Toggle checked state' },
  ],
  'radio-group': [
    { keys: ['↑', '↓', '←', '→'], action: 'Move selection between radio buttons' },
  ],
  slider: [
    { keys: ['←', '↓'], action: 'Decrease value' },
    { keys: ['→', '↑'], action: 'Increase value' },
    { keys: ['Page Up', 'Page Down'], action: 'Jump by larger step' },
    { keys: ['Home', 'End'], action: 'Min / max value' },
  ],
  'date-picker': [
    { keys: ['←', '→'], action: 'Previous / next day' },
    { keys: ['↑', '↓'], action: 'Previous / next week' },
    { keys: ['Page Up', 'Page Down'], action: 'Previous / next month' },
    { keys: ['Enter'], action: 'Select focused date' },
    { keys: ['Esc'], action: 'Close calendar' },
  ],
  calendar: [
    { keys: ['←', '→'], action: 'Day navigation' },
    { keys: ['↑', '↓'], action: 'Week navigation' },
    { keys: ['Page Up', 'Page Down'], action: 'Month navigation' },
  ],
};

// Design tokens commonly relevant per component category. Only categories
// with meaningful customization surface get tokens listed.
const RELEVANT_TOKENS: Record<string, { token: string; description: string }[]> = {
  'form-controls': [
    { token: '--primary', description: 'Primary fill for active / submit buttons' },
    { token: '--input', description: 'Border colour of inputs' },
    { token: '--ring', description: 'Focus ring colour' },
    { token: '--background', description: 'Field surface' },
    { token: '--radius', description: 'Corner radius for inputs and buttons' },
  ],
  display: [
    { token: '--muted', description: 'Subtle backdrops (skeletons, dividers)' },
    { token: '--muted-foreground', description: 'Secondary text and icons' },
    { token: '--primary', description: 'Active accent (progress, badges)' },
    { token: '--radius', description: 'Avatar / badge radii' },
  ],
  layout: [
    { token: '--card', description: 'Card surface' },
    { token: '--card-foreground', description: 'Card text colour' },
    { token: '--border', description: 'Card outline' },
    { token: '--radius', description: 'Card corner radius' },
  ],
  feedback: [
    { token: '--destructive', description: 'Error / danger fill' },
    { token: '--destructive-foreground', description: 'Text on destructive surfaces' },
    { token: '--background', description: 'Toast / alert surface' },
  ],
  overlay: [
    { token: '--background', description: 'Dialog / sheet body' },
    { token: '--border', description: 'Edge separation' },
    { token: '--radius', description: 'Overlay corner radius' },
  ],
  navigation: [
    { token: '--accent', description: 'Hover surface for nav items' },
    { token: '--accent-foreground', description: 'Hover text' },
    { token: '--primary', description: 'Active item indicator' },
  ],
  composite: [
    { token: '--popover', description: 'Floating panel surface' },
    { token: '--popover-foreground', description: 'Floating panel text' },
    { token: '--primary', description: 'Selection / focus accents' },
  ],
};

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className='inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-md border border-border/80 bg-card text-[11px] font-mono font-medium shadow-sm'>
      {children}
    </kbd>
  );
}

// ─── Framework explanation card (rendered to the left of the source code) ──
// Splits the explanation text into individual sentences so they read as
// scannable bullets next to the code, then highlights inline `code` spans
// (anything matching `@adhar-ui/...`, `import`, `(event)`, etc.) for clarity.
function FrameworkExplanationCard({ fwId, text }: { fwId: FrameworkId; text: string }) {
  const fwInfo = frameworks.find((f) => f.id === fwId);
  // Split on `. ` but keep meaningful sentences (skip trailing empty after split)
  const sentences = text.split(/\.\s+/).map((s) => s.trim()).filter(Boolean);
  return (
    <aside className='rounded-xl border border-border bg-card/50 p-4 lg:sticky lg:top-20 self-start'>
      <div className='flex items-center gap-2 mb-3'>
        <div className='w-7 h-7 rounded-md bg-primary/8 border border-primary/15 flex items-center justify-center'>
          <FrameworkLogo id={fwId} size={16} />
        </div>
        <div className='min-w-0'>
          <div className='text-[10px] uppercase tracking-wider font-semibold text-muted-foreground'>Using with</div>
          <div className='text-sm font-semibold text-foreground leading-tight'>{fwInfo?.label || fwId}</div>
        </div>
      </div>
      <ul className='space-y-2'>
        {sentences.map((s, i) => (
          <li key={i} className='flex gap-2 text-[13px] leading-relaxed text-muted-foreground'>
            <span className='text-primary mt-1 shrink-0'>•</span>
            <span dangerouslySetInnerHTML={{ __html: highlightInlineCode(s) }} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Wraps inline code snippets in <code> tags so terms like @adhar-ui/angular,
// (event), kebab-case, $: become visually distinct in the explanation text.
function highlightInlineCode(text: string): string {
  // Order matters — most specific first
  return text
    // npm-style scoped packages: @scope/name (greedy on slug chars)
    .replace(/(@[a-z0-9-]+\/[a-z0-9-]+)/gi, '<code class="px-1 py-0.5 rounded bg-muted font-mono text-[11px] text-foreground">$1</code>')
    // Parenthesised event/ref forms: (click), (event), [(...)], etc.
    .replace(/(\([a-zA-Z]+\))/g, '<code class="px-1 py-0.5 rounded bg-muted font-mono text-[11px] text-foreground">$1</code>')
    .replace(/(\[[a-zA-Z()]+\])/g, '<code class="px-1 py-0.5 rounded bg-muted font-mono text-[11px] text-foreground">$1</code>')
    // Reactivity sigils: $:, $$Props, $$slots
    .replace(/(\$[$:][a-zA-Z]*|\$:|\$\$\w+)/g, '<code class="px-1 py-0.5 rounded bg-muted font-mono text-[11px] text-foreground">$1</code>')
    // Quoted code-ish identifiers: "imports", "kebab-case", 'on:click'
    .replace(/['"]([a-z][a-zA-Z0-9-:]+)['"]/g, '<code class="px-1 py-0.5 rounded bg-muted font-mono text-[11px] text-foreground">$1</code>')
    // Specific technical terms (do this last so the substring-replace doesn't
    // double-wrap things already wrapped above)
    .replace(/\b(kebab-case|camelCase|PascalCase|use\w+\(\)|forwardRef|useState|signal\(\)|computed\(\)|createSignal|createEffect|onMount|use:|on:|bind:|@input|@output|standalone|signals?)\b/g, '<code class="px-1 py-0.5 rounded bg-muted font-mono text-[11px] text-foreground">$1</code>');
}

// Best-practice tips per category — generic enough to apply to most components
// in the category, specific enough to be useful guidance.
function getDoTips(comp: ComponentData): string[] {
  const generic = [
    `Compose ${comp.name} with related primitives instead of duplicating its markup.`,
    `Pass a className to extend styling without forking the source.`,
  ];
  const byCategory: Record<string, string[]> = {
    'form-controls': [
      `Pair ${comp.name} with a Label and proper htmlFor / id wiring.`,
      `Surface validation errors inline next to the field, not in a toast.`,
      `Use the disabled prop to convey loading or guarded state — not pointer-events: none.`,
    ],
    overlay: [
      `Trigger the overlay from a real, focusable element (button, link).`,
      `Restore focus to the trigger when the overlay closes.`,
      `Lock body scroll while the overlay is open.`,
    ],
    navigation: [
      `Mark the current location with aria-current and a clear visual indicator.`,
      `Keep navigation depth shallow — flatten when you can.`,
    ],
    feedback: [
      `Reserve destructive variants (rose / red) for irreversible or risky actions.`,
      `Auto-dismiss only for success states; leave warnings and errors persistent.`,
    ],
    display: [
      `Set sensible defaults so it works with no props for the 80% case.`,
      `Use color sparingly — let the design tokens define accents.`,
    ],
    layout: [
      `Use the variant or radius props to fit the surface, not arbitrary classNames.`,
      `Compose nested layouts instead of overriding the spacing system.`,
    ],
    composite: [
      `Treat the component as a unit — don't reach into its internals.`,
      `Provide good defaults so single-prop usage works.`,
    ],
  };
  const cat = byCategory[comp.category] || [];
  return [...cat, ...generic].slice(0, 4);
}

function getDontTips(comp: ComponentData): string[] {
  const generic = [
    `Don't fork the source for one-off restyles — pass className or override tokens.`,
    `Don't disable focus rings to make the design "cleaner". Keyboard users need them.`,
  ];
  const byCategory: Record<string, string[]> = {
    'form-controls': [
      `Don't put placeholder text where a label belongs — placeholders disappear on focus.`,
      `Don't rely on color alone to convey error state. Add an icon and text.`,
    ],
    overlay: [
      `Don't trap focus by accident — every overlay needs a clear path to close.`,
      `Don't stack overlays on top of overlays. If you must, manage z-index explicitly.`,
    ],
    navigation: [
      `Don't open new tabs without an external-link indicator.`,
      `Don't hide active nav state on hover — the indicator must persist.`,
    ],
    feedback: [
      `Don't use destructive styling for routine confirmations.`,
      `Don't auto-dismiss errors — users need time to read them.`,
    ],
    display: [
      `Don't replace the icon set with one-off SVGs scattered through your code.`,
      `Don't crank up font weight to grab attention — use hierarchy instead.`,
    ],
    layout: [
      `Don't override padding token-by-token. Use density variants where available.`,
      `Don't nest cards more than two deep — flatten the structure first.`,
    ],
    composite: [
      `Don't bypass the controlled API to mutate internal state.`,
      `Don't render hundreds of items without virtualization.`,
    ],
  };
  const cat = byCategory[comp.category] || [];
  return [...cat, ...generic].slice(0, 4);
}

// ─── Component Category Page ──────────────────────────────────────────────────
export function ComponentsCategoryPage({
  categoryId,
  navigate,
}: {
  categoryId: string;
  navigate: (path: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const category = categories.find((c) => c.id === categoryId);
  const categoryComponents = useMemo(() => getComponentsByCategory(categoryId), [categoryId]);
  const filtered = search
    ? categoryComponents.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()),
    )
    : categoryComponents;

  return (
    <div className='space-y-7'>
      {/* ─── Category Header — clean, no gradient ────────────────── */}
      <header className='space-y-2'>
        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
          <button
            onClick={() => navigate('/components')}
            className='hover:text-foreground transition-colors'
          >
            Components
          </button>
          <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' d='M9 5l7 7-7 7' />
          </svg>
          <span className='text-foreground font-medium'>{category?.label || 'All'}</span>
        </div>
        <div className='flex items-end justify-between gap-3 flex-wrap'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-foreground'>
              {category?.label || 'Components'}
            </h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              {categoryComponents.length} {categoryComponents.length === 1 ? 'component' : 'components'} ready to drop in.
            </p>
          </div>
        </div>
      </header>

      {/* ─── Toolbar — search + view toggle ──────────────────────── */}
      <div className='flex items-center gap-2'>
        <div className='relative flex-1'>
          <svg
            className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground'
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${category?.label?.toLowerCase() || 'components'}…`}
            className='w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
          />
        </div>
        <div className='flex items-center border border-border rounded-lg p-0.5 bg-card'>
          <button
            onClick={() => setView('grid')}
            className={`h-8 w-8 rounded-md flex items-center justify-center transition-colors ${
              view === 'grid'
                ? 'bg-accent text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title='Grid view'
            aria-pressed={view === 'grid'}
          >
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <rect x='3' y='3' width='7' height='7' rx='1' />
              <rect x='14' y='3' width='7' height='7' rx='1' />
              <rect x='3' y='14' width='7' height='7' rx='1' />
              <rect x='14' y='14' width='7' height='7' rx='1' />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className={`h-8 w-8 rounded-md flex items-center justify-center transition-colors ${
              view === 'list'
                ? 'bg-accent text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title='List view'
            aria-pressed={view === 'list'}
          >
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} strokeLinecap='round'>
              <path d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </div>
      </div>

      {/* Component Grid / List */}
      {filtered.length === 0
        ? (
          <div className='py-20 text-center'>
            <div className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground/60 mb-4'>
              <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.6}>
                <circle cx='11' cy='11' r='8' />
                <path d='m21 21-4.3-4.3' strokeLinecap='round' />
              </svg>
            </div>
            <p className='text-sm font-medium text-foreground'>No matches for "{search}"</p>
            <p className='text-xs text-muted-foreground/70 mt-1'>Try a different keyword or clear the search.</p>
            <button
              onClick={() => setSearch('')}
              className='mt-4 inline-flex h-8 items-center rounded-md border border-border bg-card px-3 text-xs font-medium hover:bg-accent transition-colors'
            >
              Clear search
            </button>
          </div>
        )
        : view === 'grid'
        ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5'>
            {filtered.map((comp) => (
              <button
                key={comp.slug}
                onClick={() => navigate(`/components/detail/${comp.slug}`)}
                className='group flex flex-col rounded-xl border border-border bg-card text-left overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-[0_4px_12px_-4px_hsl(var(--foreground)/0.08)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              >
                {/* Component preview — curated schematic */}
                <div
                  className='relative h-[128px] border-b border-border/60'
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 50% 60%, hsl(var(--primary) / 0.04), transparent 70%), radial-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px)',
                    backgroundSize: 'auto, 14px 14px',
                  }}
                >
                  <ComponentPreview slug={comp.slug} />
                  <span className='absolute top-2 right-2 z-10'>
                    <TierBadge tier={comp.tier} />
                  </span>
                </div>
                <div className='p-4'>
                  <h3 className='text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors mb-1'>
                    {comp.name}
                  </h3>
                  <p className='text-xs text-muted-foreground/90 line-clamp-2 leading-snug min-h-[2.25rem]'>
                    {comp.description}
                  </p>
                  <div className='flex flex-wrap gap-1.5 items-center mt-3 pt-3 border-t border-border/50'>
                    {comp.frameworks.slice(0, 5).map((fw) => (
                      <FrameworkLogo key={fw} id={fw} size={14} className='opacity-80 group-hover:opacity-100 transition-opacity' />
                    ))}
                    {comp.frameworks.length > 5 && (
                      <span className='text-[10px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground font-medium tabular-nums'>
                        +{comp.frameworks.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )
        : (
          <div className='rounded-xl border border-border bg-card overflow-hidden divide-y divide-border'>
            {filtered.map((comp) => (
              <button
                key={comp.slug}
                onClick={() => navigate(`/components/detail/${comp.slug}`)}
                className='group w-full flex items-center gap-4 px-4 py-3 hover:bg-accent/30 transition-colors text-left focus-visible:outline-none focus-visible:bg-accent/40'
              >
                <div className='flex-1 min-w-0'>
                  <h3 className='text-sm font-semibold text-foreground group-hover:text-primary transition-colors'>
                    {comp.name}
                  </h3>
                  <p className='text-xs text-muted-foreground truncate mt-0.5'>{comp.description}</p>
                </div>
                <div className='flex items-center gap-3 shrink-0'>
                  <div className='hidden sm:flex items-center gap-1.5 opacity-80'>
                    {comp.frameworks.slice(0, 5).map((fw) => (
                      <FrameworkLogo key={fw} id={fw} size={13} />
                    ))}
                  </div>
                  <TierBadge tier={comp.tier} />
                  <svg
                    className='w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
    </div>
  );
}

// ─── Component Detail Page ────────────────────────────────────────────────────
export function ComponentDetailPage({
  slug,
  navigate,
}: {
  slug: string;
  navigate: (path: string) => void;
}) {
  const [activeFw, setActiveFw] = useState<FrameworkId>('react');

  const comp = components.find((c) => c.slug === slug);
  if (!comp) {
    return (
      <div className='py-20 text-center'>
        <div className='text-4xl mb-4'>404</div>
        <h2 className='text-xl font-bold text-foreground mb-2'>Component not found</h2>
        <p className='text-muted-foreground mb-6'>No component matches "{slug}"</p>
        <button
          onClick={() => navigate('/components/form-controls')}
          className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors'
        >
          Browse components
        </button>
      </div>
    );
  }

  const DemoComponent = demoMap[comp.slug];
  const category = categories.find((c) => c.id === comp.category);
  const prev = getPrevComponent(slug);
  const next = getNextComponent(slug);
  return (
    <div className='space-y-12'>
      {/* ─── Breadcrumb + back ─────────────────────────────────────── */}
      <nav className='flex items-center gap-1.5 text-xs text-muted-foreground'>
        <button
          onClick={() => navigate('/components')}
          className='hover:text-foreground transition-colors'
        >
          Components
        </button>
        <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' d='M9 5l7 7-7 7' />
        </svg>
        {category && (
          <>
            <button
              onClick={() => navigate(`/components/${category.id}`)}
              className='hover:text-foreground transition-colors'
            >
              {category.label}
            </button>
            <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' d='M9 5l7 7-7 7' />
            </svg>
          </>
        )}
        <span className='text-foreground font-medium'>{comp.name}</span>
      </nav>

      {/* ─── Header ───────────────────────────────────────────────── */}
      <header className='space-y-3'>
        <div className='flex items-center gap-2.5'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>{comp.name}</h1>
          <TierBadge tier={comp.tier} />
        </div>
        <p className='text-base text-muted-foreground leading-relaxed max-w-3xl'>{comp.description}</p>
        <div className='flex flex-wrap items-center gap-1.5 pt-1'>
          {comp.frameworks.map((fw) => {
            const fwInfo = frameworks.find((f) => f.id === fw);
            if (!fwInfo) return null;
            return (
              <span
                key={fw}
                title={fwInfo.label}
                className='inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-md font-medium border border-border/70 bg-card/60 text-muted-foreground'
              >
                <FrameworkLogo id={fw} size={11} />
                {fwInfo.label}
              </span>
            );
          })}
        </div>
      </header>

      {/* ─── Preview ──────────────────────────────────────────────── */}
      <section className='space-y-3'>
        {DemoComponent ? (
          <div className='rounded-xl border border-border bg-card overflow-hidden'>
            <div className='flex items-center gap-1.5 px-4 py-2 border-b border-border/60 bg-muted/20'>
              <span className='w-2 h-2 rounded-full bg-red-400/50' />
              <span className='w-2 h-2 rounded-full bg-yellow-400/50' />
              <span className='w-2 h-2 rounded-full bg-green-400/50' />
              <code className='ml-2 text-[10px] text-muted-foreground/60 font-mono'>{comp.slug}.tsx</code>
              <div className='flex-1' />
              <a
                href={getStorybookStoryUrl(comp.slug, comp.category)}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors'
                title={`Open ${comp.name} in Storybook (new tab)`}
              >
                <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path d='M4 4h16v16H4zM8 4v16M16 4v16' /></svg>
                Open in Storybook
                <svg className='w-2.5 h-2.5 opacity-60' aria-hidden='true' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M7 17L17 7' />
                  <path d='M9 7h8v8' />
                </svg>
              </a>
            </div>
            <div className='p-8 sm:p-10 flex items-center justify-center min-h-[260px] bg-[radial-gradient(hsl(var(--border)/0.25)_1px,transparent_1px)] bg-[size:16px_16px]'>
              <DemoComponent />
            </div>
          </div>
        ) : (
          <Callout type='info'>
            Live preview is not available for this component yet. See the code below for usage.
          </Callout>
        )}
      </section>

      {/* ─── Installation ─────────────────────────────────────────── */}
      <section className='space-y-3'>
        <SectionHeading>Installation</SectionHeading>
        <InstallBlock component={comp.slug} />
        {comp.dependencies && comp.dependencies.length > 0 && (
          <p className='text-xs text-muted-foreground'>
            Pulls in: {comp.dependencies.map((d, i) => (
              <React.Fragment key={d}>
                {i > 0 && ', '}
                <code className='px-1.5 py-0.5 rounded bg-muted font-mono text-[11px]'>{d}</code>
              </React.Fragment>
            ))}
          </p>
        )}
      </section>

      {/* ─── Usage ────────────────────────────────────────────────── */}
      <section className='space-y-3'>
        <SectionHeading>Usage</SectionHeading>
        <CodeBlock code={comp.importCode} language='tsx' />
        {comp.examples?.[0] && (
          <CodeBlock code={comp.examples[0].code} language='tsx' showLineNumbers />
        )}
      </section>

      {/* ─── Code (per-framework — explanation left, code right) ──── */}
      <section className='space-y-4'>
        <SectionHeading>Source code</SectionHeading>

        {/* Framework switcher */}
        <div className='flex items-center gap-1 border-b border-border overflow-x-auto'>
          {frameworks.map((fw) => {
            const supported = comp.frameworks.includes(fw.id);
            const active = activeFw === fw.id && supported;
            return (
              <button
                key={fw.id}
                title={fw.label}
                onClick={() => supported && setActiveFw(fw.id)}
                disabled={!supported}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                  active
                    ? 'border-primary text-foreground'
                    : supported
                    ? 'border-transparent text-muted-foreground hover:text-foreground'
                    : 'border-transparent text-muted-foreground/30 cursor-not-allowed'
                }`}
              >
                <FrameworkLogo id={fw.id} size={13} className={!supported ? 'opacity-30 grayscale' : ''} />
                <span className='hidden sm:inline'>{fw.label}</span>
              </button>
            );
          })}
        </div>

        {/* Side-by-side: explanation card on the left, code on the right */}
        <div className='grid gap-4 lg:grid-cols-[280px_1fr]'>
          <FrameworkExplanationCard fwId={activeFw} text={getFrameworkExplanation(activeFw)} />
          <div className='min-w-0'>
            <CodeBlock
              code={getFrameworkCode(comp, activeFw)}
              language={activeFw === 'vue' || activeFw === 'svelte' ? 'html' : 'tsx'}
              showLineNumbers
            />
          </div>
        </div>
      </section>

      {/* ─── Props / API ──────────────────────────────────────────── */}
      {comp.props && comp.props.length > 0 ? (
        <section className='space-y-3'>
          <SectionHeading>Props</SectionHeading>
          <div className='overflow-x-auto rounded-xl border border-border'>
            <table className='w-full text-sm'>
              <thead className='bg-muted/30'>
                <tr className='border-b border-border'>
                  <th className='text-left px-4 py-2.5 font-semibold text-foreground/80 text-[11px] uppercase tracking-wider'>Name</th>
                  <th className='text-left px-4 py-2.5 font-semibold text-foreground/80 text-[11px] uppercase tracking-wider'>Type</th>
                  <th className='text-left px-4 py-2.5 font-semibold text-foreground/80 text-[11px] uppercase tracking-wider'>Default</th>
                  <th className='text-left px-4 py-2.5 font-semibold text-foreground/80 text-[11px] uppercase tracking-wider'>Description</th>
                </tr>
              </thead>
              <tbody>
                {comp.props.map((prop) => (
                  <tr
                    key={prop.name}
                    className='border-b border-border/60 last:border-0 hover:bg-accent/20 transition-colors'
                  >
                    <td className='px-4 py-3 font-mono text-xs whitespace-nowrap'>
                      <span className='text-primary font-semibold'>{prop.name}</span>
                      {prop.required && <span className='text-destructive ml-0.5' title='Required'>*</span>}
                    </td>
                    <td className='px-4 py-3 font-mono text-[11px]'>
                      <code className='bg-muted rounded px-1.5 py-0.5 text-muted-foreground'>{prop.type}</code>
                    </td>
                    <td className='px-4 py-3 font-mono text-[11px]'>
                      <code className='bg-muted/50 rounded px-1.5 py-0.5 text-muted-foreground/70'>{prop.default}</code>
                    </td>
                    <td className='px-4 py-3 text-xs text-muted-foreground leading-relaxed'>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* ─── Additional examples (if more than one) ───────────────── */}
      {comp.examples && comp.examples.length > 1 && (
        <section className='space-y-3'>
          <SectionHeading>Examples</SectionHeading>
          <div className='space-y-4'>
            {comp.examples.slice(1).map((example, i) => (
              <div key={i} className='rounded-xl border border-border overflow-hidden'>
                <div className='bg-muted/20 px-4 py-2.5 border-b border-border'>
                  <h3 className='text-sm font-semibold text-foreground'>{example.title}</h3>
                </div>
                <CodeBlock code={example.code} language='tsx' showLineNumbers />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Keyboard shortcuts (if applicable) ──────────────────── */}
      {KEYBOARD_SHORTCUTS[comp.slug] && (
        <section className='space-y-3'>
          <SectionHeading>Keyboard</SectionHeading>
          <p className='text-sm text-muted-foreground'>{comp.name} responds to these keys when focused.</p>
          <div className='rounded-xl border border-border bg-card overflow-hidden divide-y divide-border'>
            {KEYBOARD_SHORTCUTS[comp.slug].map((s, i) => (
              <div key={i} className='flex items-center gap-4 px-4 py-3'>
                <div className='flex items-center gap-1.5 shrink-0 min-w-[120px]'>
                  {s.keys.map((k, j) => (
                    <React.Fragment key={j}>
                      {j > 0 && <span className='text-muted-foreground/50 text-xs'>+</span>}
                      <Kbd>{k}</Kbd>
                    </React.Fragment>
                  ))}
                </div>
                <span className='text-sm text-muted-foreground'>{s.action}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Theming / design tokens ─────────────────────────────── */}
      {RELEVANT_TOKENS[comp.category] && (
        <section className='space-y-3'>
          <SectionHeading>Theming</SectionHeading>
          <p className='text-sm text-muted-foreground'>
            {comp.name} reads from the design-token CSS variables below. Override them in your{' '}
            <code className='px-1 py-0.5 rounded bg-muted font-mono text-[11px]'>:root</code>{' '}
            and the component restyles instantly — no source changes needed.
          </p>
          <div className='rounded-xl border border-border bg-card overflow-hidden divide-y divide-border'>
            {RELEVANT_TOKENS[comp.category].map((t) => (
              <div key={t.token} className='flex items-start gap-4 px-4 py-3'>
                <code className='shrink-0 min-w-[180px] font-mono text-xs text-primary'>{t.token}</code>
                <span className='text-sm text-muted-foreground leading-relaxed'>{t.description}</span>
              </div>
            ))}
          </div>
          <p className='text-xs text-muted-foreground/80'>
            See the{' '}
            <button onClick={() => navigate('/theming')} className='text-primary hover:underline font-medium'>theming guide</button>
            {' '}for the full token list and how to define custom themes.
          </p>
        </section>
      )}

      {/* ─── Best practices ─────────────────────────────────────── */}
      <section className='space-y-3'>
        <SectionHeading>Best practices</SectionHeading>
        <div className='grid gap-3 md:grid-cols-2'>
          <div className='rounded-xl border border-emerald-500/30 bg-emerald-500/[0.03] p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='shrink-0 w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center'>
                <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}><path d='M5 13l4 4L19 7' /></svg>
              </div>
              <h3 className='text-sm font-semibold text-foreground'>Do</h3>
            </div>
            <ul className='space-y-1.5 text-sm text-muted-foreground'>
              {getDoTips(comp).map((tip, i) => (
                <li key={i} className='flex gap-2'>
                  <span className='text-emerald-500 mt-0.5'>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className='rounded-xl border border-rose-500/30 bg-rose-500/[0.03] p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='shrink-0 w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center'>
                <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={3}><path d='M18 6 6 18M6 6l12 12' /></svg>
              </div>
              <h3 className='text-sm font-semibold text-foreground'>Don't</h3>
            </div>
            <ul className='space-y-1.5 text-sm text-muted-foreground'>
              {getDontTips(comp).map((tip, i) => (
                <li key={i} className='flex gap-2'>
                  <span className='text-rose-500 mt-0.5'>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Accessibility note ───────────────────────────────────── */}
      <section className='rounded-xl border border-border bg-card p-5'>
        <div className='flex items-start gap-3'>
          <div className='shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center'>
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}><circle cx='12' cy='12' r='10' /><path d='M12 8v4M12 16h.01' /></svg>
          </div>
          <div className='flex-1'>
            <h3 className='text-sm font-semibold mb-1.5'>Accessibility</h3>
            <ul className='space-y-1 text-sm text-muted-foreground leading-relaxed'>
              <li className='flex gap-2'><span className='text-primary mt-0.5'>·</span><span>Full keyboard navigation and proper focus management.</span></li>
              <li className='flex gap-2'><span className='text-primary mt-0.5'>·</span><span>ARIA attributes wired up for screen readers.</span></li>
              <li className='flex gap-2'><span className='text-primary mt-0.5'>·</span><span>Respects <code className='px-1 py-0.5 rounded bg-muted font-mono text-[11px]'>prefers-reduced-motion</code>.</span></li>
              <li className='flex gap-2'><span className='text-primary mt-0.5'>·</span><span>WCAG 2.1 AA compliant when used as documented.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Related Components ─── */}
      {comp.related && comp.related.length > 0 && (
        <div className='mt-12'>
          <h2 className='text-sm font-semibold text-foreground mb-3'>Related Components</h2>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2'>
            {comp.related.map((relSlug) => {
              const rel = components.find((c) => c.slug === relSlug);
              if (!rel) return null;
              return (
                <button
                  key={relSlug}
                  onClick={() => navigate(`/components/detail/${relSlug}`)}
                  className='flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent hover:border-primary/20 transition-all text-left group'
                >
                  <div className='min-w-0 flex-1'>
                    <div className='text-sm font-medium text-foreground group-hover:text-primary transition-colors'>
                      {rel.name}
                    </div>
                    <div className='text-[11px] text-muted-foreground truncate'>{rel.description}</div>
                  </div>
                  <svg className='w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                    <path strokeLinecap='round' d='M9 5l7 7-7 7' />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Prev / Next Navigation ─── */}
      <div className='flex items-center justify-between pt-8 mt-10 border-t border-border'>
        {prev
          ? (
            <button
              onClick={() => navigate(`/components/detail/${prev.slug}`)}
              className='group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              <svg
                className='w-4 h-4 group-hover:-translate-x-0.5 transition-transform'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' d='M15 19l-7-7 7-7' />
              </svg>
              <div className='text-left'>
                <div className='text-[10px] text-muted-foreground/60 uppercase tracking-wider'>
                  Previous
                </div>
                <div className='font-medium'>{prev.name}</div>
              </div>
            </button>
          )
          : (
            <button
              onClick={() => navigate(`/components/${comp.category}`)}
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              ← Back to {category?.label || 'Components'}
            </button>
          )}

        {next
          ? (
            <button
              onClick={() => navigate(`/components/detail/${next.slug}`)}
              className='group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              <div className='text-right'>
                <div className='text-[10px] text-muted-foreground/60 uppercase tracking-wider'>
                  Next
                </div>
                <div className='font-medium'>{next.name}</div>
              </div>
              <svg
                className='w-4 h-4 group-hover:translate-x-0.5 transition-transform'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' d='M9 5l7 7-7 7' />
              </svg>
            </button>
          )
          : (
            <button
              onClick={() => navigate(`/components/${comp.category}`)}
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              Back to {category?.label || 'Components'} →
            </button>
          )}
      </div>
    </div>
  );
}
