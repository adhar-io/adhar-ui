import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

export const DataTableStory: StoryObj = {
  name: 'Data Table',
  render: () => {
    const [s, ss] = useState('');
    const rows = [{ n: 'Ken', e: 'ken@co.com', st: 'Active', a: '$316' }, {
      n: 'Abe',
      e: 'abe@co.com',
      st: 'Inactive',
      a: '$242',
    }, { n: 'Monty', e: 'monty@co.com', st: 'Active', a: '$837' }];
    const f = rows.filter((r) => r.n.toLowerCase().includes(s.toLowerCase()));
    return (
      <div className='space-y-3'>
        <input
          value={s}
          onChange={(e) => ss(e.target.value)}
          placeholder='Filter...'
          className='max-w-sm h-9 rounded-md border px-3 text-sm'
        />
        <div className='rounded-md border'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='h-10 px-4 text-left text-muted-foreground w-8'>
                  <input type='checkbox' className='h-4 w-4 accent-primary' />
                </th>
                <th className='h-10 px-4 text-left text-muted-foreground'>Name</th>
                <th className='h-10 px-4 text-left text-muted-foreground'>Email</th>
                <th className='h-10 px-4 text-left text-muted-foreground'>Status</th>
                <th className='h-10 px-4 text-right text-muted-foreground'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {f.map((r) => (
                <tr key={r.e} className='border-b hover:bg-muted/50'>
                  <td className='p-4'>
                    <input type='checkbox' className='h-4 w-4 accent-primary' />
                  </td>
                  <td className='p-4 font-medium'>{r.n}</td>
                  <td className='p-4'>{r.e}</td>
                  <td className='p-4'>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        r.st === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700',
                      )}
                    >
                      {r.st}
                    </span>
                  </td>
                  <td className='p-4 text-right'>{r.a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-end gap-1'>
          <button className='h-8 px-3 rounded-md border text-xs' disabled>Prev</button>
          <button className='h-8 px-3 rounded-md border text-xs'>Next</button>
        </div>
      </div>
    );
  },
};

export const DataGridStory: StoryObj = {
  name: 'Data Grid',
  render: () => (
    <div className='rounded-md border overflow-auto'>
      <table className='w-full text-sm'>
        <thead className='bg-muted/50'>
          <tr>
            {['ID', 'Name', 'Email', 'Dept'].map((h) => (
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
          {[['1', 'Alice', 'alice@co.com', 'Eng'], ['2', 'Bob', 'bob@co.com', 'Design'], [
            '3',
            'Carol',
            'carol@co.com',
            'Product',
          ]].map((r) => (
            <tr key={r[0]} className='border-t hover:bg-muted/30'>
              {r.map((c, i) => <td key={i} className='px-3 py-2'>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const ListViewStory: StoryObj = {
  name: 'List View',
  render: () => {
    const [sel, setSel] = useState('');
    return (
      <div className='max-w-sm rounded-md border'>
        <div className='border-b p-2'>
          <input placeholder='Search...' className='h-8 w-full rounded-md border px-2 text-sm' />
        </div>
        {['Project Alpha', 'Project Beta', 'Project Gamma'].map((i) => (
          <div
            key={i}
            onClick={() => setSel(i)}
            className={cn(
              'border-b px-4 py-3 text-sm cursor-pointer hover:bg-accent',
              sel === i && 'bg-accent font-medium',
            )}
          >
            {i}
          </div>
        ))}
      </div>
    );
  },
};

export const GridViewStory: StoryObj = {
  name: 'Grid View',
  render: () => (
    <div className='grid gap-3 grid-cols-3 max-w-md'>
      {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map((n) => (
        <div key={n} className='rounded-lg border p-4 text-center hover:shadow-md cursor-pointer'>
          <div className='mx-auto mb-2 h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold text-muted-foreground'>
            {n[0]}
          </div>
          <p className='text-sm font-medium'>{n}</p>
        </div>
      ))}
    </div>
  ),
};

export const DetailViewStory: StoryObj = {
  name: 'Detail View',
  render: () => (
    <div className='max-w-md'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>Project Alpha</h2>
        <span className='rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold'>
          Active
        </span>
      </div>
      <div className='rounded-lg border'>
        <div className='grid grid-cols-2 gap-px bg-border'>
          {[['Owner', 'John Doe'], ['Budget', '$50,000'], ['Priority', 'High'], ['Sprint', '14']]
            .map(([l, v]) => (
              <div key={l} className='bg-card px-4 py-3'>
                <dt className='text-xs text-muted-foreground'>{l}</dt>
                <dd className='mt-1 text-sm font-medium'>{v}</dd>
              </div>
            ))}
        </div>
      </div>
    </div>
  ),
};

export const MasterDetailStory: StoryObj = {
  name: 'Master Detail',
  render: () => {
    const [sel, setSel] = useState('Alpha');
    return (
      <div className='flex h-48 rounded-md border overflow-hidden'>
        <div className='w-40 border-r'>
          {['Alpha', 'Beta', 'Gamma'].map((i) => (
            <div
              key={i}
              onClick={() => setSel(i)}
              className={cn(
                'border-b px-4 py-3 text-sm cursor-pointer hover:bg-accent',
                sel === i && 'bg-accent font-medium',
              )}
            >
              {i}
            </div>
          ))}
        </div>
        <div className='flex-1 p-4'>
          <h3 className='text-sm font-semibold'>{sel}</h3>
          <p className='mt-2 text-sm text-muted-foreground'>Details for {sel}</p>
        </div>
      </div>
    );
  },
};

export const FormBuilderStory: StoryObj = {
  name: 'Form Builder',
  render: () => (
    <form className='max-w-sm space-y-3' onSubmit={(e) => e.preventDefault()}>
      <p className='text-xs text-muted-foreground'>Schema-driven form</p>
      <div className='space-y-1'>
        <label className='text-sm font-medium'>Name *</label>
        <input className='h-10 w-full rounded-md border px-3 text-sm' />
      </div>
      <div className='space-y-1'>
        <label className='text-sm font-medium'>Role</label>
        <select className='h-10 w-full rounded-md border px-3 text-sm'>
          <option>Admin</option>
          <option>User</option>
        </select>
      </div>
      <button className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground'>
        Create
      </button>
    </form>
  ),
};

export const FileUploadStory: StoryObj = {
  name: 'File Upload',
  render: () => (
    <div className='flex flex-col items-center rounded-lg border-2 border-dashed p-8 text-center max-w-sm cursor-pointer hover:border-muted-foreground/50'>
      <p className='text-sm font-medium'>Drag & drop files</p>
      <p className='text-xs text-muted-foreground mt-1'>Max 10MB</p>
    </div>
  ),
};

export const RichTextEditorStory: StoryObj = {
  name: 'Rich Text Editor',
  render: () => (
    <div className='rounded-md border max-w-md'>
      <div className='flex gap-1 border-b p-1'>
        {['B', 'I', 'U', 'H2', '•', '1.', '"', '<>'].map((b) => (
          <button key={b} className='rounded px-2 py-1 text-sm hover:bg-accent'>{b}</button>
        ))}
      </div>
      <div className='min-h-[100px] p-4 text-sm' contentEditable suppressContentEditableWarning>
        <p>Start writing...</p>
      </div>
    </div>
  ),
};

export const KanbanBoardStory: StoryObj = {
  name: 'Kanban Board',
  render: () => (
    <div className='flex gap-3 overflow-x-auto'>
      {[
        { t: 'To Do', c: ['Design', 'Write docs'] },
        { t: 'In Progress', c: ['Build components'] },
        { t: 'Done', c: ['Setup repo'] },
      ].map((col) => (
        <div key={col.t} className='w-44 shrink-0 rounded-lg bg-muted/50 p-2'>
          <h3 className='mb-2 px-2 text-xs font-semibold'>
            {col.t} <span className='text-muted-foreground'>({col.c.length})</span>
          </h3>
          <div className='space-y-2'>
            {col.c.map((c) => (
              <div key={c} className='rounded-md border bg-card p-2 text-xs shadow-sm'>{c}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TimelineStory: StoryObj = {
  name: 'Timeline',
  render: () => (
    <ol className='relative border-l border-muted-foreground/20 ml-3'>
      {[{ t: 'Submitted', c: 'bg-green-500' }, { t: 'Review', c: 'bg-blue-500' }, {
        t: 'Pending',
        c: 'bg-muted-foreground',
      }].map((e, i) => (
        <li key={i} className='mb-6 ml-6'>
          <div
            className={cn(
              'absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-background',
              e.c,
            )}
          />
          <h3 className='text-sm font-semibold'>{e.t}</h3>
        </li>
      ))}
    </ol>
  ),
};

export const TreeViewStory: StoryObj = {
  name: 'Tree View',
  render: () => {
    const [exp, setExp] = useState(new Set(['src']));
    const toggle = (id: string) => {
      const n = new Set(exp);
      n.has(id) ? n.delete(id) : n.add(id);
      setExp(n);
    };
    return (
      <div className='max-w-xs rounded-md border p-2'>
        {[{
          id: 'src',
          l: 'src',
          ch: [{ id: 'components', l: 'components', ch: [{ id: 'button', l: 'button.tsx' }] }, {
            id: 'app',
            l: 'app.tsx',
          }],
        }, { id: 'pkg', l: 'package.json' }].map(function render(n: any, lvl = 0): React.ReactNode {
          return (
            <div key={n.id}>
              <button
                onClick={() => n.ch && toggle(n.id)}
                className='flex w-full items-center gap-1.5 rounded-sm px-2 py-1 text-sm hover:bg-accent'
                style={{ paddingLeft: lvl * 16 + 8 }}
              >
                {n.ch
                  ? (
                    <span
                      className={cn('text-xs transition-transform', exp.has(n.id) && 'rotate-90')}
                    >
                      ▶
                    </span>
                  )
                  : <span className='w-3' />}
                {n.l}
              </button>
              {n.ch && exp.has(n.id) && n.ch.map((c: any) => render(c, lvl + 1))}
            </div>
          );
        })}
      </div>
    );
  },
};

export const StepperStory: StoryObj = {
  name: 'Stepper',
  render: () => {
    const [s, ss] = useState(1);
    return (
      <div className='flex items-center gap-2 max-w-sm'>
        {['Account', 'Profile', 'Review'].map((label, i) => (
          <React.Fragment key={label}>
            <div className='flex items-center gap-1.5'>
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-medium',
                  i < s
                    ? 'border-primary bg-primary text-primary-foreground'
                    : i === s
                    ? 'border-primary text-primary'
                    : 'border-muted-foreground/30 text-muted-foreground',
                )}
              >
                {i < s ? '✓' : i + 1}
              </div>
              <span className={cn('text-xs', i <= s ? 'font-medium' : 'text-muted-foreground')}>
                {label}
              </span>
            </div>
            {i < 2 && <div className={cn('h-0.5 flex-1', i < s ? 'bg-primary' : 'bg-muted')} />}
          </React.Fragment>
        ))}
      </div>
    );
  },
};

export const MultiSelectStory: StoryObj = {
  name: 'Multi Select',
  render: () => {
    const [v, sv] = useState(['react']);
    const opts = ['react', 'vue', 'angular', 'svelte', 'solid'];
    return (
      <div className='max-w-sm'>
        <div className='flex flex-wrap items-center gap-1 rounded-md border px-3 py-2'>
          {v.map((x) => (
            <span
              key={x}
              className='inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs'
            >
              {x}
              <button onClick={() => sv(v.filter((y) => y !== x))}>×</button>
            </span>
          ))}
        </div>
        <div className='mt-2 flex flex-wrap gap-1'>
          {opts.filter((o) => !v.includes(o)).map((o) => (
            <button
              key={o}
              onClick={() => sv([...v, o])}
              className='rounded-full border px-2 py-0.5 text-xs hover:bg-accent'
            >
              + {o}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

export const TagInputStory: StoryObj = {
  name: 'Tag Input',
  render: () => {
    const [tags, setTags] = useState(['react', 'tailwind']);
    const [inp, setInp] = useState('');
    return (
      <div className='max-w-sm'>
        <div className='flex flex-wrap items-center gap-1 rounded-md border px-3 py-2'>
          {tags.map((t) => (
            <span
              key={t}
              className='inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs'
            >
              {t}
              <button onClick={() => setTags(tags.filter((x) => x !== t))}>×</button>
            </span>
          ))}
          <input
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inp.trim()) {
                setTags([...tags, inp.trim()]);
                setInp('');
              }
            }}
            placeholder='Add...'
            className='flex-1 min-w-[60px] bg-transparent outline-none text-sm'
          />
        </div>
      </div>
    );
  },
};

export const TransferListStory: StoryObj = {
  name: 'Transfer List',
  render: () => (
    <div className='flex items-center gap-2 max-w-md'>
      <div className='flex-1 rounded-md border'>
        <div className='border-b p-2 text-sm font-medium'>Available</div>
        <div className='p-1'>
          {['Item A', 'Item B', 'Item C'].map((i) => (
            <label key={i} className='flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent'>
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
          <label className='flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent'>
            <input type='checkbox' className='h-3 w-3 accent-primary' />Item D
          </label>
        </div>
      </div>
    </div>
  ),
};

export const SortableListStory: StoryObj = {
  name: 'Sortable List',
  render: () => (
    <div className='max-w-sm space-y-1'>
      {['First', 'Second', 'Third', 'Fourth'].map((item, i) => (
        <div
          key={item}
          className='flex items-center gap-2 rounded-md border bg-card p-3 text-sm cursor-grab'
        >
          <span className='text-muted-foreground'>⋮⋮</span>
          <span className='flex-1'>{item}</span>
          <span className='text-xs text-muted-foreground rounded-full bg-muted px-2 py-0.5'>
            #{i + 1}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const PropertyListStory: StoryObj = {
  name: 'Property List',
  render: () => (
    <div className='divide-y rounded-lg border max-w-sm'>
      {[['Name', 'Adhar UI'], ['Version', '0.1.0'], ['License', 'Apache 2.0']].map(([k, v]) => (
        <div key={k} className='flex justify-between px-4 py-3'>
          <dt className='text-sm text-muted-foreground'>{k}</dt>
          <dd className='text-sm font-medium'>{v}</dd>
        </div>
      ))}
    </div>
  ),
};

export const DescriptionListStory: StoryObj = {
  name: 'Description List',
  render: () => (
    <dl className='grid gap-3 sm:grid-cols-[auto_1fr] max-w-sm'>
      {[['Name', 'John Doe'], ['Email', 'john@co.com'], ['Role', 'Admin']].map(([t, d]) => (
        <React.Fragment key={t}>
          <dt className='text-sm font-medium text-muted-foreground'>{t}</dt>
          <dd className='text-sm'>{d}</dd>
        </React.Fragment>
      ))}
    </dl>
  ),
};

export const EmptyStateStory: StoryObj = {
  name: 'Empty State',
  render: () => (
    <div className='flex flex-col items-center rounded-lg border border-dashed p-8 text-center'>
      <h3 className='text-lg font-semibold'>No items</h3>
      <p className='mt-2 text-sm text-muted-foreground'>Get started by creating your first item.</p>
      <button className='mt-4 h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground'>
        Create
      </button>
    </div>
  ),
};

export const StatCardStory: StoryObj = {
  name: 'Stat Card',
  render: () => (
    <div className='grid gap-4 grid-cols-3 max-w-xl'>
      {[{ t: 'Revenue', v: '$45K', c: '+20%', up: true }, {
        t: 'Users',
        v: '2.3K',
        c: '+12%',
        up: true,
      }, { t: 'Bounce', v: '24%', c: '-4%', up: false }].map((s) => (
        <div key={s.t} className='rounded-lg border p-4'>
          <p className='text-sm text-muted-foreground'>{s.t}</p>
          <p className='text-2xl font-bold mt-1'>{s.v}</p>
          <p className={cn('text-xs font-medium', s.up ? 'text-green-600' : 'text-red-600')}>
            {s.up ? '↑' : '↓'} {s.c}
          </p>
        </div>
      ))}
    </div>
  ),
};

export const KbdStory: StoryObj = {
  name: 'Kbd',
  render: () => (
    <div className='space-y-2'>
      {[['⌘', 'K', 'Command palette'], ['Ctrl', 'S', 'Save'], ['Esc', '', 'Close']].map((
        [a, b, l],
      ) => (
        <div key={l} className='flex items-center gap-2'>
          <kbd className='h-5 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground'>
            {a}
          </kbd>
          {b && (
            <kbd className='h-5 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground'>
              {b}
            </kbd>
          )}
          <span className='text-sm text-muted-foreground'>{l}</span>
        </div>
      ))}
    </div>
  ),
};

export const CopyButtonStory: StoryObj = {
  name: 'Copy Button',
  render: () => {
    const [c, sc] = useState(false);
    return (
      <div className='flex items-center gap-2'>
        <code className='rounded bg-muted px-2 py-1 text-sm font-mono'>adhar-ui add button</code>
        <button
          onClick={() => {
            navigator.clipboard?.writeText('adhar-ui add button');
            sc(true);
            setTimeout(() => sc(false), 2000);
          }}
          className='rounded-md p-2 hover:bg-accent'
        >
          {c ? <span className='text-green-500 text-sm'>✓</span> : '📋'}
        </button>
      </div>
    );
  },
};

export const CommandBarStory: StoryObj = {
  name: 'Command Bar',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div>
        <button
          onClick={() => so(!o)}
          className='inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent'
        >
          ⌘K Search
        </button>
        {o && (
          <div className='mt-2 w-64 rounded-md border bg-popover shadow-md p-1'>
            <input
              placeholder='Command...'
              className='h-9 w-full bg-transparent px-2 text-sm outline-none'
              autoFocus
            />
            {['Open file', 'Run command', 'Search'].map((i) => (
              <div
                key={i}
                className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
                onClick={() => so(false)}
              >
                {i}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const NotificationCenterStory: StoryObj = {
  name: 'Notification Center',
  render: () => (
    <div className='w-72 rounded-lg border shadow-md'>
      <div className='flex items-center justify-between border-b px-4 py-3'>
        <h4 className='text-sm font-semibold'>Notifications</h4>
        <span className='rounded-full bg-primary px-1.5 text-xs text-primary-foreground'>3</span>
      </div>
      <div className='divide-y'>
        {[{ t: 'New comment', d: '5m ago', u: true }, { t: 'Build passed', d: '1h ago', u: true }, {
          t: 'Mention',
          d: '3h ago',
          u: false,
        }].map((n) => (
          <div key={n.t} className={cn('px-4 py-3', n.u && 'bg-accent/40')}>
            <p className={cn('text-sm', n.u && 'font-medium')}>{n.t}</p>
            <p className='text-xs text-muted-foreground'>{n.d}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const InfiniteScrollStory: StoryObj = {
  name: 'Infinite Scroll',
  render: () => {
    const [c, sc] = useState(5);
    return (
      <div className='max-w-xs space-y-2'>
        {Array.from(
          { length: c },
          (_, i) => <div key={i} className='rounded-md border p-3 text-sm'>Item {i + 1}</div>,
        )}
        {c < 15 && (
          <button
            onClick={() => sc(c + 5)}
            className='w-full rounded-md border py-2 text-sm hover:bg-accent'
          >
            Load more
          </button>
        )}
      </div>
    );
  },
};

export const VirtualizedListStory: StoryObj = {
  name: 'Virtualized List',
  render: () => (
    <div className='h-48 w-56 overflow-auto rounded-md border'>
      {Array.from(
        { length: 100 },
        (_, i) => <div key={i} className='border-b px-4 py-2 text-sm'>Row {i + 1}</div>,
      )}
    </div>
  ),
};

const meta: Meta = { title: 'Components/Enterprise' };
export default meta;
