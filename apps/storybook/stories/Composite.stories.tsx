import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

/* ─── Command ─────────────────────────────────────────────────────── */

function Command({ placeholder = 'Type command...', maxItems = 5 }: { placeholder?: string; maxItems?: number }) {
  const [s, ss] = useState('');
  const items = ['Calendar', 'Search', 'Settings', 'Profile', 'Billing', 'Logout', 'Help', 'Notifications'];
  const f = items.filter((i) => i.toLowerCase().includes(s.toLowerCase())).slice(0, maxItems);
  return (
    <div className='w-64 rounded-md border bg-popover shadow-md'>
      <div className='flex items-center border-b px-3'>
        <span className='mr-2 opacity-50'>&#x1F50D;</span>
        <input
          value={s}
          onChange={(e) => ss(e.target.value)}
          placeholder={placeholder}
          className='h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground'
        />
      </div>
      <div className='p-1'>
        {f.length === 0
          ? <p className='py-4 text-center text-sm text-muted-foreground'>No results</p>
          : f.map((i) => (
            <div key={i} className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'>{i}</div>
          ))}
      </div>
    </div>
  );
}

export const CommandStory: StoryObj<typeof Command> = {
  name: 'Command',
  render: (args) => <Command {...args} />,
  args: { placeholder: 'Type command...', maxItems: 5 },
  argTypes: {
    placeholder: { control: 'text' },
    maxItems: { control: { type: 'number', min: 1, max: 10 } },
  },
};

/* ─── Combobox ────────────────────────────────────────────────────── */

function Combobox({ placeholder = 'Select...', disabled = false }: { placeholder?: string; disabled?: boolean }) {
  const [o, so] = useState(false);
  const [v, sv] = useState('');
  const [s, ss] = useState('');
  const opts = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Preact'];
  const f = opts.filter((x) => x.toLowerCase().includes(s.toLowerCase()));
  return (
    <div className='relative w-[200px]'>
      <button
        onClick={() => !disabled && so(!o)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        <span className={!v ? 'text-muted-foreground' : ''}>{v || placeholder}</span>
        <span className='opacity-50'>&#x25BE;</span>
      </button>
      {o && !disabled && (
        <div className='absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md'>
          <input
            value={s}
            onChange={(e) => ss(e.target.value)}
            placeholder='Search...'
            className='mb-1 h-8 w-full bg-transparent px-2 text-sm outline-none'
            autoFocus
          />
          {f.map((x) => (
            <div
              key={x}
              onClick={() => { sv(x); so(false); ss(''); }}
              className={cn('rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default', v === x && 'bg-accent')}
            >
              {x} {v === x && '\u2713'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const ComboboxStory: StoryObj<typeof Combobox> = {
  name: 'Combobox',
  render: (args) => <Combobox {...args} />,
  args: { placeholder: 'Select...', disabled: false },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

/* ─── Date Picker ─────────────────────────────────────────────────── */

function DatePicker({ placeholder = 'Pick a date', format = 'short' }: { placeholder?: string; format?: 'short' | 'long' }) {
  const [val, setVal] = useState('');
  const formatted = val
    ? format === 'long'
      ? new Date(val).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : new Date(val).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    : '';
  return (
    <div className='max-w-xs space-y-3'>
      <div className='space-y-1'>
        <p className='text-xs text-muted-foreground'>Format: {format}</p>
        <input
          type='date'
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm'
        />
      </div>
      {formatted && <p className='text-sm'>Formatted: <strong>{formatted}</strong></p>}
    </div>
  );
}

export const DatePickerStory: StoryObj<typeof DatePicker> = {
  name: 'Date Picker',
  render: (args) => <DatePicker {...args} />,
  args: { placeholder: 'Pick a date', format: 'short' },
  argTypes: {
    placeholder: { control: 'text' },
    format: { control: 'select', options: ['short', 'long'] },
  },
};

/* ─── Calendar ────────────────────────────────────────────────────── */

function Calendar({ showWeekNumbers = false }: { showWeekNumbers?: boolean }) {
  const [sel, setSel] = useState(15);
  return (
    <div className='w-72 rounded-md border p-4'>
      <div className='flex items-center justify-between mb-3'>
        <button className='h-7 w-7 rounded-md border text-sm hover:bg-accent'>&larr;</button>
        <h4 className='text-sm font-medium'>April 2026</h4>
        <button className='h-7 w-7 rounded-md border text-sm hover:bg-accent'>&rarr;</button>
      </div>
      <div className={cn('grid gap-1 text-center', showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7')}>
        {showWeekNumbers && <div className='py-1 text-xs text-muted-foreground'>Wk</div>}
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className='py-1 text-xs text-muted-foreground'>{d}</div>
        ))}
        {showWeekNumbers && <div className='py-1 text-[10px] text-muted-foreground'>14</div>}
        {[...Array(3)].map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: 30 }, (_, i) => {
          const day = i + 1;
          const needWeekNum = showWeekNumbers && (i + 3) % 7 === 0 && i > 0;
          return (
            <React.Fragment key={i}>
              {needWeekNum && <div className='py-1 text-[10px] text-muted-foreground'>{14 + Math.ceil((i + 3) / 7)}</div>}
              <button
                onClick={() => setSel(day)}
                className={cn(
                  'rounded-md py-1 text-sm hover:bg-accent',
                  sel === day && 'bg-primary text-primary-foreground',
                )}
              >
                {day}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export const CalendarStory: StoryObj<typeof Calendar> = {
  name: 'Calendar',
  render: (args) => <Calendar {...args} />,
  args: { showWeekNumbers: false },
  argTypes: { showWeekNumbers: { control: 'boolean' } },
};

/* ─── Color Picker ────────────────────────────────────────────────── */

function ColorPicker({ defaultColor = '#6366f1' }: { defaultColor?: string }) {
  const [c, sc] = useState(defaultColor);
  return (
    <div className='flex items-center gap-3'>
      <input
        type='color'
        value={c}
        onChange={(e) => sc(e.target.value)}
        className='h-10 w-10 cursor-pointer rounded-md border p-0.5'
      />
      <input
        value={c}
        onChange={(e) => sc(e.target.value)}
        className='h-10 w-28 rounded-md border px-3 text-sm font-mono uppercase'
      />
      <div className='h-10 w-10 rounded-md border' style={{ backgroundColor: c }} />
    </div>
  );
}

export const ColorPickerStory: StoryObj<typeof ColorPicker> = {
  name: 'Color Picker',
  render: (args) => <ColorPicker {...args} />,
  args: { defaultColor: '#6366f1' },
  argTypes: { defaultColor: { control: 'color' } },
};

/* ─── Form ────────────────────────────────────────────────────────── */

function Form({ layout = 'vertical' }: { layout?: 'vertical' | 'horizontal' }) {
  const isHoriz = layout === 'horizontal';
  return (
    <form className='max-w-md space-y-4' onSubmit={(e) => e.preventDefault()}>
      <div className={cn(isHoriz ? 'flex items-center gap-4' : 'space-y-2')}>
        <label className={cn('text-sm font-medium', isHoriz && 'w-24 shrink-0')}>Username</label>
        <div className='flex-1 space-y-1'>
          <input placeholder='Enter username' className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm' />
          {!isHoriz && <p className='text-sm text-muted-foreground'>Public display name.</p>}
        </div>
      </div>
      <div className={cn(isHoriz ? 'flex items-center gap-4' : 'space-y-2')}>
        <label className={cn('text-sm font-medium', isHoriz && 'w-24 shrink-0')}>Email</label>
        <input type='email' placeholder='you@example.com' className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm' />
      </div>
      <div className={cn(isHoriz && 'pl-28')}>
        <button type='submit' className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground'>Submit</button>
      </div>
    </form>
  );
}

export const FormStory: StoryObj<typeof Form> = {
  name: 'Form',
  render: (args) => <Form {...args} />,
  args: { layout: 'vertical' },
  argTypes: { layout: { control: 'select', options: ['vertical', 'horizontal'] } },
};

/* ─── Input OTP ───────────────────────────────────────────────────── */

function InputOTP({ length = 6 }: { length?: number }) {
  const [v, sv] = useState<string[]>(Array(length).fill(''));
  return (
    <div className='flex gap-2'>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          maxLength={1}
          value={v[i] || ''}
          onChange={(e) => {
            const n = [...v];
            n[i] = e.target.value;
            sv(n);
            if (e.target.value && i < length - 1) {
              (e.target.nextElementSibling as HTMLInputElement)?.focus();
            }
          }}
          className='flex h-12 w-12 items-center justify-center rounded-md border text-center text-lg font-semibold focus:ring-2 focus:ring-ring focus:outline-none'
        />
      ))}
    </div>
  );
}

export const InputOTPStory: StoryObj<typeof InputOTP> = {
  name: 'Input OTP',
  render: (args) => <InputOTP {...args} />,
  args: { length: 6 },
  argTypes: { length: { control: 'select', options: [4, 6, 8] } },
};

/* ─── Table ───────────────────────────────────────────────────────── */

function Table({ striped = false, rows = 3 }: { striped?: boolean; rows?: number }) {
  const data = [
    ['INV001', 'Paid', 'Card', '$250'],
    ['INV002', 'Pending', 'PayPal', '$150'],
    ['INV003', 'Unpaid', 'Bank', '$350'],
    ['INV004', 'Paid', 'Card', '$420'],
    ['INV005', 'Pending', 'PayPal', '$180'],
    ['INV006', 'Paid', 'Bank', '$560'],
    ['INV007', 'Unpaid', 'Card', '$90'],
    ['INV008', 'Paid', 'PayPal', '$310'],
  ].slice(0, rows);
  return (
    <div className='w-full overflow-auto'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b'>
            {['Invoice', 'Status', 'Method', 'Amount'].map((h) => (
              <th key={h} className='h-12 px-4 text-left font-medium text-muted-foreground'>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r, idx) => (
            <tr key={r[0]} className={cn('border-b hover:bg-muted/50', striped && idx % 2 === 1 && 'bg-muted/30')}>
              <td className='p-4 font-medium'>{r[0]}</td>
              <td className='p-4'>
                <span className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-semibold',
                  r[1] === 'Paid' ? 'bg-green-100 text-green-700' : r[1] === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700',
                )}>{r[1]}</span>
              </td>
              <td className='p-4'>{r[2]}</td>
              <td className='p-4 text-right font-medium'>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const TableStory: StoryObj<typeof Table> = {
  name: 'Table',
  render: (args) => <Table {...args} />,
  args: { striped: false, rows: 3 },
  argTypes: {
    striped: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 8 } },
  },
};

/* ─── Carousel ────────────────────────────────────────────────────── */

function Carousel({ autoplay = false, showDots = true }: { autoplay?: boolean; showDots?: boolean }) {
  const slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];
  const [i, si] = useState(0);
  React.useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => si((p) => (p + 1) % slides.length), 2000);
    return () => clearInterval(t);
  }, [autoplay]);
  return (
    <div className='relative max-w-sm'>
      <div className='overflow-hidden rounded-lg border'>
        <div className='flex h-40 items-center justify-center bg-muted text-lg font-semibold'>
          {slides[i]}
          {autoplay && <span className='ml-2 text-xs text-muted-foreground'>(auto)</span>}
        </div>
      </div>
      <div className='mt-2 flex justify-center gap-2'>
        <button onClick={() => si((i - 1 + slides.length) % slides.length)} className='h-8 w-8 rounded-full border text-sm'>&larr;</button>
        {showDots && slides.map((_, j) => (
          <button key={j} onClick={() => si(j)} className={cn('h-2 w-2 rounded-full', j === i ? 'bg-primary' : 'bg-muted-foreground/30')} />
        ))}
        <button onClick={() => si((i + 1) % slides.length)} className='h-8 w-8 rounded-full border text-sm'>&rarr;</button>
      </div>
    </div>
  );
}

export const CarouselStory: StoryObj<typeof Carousel> = {
  name: 'Carousel',
  render: (args) => <Carousel {...args} />,
  args: { autoplay: false, showDots: true },
  argTypes: {
    autoplay: { control: 'boolean' },
    showDots: { control: 'boolean' },
  },
};

/* ─── Chart ───────────────────────────────────────────────────────── */

function Chart({ type = 'bar', showGrid = true }: { type?: 'bar' | 'line'; showGrid?: boolean }) {
  const values = [40, 65, 45, 80, 55, 70, 90];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div className='rounded-lg border p-6'>
      <h4 className='text-sm font-semibold mb-4'>Weekly ({type})</h4>
      <div className='relative'>
        {showGrid && (
          <div className='absolute inset-0 flex flex-col justify-between pointer-events-none'>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className='border-t border-dashed border-muted-foreground/15' />
            ))}
          </div>
        )}
        {type === 'bar' ? (
          <div className='flex items-end gap-2 h-32 relative'>
            {values.map((v, i) => (
              <div key={i} className='flex-1 flex flex-col items-center gap-1'>
                <div className='w-full rounded-t-sm bg-primary hover:bg-primary/80' style={{ height: `${v}%` }} />
                <span className='text-[10px] text-muted-foreground'>{days[i]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className='h-32 relative'>
            <svg viewBox='0 0 600 120' className='w-full h-full' preserveAspectRatio='none'>
              <polyline
                fill='none'
                stroke='hsl(var(--primary))'
                strokeWidth='3'
                points={values.map((v, i) => `${i * 100},${120 - v * 1.2}`).join(' ')}
              />
              {values.map((v, i) => (
                <circle key={i} cx={i * 100} cy={120 - v * 1.2} r='4' fill='hsl(var(--primary))' />
              ))}
            </svg>
            <div className='flex justify-between mt-1'>
              {days.map((d, i) => <span key={i} className='text-[10px] text-muted-foreground'>{d}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const ChartStory: StoryObj<typeof Chart> = {
  name: 'Chart',
  render: (args) => <Chart {...args} />,
  args: { type: 'bar', showGrid: true },
  argTypes: {
    type: { control: 'select', options: ['bar', 'line'] },
    showGrid: { control: 'boolean' },
  },
};

/* ─── Sonner ──────────────────────────────────────────────────────── */

function Sonner({ variant = 'default' }: { variant?: 'default' | 'success' | 'error' }) {
  const [show, setShow] = useState(false);
  const styles: Record<string, { bg: string; border: string; icon: string; text: string }> = {
    default: { bg: 'bg-background', border: 'border', icon: 'i', text: 'Event created.' },
    success: { bg: 'bg-green-50', border: 'border-green-200', icon: '\u2713', text: 'Successfully saved!' },
    error: { bg: 'bg-red-50', border: 'border-red-200', icon: '\u2717', text: 'Something went wrong.' },
  };
  const s = styles[variant];
  return (
    <div className='space-y-3'>
      <button
        onClick={() => { setShow(true); setTimeout(() => setShow(false), 3000); }}
        className='h-9 rounded-md border px-4 text-sm hover:bg-accent'
      >
        Show toast ({variant})
      </button>
      {show && (
        <div className={cn('max-w-sm rounded-lg p-4 shadow-lg flex items-center gap-3', s.bg, s.border)}>
          <span className='text-sm font-medium'>{s.icon}</span>
          <p className='text-sm flex-1'>{s.text}</p>
          <button onClick={() => setShow(false)} className='text-xs text-muted-foreground hover:text-foreground'>&times;</button>
        </div>
      )}
    </div>
  );
}

export const SonnerStory: StoryObj<typeof Sonner> = {
  name: 'Sonner',
  render: (args) => <Sonner {...args} />,
  args: { variant: 'default' },
  argTypes: { variant: { control: 'select', options: ['default', 'success', 'error'] } },
};

const meta: Meta = { title: 'Components/Composite' };
export default meta;
