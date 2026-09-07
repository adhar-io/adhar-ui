import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

const meta: Meta = { title: 'Components/Form Controls' };
export default meta;

// ─── Button ───────────────────────────────────────────────────────────

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';

function Button({
  variant = 'default',
  size = 'default',
  children = 'Click me',
  disabled = false,
  loading = false,
  fullWidth = false,
}: {
  variant?: string;
  size?: string;
  children?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}) {
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/80',
    destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
    outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };
  const sizes: Record<string, string> = {
    xs: 'h-7 rounded px-2 text-xs gap-1',
    sm: 'h-9 rounded-md px-3 text-xs',
    default: 'h-10 px-4 py-2',
    lg: 'h-11 rounded-md px-8 text-base',
    xl: 'h-12 rounded-lg px-10 text-base',
    icon: 'h-10 w-10 p-0',
    'icon-sm': 'h-9 w-9 p-0',
    'icon-lg': 'h-11 w-11 p-0',
  };
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(btnBase, variants[variant] || '', sizes[size] || '', fullWidth && 'w-full')}
    >
      {loading && (
        <span className='inline-block size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none' />
      )}
      {children}
    </button>
  );
}

export const ButtonStory: StoryObj<typeof Button> = {
  name: 'Button',
  render: (args) => <Button {...args} />,
  args: { variant: 'default', size: 'default', children: 'Click me', disabled: false, loading: false, fullWidth: false },
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    size: { control: 'select', options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'] },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

// ─── Input ────────────────────────────────────────────────────────────

const inputBase =
  'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

function Input({
  type = 'text',
  placeholder = 'Enter text...',
  disabled = false,
  error = false,
}: {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
}) {
  return (
    <div className="max-w-sm space-y-1">
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(inputBase, error ? 'border-destructive' : 'border-input')}
      />
      {error && <p className="text-sm text-destructive">This field has an error.</p>}
    </div>
  );
}

export const InputStory: StoryObj<typeof Input> = {
  name: 'Input',
  render: (args) => <Input {...args} />,
  args: { type: 'text', placeholder: 'Enter text...', disabled: false, error: false },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

// ─── Textarea ─────────────────────────────────────────────────────────

function Textarea({
  placeholder = 'Write here...',
  rows = 4,
  disabled = false,
}: {
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
}) {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={cn(
        'flex min-h-[60px] w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    />
  );
}

export const TextareaStory: StoryObj<typeof Textarea> = {
  name: 'Textarea',
  render: (args) => <Textarea {...args} />,
  args: { placeholder: 'Write here...', rows: 4, disabled: false },
  argTypes: {
    placeholder: { control: 'text' },
    rows: { control: { type: 'number', min: 2, max: 10 } },
    disabled: { control: 'boolean' },
  },
};

// ─── Label ────────────────────────────────────────────────────────────

function Label({
  text = 'Email',
  required = false,
}: {
  text?: string;
  required?: boolean;
}) {
  return (
    <div className="max-w-sm space-y-2">
      <label className="text-sm font-medium leading-none">
        {text}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      <input
        className={cn(inputBase, 'border-input')}
        placeholder="you@example.com"
      />
    </div>
  );
}

export const LabelStory: StoryObj<typeof Label> = {
  name: 'Label',
  render: (args) => <Label {...args} />,
  args: { text: 'Email', required: false },
  argTypes: {
    text: { control: 'text' },
    required: { control: 'boolean' },
  },
};

// ─── Checkbox ─────────────────────────────────────────────────────────

function Checkbox({
  label = 'Accept terms and conditions',
  checked = false,
  disabled = false,
}: {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}) {
  const [isChecked, setIsChecked] = React.useState(checked);
  React.useEffect(() => setIsChecked(checked), [checked]);

  return (
    <label
      className={cn(
        'flex items-center gap-2 text-sm',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => !disabled && setIsChecked(!isChecked)}
        disabled={disabled}
        className="h-4 w-4 rounded accent-primary"
      />
      {label}
    </label>
  );
}

export const CheckboxStory: StoryObj<typeof Checkbox> = {
  name: 'Checkbox',
  render: (args) => <Checkbox {...args} />,
  args: { label: 'Accept terms and conditions', checked: false, disabled: false },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

// ─── Radio Group ──────────────────────────────────────────────────────

function RadioGroup({
  value = 'option1',
  disabled = false,
}: {
  value?: string;
  disabled?: boolean;
}) {
  const [selected, setSelected] = React.useState(value);
  React.useEffect(() => setSelected(value), [value]);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            'flex items-center gap-2 text-sm',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <input
            type="radio"
            name="radio-group"
            checked={selected === opt.value}
            onChange={() => !disabled && setSelected(opt.value)}
            disabled={disabled}
            className="h-4 w-4 accent-primary"
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

export const RadioGroupStory: StoryObj<typeof RadioGroup> = {
  name: 'Radio Group',
  render: (args) => <RadioGroup {...args} />,
  args: { value: 'option1', disabled: false },
  argTypes: {
    value: { control: 'select', options: ['option1', 'option2', 'option3'] },
    disabled: { control: 'boolean' },
  },
};

// ─── Switch ───────────────────────────────────────────────────────────

function Switch({
  label = 'Airplane Mode',
  checked = false,
  disabled = false,
}: {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}) {
  const [isOn, setIsOn] = React.useState(checked);
  React.useEffect(() => setIsOn(checked), [checked]);

  return (
    <div className="flex items-center justify-between max-w-xs">
      <span className={cn('text-sm', disabled && 'opacity-50')}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        onClick={() => setIsOn(!isOn)}
        className={cn(
          'inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors',
          isOn ? 'bg-primary' : 'bg-input',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        )}
      >
        <span
          className={cn(
            'block h-5 w-5 rounded-full bg-background shadow-lg transition-transform',
            isOn ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  );
}

export const SwitchStory: StoryObj<typeof Switch> = {
  name: 'Switch',
  render: (args) => <Switch {...args} />,
  args: { label: 'Airplane Mode', checked: false, disabled: false },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

// ─── Select ───────────────────────────────────────────────────────────

function Select({
  placeholder = 'Select framework...',
  disabled = false,
}: {
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="max-w-[220px]">
      <select
        disabled={disabled}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
        <option value="angular">Angular</option>
        <option value="solid">Solid</option>
      </select>
    </div>
  );
}

export const SelectStory: StoryObj<typeof Select> = {
  name: 'Select',
  render: (args) => <Select {...args} />,
  args: { placeholder: 'Select framework...', disabled: false },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

// ─── Slider ───────────────────────────────────────────────────────────

function Slider({
  value = 50,
  disabled = false,
  showValue = true,
}: {
  value?: number;
  disabled?: boolean;
  showValue?: boolean;
}) {
  const [val, setVal] = React.useState(value);
  React.useEffect(() => setVal(value), [value]);

  return (
    <div className="max-w-sm space-y-2">
      {showValue && (
        <div className="flex justify-between text-sm">
          <span>Volume</span>
          <span>{val}%</span>
        </div>
      )}
      <input
        type="range"
        min={0}
        max={100}
        value={val}
        disabled={disabled}
        onChange={(e) => setVal(Number(e.target.value))}
        className={cn('w-full accent-primary', disabled && 'opacity-50')}
      />
    </div>
  );
}

export const SliderStory: StoryObj<typeof Slider> = {
  name: 'Slider',
  render: (args) => <Slider {...args} />,
  args: { value: 50, disabled: false, showValue: true },
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
  },
};

// ─── Toggle ───────────────────────────────────────────────────────────

function Toggle({
  label = 'Bold',
  pressed = false,
  variant = 'default',
  disabled = false,
}: {
  label?: string;
  pressed?: boolean;
  variant?: string;
  disabled?: boolean;
}) {
  const [isPressed, setIsPressed] = React.useState(pressed);
  React.useEffect(() => setIsPressed(pressed), [pressed]);

  const base =
    'inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 transition-colors';
  const variants: Record<string, string> = {
    default: 'hover:bg-muted',
    outline: 'border border-input hover:bg-accent',
  };

  return (
    <button
      aria-pressed={isPressed}
      disabled={disabled}
      onClick={() => setIsPressed(!isPressed)}
      className={cn(
        base,
        variants[variant] || variants.default,
        isPressed && 'bg-accent text-accent-foreground',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      {label}
    </button>
  );
}

export const ToggleStory: StoryObj<typeof Toggle> = {
  name: 'Toggle',
  render: (args) => <Toggle {...args} />,
  args: { label: 'Bold', pressed: false, variant: 'default', disabled: false },
  argTypes: {
    label: { control: 'text' },
    pressed: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'outline'] },
    disabled: { control: 'boolean' },
  },
};

// ─── Toggle Group ─────────────────────────────────────────────────────

function ToggleGroup({
  value = 'center',
  type = 'single',
}: {
  value?: string;
  type?: string;
}) {
  const [selected, setSelected] = React.useState<string[]>(value ? [value] : []);
  React.useEffect(() => setSelected(value ? [value] : []), [value]);

  const items = ['left', 'center', 'right'];

  const handleClick = (item: string) => {
    if (type === 'single') {
      setSelected([item]);
    } else {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
      );
    }
  };

  return (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => handleClick(item)}
          className={cn(
            'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
            selected.includes(item)
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground',
          )}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}

export const ToggleGroupStory: StoryObj<typeof ToggleGroup> = {
  name: 'Toggle Group',
  render: (args) => <ToggleGroup {...args} />,
  args: { value: 'center', type: 'single' },
  argTypes: {
    value: { control: 'select', options: ['left', 'center', 'right'] },
    type: { control: 'select', options: ['single', 'multiple'] },
  },
};
