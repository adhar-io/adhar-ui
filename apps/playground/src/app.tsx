import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as Demos from './demos/index.ts';

// ─── Data ────────────────────────────────────────────────────────────────────
interface DemoEntry { name: string; slug: string; component: React.ComponentType<any>; }
interface Section { id: string; label: string; icon: string; demos: DemoEntry[]; }

const sections: Section[] = [
  { id: 'form', label: 'Form Controls', icon: '📝', demos: [
    { name: 'Button', slug: 'button', component: Demos.ButtonDemo },
    { name: 'Input', slug: 'input', component: Demos.InputDemo },
    { name: 'Textarea', slug: 'textarea', component: Demos.TextareaDemo },
    { name: 'Label', slug: 'label', component: Demos.LabelDemo },
    { name: 'Checkbox', slug: 'checkbox', component: Demos.CheckboxDemo },
    { name: 'Radio Group', slug: 'radio-group', component: Demos.RadioGroupDemo },
    { name: 'Switch', slug: 'switch', component: Demos.SwitchDemo },
    { name: 'Select', slug: 'select', component: Demos.SelectDemo },
    { name: 'Slider', slug: 'slider', component: Demos.SliderDemo },
    { name: 'Toggle', slug: 'toggle', component: Demos.ToggleDemo },
    { name: 'Toggle Group', slug: 'toggle-group', component: Demos.ToggleGroupDemo },
  ]},
  { id: 'display', label: 'Display', icon: '🎨', demos: [
    { name: 'Badge', slug: 'badge', component: Demos.BadgeDemo },
    { name: 'Avatar', slug: 'avatar', component: Demos.AvatarDemo },
    { name: 'Separator', slug: 'separator', component: Demos.SeparatorDemo },
    { name: 'Skeleton', slug: 'skeleton', component: Demos.SkeletonDemo },
    { name: 'Progress', slug: 'progress', component: Demos.ProgressDemo },
    { name: 'Spinner', slug: 'spinner', component: Demos.SpinnerDemo },
    { name: 'Aspect Ratio', slug: 'aspect-ratio', component: Demos.AspectRatioDemo },
  ]},
  { id: 'layout', label: 'Layout & Feedback', icon: '📐', demos: [
    { name: 'Card', slug: 'card', component: Demos.CardDemo },
    { name: 'Scroll Area', slug: 'scroll-area', component: Demos.ScrollAreaDemo },
    { name: 'Collapsible', slug: 'collapsible', component: Demos.CollapsibleDemo },
    { name: 'Resizable', slug: 'resizable', component: Demos.ResizableDemo },
    { name: 'Alert', slug: 'alert', component: Demos.AlertDemo },
    { name: 'Alert Dialog', slug: 'alert-dialog', component: Demos.AlertDialogDemo },
    { name: 'Toast', slug: 'toast', component: Demos.ToastDemo },
  ]},
  { id: 'overlay', label: 'Overlay', icon: '🪟', demos: [
    { name: 'Dialog', slug: 'dialog', component: Demos.DialogDemo },
    { name: 'Sheet', slug: 'sheet', component: Demos.SheetDemo },
    { name: 'Tooltip', slug: 'tooltip', component: Demos.TooltipDemo },
    { name: 'Popover', slug: 'popover', component: Demos.PopoverDemo },
    { name: 'Hover Card', slug: 'hover-card', component: Demos.HoverCardDemo },
    { name: 'Drawer', slug: 'drawer', component: Demos.DrawerDemo },
  ]},
  { id: 'nav', label: 'Navigation', icon: '🧭', demos: [
    { name: 'Tabs', slug: 'tabs', component: Demos.TabsDemo },
    { name: 'Accordion', slug: 'accordion', component: Demos.AccordionDemo },
    { name: 'Dropdown Menu', slug: 'dropdown-menu', component: Demos.DropdownMenuDemo },
    { name: 'Context Menu', slug: 'context-menu', component: Demos.ContextMenuDemo },
    { name: 'Menubar', slug: 'menubar', component: Demos.MenubarDemo },
    { name: 'Navigation Menu', slug: 'nav-menu', component: Demos.NavigationMenuDemo },
    { name: 'Breadcrumb', slug: 'breadcrumb', component: Demos.BreadcrumbDemo },
    { name: 'Pagination', slug: 'pagination', component: Demos.PaginationDemo },
    { name: 'Sidebar', slug: 'sidebar', component: Demos.SidebarDemo },
  ]},
  { id: 'composite', label: 'Composite', icon: '🧩', demos: [
    { name: 'Command', slug: 'command', component: Demos.CommandDemo },
    { name: 'Combobox', slug: 'combobox', component: Demos.ComboboxDemo },
    { name: 'Date Picker', slug: 'date-picker', component: Demos.DatePickerDemo },
    { name: 'Calendar', slug: 'calendar', component: Demos.CalendarDemo },
    { name: 'Color Picker', slug: 'color-picker', component: Demos.ColorPickerDemo },
    { name: 'Form', slug: 'form', component: Demos.FormDemo },
    { name: 'Input OTP', slug: 'input-otp', component: Demos.InputOTPDemo },
    { name: 'Table', slug: 'table', component: Demos.TableDemo },
    { name: 'Carousel', slug: 'carousel', component: Demos.CarouselDemo },
    { name: 'Chart', slug: 'chart', component: Demos.ChartDemo },
    { name: 'Sonner', slug: 'sonner', component: Demos.SonnerDemo },
  ]},
  { id: 'enterprise', label: 'Enterprise', icon: '🏢', demos: [
    { name: 'Data Table', slug: 'data-table', component: Demos.DataTableDemo },
    { name: 'Data Grid', slug: 'data-grid', component: Demos.DataGridDemo },
    { name: 'List View', slug: 'list-view', component: Demos.ListViewDemo },
    { name: 'Grid View', slug: 'grid-view', component: Demos.GridViewDemo },
    { name: 'Detail View', slug: 'detail-view', component: Demos.DetailViewDemo },
    { name: 'Master Detail', slug: 'master-detail', component: Demos.MasterDetailDemo },
    { name: 'Form Builder', slug: 'form-builder', component: Demos.FormBuilderDemo },
    { name: 'File Upload', slug: 'file-upload', component: Demos.FileUploadDemo },
    { name: 'Rich Text Editor', slug: 'rich-text', component: Demos.RichTextEditorDemo },
    { name: 'Kanban Board', slug: 'kanban', component: Demos.KanbanBoardDemo },
    { name: 'Timeline', slug: 'timeline', component: Demos.TimelineDemo },
    { name: 'Tree View', slug: 'tree-view', component: Demos.TreeViewDemo },
    { name: 'Stepper', slug: 'stepper', component: Demos.StepperDemo },
    { name: 'Multi Select', slug: 'multi-select', component: Demos.MultiSelectDemo },
    { name: 'Tag Input', slug: 'tag-input', component: Demos.TagInputDemo },
    { name: 'Transfer List', slug: 'transfer-list', component: Demos.TransferListDemo },
    { name: 'Sortable List', slug: 'sortable-list', component: Demos.SortableListDemo },
    { name: 'Property List', slug: 'property-list', component: Demos.PropertyListDemo },
    { name: 'Description List', slug: 'desc-list', component: Demos.DescriptionListDemo },
    { name: 'Empty State', slug: 'empty-state', component: Demos.EmptyStateDemo },
    { name: 'Stat Card', slug: 'stat-card', component: Demos.StatCardDemo },
    { name: 'Kbd', slug: 'kbd', component: Demos.KbdDemo },
    { name: 'Copy Button', slug: 'copy-button', component: Demos.CopyButtonDemo },
    { name: 'Command Bar', slug: 'command-bar', component: Demos.CommandBarDemo },
    { name: 'Notification Center', slug: 'notifications', component: Demos.NotificationCenterDemo },
    { name: 'Infinite Scroll', slug: 'infinite-scroll', component: Demos.InfiniteScrollDemo },
    { name: 'Virtualized List', slug: 'virtualized-list', component: Demos.VirtualizedListDemo },
  ]},
  { id: 'ai', label: 'AI Components', icon: '🤖', demos: [
    { name: 'Chat', slug: 'chat', component: Demos.ChatDemo },
    { name: 'Prompt Input', slug: 'prompt-input', component: Demos.PromptInputDemo },
    { name: 'Streaming Text', slug: 'streaming-text', component: Demos.StreamingTextDemo },
    { name: 'Code Block', slug: 'code-block', component: Demos.CodeBlockDemo },
    { name: 'Model Selector', slug: 'model-selector', component: Demos.ModelSelectorDemo },
    { name: 'Token Counter', slug: 'token-counter', component: Demos.TokenCounterDemo },
    { name: 'Thinking Indicator', slug: 'thinking', component: Demos.ThinkingIndicatorDemo },
    { name: 'Feedback Buttons', slug: 'feedback', component: Demos.FeedbackButtonsDemo },
    { name: 'Suggestion Chips', slug: 'suggestions', component: Demos.SuggestionChipsDemo },
    { name: 'Message Bubble', slug: 'message-bubble', component: Demos.MessageBubbleDemo },
  ]},
  { id: 'blocks', label: 'Blocks', icon: '🧱', demos: [
    { name: 'Login Page', slug: 'block-login', component: Demos.BlockLoginDemo },
    { name: 'Dashboard', slug: 'block-dashboard', component: Demos.BlockDashboardDemo },
    { name: 'Hero Section', slug: 'block-hero', component: Demos.BlockHeroDemo },
    { name: 'Pricing Table', slug: 'block-pricing', component: Demos.BlockPricingDemo },
    { name: 'Settings Page', slug: 'block-settings', component: Demos.BlockSettingsDemo },
    { name: 'Error Pages', slug: 'block-error', component: Demos.BlockErrorDemo },
    { name: 'Chat Page', slug: 'block-chat', component: Demos.BlockChatPageDemo },
    { name: 'Product Grid', slug: 'block-product', component: Demos.BlockProductDemo },
    { name: 'Checkout', slug: 'block-checkout', component: Demos.BlockCheckoutDemo },
  ]},
];

const allDemos = sections.flatMap((s) => s.demos.map((d) => ({ ...d, section: s })));
const totalDemos = allDemos.length;

// ─── App ─────────────────────────────────────────────────────────────────────
export function App() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [previewBg, setPreviewBg] = useState<'white' | 'dots' | 'dark'>('white');
  const searchRef = useRef<HTMLInputElement>(null);

  // Hash-based routing
  useEffect(() => {
    const handleHash = () => {
      const slug = window.location.hash.slice(1);
      if (slug) setActiveSlug(slug);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Keyboard shortcut: Cmd+K to focus search
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === 'Escape') { setSearch(''); searchRef.current?.blur(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;
    const q = search.toLowerCase();
    return sections.map((s) => ({ ...s, demos: s.demos.filter((d) => d.name.toLowerCase().includes(q) || d.slug.includes(q)) })).filter((s) => s.demos.length > 0);
  }, [search]);

  const activeDemo = activeSlug ? allDemos.find((d) => d.slug === activeSlug) : null;
  const ActiveComponent = activeDemo?.component;

  function navigateTo(slug: string) {
    setActiveSlug(slug);
    window.location.hash = slug;
    setSidebarOpen(false); // close on mobile
  }

  function toggleSection(id: string) {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // Find prev/next for navigation
  const currentIdx = activeDemo ? allDemos.indexOf(activeDemo) : -1;
  const prevDemo = currentIdx > 0 ? allDemos[currentIdx - 1] : null;
  const nextDemo = currentIdx < allDemos.length - 1 ? allDemos[currentIdx + 1] : null;

  return (
    <div className={dark ? 'dark' : ''}>
      <div className='h-screen flex flex-col bg-background text-foreground overflow-hidden'>
        {/* ═══ Header ═══ */}
        <header className='h-12 border-b border-border bg-card/80 backdrop-blur-xl flex items-center px-3 gap-3 shrink-0 z-50'>
          {/* Mobile menu */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className='h-7 w-7 rounded-md flex items-center justify-center hover:bg-accent md:hidden'>
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>

          {/* Brand */}
          <div className='flex items-center gap-2'>
            <div className='h-6 w-6 rounded-md bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center'>A</div>
            <span className='text-sm font-semibold tracking-tight'>Playground</span>
          </div>

          {/* Search */}
          <div className='flex-1 max-w-md mx-4 hidden md:block'>
            <div className='relative'>
              <svg className='absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
              <input ref={searchRef} type='text' value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${totalDemos} components...`}
                className='h-8 w-full rounded-md border border-border bg-muted/40 pl-8 pr-16 text-sm placeholder:text-muted-foreground/40 focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring transition-colors' />
              <kbd className='absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-muted border border-border/50 text-[9px] text-muted-foreground/50 font-mono'>
                {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}K
              </kbd>
            </div>
          </div>

          <div className='ml-auto flex items-center gap-1.5'>
            <span className='hidden sm:inline text-[10px] text-muted-foreground/50 tabular-nums'>{totalDemos} components</span>
            <button onClick={() => setDark(!dark)} className='h-7 w-7 rounded-md border border-border flex items-center justify-center hover:bg-accent transition-colors' title={dark ? 'Light' : 'Dark'}>
              {dark
                ? <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><circle cx='12' cy='12' r='5' /><path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' /></svg>
                : <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' /></svg>
              }
            </button>
          </div>
        </header>

        {/* ═══ Body ═══ */}
        <div className='flex-1 flex overflow-hidden'>
          {/* ─── Sidebar ─── */}
          <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-12 left-0 z-40 w-56 border-r border-border bg-card transition-transform duration-200 md:static md:translate-x-0 md:z-0 overflow-hidden flex flex-col shrink-0`}>
            {/* Mobile search */}
            <div className='p-2 border-b border-border/50 md:hidden'>
              <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...'
                className='h-7 w-full rounded-md border border-border bg-muted/40 px-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring' />
            </div>

            <div className='flex-1 overflow-y-auto py-2 px-1.5' style={{ scrollbarWidth: 'thin' }}>
              {filteredSections.map((sec) => {
                const isCollapsed = collapsedSections.has(sec.id);
                return (
                  <div key={sec.id} className='mb-0.5'>
                    <button onClick={() => toggleSection(sec.id)}
                      className='w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors'>
                      <svg className={`w-3 h-3 transition-transform ${isCollapsed ? '' : 'rotate-90'}`} fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                      </svg>
                      <span>{sec.icon}</span>
                      <span className='flex-1 text-left'>{sec.label}</span>
                      <span className='text-[9px] font-normal text-muted-foreground/40 tabular-nums'>{sec.demos.length}</span>
                    </button>
                    {!isCollapsed && (
                      <div className='ml-4 mt-0.5 mb-1 border-l border-border/40 pl-2 space-y-px'>
                        {sec.demos.map((d) => (
                          <button key={d.slug} onClick={() => navigateTo(d.slug)}
                            className={`w-full text-left px-2 py-[5px] rounded-md text-[12px] transition-colors truncate ${activeSlug === d.slug ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'}`}>
                            {d.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Mobile backdrop */}
          {sidebarOpen && <div className='fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden' onClick={() => setSidebarOpen(false)} />}

          {/* ─── Main Content ─── */}
          <main className='flex-1 flex flex-col overflow-hidden'>
            {!activeDemo ? (
              /* ═══ Welcome / Grid View ═══ */
              <div className='flex-1 overflow-y-auto' style={{ scrollbarWidth: 'thin' }}>
                <div className='max-w-5xl mx-auto px-6 py-10'>
                  <div className='text-center mb-10'>
                    <h1 className='text-3xl font-bold tracking-tight mb-2'>Component Playground</h1>
                    <p className='text-muted-foreground'>Explore {totalDemos} interactive components. Click any to open its preview.</p>
                  </div>

                  {filteredSections.map((sec) => (
                    <div key={sec.id} className='mb-8'>
                      <div className='flex items-center gap-2 mb-3'>
                        <span className='text-lg'>{sec.icon}</span>
                        <h2 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>{sec.label}</h2>
                        <span className='text-[10px] text-muted-foreground/40'>{sec.demos.length}</span>
                      </div>
                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
                        {sec.demos.map((d) => (
                          <button key={d.slug} onClick={() => navigateTo(d.slug)}
                            className='group text-left p-3 rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all'>
                            <div className='text-sm font-medium text-foreground group-hover:text-primary transition-colors'>{d.name}</div>
                            <div className='text-[10px] text-muted-foreground/50 mt-0.5'>{sec.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {filteredSections.length === 0 && (
                    <div className='text-center py-20'>
                      <div className='text-4xl mb-3'>0</div>
                      <p className='text-muted-foreground text-sm'>No components match "{search}"</p>
                      <button onClick={() => setSearch('')} className='mt-3 px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90'>Clear</button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* ═══ Component Detail View ═══ */
              <>
                {/* Detail header bar */}
                <div className='h-10 border-b border-border bg-card/50 flex items-center px-4 gap-3 shrink-0'>
                  <button onClick={() => { setActiveSlug(null); window.location.hash = ''; }} className='h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors'>
                    <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
                    </svg>
                  </button>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs text-muted-foreground'>{activeDemo.section.icon} {activeDemo.section.label}</span>
                    <svg className='w-3 h-3 text-muted-foreground/30' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M9 5l7 7-7 7' /></svg>
                    <h2 className='text-sm font-semibold'>{activeDemo.name}</h2>
                  </div>
                  <div className='flex-1' />
                  {/* Background toggle */}
                  <div className='flex items-center gap-px bg-muted/50 rounded p-0.5 border border-border/40'>
                    {([{ k: 'white', l: 'Light' }, { k: 'dots', l: 'Dots' }, { k: 'dark', l: 'Dark' }] as const).map((bg) => (
                      <button key={bg.k} onClick={() => setPreviewBg(bg.k as any)} title={bg.l}
                        className={`px-2 py-0.5 text-[9px] rounded font-medium ${previewBg === bg.k ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                        {bg.l}
                      </button>
                    ))}
                  </div>
                  {/* Prev / Next */}
                  <div className='flex items-center gap-1'>
                    <button disabled={!prevDemo} onClick={() => prevDemo && navigateTo(prevDemo.slug)}
                      className='h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-20 transition-colors' title={prevDemo?.name}>
                      <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M15 19l-7-7 7-7' /></svg>
                    </button>
                    <span className='text-[9px] text-muted-foreground/40 tabular-nums min-w-[36px] text-center'>{currentIdx + 1}/{totalDemos}</span>
                    <button disabled={!nextDemo} onClick={() => nextDemo && navigateTo(nextDemo.slug)}
                      className='h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-20 transition-colors' title={nextDemo?.name}>
                      <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' d='M9 5l7 7-7 7' /></svg>
                    </button>
                  </div>
                </div>

                {/* Component preview area */}
                <div className={`flex-1 overflow-auto ${
                  previewBg === 'dark' ? 'bg-zinc-950' :
                  previewBg === 'dots' ? 'bg-[#f8f8fa] bg-[radial-gradient(#e0e0e4_1px,transparent_1px)] bg-[size:20px_20px]' :
                  'bg-background'
                }`}>
                  <div className='min-h-full flex items-start justify-center p-8'>
                    <div className='w-full max-w-3xl'>
                      <div className='rounded-xl border border-border bg-card shadow-sm overflow-hidden'>
                        <div className='px-5 py-3 border-b border-border/60 flex items-center gap-2'>
                          <div className='flex gap-1.5'>
                            <div className='w-2.5 h-2.5 rounded-full bg-red-400/60' />
                            <div className='w-2.5 h-2.5 rounded-full bg-yellow-400/60' />
                            <div className='w-2.5 h-2.5 rounded-full bg-green-400/60' />
                          </div>
                          <span className='text-[11px] text-muted-foreground/50 font-mono ml-2'>{activeDemo.name}</span>
                        </div>
                        <div className='p-8'>
                          {ActiveComponent && <ActiveComponent />}
                        </div>
                      </div>

                      {/* Install hint */}
                      <div className='mt-4 rounded-lg border border-border/50 bg-card/50 px-4 py-3 flex items-center gap-3'>
                        <span className='text-[10px] text-muted-foreground/40 uppercase tracking-wider font-medium shrink-0'>Install</span>
                        <code className='text-[12px] font-mono text-muted-foreground flex-1 truncate'>npx @adhar-ui/cli add {activeDemo.slug}</code>
                        <button onClick={() => navigator.clipboard.writeText(`npx @adhar-ui/cli add ${activeDemo.slug}`)}
                          className='text-[10px] text-muted-foreground hover:text-foreground transition-colors shrink-0'>Copy</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
