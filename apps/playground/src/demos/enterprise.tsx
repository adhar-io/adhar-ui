/**
 * Enterprise component demos — All 27 enterprise components with full variants.
 * DataTable, DataGrid, ListView, GridView, DetailView, MasterDetail,
 * FormBuilder, FileUpload, RichTextEditor, KanbanBoard, Timeline,
 * TreeView, Stepper, MultiSelect, TagInput, TransferList, SortableList,
 * PropertyList, DescriptionList, EmptyState, StatCard, Kbd, CopyButton,
 * CommandBar, NotificationCenter, InfiniteScroll, VirtualizedList
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function DataTableDemo() {
  const [search, setSearch] = useState('');
  const rows = [
    { name: 'Ken', email: 'ken@example.com', status: 'Active', role: 'Admin', amount: '$316' },
    { name: 'Abe', email: 'abe@example.com', status: 'Inactive', role: 'User', amount: '$242' },
    { name: 'Monty', email: 'monty@example.com', status: 'Active', role: 'Editor', amount: '$837' },
    { name: 'Carol', email: 'carol@example.com', status: 'Active', role: 'User', amount: '$125' },
  ];
  const filtered = rows.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Filter by name or email...'
          className='max-w-sm flex h-9 rounded-md border border-input bg-background px-3 text-sm'
        />
        <button className='ml-auto h-9 rounded-md border px-3 text-sm hover:bg-accent'>
          Columns ▾
        </button>
      </div>
      <div className='rounded-md border'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              <th className='h-10 px-4 text-left font-medium text-muted-foreground w-8'>
                <input type='checkbox' className='h-4 w-4 accent-primary' />
              </th>
              <th className='h-10 px-4 text-left font-medium text-muted-foreground'>Name</th>
              <th className='h-10 px-4 text-left font-medium text-muted-foreground'>Email</th>
              <th className='h-10 px-4 text-left font-medium text-muted-foreground'>Status</th>
              <th className='h-10 px-4 text-left font-medium text-muted-foreground'>Role</th>
              <th className='h-10 px-4 text-right font-medium text-muted-foreground'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0
              ? (
                <tr>
                  <td colSpan={6} className='h-24 text-center text-muted-foreground'>
                    No results.
                  </td>
                </tr>
              )
              : filtered.map((r) => (
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
                  <td className='p-4'>{r.role}</td>
                  <td className='p-4 text-right font-medium'>{r.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between'>
        <span className='text-sm text-muted-foreground'>0 of {filtered.length} selected</span>
        <div className='flex gap-1'>
          <button
            className='h-8 px-3 rounded-md border text-xs hover:bg-accent disabled:opacity-50'
            disabled
          >
            Previous
          </button>
          <button className='h-8 px-3 rounded-md border text-xs hover:bg-accent'>Next</button>
        </div>
      </div>
    </div>
  );
}

export function DataGridDemo() {
  return (
    <div className='rounded-md border overflow-auto'>
      <table className='w-full text-sm'>
        <thead className='bg-muted/50'>
          <tr>
            {['ID', 'Name', 'Email', 'Department', 'Role'].map((h) => (
              <th
                key={h}
                className='h-10 px-3 text-left text-xs font-medium text-muted-foreground cursor-pointer hover:bg-muted whitespace-nowrap'
              >
                {h} ↕
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['1', 'Alice Johnson', 'alice@co.com', 'Engineering', 'Lead'],
            ['2', 'Bob Smith', 'bob@co.com', 'Design', 'Senior'],
            ['3', 'Carol Williams', 'carol@co.com', 'Product', 'Manager'],
            ['4', 'Dave Brown', 'dave@co.com', 'Engineering', 'Junior'],
          ].map((r) => (
            <tr key={r[0]} className='border-t hover:bg-muted/30'>
              {r.map((c, i) => <td key={i} className='px-3 py-2 whitespace-nowrap'>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ListViewDemo() {
  const items = [
    'Project Alpha — Design system rebuild',
    'Project Beta — API gateway migration',
    'Project Gamma — Mobile app redesign',
    'Project Delta — Analytics dashboard',
    'Project Epsilon — DevOps automation',
  ];
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const filtered = items.filter((i) => i.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className='max-w-sm rounded-md border'>
      <div className='border-b p-2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search projects...'
          className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm'
        />
      </div>
      <div>
        {filtered.length === 0
          ? <p className='p-8 text-center text-sm text-muted-foreground'>No projects found</p>
          : filtered.map((i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                'border-b px-4 py-3 cursor-pointer text-sm transition-colors hover:bg-accent',
                selected === i && 'bg-accent font-medium',
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
        <div
          key={n}
          className='rounded-lg border bg-card p-4 text-center hover:shadow-md transition-shadow cursor-pointer'
        >
          <div className='mx-auto mb-2 h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold text-muted-foreground'>
            {n[0]}
          </div>
          <p className='text-sm font-medium'>{n}</p>
          <p className='text-xs text-muted-foreground mt-1'>Project</p>
        </div>
      ))}
    </div>
  );
}

export function DetailViewDemo() {
  return (
    <div className='max-w-md space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold'>Project Alpha</h2>
          <p className='text-sm text-muted-foreground'>Design system rebuild</p>
        </div>
        <div className='flex gap-2'>
          <span className='rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold'>
            Active
          </span>
          <button className='h-8 rounded-md border px-3 text-xs hover:bg-accent'>Edit</button>
        </div>
      </div>
      <div className='rounded-lg border'>
        <div className='border-b px-4 py-2'>
          <h3 className='text-sm font-semibold'>Details</h3>
        </div>
        <div className='grid grid-cols-2 gap-px bg-border'>
          {[
            ['Owner', 'John Doe'],
            ['Started', 'Jan 15, 2026'],
            ['Budget', '$50,000'],
            ['Priority', 'High'],
            ['Team Size', '8'],
            ['Sprint', '14'],
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
  const details: Record<string, { desc: string; status: string; owner: string }> = {
    Alpha: { desc: 'Design system rebuild', status: 'Active', owner: 'John' },
    Beta: { desc: 'API gateway migration', status: 'Planning', owner: 'Alice' },
    Gamma: { desc: 'Mobile app redesign', status: 'Review', owner: 'Bob' },
    Delta: { desc: 'Analytics dashboard', status: 'Active', owner: 'Carol' },
  };
  return (
    <div className='flex h-64 rounded-md border overflow-hidden'>
      <div className='w-48 border-r overflow-auto'>
        {Object.keys(details).map((i) => (
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
        <p className='mt-1 text-sm text-muted-foreground'>{details[sel].desc}</p>
        <div className='mt-3 grid grid-cols-2 gap-2 text-sm'>
          <div>
            <span className='text-xs text-muted-foreground'>Status</span>
            <p className='font-medium'>{details[sel].status}</p>
          </div>
          <div>
            <span className='text-xs text-muted-foreground'>Owner</span>
            <p className='font-medium'>{details[sel].owner}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FormBuilderDemo() {
  return (
    <form className='max-w-sm space-y-4' onSubmit={(e) => e.preventDefault()}>
      <p className='text-xs font-medium text-muted-foreground mb-2'>Auto-generated from schema</p>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Full Name *</label>
        <input
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='John Doe'
        />
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Email *</label>
        <input
          type='email'
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='john@example.com'
        />
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Role</label>
        <select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
          <option>Admin</option>
          <option>User</option>
          <option>Viewer</option>
        </select>
      </div>
      <div className='space-y-2'>
        <label className='text-sm font-medium'>Bio</label>
        <textarea
          rows={3}
          className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
          placeholder='Tell us about yourself...'
        />
      </div>
      <div className='flex items-center gap-2'>
        <input type='checkbox' className='h-4 w-4 accent-primary' />
        <label className='text-sm'>Active account</label>
      </div>
      <div className='flex gap-2'>
        <button
          type='submit'
          className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'
        >
          Create
        </button>
        <button type='button' className='h-10 rounded-md border px-4 text-sm hover:bg-accent'>
          Cancel
        </button>
      </div>
    </form>
  );
}

export function FileUploadDemo() {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div className='space-y-4 max-w-sm'>
      <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors'>
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
        <p className='text-sm font-medium'>Drag & drop files here, or click to browse</p>
        <p className='mt-1 text-xs text-muted-foreground'>PNG, JPG, PDF up to 10MB</p>
        <button
          onClick={() => setFiles([...files, `file-${files.length + 1}.pdf`])}
          className='mt-3 h-8 rounded-md border px-3 text-xs hover:bg-accent'
        >
          Select file
        </button>
      </div>
      {files.length > 0 && (
        <div className='space-y-2'>
          {files.map((f, i) => (
            <div key={i} className='flex items-center justify-between rounded-md border px-3 py-2'>
              <div className='flex items-center gap-2 text-sm'>
                <span className='font-medium'>{f}</span>
                <span className='text-muted-foreground'>(2.4 MB)</span>
              </div>
              <button
                onClick={() =>
                  setFiles(files.filter((_, j) =>
                    j !== i
                  ))}
                className='text-muted-foreground hover:text-destructive text-sm'
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RichTextEditorDemo() {
  return (
    <div className='rounded-md border max-w-lg'>
      <div className='flex flex-wrap gap-1 border-b p-1'>
        {[
          { l: 'B', s: 'font-bold' },
          { l: 'I', s: 'italic' },
          { l: 'U', s: 'underline' },
          { l: 'S', s: 'line-through' },
          { l: 'H1', s: 'font-bold text-lg' },
          { l: 'H2', s: 'font-bold' },
          { l: '•', s: '' },
          { l: '1.', s: '' },
          { l: '"', s: '' },
          { l: '<>', s: 'font-mono text-xs' },
          { l: '—', s: '' },
        ].map((b) => (
          <button key={b.l} className={cn('rounded px-2 py-1 text-sm hover:bg-accent', b.s)}>
            {b.l}
          </button>
        ))}
      </div>
      <div
        className='min-h-[150px] p-4 text-sm focus:outline-none'
        contentEditable
        suppressContentEditableWarning
      >
        <h2 className='text-lg font-bold mb-2'>Rich Text Editor</h2>
        <p>
          This is a <strong>rich text editor</strong> with <em>formatting</em> support. You can add:
        </p>
        <ul className='list-disc ml-4 mt-2 space-y-1'>
          <li>Bold, italic, underline, strikethrough</li>
          <li>Headings (H1, H2)</li>
          <li>Bullet and numbered lists</li>
          <li>Block quotes and code blocks</li>
        </ul>
      </div>
    </div>
  );
}

export function KanbanBoardDemo() {
  const cols = [
    { title: 'Backlog', cards: ['Research competitors', 'Write user stories'] },
    { title: 'To Do', cards: ['Design homepage', 'Create tokens'] },
    { title: 'In Progress', cards: ['Build button component'] },
    { title: 'Review', cards: ['PR #42 — Dialog'] },
    { title: 'Done', cards: ['Setup repo', 'Configure CI'] },
  ];
  return (
    <div className='flex gap-3 overflow-x-auto pb-2'>
      {cols.map((col) => (
        <div key={col.title} className='w-48 shrink-0 rounded-lg bg-muted/50 p-2'>
          <h3 className='mb-2 px-2 py-1 text-xs font-semibold flex items-center justify-between'>
            {col.title}
            <span className='rounded-full bg-muted px-2 py-0.5 text-[10px]'>
              {col.cards.length}
            </span>
          </h3>
          <div className='space-y-2'>
            {col.cards.map((c) => (
              <div
                key={c}
                className='rounded-md border bg-card p-3 text-xs shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow'
              >
                {c}
              </div>
            ))}
          </div>
          <button className='mt-2 w-full rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent text-left'>
            + Add card
          </button>
        </div>
      ))}
    </div>
  );
}

export function TimelineDemo() {
  const events = [{
    title: 'Application submitted',
    desc: 'Your application has been received.',
    time: '2 days ago',
    variant: 'bg-green-500',
  }, {
    title: 'Under review',
    desc: 'We are reviewing your application.',
    time: 'Yesterday',
    variant: 'bg-blue-500',
  }, {
    title: 'Interview scheduled',
    desc: 'Your interview is on April 10, 2026.',
    time: '5 hours ago',
    variant: 'bg-yellow-500',
  }, {
    title: 'Decision pending',
    desc: 'A decision will be made within 48 hours.',
    time: 'Now',
    variant: 'bg-muted-foreground',
  }];
  return (
    <ol className='relative border-l border-muted-foreground/20 ml-3'>
      {events.map((e, i) => (
        <li key={i} className='mb-8 ml-6 last:mb-0'>
          <div
            className={cn(
              'absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-background',
              e.variant,
            )}
          />
          <div className='flex items-center gap-2'>
            <h3 className='text-sm font-semibold'>{e.title}</h3>
            <span className='text-xs text-muted-foreground'>{e.time}</span>
          </div>
          <p className='mt-1 text-sm text-muted-foreground'>{e.desc}</p>
        </li>
      ))}
    </ol>
  );
}

export function TreeViewDemo() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['src', 'components']));
  const toggle = (id: string) => {
    const n = new Set(expanded);
    n.has(id) ? n.delete(id) : n.add(id);
    setExpanded(n);
  };
  type Node = { id: string; label: string; icon?: string; children?: Node[] };
  const tree: Node[] = [
    {
      id: 'src',
      label: 'src',
      icon: '📁',
      children: [
        {
          id: 'components',
          label: 'components',
          icon: '📁',
          children: [
            {
              id: 'ui',
              label: 'ui',
              icon: '📁',
              children: [
                { id: 'button.tsx', label: 'button.tsx', icon: '📄' },
                { id: 'card.tsx', label: 'card.tsx', icon: '📄' },
                { id: 'dialog.tsx', label: 'dialog.tsx', icon: '📄' },
              ],
            },
          ],
        },
        {
          id: 'lib',
          label: 'lib',
          icon: '📁',
          children: [
            { id: 'utils.ts', label: 'utils.ts', icon: '📄' },
          ],
        },
        { id: 'app.tsx', label: 'app.tsx', icon: '📄' },
        { id: 'main.tsx', label: 'main.tsx', icon: '📄' },
      ],
    },
    {
      id: 'public',
      label: 'public',
      icon: '📁',
      children: [
        { id: 'favicon.svg', label: 'favicon.svg', icon: '🎨' },
        { id: 'robots.txt', label: 'robots.txt', icon: '📄' },
      ],
    },
    { id: 'package.json', label: 'package.json', icon: '📦' },
    { id: 'tsconfig.json', label: 'tsconfig.json', icon: '⚙️' },
  ];
  const renderNode = (node: Node, level: number): React.ReactNode => (
    <div key={node.id}>
      <button
        onClick={() => node.children && toggle(node.id)}
        className={cn(
          'flex w-full items-center gap-1.5 rounded-sm px-2 py-1 text-sm hover:bg-accent',
        )}
        style={{ paddingLeft: level * 16 + 8 }}
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
        <span className='shrink-0'>{node.icon}</span>
        <span className='truncate'>{node.label}</span>
      </button>
      {node.children && expanded.has(node.id) && node.children.map((c) => renderNode(c, level + 1))}
    </div>
  );
  return <div className='max-w-xs rounded-md border p-2'>{tree.map((n) => renderNode(n, 0))}</div>;
}

export function StepperDemo() {
  const [step, setStep] = useState(1);
  const steps = ['Account', 'Profile', 'Preferences', 'Review'];
  return (
    <div className='space-y-4 max-w-md'>
      <div className='flex items-center gap-2'>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => setStep(i)}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all',
                  i < step
                    ? 'border-primary bg-primary text-primary-foreground'
                    : i === step
                    ? 'border-primary text-primary'
                    : 'border-muted-foreground/30 text-muted-foreground',
                )}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span
                className={cn(
                  'text-sm hidden sm:inline',
                  i <= step ? 'font-medium' : 'text-muted-foreground',
                )}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn('h-[2px] flex-1', i < step ? 'bg-primary' : 'bg-muted-foreground/20')}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='rounded-md border p-4'>
        <h3 className='text-sm font-semibold'>Step {step + 1}: {steps[step]}</h3>
        <p className='mt-1 text-sm text-muted-foreground'>
          Fill in your {steps[step].toLowerCase()} information.
        </p>
      </div>
      <div className='flex justify-between'>
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className='h-9 rounded-md border px-4 text-sm hover:bg-accent disabled:opacity-50'
        >
          Back
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          className='h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'
        >
          {step === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export function MultiSelectDemo() {
  const [vals, setVals] = useState<string[]>(['react', 'typescript']);
  const opts = ['react', 'vue', 'angular', 'svelte', 'solid', 'typescript', 'javascript', 'rust'];
  return (
    <div className='max-w-sm space-y-2'>
      <div className='flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border px-3 py-2'>
        {vals.map((v) => (
          <span
            key={v}
            className='inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium'
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
        {vals.length === 0 && (
          <span className='text-sm text-muted-foreground'>Select technologies...</span>
        )}
      </div>
      <div className='flex flex-wrap gap-1'>
        {opts.filter((o) => !vals.includes(o)).map((o) => (
          <button
            key={o}
            onClick={() => setVals([...vals, o])}
            className='rounded-full border px-2 py-0.5 text-xs hover:bg-accent transition-colors'
          >
            + {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TagInputDemo() {
  const [tags, setTags] = useState(['react', 'tailwind', 'typescript']);
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
              e.preventDefault();
              if (!tags.includes(input.trim())) setTags([...tags, input.trim()]);
              setInput('');
            }
            if (e.key === 'Backspace' && !input && tags.length) setTags(tags.slice(0, -1));
          }}
          placeholder={tags.length ? '' : 'Add tags...'}
          className='flex-1 min-w-[80px] bg-transparent outline-none text-sm placeholder:text-muted-foreground'
        />
        <span className='text-xs text-muted-foreground'>{tags.length}/10</span>
      </div>
    </div>
  );
}

export function TransferListDemo() {
  const [left, setLeft] = useState(['Alice', 'Bob', 'Carol', 'Dave', 'Eve']);
  const [right, setRight] = useState(['Frank']);
  const [leftChecked, setLeftChecked] = useState<Set<string>>(new Set());
  const [rightChecked, setRightChecked] = useState<Set<string>>(new Set());
  const toggleCheck = (
    set: Set<string>,
    setFn: React.Dispatch<React.SetStateAction<Set<string>>>,
    item: string,
  ) => {
    const n = new Set(set);
    n.has(item) ? n.delete(item) : n.add(item);
    setFn(n);
  };
  const moveRight = () => {
    setRight([...right, ...leftChecked]);
    setLeft(left.filter((i) => !leftChecked.has(i)));
    setLeftChecked(new Set());
  };
  const moveLeft = () => {
    setLeft([...left, ...rightChecked]);
    setRight(right.filter((i) => !rightChecked.has(i)));
    setRightChecked(new Set());
  };
  return (
    <div className='flex items-center gap-2 max-w-md'>
      {[{ items: left, checked: leftChecked, setChecked: setLeftChecked, title: 'Available' }, {
        items: right,
        checked: rightChecked,
        setChecked: setRightChecked,
        title: 'Selected',
      }].map((panel, pi) => (
        <div key={pi} className='flex-1 rounded-md border'>
          <div className='border-b p-2'>
            <h4 className='text-sm font-medium'>{panel.title} ({panel.items.length})</h4>
          </div>
          <div className='max-h-40 overflow-auto p-1'>
            {panel.items.map((i) => (
              <label
                key={i}
                className='flex items-center gap-2 rounded-sm px-2 py-1 text-sm hover:bg-accent cursor-pointer'
              >
                <input
                  type='checkbox'
                  checked={panel.checked.has(i)}
                  onChange={() => toggleCheck(panel.checked, panel.setChecked, i)}
                  className='h-3.5 w-3.5 accent-primary'
                />
                {i}
              </label>
            ))}
          </div>
        </div>
      )).reduce((acc, panel, i) =>
        i === 0 ? [panel] : [
          ...acc,
          <div key='btns' className='flex flex-col gap-1'>
            <button
              onClick={moveRight}
              disabled={leftChecked.size === 0}
              className='h-8 w-8 rounded-md border text-sm hover:bg-accent disabled:opacity-50'
            >
              →
            </button>
            <button
              onClick={moveLeft}
              disabled={rightChecked.size === 0}
              className='h-8 w-8 rounded-md border text-sm hover:bg-accent disabled:opacity-50'
            >
              ←
            </button>
          </div>,
          panel,
        ], [] as React.ReactNode[])}
    </div>
  );
}

export function SortableListDemo() {
  const [items, setItems] = useState([
    'First item',
    'Second item',
    'Third item',
    'Fourth item',
    'Fifth item',
  ]);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  return (
    <div className='max-w-sm space-y-1'>
      {items.map((item, i) => (
        <div
          key={item}
          draggable
          onDragStart={() => setDragIdx(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragIdx === null) return;
            const next = [...items];
            const [moved] = next.splice(dragIdx, 1);
            next.splice(i, 0, moved);
            setItems(next);
            setDragIdx(null);
          }}
          className={cn(
            'flex items-center gap-2 rounded-md border bg-card p-3 text-sm cursor-grab active:cursor-grabbing transition-all',
            dragIdx === i && 'opacity-50',
          )}
        >
          <span className='text-muted-foreground'>⋮⋮</span>
          <span className='flex-1'>{item}</span>
          <span className='text-xs text-muted-foreground rounded-full bg-muted px-2 py-0.5'>
            #{i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

export function PropertyListDemo() {
  return (
    <div className='divide-y rounded-lg border max-w-sm'>
      {[
        ['Name', 'Adhar UI'],
        ['Version', '0.1.0'],
        ['License', 'Apache 2.0'],
        ['Runtime', 'Deno 2.6+'],
        ['Components', '91'],
        ['Blocks', '36'],
        ['Frameworks', 'React, Vue, Solid, Svelte, Angular'],
      ].map(([k, v]) => (
        <div key={k} className='flex items-start justify-between gap-4 px-4 py-3'>
          <dt className='text-sm font-medium text-muted-foreground whitespace-nowrap'>{k}</dt>
          <dd className='text-sm text-right'>{v}</dd>
        </div>
      ))}
    </div>
  );
}

export function DescriptionListDemo() {
  return (
    <div className='max-w-sm'>
      <dl className='grid gap-y-3 gap-x-4 sm:grid-cols-[140px_1fr]'>
        {[
          ['Full Name', 'John Doe'],
          ['Email', 'john@example.com'],
          ['Phone', '+1 (555) 123-4567'],
          ['Role', 'Administrator'],
          ['Department', 'Engineering'],
          ['Joined', 'January 15, 2025'],
          ['Status', 'Active'],
        ].map(([t, d]) => (
          <React.Fragment key={t}>
            <dt className='text-sm font-medium text-muted-foreground'>{t}</dt>
            <dd className='text-sm'>{d}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
}

export function EmptyStateDemo() {
  return (
    <div className='space-y-4'>
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
          Drag and drop files here or click the button below to browse.
        </p>
        <button className='mt-6 h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'>
          Upload files
        </button>
      </div>
      <div className='flex flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          className='mb-3 text-muted-foreground'
        >
          <circle cx='11' cy='11' r='8' />
          <path d='m21 21-4.3-4.3' />
        </svg>
        <h3 className='text-sm font-semibold'>No results found</h3>
        <p className='mt-1 text-xs text-muted-foreground'>Try adjusting your search or filters.</p>
      </div>
    </div>
  );
}

export function StatCardDemo() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-3xl'>
      {[{
        title: 'Total Revenue',
        value: '$45,231.89',
        change: '+20.1%',
        trend: 'up' as const,
        icon: '💰',
      }, {
        title: 'Subscriptions',
        value: '+2,350',
        change: '+180.1%',
        trend: 'up' as const,
        icon: '👥',
      }, {
        title: 'Active Users',
        value: '+12,234',
        change: '+19%',
        trend: 'up' as const,
        icon: '📈',
      }, {
        title: 'Bounce Rate',
        value: '24.5%',
        change: '-4.1%',
        trend: 'down' as const,
        icon: '📉',
      }].map((stat) => (
        <div key={stat.title} className='rounded-lg border bg-card p-6 shadow-sm'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-muted-foreground'>{stat.title}</p>
            <span>{stat.icon}</span>
          </div>
          <div className='mt-2 flex items-baseline gap-2'>
            <h2 className='text-2xl font-bold tracking-tight'>{stat.value}</h2>
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
    <div className='space-y-3'>
      {[
        { keys: ['⌘', 'K'], label: 'Open command palette' },
        { keys: ['Ctrl', 'S'], label: 'Save' },
        { keys: ['Ctrl', 'Shift', 'P'], label: 'Toggle panel' },
        { keys: ['Esc'], label: 'Close dialog' },
        { keys: ['⌘', 'Z'], label: 'Undo' },
        { keys: ['⌘', 'Shift', 'Z'], label: 'Redo' },
        { keys: ['Tab'], label: 'Next field' },
        { keys: ['⌘', '⌥', 'I'], label: 'Dev tools' },
      ].map(({ keys, label }) => (
        <div key={label} className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            {keys.map((k) => (
              <kbd
                key={k}
                className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'
              >
                {k}
              </kbd>
            ))}
          </div>
          <span className='text-sm text-muted-foreground'>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function CopyButtonDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };
  const snippets = [
    'npm install @adhar-ui/cli',
    'adhar-ui add button card dialog',
    'adhar-ui design-generate',
  ];
  return (
    <div className='space-y-2 max-w-md'>
      {snippets.map((s) => (
        <div
          key={s}
          className='flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2'
        >
          <code className='text-sm font-mono'>{s}</code>
          <button
            onClick={() => copy(s)}
            className='ml-2 inline-flex items-center justify-center rounded-md p-1.5 text-sm hover:bg-accent transition-colors'
          >
            {copied === s
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
      ))}
    </div>
  );
}

export function CommandBarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className='inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-accent'
      >
        Search commands...{' '}
        <kbd className='rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono'>⌘K</kbd>
      </button>
      {open && (
        <div className='mt-2 w-72 rounded-md border bg-popover shadow-md'>
          <div className='flex items-center border-b px-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className='mr-2 opacity-50'
            >
              <circle cx='11' cy='11' r='8' />
              <path d='m21 21-4.3-4.3' />
            </svg>
            <input
              placeholder='Type a command...'
              className='h-10 w-full bg-transparent text-sm outline-none'
              autoFocus
            />
          </div>
          <div className='p-1'>
            <p className='px-2 py-1 text-xs text-muted-foreground'>Actions</p>
            {['Open file...', 'Run command...', 'Search docs...', 'Toggle theme', 'Open settings']
              .map((i) => (
                <div
                  key={i}
                  className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
                  onClick={() => setOpen(false)}
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
  const [notifs, setNotifs] = useState([
    { id: 1, t: 'New comment', d: 'Alice commented on your PR', time: '5m', unread: true },
    { id: 2, t: 'Build passed', d: 'CI completed successfully', time: '1h', unread: true },
    { id: 3, t: 'Invitation', d: 'You were invited to team Alpha', time: '3h', unread: true },
    { id: 4, t: 'Mention', d: 'Bob mentioned you in #general', time: '1d', unread: false },
  ]);
  const markRead = (id: number) =>
    setNotifs(notifs.map((n) => n.id === id ? { ...n, unread: false } : n));
  const unread = notifs.filter((n) => n.unread).length;
  return (
    <div className='w-80 rounded-lg border bg-popover shadow-md'>
      <div className='flex items-center justify-between border-b px-4 py-3'>
        <div className='flex items-center gap-2'>
          <h4 className='text-sm font-semibold'>Notifications</h4>
          {unread > 0 && (
            <span className='inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground'>
              {unread}
            </span>
          )}
        </div>
        <button
          onClick={() => setNotifs(notifs.map((n) => ({ ...n, unread: false })))}
          className='text-xs text-muted-foreground hover:text-foreground'
        >
          Mark all read
        </button>
      </div>
      <div className='max-h-72 overflow-auto divide-y'>
        {notifs.map((n) => (
          <div
            key={n.id}
            onClick={() => markRead(n.id)}
            className={cn(
              'px-4 py-3 cursor-pointer hover:bg-accent transition-colors',
              n.unread && 'bg-accent/40',
            )}
          >
            <div className='flex items-start gap-2'>
              <div
                className={cn(
                  'mt-1.5 h-2 w-2 rounded-full shrink-0',
                  n.unread ? 'bg-primary' : 'bg-transparent',
                )}
              />
              <div>
                <p className={cn('text-sm', n.unread && 'font-medium')}>{n.t}</p>
                <p className='text-xs text-muted-foreground'>{n.d}</p>
                <p className='text-[10px] text-muted-foreground mt-0.5'>{n.time} ago</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfiniteScrollDemo() {
  const [count, setCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setCount((c) => c + 5);
      setLoading(false);
    }, 800);
  };
  return (
    <div className='max-w-sm space-y-2'>
      {Array.from(
        { length: count },
        (_, i) => (
          <div key={i} className='rounded-md border p-3 text-sm flex items-center gap-3'>
            <div className='h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium'>
              {i + 1}
            </div>
            <div>
              <p className='font-medium'>Item {i + 1}</p>
              <p className='text-xs text-muted-foreground'>Description for item {i + 1}</p>
            </div>
          </div>
        ),
      )}
      {loading && (
        <div className='flex justify-center py-3'>
          <div className='h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent' />
        </div>
      )}
      {count < 20 && !loading && (
        <button
          onClick={loadMore}
          className='w-full rounded-md border py-2 text-sm hover:bg-accent'
        >
          Load more
        </button>
      )}
      {count >= 20 && (
        <p className='text-center text-xs text-muted-foreground py-2'>All items loaded</p>
      )}
    </div>
  );
}

export function VirtualizedListDemo() {
  return (
    <div className='h-48 w-64 overflow-auto rounded-md border'>
      <div className='relative' style={{ height: 3000 }}>
        {Array.from(
          { length: 100 },
          (_, i) => (
            <div
              key={i}
              className='absolute w-full border-b px-4 py-2 text-sm flex items-center gap-2'
              style={{ top: i * 30, height: 30 }}
            >
              <span className='text-xs text-muted-foreground w-6'>{i + 1}</span>
              <span>Virtual row {i + 1}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
