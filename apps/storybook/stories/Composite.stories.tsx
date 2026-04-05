import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

export const CommandStory: StoryObj = {
  name: 'Command',
  render: () => {
    const [s, ss] = useState('');
    const items = ['Calendar', 'Search', 'Settings', 'Profile', 'Billing'];
    const f = items.filter((i) => i.toLowerCase().includes(s.toLowerCase()));
    return (
      <div className='w-64 rounded-md border bg-popover shadow-md'>
        <div className='flex items-center border-b px-3'>
          <span className='mr-2 opacity-50'>🔍</span>
          <input
            value={s}
            onChange={(e) => ss(e.target.value)}
            placeholder='Type command...'
            className='h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground'
          />
        </div>
        <div className='p-1'>
          {f.length === 0
            ? <p className='py-4 text-center text-sm text-muted-foreground'>No results</p>
            : f.map((i) => (
              <div
                key={i}
                className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
              >
                {i}
              </div>
            ))}
        </div>
      </div>
    );
  },
};

export const ComboboxStory: StoryObj = {
  name: 'Combobox',
  render: () => {
    const [o, so] = useState(false);
    const [v, sv] = useState('');
    const [s, ss] = useState('');
    const opts = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Preact'];
    const f = opts.filter((x) => x.toLowerCase().includes(s.toLowerCase()));
    return (
      <div className='relative w-[200px]'>
        <button
          onClick={() => so(!o)}
          className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm'
        >
          <span className={!v ? 'text-muted-foreground' : ''}>{v || 'Select...'}</span>
          <span className='opacity-50'>▾</span>
        </button>
        {o && (
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
                onClick={() => {
                  sv(x);
                  so(false);
                  ss('');
                }}
                className={cn(
                  'rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default',
                  v === x && 'bg-accent',
                )}
              >
                {x} {v === x && '✓'}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const DatePickerStory: StoryObj = {
  name: 'Date Picker',
  render: () => (
    <div className='max-w-xs space-y-3'>
      <div className='space-y-1'>
        <p className='text-xs text-muted-foreground'>Single</p>
        <input
          type='date'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm'
        />
      </div>
      <div className='space-y-1'>
        <p className='text-xs text-muted-foreground'>Date+time</p>
        <input
          type='datetime-local'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm'
        />
      </div>
    </div>
  ),
};

export const CalendarStory: StoryObj = {
  name: 'Calendar',
  render: () => {
    const [sel, setSel] = useState(15);
    return (
      <div className='w-64 rounded-md border p-4'>
        <div className='flex items-center justify-between mb-3'>
          <button className='h-7 w-7 rounded-md border text-sm hover:bg-accent'>←</button>
          <h4 className='text-sm font-medium'>April 2026</h4>
          <button className='h-7 w-7 rounded-md border text-sm hover:bg-accent'>→</button>
        </div>
        <div className='grid grid-cols-7 gap-1 text-center'>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d} className='py-1 text-xs text-muted-foreground'>{d}</div>
          ))}
          {[...Array(3)].map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: 30 }, (_, i) => (
            <button
              key={i}
              onClick={() => setSel(i + 1)}
              className={cn(
                'rounded-md py-1 text-sm hover:bg-accent',
                sel === i + 1 && 'bg-primary text-primary-foreground',
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

export const ColorPickerStory: StoryObj = {
  name: 'Color Picker',
  render: () => {
    const [c, sc] = useState('#6366f1');
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
  },
};

export const FormStory: StoryObj = {
  name: 'Form',
  render: () => (
    <form className='max-w-sm space-y-4' onSubmit={(e) => e.preventDefault()}>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Username</label>
        <input
          placeholder='Enter username'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm'
        />
        <p className='text-sm text-muted-foreground'>Public display name.</p>
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Email</label>
        <input
          type='email'
          placeholder='you@example.com'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm'
        />
      </div>
      <button
        type='submit'
        className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground'
      >
        Submit
      </button>
    </form>
  ),
};

export const InputOTPStory: StoryObj = {
  name: 'Input OTP',
  render: () => {
    const [v, sv] = useState(['', '', '', '', '', '']);
    return (
      <div className='flex gap-2'>
        {v.map((d, i) => (
          <input
            key={i}
            maxLength={1}
            value={d}
            onChange={(e) => {
              const n = [...v];
              n[i] = e.target.value;
              sv(n);
              if (e.target.value && i < 5) {
                (e.target.nextElementSibling as HTMLInputElement)
                  ?.focus();
              }
            }}
            className='flex h-12 w-12 items-center justify-center rounded-md border text-center text-lg font-semibold focus:ring-2 focus:ring-ring focus:outline-none'
          />
        ))}
      </div>
    );
  },
};

export const TableStory: StoryObj = {
  name: 'Table',
  render: () => (
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
          {[['INV001', 'Paid', 'Card', '$250'], ['INV002', 'Pending', 'PayPal', '$150'], [
            'INV003',
            'Unpaid',
            'Bank',
            '$350',
          ]].map((r) => (
            <tr key={r[0]} className='border-b hover:bg-muted/50'>
              <td className='p-4 font-medium'>{r[0]}</td>
              <td className='p-4'>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                    r[1] === 'Paid'
                      ? 'bg-green-100 text-green-700'
                      : r[1] === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700',
                  )}
                >
                  {r[1]}
                </span>
              </td>
              <td className='p-4'>{r[2]}</td>
              <td className='p-4 text-right font-medium'>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const CarouselStory: StoryObj = {
  name: 'Carousel',
  render: () => {
    const [i, si] = useState(0);
    const s = ['Slide 1', 'Slide 2', 'Slide 3'];
    return (
      <div className='relative max-w-sm'>
        <div className='overflow-hidden rounded-lg border'>
          <div className='flex h-40 items-center justify-center bg-muted text-lg font-semibold'>
            {s[i]}
          </div>
        </div>
        <div className='mt-2 flex justify-center gap-2'>
          <button
            onClick={() => si((i - 1 + s.length) % s.length)}
            className='h-8 w-8 rounded-full border text-sm'
          >
            ←
          </button>
          {s.map((_, j) => (
            <button
              key={j}
              onClick={() => si(j)}
              className={cn(
                'h-2 w-2 rounded-full',
                j === i ? 'bg-primary' : 'bg-muted-foreground/30',
              )}
            />
          ))}
          <button
            onClick={() => si((i + 1) % s.length)}
            className='h-8 w-8 rounded-full border text-sm'
          >
            →
          </button>
        </div>
      </div>
    );
  },
};

export const ChartStory: StoryObj = {
  name: 'Chart',
  render: () => (
    <div className='rounded-lg border p-6'>
      <h4 className='text-sm font-semibold mb-4'>Weekly</h4>
      <div className='flex items-end gap-2 h-32'>
        {[40, 65, 45, 80, 55, 70, 90].map((v, i) => (
          <div key={i} className='flex-1 flex flex-col items-center gap-1'>
            <div
              className='w-full rounded-t-sm bg-primary hover:bg-primary/80'
              style={{ height: `${v}%` }}
            />
            <span className='text-[10px] text-muted-foreground'>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const SonnerStory: StoryObj = {
  name: 'Sonner',
  render: () => (
    <div className='rounded-lg border p-4 max-w-sm'>
      <h4 className='text-sm font-semibold mb-2'>Sonner Toast Library</h4>
      <p className='text-sm text-muted-foreground'>
        Use <code className='rounded bg-muted px-1 text-xs font-mono'>toast('Message')</code>{' '}
        to trigger.
      </p>
    </div>
  ),
};

const meta: Meta = { title: 'Components/Composite' };
export default meta;
