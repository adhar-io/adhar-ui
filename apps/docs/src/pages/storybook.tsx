import React, { useState } from 'react';
import { Badge, CodeBlock, PageHeader } from '../components/ui.tsx';
import * as Demos from '../components/demo-components.tsx';
import { NavIcon } from '../components/icons.tsx';

interface StoryControl {
  name: string;
  type: 'select' | 'boolean' | 'text' | 'number';
  options?: string[];
  defaultValue: any;
}

interface StoryItem {
  id: string;
  name: string;
  description: string;
  Demo: React.ComponentType<any>;
  controls?: StoryControl[];
}

interface StoryCategory {
  id: string;
  label: string;
  icon: string;
  stories: StoryItem[];
}

const commonControls: Record<string, StoryControl[]> = {
  button: [
    { name: 'variant', type: 'select', options: ['default', 'secondary', 'outline', 'destructive', 'ghost', 'link'], defaultValue: 'default' },
    { name: 'size', type: 'select', options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon'], defaultValue: 'default' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
    { name: 'loading', type: 'boolean', defaultValue: false },
    { name: 'children', type: 'text', defaultValue: 'Click me' },
  ],
  badge: [
    { name: 'variant', type: 'select', options: ['default', 'secondary', 'destructive', 'outline'], defaultValue: 'default' },
    { name: 'children', type: 'text', defaultValue: 'Badge' },
  ],
  input: [
    { name: 'type', type: 'select', options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel'], defaultValue: 'text' },
    { name: 'placeholder', type: 'text', defaultValue: 'Type here...' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
  alert: [
    { name: 'variant', type: 'select', options: ['default', 'destructive'], defaultValue: 'default' },
    { name: 'title', type: 'text', defaultValue: 'Heads up!' },
  ],
  progress: [
    { name: 'value', type: 'number', defaultValue: 66 },
  ],
  avatar: [
    { name: 'size', type: 'select', options: ['sm', 'default', 'lg'], defaultValue: 'default' },
    { name: 'fallback', type: 'text', defaultValue: 'AU' },
  ],
  switch: [
    { name: 'checked', type: 'boolean', defaultValue: false },
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
  checkbox: [
    { name: 'checked', type: 'boolean', defaultValue: false },
    { name: 'disabled', type: 'boolean', defaultValue: false },
    { name: 'label', type: 'text', defaultValue: 'Accept terms' },
  ],
  spinner: [
    { name: 'size', type: 'select', options: ['sm', 'default', 'lg'], defaultValue: 'default' },
  ],
  slider: [
    { name: 'value', type: 'number', defaultValue: 50 },
    { name: 'min', type: 'number', defaultValue: 0 },
    { name: 'max', type: 'number', defaultValue: 100 },
  ],
  textarea: [
    { name: 'placeholder', type: 'text', defaultValue: 'Write your message...' },
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
  select: [
    { name: 'placeholder', type: 'text', defaultValue: 'Select framework...' },
  ],
  // Feedback & Overlay
  toast: [
    { name: 'variant', type: 'select', options: ['default', 'success', 'error'], defaultValue: 'default' },
    { name: 'title', type: 'text', defaultValue: 'Event created' },
    { name: 'description', type: 'text', defaultValue: 'Friday, March 14 at 3:00 PM' },
  ],
  dialog: [
    { name: 'title', type: 'text', defaultValue: 'Are you sure?' },
    { name: 'description', type: 'text', defaultValue: 'This action cannot be undone.' },
  ],
  'alert-dialog': [
    { name: 'title', type: 'text', defaultValue: 'Delete Account' },
  ],
  tooltip: [
    { name: 'content', type: 'text', defaultValue: 'Add to library' },
  ],
  'hover-card': [
    { name: 'children', type: 'text', defaultValue: '@adhar-ui' },
  ],
  popover: [
    { name: 'children', type: 'text', defaultValue: 'Open Popover' },
  ],
  sheet: [
    { name: 'children', type: 'text', defaultValue: 'Open Sheet' },
  ],
  drawer: [
    { name: 'children', type: 'text', defaultValue: 'Open Drawer' },
  ],
  'bottom-sheet': [
    { name: 'children', type: 'text', defaultValue: 'Open Sheet' },
  ],
  'dropdown-menu': [
    { name: 'children', type: 'text', defaultValue: 'Options' },
  ],
  'context-menu': [
    { name: 'children', type: 'text', defaultValue: 'Right-click here' },
  ],
  'copy-button': [
    { name: 'children', type: 'text', defaultValue: 'npm install @adhar-ui/react' },
  ],

  // Layout & Navigation
  card: [
    { name: 'title', type: 'text', defaultValue: 'Project Alpha' },
    { name: 'description', type: 'text', defaultValue: 'A modern dashboard with analytics.' },
  ],
  tabs: [
    { name: 'defaultTab', type: 'number', defaultValue: 0 },
  ],
  accordion: [
    { name: 'children', type: 'text', defaultValue: 'Is it accessible?' },
  ],
  collapsible: [
    { name: 'children', type: 'text', defaultValue: '@adhar-ui/primitives' },
  ],
  'scroll-area': [
    { name: 'children', type: 'text', defaultValue: 'Tags' },
  ],
  separator: [
    { name: 'orientation', type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
  ],
  breadcrumb: [
    { name: 'children', type: 'text', defaultValue: 'Breadcrumb' },
  ],
  pagination: [
    { name: 'page', type: 'number', defaultValue: 3 },
  ],
  menubar: [
    { name: 'children', type: 'text', defaultValue: 'File' },
  ],
  'navigation-menu': [
    { name: 'children', type: 'text', defaultValue: 'Getting Started' },
  ],
  sidebar: [
    { name: 'children', type: 'text', defaultValue: 'Navigation' },
  ],
  'responsive-sidebar': [
    { name: 'children', type: 'text', defaultValue: 'App' },
  ],
  table: [
    { name: 'children', type: 'text', defaultValue: 'Name' },
  ],
  resizable: [
    { name: 'children', type: 'text', defaultValue: 'Panel 1' },
  ],
  'split-view': [
    { name: 'children', type: 'text', defaultValue: 'Editor' },
  ],

  // Form Controls (extended)
  label: [
    { name: 'children', type: 'text', defaultValue: 'Email address' },
  ],
  'radio-group': [
    { name: 'disabled', type: 'boolean', defaultValue: false },
  ],
  toggle: [
    { name: 'pressed', type: 'boolean', defaultValue: false },
  ],
  'toggle-group': [
    { name: 'children', type: 'text', defaultValue: 'left' },
  ],
  combobox: [
    { name: 'placeholder', type: 'text', defaultValue: 'Select...' },
  ],
  'multi-select': [
    { name: 'children', type: 'text', defaultValue: 'React' },
  ],
  'tag-input': [
    { name: 'children', type: 'text', defaultValue: 'React' },
  ],
  'search-input': [
    { name: 'placeholder', type: 'text', defaultValue: 'Search...' },
  ],
  'number-input': [
    { name: 'value', type: 'number', defaultValue: 1 },
  ],
  'date-picker': [
    { name: 'placeholder', type: 'text', defaultValue: 'Pick a date' },
  ],
  calendar: [
    { name: 'children', type: 'text', defaultValue: 'March 2026' },
  ],
  'color-picker': [
    { name: 'children', type: 'text', defaultValue: '#4f46e5' },
  ],
  'input-otp': [
    { name: 'children', type: 'text', defaultValue: '42' },
  ],
  form: [
    { name: 'children', type: 'text', defaultValue: 'Name' },
  ],
  'form-builder': [
    { name: 'children', type: 'text', defaultValue: 'Text Input' },
  ],

  // Display
  skeleton: [
    { name: 'className', type: 'text', defaultValue: '' },
  ],
  'empty-state': [
    { name: 'children', type: 'text', defaultValue: 'No results' },
  ],
  'stat-card': [
    { name: 'children', type: 'text', defaultValue: 'Revenue' },
  ],
  kbd: [
    { name: 'children', type: 'text', defaultValue: '⌘K' },
  ],
  'code-block': [
    { name: 'children', type: 'text', defaultValue: 'example.tsx' },
  ],
  stepper: [
    { name: 'children', type: 'text', defaultValue: 'Account' },
  ],
  timeline: [
    { name: 'children', type: 'text', defaultValue: 'Created' },
  ],
  'aspect-ratio': [
    { name: 'children', type: 'text', defaultValue: '16:9' },
  ],
  image: [
    { name: 'children', type: 'text', defaultValue: 'Image Component' },
  ],
  'avatar-group': [
    { name: 'children', type: 'text', defaultValue: 'AC' },
  ],
  notification: [
    { name: 'children', type: 'text', defaultValue: 'Notifications' },
  ],

  // Enterprise & Data
  'data-table': [
    { name: 'children', type: 'text', defaultValue: 'Invoice' },
  ],
  'kanban-board': [
    { name: 'children', type: 'text', defaultValue: 'To Do' },
  ],
  carousel: [
    { name: 'children', type: 'text', defaultValue: 'Modern Design' },
  ],
  'file-upload': [
    { name: 'children', type: 'text', defaultValue: 'Drop files here' },
  ],
  'rich-text-editor': [
    { name: 'children', type: 'text', defaultValue: 'Getting Started' },
  ],
  'tree-view': [
    { name: 'children', type: 'text', defaultValue: 'src' },
  ],
  'sortable-list': [
    { name: 'children', type: 'text', defaultValue: 'Design landing page' },
  ],
  'drag-and-drop': [
    { name: 'children', type: 'text', defaultValue: 'Drag items' },
  ],
  'transfer-list': [
    { name: 'children', type: 'text', defaultValue: 'Available' },
  ],
  command: [
    { name: 'children', type: 'text', defaultValue: 'Type a command...' },
  ],

  // Charts
  chart: [
    { name: 'children', type: 'text', defaultValue: 'Weekly Activity' },
  ],
  'area-chart': [
    { name: 'children', type: 'text', defaultValue: 'Revenue Trend' },
  ],
  'bar-chart': [
    { name: 'children', type: 'text', defaultValue: 'Sales vs Target' },
  ],
  'line-chart': [
    { name: 'children', type: 'text', defaultValue: 'Weekly Overview' },
  ],
  'pie-chart': [
    { name: 'children', type: 'text', defaultValue: 'Traffic Sources' },
  ],
  'radar-chart': [
    { name: 'children', type: 'text', defaultValue: 'Skills' },
  ],
  'scatter-chart': [
    { name: 'children', type: 'text', defaultValue: 'Correlation' },
  ],
  'gauge-chart': [
    { name: 'value', type: 'number', defaultValue: 72 },
  ],
  'candlestick-chart': [
    { name: 'children', type: 'text', defaultValue: 'OHLC' },
  ],
  heatmap: [
    { name: 'children', type: 'text', defaultValue: 'Activity' },
  ],
  sparkline: [
    { name: 'children', type: 'text', defaultValue: 'Revenue' },
  ],
  treemap: [
    { name: 'children', type: 'text', defaultValue: 'Disk Usage' },
  ],
  'funnel-chart': [
    { name: 'children', type: 'text', defaultValue: 'Conversion' },
  ],

  // AI & Chat
  chat: [
    { name: 'children', type: 'text', defaultValue: 'AI Assistant' },
  ],
  'message-bubble': [
    { name: 'children', type: 'text', defaultValue: 'Hello! How are you?' },
  ],
  'prompt-input': [
    { name: 'placeholder', type: 'text', defaultValue: 'Ask anything...' },
  ],
  'streaming-text': [
    { name: 'children', type: 'text', defaultValue: 'The quick brown fox' },
  ],
  'thinking-indicator': [
    { name: 'children', type: 'text', defaultValue: 'Thinking...' },
  ],
  'model-selector': [
    { name: 'children', type: 'text', defaultValue: 'gpt-4' },
  ],
  'suggestion-chips': [
    { name: 'children', type: 'text', defaultValue: 'Tell me a joke' },
  ],
  'feedback-buttons': [
    { name: 'children', type: 'text', defaultValue: 'Was this helpful?' },
  ],
  'token-counter': [
    { name: 'children', type: 'text', defaultValue: 'Tokens' },
  ],
};

const storyCategories: StoryCategory[] = [
  {
    id: 'form-controls',
    label: 'Form Controls',
    icon: '📝',
    stories: [
      { id: 'button', name: 'Button', description: 'Clickable button with variants and sizes.', Demo: Demos.DemoButton },
      { id: 'input', name: 'Input', description: 'Text input field.', Demo: Demos.DemoInput },
      { id: 'textarea', name: 'Textarea', description: 'Multi-line text input.', Demo: Demos.DemoTextarea },
      { id: 'select', name: 'Select', description: 'Dropdown selection.', Demo: Demos.DemoSelect },
      { id: 'checkbox', name: 'Checkbox', description: 'Boolean selection.', Demo: Demos.DemoCheckbox },
      { id: 'switch', name: 'Switch', description: 'Toggle on/off.', Demo: Demos.DemoSwitch },
      { id: 'slider', name: 'Slider', description: 'Range value slider.', Demo: Demos.DemoSlider },
      { id: 'label', name: 'Label', description: 'Form field label.', Demo: Demos.DemoLabel },
      { id: 'radio-group', name: 'Radio Group', description: 'Single selection from options.', Demo: Demos.DemoRadioGroup },
      { id: 'toggle', name: 'Toggle', description: 'Pressable toggle button.', Demo: Demos.DemoToggle },
      { id: 'toggle-group', name: 'Toggle Group', description: 'Group of toggle buttons.', Demo: Demos.DemoToggleGroup },
      { id: 'combobox', name: 'Combobox', description: 'Searchable dropdown.', Demo: Demos.DemoCombobox },
      { id: 'multi-select', name: 'Multi Select', description: 'Multiple selection control.', Demo: Demos.DemoMultiSelect },
      { id: 'date-picker', name: 'Date Picker', description: 'Calendar date selection.', Demo: Demos.DemoDatePicker },
      { id: 'color-picker', name: 'Color Picker', description: 'Color selection control.', Demo: Demos.DemoColorPicker },
      { id: 'input-otp', name: 'Input OTP', description: 'One-time password input.', Demo: Demos.DemoInputOTP },
      { id: 'form', name: 'Form', description: 'Form with validation.', Demo: Demos.DemoForm },
      { id: 'tag-input', name: 'Tag Input', description: 'Tag entry with keyboard.', Demo: Demos.DemoTagInput },
      { id: 'search-input', name: 'Search Input', description: 'Search with icon and clear.', Demo: Demos.DemoSearchInput },
      { id: 'number-input', name: 'Number Input', description: 'Numeric +/- input.', Demo: Demos.DemoNumberInput },
    ],
  },
  {
    id: 'display',
    label: 'Display',
    icon: '🖥️',
    stories: [
      { id: 'badge', name: 'Badge', description: 'Status indicator badges.', Demo: Demos.DemoBadge },
      { id: 'avatar', name: 'Avatar', description: 'User profile avatar.', Demo: Demos.DemoAvatar },
      { id: 'progress', name: 'Progress', description: 'Progress indicator.', Demo: Demos.DemoProgress },
      { id: 'skeleton', name: 'Skeleton', description: 'Loading placeholder.', Demo: Demos.DemoSkeleton },
      { id: 'spinner', name: 'Spinner', description: 'Loading spinner.', Demo: Demos.DemoSpinner },
      { id: 'separator', name: 'Separator', description: 'Visual divider.', Demo: Demos.DemoSeparator },
      { id: 'aspect-ratio', name: 'Aspect Ratio', description: 'Fixed aspect container.', Demo: Demos.DemoAspectRatio },
      { id: 'chart', name: 'Chart', description: 'Data visualization.', Demo: Demos.DemoChart },
      { id: 'timeline', name: 'Timeline', description: 'Chronological events.', Demo: Demos.DemoTimeline },
      { id: 'stat-card', name: 'Stat Card', description: 'Metric display card.', Demo: Demos.DemoStatCard },
      { id: 'empty-state', name: 'Empty State', description: 'No data placeholder.', Demo: Demos.DemoEmptyState },
      { id: 'kbd', name: 'Kbd', description: 'Keyboard shortcut display.', Demo: Demos.DemoKbd },
      { id: 'code-block', name: 'Code Block', description: 'Syntax highlighted code.', Demo: Demos.DemoCodeBlock },
      { id: 'stepper', name: 'Stepper', description: 'Multi-step progress.', Demo: Demos.DemoStepper },
      { id: 'avatar-group', name: 'Avatar Group', description: 'Stacked avatar group.', Demo: Demos.DemoAvatarGroup },
      { id: 'image', name: 'Image', description: 'Responsive image.', Demo: Demos.DemoImage },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback & Overlay',
    icon: '💬',
    stories: [
      { id: 'alert', name: 'Alert', description: 'Contextual alert messages.', Demo: Demos.DemoAlert },
      { id: 'alert-dialog', name: 'Alert Dialog', description: 'Confirmation dialog.', Demo: Demos.DemoAlertDialog },
      { id: 'toast', name: 'Toast', description: 'Notification toast.', Demo: Demos.DemoToast },
      { id: 'tooltip', name: 'Tooltip', description: 'Hover tooltip.', Demo: Demos.DemoTooltip },
      { id: 'hover-card', name: 'Hover Card', description: 'Rich hover preview.', Demo: Demos.DemoHoverCard },
      { id: 'dialog', name: 'Dialog', description: 'Modal dialog.', Demo: Demos.DemoDialog },
      { id: 'sheet', name: 'Sheet', description: 'Side panel overlay.', Demo: Demos.DemoSheet },
      { id: 'drawer', name: 'Drawer', description: 'Slide-in navigation.', Demo: Demos.DemoDrawer },
      { id: 'bottom-sheet', name: 'Bottom Sheet', description: 'Mobile bottom panel.', Demo: Demos.DemoBottomSheet },
      { id: 'popover', name: 'Popover', description: 'Floating content panel.', Demo: Demos.DemoPopover },
      { id: 'copy-button', name: 'Copy Button', description: 'Copy to clipboard.', Demo: Demos.DemoCopyButton },
      { id: 'feedback-buttons', name: 'Feedback', description: 'Thumbs up/down feedback.', Demo: Demos.DemoFeedbackButtons },
    ],
  },
  {
    id: 'layout',
    label: 'Layout & Navigation',
    icon: '📐',
    stories: [
      { id: 'card', name: 'Card', description: 'Content card container.', Demo: Demos.DemoCard },
      { id: 'tabs', name: 'Tabs', description: 'Tabbed content panels.', Demo: Demos.DemoTabs },
      { id: 'accordion', name: 'Accordion', description: 'Expandable sections.', Demo: Demos.DemoAccordion },
      { id: 'collapsible', name: 'Collapsible', description: 'Expandable content.', Demo: Demos.DemoCollapsible },
      { id: 'scroll-area', name: 'Scroll Area', description: 'Scrollable container.', Demo: Demos.DemoScrollArea },
      { id: 'resizable', name: 'Resizable', description: 'Resizable panels.', Demo: Demos.DemoResizable },
      { id: 'split-view', name: 'Split View', description: 'Editor/preview split.', Demo: Demos.DemoSplitView },
      { id: 'table', name: 'Table', description: 'Data table.', Demo: Demos.DemoTable },
      { id: 'breadcrumb', name: 'Breadcrumb', description: 'Navigation breadcrumb.', Demo: Demos.DemoBreadcrumb },
      { id: 'pagination', name: 'Pagination', description: 'Page navigation.', Demo: Demos.DemoPagination },
      { id: 'menubar', name: 'Menubar', description: 'Application menu bar.', Demo: Demos.DemoMenubar },
      { id: 'navigation-menu', name: 'Navigation Menu', description: 'Nav menu bar.', Demo: Demos.DemoNavigationMenu },
      { id: 'sidebar', name: 'Sidebar', description: 'App sidebar navigation.', Demo: Demos.DemoSidebar },
      { id: 'responsive-sidebar', name: 'Responsive Sidebar', description: 'Collapsible sidebar.', Demo: Demos.DemoResponsiveSidebar },
      { id: 'dropdown-menu', name: 'Dropdown Menu', description: 'Action dropdown.', Demo: Demos.DemoDropdownMenu },
      { id: 'context-menu', name: 'Context Menu', description: 'Right-click menu.', Demo: Demos.DemoContextMenu },
    ],
  },
  {
    id: 'enterprise',
    label: 'Enterprise & Data',
    icon: '🏢',
    stories: [
      { id: 'data-table', name: 'Data Table', description: 'Advanced data table.', Demo: Demos.DemoDataTable },
      { id: 'kanban-board', name: 'Kanban Board', description: 'Task board.', Demo: Demos.DemoKanbanBoard },
      { id: 'calendar', name: 'Calendar', description: 'Date calendar.', Demo: Demos.DemoCalendar },
      { id: 'carousel', name: 'Carousel', description: 'Content carousel.', Demo: Demos.DemoCarousel },
      { id: 'file-upload', name: 'File Upload', description: 'Drag-drop upload.', Demo: Demos.DemoFileUpload },
      { id: 'form-builder', name: 'Form Builder', description: 'Drag-drop form builder.', Demo: Demos.DemoFormBuilder },
      { id: 'tree-view', name: 'Tree View', description: 'Hierarchical tree.', Demo: Demos.DemoTreeView },
      { id: 'transfer-list', name: 'Transfer List', description: 'Item transfer control.', Demo: Demos.DemoTransferList },
      { id: 'rich-text-editor', name: 'Rich Text Editor', description: 'WYSIWYG editor.', Demo: Demos.DemoRichTextEditor },
      { id: 'command', name: 'Command', description: 'Command palette.', Demo: Demos.DemoCommand },
      { id: 'token-counter', name: 'Token Counter', description: 'Token usage display.', Demo: Demos.DemoTokenCounter },
      { id: 'sortable-list', name: 'Sortable List', description: 'Drag & drop reorder.', Demo: Demos.DemoSortableList },
      { id: 'drag-and-drop', name: 'Drag and Drop', description: 'Multi-zone drag & drop.', Demo: Demos.DemoDragAndDrop },
      { id: 'notification', name: 'Notification', description: 'Notification center.', Demo: Demos.DemoNotification },
      { id: 'area-chart', name: 'Area Chart', description: 'Filled area chart.', Demo: Demos.DemoAreaChart },
      { id: 'bar-chart', name: 'Bar Chart', description: 'Vertical bar chart.', Demo: Demos.DemoBarChart },
      { id: 'line-chart', name: 'Line Chart', description: 'Multi-series line chart.', Demo: Demos.DemoLineChart },
      { id: 'pie-chart', name: 'Pie Chart', description: 'Donut/pie chart.', Demo: Demos.DemoPieChart },
      { id: 'radar-chart', name: 'Radar Chart', description: 'Multivariate radar.', Demo: Demos.DemoRadarChart },
      { id: 'scatter-chart', name: 'Scatter Chart', description: 'Scatter plot.', Demo: Demos.DemoScatterChart },
      { id: 'gauge-chart', name: 'Gauge Chart', description: 'Circular gauge.', Demo: Demos.DemoGaugeChart },
      { id: 'candlestick-chart', name: 'Candlestick', description: 'Financial OHLC chart.', Demo: Demos.DemoCandlestickChart },
      { id: 'heatmap', name: 'Heatmap', description: 'Grid intensity map.', Demo: Demos.DemoHeatmap },
      { id: 'sparkline', name: 'Sparkline', description: 'Inline mini chart.', Demo: Demos.DemoSparkline },
      { id: 'treemap', name: 'Treemap', description: 'Proportional rectangles.', Demo: Demos.DemoTreemap },
      { id: 'funnel-chart', name: 'Funnel Chart', description: 'Conversion funnel.', Demo: Demos.DemoFunnelChart },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Chat',
    icon: '🤖',
    stories: [
      { id: 'chat', name: 'Chat', description: 'Chat interface.', Demo: Demos.DemoChat },
      { id: 'message-bubble', name: 'Message Bubble', description: 'Chat message.', Demo: Demos.DemoMessageBubble },
      { id: 'prompt-input', name: 'Prompt Input', description: 'AI prompt input.', Demo: Demos.DemoPromptInput },
      { id: 'streaming-text', name: 'Streaming Text', description: 'Typewriter text.', Demo: Demos.DemoStreamingText },
      { id: 'thinking-indicator', name: 'Thinking', description: 'AI thinking dots.', Demo: Demos.DemoThinkingIndicator },
      { id: 'model-selector', name: 'Model Selector', description: 'AI model picker.', Demo: Demos.DemoModelSelector },
      { id: 'suggestion-chips', name: 'Suggestions', description: 'Prompt suggestions.', Demo: Demos.DemoSuggestionChips },
    ],
  },
];

const allStories = storyCategories.flatMap((cat) =>
  cat.stories.map((s) => ({ ...s, category: cat.id, categoryLabel: cat.label }))
);

export function StorybookPage({ navigate }: { navigate: (path: string) => void }) {
  const [selectedStory, setSelectedStory] = useState(allStories[0]?.id || '');
  const [search, setSearch] = useState('');
  const [bgMode, setBgMode] = useState<'light' | 'dark' | 'dots'>('light');
  const [showGrid, setShowGrid] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [panelTab, setPanelTab] = useState<'canvas' | 'docs'>('canvas');
  const [showControls, setShowControls] = useState(true);
  const [controlValues, setControlValues] = useState<Record<string, any>>({});

  const current = allStories.find((s) => s.id === selectedStory);

  const q = search.toLowerCase();
  const filteredCategories = storyCategories
    .map((cat) => ({
      ...cat,
      stories: cat.stories.filter((s) =>
        !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      ),
    }))
    .filter((cat) => cat.stories.length > 0);

  const previewBg = bgMode === 'dark'
    ? 'bg-zinc-900'
    : bgMode === 'dots'
    ? 'bg-background bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] bg-[size:16px_16px]'
    : 'bg-background';

  return (
    <div className='space-y-6'>
      <PageHeader
        title='Storybook'
        description='Interactive component stories with isolated previews, documenting every state and variant.'
        badge={<Badge variant='success'>{allStories.length} stories</Badge>}
      />

      <style>{`
        @media(min-width:1024px) {
          .adhar-sb-grid { height: calc(100vh - 200px); min-height: 500px; max-height: 850px; overflow: hidden; }
          .adhar-sb-col { height: 100%; overflow: hidden; }
        }
      `}</style>
      <div className='adhar-sb-grid rounded-xl border border-border/60 bg-card shadow-sm lg:grid lg:grid-cols-[250px_1fr]'>
        {/* ─── Sidebar ─── */}
        <div className='adhar-sb-col border-b lg:border-b-0 lg:border-r border-border/60 bg-muted/10 flex flex-col'>
          {/* Toolbar */}
          <div className='p-3 border-b border-border/60 flex items-center gap-2'>
            <div className='w-5 h-5 rounded-md bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center shrink-0'>
              <span className='text-white text-[9px] font-bold'>S</span>
            </div>
            <span className='text-xs font-semibold text-foreground'>Stories</span>
          </div>

          {/* Search */}
          <div className='px-3 pt-2 pb-1'>
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
                placeholder='Filter stories...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full h-7 pl-8 pr-3 rounded-md border border-border bg-background text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring'
              />
            </div>
          </div>

          {/* Story tree */}
          <div className='flex-1 overflow-y-auto p-2 scrollbar-thin'>
            {filteredCategories.map((cat) => (
              <div key={cat.id} className='mb-1'>
                <div className='flex items-center gap-1.5 px-2 py-1.5'>
                  <NavIcon icon={cat.icon} />
                  <span className='text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex-1'>
                    {cat.label}
                  </span>
                  <span className='text-[9px] text-muted-foreground/50 tabular-nums'>{cat.stories.length}</span>
                </div>
                {cat.stories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => { setSelectedStory(story.id); setControlValues({}); }}
                    title={story.description}
                    className={`w-full text-left px-3 py-[5px] rounded-md text-[11px] flex items-center gap-2 ${
                      selectedStory === story.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full shrink-0 ${
                        selectedStory === story.id ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                    />
                    {story.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Main Panel ─── */}
        <div className='adhar-sb-col flex flex-col'>
          {/* Toolbar */}
          <div className='border-b border-border/60 px-4 py-2 flex items-center gap-3 bg-muted/5 overflow-x-auto scrollbar-none'>
            {/* Panel tabs */}
            <div className='flex items-center bg-muted/60 rounded-md p-0.5 border border-border/40'>
              <button
                onClick={() => setPanelTab('canvas')}
                className={`px-2.5 py-1 text-[11px] rounded font-medium transition-all ${
                  panelTab === 'canvas'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Canvas
              </button>
              <button
                onClick={() => setPanelTab('docs')}
                className={`px-2.5 py-1 text-[11px] rounded font-medium transition-all ${
                  panelTab === 'docs'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Docs
              </button>
            </div>

            {/* Current component label */}
            {current && (
              <span className='text-[11px] text-muted-foreground hidden sm:flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
                <span className='font-medium text-foreground'>{current.name}</span>
              </span>
            )}

            <div className='flex-1' />

            {/* Zoom */}
            <div className='hidden md:flex items-center gap-1 text-xs text-muted-foreground'>
              <button
                onClick={() => setZoom(Math.max(50, zoom - 25))}
                className='px-1 hover:text-foreground text-sm'
              >
                −
              </button>
              <span className='w-8 text-center text-[10px]'>{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className='px-1 hover:text-foreground text-sm'
              >
                +
              </button>
            </div>

            {/* Grid toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`hidden md:flex items-center justify-center w-7 h-7 rounded transition-colors ${
                showGrid
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title='Toggle grid'
            >
              <svg
                className='w-3.5 h-3.5'
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

            {/* Background */}
            <div className='flex items-center gap-1'>
              {(['light', 'dark', 'dots'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setBgMode(mode)}
                  className={`w-5 h-5 rounded-sm border transition-all ${
                    bgMode === mode
                      ? 'ring-2 ring-primary ring-offset-1 ring-offset-background'
                      : 'hover:ring-1 hover:ring-border'
                  } ${
                    mode === 'light'
                      ? 'bg-white border-zinc-200'
                      : mode === 'dark'
                      ? 'bg-zinc-800 border-zinc-600'
                      : 'bg-white border-zinc-200 bg-[radial-gradient(#ccc_1px,transparent_1px)] bg-[size:4px_4px]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Canvas / Docs */}
          {current && (
            <div className='flex-1 overflow-auto min-h-0'>
              {panelTab === 'canvas'
                ? (
                  /* ─── Canvas View ─── */
                  <div
                    className={`min-h-full p-8 transition-colors ${previewBg} ${
                      bgMode === 'dark' ? 'dark' : ''
                    }`}
                  >
                    {showGrid
                      ? (
                        /* Grid view — all stories from current category */
                        <div className='grid sm:grid-cols-2 gap-6'>
                          {storyCategories
                            .find((c) => c.stories.some((s) => s.id === selectedStory))
                            ?.stories.map((story) => (
                              <div
                                key={story.id}
                                className='rounded-lg border border-border bg-card p-6'
                              >
                                <h3 className='text-sm font-medium text-foreground mb-3'>
                                  {story.name}
                                </h3>
                                <story.Demo />
                              </div>
                            ))}
                        </div>
                      )
                      : (
                        /* Single story view */
                        <div className='flex items-start justify-center min-h-[400px] overflow-auto'>
                          <div
                            className='w-full flex items-center justify-center py-6'
                            style={{
                              transform: `scale(${zoom / 100})`,
                              transformOrigin: 'top center',
                            }}
                          >
                            <current.Demo {...controlValues} />
                          </div>
                        </div>
                      )}
                  </div>
                )
                : (
                  /* ─── Docs View ─── */
                  <div className='p-6 space-y-6 max-w-3xl'>
                    <div>
                      <h2 className='text-xl font-bold text-foreground mb-1'>{current.name}</h2>
                      <p className='text-sm text-muted-foreground'>{current.description}</p>
                    </div>

                    {/* Preview */}
                    <div className='rounded-lg border border-border overflow-hidden'>
                      <div className='flex items-center gap-1.5 px-3.5 py-2 border-b border-border/60 bg-muted/20'>
                        <span className='w-2 h-2 rounded-full bg-red-400/50' />
                        <span className='w-2 h-2 rounded-full bg-yellow-400/50' />
                        <span className='w-2 h-2 rounded-full bg-green-400/50' />
                        <span className='flex-1 text-center text-[10px] text-muted-foreground/60 font-medium tracking-wider uppercase -ml-10'>
                          Preview
                        </span>
                      </div>
                      <div className='p-6 bg-card flex items-center justify-center min-h-[150px] bg-[radial-gradient(hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:16px_16px]'>
                        <current.Demo />
                      </div>
                    </div>

                    {/* Code */}
                    <div>
                      <h3 className='text-sm font-semibold text-foreground mb-2'>Usage</h3>
                      <CodeBlock
                        code={`import { ${current.name} } from "@adhar-ui/react/${current.id}"\n\nexport default function Demo() {\n  return <${current.name} />\n}`}
                        language='tsx'
                        showLineNumbers
                      />
                    </div>

                    {/* Link to full docs */}
                    <div className='pt-4 border-t border-border'>
                      <button
                        onClick={() => navigate(`/components/detail/${current.id}`)}
                        className='text-sm text-primary hover:underline inline-flex items-center gap-1'
                      >
                        View full documentation →
                      </button>
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Controls & Info Panel — always visible at bottom */}
          {current && (
            <div className='border-t border-border/60 shrink-0'>
              {/* Panel Header */}
              <div className='flex items-center border-b border-border/60 bg-muted/5'>
                <button
                  onClick={() => setShowControls(true)}
                  className={`px-3 py-2 text-[11px] font-medium relative ${showControls ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Controls
                  {showControls && <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full' />}
                </button>
                <button
                  onClick={() => setShowControls(false)}
                  className={`px-3 py-2 text-[11px] font-medium relative ${!showControls ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Info
                  {!showControls && <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full' />}
                </button>
                <div className='flex-1' />
                <button
                  onClick={() => navigate(`/components/detail/${current.id}`)}
                  className='px-3 py-2 text-xs text-primary hover:underline'
                >
                  Full docs
                </button>
              </div>

              {/* Panel Content */}
              <div className='p-4 max-h-[200px] overflow-y-auto scrollbar-thin'>
                {showControls ? (
                  (() => {
                    const controls = commonControls[current.id];
                    if (!controls || controls.length === 0) {
                      return (
                        <div className='text-xs text-muted-foreground text-center py-4'>
                          <p>No interactive controls for this component.</p>
                          <p className='mt-1'>The preview above shows the default state.</p>
                        </div>
                      );
                    }
                    return (
                      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {controls.map((ctrl) => {
                          const val = controlValues[ctrl.name] ?? ctrl.defaultValue;
                          return (
                            <div key={ctrl.name}>
                              <label className='text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 block'>{ctrl.name}</label>
                              {ctrl.type === 'select' && (
                                <select
                                  value={val}
                                  onChange={(e) => setControlValues({ ...controlValues, [ctrl.name]: e.target.value })}
                                  className='w-full h-8 px-2 rounded-md border border-input bg-background text-xs'
                                >
                                  {ctrl.options!.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                              )}
                              {ctrl.type === 'boolean' && (
                                <button
                                  onClick={() => setControlValues({ ...controlValues, [ctrl.name]: !val })}
                                  className={`h-8 px-3 rounded-md text-xs font-medium border transition-colors ${val ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-input hover:bg-muted'}`}
                                >
                                  {val ? 'true' : 'false'}
                                </button>
                              )}
                              {ctrl.type === 'text' && (
                                <input
                                  value={val}
                                  onChange={(e) => setControlValues({ ...controlValues, [ctrl.name]: e.target.value })}
                                  className='w-full h-8 px-2 rounded-md border border-input bg-background text-xs'
                                />
                              )}
                              {ctrl.type === 'number' && (
                                <input
                                  type='number'
                                  value={val}
                                  onChange={(e) => setControlValues({ ...controlValues, [ctrl.name]: Number(e.target.value) })}
                                  className='w-full h-8 px-2 rounded-md border border-input bg-background text-xs'
                                />
                              )}
                            </div>
                          );
                        })}
                        <div>
                          <label className='text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 block'>&nbsp;</label>
                          <button
                            onClick={() => {
                              const defaults: Record<string, any> = {};
                              controls.forEach((c) => { defaults[c.name] = c.defaultValue; });
                              setControlValues(defaults);
                            }}
                            className='h-8 px-3 rounded-md border border-input text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                    <span className='flex items-center gap-1.5 font-medium text-foreground'>
                      <span className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
                      {current.name}
                    </span>
                    <span className='text-muted-foreground/40'>|</span>
                    <span>{current.description}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
