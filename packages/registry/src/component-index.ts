/**
 * Complete component index for the Adhar UI design system.
 *
 * Includes:
 * - All shadcn/ui components (35+)
 * - Enterprise components (15+)
 * - AI-specific components (10+)
 * - Layout & responsive components
 */

interface ComponentEntry {
  name: string;
  title: string;
  description: string;
  tier: 1 | 2 | 3;
  categories: string[];
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  docs?: string;
}

// ============================================================
// TIER 1: Core Primitives (shadcn parity)
// ============================================================

const tier1: ComponentEntry[] = [
  // --- Form Controls ---
  {
    name: 'button',
    title: 'Button',
    description: 'Displays a button or a component that looks like a button.',
    tier: 1,
    categories: ['form'],
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'input',
    title: 'Input',
    description: 'Displays a form input field or a component that looks like an input field.',
    tier: 1,
    categories: ['form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'textarea',
    title: 'Textarea',
    description: 'Displays a form textarea or a component that looks like a textarea.',
    tier: 1,
    categories: ['form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'label',
    title: 'Label',
    description: 'Renders an accessible label associated with controls.',
    tier: 1,
    categories: ['form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'checkbox',
    title: 'Checkbox',
    description: 'A control that allows the user to toggle between checked and not checked.',
    tier: 1,
    categories: ['form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'radio-group',
    title: 'Radio Group',
    description: 'A set of checkable buttons where no more than one can be checked at a time.',
    tier: 1,
    categories: ['form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['label'],
  },
  {
    name: 'switch',
    title: 'Switch',
    description: 'A control that allows the user to toggle between a checked and unchecked state.',
    tier: 1,
    categories: ['form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'select',
    title: 'Select',
    description: 'Displays a list of options for the user to pick from.',
    tier: 1,
    categories: ['form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'slider',
    title: 'Slider',
    description: 'An input where the user selects a value from within a given range.',
    tier: 1,
    categories: ['form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'toggle',
    title: 'Toggle',
    description: 'A two-state button that can be either on or off.',
    tier: 1,
    categories: ['form'],
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'toggle-group',
    title: 'Toggle Group',
    description: 'A set of two-state buttons that can be toggled on or off.',
    tier: 1,
    categories: ['form'],
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: ['toggle'],
  },

  // --- Display ---
  {
    name: 'badge',
    title: 'Badge',
    description: 'Displays a badge or a component that looks like a badge.',
    tier: 1,
    categories: ['display'],
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'avatar',
    title: 'Avatar',
    description: 'An image element with a fallback for representing the user.',
    tier: 1,
    categories: ['display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'separator',
    title: 'Separator',
    description: 'Visually or semantically separates content.',
    tier: 1,
    categories: ['display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'skeleton',
    title: 'Skeleton',
    description: 'Use to show a placeholder while content is loading.',
    tier: 1,
    categories: ['display', 'feedback'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'progress',
    title: 'Progress',
    description: 'Displays an indicator showing the completion progress of a task.',
    tier: 1,
    categories: ['display', 'feedback'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'spinner',
    title: 'Spinner',
    description: 'An animated loading indicator.',
    tier: 1,
    categories: ['display', 'feedback'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'aspect-ratio',
    title: 'Aspect Ratio',
    description: 'Displays content within a desired ratio.',
    tier: 1,
    categories: ['display', 'layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },

  // --- Layout ---
  {
    name: 'card',
    title: 'Card',
    description: 'Displays a card with header, content, and footer.',
    tier: 1,
    categories: ['layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'scroll-area',
    title: 'Scroll Area',
    description: 'Augments native scroll functionality for custom, cross-browser styling.',
    tier: 1,
    categories: ['layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'collapsible',
    title: 'Collapsible',
    description: 'An interactive component which expands/collapses a panel.',
    tier: 1,
    categories: ['layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'resizable',
    title: 'Resizable',
    description: 'Accessible resizable panel groups and layouts.',
    tier: 1,
    categories: ['layout'],
    dependencies: ['react-resizable-panels'],
    devDependencies: [],
    registryDependencies: [],
  },

  // --- Feedback ---
  {
    name: 'alert',
    title: 'Alert',
    description: 'Displays a callout for user attention.',
    tier: 1,
    categories: ['feedback'],
    dependencies: ['class-variance-authority'],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'alert-dialog',
    title: 'Alert Dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
    tier: 1,
    categories: ['feedback', 'overlay'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button'],
  },
  {
    name: 'toast',
    title: 'Toast',
    description: 'A succinct message that is displayed temporarily.',
    tier: 1,
    categories: ['feedback'],
    dependencies: ['sonner'],
    devDependencies: [],
    registryDependencies: [],
    docs: 'Uses the Sonner toast library for production-ready notifications.',
  },

  // --- Overlay ---
  {
    name: 'dialog',
    title: 'Dialog',
    description: 'A window overlaid on either the primary window or another dialog window.',
    tier: 1,
    categories: ['overlay'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'sheet',
    title: 'Sheet',
    description:
      'Extends the Dialog component to display content that complements the main content of the screen.',
    tier: 1,
    categories: ['overlay'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'tooltip',
    title: 'Tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    tier: 1,
    categories: ['overlay'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'popover',
    title: 'Popover',
    description: 'Displays rich content in a portal, triggered by a button.',
    tier: 1,
    categories: ['overlay'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'hover-card',
    title: 'Hover Card',
    description: 'For sighted users to preview content available behind a link.',
    tier: 1,
    categories: ['overlay'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },

  // --- Navigation ---
  {
    name: 'tabs',
    title: 'Tabs',
    description: 'A set of layered sections of content displayed one at a time.',
    tier: 1,
    categories: ['navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'accordion',
    title: 'Accordion',
    description:
      'A vertically stacked set of interactive headings that each reveal a section of content.',
    tier: 1,
    categories: ['navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'dropdown-menu',
    title: 'Dropdown Menu',
    description: 'Displays a menu to the user triggered by a button.',
    tier: 1,
    categories: ['navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'context-menu',
    title: 'Context Menu',
    description: 'Displays a menu at the pointer position, triggered by a right-click.',
    tier: 1,
    categories: ['navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'menubar',
    title: 'Menubar',
    description: 'A visually persistent menu common in desktop applications.',
    tier: 1,
    categories: ['navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'navigation-menu',
    title: 'Navigation Menu',
    description: 'A collection of links for navigating websites.',
    tier: 1,
    categories: ['navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'breadcrumb',
    title: 'Breadcrumb',
    description: 'Displays the path to the current resource using a hierarchy of links.',
    tier: 1,
    categories: ['navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'pagination',
    title: 'Pagination',
    description: 'Pagination with page navigation, next, and previous links.',
    tier: 1,
    categories: ['navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button'],
  },
  {
    name: 'sidebar',
    title: 'Sidebar',
    description: 'A composable, themeable and customizable sidebar component.',
    tier: 1,
    categories: ['navigation', 'layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'separator', 'sheet', 'skeleton', 'tooltip', 'input'],
    docs: 'Includes SidebarProvider, SidebarTrigger, SidebarContent, SidebarMenu, and more.',
  },
];

// ============================================================
// TIER 2: Composite Components (shadcn parity + extended)
// ============================================================

const tier2: ComponentEntry[] = [
  {
    name: 'command',
    title: 'Command',
    description: 'Fast, composable, unstyled command menu. Cmd+K interface.',
    tier: 2,
    categories: ['navigation', 'overlay'],
    dependencies: ['cmdk'],
    devDependencies: [],
    registryDependencies: ['dialog'],
  },
  {
    name: 'combobox',
    title: 'Combobox',
    description: 'Autocomplete input and command palette with a list of suggestions.',
    tier: 2,
    categories: ['form'],
    dependencies: ['cmdk'],
    devDependencies: [],
    registryDependencies: ['command', 'popover', 'button'],
  },
  {
    name: 'date-picker',
    title: 'Date Picker',
    description: 'A date picker component with range and presets support.',
    tier: 2,
    categories: ['form'],
    dependencies: ['date-fns', 'react-day-picker'],
    devDependencies: [],
    registryDependencies: ['button', 'popover', 'calendar'],
  },
  {
    name: 'calendar',
    title: 'Calendar',
    description: 'A date field component that allows users to enter and edit date.',
    tier: 2,
    categories: ['form'],
    dependencies: ['date-fns', 'react-day-picker'],
    devDependencies: [],
    registryDependencies: ['button'],
  },
  {
    name: 'color-picker',
    title: 'Color Picker',
    description: 'A color picker component with HSL/RGB/HEX input.',
    tier: 2,
    categories: ['form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['input', 'popover', 'label'],
  },
  {
    name: 'form',
    title: 'Form',
    description: 'Building forms with React Hook Form and Zod validation.',
    tier: 2,
    categories: ['form'],
    dependencies: ['react-hook-form', '@hookform/resolvers', 'zod'],
    devDependencies: [],
    registryDependencies: ['button', 'label'],
    docs:
      'Provides FormField, FormItem, FormLabel, FormControl, FormDescription, and FormMessage components.',
  },
  {
    name: 'input-otp',
    title: 'Input OTP',
    description: 'Accessible one-time password component with copy-paste support.',
    tier: 2,
    categories: ['form'],
    dependencies: ['input-otp'],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'table',
    title: 'Table',
    description: 'A responsive table component.',
    tier: 2,
    categories: ['display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'carousel',
    title: 'Carousel',
    description: 'A carousel with motion and swipe built using Embla.',
    tier: 2,
    categories: ['display'],
    dependencies: ['embla-carousel-react'],
    devDependencies: [],
    registryDependencies: ['button'],
  },
  {
    name: 'chart',
    title: 'Chart',
    description: 'Beautiful charts built using Recharts.',
    tier: 2,
    categories: ['display'],
    dependencies: ['recharts'],
    devDependencies: [],
    registryDependencies: ['card'],
    docs: 'Provides ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend components.',
  },
  {
    name: 'drawer',
    title: 'Drawer',
    description: 'A drawer component for React. Ideal for mobile.',
    tier: 2,
    categories: ['overlay'],
    dependencies: ['vaul'],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'sonner',
    title: 'Sonner',
    description: 'An opinionated toast component for React.',
    tier: 2,
    categories: ['feedback'],
    dependencies: ['sonner', 'next-themes'],
    devDependencies: [],
    registryDependencies: [],
  },
];

// ============================================================
// TIER 3: Enterprise & AI Components
// ============================================================

const tier3: ComponentEntry[] = [
  // --- Enterprise ---
  {
    name: 'data-table',
    title: 'Data Table',
    description:
      'Powerful data table with sorting, filtering, pagination, row selection, and column visibility.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: ['@tanstack/react-table'],
    devDependencies: [],
    registryDependencies: [
      'table',
      'button',
      'input',
      'dropdown-menu',
      'select',
      'checkbox',
      'badge',
    ],
    docs:
      'Includes DataTable, DataTablePagination, DataTableToolbar, DataTableFacetedFilter, DataTableColumnHeader, DataTableViewOptions.',
  },
  {
    name: 'form-builder',
    title: 'Form Builder',
    description:
      'Schema-driven form builder with Zod validation, conditional fields, and multi-step support.',
    tier: 3,
    categories: ['enterprise', 'form'],
    dependencies: ['react-hook-form', '@hookform/resolvers', 'zod'],
    devDependencies: [],
    registryDependencies: [
      'form',
      'input',
      'textarea',
      'select',
      'checkbox',
      'switch',
      'radio-group',
      'label',
      'button',
      'card',
    ],
    docs: 'Provides FormBuilder component that renders forms from a Zod schema definition.',
  },
  {
    name: 'file-upload',
    title: 'File Upload',
    description: 'Drag-and-drop file upload with preview, progress, and validation.',
    tier: 3,
    categories: ['enterprise', 'form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'progress', 'card'],
  },
  {
    name: 'rich-text-editor',
    title: 'Rich Text Editor',
    description:
      'WYSIWYG rich text editor with markdown support, code blocks, and collaborative editing.',
    tier: 3,
    categories: ['enterprise', 'form'],
    dependencies: ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-placeholder'],
    devDependencies: [],
    registryDependencies: ['button', 'separator', 'toggle', 'toggle-group', 'popover'],
  },
  {
    name: 'kanban-board',
    title: 'Kanban Board',
    description: 'Drag-and-drop kanban board with columns, cards, and swimlanes.',
    tier: 3,
    categories: ['enterprise', 'layout'],
    dependencies: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
    devDependencies: [],
    registryDependencies: ['card', 'badge', 'avatar', 'button', 'scroll-area'],
  },
  {
    name: 'timeline',
    title: 'Timeline',
    description: 'A timeline component for displaying chronological events.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'badge', 'avatar'],
  },
  {
    name: 'tree-view',
    title: 'Tree View',
    description: 'A hierarchical tree view component with expand/collapse and selection.',
    tier: 3,
    categories: ['enterprise', 'navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['collapsible', 'checkbox'],
  },
  {
    name: 'stepper',
    title: 'Stepper',
    description: 'A step-by-step workflow indicator with linear and non-linear navigation.',
    tier: 3,
    categories: ['enterprise', 'navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'separator'],
  },
  {
    name: 'multi-select',
    title: 'Multi Select',
    description: 'A multi-select component with search, tags, and groups.',
    tier: 3,
    categories: ['enterprise', 'form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['badge', 'command', 'popover', 'button'],
  },
  {
    name: 'transfer-list',
    title: 'Transfer List',
    description: 'A dual-panel list for moving items between two collections.',
    tier: 3,
    categories: ['enterprise', 'form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'checkbox', 'input', 'scroll-area', 'card'],
  },
  {
    name: 'empty-state',
    title: 'Empty State',
    description: 'A placeholder component for empty data states with action buttons.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button'],
  },
  {
    name: 'stat-card',
    title: 'Stat Card',
    description: 'A statistics card with trend indicators, sparklines, and comparison values.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'badge'],
  },
  {
    name: 'kbd',
    title: 'Keyboard Shortcut',
    description: 'A component to display keyboard shortcuts and key combinations.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'copy-button',
    title: 'Copy Button',
    description: 'A button that copies text to clipboard with visual feedback.',
    tier: 3,
    categories: ['enterprise'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'tooltip'],
  },

  // --- AI-Specific Components ---
  {
    name: 'chat',
    title: 'Chat',
    description:
      'A complete AI chat interface with message list, prompt input, and streaming support.',
    tier: 3,
    categories: ['ai'],
    dependencies: ['react-markdown', 'remark-gfm'],
    devDependencies: [],
    registryDependencies: ['button', 'avatar', 'scroll-area', 'skeleton', 'textarea'],
    docs: 'Includes ChatContainer, ChatMessage, ChatInput, ChatSuggestions components.',
  },
  {
    name: 'prompt-input',
    title: 'Prompt Input',
    description:
      'Auto-resizing textarea with submit handling, file attachments, and model selector.',
    tier: 3,
    categories: ['ai', 'form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'textarea', 'tooltip'],
  },
  {
    name: 'streaming-text',
    title: 'Streaming Text',
    description: 'Typewriter effect component for LLM streaming responses with markdown rendering.',
    tier: 3,
    categories: ['ai', 'display'],
    dependencies: ['react-markdown', 'remark-gfm'],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'code-block',
    title: 'Code Block',
    description:
      'Syntax-highlighted code block with copy button, line numbers, and language detection.',
    tier: 3,
    categories: ['ai', 'display'],
    dependencies: ['shiki'],
    devDependencies: [],
    registryDependencies: ['copy-button'],
  },
  {
    name: 'model-selector',
    title: 'Model Selector',
    description: 'Dropdown selector for AI models with capability indicators.',
    tier: 3,
    categories: ['ai', 'form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['select', 'badge'],
  },
  {
    name: 'token-counter',
    title: 'Token Counter',
    description: 'Visual token usage indicator with progress bar and limits.',
    tier: 3,
    categories: ['ai', 'display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['progress', 'badge'],
  },
  {
    name: 'thinking-indicator',
    title: 'Thinking Indicator',
    description: 'Animated loading indicator for AI processing states.',
    tier: 3,
    categories: ['ai', 'feedback'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['skeleton'],
  },
  {
    name: 'feedback-buttons',
    title: 'Feedback Buttons',
    description: 'Thumbs up/down feedback buttons for AI response rating.',
    tier: 3,
    categories: ['ai'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'tooltip'],
  },
  {
    name: 'suggestion-chips',
    title: 'Suggestion Chips',
    description: 'Clickable prompt suggestion chips for AI interfaces.',
    tier: 3,
    categories: ['ai'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['badge'],
  },
  {
    name: 'message-bubble',
    title: 'Message Bubble',
    description: 'User/assistant message bubble with avatar, timestamp, and markdown support.',
    tier: 3,
    categories: ['ai', 'display'],
    dependencies: ['react-markdown', 'remark-gfm'],
    devDependencies: [],
    registryDependencies: ['avatar', 'code-block', 'copy-button'],
  },

  // --- Layout & Responsive ---
  {
    name: 'responsive-sidebar',
    title: 'Responsive Sidebar',
    description: 'Sidebar that collapses to a drawer on mobile and supports nested navigation.',
    tier: 3,
    categories: ['layout', 'navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['sidebar', 'sheet', 'button'],
  },
  {
    name: 'bottom-sheet',
    title: 'Bottom Sheet',
    description: 'A mobile-optimized bottom sheet with snap points and drag gestures.',
    tier: 3,
    categories: ['layout', 'overlay'],
    dependencies: ['vaul'],
    devDependencies: [],
    registryDependencies: ['drawer'],
  },
  {
    name: 'split-view',
    title: 'Split View',
    description: 'A resizable split panel view with horizontal and vertical orientations.',
    tier: 3,
    categories: ['layout'],
    dependencies: ['react-resizable-panels'],
    devDependencies: [],
    registryDependencies: ['resizable'],
  },

  // --- Data Views ---
  {
    name: 'list-view',
    title: 'List View',
    description:
      'A configurable list view with sorting, filtering, search, and infinite scroll. Supports single and multi-select.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'checkbox',
      'badge',
      'input',
      'dropdown-menu',
      'skeleton',
      'empty-state',
    ],
  },
  {
    name: 'grid-view',
    title: 'Grid View',
    description:
      'A responsive card grid layout with configurable columns, gap, and breakpoints. Supports drag-to-reorder.',
    tier: 3,
    categories: ['enterprise', 'display', 'layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'badge', 'skeleton', 'empty-state'],
  },
  {
    name: 'detail-view',
    title: 'Detail View',
    description:
      'A structured detail/record view with labeled fields, sections, edit mode, and responsive stacking.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'separator', 'badge', 'button'],
  },
  {
    name: 'master-detail',
    title: 'Master Detail',
    description:
      'A split-pane master-detail layout. List on the left, detail on the right. Collapses to single-pane on mobile.',
    tier: 3,
    categories: ['enterprise', 'layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['list-view', 'detail-view', 'resizable', 'sheet'],
  },
  {
    name: 'data-grid',
    title: 'Data Grid',
    description:
      'An editable data grid with inline cell editing, column pinning, row grouping, and virtual scrolling.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: ['@tanstack/react-table', '@tanstack/react-virtual'],
    devDependencies: [],
    registryDependencies: ['data-table', 'input', 'select', 'checkbox'],
  },
  {
    name: 'property-list',
    title: 'Property List',
    description:
      'A key-value property display with label, value, optional copy button, and truncation.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['copy-button'],
  },
  {
    name: 'description-list',
    title: 'Description List',
    description:
      'A semantic dl/dt/dd component for displaying metadata, settings, or record fields.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'sortable-list',
    title: 'Sortable List',
    description:
      'A drag-and-drop reorderable list with handle, grip icon, and animated transitions.',
    tier: 3,
    categories: ['enterprise', 'form'],
    dependencies: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
    devDependencies: [],
    registryDependencies: ['card'],
  },
  {
    name: 'infinite-scroll',
    title: 'Infinite Scroll',
    description:
      'An intersection-observer based infinite scroll container with loading indicator and end-of-list detection.',
    tier: 3,
    categories: ['enterprise', 'layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['spinner'],
  },
  {
    name: 'virtualized-list',
    title: 'Virtualized List',
    description:
      'A virtualized list for rendering thousands of items efficiently with fixed or variable row heights.',
    tier: 3,
    categories: ['enterprise', 'display'],
    dependencies: ['@tanstack/react-virtual'],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'command-bar',
    title: 'Command Bar',
    description:
      'A floating command bar (Cmd+K) with search, recent actions, and contextual commands.',
    tier: 3,
    categories: ['enterprise', 'navigation'],
    dependencies: ['cmdk'],
    devDependencies: [],
    registryDependencies: ['command', 'dialog', 'kbd'],
  },
  {
    name: 'notification-center',
    title: 'Notification Center',
    description:
      'A notification panel with unread count, mark as read, grouping, and action buttons.',
    tier: 3,
    categories: ['enterprise', 'feedback'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['popover', 'button', 'badge', 'scroll-area', 'separator', 'avatar'],
  },
  {
    name: 'tag-input',
    title: 'Tag Input',
    description:
      'An input field for entering tags/chips with autocomplete, validation, and max limit.',
    tier: 3,
    categories: ['enterprise', 'form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['badge', 'input'],
  },
];

// ============================================================
// BLOCKS: Pre-composed page sections built from base components
// ============================================================

const blocks: ComponentEntry[] = [
  // --- Authentication ---
  {
    name: 'block-login',
    title: 'Login Page',
    description:
      'Complete login form with email/password, social login buttons, remember me, and forgot password link. Centered card layout.',
    tier: 3,
    categories: ['block', 'auth'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'input', 'label', 'button', 'checkbox', 'separator'],
  },
  {
    name: 'block-signup',
    title: 'Sign Up Page',
    description:
      'Registration form with name, email, password, confirm password, terms checkbox, and social signup options.',
    tier: 3,
    categories: ['block', 'auth'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'input', 'label', 'button', 'checkbox', 'separator'],
  },
  {
    name: 'block-forgot-password',
    title: 'Forgot Password',
    description:
      'Password reset request form with email input, submit button, and back-to-login link.',
    tier: 3,
    categories: ['block', 'auth'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'input', 'label', 'button'],
  },
  {
    name: 'block-otp-verify',
    title: 'OTP Verification',
    description:
      'OTP/2FA verification page with 6-digit code input, resend link, and timer countdown.',
    tier: 3,
    categories: ['block', 'auth'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'input', 'button', 'label'],
  },

  // --- Dashboard ---
  {
    name: 'block-dashboard-stats',
    title: 'Dashboard Stats',
    description:
      'Row of 4 stat cards with title, value, trend indicator, and sparkline area. Responsive grid.',
    tier: 3,
    categories: ['block', 'dashboard'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['stat-card', 'card'],
  },
  {
    name: 'block-dashboard-chart',
    title: 'Dashboard Chart',
    description:
      'Card containing a responsive area/bar/line chart with title, date range selector, and legend.',
    tier: 3,
    categories: ['block', 'dashboard'],
    dependencies: ['recharts'],
    devDependencies: [],
    registryDependencies: ['card', 'chart', 'select', 'tabs'],
  },
  {
    name: 'block-dashboard-activity',
    title: 'Activity Feed',
    description:
      'Timeline-style activity feed with avatar, action text, timestamp, and "load more" button.',
    tier: 3,
    categories: ['block', 'dashboard'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'avatar', 'badge', 'button', 'scroll-area'],
  },
  {
    name: 'block-dashboard-overview',
    title: 'Dashboard Overview',
    description:
      'Full dashboard page composing stats row, chart, recent activity, and quick actions sidebar.',
    tier: 3,
    categories: ['block', 'dashboard'],
    dependencies: ['recharts'],
    devDependencies: [],
    registryDependencies: [
      'block-dashboard-stats',
      'block-dashboard-chart',
      'block-dashboard-activity',
      'card',
      'button',
    ],
  },

  // --- Marketing / Landing ---
  {
    name: 'block-hero',
    title: 'Hero Section',
    description:
      'Full-width hero with headline, subheadline, CTA buttons, and optional background image/gradient. Responsive.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'badge'],
  },
  {
    name: 'block-features',
    title: 'Features Grid',
    description:
      'Feature showcase grid with icon, title, and description per feature. 2/3/4 column responsive layout.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card'],
  },
  {
    name: 'block-pricing',
    title: 'Pricing Table',
    description:
      'Side-by-side pricing cards with plan name, price, feature list, CTA button, and "popular" badge.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'button', 'badge', 'separator'],
  },
  {
    name: 'block-testimonials',
    title: 'Testimonials',
    description:
      'Testimonial cards with quote, author name, role, company, and avatar. Grid or carousel layout.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'avatar'],
  },
  {
    name: 'block-cta',
    title: 'Call to Action',
    description:
      'Full-width CTA banner with headline, description, and primary/secondary action buttons.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button'],
  },
  {
    name: 'block-faq',
    title: 'FAQ Section',
    description: 'Frequently asked questions using accordion pattern with search filter.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['accordion', 'input'],
  },
  {
    name: 'block-footer',
    title: 'Footer',
    description:
      'Multi-column footer with logo, navigation links, social icons, newsletter signup, and copyright.',
    tier: 3,
    categories: ['block', 'navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['input', 'button', 'separator'],
  },

  // --- Navigation ---
  {
    name: 'block-header',
    title: 'Header / Navbar',
    description:
      'Responsive top navigation bar with logo, menu items, search, notifications, and user avatar dropdown. Mobile hamburger menu.',
    tier: 3,
    categories: ['block', 'navigation'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'avatar', 'dropdown-menu', 'badge', 'input', 'sheet'],
  },
  {
    name: 'block-sidebar-layout',
    title: 'Sidebar Layout',
    description:
      'Full app shell with collapsible sidebar, header, breadcrumb, and main content area. Responsive.',
    tier: 3,
    categories: ['block', 'navigation', 'layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'sidebar',
      'button',
      'avatar',
      'breadcrumb',
      'dropdown-menu',
      'separator',
    ],
  },
  {
    name: 'block-command-menu',
    title: 'Command Menu Page',
    description:
      'Full-screen command palette with grouped results, keyboard shortcuts, and recent searches.',
    tier: 3,
    categories: ['block', 'navigation'],
    dependencies: ['cmdk'],
    devDependencies: [],
    registryDependencies: ['command', 'dialog', 'kbd'],
  },

  // --- Settings ---
  {
    name: 'block-settings-profile',
    title: 'Profile Settings',
    description:
      'Profile editing form with avatar upload, name, email, bio, and save/cancel buttons.',
    tier: 3,
    categories: ['block', 'settings'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'input', 'label', 'textarea', 'button', 'avatar', 'separator'],
  },
  {
    name: 'block-settings-account',
    title: 'Account Settings',
    description:
      'Account management with password change, two-factor toggle, session list, and danger zone (delete account).',
    tier: 3,
    categories: ['block', 'settings'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'card',
      'input',
      'label',
      'button',
      'switch',
      'alert',
      'separator',
      'badge',
    ],
  },
  {
    name: 'block-settings-notifications',
    title: 'Notification Settings',
    description:
      'Notification preferences with category toggles (email, push, SMS) in a structured table layout.',
    tier: 3,
    categories: ['block', 'settings'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'switch', 'label', 'separator', 'button'],
  },
  {
    name: 'block-settings-billing',
    title: 'Billing Settings',
    description:
      'Billing page with current plan card, usage progress bars, payment method, and invoice table.',
    tier: 3,
    categories: ['block', 'settings'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'button', 'badge', 'progress', 'table', 'separator'],
  },
  {
    name: 'block-settings-page',
    title: 'Settings Page',
    description:
      'Complete settings page with tabbed navigation (Profile, Account, Notifications, Billing) composing all settings blocks.',
    tier: 3,
    categories: ['block', 'settings'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'tabs',
      'block-settings-profile',
      'block-settings-account',
      'block-settings-notifications',
      'block-settings-billing',
    ],
  },

  // --- Data Pages ---
  {
    name: 'block-table-page',
    title: 'Data Table Page',
    description:
      'Full table page with title, search, filters, column toggles, bulk actions, pagination, and create button.',
    tier: 3,
    categories: ['block', 'data'],
    dependencies: ['@tanstack/react-table'],
    devDependencies: [],
    registryDependencies: ['data-table', 'input', 'button', 'dropdown-menu', 'badge', 'dialog'],
  },
  {
    name: 'block-detail-page',
    title: 'Detail Page',
    description:
      'Record detail page with header (title, status badge, actions), tabbed sections, and related items list.',
    tier: 3,
    categories: ['block', 'data'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'detail-view',
      'tabs',
      'button',
      'badge',
      'dropdown-menu',
      'card',
      'separator',
    ],
  },
  {
    name: 'block-list-filter-page',
    title: 'List + Filter Page',
    description:
      'Filterable list page with sidebar filters (checkboxes, ranges, tags), sort dropdown, and paginated list view.',
    tier: 3,
    categories: ['block', 'data'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'list-view',
      'input',
      'checkbox',
      'select',
      'button',
      'badge',
      'card',
      'pagination',
    ],
  },
  {
    name: 'block-kanban-page',
    title: 'Kanban Board Page',
    description:
      'Full kanban page with board header, column management, card creation dialog, and filter bar.',
    tier: 3,
    categories: ['block', 'data'],
    dependencies: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
    devDependencies: [],
    registryDependencies: [
      'kanban-board',
      'button',
      'dialog',
      'input',
      'textarea',
      'select',
      'badge',
      'avatar',
    ],
  },

  // --- E-commerce ---
  {
    name: 'block-product-card',
    title: 'Product Card',
    description:
      'Product card with image, title, price, rating stars, add-to-cart button, and wishlist toggle.',
    tier: 3,
    categories: ['block', 'ecommerce'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'button', 'badge'],
  },
  {
    name: 'block-product-grid',
    title: 'Product Grid',
    description:
      'Product listing page with responsive grid, category filters, sort dropdown, and pagination.',
    tier: 3,
    categories: ['block', 'ecommerce'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'block-product-card',
      'grid-view',
      'input',
      'select',
      'pagination',
      'badge',
    ],
  },
  {
    name: 'block-cart',
    title: 'Shopping Cart',
    description:
      'Shopping cart with item list (image, title, quantity selector, price, remove), subtotal, and checkout button.',
    tier: 3,
    categories: ['block', 'ecommerce'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['card', 'button', 'input', 'separator', 'badge'],
  },
  {
    name: 'block-checkout',
    title: 'Checkout Page',
    description:
      'Multi-step checkout with shipping form, payment form, order summary, and place-order button using stepper.',
    tier: 3,
    categories: ['block', 'ecommerce'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['stepper', 'card', 'input', 'label', 'select', 'button', 'separator'],
  },

  // --- AI Pages ---
  {
    name: 'block-chat-page',
    title: 'AI Chat Page',
    description:
      'Full-screen AI chat page with message history, prompt input, model selector, suggestion chips, and sidebar with conversation list.',
    tier: 3,
    categories: ['block', 'ai'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'chat',
      'prompt-input',
      'model-selector',
      'suggestion-chips',
      'feedback-buttons',
      'sidebar',
      'button',
      'avatar',
      'scroll-area',
    ],
  },
  {
    name: 'block-ai-playground',
    title: 'AI Playground',
    description:
      'Split-pane AI playground with prompt editor on the left, streaming response on the right, token counter, and parameter controls.',
    tier: 3,
    categories: ['block', 'ai'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [
      'prompt-input',
      'streaming-text',
      'code-block',
      'token-counter',
      'model-selector',
      'thinking-indicator',
      'split-view',
      'card',
      'select',
      'slider',
      'label',
    ],
  },

  // --- Error Pages ---
  {
    name: 'block-404',
    title: '404 Not Found',
    description:
      'Centered 404 page with large heading, description, and go-home button. Optional illustration.',
    tier: 3,
    categories: ['block', 'error'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button'],
  },
  {
    name: 'block-500',
    title: '500 Server Error',
    description:
      'Server error page with error icon, heading, description, retry button, and support link.',
    tier: 3,
    categories: ['block', 'error'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button'],
  },
  {
    name: 'block-maintenance',
    title: 'Maintenance Page',
    description:
      'Maintenance/downtime page with icon, heading, estimated time, and optional email notification signup.',
    tier: 3,
    categories: ['block', 'error'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: ['button', 'input'],
  },

  // --- Marketing & Content (new) ---
  {
    name: 'block-stats-grid',
    title: 'Stats Grid',
    description:
      'Section with KPI tiles — value, label, optional icon, description, and trend indicator. 2 / 3 / 4 column variants.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-team-grid',
    title: 'Team Grid',
    description:
      'Team-members grid with avatar, name, role, optional bio, and social links. 2 / 3 / 4 column variants.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-blog-grid',
    title: 'Blog Grid',
    description:
      'Blog landing page with featured post, recent-articles grid, category badges, and author/date metadata.',
    tier: 3,
    categories: ['block', 'marketing', 'content'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-newsletter',
    title: 'Newsletter',
    description:
      'Email-capture section with heading, copy, validated input, async submit states (loading / success / error), and optional social-proof line.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-integrations',
    title: 'Integrations Grid',
    description:
      'Showcase grid of partner / integration tiles with logo, name, description, and status badge (available / beta / coming-soon).',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-comparison-table',
    title: 'Plan Comparison Table',
    description:
      'Side-by-side comparison of pricing plans with grouped feature rows, popular-plan highlight, and per-plan CTA buttons.',
    tier: 3,
    categories: ['block', 'marketing', 'pricing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-video-hero',
    title: 'Video Hero',
    description:
      'Hero section with looping background video, overlay gradient, headline, subhead, and primary + secondary CTAs.',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-banner-announcement',
    title: 'Announcement Banner',
    description:
      'Top-of-page promo banner with message, optional CTA, dismiss button, and 4 visual variants (default / gradient / success / warning).',
    tier: 3,
    categories: ['block', 'marketing'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },

  // --- Forms (new) ---
  {
    name: 'block-multistep-form',
    title: 'Multi-Step Form',
    description:
      'Single-card multi-step wizard with progress bar, step counter, back / continue buttons, and per-step content slot.',
    tier: 3,
    categories: ['block', 'form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-stepper-form',
    title: 'Stepper Form',
    description:
      'Two-column wizard with sidebar stepper showing all steps + status, and main content area with back / continue navigation.',
    tier: 3,
    categories: ['block', 'form'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },

  // --- App Pages (new) ---
  {
    name: 'block-billing-invoices',
    title: 'Billing & Invoices',
    description:
      'Billing page with current-plan card, upgrade CTA, and invoice history table (date, amount, status, download).',
    tier: 3,
    categories: ['block', 'app', 'settings'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-notifications-center',
    title: 'Notifications Center',
    description:
      'Inbox-style notifications page with all / unread filter tabs, unread badge, mark-as-read, dismiss, and per-notification action button.',
    tier: 3,
    categories: ['block', 'app'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-search-results',
    title: 'Search Results',
    description:
      'Search results page with persistent search bar, filter chips, result count, snippet listing, and empty-state.',
    tier: 3,
    categories: ['block', 'app'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-profile',
    title: 'Profile Page',
    description:
      'User profile with cover image, large avatar, name, role, bio, location / joined / socials row, stats grid, and recent activity list.',
    tier: 3,
    categories: ['block', 'app'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-onboarding',
    title: 'Onboarding Flow',
    description:
      'Centered onboarding card with hero illustration slot, segmented progress dots, per-step title + description + custom content, skip and next buttons.',
    tier: 3,
    categories: ['block', 'app'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-timeline-page',
    title: 'Timeline Page',
    description:
      'Vertical activity timeline with date-grouped events, sticky group headers, icon nodes on a guide line, and per-event title + description card.',
    tier: 3,
    categories: ['block', 'app'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-empty-state-page',
    title: 'Empty State Page',
    description:
      'Full-page empty state with circular icon, heading, description, and primary + secondary CTAs.',
    tier: 3,
    categories: ['block', 'app'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-loading-page',
    title: 'Loading Page',
    description:
      'Skeleton screen with header skeleton, three stat-card skeletons, and a list-row skeleton with configurable row count.',
    tier: 3,
    categories: ['block', 'app'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-tabs-page',
    title: 'Tabs Page Layout',
    description:
      'Page shell with heading, optional header actions, horizontal tab bar with count badges, and active tab content.',
    tier: 3,
    categories: ['block', 'app', 'layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
  {
    name: 'block-card-grid',
    title: 'Card Grid',
    description:
      'Generic responsive card grid with optional image, badge, title, description, metadata pairs, and CTA. Supports 2 / 3 / 4 columns and href / onClick / static items.',
    tier: 3,
    categories: ['block', 'app', 'layout'],
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
  },
];

// ============================================================
// Combined registry
// ============================================================

export const componentIndex: ComponentEntry[] = [
  ...tier1,
  ...tier2,
  ...tier3,
  ...blocks,
];

/**
 * Get a component by name.
 */
export function getComponent(name: string): ComponentEntry | undefined {
  return componentIndex.find((c) => c.name === name);
}

/**
 * Get all components in a category.
 */
export function getComponentsByCategory(category: string): ComponentEntry[] {
  return componentIndex.filter((c) => c.categories.includes(category));
}

/**
 * Get all components at a specific tier.
 */
export function getComponentsByTier(tier: 1 | 2 | 3): ComponentEntry[] {
  return componentIndex.filter((c) => c.tier === tier);
}

/**
 * Get all component names.
 */
export function getAllComponentNames(): string[] {
  return componentIndex.map((c) => c.name);
}

/**
 * Get all blocks (pre-composed page sections).
 */
export function getBlocks(): ComponentEntry[] {
  return componentIndex.filter((c) => c.categories.includes('block'));
}

/**
 * Get blocks by sub-category (auth, dashboard, marketing, etc.).
 */
export function getBlocksByCategory(category: string): ComponentEntry[] {
  return componentIndex.filter((c) =>
    c.categories.includes('block') && c.categories.includes(category)
  );
}
