/**
 * Form Controls demos — complete coverage with all variants.
 * Button (6 variants x 4 sizes), Input (3 types), Textarea, Label,
 * Checkbox (2 states), Radio Group, Switch (2 states), Select,
 * Slider, Toggle (2 states), Toggle Group
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);
function Btn(
  { variant, size, className, ...props }:
    & React.ButtonHTMLAttributes<HTMLButtonElement>
    & VariantProps<typeof buttonVariants>,
) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export function ButtonDemo() {
  return (
    <div className='space-y-6'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Variants</p>
        <div className='flex flex-wrap gap-3'>
          <Btn variant='default'>Default</Btn>
          <Btn variant='secondary'>Secondary</Btn>
          <Btn variant='destructive'>Destructive</Btn>
          <Btn variant='outline'>Outline</Btn>
          <Btn variant='ghost'>Ghost</Btn>
          <Btn variant='link'>Link</Btn>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Sizes</p>
        <div className='flex flex-wrap items-center gap-3'>
          <Btn size='sm'>Small</Btn>
          <Btn size='default'>Default</Btn>
          <Btn size='lg'>Large</Btn>
          <Btn size='icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M5 12h14' />
              <path d='M12 5v14' />
            </svg>
          </Btn>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>States</p>
        <div className='flex flex-wrap gap-3'>
          <Btn disabled>Disabled</Btn>
          <Btn>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='animate-spin'
            >
              <path d='M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83' />
            </svg>
            Loading...
          </Btn>
          <Btn variant='outline'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z' />
            </svg>
            With Icon
          </Btn>
        </div>
      </div>
    </div>
  );
}

export function InputDemo() {
  return (
    <div className='space-y-4 max-w-sm'>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Default</p>
        <input
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          placeholder='Email address'
        />
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Password</p>
        <input
          type='password'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          placeholder='Password'
        />
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>File</p>
        <input
          type='file'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium'
        />
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Disabled</p>
        <input
          disabled
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
          placeholder='Disabled'
        />
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>With error</p>
        <input
          className='flex h-10 w-full rounded-md border border-destructive bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive'
          defaultValue='invalid@'
        />
        <p className='text-sm text-destructive'>Please enter a valid email address.</p>
      </div>
    </div>
  );
}

export function TextareaDemo() {
  return (
    <div className='space-y-4 max-w-sm'>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Default</p>
        <textarea
          className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          placeholder='Write your message...'
          rows={4}
        />
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Disabled</p>
        <textarea
          disabled
          className='flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
          defaultValue='Cannot edit this.'
          rows={2}
        />
      </div>
    </div>
  );
}

export function LabelDemo() {
  return (
    <div className='space-y-4 max-w-sm'>
      <div className='space-y-2'>
        <label className='text-sm font-medium leading-none'>Email</label>
        <input
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          placeholder='you@example.com'
        />
        <p className='text-sm text-muted-foreground'>Your public email address.</p>
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          Disabled label
        </label>
        <input
          disabled
          className='peer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
          placeholder='Disabled'
        />
      </div>
    </div>
  );
}

export function CheckboxDemo() {
  const [checks, setChecks] = useState({ terms: false, marketing: true, analytics: false });
  return (
    <div className='space-y-3'>
      {Object.entries(checks).map(([key, checked]) => (
        <label key={key} className='flex items-center gap-3 cursor-pointer'>
          <input
            type='checkbox'
            checked={checked}
            onChange={() =>
              setChecks({ ...checks, [key]: !checked })}
            className='h-4 w-4 rounded border-primary accent-primary'
          />
          <div>
            <span className='text-sm font-medium'>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            {key === 'terms' && (
              <p className='text-xs text-muted-foreground'>Accept terms and conditions</p>
            )}
            {key === 'marketing' && (
              <p className='text-xs text-muted-foreground'>Receive marketing emails</p>
            )}
            {key === 'analytics' && (
              <p className='text-xs text-muted-foreground'>Allow analytics cookies</p>
            )}
          </div>
        </label>
      ))}
      <label className='flex items-center gap-3 cursor-not-allowed opacity-50'>
        <input type='checkbox' disabled className='h-4 w-4 rounded' />
        <span className='text-sm'>Disabled option</span>
      </label>
    </div>
  );
}

export function RadioGroupDemo() {
  const [val, setVal] = useState('comfortable');
  return (
    <div className='space-y-3'>
      <p className='text-xs font-medium text-muted-foreground'>Display density</p>
      {['default', 'comfortable', 'compact'].map((opt) => (
        <label key={opt} className='flex items-center gap-3 cursor-pointer'>
          <input
            type='radio'
            name='density'
            checked={val === opt}
            onChange={() =>
              setVal(opt)}
            className='h-4 w-4 accent-primary'
          />
          <div>
            <span className='text-sm font-medium'>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </span>
            <p className='text-xs text-muted-foreground'>
              {opt === 'default' && 'Standard spacing for desktop'}
              {opt === 'comfortable' && 'Balanced spacing for all screens'}
              {opt === 'compact' && 'Tight spacing for data-dense views'}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}

export function SwitchDemo() {
  const [switches, setSwitches] = useState({ airplane: false, wifi: true, bluetooth: true });
  return (
    <div className='space-y-4 max-w-xs'>
      {Object.entries(switches).map(([key, on]) => (
        <div key={key} className='flex items-center justify-between'>
          <div>
            <span className='text-sm font-medium'>
              {key.charAt(0).toUpperCase() + key.slice(1)} mode
            </span>
            <p className='text-xs text-muted-foreground'>{on ? 'Enabled' : 'Disabled'}</p>
          </div>
          <button
            type='button'
            role='switch'
            aria-checked={on}
            onClick={() =>
              setSwitches({ ...switches, [key]: !on })}
            className={cn(
              'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
              on ? 'bg-primary' : 'bg-input',
            )}
          >
            <span
              className={cn(
                'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg transition-transform',
                on ? 'translate-x-5' : 'translate-x-0',
              )}
            />
          </button>
        </div>
      ))}
      <div className='flex items-center justify-between opacity-50 cursor-not-allowed'>
        <span className='text-sm'>Disabled switch</span>
        <button
          type='button'
          role='switch'
          disabled
          className='inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent bg-input cursor-not-allowed'
        >
          <span className='pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg translate-x-0' />
        </button>
      </div>
    </div>
  );
}

export function SelectDemo() {
  return (
    <div className='space-y-4 max-w-[220px]'>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Default</p>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.5rem_center] bg-no-repeat pr-8">
          <option value=''>Select a framework...</option>
          <option value='react'>React</option>
          <option value='vue'>Vue</option>
          <option value='solid'>Solid</option>
          <option value='svelte'>Svelte</option>
          <option value='angular'>Angular</option>
        </select>
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Disabled</p>
        <select
          disabled
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
        >
          <option>Cannot change</option>
        </select>
      </div>
    </div>
  );
}

export function SliderDemo() {
  const [val1, setVal1] = useState(50);
  const [val2, setVal2] = useState(25);
  return (
    <div className='space-y-6 max-w-sm'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <p className='text-xs font-medium text-muted-foreground'>Volume</p>
          <span className='text-sm font-medium'>{val1}%</span>
        </div>
        <input
          type='range'
          value={val1}
          onChange={(e) => setVal1(Number(e.target.value))}
          className='w-full accent-primary'
        />
      </div>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <p className='text-xs font-medium text-muted-foreground'>Brightness</p>
          <span className='text-sm font-medium'>{val2}%</span>
        </div>
        <input
          type='range'
          value={val2}
          onChange={(e) => setVal2(Number(e.target.value))}
          className='w-full accent-primary'
        />
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Disabled</p>
        <input type='range' value={75} disabled className='w-full opacity-50 cursor-not-allowed' />
      </div>
    </div>
  );
}

export function ToggleDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(true);
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Individual toggles</p>
        <div className='flex gap-1'>
          {[
            { label: 'B', pressed: bold, set: setBold, style: 'font-bold' },
            { label: 'I', pressed: italic, set: setItalic, style: 'italic' },
            { label: 'U', pressed: underline, set: setUnderline, style: 'underline' },
          ].map((t) => (
            <button
              key={t.label}
              type='button'
              aria-pressed={t.pressed}
              onClick={() => t.set(!t.pressed)}
              className={cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 transition-colors hover:bg-muted',
                t.pressed && 'bg-accent text-accent-foreground',
                t.style,
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Outline variant</p>
        <div className='flex gap-1'>
          {['Left', 'Center', 'Right'].map((a) => (
            <button
              key={a}
              type='button'
              className='inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 border border-input hover:bg-accent'
            >
              {a}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Disabled</p>
        <button
          type='button'
          disabled
          className='inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 hover:bg-muted opacity-50 cursor-not-allowed'
        >
          Disabled
        </button>
      </div>
    </div>
  );
}

export function ToggleGroupDemo() {
  const [align, setAlign] = useState('center');
  const [view, setView] = useState('grid');
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Single select</p>
        <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1'>
          {['left', 'center', 'right', 'justify'].map((a) => (
            <button
              key={a}
              onClick={() => setAlign(a)}
              className={cn(
                'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
                align === a ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
              )}
            >
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Icon group</p>
        <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1'>
          {[{ v: 'grid', icon: '⊞' }, { v: 'list', icon: '☰' }, { v: 'kanban', icon: '⊟' }].map((
            { v, icon },
          ) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm transition-all',
                view === v ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground',
              )}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
