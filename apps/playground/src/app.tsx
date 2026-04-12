import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import * as Demos from './demos/index.ts';

const sections = [
  {
    id: 'form',
    label: 'Form Controls',
    demos: [
      { name: 'Button', component: Demos.ButtonDemo },
      { name: 'Input', component: Demos.InputDemo },
      { name: 'Textarea', component: Demos.TextareaDemo },
      { name: 'Label', component: Demos.LabelDemo },
      { name: 'Checkbox', component: Demos.CheckboxDemo },
      { name: 'Radio Group', component: Demos.RadioGroupDemo },
      { name: 'Switch', component: Demos.SwitchDemo },
      { name: 'Select', component: Demos.SelectDemo },
      { name: 'Slider', component: Demos.SliderDemo },
      { name: 'Toggle', component: Demos.ToggleDemo },
      { name: 'Toggle Group', component: Demos.ToggleGroupDemo },
    ],
  },
  {
    id: 'display',
    label: 'Display',
    demos: [
      { name: 'Badge', component: Demos.BadgeDemo },
      { name: 'Avatar', component: Demos.AvatarDemo },
      { name: 'Separator', component: Demos.SeparatorDemo },
      { name: 'Skeleton', component: Demos.SkeletonDemo },
      { name: 'Progress', component: Demos.ProgressDemo },
      { name: 'Spinner', component: Demos.SpinnerDemo },
      { name: 'Aspect Ratio', component: Demos.AspectRatioDemo },
    ],
  },
  {
    id: 'layout',
    label: 'Layout & Feedback',
    demos: [
      { name: 'Card', component: Demos.CardDemo },
      { name: 'Scroll Area', component: Demos.ScrollAreaDemo },
      { name: 'Collapsible', component: Demos.CollapsibleDemo },
      { name: 'Resizable', component: Demos.ResizableDemo },
      { name: 'Alert', component: Demos.AlertDemo },
      { name: 'Alert Dialog', component: Demos.AlertDialogDemo },
      { name: 'Toast', component: Demos.ToastDemo },
    ],
  },
  {
    id: 'overlay',
    label: 'Overlay',
    demos: [
      { name: 'Dialog', component: Demos.DialogDemo },
      { name: 'Sheet', component: Demos.SheetDemo },
      { name: 'Tooltip', component: Demos.TooltipDemo },
      { name: 'Popover', component: Demos.PopoverDemo },
      { name: 'Hover Card', component: Demos.HoverCardDemo },
      { name: 'Drawer', component: Demos.DrawerDemo },
    ],
  },
  {
    id: 'nav',
    label: 'Navigation',
    demos: [
      { name: 'Tabs', component: Demos.TabsDemo },
      { name: 'Accordion', component: Demos.AccordionDemo },
      { name: 'Dropdown Menu', component: Demos.DropdownMenuDemo },
      { name: 'Context Menu', component: Demos.ContextMenuDemo },
      { name: 'Menubar', component: Demos.MenubarDemo },
      { name: 'Navigation Menu', component: Demos.NavigationMenuDemo },
      { name: 'Breadcrumb', component: Demos.BreadcrumbDemo },
      { name: 'Pagination', component: Demos.PaginationDemo },
      { name: 'Sidebar', component: Demos.SidebarDemo },
    ],
  },
  {
    id: 'composite',
    label: 'Composite',
    demos: [
      { name: 'Command', component: Demos.CommandDemo },
      { name: 'Combobox', component: Demos.ComboboxDemo },
      { name: 'Date Picker', component: Demos.DatePickerDemo },
      { name: 'Calendar', component: Demos.CalendarDemo },
      { name: 'Color Picker', component: Demos.ColorPickerDemo },
      { name: 'Form', component: Demos.FormDemo },
      { name: 'Input OTP', component: Demos.InputOTPDemo },
      { name: 'Table', component: Demos.TableDemo },
      { name: 'Carousel', component: Demos.CarouselDemo },
      { name: 'Chart', component: Demos.ChartDemo },
      { name: 'Sonner', component: Demos.SonnerDemo },
    ],
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    demos: [
      { name: 'Data Table', component: Demos.DataTableDemo },
      { name: 'Data Grid', component: Demos.DataGridDemo },
      { name: 'List View', component: Demos.ListViewDemo },
      { name: 'Grid View', component: Demos.GridViewDemo },
      { name: 'Detail View', component: Demos.DetailViewDemo },
      { name: 'Master Detail', component: Demos.MasterDetailDemo },
      { name: 'Form Builder', component: Demos.FormBuilderDemo },
      { name: 'File Upload', component: Demos.FileUploadDemo },
      { name: 'Rich Text Editor', component: Demos.RichTextEditorDemo },
      { name: 'Kanban Board', component: Demos.KanbanBoardDemo },
      { name: 'Timeline', component: Demos.TimelineDemo },
      { name: 'Tree View', component: Demos.TreeViewDemo },
      { name: 'Stepper', component: Demos.StepperDemo },
      { name: 'Multi Select', component: Demos.MultiSelectDemo },
      { name: 'Tag Input', component: Demos.TagInputDemo },
      { name: 'Transfer List', component: Demos.TransferListDemo },
      { name: 'Sortable List', component: Demos.SortableListDemo },
      { name: 'Property List', component: Demos.PropertyListDemo },
      { name: 'Description List', component: Demos.DescriptionListDemo },
      { name: 'Empty State', component: Demos.EmptyStateDemo },
      { name: 'Stat Card', component: Demos.StatCardDemo },
      { name: 'Kbd', component: Demos.KbdDemo },
      { name: 'Copy Button', component: Demos.CopyButtonDemo },
      { name: 'Command Bar', component: Demos.CommandBarDemo },
      { name: 'Notification Center', component: Demos.NotificationCenterDemo },
      { name: 'Infinite Scroll', component: Demos.InfiniteScrollDemo },
      { name: 'Virtualized List', component: Demos.VirtualizedListDemo },
    ],
  },
  {
    id: 'ai',
    label: 'AI Components',
    demos: [
      { name: 'Chat', component: Demos.ChatDemo },
      { name: 'Prompt Input', component: Demos.PromptInputDemo },
      { name: 'Streaming Text', component: Demos.StreamingTextDemo },
      { name: 'Code Block', component: Demos.CodeBlockDemo },
      { name: 'Model Selector', component: Demos.ModelSelectorDemo },
      { name: 'Token Counter', component: Demos.TokenCounterDemo },
      { name: 'Thinking Indicator', component: Demos.ThinkingIndicatorDemo },
      { name: 'Feedback Buttons', component: Demos.FeedbackButtonsDemo },
      { name: 'Suggestion Chips', component: Demos.SuggestionChipsDemo },
      { name: 'Message Bubble', component: Demos.MessageBubbleDemo },
    ],
  },
  {
    id: 'blocks',
    label: 'Blocks',
    demos: [
      { name: 'Login Page', component: Demos.BlockLoginDemo },
      { name: 'Dashboard', component: Demos.BlockDashboardDemo },
      { name: 'Hero Section', component: Demos.BlockHeroDemo },
      { name: 'Pricing Table', component: Demos.BlockPricingDemo },
      { name: 'Settings Page', component: Demos.BlockSettingsDemo },
      { name: 'Error Pages', component: Demos.BlockErrorDemo },
      { name: 'Chat Page', component: Demos.BlockChatPageDemo },
      { name: 'Product Grid', component: Demos.BlockProductDemo },
      { name: 'Checkout', component: Demos.BlockCheckoutDemo },
    ],
  },
];

const totalDemos = sections.reduce((s, sec) => s + sec.demos.length, 0);

const sectionIcons: Record<string, string> = {
  form: '📝',
  display: '🎨',
  layout: '📐',
  overlay: '🪟',
  nav: '🧭',
  composite: '🧩',
  enterprise: '🏢',
  ai: '🤖',
  blocks: '🧱',
};

export function App() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [activeSection, setActiveSection] = useState('form');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedDemo, setExpandedDemo] = useState<string | null>(null);

  // Filter demos based on search
  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;
    const q = search.toLowerCase();
    return sections
      .map((sec) => ({
        ...sec,
        demos: sec.demos.filter((d) => d.name.toLowerCase().includes(q)),
      }))
      .filter((sec) => sec.demos.length > 0);
  }, [search]);

  const filteredCount = filteredSections.reduce((s, sec) => s + sec.demos.length, 0);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );
    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className={dark ? 'dark' : ''}>
      <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
        {/* Header */}
        <header className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60'>
          <div className='mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4 md:px-6'>
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent md:hidden'
            >
              <svg
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>

            {/* Brand */}
            <div className='flex items-center gap-2.5'>
              <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold'>
                A
              </div>
              <h1 className='text-sm font-semibold tracking-tight'>Adhar UI</h1>
              <span className='rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary'>
                Playground
              </span>
            </div>

            {/* Search (desktop) */}
            <div className='ml-4 hidden flex-1 md:block max-w-md'>
              <div className='relative'>
                <svg
                  className='absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground'
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
                  placeholder={`Search ${totalDemos} components...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='h-8 w-full rounded-md border border-border bg-muted/50 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring transition-colors'
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                  >
                    <svg
                      className='h-3.5 w-3.5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className='ml-auto flex items-center gap-2'>
              {/* Demo count pill */}
              <span className='hidden items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground sm:inline-flex'>
                <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                {search ? `${filteredCount} / ${totalDemos}` : `${totalDemos} demos`}
              </span>

              {/* Theme toggle */}
              <button
                onClick={() => setDark(!dark)}
                className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent transition-colors'
                title={dark ? 'Light mode' : 'Dark mode'}
              >
                {dark
                  ? (
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <circle cx='12' cy='12' r='5' />
                      <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
                    </svg>
                  )
                  : (
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
                    </svg>
                  )}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className='border-t border-border px-4 pb-2 pt-2 md:hidden'>
            <div className='relative'>
              <svg
                className='absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground'
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
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='h-8 w-full rounded-md border border-border bg-muted/50 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring'
              />
            </div>
          </div>
        </header>

        <div className='mx-auto flex max-w-screen-2xl'>
          {/* Sidebar */}
          <nav
            className={cn(
              'fixed inset-y-0 left-0 z-40 w-60 shrink-0 transform border-r border-border bg-background pt-14 transition-transform duration-200 ease-out md:sticky md:top-14 md:z-0 md:h-[calc(100vh-3.5rem)] md:translate-x-0',
              sidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full',
            )}
          >
            <div className='flex h-full flex-col overflow-y-auto px-3 py-4 scrollbar-thin'>
              {(search ? filteredSections : sections).map((sec) => (
                <div key={sec.id} className='mb-4'>
                  <button
                    onClick={() => {
                      setActiveSection(sec.id);
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      'mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors',
                      activeSection === sec.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                    )}
                  >
                    <span>{sectionIcons[sec.id] || '•'}</span>
                    {sec.label}
                    <span className='ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground'>
                      {sec.demos.length}
                    </span>
                  </button>
                  <div className='ml-6 space-y-0.5'>
                    {sec.demos.slice(0, 5).map((d) => (
                      <button
                        key={d.name}
                        onClick={() => {
                          const el = document.getElementById(`demo-${sec.id}-${d.name}`);
                          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          setSidebarOpen(false);
                        }}
                        className='block w-full truncate text-left text-[11px] text-muted-foreground/70 hover:text-foreground transition-colors py-0.5'
                      >
                        {d.name}
                      </button>
                    ))}
                    {sec.demos.length > 5 && (
                      <span className='block text-[10px] text-muted-foreground/50 py-0.5'>
                        +{sec.demos.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Backdrop */}
          {sidebarOpen && (
            <div
              className='fixed inset-0 z-30 bg-background/50 backdrop-blur-sm md:hidden'
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className='flex-1 px-4 py-8 md:px-8 lg:px-12'>
            {filteredSections.length === 0 && (
              <div className='flex flex-col items-center justify-center py-24 text-center'>
                <div className='mb-4 text-4xl'>🔍</div>
                <h3 className='text-lg font-semibold'>No results found</h3>
                <p className='mt-1 text-sm text-muted-foreground'>Try a different search term</p>
                <button
                  onClick={() => setSearch('')}
                  className='mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors'
                >
                  Clear search
                </button>
              </div>
            )}

            {filteredSections.map((sec) => (
              <section key={sec.id} id={sec.id} className='mb-16'>
                <div className='mb-6 flex items-center gap-3'>
                  <span className='text-2xl'>{sectionIcons[sec.id]}</span>
                  <div>
                    <h2 className='text-xl font-bold tracking-tight'>{sec.label}</h2>
                    <p className='text-xs text-muted-foreground'>{sec.demos.length} components</p>
                  </div>
                </div>

                <div className='grid gap-4'>
                  {sec.demos.map((demo) => {
                    const demoId = `demo-${sec.id}-${demo.name}`;
                    const isExpanded = expandedDemo === demoId;
                    return (
                      <div
                        key={demo.name}
                        id={demoId}
                        className='group rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-md hover:border-primary/20'
                      >
                        <div
                          className='flex cursor-pointer items-center justify-between border-b border-border px-5 py-3'
                          onClick={() => setExpandedDemo(isExpanded ? null : demoId)}
                        >
                          <div className='flex items-center gap-2.5'>
                            <h3 className='text-sm font-semibold'>{demo.name}</h3>
                            <span className='rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground'>
                              Component
                            </span>
                          </div>
                          <svg
                            className={cn(
                              'h-4 w-4 text-muted-foreground transition-transform duration-200',
                              isExpanded && 'rotate-180',
                            )}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                          </svg>
                        </div>
                        <div
                          className={cn(
                            'overflow-hidden transition-all duration-200',
                            isExpanded ? 'max-h-none' : 'max-h-[400px]',
                          )}
                        >
                          <div className='p-6'>
                            <demo.component />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* Footer */}
            <footer className='mt-16 border-t border-border pt-6 pb-8 text-center'>
              <p className='text-xs text-muted-foreground'>
                Adhar UI — {totalDemos} component demos across {sections.length} categories
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
