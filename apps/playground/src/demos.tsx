import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// ─── Shared inline components (self-contained playground) ─────────────

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

// ─── FORM CONTROL DEMOS ───────────────────────────────────────────────

export function ButtonDemo() {
  return (
    <div className='flex flex-wrap gap-3'>
      <Btn>Default</Btn>
      <Btn variant='secondary'>Secondary</Btn>
      <Btn variant='destructive'>Destructive</Btn>
      <Btn variant='outline'>Outline</Btn>
      <Btn variant='ghost'>Ghost</Btn>
      <Btn variant='link'>Link</Btn>
      <Btn size='sm'>Small</Btn>
      <Btn size='lg'>Large</Btn>
      <Btn disabled>Disabled</Btn>
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
  );
}

export function InputDemo() {
  return (
    <div className='flex flex-col gap-3 max-w-sm'>
      <input
        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        placeholder='Email address'
      />
      <input
        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        type='password'
        placeholder='Password'
      />
      <input
        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50'
        disabled
        placeholder='Disabled'
      />
    </div>
  );
}

export function TextareaDemo() {
  return (
    <div className='max-w-sm'>
      <textarea
        className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        placeholder='Write your message here...'
        rows={4}
      />
    </div>
  );
}

export function LabelDemo() {
  return (
    <div className='max-w-sm space-y-2'>
      <label className='text-sm font-medium leading-none'>Email</label>
      <input
        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        placeholder='you@example.com'
      />
    </div>
  );
}

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className='flex items-center gap-2'>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className='h-4 w-4 rounded border-primary accent-primary'
      />
      <label className='text-sm'>Accept terms and conditions</label>
    </div>
  );
}

export function SwitchDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className='flex items-center gap-3'>
      <button
        type='button'
        role='switch'
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
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
      <span className='text-sm'>{on ? 'Enabled' : 'Disabled'}</span>
    </div>
  );
}

export function SelectDemo() {
  return (
    <div className='max-w-[200px]'>
      <select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring'>
        <option>Select a fruit...</option>
        <option value='apple'>Apple</option>
        <option value='banana'>Banana</option>
        <option value='cherry'>Cherry</option>
      </select>
    </div>
  );
}

export function SliderDemo() {
  const [value, setValue] = useState(50);
  return (
    <div className='max-w-sm space-y-2'>
      <input
        type='range'
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className='w-full accent-primary'
      />
      <p className='text-sm text-muted-foreground'>Value: {value}</p>
    </div>
  );
}

export function ToggleDemo() {
  const [pressed, setPressed] = useState(false);
  return (
    <div className='flex gap-2'>
      <button
        type='button'
        aria-pressed={pressed}
        onClick={() => setPressed(!pressed)}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 transition-colors hover:bg-muted',
          pressed && 'bg-accent text-accent-foreground',
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path d='M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z' />
          <path d='M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z' />
        </svg>
        <span className='ml-2'>Bold</span>
      </button>
      <button
        type='button'
        className='inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-3 border border-input hover:bg-accent'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
        >
          <line x1='19' x2='10' y1='4' y2='4' />
          <line x1='14' x2='5' y1='20' y2='20' />
          <line x1='15' x2='9' y1='4' y2='20' />
        </svg>
        <span className='ml-2'>Italic</span>
      </button>
    </div>
  );
}

// ─── DISPLAY DEMOS ────────────────────────────────────────────────────

export function BadgeDemo() {
  return (
    <div className='flex flex-wrap gap-2'>
      {(['default', 'secondary', 'destructive', 'outline'] as const).map((v) => {
        const styles: Record<string, string> = {
          default: 'border-transparent bg-primary text-primary-foreground',
          secondary: 'border-transparent bg-secondary text-secondary-foreground',
          destructive: 'border-transparent bg-destructive text-destructive-foreground',
          outline: 'text-foreground',
        };
        return (
          <span
            key={v}
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
              styles[v],
            )}
          >
            {v}
          </span>
        );
      })}
    </div>
  );
}

export function AvatarDemo() {
  return (
    <div className='flex items-center gap-3'>
      <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
        <img
          className='aspect-square h-full w-full'
          src='https://github.com/shadcn.png'
          alt='Avatar'
        />
      </span>
      <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
        <span className='flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium'>
          CN
        </span>
      </span>
      <span className='relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full'>
        <span className='flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium'>
          UI
        </span>
      </span>
    </div>
  );
}

export function SeparatorDemo() {
  return (
    <div>
      <div className='space-y-1'>
        <h4 className='text-sm font-medium'>Adhar UI</h4>
        <p className='text-sm text-muted-foreground'>Framework-agnostic design system.</p>
      </div>
      <div className='my-4 h-[1px] w-full bg-border' />
      <div className='flex h-5 items-center space-x-4 text-sm'>
        <div>Blog</div>
        <div className='h-full w-[1px] bg-border' />
        <div>Docs</div>
        <div className='h-full w-[1px] bg-border' />
        <div>Source</div>
      </div>
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <div className='flex items-center space-x-4'>
      <div className='h-12 w-12 animate-pulse rounded-full bg-muted' />
      <div className='space-y-2'>
        <div className='h-4 w-[250px] animate-pulse rounded-md bg-muted' />
        <div className='h-4 w-[200px] animate-pulse rounded-md bg-muted' />
      </div>
    </div>
  );
}

export function ProgressDemo() {
  const [value, setValue] = useState(45);
  return (
    <div className='max-w-sm space-y-3'>
      <div className='relative h-4 w-full overflow-hidden rounded-full bg-secondary'>
        <div className='h-full bg-primary transition-all' style={{ width: `${value}%` }} />
      </div>
      <div className='flex gap-2'>
        <Btn size='sm' variant='outline' onClick={() => setValue(Math.max(0, value - 10))}>-10</Btn>
        <Btn size='sm' variant='outline' onClick={() => setValue(Math.min(100, value + 10))}>
          +10
        </Btn>
        <span className='text-sm text-muted-foreground ml-auto'>{value}%</span>
      </div>
    </div>
  );
}

export function SpinnerDemo() {
  return (
    <div className='flex items-center gap-4'>
      {(['h-4 w-4', 'h-6 w-6', 'h-8 w-8'] as const).map((size) => (
        <div key={size} role='status' className={cn('animate-spin', size)}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ─── LAYOUT DEMOS ─────────────────────────────────────────────────────

export function CardDemo() {
  return (
    <div className='max-w-sm rounded-lg border bg-card text-card-foreground shadow-sm'>
      <div className='flex flex-col space-y-1.5 p-6'>
        <h3 className='text-2xl font-semibold leading-none tracking-tight'>Create project</h3>
        <p className='text-sm text-muted-foreground'>Deploy your new project in one-click.</p>
      </div>
      <div className='p-6 pt-0 space-y-3'>
        <div className='space-y-1'>
          <label className='text-sm font-medium'>Name</label>
          <input
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
            placeholder='My Project'
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium'>Framework</label>
          <select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
            <option>React</option>
            <option>Vue</option>
            <option>Svelte</option>
          </select>
        </div>
      </div>
      <div className='flex items-center p-6 pt-0 justify-between'>
        <Btn variant='outline'>Cancel</Btn>
        <Btn>Deploy</Btn>
      </div>
    </div>
  );
}

// ─── FEEDBACK DEMOS ───────────────────────────────────────────────────

export function AlertDemo() {
  return (
    <div className='space-y-3 max-w-lg'>
      <div className='relative w-full rounded-lg border p-4 bg-background text-foreground'>
        <h5 className='mb-1 font-medium leading-none tracking-tight'>Heads up!</h5>
        <div className='text-sm [&_p]:leading-relaxed'>You can add components using the CLI.</div>
      </div>
      <div className='relative w-full rounded-lg border p-4 border-destructive/50 text-destructive'>
        <h5 className='mb-1 font-medium leading-none tracking-tight'>Error</h5>
        <div className='text-sm [&_p]:leading-relaxed'>Something went wrong. Please try again.</div>
      </div>
    </div>
  );
}

// ─── OVERLAY DEMOS ────────────────────────────────────────────────────

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Btn onClick={() => setOpen(true)}>Open Dialog</Btn>
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='fixed inset-0 bg-black/80' onClick={() => setOpen(false)} />
          <div className='relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg'>
            <h2 className='text-lg font-semibold'>Edit Profile</h2>
            <p className='mt-1 text-sm text-muted-foreground'>Make changes to your profile here.</p>
            <div className='mt-4 space-y-3'>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Name</label>
                <input
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  defaultValue='John Doe'
                />
              </div>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Email</label>
                <input
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  defaultValue='john@example.com'
                />
              </div>
            </div>
            <div className='mt-6 flex justify-end gap-2'>
              <Btn variant='outline' onClick={() => setOpen(false)}>Cancel</Btn>
              <Btn onClick={() => setOpen(false)}>Save changes</Btn>
            </div>
            <button
              className='absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100'
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Btn variant='outline' onClick={() => setOpen(true)}>Open Sheet</Btn>
      {open && (
        <div className='fixed inset-0 z-50'>
          <div className='fixed inset-0 bg-black/80' onClick={() => setOpen(false)} />
          <div className='fixed inset-y-0 right-0 z-50 h-full w-3/4 border-l bg-background p-6 shadow-lg sm:max-w-sm'>
            <h2 className='text-lg font-semibold'>Sheet Title</h2>
            <p className='mt-2 text-sm text-muted-foreground'>
              This is a sheet component that slides in from the right.
            </p>
            <div className='mt-6'>
              <Btn variant='outline' onClick={() => setOpen(false)}>Close</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TooltipDemo() {
  return (
    <div className='flex gap-4'>
      {(['Top', 'Right', 'Bottom'] as const).map((side) => (
        <div key={side} className='group relative inline-flex'>
          <Btn variant='outline'>{side}</Btn>
          <div
            className={cn(
              'absolute z-50 hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md group-hover:block',
              side === 'Top'
                ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
                : side === 'Right'
                ? 'left-full top-1/2 -translate-y-1/2 ml-2'
                : 'top-full left-1/2 -translate-x-1/2 mt-2',
            )}
          >
            Tooltip {side.toLowerCase()}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className='relative inline-block'>
      <Btn variant='outline' onClick={() => setOpen(!open)}>Open popover</Btn>
      {open && (
        <div className='absolute left-0 z-50 mt-2 w-80 rounded-md border bg-popover p-4 shadow-md'>
          <h4 className='font-medium text-sm mb-2'>Dimensions</h4>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <label className='text-sm'>Width</label>
              <input
                className='col-span-2 h-8 rounded-md border border-input bg-background px-2 text-sm'
                defaultValue='100%'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <label className='text-sm'>Height</label>
              <input
                className='col-span-2 h-8 rounded-md border border-input bg-background px-2 text-sm'
                defaultValue='25px'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NAVIGATION DEMOS ─────────────────────────────────────────────────

export function TabsDemo() {
  const [tab, setTab] = useState('account');
  return (
    <div>
      <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'>
        {['account', 'password', 'settings'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
              tab === t ? 'bg-background text-foreground shadow-sm' : '',
            )}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className='mt-4 rounded-md border p-4'>
        <p className='text-sm'>
          Content for <strong>{tab}</strong> tab.
        </p>
      </div>
    </div>
  );
}

export function AccordionDemo() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const items = [
    {
      id: '1',
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    },
    {
      id: '2',
      title: 'Is it styled?',
      content: 'Yes. It comes with default styles that match your design system.',
    },
    {
      id: '3',
      title: 'Is it animated?',
      content: 'Yes. It uses CSS transitions for smooth animation.',
    },
  ];
  return (
    <div className='max-w-lg'>
      {items.map((item) => (
        <div key={item.id} className='border-b'>
          <button
            className='flex w-full items-center justify-between py-4 font-medium hover:underline'
            onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
          >
            {item.title}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className={cn('h-4 w-4 transition-transform', openItem === item.id && 'rotate-180')}
            >
              <path d='m6 9 6 6 6-6' />
            </svg>
          </button>
          {openItem === item.id && (
            <div className='pb-4 text-sm text-muted-foreground'>{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function DropdownMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className='relative inline-block'>
      <Btn variant='outline' onClick={() => setOpen(!open)}>Open menu</Btn>
      {open && (
        <div className='absolute right-0 z-50 mt-2 min-w-[8rem] rounded-md border bg-popover p-1 shadow-md'>
          {['Profile', 'Settings', 'Billing'].map((item) => (
            <div
              key={item}
              className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent'
              onClick={() => setOpen(false)}
            >
              {item}
            </div>
          ))}
          <div className='-mx-1 my-1 h-px bg-muted' />
          <div
            className='flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-accent'
            onClick={() => setOpen(false)}
          >
            Log out
          </div>
        </div>
      )}
    </div>
  );
}

export function BreadcrumbDemo() {
  return (
    <nav aria-label='breadcrumb'>
      <ol className='flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground'>
        <li>
          <a href='#' className='hover:text-foreground'>Home</a>
        </li>
        <li>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='m9 18 6-6-6-6' />
          </svg>
        </li>
        <li>
          <a href='#' className='hover:text-foreground'>Components</a>
        </li>
        <li>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='m9 18 6-6-6-6' />
          </svg>
        </li>
        <li>
          <span className='font-normal text-foreground'>Breadcrumb</span>
        </li>
      </ol>
    </nav>
  );
}

export function PaginationDemo() {
  const [page, setPage] = useState(3);
  return (
    <nav className='flex justify-center'>
      <ul className='flex items-center gap-1'>
        <li>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            className='inline-flex h-10 items-center justify-center rounded-md px-3 text-sm hover:bg-accent gap-1'
          >
            ← Prev
          </button>
        </li>
        {[1, 2, 3, 4, 5].map((p) => (
          <li key={p}>
            <button
              onClick={() => setPage(p)}
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-md text-sm hover:bg-accent',
                page === p && 'border bg-background',
              )}
            >
              {p}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setPage(Math.min(5, page + 1))}
            className='inline-flex h-10 items-center justify-center rounded-md px-3 text-sm hover:bg-accent gap-1'
          >
            Next →
          </button>
        </li>
      </ul>
    </nav>
  );
}

// ─── COMPOSITE DEMOS ──────────────────────────────────────────────────

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const options = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Preact', 'Lit'];
  const filtered = options.filter((o) => o.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className='relative max-w-[200px]'>
      <button
        onClick={() => setOpen(!open)}
        className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm'
      >
        <span className={!value ? 'text-muted-foreground' : ''}>
          {value || 'Select framework...'}
        </span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          className='opacity-50'
        >
          <path d='m6 9 6 6 6-6' />
        </svg>
      </button>
      {open && (
        <div className='absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search...'
            className='mb-1 flex h-8 w-full bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground'
          />
          {filtered.length === 0
            ? <p className='py-4 text-center text-sm text-muted-foreground'>No results.</p>
            : filtered.map((o) => (
              <div
                key={o}
                onClick={() => {
                  setValue(o);
                  setOpen(false);
                  setSearch('');
                }}
                className={cn(
                  'flex items-center rounded-sm px-2 py-1.5 text-sm cursor-default hover:bg-accent',
                  value === o && 'bg-accent',
                )}
              >
                {o} {value === o && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='ml-auto'
                  >
                    <path d='M20 6 9 17l-5-5' />
                  </svg>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export function ColorPickerDemo() {
  const [color, setColor] = useState('#6366f1');
  return (
    <div className='flex items-center gap-3'>
      <input
        type='color'
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className='h-10 w-10 cursor-pointer rounded-md border p-0.5'
      />
      <input
        type='text'
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className='flex h-10 w-28 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono uppercase'
        maxLength={7}
      />
      <div className='h-10 w-10 rounded-md border' style={{ backgroundColor: color }} />
    </div>
  );
}

export function TableDemo() {
  const invoices = [
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  ];
  return (
    <div className='w-full overflow-auto'>
      <table className='w-full caption-bottom text-sm'>
        <thead className='[&_tr]:border-b'>
          <tr className='border-b'>
            <th className='h-12 px-4 text-left font-medium text-muted-foreground'>Invoice</th>
            <th className='h-12 px-4 text-left font-medium text-muted-foreground'>Status</th>
            <th className='h-12 px-4 text-left font-medium text-muted-foreground'>Method</th>
            <th className='h-12 px-4 text-right font-medium text-muted-foreground'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className='border-b hover:bg-muted/50'>
              <td className='p-4'>{inv.id}</td>
              <td className='p-4'>
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
                    inv.status === 'Paid'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : inv.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
                  )}
                >
                  {inv.status}
                </span>
              </td>
              <td className='p-4'>{inv.method}</td>
              <td className='p-4 text-right font-medium'>{inv.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── ENTERPRISE DEMOS ─────────────────────────────────────────────────

export function TimelineDemo() {
  const events = [
    {
      title: 'Application submitted',
      desc: 'Your application has been received.',
      variant: 'bg-green-500',
    },
    { title: 'Under review', desc: 'We are reviewing your application.', variant: 'bg-blue-500' },
    {
      title: 'Decision pending',
      desc: 'A decision will be made soon.',
      variant: 'bg-muted-foreground',
    },
  ];
  return (
    <ol className='relative border-l border-muted-foreground/20 ml-3'>
      {events.map((e, i) => (
        <li key={i} className='mb-8 ml-6'>
          <div
            className={cn(
              'absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-background',
              e.variant,
            )}
          />
          <h3 className='text-sm font-semibold'>{e.title}</h3>
          <p className='text-sm text-muted-foreground'>{e.desc}</p>
        </li>
      ))}
    </ol>
  );
}

export function StepperDemo() {
  const [step, setStep] = useState(1);
  const steps = ['Account', 'Profile', 'Review'];
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => setStep(i)}>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium',
                  i < step
                    ? 'border-primary bg-primary text-primary-foreground'
                    : i === step
                    ? 'border-primary text-primary'
                    : 'border-muted-foreground/30 text-muted-foreground',
                )}
              >
                {i < step
                  ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M20 6 9 17l-5-5' />
                    </svg>
                  )
                  : i + 1}
              </div>
              <span className={cn('text-sm', i <= step ? 'font-medium' : 'text-muted-foreground')}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && <div className='h-[2px] flex-1 bg-muted-foreground/20' />}
          </React.Fragment>
        ))}
      </div>
      <div className='rounded-md border p-4 text-sm'>Step {step + 1}: {steps[step]} content</div>
    </div>
  );
}

export function EmptyStateDemo() {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className='mb-4 text-muted-foreground'
      >
        <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
        <polyline points='7 10 12 15 17 10' />
        <line x1='12' x2='12' y1='15' y2='3' />
      </svg>
      <h3 className='text-lg font-semibold'>No files uploaded</h3>
      <p className='mt-2 max-w-sm text-sm text-muted-foreground'>
        Drag and drop files here or click to browse.
      </p>
      <Btn className='mt-6' size='sm'>Upload files</Btn>
    </div>
  );
}

export function StatCardDemo() {
  return (
    <div className='grid gap-4 sm:grid-cols-3 max-w-2xl'>
      {[
        { title: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up' as const },
        { title: 'Active Users', value: '2,350', change: '+12.5%', trend: 'up' as const },
        { title: 'Bounce Rate', value: '24.5%', change: '-4.1%', trend: 'down' as const },
      ].map((stat) => (
        <div key={stat.title} className='rounded-lg border bg-card p-6 shadow-sm'>
          <p className='text-sm font-medium text-muted-foreground'>{stat.title}</p>
          <div className='mt-2 flex items-baseline gap-2'>
            <h2 className='text-3xl font-bold tracking-tight'>{stat.value}</h2>
            <span
              className={cn(
                'text-sm font-medium',
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600',
              )}
            >
              {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function KbdDemo() {
  return (
    <div className='flex items-center gap-3'>
      <span className='flex items-center gap-1 text-sm'>
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
          ⌘
        </kbd>
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
          K
        </kbd>
        <span className='text-muted-foreground ml-1'>Open command</span>
      </span>
      <span className='flex items-center gap-1 text-sm'>
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
          Ctrl
        </kbd>
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
          S
        </kbd>
        <span className='text-muted-foreground ml-1'>Save</span>
      </span>
    </div>
  );
}

export function CopyButtonDemo() {
  const [copied, setCopied] = useState(false);
  return (
    <div className='flex items-center gap-2'>
      <code className='rounded bg-muted px-2 py-1 text-sm font-mono'>
        npm install @adhar-ui/react
      </code>
      <button
        onClick={() => {
          navigator.clipboard?.writeText('npm install @adhar-ui/react');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className='inline-flex items-center justify-center rounded-md p-2 text-sm hover:bg-accent transition-colors'
      >
        {copied
          ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='text-green-500'
            >
              <path d='M20 6 9 17l-5-5' />
            </svg>
          )
          : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <rect width='14' height='14' x='8' y='8' rx='2' />
              <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
            </svg>
          )}
      </button>
    </div>
  );
}

export function TreeViewDemo() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['src']));
  const toggle = (id: string) => {
    const n = new Set(expanded);
    n.has(id) ? n.delete(id) : n.add(id);
    setExpanded(n);
  };
  const nodes = [
    {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'components',
          label: 'components',
          children: [
            {
              id: 'ui',
              label: 'ui',
              children: [
                { id: 'button', label: 'button.tsx' },
                { id: 'card', label: 'card.tsx' },
              ],
            },
          ],
        },
        {
          id: 'lib',
          label: 'lib',
          children: [
            { id: 'utils', label: 'utils.ts' },
          ],
        },
        { id: 'app', label: 'app.tsx' },
      ],
    },
    {
      id: 'public',
      label: 'public',
      children: [
        { id: 'favicon', label: 'favicon.svg' },
      ],
    },
  ];
  const renderNode = (node: any, level: number) => (
    <div key={node.id}>
      <button
        onClick={() => node.children && toggle(node.id)}
        className={cn(
          'flex w-full items-center gap-1.5 rounded-sm px-2 py-1 text-sm hover:bg-accent',
          `pl-${level * 4 + 2}`,
        )}
      >
        {node.children
          ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className={cn('shrink-0 transition-transform', expanded.has(node.id) && 'rotate-90')}
            >
              <path d='m9 18 6-6-6-6' />
            </svg>
          )
          : <span className='w-[14px]' />}
        {node.label}
      </button>
      {node.children && expanded.has(node.id) &&
        node.children.map((c: any) => renderNode(c, level + 1))}
    </div>
  );
  return <div className='max-w-xs rounded-md border p-2'>{nodes.map((n) => renderNode(n, 0))}</div>;
}

// ─── AI DEMOS ─────────────────────────────────────────────────────────

export function ChatDemo() {
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant' as const, content: 'Hello! How can I help you today?' },
    { id: '2', role: 'user' as const, content: 'What is Adhar UI?' },
    {
      id: '3',
      role: 'assistant' as const,
      content:
        'Adhar UI is a framework-agnostic design system with 78 components. It works with React, Vue, Solid, Svelte, and Angular.',
    },
  ]);
  const [input, setInput] = useState('');
  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), role: 'user', content: input }]);
    setInput('');
  };
  return (
    <div className='h-80 max-w-lg rounded-lg border flex flex-col'>
      <div className='flex-1 overflow-y-auto p-4 space-y-3'>
        {messages.map((m) => (
          <div key={m.id} className={cn('flex gap-2', m.role === 'user' ? 'justify-end' : '')}>
            {m.role === 'assistant' && (
              <div className='flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs shrink-0'>
                AI
              </div>
            )}
            <div
              className={cn(
                'max-w-[75%] rounded-lg px-3 py-2 text-sm',
                m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className='border-t p-3 flex gap-2'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder='Type a message...'
          className='flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm'
        />
        <Btn size='sm' onClick={send}>Send</Btn>
      </div>
    </div>
  );
}

export function PromptInputDemo() {
  const [value, setValue] = useState('');
  return (
    <div className='max-w-lg relative rounded-lg border bg-background'>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Ask anything...'
        rows={1}
        className='w-full resize-none bg-transparent px-4 py-3 pr-12 text-sm outline-none placeholder:text-muted-foreground'
        style={{ height: Math.min(Math.max(40, value.split('\n').length * 24), 200) }}
      />
      <div className='absolute bottom-2 right-2 flex items-center gap-2'>
        <span className='text-xs text-muted-foreground'>{value.length}/1000</span>
        <button
          className='inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-50'
          disabled={!value.trim()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M5 12h14' />
            <path d='m12 5 7 7-7 7' />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function StreamingTextDemo() {
  const text =
    'Adhar UI is a framework-agnostic design system with 78 production-ready components. It works with React, Vue, Solid, Svelte, and Angular.';
  const [displayed, setDisplayed] = useState('');
  const [running, setRunning] = useState(false);
  const start = () => {
    setDisplayed('');
    setRunning(true);
    let i = 0;
    const t = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(t);
        setRunning(false);
      }
    }, 25);
  };
  return (
    <div className='max-w-lg space-y-3'>
      <Btn size='sm' variant='outline' onClick={start} disabled={running}>Stream text</Btn>
      <div className='rounded-md border p-4 text-sm min-h-[60px]'>
        {displayed}
        {running && <span className='animate-pulse'>▊</span>}
      </div>
    </div>
  );
}

export function CodeBlockDemo() {
  const code = `import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <Button variant="outline">
      Click me
    </Button>
  )
}`;
  const [copied, setCopied] = useState(false);
  return (
    <div className='max-w-lg rounded-lg border bg-zinc-950 text-zinc-50'>
      <div className='flex items-center justify-between border-b border-zinc-800 px-4 py-2'>
        <span className='text-xs text-zinc-400'>page.tsx</span>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className='text-xs text-zinc-400 hover:text-zinc-200'
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className='overflow-x-auto p-4'>
        <pre className='text-sm leading-relaxed'><code>{code.split('\n').map((line, i) => (<div key={i} className="table-row"><span className="table-cell select-none pr-4 text-right text-zinc-600">{i + 1}</span><span className="table-cell">{line}</span></div>))}</code></pre>
      </div>
    </div>
  );
}

export function TokenCounterDemo() {
  const [used, setUsed] = useState(3200);
  const total = 4096;
  const pct = used / total;
  return (
    <div className='space-y-3 max-w-xs'>
      <div className='flex items-center gap-2 text-xs'>
        <div className='h-2 w-24 overflow-hidden rounded-full bg-secondary'>
          <div
            className={cn('h-full transition-all', pct >= 0.8 ? 'bg-destructive' : 'bg-primary')}
            style={{ width: `${pct * 100}%` }}
          />
        </div>
        <span
          className={cn('tabular-nums', pct >= 0.8 ? 'text-destructive' : 'text-muted-foreground')}
        >
          {used.toLocaleString()} / {total.toLocaleString()}
        </span>
      </div>
      <div className='flex gap-2'>
        <Btn size='sm' variant='outline' onClick={() => setUsed(Math.min(total, used + 256))}>
          +256
        </Btn>
        <Btn size='sm' variant='outline' onClick={() => setUsed(Math.max(0, used - 256))}>-256</Btn>
      </div>
    </div>
  );
}

export function ThinkingIndicatorDemo() {
  return (
    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
      <div className='flex gap-1'>
        <span
          className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40'
          style={{ animationDelay: '0ms' }}
        />
        <span
          className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40'
          style={{ animationDelay: '150ms' }}
        />
        <span
          className='h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40'
          style={{ animationDelay: '300ms' }}
        />
      </div>
      <span>Thinking</span>
    </div>
  );
}

export function FeedbackButtonsDemo() {
  const [liked, setLiked] = useState<boolean | null>(null);
  return (
    <div className='flex items-center gap-1'>
      <button
        onClick={() => setLiked(liked === true ? null : true)}
        className={cn(
          'rounded-md p-1.5 transition-colors hover:bg-accent',
          liked === true && 'text-green-500',
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill={liked === true ? 'currentColor' : 'none'}
          stroke='currentColor'
          strokeWidth='2'
        >
          <path d='M7 10v12' />
          <path d='M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z' />
        </svg>
      </button>
      <button
        onClick={() => setLiked(liked === false ? null : false)}
        className={cn(
          'rounded-md p-1.5 transition-colors hover:bg-accent',
          liked === false && 'text-red-500',
        )}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill={liked === false ? 'currentColor' : 'none'}
          stroke='currentColor'
          strokeWidth='2'
        >
          <path d='M17 14V2' />
          <path d='M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z' />
        </svg>
      </button>
      {liked !== null && (
        <span className='ml-2 text-sm text-muted-foreground'>
          {liked ? 'Thanks for the feedback!' : "We'll do better"}
        </span>
      )}
    </div>
  );
}

export function SuggestionChipsDemo() {
  const suggestions = [
    'Explain this code',
    'Write unit tests',
    'Refactor for performance',
    'Add error handling',
    'Generate docs',
  ];
  return (
    <div className='flex flex-wrap gap-2'>
      {suggestions.map((s) => (
        <button
          key={s}
          className='inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground'
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export function MessageBubbleDemo() {
  return (
    <div className='max-w-lg space-y-4'>
      {[
        { role: 'user' as const, content: 'How do I add a button component?', time: '10:30 AM' },
        {
          role: 'assistant' as const,
          content:
            'Run `adhar-ui add button` to add the Button component to your project. It will be copied to your components/ui directory.',
          time: '10:30 AM',
        },
      ].map((m, i) => (
        <div key={i} className={cn('flex gap-3', m.role === 'user' ? 'flex-row-reverse' : '')}>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium'>
            {m.role === 'user' ? 'U' : 'AI'}
          </div>
          <div
            className={cn('flex max-w-[75%] flex-col gap-1', m.role === 'user' ? 'items-end' : '')}
          >
            <div
              className={cn(
                'rounded-lg px-4 py-2 text-sm',
                m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted',
              )}
            >
              {m.content}
            </div>
            <time className='text-xs text-muted-foreground'>{m.time}</time>
          </div>
        </div>
      ))}
    </div>
  );
}
