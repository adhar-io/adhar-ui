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
    <div className='space-y-6'>
      {/* Category Header */}
      <div className='rounded-xl border border-border bg-gradient-to-r from-primary/5 to-transparent p-6'>
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-foreground flex items-center gap-2'>
              {category && <NavIcon icon={category.icon} className='text-primary' />}
              {category?.label || 'Components'}
            </h1>
            <p className='text-sm text-muted-foreground mt-1'>
              {categoryComponents.length} components in this category
            </p>
          </div>
          <Badge variant='secondary'>{categoryComponents.length} total</Badge>
        </div>
      </div>

      {/* Category Navigation */}
      <div className='overflow-x-auto -mx-2 px-2'>
        <div className='flex gap-1.5 min-w-max'>
          {categories.map((cat) => {
            const active = cat.id === categoryId;
            const count = components.filter((c) => c.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/components/${cat.id}`)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                  active
                    ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                    : 'border border-border text-muted-foreground hover:text-foreground hover:bg-accent hover:border-primary/20'
                }`}
              >
                <NavIcon icon={cat.icon} className={active ? 'text-primary-foreground' : ''} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    active ? 'bg-primary-foreground/20' : 'bg-muted'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toolbar */}
      <div className='flex items-center gap-3'>
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
            placeholder='Filter components...'
            className='w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
          />
        </div>
        <div className='flex items-center border border-border rounded-lg p-0.5'>
          <button
            onClick={() => setView('grid')}
            className={`p-1.5 rounded text-xs transition-colors ${
              view === 'grid'
                ? 'bg-accent text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title='Grid view'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <rect x='3' y='3' width='7' height='7' rx='1' />
              <rect x='14' y='3' width='7' height='7' rx='1' />
              <rect x='3' y='14' width='7' height='7' rx='1' />
              <rect x='14' y='14' width='7' height='7' rx='1' />
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-1.5 rounded text-xs transition-colors ${
              view === 'list'
                ? 'bg-accent text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            title='List view'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </div>
      </div>

      {/* Component Grid / List */}
      {filtered.length === 0
        ? (
          <div className='py-16 text-center'>
            <p className='text-muted-foreground'>No components matching "{search}"</p>
            <button
              onClick={() => setSearch('')}
              className='text-primary text-sm mt-2 hover:underline'
            >
              Clear search
            </button>
          </div>
        )
        : view === 'grid'
        ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
            {filtered.map((comp) => {
              const DemoComp = demoMap[comp.slug];
              return (
                <button
                  key={comp.slug}
                  onClick={() => navigate(`/components/detail/${comp.slug}`)}
                  className='group flex flex-col rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 text-left overflow-hidden'
                >
                  {/* Component preview */}
                  <div className='border-b border-border/60 bg-muted/5 relative'>
                    <div className='p-4 flex items-center justify-center min-h-[110px] max-h-[160px] overflow-hidden'>
                      {DemoComp
                        ? (
                          <div className='transform scale-[0.7] origin-center pointer-events-none w-full flex items-center justify-center'>
                            <DemoComp />
                          </div>
                        )
                        : (
                          <div className='flex flex-col items-center gap-1.5 text-muted-foreground/30'>
                            <svg className='w-7 h-7' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
                              <rect x='3' y='3' width='18' height='18' rx='3' />
                              <path d='M9 9h6M9 13h4' strokeLinecap='round' />
                            </svg>
                            <span className='text-[9px] font-medium tracking-wider uppercase'>Preview</span>
                          </div>
                        )}
                    </div>
                    {DemoComp && <div className='absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-muted/10 to-transparent pointer-events-none' />}
                    <span className='absolute top-2 right-2 z-10'>
                      <TierBadge tier={comp.tier} />
                    </span>
                  </div>
                  <div className='p-3.5'>
                    <h3 className='font-medium text-foreground group-hover:text-primary text-[13px] mb-0.5'>
                      {comp.name}
                    </h3>
                    <p className='text-xs text-muted-foreground line-clamp-2 mb-2.5 leading-relaxed'>
                      {comp.description}
                    </p>
                    <div className='flex flex-wrap gap-1.5 items-center'>
                      {comp.frameworks.slice(0, 5).map((fw) => (
                        <FrameworkLogo key={fw} id={fw} size={14} className='opacity-70 group-hover:opacity-100 transition-opacity' />
                      ))}
                      {comp.frameworks.length > 5 && (
                        <span className='text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground'>
                          +{comp.frameworks.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )
        : (
          <div className='space-y-1.5'>
            {filtered.map((comp) => (
              <button
                key={comp.slug}
                onClick={() => navigate(`/components/detail/${comp.slug}`)}
                className='w-full flex items-center gap-4 p-3 rounded-lg border border-border bg-card hover:shadow-sm hover:border-primary/30 transition-all text-left group'
              >
                <div className='flex-1 min-w-0'>
                  <h3 className='font-medium text-foreground group-hover:text-primary transition-colors text-sm'>
                    {comp.name}
                  </h3>
                  <p className='text-xs text-muted-foreground truncate'>{comp.description}</p>
                </div>
                <div className='flex items-center gap-2 shrink-0'>
                  <div className='flex gap-1'>
                    {comp.frameworks.map((fw) => (
                      <FrameworkLogo key={fw} id={fw} size={14} />
                    ))}
                  </div>
                  <TierBadge tier={comp.tier} />
                  <svg
                    className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors'
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
  const [activeSection, setActiveSection] = useState('overview');

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
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'code', label: 'Code' },
    { id: 'api', label: 'API' },
    { id: 'examples', label: 'Blocks' },
  ];

  return (
    <div>
      {/* Breadcrumb */}
      <nav className='flex items-center gap-1.5 text-xs text-muted-foreground mb-5'>
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

      {/* Header */}
      <div className='rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 p-6'>
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <h1 className='text-2xl font-bold text-foreground'>{comp.name}</h1>
              <TierBadge tier={comp.tier} />
            </div>
            <p className='text-muted-foreground max-w-3xl leading-relaxed'>{comp.description}</p>
            <div className='flex flex-wrap items-center gap-1.5 mt-3'>
              {comp.frameworks.map((fw) => {
                const fwInfo = frameworks.find((f) => f.id === fw);
                return fwInfo
                  ? (
                    <span
                      key={fw}
                      title={fwInfo.label}
                      className='inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md font-medium border border-border bg-card hover:bg-accent transition-colors'
                    >
                      <FrameworkLogo id={fw} size={12} />
                      <span className='hidden sm:inline'>{fwInfo.label}</span>
                    </span>
                  )
                  : null;
              })}
            </div>
          </div>
          <div className='flex items-center gap-2 shrink-0'>
            <button
              onClick={() => navigate('/playground')}
              className='inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'
            >
              <span>▶</span> Playground
            </button>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className='border-b border-border mt-6 overflow-x-auto scrollbar-none'>
        <div className='flex min-w-max'>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeSection === s.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s.label}
              {activeSection === s.id && (
                <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full' />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Overview Section ─── */}
      {activeSection === 'overview' && (
        <div className='mt-8 space-y-10'>
          {/* Live Preview — shown first */}
          <section>
            <h2 className='text-base font-semibold text-foreground mb-4 flex items-center gap-2.5'>
              <span className='w-6 h-6 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center font-bold'>1</span>
              Preview
            </h2>
            {DemoComponent
              ? (
                <div className='rounded-lg border border-border overflow-hidden'>
                  <div className='flex items-center gap-1.5 px-3.5 py-2 border-b border-border/60 bg-muted/20'>
                    <span className='w-2 h-2 rounded-full bg-red-400/50' />
                    <span className='w-2 h-2 rounded-full bg-yellow-400/50' />
                    <span className='w-2 h-2 rounded-full bg-green-400/50' />
                    <span className='flex-1 text-center text-[10px] text-muted-foreground/60 font-medium tracking-wider uppercase -ml-10'>
                      Preview
                    </span>
                  </div>
                  <div className='p-6 sm:p-8 flex items-start justify-center min-h-[220px] overflow-auto bg-[radial-gradient(hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:16px_16px]'>
                    <div className='w-full flex items-center justify-center py-4'>
                      <DemoComponent />
                    </div>
                  </div>
                </div>
              )
              : (
                <Callout type='info'>
                  Live preview is not yet available for this component. See the Code tab for usage examples.
                </Callout>
              )}
          </section>

          {/* About */}
          <section>
            <h2 className='text-base font-semibold text-foreground mb-3 flex items-center gap-2.5'>
              <span className='w-6 h-6 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center font-bold'>2</span>
              About
            </h2>
            <div className='rounded-lg border border-border bg-card p-4 space-y-3'>
              <p className='text-sm text-muted-foreground leading-relaxed'>{comp.description}</p>
              <div className='grid sm:grid-cols-2 gap-3'>
                <div className='p-3 rounded-md bg-muted/20'>
                  <h4 className='text-[11px] font-semibold text-foreground mb-1.5 uppercase tracking-wider'>When to use</h4>
                  <ul className='space-y-1'>
                    <li className='text-xs text-muted-foreground flex items-start gap-1.5'>
                      <span className='w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0' />
                      Use {comp.name} when your UI needs {comp.category === 'form-controls' ? 'user input or interaction' : comp.category === 'display' ? 'visual indicators or status display' : comp.category === 'overlay' ? 'temporary content overlays' : comp.category === 'navigation' ? 'navigation between views or sections' : comp.category === 'feedback' ? 'user notifications or confirmations' : 'complex data display or interaction'}
                    </li>
                    <li className='text-xs text-muted-foreground flex items-start gap-1.5'>
                      <span className='w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0' />
                      Combine with other components for richer interfaces
                    </li>
                  </ul>
                </div>
                <div className='p-3 rounded-md bg-muted/20'>
                  <h4 className='text-[11px] font-semibold text-foreground mb-1.5 uppercase tracking-wider'>Accessibility</h4>
                  <ul className='space-y-1'>
                    <li className='text-xs text-muted-foreground flex items-start gap-1.5'>
                      <span className='w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0' />
                      Keyboard navigation and focus management
                    </li>
                    <li className='text-xs text-muted-foreground flex items-start gap-1.5'>
                      <span className='w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0' />
                      ARIA attributes for screen readers
                    </li>
                    <li className='text-xs text-muted-foreground flex items-start gap-1.5'>
                      <span className='w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0' />
                      Respects <code className='text-[10px] px-1 rounded bg-muted font-mono'>prefers-reduced-motion</code>
                    </li>
                  </ul>
                </div>
              </div>
              {comp.dependencies.length > 0 && (
                <div className='flex items-center gap-2 pt-2 border-t border-border/60'>
                  <span className='text-[10px] text-muted-foreground uppercase tracking-wider font-medium'>Dependencies:</span>
                  {comp.dependencies.map((dep) => (
                    <span key={dep} className='text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-mono'>{dep}</span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Installation */}
          <section>
            <h2 className='text-base font-semibold text-foreground mb-3 flex items-center gap-2.5'>
              <span className='w-6 h-6 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center font-bold'>3</span>
              Installation
            </h2>
            <InstallBlock component={comp.slug} />
          </section>

          {/* Import */}
          <section>
            <h2 className='text-base font-semibold text-foreground mb-3 flex items-center gap-2.5'>
              <span className='w-6 h-6 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center font-bold'>4</span>
              Import
            </h2>
            <CodeBlock code={comp.importCode} language='tsx' />
          </section>

          {/* Quick Example */}
          {comp.examples?.[0] && (
            <section>
              <h2 className='text-base font-semibold text-foreground mb-3 flex items-center gap-2.5'>
                <span className='w-6 h-6 rounded-md bg-primary/10 text-primary text-xs flex items-center justify-center font-bold'>5</span>
                Quick Start
              </h2>
              <CodeBlock code={comp.examples[0].code} language='tsx' showLineNumbers />
            </section>
          )}
        </div>
      )}

      {/* ─── Code Section (Multi-Framework) ─── */}
      {activeSection === 'code' && (
        <div className='mt-8 space-y-8'>
          {/* Framework Selector */}
          <div className='flex flex-wrap gap-1.5'>
            {frameworks.map((fw) => {
              const supported = comp.frameworks.includes(fw.id);
              return (
                <button
                  key={fw.id}
                  title={fw.label}
                  onClick={() => supported && setActiveFw(fw.id)}
                  disabled={!supported}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all border ${
                    activeFw === fw.id && supported
                      ? 'border-primary bg-primary/10 text-primary font-medium shadow-sm'
                      : supported
                      ? 'border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-accent'
                      : 'border-border/50 text-muted-foreground/30 cursor-not-allowed'
                  }`}
                >
                  <FrameworkLogo id={fw.id} size={14} className={!supported ? 'opacity-30 grayscale' : ''} />
                  <span className='hidden sm:inline'>{fw.label}</span>
                  {!supported && <span className='text-[9px] hidden sm:inline'>(N/A)</span>}
                </button>
              );
            })}
          </div>

          {/* Framework Explanation */}
          <div className='rounded-xl border border-border bg-muted/20 p-4 flex items-start gap-3'>
            <FrameworkLogo id={activeFw} size={22} className='shrink-0 mt-0.5' />
            <div>
              <h4 className='text-sm font-semibold text-foreground mb-0.5'>
                {frameworks.find((f) => f.id === activeFw)?.label} Usage
              </h4>
              <p className='text-xs text-muted-foreground leading-relaxed'>
                {getFrameworkExplanation(activeFw)}
              </p>
            </div>
          </div>

          {/* Code */}
          <div>
            <h3 className='text-sm font-medium text-foreground mb-3'>
              {comp.name}{frameworks.find((f) => f.id === activeFw)?.fileExt}
            </h3>
            <CodeBlock
              code={getFrameworkCode(comp, activeFw)}
              language={activeFw === 'vue' || activeFw === 'svelte' ? 'html' : 'tsx'}
              showLineNumbers
            />
          </div>

          {/* All Frameworks at a Glance */}
          <div>
            <h3 className='text-sm font-semibold text-foreground mb-3'>All Frameworks</h3>
            <div className='grid gap-3'>
              {frameworks.filter((fw) => comp.frameworks.includes(fw.id) && fw.id !== activeFw).map(
                (fw) => (
                  <details key={fw.id} className='group rounded-lg border border-border overflow-hidden'>
                    <summary className='flex items-center gap-2.5 px-4 py-2.5 cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors'>
                      <FrameworkLogo id={fw.id} size={16} />
                      <span className='text-sm font-medium text-foreground'>{fw.label}</span>
                      <svg
                        className='w-3.5 h-3.5 text-muted-foreground ml-auto transition-transform group-open:rotate-180'
                        fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}
                      >
                        <path strokeLinecap='round' d='M19 9l-7 7-7-7' />
                      </svg>
                    </summary>
                    <div className='p-3 border-t border-border'>
                      <CodeBlock
                        code={getFrameworkCode(comp, fw.id)}
                        language={fw.id === 'vue' || fw.id === 'svelte' ? 'html' : 'tsx'}
                      />
                    </div>
                  </details>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── API Section ─── */}
      {activeSection === 'api' && (
        <div className='mt-8 space-y-8'>
          {comp.props && comp.props.length > 0
            ? (
              <section>
                <h2 className='text-base font-semibold text-foreground mb-4'>Props</h2>
                <div className='overflow-x-auto rounded-xl border border-border'>
                  <table className='w-full text-sm'>
                    <thead>
                      <tr className='border-b border-border bg-muted/40'>
                        <th className='text-left px-4 py-2.5 font-medium text-foreground text-xs'>Name</th>
                        <th className='text-left px-4 py-2.5 font-medium text-foreground text-xs'>Type</th>
                        <th className='text-left px-4 py-2.5 font-medium text-foreground text-xs'>Default</th>
                        <th className='text-left px-4 py-2.5 font-medium text-foreground text-xs'>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comp.props.map((prop, i) => (
                        <tr
                          key={prop.name}
                          className={`border-b border-border last:border-0 ${i % 2 ? 'bg-muted/10' : ''}`}
                        >
                          <td className='px-4 py-2.5 font-mono text-xs'>
                            <span className='text-primary font-medium'>{prop.name}</span>
                            {prop.required && <span className='text-destructive ml-0.5'>*</span>}
                          </td>
                          <td className='px-4 py-2.5 font-mono text-[11px] text-muted-foreground'>
                            <code className='bg-muted rounded px-1.5 py-0.5'>{prop.type}</code>
                          </td>
                          <td className='px-4 py-2.5 font-mono text-[11px] text-muted-foreground'>
                            <code className='bg-muted rounded px-1.5 py-0.5'>{prop.default}</code>
                          </td>
                          <td className='px-4 py-2.5 text-xs text-muted-foreground'>{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )
            : (
              <Callout type='info'>
                Detailed API documentation for this component is being finalized. Check back soon.
              </Callout>
            )}

          {comp.dependencies && comp.dependencies.length > 0 && (
            <section>
              <h2 className='text-base font-semibold text-foreground mb-3'>Dependencies</h2>
              <div className='flex flex-wrap gap-2'>
                {comp.dependencies.map((dep) => (
                  <span
                    key={dep}
                    className='text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground font-mono border border-border'
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ─── Examples Section ─── */}
      {activeSection === 'examples' && (
        <div className='mt-8 space-y-6'>
          {comp.examples && comp.examples.length > 0
            ? (
              comp.examples.map((example, i) => (
                <section key={i} className='rounded-xl border border-border overflow-hidden'>
                  <div className='bg-muted/20 px-4 py-2.5 border-b border-border'>
                    <h3 className='text-sm font-semibold text-foreground'>{example.title}</h3>
                  </div>
                  <div className='p-4'>
                    <CodeBlock code={example.code} language='tsx' showLineNumbers />
                  </div>
                </section>
              ))
            )
            : (
              <Callout type='info'>
                Blocks for this component are coming soon. Use the Code tab for framework-specific usage.
              </Callout>
            )}
        </div>
      )}

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
