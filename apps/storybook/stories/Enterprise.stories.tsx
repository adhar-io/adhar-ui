import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

/* ─── Data Table ──────────────────────────────────────────────────── */

function DataTable({ rows = 5, showCheckbox = true, striped = false }: { rows?: number; showCheckbox?: boolean; striped?: boolean }) {
  const [s, ss] = useState('');
  const allRows = [
    { n: 'Ken', e: 'ken@co.com', st: 'Active', a: '$316' },
    { n: 'Abe', e: 'abe@co.com', st: 'Inactive', a: '$242' },
    { n: 'Monty', e: 'monty@co.com', st: 'Active', a: '$837' },
    { n: 'Diana', e: 'diana@co.com', st: 'Active', a: '$524' },
    { n: 'Eric', e: 'eric@co.com', st: 'Inactive', a: '$190' },
    { n: 'Fiona', e: 'fiona@co.com', st: 'Active', a: '$610' },
    { n: 'Greg', e: 'greg@co.com', st: 'Active', a: '$475' },
    { n: 'Hana', e: 'hana@co.com', st: 'Inactive', a: '$320' },
    { n: 'Ivan', e: 'ivan@co.com', st: 'Active', a: '$700' },
    { n: 'Jade', e: 'jade@co.com', st: 'Active', a: '$280' },
  ];
  const data = allRows.slice(0, rows).filter((r) => r.n.toLowerCase().includes(s.toLowerCase()));
  return (
    <div className='space-y-3'>
      <input value={s} onChange={(e) => ss(e.target.value)} placeholder='Filter...' className='max-w-sm h-9 rounded-md border px-3 text-sm' />
      <div className='rounded-md border'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b'>
              {showCheckbox && <th className='h-10 px-4 text-left text-muted-foreground w-8'><input type='checkbox' className='h-4 w-4 accent-primary' /></th>}
              <th className='h-10 px-4 text-left text-muted-foreground'>Name</th>
              <th className='h-10 px-4 text-left text-muted-foreground'>Email</th>
              <th className='h-10 px-4 text-left text-muted-foreground'>Status</th>
              <th className='h-10 px-4 text-right text-muted-foreground'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, idx) => (
              <tr key={r.e} className={cn('border-b hover:bg-muted/50', striped && idx % 2 === 1 && 'bg-muted/30')}>
                {showCheckbox && <td className='p-4'><input type='checkbox' className='h-4 w-4 accent-primary' /></td>}
                <td className='p-4 font-medium'>{r.n}</td>
                <td className='p-4'>{r.e}</td>
                <td className='p-4'>
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', r.st === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>{r.st}</span>
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
}

export const DataTableStory: StoryObj<typeof DataTable> = {
  name: 'Data Table',
  render: (args) => <DataTable {...args} />,
  args: { rows: 5, showCheckbox: true, striped: false },
  argTypes: {
    rows: { control: { type: 'number', min: 1, max: 10 } },
    showCheckbox: { control: 'boolean' },
    striped: { control: 'boolean' },
  },
};

/* ─── Data Grid ───────────────────────────────────────────────────── */

function DataGrid({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('rounded-md border overflow-auto', disabled && 'opacity-50 pointer-events-none')}>
      <table className='w-full text-sm'>
        <thead className='bg-muted/50'>
          <tr>
            {['ID', 'Name', 'Email', 'Dept'].map((h) => (
              <th key={h} className='h-10 px-3 text-left text-xs font-medium text-muted-foreground cursor-pointer hover:bg-muted'>{h} &updownarrow;</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[['1', 'Alice', 'alice@co.com', 'Eng'], ['2', 'Bob', 'bob@co.com', 'Design'], ['3', 'Carol', 'carol@co.com', 'Product']].map((r) => (
            <tr key={r[0]} className='border-t hover:bg-muted/30'>
              {r.map((c, i) => <td key={i} className='px-3 py-2'>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const DataGridStory: StoryObj<typeof DataGrid> = {
  name: 'Data Grid',
  render: (args) => <DataGrid {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── List View ───────────────────────────────────────────────────── */

function ListView({ disabled = false }: { disabled?: boolean }) {
  const [sel, setSel] = useState('');
  return (
    <div className={cn('max-w-sm rounded-md border', disabled && 'opacity-50 pointer-events-none')}>
      <div className='border-b p-2'>
        <input placeholder='Search...' className='h-8 w-full rounded-md border px-2 text-sm' />
      </div>
      {['Project Alpha', 'Project Beta', 'Project Gamma'].map((i) => (
        <div key={i} onClick={() => setSel(i)} className={cn('border-b px-4 py-3 text-sm cursor-pointer hover:bg-accent', sel === i && 'bg-accent font-medium')}>{i}</div>
      ))}
    </div>
  );
}

export const ListViewStory: StoryObj<typeof ListView> = {
  name: 'List View',
  render: (args) => <ListView {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Grid View ───────────────────────────────────────────────────── */

function GridView({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('grid gap-3 grid-cols-3 max-w-md', disabled && 'opacity-50 pointer-events-none')}>
      {['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map((n) => (
        <div key={n} className='rounded-lg border p-4 text-center hover:shadow-md cursor-pointer'>
          <div className='mx-auto mb-2 h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold text-muted-foreground'>{n[0]}</div>
          <p className='text-sm font-medium'>{n}</p>
        </div>
      ))}
    </div>
  );
}

export const GridViewStory: StoryObj<typeof GridView> = {
  name: 'Grid View',
  render: (args) => <GridView {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Detail View ─────────────────────────────────────────────────── */

function DetailView({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('max-w-md', disabled && 'opacity-50 pointer-events-none')}>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold'>Project Alpha</h2>
        <span className='rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-semibold'>Active</span>
      </div>
      <div className='rounded-lg border'>
        <div className='grid grid-cols-2 gap-px bg-border'>
          {[['Owner', 'John Doe'], ['Budget', '$50,000'], ['Priority', 'High'], ['Sprint', '14']].map(([l, v]) => (
            <div key={l} className='bg-card px-4 py-3'>
              <dt className='text-xs text-muted-foreground'>{l}</dt>
              <dd className='mt-1 text-sm font-medium'>{v}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const DetailViewStory: StoryObj<typeof DetailView> = {
  name: 'Detail View',
  render: (args) => <DetailView {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Master Detail ───────────────────────────────────────────────── */

function MasterDetail({ disabled = false }: { disabled?: boolean }) {
  const [sel, setSel] = useState('Alpha');
  return (
    <div className={cn('flex h-48 rounded-md border overflow-hidden', disabled && 'opacity-50 pointer-events-none')}>
      <div className='w-40 border-r'>
        {['Alpha', 'Beta', 'Gamma'].map((i) => (
          <div key={i} onClick={() => setSel(i)} className={cn('border-b px-4 py-3 text-sm cursor-pointer hover:bg-accent', sel === i && 'bg-accent font-medium')}>{i}</div>
        ))}
      </div>
      <div className='flex-1 p-4'>
        <h3 className='text-sm font-semibold'>{sel}</h3>
        <p className='mt-2 text-sm text-muted-foreground'>Details for {sel}</p>
      </div>
    </div>
  );
}

export const MasterDetailStory: StoryObj<typeof MasterDetail> = {
  name: 'Master Detail',
  render: (args) => <MasterDetail {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Form Builder ────────────────────────────────────────────────── */

function FormBuilder({ disabled = false }: { disabled?: boolean }) {
  return (
    <form className={cn('max-w-sm space-y-3', disabled && 'opacity-50 pointer-events-none')} onSubmit={(e) => e.preventDefault()}>
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
      <button className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground'>Create</button>
    </form>
  );
}

export const FormBuilderStory: StoryObj<typeof FormBuilder> = {
  name: 'Form Builder',
  render: (args) => <FormBuilder {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── File Upload ─────────────────────────────────────────────────── */

function FileUpload({ multiple = false, accept = '*' }: { multiple?: boolean; accept?: string }) {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div className='max-w-sm space-y-3'>
      <label className='flex flex-col items-center rounded-lg border-2 border-dashed p-8 text-center cursor-pointer hover:border-muted-foreground/50'>
        <p className='text-sm font-medium'>Drag & drop files</p>
        <p className='text-xs text-muted-foreground mt-1'>{multiple ? 'Multiple files allowed' : 'Single file only'} &middot; {accept}</p>
        <input
          type='file'
          className='hidden'
          multiple={multiple}
          accept={accept}
          onChange={(e) => {
            const f = Array.from(e.target.files || []).map((f) => f.name);
            setFiles(multiple ? [...files, ...f] : f);
          }}
        />
      </label>
      {files.length > 0 && (
        <div className='space-y-1'>
          {files.map((f, i) => (
            <div key={i} className='flex items-center justify-between rounded-md border px-3 py-2 text-sm'>
              <span>{f}</span>
              <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className='text-xs text-muted-foreground hover:text-destructive'>&times;</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const FileUploadStory: StoryObj<typeof FileUpload> = {
  name: 'File Upload',
  render: (args) => <FileUpload {...args} />,
  args: { multiple: false, accept: '*' },
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
  },
};

/* ─── Rich Text Editor ────────────────────────────────────────────── */

function RichTextEditor({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('rounded-md border max-w-md', disabled && 'opacity-50 pointer-events-none')}>
      <div className='flex gap-1 border-b p-1'>
        {['B', 'I', 'U', 'H2', '\u2022', '1.', '\u201C', '<>'].map((b) => (
          <button key={b} className='rounded px-2 py-1 text-sm hover:bg-accent'>{b}</button>
        ))}
      </div>
      <div className='min-h-[100px] p-4 text-sm' contentEditable={!disabled} suppressContentEditableWarning>
        <p>Start writing...</p>
      </div>
    </div>
  );
}

export const RichTextEditorStory: StoryObj<typeof RichTextEditor> = {
  name: 'Rich Text Editor',
  render: (args) => <RichTextEditor {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Kanban Board ────────────────────────────────────────────────── */

function KanbanBoard({ columns = 3 }: { columns?: number }) {
  const allCols = [
    { t: 'To Do', c: ['Design UI', 'Write docs'] },
    { t: 'In Progress', c: ['Build components'] },
    { t: 'Review', c: ['Code review', 'QA testing'] },
    { t: 'Done', c: ['Setup repo'] },
    { t: 'Archived', c: ['Old task'] },
  ];
  const cols = allCols.slice(0, columns);
  return (
    <div className='flex gap-3 overflow-x-auto'>
      {cols.map((col) => (
        <div key={col.t} className='w-44 shrink-0 rounded-lg bg-muted/50 p-2'>
          <h3 className='mb-2 px-2 text-xs font-semibold'>{col.t} <span className='text-muted-foreground'>({col.c.length})</span></h3>
          <div className='space-y-2'>
            {col.c.map((c) => (
              <div key={c} className='rounded-md border bg-card p-2 text-xs shadow-sm'>{c}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export const KanbanBoardStory: StoryObj<typeof KanbanBoard> = {
  name: 'Kanban Board',
  render: (args) => <KanbanBoard {...args} />,
  args: { columns: 3 },
  argTypes: { columns: { control: { type: 'number', min: 2, max: 5 } } },
};

/* ─── Timeline ────────────────────────────────────────────────────── */

function Timeline({ items = 3, variant = 'default' }: { items?: number; variant?: 'default' | 'alternating' }) {
  const allItems = [
    { t: 'Submitted', c: 'bg-green-500' },
    { t: 'In Review', c: 'bg-blue-500' },
    { t: 'Approved', c: 'bg-green-500' },
    { t: 'Building', c: 'bg-yellow-500' },
    { t: 'Deployed', c: 'bg-green-500' },
    { t: 'Monitoring', c: 'bg-blue-500' },
    { t: 'Completed', c: 'bg-green-500' },
    { t: 'Archived', c: 'bg-muted-foreground' },
  ].slice(0, items);

  if (variant === 'alternating') {
    return (
      <div className='relative max-w-md mx-auto'>
        <div className='absolute left-1/2 top-0 bottom-0 w-px bg-muted-foreground/20' />
        {allItems.map((e, i) => (
          <div key={i} className={cn('mb-6 flex items-center gap-4', i % 2 === 0 ? 'flex-row' : 'flex-row-reverse')}>
            <div className='flex-1 text-right'>
              {i % 2 === 0 && <div className='rounded-md border p-2 text-sm'>{e.t}</div>}
            </div>
            <div className={cn('h-3 w-3 rounded-full border-2 border-background shrink-0 z-10', e.c)} />
            <div className='flex-1'>
              {i % 2 !== 0 && <div className='rounded-md border p-2 text-sm'>{e.t}</div>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ol className='relative border-l border-muted-foreground/20 ml-3'>
      {allItems.map((e, i) => (
        <li key={i} className='mb-6 ml-6'>
          <div className={cn('absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-background', e.c)} />
          <h3 className='text-sm font-semibold'>{e.t}</h3>
        </li>
      ))}
    </ol>
  );
}

export const TimelineStory: StoryObj<typeof Timeline> = {
  name: 'Timeline',
  render: (args) => <Timeline {...args} />,
  args: { items: 3, variant: 'default' },
  argTypes: {
    items: { control: { type: 'number', min: 3, max: 8 } },
    variant: { control: 'select', options: ['default', 'alternating'] },
  },
};

/* ─── Tree View ───────────────────────────────────────────────────── */

function TreeView({ expanded = true }: { expanded?: boolean }) {
  const [exp, setExp] = useState(expanded ? new Set(['src', 'components']) : new Set<string>());
  React.useEffect(() => {
    setExp(expanded ? new Set(['src', 'components']) : new Set<string>());
  }, [expanded]);
  const toggle = (id: string) => { const n = new Set(exp); n.has(id) ? n.delete(id) : n.add(id); setExp(n); };
  const tree = [
    { id: 'src', l: 'src', ch: [{ id: 'components', l: 'components', ch: [{ id: 'button', l: 'button.tsx' }, { id: 'input', l: 'input.tsx' }] }, { id: 'app', l: 'app.tsx' }] },
    { id: 'pkg', l: 'package.json' },
  ];
  return (
    <div className='max-w-xs rounded-md border p-2'>
      {tree.map(function render(n: any, lvl = 0): React.ReactNode {
        return (
          <div key={n.id}>
            <button onClick={() => n.ch && toggle(n.id)} className='flex w-full items-center gap-1.5 rounded-sm px-2 py-1 text-sm hover:bg-accent' style={{ paddingLeft: lvl * 16 + 8 }}>
              {n.ch ? <span className={cn('text-xs transition-transform', exp.has(n.id) && 'rotate-90')}>&blacktriangleright;</span> : <span className='w-3' />}
              {n.l}
            </button>
            {n.ch && exp.has(n.id) && n.ch.map((c: any) => render(c, lvl + 1))}
          </div>
        );
      })}
    </div>
  );
}

export const TreeViewStory: StoryObj<typeof TreeView> = {
  name: 'Tree View',
  render: (args) => <TreeView {...args} />,
  args: { expanded: true },
  argTypes: { expanded: { control: 'boolean' } },
};

/* ─── Stepper ─────────────────────────────────────────────────────── */

function Stepper({ steps = 3, currentStep = 1 }: { steps?: number; currentStep?: number }) {
  const labels = ['Account', 'Profile', 'Review', 'Confirm', 'Payment', 'Done'];
  const shownLabels = labels.slice(0, steps);
  return (
    <div className='flex items-center gap-2 max-w-lg'>
      {shownLabels.map((label, i) => (
        <React.Fragment key={label}>
          <div className='flex items-center gap-1.5'>
            <div className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-medium',
              i < currentStep ? 'border-primary bg-primary text-primary-foreground' : i === currentStep ? 'border-primary text-primary' : 'border-muted-foreground/30 text-muted-foreground',
            )}>{i < currentStep ? '\u2713' : i + 1}</div>
            <span className={cn('text-xs', i <= currentStep ? 'font-medium' : 'text-muted-foreground')}>{label}</span>
          </div>
          {i < shownLabels.length - 1 && <div className={cn('h-0.5 flex-1', i < currentStep ? 'bg-primary' : 'bg-muted')} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export const StepperStory: StoryObj<typeof Stepper> = {
  name: 'Stepper',
  render: (args) => <Stepper {...args} />,
  args: { steps: 3, currentStep: 1 },
  argTypes: {
    steps: { control: { type: 'number', min: 3, max: 6 } },
    currentStep: { control: { type: 'number', min: 0, max: 5 } },
  },
};

/* ─── Multi Select ────────────────────────────────────────────────── */

function MultiSelect({ maxItems = 5 }: { maxItems?: number }) {
  const [v, sv] = useState(['react']);
  const opts = ['react', 'vue', 'angular', 'svelte', 'solid', 'preact', 'lit'];
  const canAdd = v.length < maxItems;
  return (
    <div className='max-w-sm'>
      <div className='flex flex-wrap items-center gap-1 rounded-md border px-3 py-2'>
        {v.map((x) => (
          <span key={x} className='inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs'>
            {x}
            <button onClick={() => sv(v.filter((y) => y !== x))}>&times;</button>
          </span>
        ))}
      </div>
      <p className='mt-1 text-xs text-muted-foreground'>{v.length}/{maxItems} selected</p>
      <div className='mt-2 flex flex-wrap gap-1'>
        {opts.filter((o) => !v.includes(o)).map((o) => (
          <button
            key={o}
            onClick={() => canAdd && sv([...v, o])}
            disabled={!canAdd}
            className={cn('rounded-full border px-2 py-0.5 text-xs hover:bg-accent', !canAdd && 'opacity-50 cursor-not-allowed')}
          >+ {o}</button>
        ))}
      </div>
    </div>
  );
}

export const MultiSelectStory: StoryObj<typeof MultiSelect> = {
  name: 'Multi Select',
  render: (args) => <MultiSelect {...args} />,
  args: { maxItems: 5 },
  argTypes: { maxItems: { control: { type: 'number', min: 1, max: 7 } } },
};

/* ─── Tag Input ───────────────────────────────────────────────────── */

function TagInput({ disabled = false }: { disabled?: boolean }) {
  const [tags, setTags] = useState(['react', 'tailwind']);
  const [inp, setInp] = useState('');
  return (
    <div className={cn('max-w-sm', disabled && 'opacity-50 pointer-events-none')}>
      <div className='flex flex-wrap items-center gap-1 rounded-md border px-3 py-2'>
        {tags.map((t) => (
          <span key={t} className='inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs'>
            {t}<button onClick={() => setTags(tags.filter((x) => x !== t))}>&times;</button>
          </span>
        ))}
        <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && inp.trim()) { setTags([...tags, inp.trim()]); setInp(''); } }} placeholder='Add...' className='flex-1 min-w-[60px] bg-transparent outline-none text-sm' />
      </div>
    </div>
  );
}

export const TagInputStory: StoryObj<typeof TagInput> = {
  name: 'Tag Input',
  render: (args) => <TagInput {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Transfer List ───────────────────────────────────────────────── */

function TransferList({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2 max-w-md', disabled && 'opacity-50 pointer-events-none')}>
      <div className='flex-1 rounded-md border'>
        <div className='border-b p-2 text-sm font-medium'>Available</div>
        <div className='p-1'>
          {['Item A', 'Item B', 'Item C'].map((i) => (
            <label key={i} className='flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent'>
              <input type='checkbox' className='h-3 w-3 accent-primary' />{i}
            </label>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <button className='h-8 w-8 rounded-md border text-sm hover:bg-accent'>&rarr;</button>
        <button className='h-8 w-8 rounded-md border text-sm hover:bg-accent'>&larr;</button>
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
  );
}

export const TransferListStory: StoryObj<typeof TransferList> = {
  name: 'Transfer List',
  render: (args) => <TransferList {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Sortable List ───────────────────────────────────────────────── */

function SortableList({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('max-w-sm space-y-1', disabled && 'opacity-50 pointer-events-none')}>
      {['First', 'Second', 'Third', 'Fourth'].map((item, i) => (
        <div key={item} className='flex items-center gap-2 rounded-md border bg-card p-3 text-sm cursor-grab'>
          <span className='text-muted-foreground'>&Colon;&Colon;</span>
          <span className='flex-1'>{item}</span>
          <span className='text-xs text-muted-foreground rounded-full bg-muted px-2 py-0.5'>#{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

export const SortableListStory: StoryObj<typeof SortableList> = {
  name: 'Sortable List',
  render: (args) => <SortableList {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Property List ───────────────────────────────────────────────── */

function PropertyList({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('divide-y rounded-lg border max-w-sm', disabled && 'opacity-50')}>
      {[['Name', 'Adhar UI'], ['Version', '0.1.0'], ['License', 'Apache 2.0']].map(([k, v]) => (
        <div key={k} className='flex justify-between px-4 py-3'>
          <dt className='text-sm text-muted-foreground'>{k}</dt>
          <dd className='text-sm font-medium'>{v}</dd>
        </div>
      ))}
    </div>
  );
}

export const PropertyListStory: StoryObj<typeof PropertyList> = {
  name: 'Property List',
  render: (args) => <PropertyList {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Description List ────────────────────────────────────────────── */

function DescriptionList({ disabled = false }: { disabled?: boolean }) {
  return (
    <dl className={cn('grid gap-3 sm:grid-cols-[auto_1fr] max-w-sm', disabled && 'opacity-50')}>
      {[['Name', 'John Doe'], ['Email', 'john@co.com'], ['Role', 'Admin']].map(([t, d]) => (
        <React.Fragment key={t}>
          <dt className='text-sm font-medium text-muted-foreground'>{t}</dt>
          <dd className='text-sm'>{d}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

export const DescriptionListStory: StoryObj<typeof DescriptionList> = {
  name: 'Description List',
  render: (args) => <DescriptionList {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Empty State ─────────────────────────────────────────────────── */

function EmptyState({ title = 'No items', icon = 'inbox' }: { title?: string; icon?: 'inbox' | 'search' | 'error' }) {
  const icons: Record<string, string> = { inbox: '\u{1F4E5}', search: '\u{1F50D}', error: '\u26A0\uFE0F' };
  return (
    <div className='flex flex-col items-center rounded-lg border border-dashed p-8 text-center'>
      <span className='text-3xl mb-2'>{icons[icon]}</span>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='mt-2 text-sm text-muted-foreground'>Get started by creating your first item.</p>
      <button className='mt-4 h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground'>Create</button>
    </div>
  );
}

export const EmptyStateStory: StoryObj<typeof EmptyState> = {
  name: 'Empty State',
  render: (args) => <EmptyState {...args} />,
  args: { title: 'No items', icon: 'inbox' },
  argTypes: {
    title: { control: 'text' },
    icon: { control: 'select', options: ['inbox', 'search', 'error'] },
  },
};

/* ─── Stat Card ───────────────────────────────────────────────────── */

function StatCard({ value = '$45K', label = 'Revenue', trend = 'up' }: { value?: string; label?: string; trend?: 'up' | 'down' | 'neutral' }) {
  return (
    <div className='rounded-lg border p-4 max-w-[200px]'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      <p className='text-2xl font-bold mt-1'>{value}</p>
      <p className={cn(
        'text-xs font-medium',
        trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground',
      )}>
        {trend === 'up' ? '\u2191 +20%' : trend === 'down' ? '\u2193 -4%' : '\u2194 0%'}
      </p>
    </div>
  );
}

export const StatCardStory: StoryObj<typeof StatCard> = {
  name: 'Stat Card',
  render: (args) => <StatCard {...args} />,
  args: { value: '$45K', label: 'Revenue', trend: 'up' },
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
  },
};

/* ─── Kbd ─────────────────────────────────────────────────────────── */

function Kbd({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('space-y-2', disabled && 'opacity-50')}>
      {[['\u2318', 'K', 'Command palette'], ['Ctrl', 'S', 'Save'], ['Esc', '', 'Close']].map(([a, b, l]) => (
        <div key={l} className='flex items-center gap-2'>
          <kbd className='h-5 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground'>{a}</kbd>
          {b && <kbd className='h-5 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground'>{b}</kbd>}
          <span className='text-sm text-muted-foreground'>{l}</span>
        </div>
      ))}
    </div>
  );
}

export const KbdStory: StoryObj<typeof Kbd> = {
  name: 'Kbd',
  render: (args) => <Kbd {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Copy Button ─────────────────────────────────────────────────── */

function CopyButton({ disabled = false }: { disabled?: boolean }) {
  const [c, sc] = useState(false);
  return (
    <div className={cn('flex items-center gap-2', disabled && 'opacity-50 pointer-events-none')}>
      <code className='rounded bg-muted px-2 py-1 text-sm font-mono'>adhar-ui add button</code>
      <button
        onClick={() => { navigator.clipboard?.writeText('adhar-ui add button'); sc(true); setTimeout(() => sc(false), 2000); }}
        className='rounded-md p-2 hover:bg-accent'
      >
        {c ? <span className='text-green-500 text-sm'>&check;</span> : '\u{1F4CB}'}
      </button>
    </div>
  );
}

export const CopyButtonStory: StoryObj<typeof CopyButton> = {
  name: 'Copy Button',
  render: (args) => <CopyButton {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Command Bar ─────────────────────────────────────────────────── */

function CommandBar({ disabled = false }: { disabled?: boolean }) {
  const [o, so] = useState(false);
  return (
    <div className={cn(disabled && 'opacity-50 pointer-events-none')}>
      <button onClick={() => so(!o)} className='inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent'>\u2318K Search</button>
      {o && (
        <div className='mt-2 w-64 rounded-md border bg-popover shadow-md p-1'>
          <input placeholder='Command...' className='h-9 w-full bg-transparent px-2 text-sm outline-none' autoFocus />
          {['Open file', 'Run command', 'Search'].map((i) => (
            <div key={i} className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default' onClick={() => so(false)}>{i}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export const CommandBarStory: StoryObj<typeof CommandBar> = {
  name: 'Command Bar',
  render: (args) => <CommandBar {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Notification Center ─────────────────────────────────────────── */

function NotificationCenter({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('w-72 rounded-lg border shadow-md', disabled && 'opacity-50 pointer-events-none')}>
      <div className='flex items-center justify-between border-b px-4 py-3'>
        <h4 className='text-sm font-semibold'>Notifications</h4>
        <span className='rounded-full bg-primary px-1.5 text-xs text-primary-foreground'>3</span>
      </div>
      <div className='divide-y'>
        {[{ t: 'New comment', d: '5m ago', u: true }, { t: 'Build passed', d: '1h ago', u: true }, { t: 'Mention', d: '3h ago', u: false }].map((n) => (
          <div key={n.t} className={cn('px-4 py-3', n.u && 'bg-accent/40')}>
            <p className={cn('text-sm', n.u && 'font-medium')}>{n.t}</p>
            <p className='text-xs text-muted-foreground'>{n.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const NotificationCenterStory: StoryObj<typeof NotificationCenter> = {
  name: 'Notification Center',
  render: (args) => <NotificationCenter {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Infinite Scroll ─────────────────────────────────────────────── */

function InfiniteScroll({ disabled = false }: { disabled?: boolean }) {
  const [c, sc] = useState(5);
  return (
    <div className={cn('max-w-xs space-y-2', disabled && 'opacity-50 pointer-events-none')}>
      {Array.from({ length: c }, (_, i) => <div key={i} className='rounded-md border p-3 text-sm'>Item {i + 1}</div>)}
      {c < 15 && <button onClick={() => sc(c + 5)} className='w-full rounded-md border py-2 text-sm hover:bg-accent'>Load more</button>}
    </div>
  );
}

export const InfiniteScrollStory: StoryObj<typeof InfiniteScroll> = {
  name: 'Infinite Scroll',
  render: (args) => <InfiniteScroll {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

/* ─── Virtualized List ────────────────────────────────────────────── */

function VirtualizedList({ disabled = false }: { disabled?: boolean }) {
  return (
    <div className={cn('h-48 w-56 overflow-auto rounded-md border', disabled && 'opacity-50 pointer-events-none')}>
      {Array.from({ length: 100 }, (_, i) => <div key={i} className='border-b px-4 py-2 text-sm'>Row {i + 1}</div>)}
    </div>
  );
}

export const VirtualizedListStory: StoryObj<typeof VirtualizedList> = {
  name: 'Virtualized List',
  render: (args) => <VirtualizedList {...args} />,
  args: { disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
};

const meta: Meta = { title: 'Components/Enterprise' };
export default meta;
