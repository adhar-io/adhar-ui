/**
 * Extended demos covering ALL remaining components and blocks.
 * Adds demos for every component missing from the original demos.tsx.
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// ─── Tier 1 Missing ──────────────────────────────────────────────────

export function RadioGroupDemo() {
  const [v, sv] = useState('default');
  return (
    <div className='grid gap-2'>
      {['Default', 'Comfortable', 'Compact'].map((o) => (
        <label key={o} className='flex items-center gap-2 text-sm'>
          <input
            type='radio'
            checked={v === o}
            onChange={() =>
              sv(o)}
            className='h-4 w-4 accent-primary'
          />
          {o}
        </label>
      ))}
    </div>
  );
}

export function ToggleGroupDemo() {
  const [active, setActive] = useState('center');
  return (
    <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'>
      {['left', 'center', 'right'].map((a) => (
        <button
          key={a}
          onClick={() => setActive(a)}
          className={cn(
            'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
            active === a && 'bg-background text-foreground shadow-sm',
          )}
        >
          {a.charAt(0).toUpperCase() + a.slice(1)}
        </button>
      ))}
    </div>
  );
}

export function AspectRatioDemo() {
  return (
    <div className='max-w-xs space-y-4'>
      {[{ r: 16 / 9, l: '16:9' }, { r: 4 / 3, l: '4:3' }, { r: 1, l: '1:1' }].map(({ r, l }) => (
        <div key={l}>
          <p className='text-xs text-muted-foreground mb-1'>{l}</p>
          <div
            style={{ position: 'relative', paddingBottom: `${100 / r}%` }}
            className='w-full rounded-md bg-muted'
          >
            <div className='absolute inset-0 flex items-center justify-center text-sm text-muted-foreground'>
              {l}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScrollAreaDemo() {
  return (
    <div className='h-48 w-64 overflow-hidden rounded-md border'>
      <div className='h-full overflow-auto p-4'>
        <h4 className='mb-4 text-sm font-medium'>Tags</h4>
        {Array.from(
          { length: 20 },
          (_, i) => <div key={i} className='border-b py-2 text-sm'>Tag {i + 1}</div>,
        )}
      </div>
    </div>
  );
}

export function CollapsibleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className='max-w-sm space-y-2'>
      <div className='flex items-center justify-between'>
        <h4 className='text-sm font-semibold'>3 repositories</h4>
        <button onClick={() => setOpen(!open)} className='rounded p-1 hover:bg-accent text-sm'>
          {open ? '▲' : '▼'}
        </button>
      </div>
      <div className='rounded-md border px-4 py-3 text-sm font-mono'>@adhar-ui/primitives</div>
      {open && (
        <>
          <div className='rounded-md border px-4 py-3 text-sm font-mono'>@adhar-ui/tokens</div>
          <div className='rounded-md border px-4 py-3 text-sm font-mono'>@adhar-ui/utils</div>
        </>
      )}
    </div>
  );
}

export function ResizableDemo() {
  return (
    <div className='flex h-48 w-full max-w-lg rounded-lg border'>
      <div className='flex-1 overflow-auto p-4'>
        <h4 className='text-sm font-semibold'>Panel 1</h4>
        <p className='text-sm text-muted-foreground'>Left panel</p>
      </div>
      <div className='flex w-px items-center justify-center bg-border'>
        <div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border'>
          <span className='text-[8px]'>⋮</span>
        </div>
      </div>
      <div className='flex-1 overflow-auto p-4'>
        <h4 className='text-sm font-semibold'>Panel 2</h4>
        <p className='text-sm text-muted-foreground'>Right panel</p>
      </div>
    </div>
  );
}

export function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className='inline-flex h-10 items-center justify-center rounded-md border border-input px-4 text-sm hover:bg-accent'
      >
        Delete Account
      </button>
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='fixed inset-0 bg-black/80' onClick={() => setOpen(false)} />
          <div className='relative z-50 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg'>
            <h2 className='text-lg font-semibold'>Are you sure?</h2>
            <p className='mt-2 text-sm text-muted-foreground'>This action cannot be undone.</p>
            <div className='mt-6 flex justify-end gap-2'>
              <button
                className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className='h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground hover:bg-destructive/90'
                onClick={() => setOpen(false)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ToastDemo() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShow(true);
          setTimeout(() => setShow(false), 3000);
        }}
        className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'
      >
        Show Toast
      </button>
      {show && (
        <div className='fixed bottom-4 right-4 z-50 rounded-lg border bg-background p-4 shadow-lg animate-in'>
          <p className='text-sm font-semibold'>Event created</p>
          <p className='text-sm text-muted-foreground'>Your event has been saved.</p>
        </div>
      )}
    </div>
  );
}

export function HoverCardDemo() {
  return (
    <div className='py-8'>
      <div className='group relative inline-block'>
        <a href='#' className='text-sm font-medium underline underline-offset-4'>@adhar-ui</a>
        <div className='absolute z-50 mt-2 w-64 rounded-md border bg-popover p-4 shadow-md hidden group-hover:block'>
          <div className='flex gap-3'>
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm'>
              A
            </span>
            <div>
              <h4 className='text-sm font-semibold'>Adhar UI</h4>
              <p className='text-xs text-muted-foreground mt-1'>
                Framework-agnostic design system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContextMenuDemo() {
  return (
    <div className='flex h-32 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground'>
      Right-click for context menu (demo placeholder)
    </div>
  );
}

export function MenubarDemo() {
  return (
    <div className='flex h-10 items-center space-x-1 rounded-md border bg-background p-1'>
      {['File', 'Edit', 'View', 'Help'].map((m) => (
        <button
          key={m}
          className='flex items-center rounded-sm px-3 py-1.5 text-sm font-medium hover:bg-accent'
        >
          {m}
        </button>
      ))}
    </div>
  );
}

export function NavigationMenuDemo() {
  return (
    <nav className='flex items-center space-x-1'>
      {['Getting Started', 'Components', 'Documentation'].map((l) => (
        <a
          key={l}
          href='#'
          className='inline-flex h-10 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent'
        >
          {l}
        </a>
      ))}
    </nav>
  );
}

export function SidebarDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex h-48 rounded-md border overflow-hidden'>
      <aside
        className={cn('flex flex-col border-r bg-muted/30 transition-all', open ? 'w-48' : 'w-12')}
      >
        <div className='border-b p-2'>
          <button onClick={() => setOpen(!open)} className='rounded p-1 hover:bg-accent'>☰</button>
        </div>
        {open && (
          <div className='flex-1 p-2 space-y-1'>
            {['Dashboard', 'Components', 'Settings'].map((i) => (
              <button
                key={i}
                className='flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-accent'
              >
                {i}
              </button>
            ))}
          </div>
        )}
      </aside>
      <div className='flex-1 p-4 text-sm text-muted-foreground'>Main content</div>
    </div>
  );
}

// ─── Tier 2 Missing ──────────────────────────────────────────────────

export function CommandDemo() {
  const [search, setSearch] = useState('');
  const items = ['Calendar', 'Search', 'Settings', 'Profile', 'Billing'];
  const filtered = items.filter((i) => i.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className='w-64 rounded-md border bg-popover shadow-md'>
      <div className='flex items-center border-b px-3'>
        <span className='mr-2 text-muted-foreground'>🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Type a command...'
          className='flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground'
        />
      </div>
      <div className='p-1'>
        {filtered.length === 0
          ? <p className='py-4 text-center text-sm text-muted-foreground'>No results</p>
          : filtered.map((i) => (
            <div key={i} className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'>
              {i}
            </div>
          ))}
      </div>
    </div>
  );
}

export function DatePickerDemo() {
  return (
    <input
      type='date'
      className='flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    />
  );
}

export function CalendarDemo() {
  return (
    <div className='rounded-md border p-4 w-64'>
      <h4 className='text-sm font-medium text-center mb-3'>April 2026</h4>
      <div className='grid grid-cols-7 gap-1 text-center text-xs'>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className='py-1 text-muted-foreground font-medium'>{d}</div>
        ))}
        {Array.from(
          { length: 30 },
          (_, i) => (
            <button
              key={i}
              className={cn(
                'rounded-md py-1 text-sm hover:bg-accent',
                i + 1 === 5 && 'bg-primary text-primary-foreground',
                i + 1 === new Date().getDate() && 'border',
              )}
            >
              {i + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export function FormDemo() {
  return (
    <form className='max-w-sm space-y-4' onSubmit={(e) => e.preventDefault()}>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Username</label>
        <input
          placeholder='Enter username'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
        />
        <p className='text-sm text-muted-foreground'>This is your public display name.</p>
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Email</label>
        <input
          type='email'
          placeholder='you@example.com'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
        />
      </div>
      <button
        type='submit'
        className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90'
      >
        Submit
      </button>
    </form>
  );
}

export function InputOTPDemo() {
  const [vals, setVals] = useState(['', '', '', '', '', '']);
  return (
    <div className='flex items-center gap-2'>
      {vals.map((v, i) => (
        <input
          key={i}
          maxLength={1}
          value={v}
          onChange={(e) => {
            const n = [...vals];
            n[i] = e.target.value;
            setVals(n);
            if (e.target.value && i < 5) {
              (e.target.nextElementSibling as HTMLInputElement)
                ?.focus();
            }
          }}
          className='flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-center text-sm font-medium focus:ring-2 focus:ring-ring focus:outline-none'
        />
      ))}
    </div>
  );
}

export function CarouselDemo() {
  const [idx, setIdx] = useState(0);
  const items = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];
  return (
    <div className='relative max-w-sm'>
      <div className='overflow-hidden rounded-lg border'>
        <div className='flex h-40 items-center justify-center bg-muted text-lg font-semibold'>
          {items[idx]}
        </div>
      </div>
      <div className='mt-2 flex justify-center gap-1'>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={cn(
              'h-2 w-2 rounded-full',
              i === idx ? 'bg-primary' : 'bg-muted-foreground/30',
            )}
          />
        ))}
      </div>
      <button
        onClick={() => setIdx((idx - 1 + items.length) % items.length)}
        className='absolute left-[-12px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background flex items-center justify-center text-sm'
      >
        ←
      </button>
      <button
        onClick={() => setIdx((idx + 1) % items.length)}
        className='absolute right-[-12px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background flex items-center justify-center text-sm'
      >
        →
      </button>
    </div>
  );
}

export function ChartDemo() {
  const data = [40, 65, 45, 80, 55, 70, 90];
  const max = Math.max(...data);
  return (
    <div className='rounded-lg border bg-card p-6'>
      <h4 className='text-sm font-semibold mb-4'>Weekly Activity</h4>
      <div className='flex items-end gap-2 h-32'>
        {data.map((v, i) => (
          <div key={i} className='flex-1 flex flex-col items-center gap-1'>
            <div
              className='w-full rounded-t-sm bg-primary transition-all'
              style={{ height: `${(v / max) * 100}%` }}
            />
            <span className='text-[10px] text-muted-foreground'>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className='inline-flex h-10 items-center justify-center rounded-md border border-input px-4 text-sm hover:bg-accent'
      >
        Open Drawer
      </button>
      {open && (
        <div className='fixed inset-0 z-50'>
          <div className='fixed inset-0 bg-black/80' onClick={() => setOpen(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-xl border bg-background p-6'>
            <div className='mx-auto mb-4 h-2 w-[100px] rounded-full bg-muted' />
            <h2 className='text-lg font-semibold'>Drawer</h2>
            <p className='mt-2 text-sm text-muted-foreground'>Mobile-friendly bottom sheet.</p>
            <button
              onClick={() => setOpen(false)}
              className='mt-4 inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm hover:bg-accent'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SonnerDemo() {
  return (
    <p className='text-sm text-muted-foreground'>
      Sonner is a toast library. Use{' '}
      <code className='rounded bg-muted px-1.5 py-0.5 text-xs font-mono'>
        toast('Event created')
      </code>{' '}
      to trigger.
    </p>
  );
}

// ─── Tier 3 Enterprise Missing ───────────────────────────────────────

export function DataTableDemo() {
  const rows = [{ name: 'Ken', email: 'ken@example.com', status: 'Active', amount: '$316' }, {
    name: 'Abe',
    email: 'abe@example.com',
    status: 'Inactive',
    amount: '$242',
  }, { name: 'Monty', email: 'monty@example.com', status: 'Active', amount: '$837' }];
  return (
    <div className='rounded-md border'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b'>
            <th className='h-12 px-4 text-left font-medium text-muted-foreground w-8'>
              <input type='checkbox' className='h-4 w-4 accent-primary' />
            </th>
            <th className='h-12 px-4 text-left font-medium text-muted-foreground'>Name</th>
            <th className='h-12 px-4 text-left font-medium text-muted-foreground'>Email</th>
            <th className='h-12 px-4 text-left font-medium text-muted-foreground'>Status</th>
            <th className='h-12 px-4 text-right font-medium text-muted-foreground'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.email} className='border-b hover:bg-muted/50'>
              <td className='p-4'>
                <input type='checkbox' className='h-4 w-4 accent-primary' />
              </td>
              <td className='p-4 font-medium'>{r.name}</td>
              <td className='p-4'>{r.email}</td>
              <td className='p-4'>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-semibold',
                    r.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700',
                  )}
                >
                  {r.status}
                </span>
              </td>
              <td className='p-4 text-right'>{r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FormBuilderDemo() {
  return (
    <form className='max-w-sm space-y-4' onSubmit={(e) => e.preventDefault()}>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Name</label>
        <input className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm' />
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Role</label>
        <select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
          <option>Admin</option>
          <option>User</option>
          <option>Viewer</option>
        </select>
      </div>
      <div className='flex items-center gap-2'>
        <input type='checkbox' className='h-4 w-4 accent-primary' />
        <label className='text-sm'>Active</label>
      </div>
      <button className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'>
        Submit
      </button>
    </form>
  );
}

export function FileUploadDemo() {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center max-w-sm cursor-pointer hover:border-muted-foreground/50'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='40'
        height='40'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        className='mb-4 text-muted-foreground'
      >
        <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
        <polyline points='17 8 12 3 7 8' />
        <line x1='12' x2='12' y1='3' y2='15' />
      </svg>
      <p className='text-sm font-medium'>Drag & drop files here</p>
      <p className='mt-1 text-xs text-muted-foreground'>Max 10MB per file</p>
    </div>
  );
}

export function RichTextEditorDemo() {
  return (
    <div className='rounded-md border max-w-lg'>
      <div className='flex flex-wrap gap-1 border-b p-1'>
        {['B', 'I', 'U', 'H2', '• List', '1. List', '" Quote', '<> Code'].map((b) => (
          <button key={b} className='rounded px-2 py-1 text-sm hover:bg-accent'>{b}</button>
        ))}
      </div>
      <div className='min-h-[120px] p-4 text-sm' contentEditable suppressContentEditableWarning>
        <p>Start writing your content here...</p>
      </div>
    </div>
  );
}

export function KanbanBoardDemo() {
  const cols = [{ title: 'To Do', cards: ['Design homepage', 'Write docs'] }, {
    title: 'In Progress',
    cards: ['Build components'],
  }, { title: 'Done', cards: ['Setup repo', 'Create tokens'] }];
  return (
    <div className='flex gap-4 overflow-x-auto'>
      {cols.map((col) => (
        <div key={col.title} className='w-56 shrink-0 rounded-lg bg-muted/50 p-2'>
          <h3 className='mb-2 px-2 py-1 text-sm font-semibold flex items-center justify-between'>
            {col.title}
            <span className='rounded-full bg-muted px-2 py-0.5 text-xs'>{col.cards.length}</span>
          </h3>
          <div className='space-y-2'>
            {col.cards.map((c) => (
              <div key={c} className='rounded-md border bg-card p-3 text-sm shadow-sm'>{c}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MultiSelectDemo() {
  const [vals, setVals] = useState<string[]>(['react']);
  const opts = ['react', 'vue', 'angular', 'svelte', 'solid'];
  return (
    <div className='max-w-sm'>
      <div className='flex min-h-10 flex-wrap items-center gap-1 rounded-md border px-3 py-2 text-sm'>
        {vals.map((v) => (
          <span
            key={v}
            className='inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold'
          >
            {v}
            <button
              onClick={() => setVals(vals.filter((x) => x !== v))}
              className='hover:text-destructive'
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className='mt-2 flex flex-wrap gap-1'>
        {opts.filter((o) => !vals.includes(o)).map((o) => (
          <button
            key={o}
            onClick={() => setVals([...vals, o])}
            className='rounded-full border px-2 py-0.5 text-xs hover:bg-accent'
          >
            + {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TransferListDemo() {
  return (
    <div className='flex items-center gap-2 max-w-md'>
      <div className='flex-1 rounded-md border'>
        <div className='border-b p-2 text-sm font-medium'>Available</div>
        <div className='p-1'>
          {['Item A', 'Item B', 'Item C'].map((i) => (
            <label
              key={i}
              className='flex items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-accent'
            >
              <input type='checkbox' className='h-3 w-3 accent-primary' />
              {i}
            </label>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <button className='h-8 w-8 rounded-md border text-sm hover:bg-accent'>→</button>
        <button className='h-8 w-8 rounded-md border text-sm hover:bg-accent'>←</button>
      </div>
      <div className='flex-1 rounded-md border'>
        <div className='border-b p-2 text-sm font-medium'>Selected</div>
        <div className='p-1'>
          <label className='flex items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-accent'>
            <input type='checkbox' className='h-3 w-3 accent-primary' />Item D
          </label>
        </div>
      </div>
    </div>
  );
}

export function ModelSelectorDemo() {
  return (
    <select className='flex h-9 w-full max-w-[250px] rounded-md border border-input bg-background px-3 text-sm'>
      <option>Claude 4.6 Opus (Anthropic)</option>
      <option>Claude 4.6 Sonnet (Anthropic)</option>
      <option>GPT-4.1 (OpenAI)</option>
      <option>Gemini 2.5 Pro (Google)</option>
    </select>
  );
}

// ─── New Data View Components ────────────────────────────────────────

export function ListViewDemo() {
  const items = [
    'Project Alpha',
    'Project Beta',
    'Project Gamma',
    'Project Delta',
    'Project Epsilon',
  ];
  const [selected, setSelected] = useState('');
  return (
    <div className='max-w-sm rounded-md border'>
      <div className='border-b p-2'>
        <input
          placeholder='Search...'
          className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm'
        />
      </div>
      <div>
        {items.map((i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={cn(
              'border-b px-4 py-3 cursor-pointer text-sm hover:bg-accent',
              selected === i && 'bg-accent',
            )}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GridViewDemo() {
  return (
    <div className='grid gap-3 grid-cols-2 sm:grid-cols-3 max-w-md'>
      {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map((n) => (
        <div key={n} className='rounded-lg border bg-card p-4 text-center'>
          <div className='mx-auto mb-2 h-10 w-10 rounded-full bg-muted' />
          <p className='text-sm font-medium'>{n}</p>
        </div>
      ))}
    </div>
  );
}

export function DetailViewDemo() {
  return (
    <div className='max-w-md space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Project Alpha</h2>
        <span className='rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700'>
          Active
        </span>
      </div>
      <div className='rounded-lg border'>
        <div className='grid grid-cols-2 gap-px bg-border'>
          {[
            ['Name', 'Project Alpha'],
            ['Status', 'Active'],
            ['Owner', 'John Doe'],
            ['Created', 'Jan 15, 2026'],
            ['Budget', '$50,000'],
            ['Priority', 'High'],
          ].map(([l, v]) => (
            <div key={l} className='bg-card px-4 py-3'>
              <dt className='text-xs font-medium text-muted-foreground'>{l}</dt>
              <dd className='mt-1 text-sm'>{v}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MasterDetailDemo() {
  const [sel, setSel] = useState('Alpha');
  return (
    <div className='flex h-56 rounded-md border overflow-hidden max-w-lg'>
      <div className='w-48 border-r overflow-auto'>
        {['Alpha', 'Beta', 'Gamma', 'Delta'].map((i) => (
          <div
            key={i}
            onClick={() => setSel(i)}
            className={cn(
              'border-b px-4 py-3 cursor-pointer text-sm hover:bg-accent',
              sel === i && 'bg-accent font-medium',
            )}
          >
            {i}
          </div>
        ))}
      </div>
      <div className='flex-1 p-4'>
        <h3 className='text-sm font-semibold'>{sel}</h3>
        <p className='mt-2 text-sm text-muted-foreground'>Detail view for {sel}</p>
      </div>
    </div>
  );
}

export function DataGridDemo() {
  return (
    <div className='rounded-md border overflow-auto max-w-lg'>
      <table className='w-full text-sm'>
        <thead className='bg-muted/50'>
          <tr>
            {['ID', 'Name', 'Email', 'Role'].map((h) => (
              <th
                key={h}
                className='h-10 px-3 text-left text-xs font-medium text-muted-foreground cursor-pointer hover:bg-muted'
              >
                {h} ↕
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[['1', 'Alice', 'alice@co.com', 'Admin'], ['2', 'Bob', 'bob@co.com', 'User'], [
            '3',
            'Carol',
            'carol@co.com',
            'Editor',
          ]].map((r) => (
            <tr key={r[0]} className='border-t hover:bg-muted/30'>
              {r.map((c, i) => <td key={i} className='px-3 py-2'>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PropertyListDemo() {
  return (
    <div className='divide-y rounded-lg border max-w-sm'>
      {[['Name', 'Adhar UI'], ['Version', '0.1.0'], ['License', 'Apache 2.0'], [
        'Runtime',
        'Deno 2.6+',
      ], ['Components', '91']].map(([k, v]) => (
        <div key={k} className='flex items-center justify-between px-4 py-3'>
          <dt className='text-sm font-medium text-muted-foreground'>{k}</dt>
          <dd className='text-sm'>{v}</dd>
        </div>
      ))}
    </div>
  );
}

export function DescriptionListDemo() {
  return (
    <dl className='grid gap-3 sm:grid-cols-[auto_1fr] max-w-sm'>
      {[['Full Name', 'John Doe'], ['Email', 'john@example.com'], ['Role', 'Administrator'], [
        'Joined',
        'January 2025',
      ]].map(([t, d]) => (
        <React.Fragment key={t}>
          <dt className='text-sm font-medium text-muted-foreground'>{t}</dt>
          <dd className='text-sm'>{d}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

export function SortableListDemo() {
  const [items, setItems] = useState(['First item', 'Second item', 'Third item', 'Fourth item']);
  return (
    <div className='max-w-sm space-y-1'>
      {items.map((item, i) => (
        <div key={item} className='flex items-center gap-2 rounded-md border bg-card p-3 text-sm'>
          <span className='text-muted-foreground cursor-grab'>⋮⋮</span>
          <span className='flex-1'>{item}</span>
          <span className='text-xs text-muted-foreground'>#{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

export function InfiniteScrollDemo() {
  const [count, setCount] = useState(5);
  return (
    <div className='max-w-sm'>
      <div className='space-y-2'>
        {Array.from(
          { length: count },
          (_, i) => <div key={i} className='rounded-md border p-3 text-sm'>Item {i + 1}</div>,
        )}
      </div>
      {count < 15 && (
        <button
          onClick={() => setCount((c) => c + 5)}
          className='mt-3 w-full rounded-md border py-2 text-sm hover:bg-accent'
        >
          Load more...
        </button>
      )}
    </div>
  );
}

export function VirtualizedListDemo() {
  return (
    <div className='h-48 w-64 overflow-auto rounded-md border'>
      {Array.from(
        { length: 100 },
        (_, i) => <div key={i} className='border-b px-4 py-2 text-sm'>Row {i + 1}</div>,
      )}
    </div>
  );
}

export function CommandBarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className='inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent'
      >
        ⌘K <kbd className='rounded border bg-muted px-1 text-[10px]'>Cmd+K</kbd>
      </button>
      {open && (
        <div className='mt-2 w-64 rounded-md border bg-popover shadow-md'>
          <div className='flex items-center border-b px-3'>
            <span className='mr-2 text-muted-foreground'>🔍</span>
            <input
              placeholder='Search...'
              className='h-10 w-full bg-transparent text-sm outline-none'
              autoFocus
            />
          </div>
          <div className='p-1'>
            {['Open file', 'Run command', 'Search docs'].map((i) => (
              <div
                key={i}
                className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function NotificationCenterDemo() {
  return (
    <div className='w-72 rounded-lg border bg-popover shadow-md'>
      <div className='flex items-center justify-between border-b px-4 py-3'>
        <div className='flex items-center gap-2'>
          <h4 className='text-sm font-semibold'>Notifications</h4>
          <span className='inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground'>
            3
          </span>
        </div>
        <button className='text-xs text-muted-foreground hover:text-foreground'>
          Mark all read
        </button>
      </div>
      <div className='divide-y'>
        {[{ t: 'New comment', d: 'Alice commented on your PR', time: '5m ago', unread: true }, {
          t: 'Build passed',
          d: 'CI pipeline completed',
          time: '1h ago',
          unread: true,
        }, { t: 'New follower', d: 'Bob started following you', time: '3h ago', unread: false }]
          .map((n) => (
            <div key={n.t} className={cn('px-4 py-3', n.unread && 'bg-accent/50')}>
              <p className={cn('text-sm', n.unread && 'font-medium')}>{n.t}</p>
              <p className='text-xs text-muted-foreground'>{n.d}</p>
              <p className='mt-0.5 text-xs text-muted-foreground'>{n.time}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export function TagInputDemo() {
  const [tags, setTags] = useState(['react', 'tailwind']);
  const [input, setInput] = useState('');
  return (
    <div className='max-w-sm'>
      <div className='flex flex-wrap items-center gap-1.5 rounded-md border px-3 py-2'>
        {tags.map((t) => (
          <span
            key={t}
            className='inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium'
          >
            {t}
            <button
              onClick={() => setTags(tags.filter((x) => x !== t))}
              className='hover:text-destructive'
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              setTags([...tags, input.trim()]);
              setInput('');
            }
          }}
          placeholder='Add tag...'
          className='flex-1 min-w-[60px] bg-transparent outline-none text-sm placeholder:text-muted-foreground'
        />
      </div>
    </div>
  );
}

// ─── Blocks ──────────────────────────────────────────────────────────

export function BlockLoginDemo() {
  return (
    <div className='max-w-xs mx-auto space-y-4'>
      <h3 className='text-lg font-bold text-center'>Welcome back</h3>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <label className='text-xs font-medium'>Email</label>
          <input
            placeholder='you@example.com'
            className='flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm'
          />
        </div>
        <div className='space-y-1'>
          <label className='text-xs font-medium'>Password</label>
          <input
            type='password'
            placeholder='••••••••'
            className='flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm'
          />
        </div>
        <button className='h-9 w-full rounded-md bg-primary text-sm text-primary-foreground hover:bg-primary/90'>
          Sign in
        </button>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs'>
          <span className='bg-background px-2 text-muted-foreground'>Or</span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <button className='h-9 rounded-md border text-xs hover:bg-accent'>Google</button>
        <button className='h-9 rounded-md border text-xs hover:bg-accent'>GitHub</button>
      </div>
    </div>
  );
}

export function BlockDashboardDemo() {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-3 gap-3'>
        {[{ t: 'Revenue', v: '$45K', c: '+20%' }, { t: 'Users', v: '2.3K', c: '+12%' }, {
          t: 'Orders',
          v: '384',
          c: '+8%',
        }].map((s) => (
          <div key={s.t} className='rounded-lg border p-3'>
            <p className='text-xs text-muted-foreground'>{s.t}</p>
            <p className='text-lg font-bold'>{s.v}</p>
            <p className='text-xs text-green-600'>↑ {s.c}</p>
          </div>
        ))}
      </div>
      <div className='rounded-lg border p-4'>
        <h4 className='text-xs font-semibold mb-2'>Weekly</h4>
        <div className='flex items-end gap-1 h-16'>
          {[40, 65, 45, 80, 55, 70, 90].map((v, i) => (
            <div key={i} className='flex-1 rounded-t-sm bg-primary' style={{ height: `${v}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlockHeroDemo() {
  return (
    <div className='text-center py-8'>
      <span className='rounded-full border px-3 py-1 text-xs font-medium'>New Release</span>
      <h1 className='mt-4 text-2xl font-bold tracking-tight'>Build faster with Adhar UI</h1>
      <p className='mt-2 text-sm text-muted-foreground'>Framework-agnostic components you own.</p>
      <div className='mt-4 flex justify-center gap-2'>
        <button className='h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground'>
          Get Started
        </button>
        <button className='h-9 rounded-md border px-4 text-sm hover:bg-accent'>Learn More</button>
      </div>
    </div>
  );
}

export function BlockPricingDemo() {
  return (
    <div className='grid grid-cols-3 gap-3 max-w-lg'>
      {[{ n: 'Free', p: '$0', f: ['5 projects', 'Basic support'] }, {
        n: 'Pro',
        p: '$19',
        f: ['Unlimited projects', 'Priority support'],
        pop: true,
      }, { n: 'Enterprise', p: '$99', f: ['Custom deployment', 'Dedicated support'] }].map((pl) => (
        <div
          key={pl.n}
          className={cn('rounded-lg border p-4', pl.pop && 'border-primary ring-1 ring-primary')}
        >
          {pl.pop && (
            <span className='block text-center text-xs font-semibold text-primary mb-2'>
              Popular
            </span>
          )}
          <h3 className='text-sm font-semibold'>{pl.n}</h3>
          <p className='text-2xl font-bold mt-1'>
            {pl.p}
            <span className='text-xs text-muted-foreground'>/mo</span>
          </p>
          <ul className='mt-3 space-y-1'>
            {pl.f.map((f) => <li key={f} className='text-xs text-muted-foreground'>✓ {f}</li>)}
          </ul>
          <button
            className={cn(
              'mt-3 h-8 w-full rounded-md text-xs',
              pl.pop ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent',
            )}
          >
            Choose
          </button>
        </div>
      ))}
    </div>
  );
}

export function BlockSettingsDemo() {
  const [tab, setTab] = useState('profile');
  return (
    <div className='max-w-md space-y-3'>
      <div className='flex gap-1 border-b'>
        {['profile', 'account', 'notifications'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium border-b-2 -mb-px',
              tab === t
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground',
            )}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className='space-y-3'>
        {tab === 'profile' && (
          <>
            <div className='flex items-center gap-3'>
              <div className='h-10 w-10 rounded-full bg-muted' />
              <button className='text-xs text-primary'>Change avatar</button>
            </div>
            <div className='space-y-1'>
              <label className='text-xs font-medium'>Name</label>
              <input
                defaultValue='John Doe'
                className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm'
              />
            </div>
          </>
        )}
        {tab === 'account' && (
          <div className='space-y-2'>
            <div className='space-y-1'>
              <label className='text-xs font-medium'>Current password</label>
              <input
                type='password'
                className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm'
              />
            </div>
            <div className='space-y-1'>
              <label className='text-xs font-medium'>New password</label>
              <input
                type='password'
                className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm'
              />
            </div>
          </div>
        )}
        {tab === 'notifications' && (
          <div className='space-y-2'>
            {['Email notifications', 'Push notifications', 'SMS alerts'].map((n) => (
              <div key={n} className='flex items-center justify-between py-1'>
                <span className='text-sm'>{n}</span>
                <div className='h-5 w-9 rounded-full bg-primary cursor-pointer'>
                  <div className='ml-4 h-4 w-4 translate-y-0.5 rounded-full bg-white shadow' />
                </div>
              </div>
            ))}
          </div>
        )}
        <button className='h-8 rounded-md bg-primary px-4 text-xs text-primary-foreground'>
          Save
        </button>
      </div>
    </div>
  );
}

export function BlockErrorDemo() {
  return (
    <div className='text-center py-8'>
      <p className='text-5xl font-bold text-muted-foreground/20'>404</p>
      <h2 className='mt-2 text-lg font-bold'>Page not found</h2>
      <p className='mt-1 text-sm text-muted-foreground'>
        The page you're looking for doesn't exist.
      </p>
      <button className='mt-4 h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'>
        Go home
      </button>
    </div>
  );
}

export function BlockChatPageDemo() {
  return (
    <div className='flex h-56 rounded-md border overflow-hidden max-w-lg'>
      <div className='w-40 border-r bg-muted/30 p-2 space-y-1'>
        <button className='w-full rounded-md bg-accent px-2 py-1.5 text-xs text-left font-medium'>
          New chat
        </button>
        {['Design review', 'Bug report'].map((c) => (
          <button
            key={c}
            className='w-full rounded-md px-2 py-1.5 text-xs text-left hover:bg-accent truncate'
          >
            {c}
          </button>
        ))}
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='flex-1 overflow-auto p-3 space-y-2'>
          <div className='flex gap-2'>
            <div className='h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]'>
              AI
            </div>
            <div className='rounded-lg bg-muted px-3 py-1.5 text-xs max-w-[80%]'>
              How can I help?
            </div>
          </div>
          <div className='flex gap-2 justify-end'>
            <div className='rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs max-w-[80%]'>
              Show me the button API
            </div>
          </div>
        </div>
        <div className='border-t p-2'>
          <div className='flex gap-1'>
            <input
              placeholder='Message...'
              className='flex-1 h-7 rounded-md border bg-background px-2 text-xs'
            />
            <button className='h-7 rounded-md bg-primary px-2 text-xs text-primary-foreground'>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlockProductDemo() {
  return (
    <div className='grid grid-cols-3 gap-3 max-w-md'>
      {[{ n: 'Headphones', p: '$99' }, { n: 'Keyboard', p: '$149' }, { n: 'Mouse', p: '$79' }].map(
        (prod) => (
          <div key={prod.n} className='rounded-lg border overflow-hidden'>
            <div className='aspect-square bg-muted flex items-center justify-center text-xs text-muted-foreground'>
              Image
            </div>
            <div className='p-3'>
              <p className='text-xs font-semibold'>{prod.n}</p>
              <p className='text-sm font-bold mt-0.5'>{prod.p}</p>
              <button className='mt-2 h-7 w-full rounded-md bg-primary text-[11px] text-primary-foreground'>
                Add to cart
              </button>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
