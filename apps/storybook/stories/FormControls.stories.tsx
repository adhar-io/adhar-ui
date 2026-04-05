import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// ─── Button ───────────────────────────────────────────────────────────
const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
const btnVariants: Record<string, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent',
  link: 'text-primary underline-offset-4 hover:underline',
};
const btnSizes: Record<string, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
};

export const ButtonVariants: StoryObj = {
  name: 'Button — Variants',
  render: () => (
    <div className='flex flex-wrap gap-3'>
      {Object.keys(btnVariants).map((v) => (
        <button key={v} className={`${btnBase} ${btnVariants[v]} ${btnSizes.default}`}>{v}</button>
      ))}
    </div>
  ),
};
export const ButtonSizes: StoryObj = {
  name: 'Button — Sizes',
  render: () => (
    <div className='flex items-center gap-3'>
      {Object.entries(btnSizes).map(([s, cls]) => (
        <button key={s} className={`${btnBase} ${btnVariants.default} ${cls}`}>
          {s === 'icon' ? '+' : s}
        </button>
      ))}
    </div>
  ),
};
export const ButtonStates: StoryObj = {
  name: 'Button — States',
  render: () => (
    <div className='flex gap-3'>
      <button disabled className={`${btnBase} ${btnVariants.default} ${btnSizes.default}`}>
        Disabled
      </button>
      <button className={`${btnBase} ${btnVariants.default} ${btnSizes.default}`}>
        With Icon ⚡
      </button>
    </div>
  ),
};

// ─── Input ────────────────────────────────────────────────────────────
const inputCls =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

export const InputTypes: StoryObj = {
  name: 'Input — Types',
  render: () => (
    <div className='flex flex-col gap-3 max-w-sm'>
      <input className={inputCls} placeholder='Default text' />
      <input type='email' className={inputCls} placeholder='Email' />
      <input type='password' className={inputCls} placeholder='Password' />
      <input type='file' className={inputCls} />
      <input disabled className={inputCls} placeholder='Disabled' />
    </div>
  ),
};
export const InputError: StoryObj = {
  name: 'Input — Error',
  render: () => (
    <div className='max-w-sm space-y-1'>
      <input
        className='flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm'
        defaultValue='invalid'
      />
      <p className='text-sm text-destructive'>This field is required.</p>
    </div>
  ),
};

// ─── Textarea ─────────────────────────────────────────────────────────
export const TextareaStory: StoryObj = {
  name: 'Textarea',
  render: () => (
    <div className='max-w-sm space-y-3'>
      <textarea
        className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground'
        placeholder='Write here...'
        rows={4}
      />
      <textarea
        disabled
        className='flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-50'
        defaultValue='Disabled'
        rows={2}
      />
    </div>
  ),
};

// ─── Label ────────────────────────────────────────────────────────────
export const LabelStory: StoryObj = {
  name: 'Label',
  render: () => (
    <div className='max-w-sm space-y-2'>
      <label className='text-sm font-medium'>Email</label>
      <input className={inputCls} placeholder='you@example.com' />
      <p className='text-sm text-muted-foreground'>Your public email.</p>
    </div>
  ),
};

// ─── Checkbox ─────────────────────────────────────────────────────────
export const CheckboxStory: StoryObj = {
  name: 'Checkbox',
  render: () => {
    const [c, sc] = useState({ a: true, b: false, c: false });
    return (
      <div className='space-y-3'>
        {Object.entries(c).map(([k, v]) => (
          <label key={k} className='flex items-center gap-2 text-sm'>
            <input
              type='checkbox'
              checked={v}
              onChange={() =>
                sc({ ...c, [k]: !v })}
              className='h-4 w-4 rounded accent-primary'
            />Option {k.toUpperCase()} {v ? '(checked)' : ''}
          </label>
        ))}
        <label className='flex items-center gap-2 text-sm opacity-50'>
          <input type='checkbox' disabled className='h-4 w-4' />Disabled
        </label>
      </div>
    );
  },
};

// ─── Radio Group ──────────────────────────────────────────────────────
export const RadioGroupStory: StoryObj = {
  name: 'Radio Group',
  render: () => {
    const [v, sv] = useState('comfortable');
    return (
      <div className='space-y-2'>
        {['default', 'comfortable', 'compact'].map((o) => (
          <label key={o} className='flex items-center gap-2 text-sm'>
            <input
              type='radio'
              checked={v === o}
              onChange={() =>
                sv(o)}
              className='h-4 w-4 accent-primary'
            />
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </label>
        ))}
      </div>
    );
  },
};

// ─── Switch ───────────────────────────────────────────────────────────
export const SwitchStory: StoryObj = {
  name: 'Switch',
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <div className='space-y-3'>
        <div className='flex items-center justify-between max-w-xs'>
          <span className='text-sm'>{on ? 'Enabled' : 'Disabled'}</span>
          <button
            type='button'
            role='switch'
            aria-checked={on}
            onClick={() => setOn(!on)}
            className={cn(
              'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
              on ? 'bg-primary' : 'bg-input',
            )}
          >
            <span
              className={cn(
                'block h-5 w-5 rounded-full bg-background shadow-lg transition-transform',
                on ? 'translate-x-5' : 'translate-x-0',
              )}
            />
          </button>
        </div>
        <div className='flex items-center justify-between max-w-xs opacity-50'>
          <span className='text-sm'>Disabled</span>
          <button
            disabled
            className='inline-flex h-6 w-11 items-center rounded-full bg-input cursor-not-allowed'
          >
            <span className='block h-5 w-5 rounded-full bg-background shadow-lg' />
          </button>
        </div>
      </div>
    );
  },
};

// ─── Select ───────────────────────────────────────────────────────────
export const SelectStory: StoryObj = {
  name: 'Select',
  render: () => (
    <div className='max-w-[200px] space-y-3'>
      <select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
        <option>Select framework...</option>
        <option>React</option>
        <option>Vue</option>
        <option>Svelte</option>
        <option>Angular</option>
      </select>
      <select
        disabled
        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm opacity-50'
      >
        <option>Disabled</option>
      </select>
    </div>
  ),
};

// ─── Slider ───────────────────────────────────────────────────────────
export const SliderStory: StoryObj = {
  name: 'Slider',
  render: () => {
    const [v, sv] = useState(50);
    return (
      <div className='max-w-sm space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>Volume</span>
          <span>{v}%</span>
        </div>
        <input
          type='range'
          value={v}
          onChange={(e) => sv(+e.target.value)}
          className='w-full accent-primary'
        />
        <input type='range' value={75} disabled className='w-full opacity-50' />
      </div>
    );
  },
};

// ─── Toggle ───────────────────────────────────────────────────────────
export const ToggleStory: StoryObj = {
  name: 'Toggle',
  render: () => {
    const [b, sb] = useState(false);
    return (
      <div className='flex gap-2'>
        <button
          aria-pressed={b}
          onClick={() => sb(!b)}
          className={cn(
            'inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 hover:bg-muted',
            b && 'bg-accent text-accent-foreground',
          )}
        >
          Bold
        </button>
        <button className='inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 border border-input hover:bg-accent'>
          Outline
        </button>
        <button
          disabled
          className='inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 opacity-50'
        >
          Disabled
        </button>
      </div>
    );
  },
};

// ─── Toggle Group ─────────────────────────────────────────────────────
export const ToggleGroupStory: StoryObj = {
  name: 'Toggle Group',
  render: () => {
    const [a, sa] = useState('center');
    return (
      <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1'>
        {['left', 'center', 'right'].map((v) => (
          <button
            key={v}
            onClick={() => sa(v)}
            className={cn(
              'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
              a === v ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
            )}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
    );
  },
};

const meta: Meta = { title: 'Components/Form Controls' };
export default meta;
