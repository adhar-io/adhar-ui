import React, { useState } from 'react';
import { Badge, Callout, CodeBlock, InstallBlock, PageHeader } from '../components/ui.tsx';
import * as Demos from '../components/demo-components.tsx';
import { FrameworkLogo, NavIcon } from '../components/icons.tsx';
import {
  categories,
  type ComponentData,
  components,
  type FrameworkId,
  frameworks,
  getFrameworkCode,
  getFrameworkExplanation,
} from '../data/components.ts';

// Map slugs to live demo components — all 78 components
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

export function PlaygroundPage({ navigate }: { navigate: (path: string) => void }) {
  const [selected, setSelected] = useState('button');
  const [activeFramework, setActiveFramework] = useState<FrameworkId>('react');
  const [bgMode, setBgMode] = useState<'light' | 'dark' | 'dots'>('light');
  const [search, setSearch] = useState('');
  const [activePanel, setActivePanel] = useState<'preview' | 'code' | 'api'>('preview');

  const comp = components.find((c) => c.slug === selected);
  const DemoComp = demoMap[selected];
  const category = categories.find((c) => c.id === comp?.category);

  // Filter sidebar
  const q = search.toLowerCase();
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      items: components.filter(
        (c) => c.category === cat.id && (!q || c.name.toLowerCase().includes(q)),
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const previewBg = bgMode === 'dark'
    ? 'bg-zinc-900 dark'
    : bgMode === 'dots'
    ? 'bg-background bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] bg-[size:16px_16px]'
    : 'bg-background';

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Interactive Playground'
        description='Explore components across all 5 supported frameworks with live preview, code snippets, and API documentation.'
        badge={<Badge variant='success'>{components.length} components</Badge>}
      />

      <style>{`
        @media(min-width:1024px) {
          .adhar-pg-grid { height: calc(100vh - 200px); min-height: 500px; max-height: 850px; overflow: hidden; }
          .adhar-pg-col { height: 100%; overflow: hidden; }
        }
      `}</style>
      <div className='adhar-pg-grid rounded-xl border border-border/60 bg-card shadow-sm lg:grid lg:grid-cols-[260px_1fr]'>
        {/* ─── Sidebar ─── */}
        <div className='adhar-pg-col border-b lg:border-b-0 lg:border-r border-border/60 bg-muted/10 flex flex-col'>
          {/* Search */}
          <div className='p-3 border-b border-border/60'>
            <div className='relative'>
              <svg
                className='absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground'
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
                type='text'
                placeholder='Search components...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full h-8 pl-8 pr-3 rounded-md border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring'
              />
            </div>
          </div>

          {/* Component list */}
          <div className='flex-1 overflow-y-auto p-2 scrollbar-thin'>
            {filteredCategories.map((cat) => (
              <div key={cat.id} className='mb-1'>
                <div className='flex items-center gap-1.5 px-2 py-1.5'>
                  <NavIcon icon={cat.icon} />
                  <span className='text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex-1'>
                    {cat.label}
                  </span>
                  <span className='text-[9px] text-muted-foreground/50 tabular-nums'>{cat.items.length}</span>
                </div>
                {cat.items.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => {
                      setSelected(c.slug);
                      setActivePanel('preview');
                    }}
                    title={c.description}
                    className={`w-full text-left px-3 py-[5px] rounded-md text-[11px] flex items-center gap-2 ${
                      selected === c.slug
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full shrink-0 ${selected === c.slug ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                    <span className='flex-1 truncate'>{c.name}</span>
                    <span
                      className={`text-[8px] px-1 py-0.5 rounded font-medium shrink-0 ${
                        selected === c.slug
                          ? 'bg-primary/20 text-primary'
                          : c.tier === 1 ? 'badge-basic' : c.tier === 2 ? 'badge-advanced' : 'badge-enterprise'
                      }`}
                    >
                      {c.tier === 1 ? 'Basic' : c.tier === 2 ? 'Adv' : 'Ent'}
                    </span>
                  </button>
                ))}
              </div>
            ))}
            {filteredCategories.length === 0 && (
              <div className='text-center py-8 text-xs text-muted-foreground'>
                <p>No components found</p>
                <button onClick={() => setSearch('')} className='text-primary mt-1 hover:underline'>Clear</button>
              </div>
            )}
          </div>
        </div>

        {/* ─── Main Panel ─── */}
        {comp && (
          <div className='adhar-pg-col flex flex-col'>
            {/* Component Header */}
            <div className='border-b border-border/60 px-5 py-3 bg-muted/5'>
              <div className='flex items-center gap-3'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-0.5'>
                    <span className='text-[10px] text-muted-foreground inline-flex items-center gap-1'>
                      {category && <NavIcon icon={category.icon} />}
                      {category?.label}
                    </span>
                    <span className='text-muted-foreground/30 text-[10px]'>/</span>
                    <h2 className='text-sm font-semibold text-foreground'>{comp.name}</h2>
                    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                      comp.tier === 1 ? 'badge-basic' : comp.tier === 2 ? 'badge-advanced' : 'badge-enterprise'
                    }`}>
                      {comp.tier === 1 ? 'Basic' : comp.tier === 2 ? 'Advanced' : 'Enterprise'}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground truncate'>{comp.description}</p>
                </div>
                <div className='flex items-center gap-1.5 shrink-0'>
                  {comp.frameworks.slice(0, 5).map((fw) => (
                    <FrameworkLogo key={fw} id={fw} size={12} className='opacity-60' />
                  ))}
                  <span className='w-px h-4 bg-border mx-1' />
                  <button
                    onClick={() => navigate(`/components/detail/${comp.slug}`)}
                    className='text-[11px] text-primary hover:underline inline-flex items-center gap-1'
                  >
                    Docs
                    <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Panel Tabs */}
            <div className='border-b border-border/60 px-4 flex items-center gap-0 bg-muted/5 overflow-x-auto scrollbar-none'>
              {[
                { id: 'preview' as const, label: 'Preview' },
                { id: 'code' as const, label: 'Code' },
                { id: 'api' as const, label: 'API' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePanel(tab.id)}
                  className={`px-3.5 py-2.5 text-[11px] font-medium transition-colors relative whitespace-nowrap ${
                    activePanel === tab.id
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                  {activePanel === tab.id && (
                    <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full' />
                  )}
                </button>
              ))}

              {/* Background mode (only in preview) */}
              {activePanel === 'preview' && (
                <div className='ml-auto flex items-center gap-1.5'>
                  {(['light', 'dark', 'dots'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setBgMode(mode)}
                      title={`${mode} background`}
                      className={`w-5 h-5 rounded-sm transition-all border ${
                        bgMode === mode
                          ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
                          : 'hover:ring-1 hover:ring-border'
                      } ${
                        mode === 'light'
                          ? 'bg-white border-zinc-200'
                          : mode === 'dark'
                          ? 'bg-zinc-800 border-zinc-700'
                          : 'bg-white border-zinc-200 bg-[radial-gradient(#ccc_1px,transparent_1px)] bg-[size:4px_4px]'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className='flex-1 overflow-auto min-h-0'>
              {/* ─── Preview Panel ─── */}
              {activePanel === 'preview' && (
                <div className='p-6 space-y-6'>
                  {/* Live Preview */}
                  <div className='rounded-lg border border-border overflow-hidden'>
                    <div className='flex items-center gap-1.5 px-3.5 py-2 border-b border-border/60 bg-muted/20'>
                      <span className='w-2 h-2 rounded-full bg-red-400/50' />
                      <span className='w-2 h-2 rounded-full bg-yellow-400/50' />
                      <span className='w-2 h-2 rounded-full bg-green-400/50' />
                      <span className='flex-1 text-center text-[10px] text-muted-foreground/60 font-medium tracking-wider uppercase -ml-10'>
                        Preview
                      </span>
                    </div>
                    <div
                      className={`p-6 sm:p-8 min-h-[300px] flex items-start justify-center overflow-auto transition-colors ${previewBg}`}
                    >
                      <div className='w-full flex items-center justify-center py-4'>
                      {DemoComp ? <DemoComp /> : (
                        <div className='text-center text-muted-foreground'>
                          <p className='text-sm'>Live preview not available for this component.</p>
                          <p className='text-xs mt-1'>Check the Code tab for usage examples.</p>
                        </div>
                      )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Install */}
                  <div>
                    <h3 className='text-sm font-semibold text-foreground mb-3'>Installation</h3>
                    <InstallBlock component={comp.slug} />
                  </div>
                </div>
              )}

              {/* ─── Code Panel ─── */}
              {activePanel === 'code' && (
                <div className='p-5 space-y-5'>
                  {/* Install + Framework in a row */}
                  <div className='grid sm:grid-cols-[1fr_auto] gap-4 items-start'>
                    <div>
                      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Install</h3>
                      <InstallBlock component={comp.slug} />
                    </div>
                    <div>
                      <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Framework</h3>
                      <div className='flex flex-wrap gap-1'>
                        {frameworks.map((fw) => {
                          const supported = comp.frameworks.includes(fw.id);
                          return (
                            <button
                              key={fw.id}
                              title={fw.label}
                              onClick={() => supported && setActiveFramework(fw.id)}
                              disabled={!supported}
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] transition-all border ${
                                activeFramework === fw.id && supported
                                  ? 'border-primary bg-primary/10 text-primary font-medium'
                                  : supported
                                  ? 'border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                                  : 'border-border/50 text-muted-foreground/30 cursor-not-allowed'
                              }`}
                            >
                              <FrameworkLogo id={fw.id} size={12} className={!supported ? 'opacity-20 grayscale' : ''} />
                              <span className='hidden sm:inline'>{fw.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Import */}
                  <div>
                    <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2'>Import</h3>
                    <CodeBlock code={comp.importCode} language='tsx' />
                  </div>

                  {/* Code Block */}
                  <div>
                    <h3 className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2'>
                      {frameworks.find((f) => f.id === activeFramework)?.label} Example
                    </h3>
                    <CodeBlock
                      code={getFrameworkCode(comp, activeFramework)}
                      language={activeFramework === 'vue' || activeFramework === 'svelte' ? 'html' : 'tsx'}
                      showLineNumbers
                    />
                  </div>

                  {/* More Blocks */}
                  {comp.examples && comp.examples.length > 1 && (
                    <div>
                      <h3 className='text-sm font-semibold text-foreground mb-3'>More Blocks</h3>
                      <div className='space-y-4'>
                        {comp.examples.slice(1).map((ex, i) => (
                          <div key={i}>
                            <h4 className='text-xs font-medium text-muted-foreground mb-2'>
                              {ex.title}
                            </h4>
                            <CodeBlock code={ex.code} language='tsx' />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── API Panel ─── */}
              {activePanel === 'api' && (
                <div className='p-6 space-y-6'>
                  {/* Import */}
                  <div>
                    <h3 className='text-sm font-semibold text-foreground mb-3'>Import</h3>
                    <CodeBlock code={comp.importCode} language='tsx' />
                  </div>

                  {/* Props Table */}
                  {comp.props && comp.props.length > 0
                    ? (
                      <div>
                        <h3 className='text-sm font-semibold text-foreground mb-3'>Props</h3>
                        <div className='overflow-x-auto rounded-lg border border-border'>
                          <table className='w-full text-sm'>
                            <thead>
                              <tr className='border-b border-border bg-muted/50'>
                                <th className='text-left px-4 py-2.5 font-medium text-foreground text-xs'>
                                  Name
                                </th>
                                <th className='text-left px-4 py-2.5 font-medium text-foreground text-xs'>
                                  Type
                                </th>
                                <th className='text-left px-4 py-2.5 font-medium text-foreground text-xs'>
                                  Default
                                </th>
                                <th className='text-left px-4 py-2.5 font-medium text-foreground text-xs'>
                                  Description
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {comp.props.map((prop, i) => (
                                <tr
                                  key={prop.name}
                                  className={`border-b border-border last:border-0 ${
                                    i % 2 ? 'bg-muted/20' : ''
                                  }`}
                                >
                                  <td className='px-4 py-2.5 font-mono text-xs'>
                                    <span className='text-primary'>{prop.name}</span>
                                    {prop.required && (
                                      <span className='text-destructive ml-0.5'>*</span>
                                    )}
                                  </td>
                                  <td className='px-4 py-2.5 font-mono text-[11px] text-muted-foreground max-w-[200px]'>
                                    <code className='bg-muted rounded px-1 py-0.5 break-words'>
                                      {prop.type}
                                    </code>
                                  </td>
                                  <td className='px-4 py-2.5 font-mono text-[11px] text-muted-foreground'>
                                    <code className='bg-muted rounded px-1 py-0.5'>
                                      {prop.default}
                                    </code>
                                  </td>
                                  <td className='px-4 py-2.5 text-xs text-muted-foreground'>
                                    {prop.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                    : (
                      <Callout type='info'>
                        Detailed API documentation for this component is coming soon. Check the{' '}
                        <button
                          onClick={() => setActivePanel('code')}
                          className='text-primary hover:underline font-medium'
                        >
                          Code tab
                        </button>{' '}
                        for usage examples.
                      </Callout>
                    )}

                  {/* Dependencies */}
                  {comp.dependencies && comp.dependencies.length > 0 && (
                    <div>
                      <h3 className='text-sm font-semibold text-foreground mb-3'>Dependencies</h3>
                      <div className='flex flex-wrap gap-2'>
                        {comp.dependencies.map((dep) => (
                          <span
                            key={dep}
                            className='text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-mono'
                          >
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related */}
                  {comp.related && comp.related.length > 0 && (
                    <div>
                      <h3 className='text-sm font-semibold text-foreground mb-3'>
                        Related Components
                      </h3>
                      <div className='flex flex-wrap gap-2'>
                        {comp.related.map((slug) => {
                          const rel = components.find((c) => c.slug === slug);
                          return rel
                            ? (
                              <button
                                key={slug}
                                onClick={() => {
                                  setSelected(slug);
                                  setActivePanel('preview');
                                }}
                                className='text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-accent hover:border-primary/30 text-foreground transition-colors'
                              >
                                {rel.name}
                              </button>
                            )
                            : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
