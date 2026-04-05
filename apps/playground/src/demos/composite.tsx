/**
 * Composite component demos — Command, Combobox, DatePicker, Calendar,
 * ColorPicker, Form, InputOTP, Table, Carousel, Chart, Sonner
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function CommandDemo() {
  const [search, setSearch] = useState('');
  const groups = [
    { label: 'Suggestions', items: ['Calendar', 'Search Emoji', 'Calculator'] },
    { label: 'Settings', items: ['Profile', 'Billing', 'Settings'] },
  ];
  return (
    <div className='w-72 rounded-md border bg-popover shadow-md'>
      <div className='flex items-center border-b px-3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          className='mr-2 shrink-0 opacity-50'
        >
          <circle cx='11' cy='11' r='8' />
          <path d='m21 21-4.3-4.3' />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Type a command or search...'
          className='flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground'
        />
      </div>
      <div className='max-h-[300px] overflow-y-auto p-1'>
        {groups.map((g) => {
          const filtered = g.items.filter((i) => i.toLowerCase().includes(search.toLowerCase()));
          if (filtered.length === 0) return null;
          return (
            <div key={g.label}>
              <p className='px-2 py-1.5 text-xs font-medium text-muted-foreground'>{g.label}</p>
              {filtered.map((item) => (
                <div
                  key={item}
                  className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
                >
                  {item}
                </div>
              ))}
            </div>
          );
        })}
        {groups.every((g) =>
          g.items.filter((i) => i.toLowerCase().includes(search.toLowerCase())).length === 0
        ) && <p className='py-6 text-center text-sm text-muted-foreground'>No results found.</p>}
      </div>
    </div>
  );
}

export function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
    { value: 'preact', label: 'Preact' },
    { value: 'lit', label: 'Lit' },
    { value: 'qwik', label: 'Qwik' },
  ];
  const filtered = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));
  const selected = options.find((o) => o.value === value);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  return (
    <div ref={ref} className='relative w-[220px]'>
      <button
        onClick={() => setOpen(!open)}
        className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm'
      >
        <span className={!selected ? 'text-muted-foreground' : ''}>
          {selected?.label ?? 'Select framework...'}
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
            autoFocus
          />
          <div className='max-h-48 overflow-auto'>
            {filtered.length === 0
              ? <p className='py-4 text-center text-sm text-muted-foreground'>No results.</p>
              : filtered.map((o) => (
                <div
                  key={o.value}
                  onClick={() => {
                    setValue(o.value);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    'flex items-center rounded-sm px-2 py-1.5 text-sm cursor-default hover:bg-accent',
                    value === o.value && 'bg-accent',
                  )}
                >
                  {o.label}
                  {value === o.value && (
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
        </div>
      )}
    </div>
  );
}

export function DatePickerDemo() {
  const [date, setDate] = useState('');
  return (
    <div className='space-y-4 max-w-xs'>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Single date</p>
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        />
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Date range</p>
        <div className='flex items-center gap-2'>
          <input
            type='date'
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
          />
          <span className='text-sm text-muted-foreground'>to</span>
          <input
            type='date'
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
          />
        </div>
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Date + time</p>
        <input
          type='datetime-local'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
        />
      </div>
    </div>
  );
}

export function CalendarDemo() {
  const [selected, setSelected] = useState(15);
  const today = new Date().getDate();
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return (
    <div className='rounded-md border p-4 w-72'>
      <div className='flex items-center justify-between mb-3'>
        <button className='h-7 w-7 inline-flex items-center justify-center rounded-md border hover:bg-accent text-sm'>
          ←
        </button>
        <h4 className='text-sm font-medium'>April 2026</h4>
        <button className='h-7 w-7 inline-flex items-center justify-center rounded-md border hover:bg-accent text-sm'>
          →
        </button>
      </div>
      <div className='grid grid-cols-7 gap-1 text-center'>
        {days.map((d) => (
          <div key={d} className='py-1 text-xs text-muted-foreground font-medium'>{d}</div>
        ))}
        {/* offset for April 2026 starting on Wednesday */}
        {[...Array(3)].map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
          <button
            key={d}
            onClick={() => setSelected(d)}
            className={cn(
              'rounded-md py-1 text-sm hover:bg-accent transition-colors',
              d === selected && 'bg-primary text-primary-foreground hover:bg-primary',
              d === today && d !== selected && 'border border-primary',
              d < today && d !== selected && 'text-muted-foreground',
            )}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ColorPickerDemo() {
  const [color, setColor] = useState('#6366f1');
  const presets = [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
  ];
  return (
    <div className='space-y-4'>
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
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-2'>Presets</p>
        <div className='flex gap-2'>
          {presets.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={cn(
                'h-6 w-6 rounded-full border-2',
                color === c ? 'border-foreground' : 'border-transparent',
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormDemo() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const errs: Record<string, string> = {};
    if (!data.get('username')) errs.username = 'Username is required';
    if (!data.get('email')) errs.email = 'Email is required';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    alert('Form submitted!');
  };
  return (
    <form className='max-w-sm space-y-4' onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Username</label>
        <input
          name='username'
          placeholder='Enter username'
          className={cn(
            'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm',
            errors.username ? 'border-destructive' : 'border-input',
          )}
        />
        {errors.username && <p className='text-sm text-destructive'>{errors.username}</p>}
        <p className='text-sm text-muted-foreground'>This is your public display name.</p>
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Email</label>
        <input
          name='email'
          type='email'
          placeholder='you@example.com'
          className={cn(
            'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm',
            errors.email ? 'border-destructive' : 'border-input',
          )}
        />
        {errors.email && <p className='text-sm text-destructive'>{errors.email}</p>}
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Bio</label>
        <textarea
          name='bio'
          placeholder='Tell us about yourself'
          rows={3}
          className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
        />
        <p className='text-sm text-muted-foreground'>Max 160 characters.</p>
      </div>
      <div className='flex items-center gap-2'>
        <input type='checkbox' name='terms' className='h-4 w-4 accent-primary' />
        <label className='text-sm'>I agree to the terms of service</label>
      </div>
      <button
        type='submit'
        className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'
      >
        Submit
      </button>
    </form>
  );
}

export function InputOTPDemo() {
  const [vals, setVals] = useState(['', '', '', '', '', '']);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (i: number, v: string) => {
    if (v.length > 1) return;
    const next = [...vals];
    next[i] = v;
    setVals(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !vals[i] && i > 0) refs.current[i - 1]?.focus();
  };
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>6-digit code</p>
        <div className='flex items-center gap-2'>
          {vals.slice(0, 3).map((v, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              maxLength={1}
              value={v}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className='flex h-12 w-12 items-center justify-center rounded-md border border-input bg-background text-center text-lg font-semibold focus:ring-2 focus:ring-ring focus:outline-none'
            />
          ))}
          <span className='text-muted-foreground'>-</span>
          {vals.slice(3).map((v, i) => (
            <input
              key={i + 3}
              ref={(el) => {
                refs.current[i + 3] = el;
              }}
              maxLength={1}
              value={v}
              onChange={(e) => handleChange(i + 3, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i + 3, e)}
              className='flex h-12 w-12 items-center justify-center rounded-md border border-input bg-background text-center text-lg font-semibold focus:ring-2 focus:ring-ring focus:outline-none'
            />
          ))}
        </div>
      </div>
      <p className='text-sm text-muted-foreground'>Enter the code sent to your email.</p>
    </div>
  );
}

export function TableDemo() {
  const invoices = [
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
  ];
  const statusColor: Record<string, string> = {
    Paid: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    Unpaid: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  };
  return (
    <div className='w-full overflow-auto'>
      <table className='w-full caption-bottom text-sm'>
        <caption className='mt-4 text-sm text-muted-foreground'>
          A list of your recent invoices.
        </caption>
        <thead>
          <tr className='border-b'>
            <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
              Invoice
            </th>
            <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
              Status
            </th>
            <th className='h-12 px-4 text-left align-middle font-medium text-muted-foreground'>
              Method
            </th>
            <th className='h-12 px-4 text-right align-middle font-medium text-muted-foreground'>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className='border-b transition-colors hover:bg-muted/50'>
              <td className='p-4 align-middle font-medium'>{inv.id}</td>
              <td className='p-4 align-middle'>
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
                    statusColor[inv.status],
                  )}
                >
                  {inv.status}
                </span>
              </td>
              <td className='p-4 align-middle'>{inv.method}</td>
              <td className='p-4 align-middle text-right font-medium'>{inv.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='border-t bg-muted/50 font-medium'>
            <td colSpan={3} className='p-4'>Total</td>
            <td className='p-4 text-right'>$1,750.00</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function CarouselDemo() {
  const [idx, setIdx] = useState(0);
  const items = [
    { title: 'Beautiful Landscapes', desc: 'Explore nature photography' },
    { title: 'Urban Architecture', desc: 'Modern city structures' },
    { title: 'Abstract Art', desc: 'Colors and shapes' },
    { title: 'Food Photography', desc: 'Culinary delights' },
  ];
  return (
    <div className='relative max-w-sm'>
      <div className='overflow-hidden rounded-lg border'>
        <div className='flex h-48 items-center justify-center bg-muted'>
          <div className='text-center px-6'>
            <h3 className='text-lg font-semibold'>{items[idx].title}</h3>
            <p className='text-sm text-muted-foreground mt-1'>{items[idx].desc}</p>
          </div>
        </div>
      </div>
      <div className='mt-3 flex items-center justify-center gap-3'>
        <button
          onClick={() => setIdx((idx - 1 + items.length) % items.length)}
          className='h-8 w-8 rounded-full border bg-background flex items-center justify-center text-sm hover:bg-accent'
        >
          ←
        </button>
        <div className='flex gap-1.5'>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={cn(
                'h-2 w-2 rounded-full transition-colors',
                i === idx ? 'bg-primary' : 'bg-muted-foreground/30',
              )}
            />
          ))}
        </div>
        <button
          onClick={() => setIdx((idx + 1) % items.length)}
          className='h-8 w-8 rounded-full border bg-background flex items-center justify-center text-sm hover:bg-accent'
        >
          →
        </button>
      </div>
      <p className='text-center text-xs text-muted-foreground mt-2'>{idx + 1} / {items.length}</p>
    </div>
  );
}

export function ChartDemo() {
  const weekData = [40, 65, 45, 80, 55, 70, 90];
  const monthData = [20, 35, 50, 40, 60, 45, 55, 70, 65, 80, 75, 90];
  const max = Math.max(...weekData);
  return (
    <div className='space-y-6'>
      <div className='rounded-lg border bg-card p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h4 className='text-sm font-semibold'>Weekly Activity</h4>
          <select className='h-8 rounded-md border px-2 text-xs'>
            <option>This week</option>
            <option>Last week</option>
          </select>
        </div>
        <div className='flex items-end gap-2 h-32'>
          {weekData.map((v, i) => (
            <div key={i} className='group flex-1 flex flex-col items-center gap-1 relative'>
              <div className='absolute -top-6 left-1/2 -translate-x-1/2 hidden group-hover:block rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background'>
                {v}
              </div>
              <div
                className='w-full rounded-t-sm bg-primary transition-all hover:bg-primary/80'
                style={{ height: `${(v / max) * 100}%` }}
              />
              <span className='text-[10px] text-muted-foreground'>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='rounded-lg border bg-card p-6'>
        <h4 className='text-sm font-semibold mb-4'>Monthly Trend</h4>
        <div className='flex items-end gap-1 h-24'>
          {monthData.map((v, i) => (
            <div
              key={i}
              className='flex-1 rounded-t-sm bg-blue-500/70 hover:bg-blue-500 transition-all'
              style={{ height: `${(v / Math.max(...monthData)) * 100}%` }}
            />
          ))}
        </div>
        <div className='flex justify-between mt-1 text-[10px] text-muted-foreground'>
          <span>Jan</span>
          <span>Jun</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
}

export function SonnerDemo() {
  return (
    <div className='rounded-lg border p-4 max-w-sm'>
      <h4 className='text-sm font-semibold mb-2'>Sonner Toast Library</h4>
      <p className='text-sm text-muted-foreground mb-3'>
        Sonner provides a production-ready toast notification system. Install via{' '}
        <code className='rounded bg-muted px-1 py-0.5 text-xs font-mono'>adhar-ui add sonner</code>.
      </p>
      <div className='space-y-2 text-sm'>
        <p className='font-mono text-xs bg-muted rounded p-2'>toast('Event has been created')</p>
        <p className='font-mono text-xs bg-muted rounded p-2'>
          toast.success('Successfully saved!')
        </p>
        <p className='font-mono text-xs bg-muted rounded p-2'>
          toast.error('Something went wrong')
        </p>
        <p className='font-mono text-xs bg-muted rounded p-2'>
          toast.promise(saveData(), &#123; loading: 'Saving...', success: 'Done!', error: 'Failed'
          &#125;)
        </p>
      </div>
    </div>
  );
}
