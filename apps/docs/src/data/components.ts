import type { PropDef } from '../components/ui.tsx';

export interface ComponentExample {
  title: string;
  code: string;
}

export interface ComponentData {
  name: string;
  slug: string;
  description: string;
  category: string;
  tier: 1 | 2 | 3;
  frameworks: string[];
  dependencies: string[];
  props: PropDef[];
  importCode: string;
  examples: ComponentExample[];
  related: string[];
}

export const categories = [
  { id: 'form-controls', label: 'Form Controls', icon: '📝' },
  { id: 'display', label: 'Display', icon: '🖥️' },
  { id: 'layout', label: 'Layout', icon: '📐' },
  { id: 'feedback', label: 'Feedback', icon: '💬' },
  { id: 'overlay', label: 'Overlay', icon: '🪟' },
  { id: 'navigation', label: 'Navigation', icon: '🧭' },
  { id: 'composite', label: 'Composite', icon: '🧩' },
  { id: 'enterprise', label: 'Enterprise', icon: '🏢' },
  { id: 'ai', label: 'AI', icon: '🤖' },
  { id: 'responsive', label: 'Responsive', icon: '📱' },
];

export const components: ComponentData[] = [
  // ━━━ FORM CONTROLS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Button',
    slug: 'button',
    description:
      'Displays a button or a component that looks like a button. Supports multiple visual variants and sizes with full keyboard and screen reader accessibility.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['class-variance-authority'],
    importCode: `import { Button } from "@/components/ui/button"`,
    props: [
      {
        name: 'variant',
        type: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`,
        default: '"default"',
        description: 'The visual style variant of the button',
      },
      {
        name: 'size',
        type: `"xs" | "sm" | "default" | "lg" | "xl" | "icon"`,
        default: '"default"',
        description: 'The size of the button',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the button is disabled (also sets aria-disabled)',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Shows spinner and disables interaction while loading',
      },
      {
        name: 'type',
        type: `"button" | "submit" | "reset"`,
        default: '"button"',
        description: 'HTML button type attribute',
      },
      {
        name: 'className',
        type: 'string',
        default: '-',
        description: 'Additional CSS class names',
      },
      {
        name: 'onClick',
        type: '(e: MouseEvent) => void',
        default: '-',
        description: 'Click event handler',
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: '-',
        description: 'Button content',
        required: true,
      },
      {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description: 'Render as child element (slot pattern)',
      },
    ],
    examples: [
      { title: 'Default', code: `<Button>Click me</Button>` },
      {
        title: 'All Variants',
        code: `<div className="flex flex-wrap gap-2">
  <Button variant="default">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`,
      },
      {
        title: 'All Sizes',
        code: `<div className="flex items-center gap-2">
  <Button size="xs">Extra Small</Button>
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">Extra Large</Button>
  <Button size="icon"><PlusIcon /></Button>
</div>`,
      },
      {
        title: 'With Icons',
        code: `{/* Icon before text */}
<Button><MailIcon /> Login with Email</Button>

{/* Icon after text */}
<Button variant="outline">Next <ChevronRightIcon /></Button>

{/* Icon only */}
<Button size="icon" variant="outline"><HeartIcon /></Button>`,
      },
      {
        title: 'Loading State',
        code: `<Button loading>Processing...</Button>
<Button loading variant="outline">Saving</Button>`,
      },
      {
        title: 'Button Group',
        code: `<div className="inline-flex rounded-md shadow-sm">
  <Button variant="outline" className="rounded-r-none border-r-0">Left</Button>
  <Button variant="outline" className="rounded-none border-r-0">Center</Button>
  <Button variant="outline" className="rounded-l-none">Right</Button>
</div>`,
      },
      {
        title: 'Full Width with Social Login',
        code: `<div className="space-y-2 w-full max-w-sm">
  <Button className="w-full"><MailIcon /> Continue with Email</Button>
  <Button variant="outline" className="w-full">
    <GoogleIcon /> Continue with Google
  </Button>
  <div className="flex gap-2">
    <Button variant="outline" className="flex-1">Cancel</Button>
    <Button className="flex-1">Confirm</Button>
  </div>
</div>`,
      },
    ],
    related: ['input', 'label', 'form', 'toggle', 'dropdown-menu'],
  },
  {
    name: 'Input',
    slug: 'input',
    description:
      'A styled text input field supporting all HTML input types (text, email, password, number, search, url, tel). Includes focus ring, placeholder styling, disabled state, and integrates with Label for accessible forms. Use with aria-invalid for error states.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Input } from "@/components/ui/input"`,
    props: [
      {
        name: 'type',
        type: 'string',
        default: '"text"',
        description: 'HTML input type (text, email, password, etc.)',
      },
      { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text' },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the input is disabled',
      },
      { name: 'value', type: 'string', default: '-', description: 'Controlled input value' },
      {
        name: 'onChange',
        type: '(e: ChangeEvent) => void',
        default: '-',
        description: 'Change event handler',
      },
      {
        name: 'className',
        type: 'string',
        default: '-',
        description: 'Additional CSS class names',
      },
    ],
    examples: [
      { title: 'Default', code: `<Input placeholder="Enter your email" />` },
      {
        title: 'With Label',
        code: `<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`,
      },
      { title: 'Disabled', code: `<Input disabled placeholder="Disabled input" />` },
      { title: 'File Input', code: `<Input type="file" />` },
      { title: 'Error State', code: `<div className="space-y-2">\n  <Label htmlFor="email" className="text-destructive">Email</Label>\n  <Input id="email" aria-invalid="true" className="border-destructive" defaultValue="invalid@" />\n  <p className="text-xs text-destructive">Please enter a valid email address</p>\n</div>` },
      { title: 'With Icon', code: `<div className="relative">\n  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />\n  <Input className="pl-9" placeholder="Search components..." />\n</div>` },
    ],
    related: ['label', 'textarea', 'select', 'form'],
  },
  {
    name: 'Textarea',
    slug: 'textarea',
    description: 'A multi-line text input for longer form content. Supports auto-resize, character count, and all standard textarea attributes.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Textarea } from "@/components/ui/textarea"`,
    props: [
      { name: 'placeholder', type: 'string', default: '-', description: 'Placeholder text' },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the textarea is disabled',
      },
      { name: 'rows', type: 'number', default: '3', description: 'Number of visible text rows' },
      {
        name: 'className',
        type: 'string',
        default: '-',
        description: 'Additional CSS class names',
      },
    ],
    examples: [
      { title: 'Default', code: `<Textarea placeholder="Type your message here." />` },
      {
        title: 'With Label',
        code: `<div className="space-y-2">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" placeholder="Tell us about yourself" />
</div>`,
      },
    ],
    related: ['input', 'label', 'form'],
  },
  {
    name: 'Label',
    slug: 'label',
    description:
      'An accessible label for form controls. Automatically associates with inputs via htmlFor.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Label } from "@/components/ui/label"`,
    props: [
      {
        name: 'htmlFor',
        type: 'string',
        default: '-',
        description: 'ID of the associated form element',
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: '-',
        description: 'Label text content',
        required: true,
      },
      {
        name: 'className',
        type: 'string',
        default: '-',
        description: 'Additional CSS class names',
      },
    ],
    examples: [
      {
        title: 'With Input',
        code: `<div className="space-y-2">
  <Label htmlFor="name">Full Name</Label>
  <Input id="name" placeholder="John Doe" />
</div>`,
      },
    ],
    related: ['input', 'checkbox', 'switch'],
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    description: 'A boolean selection control that allows users to toggle between checked and unchecked states. Supports indeterminate state, disabled state, and integrates with Label for accessible forms. Use in settings, filters, multi-select lists, and agreement acceptance.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Checkbox } from "@/components/ui/checkbox"`,
    props: [
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Controlled checked state',
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        default: '-',
        description: 'Change handler',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the checkbox is disabled',
      },
    ],
    examples: [
      {
        title: 'Default',
        code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`,
      },
    ],
    related: ['switch', 'radio-group', 'label'],
  },
  {
    name: 'Switch',
    slug: 'switch',
    description: 'A toggle control for binary on/off states, styled as a sliding switch. Accessible via keyboard (Space/Enter). Use for settings that take effect immediately — notifications, dark mode, feature toggles. Pair with Label and description text for clarity.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Switch } from "@/components/ui/switch"`,
    props: [
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Controlled checked state',
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        default: '-',
        description: 'Change handler',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the switch is disabled',
      },
    ],
    examples: [
      {
        title: 'Default',
        code: `<div className="flex items-center gap-2">
  <Switch id="airplane" />
  <Label htmlFor="airplane">Airplane Mode</Label>
</div>`,
      },
    ],
    related: ['checkbox', 'toggle', 'label'],
  },
  {
    name: 'Select',
    slug: 'select',
    description: 'A dropdown selection control with a styled trigger button and scrollable option list. Supports custom option rendering, groups, separators, and keyboard navigation (arrow keys, type-ahead search). Use when users need to pick one option from a predefined list.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"`,
    props: [
      { name: 'value', type: 'string', default: '-', description: 'The controlled value' },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        default: '-',
        description: 'Value change handler',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '-',
        description: 'Placeholder when no value is selected',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the select is disabled',
      },
    ],
    examples: [
      {
        title: 'Default',
        code: `<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>`,
      },
    ],
    related: ['combobox', 'dropdown-menu'],
  },
  {
    name: 'Slider',
    slug: 'slider',
    description: 'A range input control for selecting numeric values within a range.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Slider } from "@/components/ui/slider"`,
    props: [
      { name: 'value', type: 'number', default: '-', description: 'Current value (controlled)' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'step', type: 'number', default: '1', description: 'Step increment' },
      { name: 'size', type: `"sm" | "default" | "lg"`, default: '"default"', description: 'Track and thumb size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider' },
      {
        name: 'aria-valuetext',
        type: 'string',
        default: '-',
        description: 'Human-readable value announced by screen readers (e.g. "$40")',
      },
      {
        name: 'onInput',
        type: '(value: number) => void',
        default: '-',
        description: 'Fires continuously while dragging',
      },
      {
        name: 'onChange',
        type: '(value: number) => void',
        default: '-',
        description: 'Fires when the value is committed (drag end / keyboard)',
      },
    ],
    examples: [
      { title: 'Default', code: `<Slider value={50} min={0} max={100} step={1} aria-label="Volume" />` },
      {
        title: 'Controlled',
        code: `const [vol, setVol] = useState(40)\n<Slider value={vol} onInput={setVol} aria-valuetext={vol + "%"} aria-label="Volume" />`,
      },
    ],
    related: ['input', 'progress'],
  },
  {
    name: 'Toggle',
    slug: 'toggle',
    description: 'A two-state button that can be toggled on or off.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Toggle } from "@/components/ui/toggle"`,
    props: [
      {
        name: 'pressed',
        type: 'boolean',
        default: 'false',
        description: 'Controlled pressed state',
      },
      {
        name: 'onPressedChange',
        type: '(pressed: boolean) => void',
        default: '-',
        description: 'Handler',
      },
      {
        name: 'variant',
        type: `"default" | "outline"`,
        default: '"default"',
        description: 'Visual style',
      },
      {
        name: 'size',
        type: `"default" | "sm" | "lg"`,
        default: '"default"',
        description: 'Size variant',
      },
    ],
    examples: [
      {
        title: 'Default',
        code: `<Toggle aria-label="Toggle bold">
  <BoldIcon className="h-4 w-4" />
</Toggle>`,
      },
    ],
    related: ['toggle-group', 'button', 'switch'],
  },
  {
    name: 'Toggle Group',
    slug: 'toggle-group',
    description: 'A group of toggle buttons for mutually exclusive or multi-selection.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
    props: [
      {
        name: 'type',
        type: `"single" | "multiple"`,
        default: '"single"',
        description: 'Selection mode',
        required: true,
      },
      { name: 'value', type: 'string | string[]', default: '-', description: 'Controlled value' },
      {
        name: 'onValueChange',
        type: '(value: string | string[]) => void',
        default: '-',
        description: 'Handler',
      },
    ],
    examples: [
      {
        title: 'Default',
        code: `<ToggleGroup type="single">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`,
      },
    ],
    related: ['toggle', 'radio-group'],
  },
  {
    name: 'Radio Group',
    slug: 'radio-group',
    description: 'A set of radio buttons for single-selection from multiple options.',
    category: 'form-controls',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    props: [
      { name: 'value', type: 'string', default: '-', description: 'Currently selected value' },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        default: '-',
        description: 'Handler when selection changes',
      },
    ],
    examples: [
      {
        title: 'Default',
        code: `<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
</RadioGroup>`,
      },
    ],
    related: ['select', 'toggle-group', 'checkbox'],
  },

  // ━━━ DISPLAY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Badge',
    slug: 'badge',
    description:
      'A compact inline label for status indicators, categories, tags, or metadata. Supports semantic variants (default, secondary, destructive, outline, success, warning, info), sizes (sm, default, lg), and an optional leading status dot. Great for notification counts, status tags, version labels, and feature flags.',
    category: 'display',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['class-variance-authority'],
    importCode: `import { Badge } from "@/components/ui/badge"`,
    props: [
      {
        name: 'variant',
        type: `"default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"`,
        default: '"default"',
        description: 'Visual style — includes semantic success/warning/info tones',
      },
      {
        name: 'size',
        type: `"sm" | "default" | "lg"`,
        default: '"default"',
        description: 'Badge size',
      },
      {
        name: 'dot',
        type: 'boolean',
        default: 'false',
        description: 'Renders a small leading status dot inheriting the text color',
      },
      {
        name: 'role',
        type: 'string',
        default: '-',
        description: 'Set "status" only for live, dynamic counters so screen readers announce changes',
      },
      {
        name: 'className',
        type: 'string',
        default: '-',
        description: 'Additional CSS class names',
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: '-',
        description: 'Badge content',
        required: true,
      },
    ],
    examples: [
      {
        title: 'Variants',
        code: `<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="info">Info</Badge>
</div>`,
      },
      {
        title: 'With status dot',
        code: `<Badge variant="success" dot>Online</Badge>`,
      },
      {
        title: 'Live notification count',
        code: `<Badge role="status" aria-label="3 unread messages">3</Badge>`,
      },
    ],
    related: ['button'],
  },
  {
    name: 'Avatar',
    slug: 'avatar',
    description: 'A circular image element with a fallback for representing users.',
    category: 'display',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"`,
    props: [
      {
        name: 'src',
        type: 'string',
        default: '-',
        description: 'Image source URL (on AvatarImage)',
      },
      { name: 'alt', type: 'string', default: '-', description: 'Alt text (on AvatarImage)' },
      {
        name: 'children',
        type: 'ReactNode',
        default: '-',
        description: 'Fallback content (on AvatarFallback)',
      },
    ],
    examples: [
      {
        title: 'Default',
        code: `<Avatar>
  <AvatarImage src="https://github.com/adhar.png" alt="User" />
  <AvatarFallback>AD</AvatarFallback>
</Avatar>`,
      },
    ],
    related: ['badge'],
  },
  {
    name: 'Separator',
    slug: 'separator',
    description: 'A visual divider between content sections.',
    category: 'display',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Separator } from "@/components/ui/separator"`,
    props: [
      {
        name: 'orientation',
        type: `"horizontal" | "vertical"`,
        default: '"horizontal"',
        description: 'Direction of the separator',
      },
      {
        name: 'className',
        type: 'string',
        default: '-',
        description: 'Additional CSS class names',
      },
    ],
    examples: [{ title: 'Default', code: `<Separator />` }],
    related: [],
  },
  {
    name: 'Skeleton',
    slug: 'skeleton',
    description: 'An animated placeholder for content that is loading.',
    category: 'display',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Skeleton } from "@/components/ui/skeleton"`,
    props: [
      {
        name: 'className',
        type: 'string',
        default: '-',
        description: 'Dimensions and shape via CSS classes',
      },
    ],
    examples: [
      {
        title: 'Card Loading',
        code: `<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>`,
      },
    ],
    related: ['spinner', 'progress'],
  },
  {
    name: 'Progress',
    slug: 'progress',
    description: 'A horizontal bar that shows completion progress.',
    category: 'display',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Progress } from "@/components/ui/progress"`,
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Progress value (0-100)' },
      {
        name: 'className',
        type: 'string',
        default: '-',
        description: 'Additional CSS class names',
      },
    ],
    examples: [{ title: 'Default', code: `<Progress value={66} />` }],
    related: ['spinner', 'skeleton'],
  },
  {
    name: 'Spinner',
    slug: 'spinner',
    description: 'An animated loading indicator.',
    category: 'display',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Spinner } from "@/components/ui/spinner"`,
    props: [
      {
        name: 'size',
        type: `"sm" | "default" | "lg"`,
        default: '"default"',
        description: 'Spinner size',
      },
    ],
    examples: [{ title: 'Default', code: `<Spinner />` }],
    related: ['progress', 'skeleton'],
  },
  {
    name: 'Aspect Ratio',
    slug: 'aspect-ratio',
    description: 'Maintains a consistent width-to-height ratio for content.',
    category: 'display',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
    props: [
      { name: 'ratio', type: 'number', default: '1', description: 'Aspect ratio (e.g., 16/9)' },
    ],
    examples: [{
      title: 'Default',
      code: `<AspectRatio ratio={16 / 9}>
  <img src="..." alt="Photo" className="rounded-md object-cover" />
</AspectRatio>`,
    }],
    related: [],
  },

  // ━━━ LAYOUT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Card',
    slug: 'card',
    description:
      'A versatile container for grouping related content with optional header, title, description, content area, and footer. Use Card as the building block for dashboards, settings panels, product listings, and any content that benefits from visual separation. Supports hover effects with the interactive prop.',
    category: 'layout',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import {
  Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter,
} from "@/components/ui/card"`,
    props: [
      {
        name: 'className',
        type: 'string',
        default: '-',
        description: 'Additional CSS class names',
      },
      {
        name: 'children',
        type: 'ReactNode',
        default: '-',
        description: 'Card content',
        required: true,
      },
    ],
    examples: [
      {
        title: 'Default',
        code: `<Card>
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one click.</CardDescription>
  </CardHeader>
  <CardContent>
    <Input placeholder="Project name" />
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`,
      },
    ],
    related: ['dialog', 'sheet'],
  },
  {
    name: 'Scroll Area',
    slug: 'scroll-area',
    description: 'A styled scrollable container with custom scrollbar.',
    category: 'layout',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { ScrollArea } from "@/components/ui/scroll-area"`,
    props: [{
      name: 'className',
      type: 'string',
      default: '-',
      description: 'Dimensions and styling',
    }],
    examples: [{
      title: 'Default',
      code: `<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  {/* scrollable content */}
</ScrollArea>`,
    }],
    related: [],
  },
  {
    name: 'Collapsible',
    slug: 'collapsible',
    description: 'An expandable/collapsible section for showing and hiding content.',
    category: 'layout',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"`,
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Controlled open state' },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        default: '-',
        description: 'Handler',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Hidden content here.
  </CollapsibleContent>
</Collapsible>`,
    }],
    related: ['accordion'],
  },
  {
    name: 'Resizable',
    slug: 'resizable',
    description: 'Resizable panel groups for building split-pane layouts.',
    category: 'layout',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['react-resizable-panels'],
    importCode:
      `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"`,
    props: [
      {
        name: 'direction',
        type: `"horizontal" | "vertical"`,
        default: '"horizontal"',
        description: 'Layout direction',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Right</ResizablePanel>
</ResizablePanelGroup>`,
    }],
    related: [],
  },

  // ━━━ FEEDBACK ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Alert',
    slug: 'alert',
    description: 'A prominent callout component for displaying contextual messages — informational, success, warning, or destructive. Includes icon, title, and description. Use for inline feedback, system notices, or important instructions that should not be missed.',
    category: 'feedback',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`,
    props: [
      {
        name: 'variant',
        type: `"default" | "destructive"`,
        default: '"default"',
        description: 'Alert style',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>`,
    }],
    related: ['toast', 'dialog'],
  },
  {
    name: 'Alert Dialog',
    slug: 'alert-dialog',
    description: 'A modal confirmation dialog that requires user action before continuing.',
    category: 'feedback',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`,
    props: [
      { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state' },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        default: '-',
        description: 'Handler',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    }],
    related: ['dialog', 'alert'],
  },
  {
    name: 'Toast',
    slug: 'toast',
    description: 'A full-featured toast notification system with 6 variants (default, success, warning, error, info, loading), 6 positions, auto-dismiss with progress bar, stacking, promise support (loading → success), action buttons, and close controls. Use for non-blocking feedback like "Changes saved", async operation status, and system alerts.',
    category: 'feedback',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { toast, Toaster } from "@/components/ui/toast"`,
    props: [
      { name: 'title', type: 'string', required: true, default: '-', description: 'Toast title text' },
      { name: 'description', type: 'string', default: '-', description: 'Optional description below title' },
      { name: 'variant', type: '"default" | "success" | "warning" | "error" | "info" | "loading"', default: '"default"', description: 'Visual variant with icon and color' },
      { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss duration in ms (0 = no auto-dismiss)' },
      { name: 'position', type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"', description: 'Screen position' },
      { name: 'action', type: '{ label: string; onClick: () => void }', default: '-', description: 'Optional action button' },
      { name: 'onDismiss', type: '() => void', default: '-', description: 'Called when toast is dismissed' },
    ],
    examples: [
      { title: 'Success', code: `toast.success("Changes saved", {\n  description: "Your profile has been updated.",\n})` },
      { title: 'Error', code: `toast.error("Upload failed", {\n  description: "Please try again.",\n  action: { label: "Retry", onClick: handleRetry },\n})` },
      { title: 'Promise', code: `toast.promise(saveChanges(), {\n  loading: "Saving...",\n  success: "Saved!",\n  error: "Failed to save.",\n})` },
      { title: 'Custom Position', code: `toast("Notification", {\n  position: "top-center",\n  duration: 5000,\n})` },
    ],
    related: ['alert'],
  },

  // ━━━ OVERLAY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Dialog',
    slug: 'dialog',
    description: 'A modal dialog window that overlays the page content for focused interactions. Includes backdrop overlay, close button, enter/exit animations, and keyboard accessibility (Escape to close, focus trap). Use for confirmations, forms, settings, or any content that requires user attention before continuing.',
    category: 'overlay',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"`,
    props: [
      { name: 'open', type: 'boolean', default: '-', description: 'Controlled open state' },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        default: '-',
        description: 'Handler',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Input placeholder="Name" />
      <Input placeholder="Username" />
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    }],
    related: ['alert-dialog', 'sheet', 'popover'],
  },
  {
    name: 'Sheet',
    slug: 'sheet',
    description: 'A panel that slides in from the edge of the screen.',
    category: 'overlay',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"`,
    props: [
      {
        name: 'side',
        type: `"top" | "right" | "bottom" | "left"`,
        default: '"right"',
        description: 'Edge to slide from',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
    </SheetHeader>
    {/* Content */}
  </SheetContent>
</Sheet>`,
    }],
    related: ['dialog', 'drawer'],
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    description: 'A popup that displays information related to an element when hovered or focused.',
    category: 'overlay',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`,
    props: [
      { name: 'content', type: 'ReactNode', default: '-', description: 'Tooltip content' },
      {
        name: 'delayDuration',
        type: 'number',
        default: '200',
        description: 'Delay before showing (ms)',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    }],
    related: ['popover', 'hover-card'],
  },
  {
    name: 'Popover',
    slug: 'popover',
    description: 'A rich content popup anchored to a trigger element.',
    category: 'overlay',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`,
    props: [
      { name: 'open', type: 'boolean', default: '-', description: 'Controlled state' },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        default: '-',
        description: 'Handler',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <p>Place content for the popover here.</p>
  </PopoverContent>
</Popover>`,
    }],
    related: ['tooltip', 'hover-card', 'dropdown-menu'],
  },
  {
    name: 'Hover Card',
    slug: 'hover-card',
    description: 'A card that appears when the user hovers over or focuses a trigger element.',
    category: 'overlay',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@adhar-ui</Button>
  </HoverCardTrigger>
  <HoverCardContent>
    <p>Adhar UI design system</p>
  </HoverCardContent>
</HoverCard>`,
    }],
    related: ['tooltip', 'popover'],
  },

  // ━━━ NAVIGATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Tabs',
    slug: 'tabs',
    description: 'Organizes content into switchable panels with a tab bar. Keyboard accessible (arrow keys to navigate, Enter/Space to select). Supports default and underline trigger styles, disabled tabs, and controlled/uncontrolled state. Ideal for settings pages, dashboards, and multi-section content.',
    category: 'navigation',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`,
    props: [
      { name: 'value', type: 'string', default: '-', description: 'Controlled active tab' },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        default: '-',
        description: 'Handler',
      },
      { name: 'defaultValue', type: 'string', default: '-', description: 'Default active tab' },
    ],
    examples: [{
      title: 'Default',
      code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings here.</TabsContent>
  <TabsContent value="password">Change password here.</TabsContent>
</Tabs>`,
    }],
    related: ['accordion', 'navigation-menu'],
  },
  {
    name: 'Accordion',
    slug: 'accordion',
    description: 'A vertically collapsing set of interactive headings that reveal content panels.',
    category: 'navigation',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"`,
    props: [
      {
        name: 'type',
        type: `"single" | "multiple"`,
        default: '"single"',
        description: 'Allow one or multiple items open',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: 'false',
        description: 'Allow all items to be collapsed',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    }],
    related: ['collapsible', 'tabs'],
  },
  {
    name: 'Dropdown Menu',
    slug: 'dropdown-menu',
    description: 'A menu of actions or options triggered by a button.',
    category: 'navigation',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    }],
    related: ['context-menu', 'menubar', 'select'],
  },
  {
    name: 'Context Menu',
    slug: 'context-menu',
    description: 'A menu triggered by right-clicking.',
    category: 'navigation',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    }],
    related: ['dropdown-menu'],
  },
  {
    name: 'Menubar',
    slug: 'menubar',
    description: 'A horizontal menu bar typically at the top of an application.',
    category: 'navigation',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
      <MenubarItem>Save</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    }],
    related: ['dropdown-menu', 'navigation-menu'],
  },
  {
    name: 'Navigation Menu',
    slug: 'navigation-menu',
    description: 'A collection of links for navigating websites.',
    category: 'navigation',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    }],
    related: ['menubar', 'breadcrumb'],
  },
  {
    name: 'Breadcrumb',
    slug: 'breadcrumb',
    description: 'A navigation trail showing the current page location.',
    category: 'navigation',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    }],
    related: ['navigation-menu'],
  },
  {
    name: 'Pagination',
    slug: 'pagination',
    description: 'Navigation for paged content.',
    category: 'navigation',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    }],
    related: ['data-table'],
  },
  {
    name: 'Sidebar',
    slug: 'sidebar',
    description: 'A collapsible sidebar layout for application navigation.',
    category: 'navigation',
    tier: 1,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"`,
    props: [
      {
        name: 'side',
        type: `"left" | "right"`,
        default: '"left"',
        description: 'Which side the sidebar appears',
      },
      {
        name: 'collapsible',
        type: `"offcanvas" | "icon" | "none"`,
        default: '"offcanvas"',
        description: 'Collapse behavior',
      },
    ],
    examples: [{
      title: 'Default',
      code: `<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`,
    }],
    related: ['navigation-menu'],
  },

  // ━━━ COMPOSITE (Tier 2) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Command',
    slug: 'command',
    description: 'A command palette for searching and running actions.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['cmdk'],
    importCode:
      `import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<Command>\n  <CommandInput placeholder="Type a command..." />\n  <CommandList>\n    <CommandItem>Profile</CommandItem>\n    <CommandItem>Settings</CommandItem>\n  </CommandList>\n</Command>`,
    }],
    related: ['dropdown-menu'],
  },
  {
    name: 'Combobox',
    slug: 'combobox',
    description: 'An autocomplete input with dropdown suggestions.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['cmdk'],
    importCode: `import { Combobox } from "@/components/ui/combobox"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<Combobox options={frameworks} placeholder="Select framework..." />`,
    }],
    related: ['select', 'command'],
  },
  {
    name: 'Date Picker',
    slug: 'date-picker',
    description: 'A calendar dropdown for selecting dates.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['date-fns', 'react-day-picker'],
    importCode: `import { DatePicker } from "@/components/ui/date-picker"`,
    props: [],
    examples: [{ title: 'Default', code: `<DatePicker />` }],
    related: ['calendar', 'input'],
  },
  {
    name: 'Calendar',
    slug: 'calendar',
    description: 'A month calendar view for selecting dates.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['date-fns', 'react-day-picker'],
    importCode: `import { Calendar } from "@/components/ui/calendar"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<Calendar mode="single" selected={date} onSelect={setDate} />`,
    }],
    related: ['date-picker'],
  },
  {
    name: 'Color Picker',
    slug: 'color-picker',
    description: 'A color selection control with swatch preview.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { ColorPicker } from "@/components/ui/color-picker"`,
    props: [],
    examples: [{ title: 'Default', code: `<ColorPicker value="#06b6d4" onChange={setColor} />` }],
    related: ['input'],
  },
  {
    name: 'Form',
    slug: 'form',
    description: 'Form utilities with validation via React Hook Form and Zod.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['react-hook-form', '@hookform/resolvers', 'zod'],
    importCode:
      `import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<Form {...form}>\n  <FormField name="email" render={({ field }) => (\n    <FormItem>\n      <FormLabel>Email</FormLabel>\n      <FormControl><Input {...field} /></FormControl>\n      <FormMessage />\n    </FormItem>\n  )} />\n</Form>`,
    }],
    related: ['input', 'select', 'checkbox'],
  },
  {
    name: 'Input OTP',
    slug: 'input-otp',
    description: 'A one-time password input with individual character slots.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<InputOTP maxLength={6}>\n  <InputOTPGroup>\n    <InputOTPSlot index={0} />\n    <InputOTPSlot index={1} />\n    <InputOTPSlot index={2} />\n  </InputOTPGroup>\n</InputOTP>`,
    }],
    related: ['input'],
  },
  {
    name: 'Table',
    slug: 'table',
    description: 'A styled HTML table for displaying tabular data.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode:
      `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Name</TableHead>\n      <TableHead>Status</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>Widget</TableCell>\n      <TableCell>Active</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
    }],
    related: ['data-table'],
  },
  {
    name: 'Carousel',
    slug: 'carousel',
    description: 'A scrolling component for cycling through items.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['embla-carousel-react'],
    importCode:
      `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<Carousel>\n  <CarouselContent>\n    <CarouselItem>Slide 1</CarouselItem>\n    <CarouselItem>Slide 2</CarouselItem>\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>`,
    }],
    related: [],
  },
  {
    name: 'Chart',
    slug: 'chart',
    description: 'Themed chart components powered by Recharts.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['recharts'],
    importCode: `import { ChartContainer, ChartTooltip } from "@/components/ui/chart"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<ChartContainer config={chartConfig}>\n  <BarChart data={data}>\n    <Bar dataKey="value" />\n    <ChartTooltip />\n  </BarChart>\n</ChartContainer>`,
    }],
    related: [],
  },
  {
    name: 'Drawer',
    slug: 'drawer',
    description: 'A mobile-friendly bottom sheet dialog powered by Vaul.',
    category: 'composite',
    tier: 2,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['vaul'],
    importCode:
      `import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<Drawer>\n  <DrawerTrigger asChild>\n    <Button variant="outline">Open Drawer</Button>\n  </DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Drawer Title</DrawerTitle>\n    </DrawerHeader>\n  </DrawerContent>\n</Drawer>`,
    }],
    related: ['sheet', 'dialog'],
  },
  // ━━━ ENTERPRISE (Tier 3) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Data Table',
    slug: 'data-table',
    description:
      'Feature-rich data table with sorting, filtering, pagination, and row selection. Powered by TanStack Table.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['@tanstack/react-table'],
    importCode: `import { DataTable } from "@/components/ui/data-table"`,
    props: [
      {
        name: 'columns',
        type: 'ColumnDef[]',
        default: '-',
        description: 'Column definitions',
        required: true,
      },
      { name: 'data', type: 'T[]', default: '-', description: 'Data array', required: true },
      { name: 'searchColumn', type: 'string', default: '-', description: 'Column key for search' },
    ],
    examples: [{
      title: 'Default',
      code:
        `const columns = [\n  { accessorKey: "name", header: "Name" },\n  { accessorKey: "status", header: "Status" },\n  { accessorKey: "email", header: "Email" },\n]\n\n<DataTable columns={columns} data={users} />`,
    }],
    related: ['table', 'pagination'],
  },
  {
    name: 'Form Builder',
    slug: 'form-builder',
    description: 'Dynamic form generation from schema definitions.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['react-hook-form', 'zod'],
    importCode: `import { FormBuilder } from "@/components/ui/form-builder"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<FormBuilder schema={formSchema} onSubmit={handleSubmit} />`,
    }],
    related: ['form', 'input'],
  },
  {
    name: 'File Upload',
    slug: 'file-upload',
    description: 'Drag-and-drop file upload with preview and progress.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { FileUpload } from "@/components/ui/file-upload"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<FileUpload accept="image/*" maxSize={5 * 1024 * 1024} onUpload={handleUpload} />`,
    }],
    related: ['input', 'progress'],
  },
  {
    name: 'Rich Text Editor',
    slug: 'rich-text-editor',
    description: 'WYSIWYG text editor powered by Tiptap.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['@tiptap/react', '@tiptap/starter-kit'],
    importCode: `import { RichTextEditor } from "@/components/ui/rich-text-editor"`,
    props: [],
    examples: [{ title: 'Default', code: `<RichTextEditor content={html} onChange={setHtml} />` }],
    related: ['textarea'],
  },
  {
    name: 'Kanban Board',
    slug: 'kanban-board',
    description: 'A drag-and-drop Kanban board for task management.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['@dnd-kit/core', '@dnd-kit/sortable'],
    importCode: `import { KanbanBoard } from "@/components/ui/kanban-board"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<KanbanBoard columns={columns} items={items} onDragEnd={handleDragEnd} />`,
    }],
    related: [],
  },
  {
    name: 'Timeline',
    slug: 'timeline',
    description: 'A vertical timeline for displaying chronological events.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Timeline, TimelineItem } from "@/components/ui/timeline"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<Timeline>\n  <TimelineItem title="Created" date="Jan 1" />\n  <TimelineItem title="Updated" date="Feb 15" />\n</Timeline>`,
    }],
    related: ['stepper'],
  },
  {
    name: 'Tree View',
    slug: 'tree-view',
    description: 'A hierarchical tree view for nested data navigation.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { TreeView } from "@/components/ui/tree-view"`,
    props: [],
    examples: [{ title: 'Default', code: `<TreeView data={fileTree} onSelect={handleSelect} />` }],
    related: ['accordion', 'sidebar'],
  },
  {
    name: 'Stepper',
    slug: 'stepper',
    description: 'A multi-step progress indicator and wizard.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Stepper, Step } from "@/components/ui/stepper"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<Stepper activeStep={1}>\n  <Step title="Account" />\n  <Step title="Profile" />\n  <Step title="Review" />\n</Stepper>`,
    }],
    related: ['progress', 'tabs'],
  },
  {
    name: 'Multi Select',
    slug: 'multi-select',
    description: 'A multi-value selection control with tags.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { MultiSelect } from "@/components/ui/multi-select"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<MultiSelect\n  options={options}\n  selected={selected}\n  onChange={setSelected}\n/>`,
    }],
    related: ['select', 'combobox'],
  },
  {
    name: 'Transfer List',
    slug: 'transfer-list',
    description: 'A dual-list for moving items between two collections.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { TransferList } from "@/components/ui/transfer-list"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<TransferList source={available} target={selected} onChange={handleChange} />`,
    }],
    related: ['multi-select'],
  },
  {
    name: 'Empty State',
    slug: 'empty-state',
    description: 'A placeholder for when there is no data to display.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { EmptyState } from "@/components/ui/empty-state"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<EmptyState\n  icon={<InboxIcon />}\n  title="No results"\n  description="Try adjusting your search."\n  action={<Button>Clear filters</Button>}\n/>`,
    }],
    related: [],
  },
  {
    name: 'Stat Card',
    slug: 'stat-card',
    description: 'A dashboard metric card with value, trend, and icon.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { StatCard } from "@/components/ui/stat-card"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<StatCard title="Revenue" value="$45,231" change={+12.5} />`,
    }],
    related: ['card'],
  },
  {
    name: 'Kbd',
    slug: 'kbd',
    description: 'A keyboard shortcut indicator.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Kbd } from "@/components/ui/kbd"`,
    props: [],
    examples: [{ title: 'Default', code: `<Kbd>⌘K</Kbd>` }],
    related: [],
  },
  {
    name: 'Copy Button',
    slug: 'copy-button',
    description: 'A button that copies text to clipboard with feedback.',
    category: 'enterprise',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { CopyButton } from "@/components/ui/copy-button"`,
    props: [],
    examples: [{ title: 'Default', code: `<CopyButton value="npm install adhar-ui" />` }],
    related: ['button'],
  },

  // ━━━ AI (Tier 3) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Chat',
    slug: 'chat',
    description: 'A complete chat interface with message list, input, and streaming support.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Chat } from "@/components/ui/chat"`,
    props: [{
      name: 'messages',
      type: 'Message[]',
      default: '[]',
      description: 'Chat messages array',
    }, {
      name: 'onSend',
      type: '(message: string) => void',
      default: '-',
      description: 'Send message handler',
    }, {
      name: 'isLoading',
      type: 'boolean',
      default: 'false',
      description: 'Show typing indicator',
    }],
    examples: [{
      title: 'Default',
      code: `<Chat\n  messages={messages}\n  onSend={handleSend}\n  isLoading={isStreaming}\n/>`,
    }],
    related: ['prompt-input', 'message-bubble', 'streaming-text'],
  },
  {
    name: 'Prompt Input',
    slug: 'prompt-input',
    description: 'A specialized input for AI prompts with submit button.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { PromptInput } from "@/components/ui/prompt-input"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<PromptInput\n  placeholder="Ask anything..."\n  onSubmit={handleSubmit}\n/>`,
    }],
    related: ['chat', 'textarea'],
  },
  {
    name: 'Streaming Text',
    slug: 'streaming-text',
    description: 'Renders streaming text with typewriter effect and markdown support.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['react-markdown', 'remark-gfm'],
    importCode: `import { StreamingText } from "@/components/ui/streaming-text"`,
    props: [],
    examples: [{ title: 'Default', code: `<StreamingText content={text} isStreaming={true} />` }],
    related: ['chat', 'code-block'],
  },
  {
    name: 'Code Block',
    slug: 'code-block',
    description: 'Syntax-highlighted code display with copy button.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['shiki'],
    importCode: `import { CodeBlock } from "@/components/ui/code-block"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<CodeBlock\n  language="typescript"\n  code={\`const x = 42;\`}\n/>`,
    }],
    related: ['streaming-text'],
  },
  {
    name: 'Model Selector',
    slug: 'model-selector',
    description: 'A dropdown for selecting AI models.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { ModelSelector } from "@/components/ui/model-selector"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<ModelSelector\n  models={models}\n  selected={selectedModel}\n  onSelect={setSelectedModel}\n/>`,
    }],
    related: ['select'],
  },
  {
    name: 'Token Counter',
    slug: 'token-counter',
    description: 'Displays token count and limits for AI interactions.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { TokenCounter } from "@/components/ui/token-counter"`,
    props: [],
    examples: [{ title: 'Default', code: `<TokenCounter used={1500} limit={4096} />` }],
    related: ['progress'],
  },
  {
    name: 'Thinking Indicator',
    slug: 'thinking-indicator',
    description: 'An animated indicator showing AI is processing.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { ThinkingIndicator } from "@/components/ui/thinking-indicator"`,
    props: [],
    examples: [{ title: 'Default', code: `<ThinkingIndicator />` }],
    related: ['spinner'],
  },
  {
    name: 'Feedback Buttons',
    slug: 'feedback-buttons',
    description: 'Thumbs up/down buttons for rating AI responses.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { FeedbackButtons } from "@/components/ui/feedback-buttons"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<FeedbackButtons onFeedback={(type) => handleFeedback(type)} />`,
    }],
    related: [],
  },
  {
    name: 'Suggestion Chips',
    slug: 'suggestion-chips',
    description: 'Clickable suggestion pills for AI prompt starters.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { SuggestionChips } from "@/components/ui/suggestion-chips"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<SuggestionChips\n  suggestions={["Explain this", "Summarize", "Translate"]}\n  onSelect={handleSelect}\n/>`,
    }],
    related: ['prompt-input'],
  },
  {
    name: 'Message Bubble',
    slug: 'message-bubble',
    description: 'A styled message bubble for chat interfaces.',
    category: 'ai',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { MessageBubble } from "@/components/ui/message-bubble"`,
    props: [],
    examples: [{
      title: 'Default',
      code:
        `<MessageBubble role="user" content="Hello!" />\n<MessageBubble role="assistant" content="Hi! How can I help?" />`,
    }],
    related: ['chat'],
  },

  // ━━━ RESPONSIVE (Tier 3) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    name: 'Responsive Sidebar',
    slug: 'responsive-sidebar',
    description: 'A sidebar that adapts between desktop and mobile layouts.',
    category: 'responsive',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { ResponsiveSidebar } from "@/components/ui/responsive-sidebar"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<ResponsiveSidebar>{/* nav links */}</ResponsiveSidebar>`,
    }],
    related: ['sidebar'],
  },
  {
    name: 'Bottom Sheet',
    slug: 'bottom-sheet',
    description: 'A mobile-first bottom sheet that slides up from the bottom.',
    category: 'responsive',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['vaul'],
    importCode: `import { BottomSheet } from "@/components/ui/bottom-sheet"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<BottomSheet trigger={<Button>Open</Button>}>\n  {/* Content */}\n</BottomSheet>`,
    }],
    related: ['drawer', 'sheet'],
  },
  {
    name: 'Split View',
    slug: 'split-view',
    description: 'A responsive split-pane layout with collapsible panels.',
    category: 'responsive',
    tier: 3,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { SplitView } from "@/components/ui/split-view"`,
    props: [],
    examples: [{
      title: 'Default',
      code: `<SplitView\n  left={<Navigation />}\n  right={<Content />}\n  breakpoint={768}\n/>`,
    }],
    related: ['resizable'],
  },
  // ━━━ NEW COMPONENTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    slug: 'sortable-list',
    name: 'Sortable List',
    description: 'Drag and drop reorderable list with grip handles and smooth animations.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { SortableList, SortableItem } from "@/components/ui/sortable-list"`,
    props: [
      { name: 'items', type: 'T[]', required: true, default: '-', description: 'Array of items to render' },
      { name: 'onReorder', type: '(items: T[]) => void', required: true, default: '-', description: 'Called when items are reordered' },
      { name: 'renderItem', type: '(item: T) => ReactNode', required: true, default: '-', description: 'Render function for each item' },
    ],
    examples: [{ title: 'Default', code: `<SortableList\n  items={tasks}\n  onReorder={setTasks}\n  renderItem={(task) => <TaskCard task={task} />}\n/>` }],
    related: ['kanban-board', 'transfer-list'],
  },
  {
    slug: 'tag-input',
    name: 'Tag Input',
    description: 'Input field that allows adding and removing tags with keyboard support.',
    category: 'form-controls',
    tier: 2 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { TagInput } from "@/components/ui/tag-input"`,
    props: [
      { name: 'value', type: 'string[]', required: false, default: '[]', description: 'Current tags' },
      { name: 'onChange', type: '(tags: string[]) => void', required: false, default: '-', description: 'Called when tags change' },
      { name: 'placeholder', type: 'string', required: false, default: '"Add tag..."', description: 'Input placeholder' },
      { name: 'max', type: 'number', required: false, default: '-', description: 'Maximum number of tags' },
    ],
    examples: [{ title: 'Default', code: `<TagInput\n  value={tags}\n  onChange={setTags}\n  placeholder="Add a tag..."\n  max={5}\n/>` }],
    related: ['multi-select', 'input'],
  },
  {
    slug: 'avatar-group',
    name: 'Avatar Group',
    description: 'Stacked avatar group with overflow count indicator.',
    category: 'display',
    tier: 1 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { AvatarGroup } from "@/components/ui/avatar-group"`,
    props: [
      { name: 'max', type: 'number', required: false, default: '3', description: 'Maximum visible avatars' },
    ],
    examples: [{ title: 'Default', code: `<AvatarGroup max={3}>\n  <Avatar fallback="AC" />\n  <Avatar fallback="BS" />\n  <Avatar fallback="CD" />\n  <Avatar fallback="DW" />\n</AvatarGroup>` }],
    related: ['avatar'],
  },
  {
    slug: 'search-input',
    name: 'Search Input',
    description: 'Input field with search icon, clear button, and keyboard shortcut hint.',
    category: 'form-controls',
    tier: 1 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { SearchInput } from "@/components/ui/search-input"`,
    props: [
      { name: 'value', type: 'string', required: false, default: '""', description: 'Search value' },
      { name: 'onChange', type: '(value: string) => void', required: false, default: '-', description: 'Called on input change' },
      { name: 'placeholder', type: 'string', required: false, default: '"Search..."', description: 'Placeholder text' },
      { name: 'shortcut', type: 'string', required: false, default: '-', description: 'Keyboard shortcut hint' },
    ],
    examples: [{ title: 'Default', code: `<SearchInput placeholder="Search components..." shortcut="⌘K" />` }],
    related: ['input', 'command'],
  },
  {
    slug: 'number-input',
    name: 'Number Input',
    description: 'Numeric input with increment/decrement buttons and min/max constraints.',
    category: 'form-controls',
    tier: 1 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { NumberInput } from "@/components/ui/number-input"`,
    props: [
      { name: 'value', type: 'number', required: false, default: '0', description: 'Current value' },
      { name: 'onChange', type: '(value: number) => void', required: false, default: '-', description: 'Called on change' },
      { name: 'min', type: 'number', required: false, default: '-', description: 'Minimum value' },
      { name: 'max', type: 'number', required: false, default: '-', description: 'Maximum value' },
      { name: 'step', type: 'number', required: false, default: '1', description: 'Increment step' },
    ],
    examples: [{ title: 'Default', code: `<NumberInput value={qty} onChange={setQty} min={0} max={99} step={1} />` }],
    related: ['input', 'slider'],
  },
  {
    slug: 'area-chart',
    name: 'Area Chart',
    description: 'Filled area chart for visualizing trends over time.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { AreaChart } from "@/components/ui/area-chart"`,
    props: [
      { name: 'data', type: 'DataPoint[]', required: true, default: '-', description: 'Chart data points' },
      { name: 'color', type: 'string', required: false, default: '"primary"', description: 'Fill color' },
    ],
    examples: [{ title: 'Default', code: `<AreaChart data={revenueData} color="primary" />` }],
    related: ['chart', 'line-chart', 'bar-chart'],
  },
  {
    slug: 'bar-chart',
    name: 'Bar Chart',
    description: 'Vertical or horizontal bar chart for comparing values across categories.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { BarChart } from "@/components/ui/bar-chart"`,
    props: [
      { name: 'data', type: 'DataPoint[]', required: true, default: '-', description: 'Chart data' },
      { name: 'orientation', type: '"vertical" | "horizontal"', required: false, default: '"vertical"', description: 'Bar direction' },
    ],
    examples: [{ title: 'Default', code: `<BarChart data={salesData} orientation="vertical" />` }],
    related: ['chart', 'area-chart', 'line-chart'],
  },
  {
    slug: 'line-chart',
    name: 'Line Chart',
    description: 'Line chart for tracking metrics over time with multiple series support.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { LineChart } from "@/components/ui/line-chart"`,
    props: [
      { name: 'data', type: 'DataPoint[]', required: true, default: '-', description: 'Chart data' },
      { name: 'series', type: 'Series[]', required: false, default: '-', description: 'Multiple data series' },
    ],
    examples: [{ title: 'Default', code: `<LineChart data={metrics} series={[{ key: "users" }, { key: "revenue" }]} />` }],
    related: ['chart', 'area-chart', 'bar-chart'],
  },
  {
    slug: 'pie-chart',
    name: 'Pie Chart',
    description: 'Pie or donut chart for displaying proportional data.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { PieChart } from "@/components/ui/pie-chart"`,
    props: [
      { name: 'data', type: 'Slice[]', required: true, default: '-', description: 'Chart segments' },
      { name: 'donut', type: 'boolean', required: false, default: 'false', description: 'Donut style' },
    ],
    examples: [{ title: 'Default', code: `<PieChart data={distribution} donut />` }],
    related: ['chart', 'bar-chart'],
  },
  {
    slug: 'radar-chart',
    name: 'Radar Chart',
    description: 'Radar/spider chart for comparing multivariate data across categories.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { RadarChart } from "@/components/ui/radar-chart"`,
    props: [
      { name: 'data', type: 'RadarPoint[]', required: true, default: '-', description: 'Data points for each axis' },
      { name: 'axes', type: 'string[]', required: true, default: '-', description: 'Axis labels' },
    ],
    examples: [{ title: 'Default', code: `<RadarChart\n  axes={["Speed", "Power", "Range", "Defense", "Accuracy"]}\n  data={[80, 65, 90, 50, 75]}\n/>` }],
    related: ['chart', 'pie-chart'],
  },
  {
    slug: 'scatter-chart',
    name: 'Scatter Chart',
    description: 'Scatter plot for visualizing correlation between two variables.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { ScatterChart } from "@/components/ui/scatter-chart"`,
    props: [
      { name: 'data', type: '{ x: number; y: number }[]', required: true, default: '-', description: 'Data points' },
    ],
    examples: [{ title: 'Default', code: `<ScatterChart data={correlationData} />` }],
    related: ['chart', 'line-chart'],
  },
  {
    slug: 'gauge-chart',
    name: 'Gauge Chart',
    description: 'Circular gauge for displaying a single metric against a target.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { GaugeChart } from "@/components/ui/gauge-chart"`,
    props: [
      { name: 'value', type: 'number', required: true, default: '-', description: 'Current value (0-100)' },
      { name: 'label', type: 'string', required: false, default: '-', description: 'Center label' },
    ],
    examples: [{ title: 'Default', code: `<GaugeChart value={72} label="CPU" />` }],
    related: ['chart', 'progress'],
  },
  {
    slug: 'candlestick-chart',
    name: 'Candlestick Chart',
    description: 'Financial candlestick chart showing open, high, low, close (OHLC) data.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { CandlestickChart } from "@/components/ui/candlestick-chart"`,
    props: [
      { name: 'data', type: 'OHLC[]', required: true, default: '-', description: 'Open/High/Low/Close data' },
    ],
    examples: [{ title: 'Default', code: `<CandlestickChart data={stockData} />` }],
    related: ['chart', 'line-chart'],
  },
  {
    slug: 'heatmap',
    name: 'Heatmap',
    description: 'Grid-based heatmap for visualizing intensity across two dimensions.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Heatmap } from "@/components/ui/heatmap"`,
    props: [
      { name: 'data', type: 'number[][]', required: true, default: '-', description: 'Matrix of values' },
      { name: 'xLabels', type: 'string[]', required: false, default: '-', description: 'X-axis labels' },
      { name: 'yLabels', type: 'string[]', required: false, default: '-', description: 'Y-axis labels' },
    ],
    examples: [{ title: 'Default', code: `<Heatmap\n  data={activityMatrix}\n  xLabels={months}\n  yLabels={days}\n/>` }],
    related: ['chart'],
  },
  {
    slug: 'sparkline',
    name: 'Sparkline',
    description: 'Compact inline chart for embedding in text, tables, or cards.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Sparkline } from "@/components/ui/sparkline"`,
    props: [
      { name: 'data', type: 'number[]', required: true, default: '-', description: 'Data values' },
      { name: 'color', type: 'string', required: false, default: '"primary"', description: 'Line color' },
      { name: 'fill', type: 'boolean', required: false, default: 'false', description: 'Show area fill' },
    ],
    examples: [{ title: 'Default', code: `<Sparkline data={[5, 10, 7, 15, 12, 18]} />` }],
    related: ['chart', 'line-chart', 'stat-card'],
  },
  {
    slug: 'treemap',
    name: 'Treemap',
    description: 'Hierarchical treemap chart showing proportional data as nested rectangles.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Treemap } from "@/components/ui/treemap"`,
    props: [
      { name: 'data', type: 'TreemapNode[]', required: true, default: '-', description: 'Hierarchical data' },
    ],
    examples: [{ title: 'Default', code: `<Treemap data={diskUsageData} />` }],
    related: ['chart', 'pie-chart'],
  },
  {
    slug: 'funnel-chart',
    name: 'Funnel Chart',
    description: 'Funnel visualization for conversion pipelines and sales funnels.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { FunnelChart } from "@/components/ui/funnel-chart"`,
    props: [
      { name: 'data', type: '{ label: string; value: number }[]', required: true, default: '-', description: 'Funnel stages' },
    ],
    examples: [{ title: 'Default', code: `<FunnelChart data={[\n  { label: "Visitors", value: 5000 },\n  { label: "Leads", value: 3000 },\n  { label: "Customers", value: 1200 },\n]} />` }],
    related: ['chart', 'bar-chart'],
  },
  {
    slug: 'notification',
    name: 'Notification',
    description: 'Notification badge and notification center with grouped items.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Notification, NotificationCenter } from "@/components/ui/notification"`,
    props: [
      { name: 'count', type: 'number', required: false, default: '0', description: 'Unread count' },
    ],
    examples: [{ title: 'Default', code: `<NotificationCenter>\n  <Notification title="New message" time="2m ago" />\n  <Notification title="Task completed" time="1h ago" read />\n</NotificationCenter>` }],
    related: ['toast', 'badge'],
  },
  {
    slug: 'image',
    name: 'Image',
    description: 'Responsive image with lazy loading, fallback, and lightbox support.',
    category: 'display',
    tier: 1 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: [],
    importCode: `import { Image } from "@/components/ui/image"`,
    props: [
      { name: 'src', type: 'string', required: true, default: '-', description: 'Image source URL' },
      { name: 'alt', type: 'string', required: true, default: '-', description: 'Alt text' },
      { name: 'fallback', type: 'ReactNode', required: false, default: '-', description: 'Fallback on error' },
      { name: 'lazy', type: 'boolean', required: false, default: 'true', description: 'Lazy loading' },
    ],
    examples: [{ title: 'Default', code: `<Image src="/photo.jpg" alt="Photo" className="rounded-lg" />` }],
    related: ['avatar', 'aspect-ratio'],
  },
  {
    slug: 'drag-and-drop',
    name: 'Drag and Drop',
    description: 'Flexible drag-and-drop container with drop zones, sortable items, and visual feedback for building interactive interfaces.',
    category: 'enterprise',
    tier: 3 as const,
    frameworks: ['react', 'vue', 'solid', 'svelte', 'angular'],
    dependencies: ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
    importCode: `import { DragDropContext, Droppable, Draggable } from "@/components/ui/drag-and-drop"`,
    props: [
      { name: 'onDragEnd', type: '(result: DragResult) => void', required: true, default: '-', description: 'Called when drag ends with source and destination' },
      { name: 'children', type: 'ReactNode', required: true, default: '-', description: 'Droppable zones and draggable items' },
      { name: 'direction', type: '"vertical" | "horizontal"', required: false, default: '"vertical"', description: 'Drag direction' },
      { name: 'disabled', type: 'boolean', required: false, default: 'false', description: 'Disable all drag interactions' },
    ],
    examples: [{
      title: 'Sortable List',
      code: `<DragDropContext onDragEnd={handleDragEnd}>\n  <Droppable id="list">\n    {items.map((item, index) => (\n      <Draggable key={item.id} id={item.id} index={index}>\n        <Card>{item.content}</Card>\n      </Draggable>\n    ))}\n  </Droppable>\n</DragDropContext>`,
    }, {
      title: 'Multi-Zone',
      code: `<DragDropContext onDragEnd={handleDragEnd}>\n  <div className="grid grid-cols-2 gap-4">\n    <Droppable id="todo">\n      {todoItems.map(item => <Draggable key={item.id} id={item.id}>{item.text}</Draggable>)}\n    </Droppable>\n    <Droppable id="done">\n      {doneItems.map(item => <Draggable key={item.id} id={item.id}>{item.text}</Draggable>)}\n    </Droppable>\n  </div>\n</DragDropContext>`,
    }],
    related: ['sortable-list', 'kanban-board', 'transfer-list'],
  },
];

export function getComponentBySlug(slug: string): ComponentData | undefined {
  return components.find((c) => c.slug === slug);
}

export function getComponentsByCategory(categoryId: string): ComponentData[] {
  return components.filter((c) => c.category === categoryId);
}

export function getComponentsByTier(tier: 1 | 2 | 3): ComponentData[] {
  return components.filter((c) => c.tier === tier);
}

export function searchComponents(query: string): ComponentData[] {
  const q = query.toLowerCase();
  return components.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q),
  );
}

// ─── Multi-framework code generation ──────────────────────────────────────────

export type FrameworkId = 'react' | 'vue' | 'solid' | 'svelte' | 'angular';

export interface FrameworkInfo {
  id: FrameworkId;
  label: string;
  icon: string;
  color: string;
  fileExt: string;
}

export const frameworks: FrameworkInfo[] = [
  { id: 'react', label: 'React', icon: 'R', color: 'bg-sky-500', fileExt: '.tsx' },
  { id: 'vue', label: 'Vue', icon: 'V', color: 'bg-emerald-500', fileExt: '.vue' },
  { id: 'solid', label: 'Solid', icon: 'S', color: 'bg-blue-600', fileExt: '.tsx' },
  { id: 'svelte', label: 'Svelte', icon: 'S', color: 'bg-orange-500', fileExt: '.svelte' },
  { id: 'angular', label: 'Angular', icon: 'A', color: 'bg-red-500', fileExt: '.ts' },
];

function toKebab(s: string) {
  return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function toPascal(s: string) {
  return s.replace(/(^\w|-\w)/g, (m) => m.replace('-', '').toUpperCase());
}

export function getFrameworkCode(comp: ComponentData, fw: FrameworkId): string {
  const name = comp.name;
  const pascal = toPascal(comp.slug);
  const kebab = toKebab(name.replace(/\s+/g, ''));
  const firstExample = comp.examples?.[0]?.code || `<${name} />`;

  switch (fw) {
    case 'react':
      return `import { ${name.replace(/\s+/g, '')} } from "@adhar-ui/react/${comp.slug}"

export default function Demo() {
  return (
    ${firstExample}
  )
}`;

    case 'vue':
      return `<script setup lang="ts">
import { ${pascal} } from "@adhar-ui/vue/${comp.slug}"
</script>

<template>
  ${
        firstExample
          .replace(/className=/g, 'class=')
          .replace(/onClick=/g, '@click=')
          .replace(/{true}/g, '')
          .replace(/{false}/g, '')
          .replace(/\{`([^`]*)`\}/g, '"$1"')
      }
</template>`;

    case 'solid':
      return `import { ${pascal} } from "@adhar-ui/solid/${comp.slug}"

export default function Demo() {
  return (
    ${
        firstExample
          .replace(/className=/g, 'class=')
          .replace(/onChange=/g, 'onInput=')
      }
  )
}`;

    case 'svelte':
      return `<script lang="ts">
  import { ${pascal} } from "@adhar-ui/svelte/${comp.slug}"
</script>

${
        firstExample
          .replace(/className=/g, 'class=')
          .replace(/onClick=/g, 'on:click=')
          .replace(/onChange=/g, 'on:change=')
      }`;

    case 'angular':
      return `import { Component } from "@angular/core"
import { ${pascal}Component } from "@adhar-ui/angular/${comp.slug}"

@Component({
  selector: "app-demo",
  standalone: true,
  imports: [${pascal}Component],
  template: \`
    ${
        firstExample
          .replace(/className=/g, 'class=')
          .replace(/onClick=/g, '(click)=')
          .replace(/<(\w+)/g, (_, tag) => `<adhar-${toKebab(tag)}`)
          .replace(/<\/(\w+)>/g, (_, tag) => `</adhar-${toKebab(tag)}>`)
      }
  \`,
})
export class DemoComponent {}`;
  }
}

export function getFrameworkExplanation(fw: FrameworkId): string {
  switch (fw) {
    case 'react':
      return 'Import directly from @adhar-ui/react. Components are fully typed with TypeScript. Use className for styling and standard React event handlers.';
    case 'vue':
      return 'Import from @adhar-ui/vue with <script setup>. Props use kebab-case in templates. Use v-model for two-way binding and @event for event handlers.';
    case 'solid':
      return 'Import from @adhar-ui/solid. Similar to React JSX but uses class instead of className. Reactivity is fine-grained via signals — no virtual DOM diffing.';
    case 'svelte':
      return 'Import from @adhar-ui/svelte in a <script> tag. Use class instead of className and on:event for event handlers. Supports Svelte stores for reactive state.';
    case 'angular':
      return 'Import standalone components from @adhar-ui/angular. Use in the imports array of your component decorator. Properties use kebab-case and events use (event) syntax.';
  }
}

export function getNextComponent(slug: string): ComponentData | undefined {
  const idx = components.findIndex((c) => c.slug === slug);
  return idx >= 0 && idx < components.length - 1 ? components[idx + 1] : undefined;
}

export function getPrevComponent(slug: string): ComponentData | undefined {
  const idx = components.findIndex((c) => c.slug === slug);
  return idx > 0 ? components[idx - 1] : undefined;
}
