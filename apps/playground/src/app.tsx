import React, { useState } from 'react';
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

export function App() {
  const [dark, setDark] = useState(false);
  const [activeSection, setActiveSection] = useState('form');

  return (
    <div className={dark ? 'dark' : ''}>
      <div className='min-h-screen bg-background text-foreground'>
        <header className='sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
          <div className='container mx-auto flex h-14 items-center px-4'>
            <h1 className='text-lg font-bold'>Adhar UI Playground</h1>
            <span className='ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'>
              v0.1.0
            </span>
            <div className='ml-auto flex items-center gap-3'>
              <span className='text-xs text-muted-foreground'>{totalDemos} demos</span>
              <button
                onClick={() => setDark(!dark)}
                className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-input hover:bg-accent'
              >
                {dark ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>

        <div className='container mx-auto flex'>
          <nav className='sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r py-6 pr-4 md:block'>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  'mb-1 flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent',
                  activeSection === sec.id ? 'bg-accent font-medium' : 'text-muted-foreground',
                )}
              >
                {sec.label}
                <span className='text-xs text-muted-foreground'>{sec.demos.length}</span>
              </button>
            ))}
          </nav>

          <main className='flex-1 px-4 py-8 md:px-8'>
            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className='mb-16'>
                <h2 className='mb-6 text-2xl font-bold tracking-tight'>{sec.label}</h2>
                <div className='grid gap-6'>
                  {sec.demos.map((demo) => (
                    <div key={demo.name} className='rounded-lg border'>
                      <div className='border-b px-4 py-3'>
                        <h3 className='text-sm font-semibold'>{demo.name}</h3>
                      </div>
                      <div className='p-6'>
                        <demo.component />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
