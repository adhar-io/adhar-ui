import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

const meta: Meta = { title: 'Components/Advanced' };
export default meta;

// ─── Command palette (live filtering + keyboard nav) ──────────────────────
const COMMANDS = [
  { group: 'Suggestions', items: ['Search docs', 'New file', 'Open settings'] },
  { group: 'Actions', items: ['Toggle theme', 'Copy link', 'Invite member', 'Sign out'] },
];

function CommandPalette() {
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const groups = COMMANDS
    .map((g) => ({ ...g, items: g.items.filter((i) => i.toLowerCase().includes(query.toLowerCase())) }))
    .filter((g) => g.items.length);
  const flat = groups.flatMap((g) => g.items);
  const clampedActive = Math.min(active, Math.max(0, flat.length - 1));

  return (
    <div className='mx-auto w-full max-w-md overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg'>
      <div className='flex items-center gap-2 border-b border-border px-3'>
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} className='shrink-0 text-muted-foreground'>
          <circle cx='11' cy='11' r='8' /><path d='m21 21-4.3-4.3' />
        </svg>
        <input
          autoFocus
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, flat.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          }}
          placeholder='Type a command or search…'
          className='h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground'
        />
      </div>
      <div className='max-h-72 overflow-y-auto p-1'>
        {flat.length === 0 && <div className='py-6 text-center text-sm text-muted-foreground'>No results found.</div>}
        {groups.map((g) => (
          <div key={g.group} role='group' className='p-1'>
            <div className='px-2 py-1.5 text-xs font-medium text-muted-foreground'>{g.group}</div>
            {g.items.map((item) => {
              const idx = flat.indexOf(item);
              return (
                <div
                  key={item}
                  onMouseEnter={() => setActive(idx)}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                    idx === clampedActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/60',
                  )}
                >
                  {item}
                  <kbd className='ml-auto text-[10px] tracking-widest text-muted-foreground'>↵</kbd>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
export const CommandStory: StoryObj = { name: 'Command Palette', render: () => <CommandPalette /> };

// ─── Stepper (advance / smooth ring) ──────────────────────────────────────
function StepperDemo({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) {
  const steps = ['Account', 'Profile', 'Billing', 'Done'];
  const [current, setCurrent] = React.useState(1);
  const vertical = orientation === 'vertical';
  return (
    <div className='w-full max-w-xl'>
      <ol className={cn('flex', vertical ? 'flex-col' : 'flex-row items-start')}>
        {steps.map((label, i) => {
          const state = i < current ? 'complete' : i === current ? 'current' : 'upcoming';
          return (
            <li key={label} className={cn('group flex gap-3', vertical ? 'flex-row items-start pb-6 last:pb-0' : 'flex-1 flex-col items-center text-center last:flex-none')}>
              <button
                onClick={() => setCurrent(i)}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold shrink-0 transition-colors duration-200',
                  state === 'complete' && 'bg-primary border-primary text-primary-foreground',
                  state === 'current' && 'border-primary text-primary ring-4 ring-primary/15',
                  state === 'upcoming' && 'border-border bg-background text-muted-foreground',
                )}
              >
                {state === 'complete'
                  ? <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={3}><path d='M20 6 9 17l-5-5' /></svg>
                  : i + 1}
              </button>
              <div className={cn(vertical ? '' : 'mt-1')}>
                <span className={cn('text-sm font-medium', state === 'upcoming' ? 'text-muted-foreground' : 'text-foreground')}>{label}</span>
              </div>
              {i < steps.length - 1 && !vertical && (
                <span className={cn('mt-4 h-0.5 flex-1 transition-colors duration-200', i < current ? 'bg-primary' : 'bg-border')} />
              )}
            </li>
          );
        })}
      </ol>
      <div className='mt-6 flex gap-2'>
        <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} className='h-9 rounded-md border border-input px-3 text-sm hover:bg-accent'>Back</button>
        <button onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))} className='h-9 rounded-md bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90'>Continue</button>
      </div>
    </div>
  );
}
export const StepperStory: StoryObj<typeof StepperDemo> = {
  name: 'Stepper',
  render: (args) => <StepperDemo {...args} />,
  args: { orientation: 'horizontal' },
  argTypes: { orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } },
};

// ─── Timeline ─────────────────────────────────────────────────────────────
function TimelineDemo() {
  const events = [
    { time: '09:00', title: 'Order placed', color: 'bg-primary' },
    { time: '11:30', title: 'Payment confirmed', color: 'bg-green-500' },
    { time: '14:15', title: 'Shipped', color: 'bg-blue-500' },
    { time: 'Now', title: 'Out for delivery', color: 'bg-yellow-500' },
  ];
  return (
    <ol className='flex w-full max-w-md flex-col'>
      {events.map((e, i) => (
        <li key={e.title} className='relative flex gap-4 pb-6 last:pb-0'>
          <div className='relative flex flex-col items-center'>
            <span className={cn('z-10 h-3.5 w-3.5 rounded-full ring-4 ring-background', e.color)} />
            {i < events.length - 1 && <span className='mt-1 w-0.5 flex-1 bg-border' />}
          </div>
          <div className='-mt-0.5 flex-1'>
            <span className='block text-xs text-muted-foreground'>{e.time}</span>
            <span className='block text-sm font-medium text-foreground'>{e.title}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
export const TimelineStory: StoryObj = { name: 'Timeline', render: () => <TimelineDemo /> };

// ─── Stat cards ───────────────────────────────────────────────────────────
function StatCardsDemo() {
  const stats = [
    { label: 'Revenue', value: '$45,231', trend: 'up', tv: '+20.1%' },
    { label: 'Subscriptions', value: '2,350', trend: 'up', tv: '+180' },
    { label: 'Churn', value: '1.2%', trend: 'down', tv: '-0.4%' },
  ] as const;
  return (
    <div className='grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3'>
      {stats.map((s) => (
        <div key={s.label} className='rounded-xl border border-border bg-card p-5 text-card-foreground transition-shadow duration-200 hover:shadow-md'>
          <span className='text-sm font-medium text-muted-foreground'>{s.label}</span>
          <div className='mt-2 text-2xl font-semibold tracking-tight tabular-nums'>{s.value}</div>
          <div className='mt-2 flex items-center gap-2'>
            <span className={cn('inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium',
              s.trend === 'up' ? 'bg-green-500/15 text-green-600 dark:text-green-400' : 'bg-destructive/15 text-destructive')}>
              {s.trend === 'up' ? '↑' : '↓'} {s.tv}
            </span>
            <span className='text-xs text-muted-foreground'>vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
export const StatCardStory: StoryObj = { name: 'Stat Card', render: () => <StatCardsDemo /> };

// ─── Collapsible (smooth grid-rows animation) ─────────────────────────────
function CollapsibleDemo() {
  const [open, setOpen] = React.useState(true);
  return (
    <div className='w-full max-w-md rounded-lg border border-border'>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className='flex w-full items-center justify-between px-4 py-3 text-sm font-medium'>
        Can I customize the components?
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}
          className={cn('transition-transform duration-200', open && 'rotate-180')}><path d='m6 9 6 6 6-6' /></svg>
      </button>
      <div className={cn('grid transition-all duration-200 ease-out', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
        <div className='overflow-hidden'>
          <p className='px-4 pb-4 text-sm text-muted-foreground'>
            Yes — every component is yours. Styles are plain Tailwind classes and the source compiles to your framework, so you can edit anything.
          </p>
        </div>
      </div>
    </div>
  );
}
export const CollapsibleStory: StoryObj = { name: 'Collapsible', render: () => <CollapsibleDemo /> };

// ─── Hover card (CSS reveal on hover/focus) ───────────────────────────────
function HoverCardDemo() {
  return (
    <div className='flex justify-center py-10'>
      <div className='group relative inline-block'>
        <button tabIndex={0} className='text-sm font-medium text-primary underline-offset-4 hover:underline focus:underline focus:outline-none'>@adhar-ui</button>
        <div className='invisible absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 translate-y-1 rounded-lg border border-border bg-popover p-4 text-popover-foreground opacity-0 shadow-md transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100'>
          <div className='flex gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground'>A</div>
            <div>
              <p className='text-sm font-semibold'>Adhar UI</p>
              <p className='text-xs text-muted-foreground'>Framework-agnostic design system. Own your components.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const HoverCardStory: StoryObj = { name: 'Hover Card', render: () => <HoverCardDemo /> };

// ─── Input OTP (live one-time-code) ───────────────────────────────────────
function InputOTPDemo({ length = 6 }: { length?: number }) {
  const [value, setValue] = React.useState('');
  const complete = value.length >= length;
  return (
    <div className='mx-auto w-full max-w-xs space-y-3 text-center'>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, '').slice(0, length))}
        inputMode='numeric'
        autoComplete='one-time-code'
        placeholder={'•'.repeat(length)}
        aria-label='One-time code'
        className={cn(
          'h-12 w-full rounded-lg border bg-background text-center font-mono text-lg tracking-[0.6em] indent-[0.3em] outline-none transition-[box-shadow,border-color] duration-150',
          complete ? 'border-green-500 ring-2 ring-green-500/30' : 'border-input focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring',
        )}
      />
      <p className='text-xs text-muted-foreground'>{complete ? '✓ Code complete' : `Enter the ${length}-digit code we sent you`}</p>
    </div>
  );
}
export const InputOTPStory: StoryObj<typeof InputOTPDemo> = {
  name: 'Input OTP',
  render: (args) => <InputOTPDemo {...args} />,
  args: { length: 6 },
  argTypes: { length: { control: { type: 'number', min: 4, max: 8 } } },
};

// ─── Empty state ──────────────────────────────────────────────────────────
export const EmptyStateStory: StoryObj = {
  name: 'Empty State',
  render: () => (
    <div className='mx-auto flex max-w-sm flex-col items-center justify-center gap-3 py-12 text-center'>
      <div className='flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground'>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' /><path d='M14 2v6h6' /></svg>
      </div>
      <h3 className='text-base font-semibold'>No projects yet</h3>
      <p className='max-w-sm text-sm text-muted-foreground'>Create your first project to start building with Adhar UI components.</p>
      <button className='mt-2 h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90'>New project</button>
    </div>
  ),
};
