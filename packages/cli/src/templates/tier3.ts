// deno-lint-ignore-file
/**
 * Tier 3: Enterprise + AI + Layout component templates.
 */

export const tier3Templates: Record<string, string> = {
  // ─── Enterprise ───────────────────────────────────────────────────────

  'data-table': `'use client'
import * as React from 'react'
import { type ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable, type SortingState, type ColumnFiltersState, type VisibilityState } from '@tanstack/react-table'
import { cn } from '@/lib/utils'

interface DataTableProps<TData, TValue> { columns: ColumnDef<TData, TValue>[]; data: TData[]; searchKey?: string }

function DataTable<TData, TValue>({ columns, data, searchKey }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(), onSortingChange: setSorting, onColumnFiltersChange: setColumnFilters, onColumnVisibilityChange: setColumnVisibility, onRowSelectionChange: setRowSelection, state: { sorting, columnFilters, columnVisibility, rowSelection } })

  return (
    <div className="w-full">
      {searchKey && <div className="flex items-center py-4"><input placeholder={\`Filter \${searchKey}...\`} value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''} onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)} className="max-w-sm flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>}
      <div className="rounded-md border">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">{table.getHeaderGroups().map(hg => <tr key={hg.id} className="border-b transition-colors hover:bg-muted/50">{hg.headers.map(h => <th key={h.id} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</th>)}</tr>)}</thead>
          <tbody className="[&_tr:last-child]:border-0">{table.getRowModel().rows?.length ? table.getRowModel().rows.map(r => <tr key={r.id} data-state={r.getIsSelected() && 'selected'} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">{r.getVisibleCells().map(c => <td key={c.id} className="p-4 align-middle">{flexRender(c.column.columnDef.cell, c.getContext())}</td>)}</tr>) : <tr><td colSpan={columns.length} className="h-24 text-center">No results.</td></tr>}</tbody>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.</div>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background h-9 px-3 hover:bg-accent disabled:opacity-50">Previous</button>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background h-9 px-3 hover:bg-accent disabled:opacity-50">Next</button>
      </div>
    </div>
  )
}

export { DataTable }
`,

  'form-builder': `'use client'
import * as React from 'react'
import { useForm, type DefaultValues, type FieldValues, type Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ZodObject, type ZodRawShape } from 'zod'
import { cn } from '@/lib/utils'

interface FormBuilderField { name: string; label: string; type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'switch'; placeholder?: string; description?: string; options?: { label: string; value: string }[] }

interface FormBuilderProps<T extends FieldValues> { schema: ZodObject<ZodRawShape>; fields: FormBuilderField[]; onSubmit: (data: T) => void; defaultValues?: DefaultValues<T>; submitLabel?: string; className?: string }

function FormBuilder<T extends FieldValues>({ schema, fields, onSubmit, defaultValues, submitLabel = 'Submit', className }: FormBuilderProps<T>) {
  const form = useForm<T>({ resolver: zodResolver(schema), defaultValues })
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      {fields.map(field => (
        <div key={field.name} className="space-y-2">
          <label className="text-sm font-medium leading-none">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea {...form.register(field.name as Path<T>)} placeholder={field.placeholder} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          ) : field.type === 'select' ? (
            <select {...form.register(field.name as Path<T>)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              {field.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          ) : field.type === 'checkbox' ? (
            <input type="checkbox" {...form.register(field.name as Path<T>)} className="h-4 w-4 rounded border-primary accent-primary" />
          ) : (
            <input type={field.type} {...form.register(field.name as Path<T>)} placeholder={field.placeholder} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          )}
          {field.description && <p className="text-sm text-muted-foreground">{field.description}</p>}
          {form.formState.errors[field.name as string] && <p className="text-sm font-medium text-destructive">{String(form.formState.errors[field.name as string]?.message)}</p>}
        </div>
      ))}
      <button type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">{submitLabel}</button>
    </form>
  )
}

export { FormBuilder, type FormBuilderField }
`,

  'file-upload': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface FileUploadProps { onFilesSelected?: (files: File[]) => void; accept?: string; multiple?: boolean; maxSize?: number; className?: string }

function FileUpload({ onFilesSelected, accept, multiple = true, maxSize = 10 * 1024 * 1024, className }: FileUploadProps) {
  const [dragOver, setDragOver] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const valid = Array.from(newFiles).filter(f => f.size <= maxSize)
    setFiles(prev => { const next = [...prev, ...valid]; onFilesSelected?.(next); return next })
  }

  const removeFile = (index: number) => setFiles(prev => { const next = prev.filter((_, i) => i !== index); onFilesSelected?.(next); return next })

  return (
    <div className={cn('space-y-4', className)}>
      <div className={cn('flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer', dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50')}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }} onClick={() => inputRef.current?.click()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 text-muted-foreground"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
        <p className="text-sm font-medium">Drag & drop files here, or click to browse</p>
        <p className="mt-1 text-xs text-muted-foreground">Max file size: {Math.round(maxSize / 1024 / 1024)}MB</p>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>
      {files.length > 0 && <div className="space-y-2">{files.map((f, i) => (
        <div key={i} className="flex items-center justify-between rounded-md border px-3 py-2">
          <div className="flex items-center gap-2 text-sm"><span className="font-medium">{f.name}</span><span className="text-muted-foreground">({(f.size / 1024).toFixed(1)} KB)</span></div>
          <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
        </div>
      ))}</div>}
    </div>
  )
}

export { FileUpload }
`,

  'timeline': `import * as React from 'react'
import { cn } from '@/lib/utils'

const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(({ className, ...props }, ref) => <ol ref={ref} className={cn('relative border-l border-muted-foreground/20 ml-3', className)} {...props} />)
Timeline.displayName = 'Timeline'

interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> { active?: boolean }
const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(({ className, active, ...props }, ref) => <li ref={ref} className={cn('mb-10 ml-6', className)} {...props} />)
TimelineItem.displayName = 'TimelineItem'

const TimelineDot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'destructive' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = { default: 'bg-muted-foreground', success: 'bg-green-500', destructive: 'bg-destructive' }
    return <div ref={ref} className={cn('absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-background', variants[variant], className)} {...props} />
  }
)
TimelineDot.displayName = 'TimelineDot'

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => <div ref={ref} className={cn('text-sm', className)} {...props} />)
TimelineContent.displayName = 'TimelineContent'

const TimelineTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => <h3 ref={ref} className={cn('font-semibold', className)} {...props} />)
TimelineTitle.displayName = 'TimelineTitle'

const TimelineDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => <p ref={ref} className={cn('text-muted-foreground', className)} {...props} />)
TimelineDescription.displayName = 'TimelineDescription'

export { Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineTitle, TimelineDescription }
`,

  'tree-view': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface TreeNode { id: string; label: string; children?: TreeNode[]; icon?: React.ReactNode }
interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> { data: TreeNode[]; onSelect?: (node: TreeNode) => void }

function TreeView({ data, onSelect, className, ...props }: TreeViewProps) {
  return <div className={cn('text-sm', className)} role="tree" {...props}>{data.map(n => <TreeItem key={n.id} node={n} level={0} onSelect={onSelect} />)}</div>
}

function TreeItem({ node, level, onSelect }: { node: TreeNode; level: number; onSelect?: (n: TreeNode) => void }) {
  const [open, setOpen] = React.useState(false)
  const hasChildren = node.children && node.children.length > 0
  return (
    <div role="treeitem" aria-expanded={hasChildren ? open : undefined}>
      <button type="button" className={cn('flex w-full items-center gap-1.5 rounded-sm px-2 py-1 hover:bg-accent hover:text-accent-foreground', \`pl-\${level * 4 + 2}\`)} onClick={() => { if (hasChildren) setOpen(!open); onSelect?.(node) }}>
        {hasChildren && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn('shrink-0 transition-transform', open && 'rotate-90')}><path d="m9 18 6-6-6-6"/></svg>}
        {!hasChildren && <span className="w-[14px]" />}
        {node.icon}
        <span>{node.label}</span>
      </button>
      {open && hasChildren && <div role="group">{node.children!.map(c => <TreeItem key={c.id} node={c} level={level + 1} onSelect={onSelect} />)}</div>}
    </div>
  )
}

export { TreeView, type TreeNode }
`,

  'stepper': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> { activeStep: number; orientation?: 'horizontal' | 'vertical' }

function Stepper({ activeStep, orientation = 'horizontal', className, children, ...props }: StepperProps) {
  return (
    <div className={cn('flex gap-2', orientation === 'vertical' ? 'flex-col' : 'flex-row items-center', className)} {...props}>
      {React.Children.map(children, (child, index) => React.isValidElement(child) ? React.cloneElement(child as any, { 'data-step': index, 'data-active': index === activeStep, 'data-completed': index < activeStep }) : child)}
    </div>
  )
}

function StepperItem({ className, children, 'data-step': step, 'data-active': active, 'data-completed': completed, ...props }: React.HTMLAttributes<HTMLDivElement> & { 'data-step'?: number; 'data-active'?: boolean; 'data-completed'?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <div className={cn('flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors', active ? 'border-primary bg-primary text-primary-foreground' : completed ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30 text-muted-foreground')}>
        {completed ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg> : (step ?? 0) + 1}
      </div>
      <div className="flex flex-col"><span className={cn('text-sm font-medium', active ? 'text-foreground' : 'text-muted-foreground')}>{children}</span></div>
    </div>
  )
}

export { Stepper, StepperItem }
`,

  'multi-select': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface MultiSelectProps { options: { value: string; label: string }[]; value?: string[]; onValueChange?: (value: string[]) => void; placeholder?: string; className?: string }

function MultiSelect({ options, value = [], onValueChange, placeholder = 'Select items...', className }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => { if (!open) return; const h = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h) }, [open])
  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
  const toggle = (v: string) => { const next = value.includes(v) ? value.filter(x => x !== v) : [...value, v]; onValueChange?.(next) }
  const remove = (v: string) => onValueChange?.(value.filter(x => x !== v))

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="flex min-h-10 flex-wrap items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm cursor-pointer" onClick={() => setOpen(!open)}>
        {value.map(v => { const opt = options.find(o => o.value === v); return opt && (
          <span key={v} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold">{opt.label}<button type="button" onClick={(e) => { e.stopPropagation(); remove(v) }} className="hover:text-destructive">&times;</button></span>
        )})}
        {value.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
      </div>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="flex h-9 w-full bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground" />
          <div className="max-h-60 overflow-auto">{filtered.map(o => (
            <div key={o.value} onClick={() => toggle(o.value)} className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent', value.includes(o.value) && 'bg-accent/50')}>
              <span className={cn('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary', value.includes(o.value) ? 'bg-primary text-primary-foreground' : 'opacity-50')}>{value.includes(o.value) && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>}</span>
              {o.label}
            </div>
          ))}</div>
        </div>
      )}
    </div>
  )
}

export { MultiSelect }
`,

  'empty-state': `import * as React from 'react'
import { cn } from '@/lib/utils'

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> { icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode }

function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center', className)} {...props}>
      {icon && <div className="mb-4 text-muted-foreground [&>svg]:h-12 [&>svg]:w-12">{icon}</div>}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export { EmptyState }
`,

  'stat-card': `import * as React from 'react'
import { cn } from '@/lib/utils'

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> { title: string; value: string | number; description?: string; trend?: 'up' | 'down' | 'neutral'; change?: string; icon?: React.ReactNode }

function StatCard({ title, value, description, trend, change, icon, className, ...props }: StatCardProps) {
  const trendColor = { up: 'text-green-600', down: 'text-red-600', neutral: 'text-muted-foreground' }
  const trendIcon = { up: '↑', down: '↓', neutral: '→' }
  return (
    <div className={cn('rounded-lg border bg-card p-6 text-card-foreground shadow-sm', className)} {...props}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
        {trend && change && <span className={cn('text-sm font-medium', trendColor[trend])}>{trendIcon[trend]} {change}</span>}
      </div>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}

export { StatCard }
`,

  'kbd': `import { cn } from '@/lib/utils'

function Kbd({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <kbd className={cn('pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground', className)} {...props}>{children}</kbd>
}

export { Kbd }
`,

  'copy-button': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { value: string; copyMessage?: string }

function CopyButton({ value, copyMessage = 'Copied!', className, ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button type="button" onClick={copy} className={cn('inline-flex items-center justify-center rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors', className)} {...props}>
      {copied ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500"><path d="M20 6 9 17l-5-5"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>}
      <span className="sr-only">{copied ? copyMessage : 'Copy'}</span>
    </button>
  )
}

export { CopyButton }
`,

  'transfer-list': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface TransferItem { id: string; label: string }
interface TransferListProps { available: TransferItem[]; selected: TransferItem[]; onTransfer: (selected: TransferItem[], available: TransferItem[]) => void; className?: string }

function TransferList({ available: initAvail, selected: initSel, onTransfer, className }: TransferListProps) {
  const [leftChecked, setLeftChecked] = React.useState<Set<string>>(new Set())
  const [rightChecked, setRightChecked] = React.useState<Set<string>>(new Set())
  const [leftSearch, setLeftSearch] = React.useState('')
  const [rightSearch, setRightSearch] = React.useState('')

  const moveRight = () => { const toMove = initAvail.filter(i => leftChecked.has(i.id)); onTransfer([...initSel, ...toMove], initAvail.filter(i => !leftChecked.has(i.id))); setLeftChecked(new Set()) }
  const moveLeft = () => { const toMove = initSel.filter(i => rightChecked.has(i.id)); onTransfer(initSel.filter(i => !rightChecked.has(i.id)), [...initAvail, ...toMove]); setRightChecked(new Set()) }

  const Panel = ({ items, checked, setChecked, search, setSearch, title }: any) => (
    <div className="flex-1 rounded-md border">
      <div className="border-b p-2"><h4 className="text-sm font-medium">{title} ({items.length})</h4><input value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder="Search..." className="mt-1 flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm" /></div>
      <div className="max-h-60 overflow-auto p-1">{items.filter((i: any) => i.label.toLowerCase().includes(search.toLowerCase())).map((i: any) => (
        <label key={i.id} className="flex items-center gap-2 rounded-sm px-2 py-1 hover:bg-accent cursor-pointer text-sm"><input type="checkbox" checked={checked.has(i.id)} onChange={() => { const n = new Set(checked); n.has(i.id) ? n.delete(i.id) : n.add(i.id); setChecked(n) }} className="h-4 w-4 rounded accent-primary" />{i.label}</label>
      ))}</div>
    </div>
  )

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Panel items={initAvail} checked={leftChecked} setChecked={setLeftChecked} search={leftSearch} setSearch={setLeftSearch} title="Available" />
      <div className="flex flex-col gap-1">
        <button type="button" onClick={moveRight} disabled={leftChecked.size === 0} className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm hover:bg-accent disabled:opacity-50">&rarr;</button>
        <button type="button" onClick={moveLeft} disabled={rightChecked.size === 0} className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm hover:bg-accent disabled:opacity-50">&larr;</button>
      </div>
      <Panel items={initSel} checked={rightChecked} setChecked={setRightChecked} search={rightSearch} setSearch={setRightSearch} title="Selected" />
    </div>
  )
}

export { TransferList, type TransferItem }
`,

  'rich-text-editor': `'use client'
import * as React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '@/lib/utils'

interface RichTextEditorProps { value?: string; onChange?: (html: string) => void; placeholder?: string; className?: string }

function RichTextEditor({ value, onChange, placeholder = 'Start writing...', className }: RichTextEditorProps) {
  const editor = useEditor({ extensions: [StarterKit, Placeholder.configure({ placeholder })], content: value, onUpdate: ({ editor: e }) => onChange?.(e.getHTML()) })
  if (!editor) return null
  return (
    <div className={cn('rounded-md border', className)}>
      <div className="flex flex-wrap gap-1 border-b p-1">
        {[{ cmd: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), label: 'B', style: 'font-bold' },
          { cmd: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), label: 'I', style: 'italic' },
          { cmd: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), label: 'S', style: 'line-through' },
          { cmd: () => editor.chain().focus().toggleCode().run(), active: editor.isActive('code'), label: '<>', style: 'font-mono text-xs' },
          { cmd: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), label: 'H2', style: 'font-bold' },
          { cmd: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), label: '• List', style: '' },
          { cmd: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), label: '1. List', style: '' },
          { cmd: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), label: '" Quote', style: '' },
          { cmd: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock'), label: 'Code', style: 'font-mono text-xs' },
        ].map((b, i) => <button key={i} type="button" onClick={b.cmd} className={cn('inline-flex items-center justify-center rounded px-2 py-1 text-sm hover:bg-accent', b.active && 'bg-accent text-accent-foreground', b.style)}>{b.label}</button>)}
      </div>
      <EditorContent editor={editor} className="prose prose-sm dark:prose-invert max-w-none p-4 focus:outline-none min-h-[150px] [&_.ProseMirror]:outline-none" />
    </div>
  )
}

export { RichTextEditor }
`,

  'kanban-board': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface KanbanCard { id: string; title: string; description?: string; [key: string]: any }
interface KanbanColumn { id: string; title: string; cards: KanbanCard[] }
interface KanbanBoardProps { columns: KanbanColumn[]; onCardMove?: (cardId: string, fromColumn: string, toColumn: string) => void; renderCard?: (card: KanbanCard) => React.ReactNode; className?: string }

function KanbanBoard({ columns, onCardMove, renderCard, className }: KanbanBoardProps) {
  const [dragCard, setDragCard] = React.useState<{ cardId: string; fromColumn: string } | null>(null)
  const [dragOver, setDragOver] = React.useState<string | null>(null)

  return (
    <div className={cn('flex gap-4 overflow-x-auto p-1', className)}>
      {columns.map(col => (
        <div key={col.id} className={cn('flex w-72 shrink-0 flex-col rounded-lg bg-muted/50 p-2', dragOver === col.id && 'ring-2 ring-primary/50')}
          onDragOver={(e) => { e.preventDefault(); setDragOver(col.id) }} onDragLeave={() => setDragOver(null)}
          onDrop={() => { if (dragCard && dragCard.fromColumn !== col.id) { onCardMove?.(dragCard.cardId, dragCard.fromColumn, col.id) }; setDragCard(null); setDragOver(null) }}>
          <h3 className="mb-2 flex items-center justify-between px-2 py-1 text-sm font-semibold">{col.title}<span className="rounded-full bg-muted px-2 py-0.5 text-xs">{col.cards.length}</span></h3>
          <div className="flex flex-col gap-2">{col.cards.map(card => (
            <div key={card.id} draggable onDragStart={() => setDragCard({ cardId: card.id, fromColumn: col.id })} className="cursor-grab rounded-md border bg-card p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing">
              {renderCard ? renderCard(card) : <><p className="text-sm font-medium">{card.title}</p>{card.description && <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>}</>}
            </div>
          ))}</div>
        </div>
      ))}
    </div>
  )
}

export { KanbanBoard, type KanbanColumn, type KanbanCard }
`,

  // ─── AI Components ────────────────────────────────────────────────────

  'chat': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface ChatMessage { id: string; role: 'user' | 'assistant' | 'system'; content: string; timestamp?: Date }
interface ChatProps { messages: ChatMessage[]; onSendMessage?: (content: string) => void; isLoading?: boolean; className?: string }

function Chat({ messages, onSendMessage, isLoading, className }: ChatProps) {
  const [input, setInput] = React.useState('')
  const bottomRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  const send = () => { if (!input.trim()) return; onSendMessage?.(input.trim()); setInput('') }
  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={cn('flex gap-3', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div className={cn('max-w-[80%] rounded-lg px-4 py-2 text-sm', m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>{m.content}</div>
          </div>
        ))}
        {isLoading && <div className="flex gap-3"><div className="bg-muted rounded-lg px-4 py-2 text-sm"><span className="inline-flex gap-1"><span className="animate-bounce">●</span><span className="animate-bounce" style={{ animationDelay: '0.1s' }}>●</span><span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span></span></div></div>}
        <div ref={bottomRef} />
      </div>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} placeholder="Type a message..." rows={1}
            className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <button type="button" onClick={send} disabled={!input.trim() || isLoading} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export { Chat, type ChatMessage }
`,

  'prompt-input': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface PromptInputProps { onSubmit?: (value: string) => void; placeholder?: string; disabled?: boolean; maxLength?: number; className?: string }

function PromptInput({ onSubmit, placeholder = 'Ask anything...', disabled, maxLength, className }: PromptInputProps) {
  const [value, setValue] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  React.useEffect(() => { if (textareaRef.current) { textareaRef.current.style.height = 'auto'; textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px' } }, [value])
  const submit = () => { if (!value.trim() || disabled) return; onSubmit?.(value.trim()); setValue('') }
  return (
    <div className={cn('relative rounded-lg border bg-background', className)}>
      <textarea ref={textareaRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
        placeholder={placeholder} disabled={disabled} maxLength={maxLength} rows={1}
        className="w-full resize-none bg-transparent px-4 py-3 pr-12 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed" />
      <div className="absolute bottom-2 right-2 flex items-center gap-2">
        {maxLength && <span className="text-xs text-muted-foreground">{value.length}/{maxLength}</span>}
        <button type="button" onClick={submit} disabled={!value.trim() || disabled}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  )
}

export { PromptInput }
`,

  'streaming-text': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface StreamingTextProps { content: string; speed?: number; className?: string; onComplete?: () => void }

function StreamingText({ content, speed = 20, className, onComplete }: StreamingTextProps) {
  const [displayed, setDisplayed] = React.useState('')
  const [done, setDone] = React.useState(false)
  React.useEffect(() => { setDisplayed(''); setDone(false); let i = 0; const timer = setInterval(() => { if (i < content.length) { setDisplayed(content.slice(0, i + 1)); i++ } else { clearInterval(timer); setDone(true); onComplete?.() } }, speed); return () => clearInterval(timer) }, [content, speed, onComplete])
  return <div className={cn('text-sm whitespace-pre-wrap', className)}>{displayed}{!done && <span className="animate-pulse">▊</span>}</div>
}

export { StreamingText }
`,

  'code-block': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface CodeBlockProps { code: string; language?: string; filename?: string; showLineNumbers?: boolean; className?: string }

function CodeBlock({ code, language = 'plaintext', filename, showLineNumbers = true, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const copy = async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const lines = code.split('\\n')
  return (
    <div className={cn('rounded-lg border bg-zinc-950 text-zinc-50', className)}>
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
          <span className="text-xs text-zinc-400">{filename || language}</span>
          <button type="button" onClick={copy} className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors">{copied ? 'Copied!' : 'Copy'}</button>
        </div>
      )}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed"><code>{lines.map((line, i) => (
          <div key={i} className="table-row">{showLineNumbers && <span className="table-cell select-none pr-4 text-right text-zinc-600">{i + 1}</span>}<span className="table-cell">{line}</span></div>
        ))}</code></pre>
      </div>
    </div>
  )
}

export { CodeBlock }
`,

  'model-selector': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface Model { id: string; name: string; provider: string; capabilities?: string[] }
interface ModelSelectorProps { models: Model[]; value?: string; onValueChange?: (modelId: string) => void; className?: string }

function ModelSelector({ models, value, onValueChange, className }: ModelSelectorProps) {
  return (
    <select value={value} onChange={(e) => onValueChange?.(e.target.value)}
      className={cn('flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring', className)}>
      {models.map(m => <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>)}
    </select>
  )
}

export { ModelSelector, type Model }
`,

  'token-counter': `import { cn } from '@/lib/utils'

interface TokenCounterProps { used: number; total: number; warningThreshold?: number; className?: string }

function TokenCounter({ used, total, warningThreshold = 0.8, className }: TokenCounterProps) {
  const pct = total > 0 ? used / total : 0
  const isWarning = pct >= warningThreshold
  return (
    <div className={cn('flex items-center gap-2 text-xs', className)}>
      <div className="h-2 w-20 overflow-hidden rounded-full bg-secondary">
        <div className={cn('h-full transition-all', isWarning ? 'bg-destructive' : 'bg-primary')} style={{ width: \`\${Math.min(pct * 100, 100)}%\` }} />
      </div>
      <span className={cn('tabular-nums', isWarning ? 'text-destructive' : 'text-muted-foreground')}>{used.toLocaleString()} / {total.toLocaleString()}</span>
    </div>
  )
}

export { TokenCounter }
`,

  'thinking-indicator': `import { cn } from '@/lib/utils'

interface ThinkingIndicatorProps { text?: string; className?: string }

function ThinkingIndicator({ text = 'Thinking', className }: ThinkingIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: '150ms' }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: '300ms' }} />
      </div>
      <span>{text}</span>
    </div>
  )
}

export { ThinkingIndicator }
`,

  'feedback-buttons': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface FeedbackButtonsProps { onLike?: () => void; onDislike?: () => void; liked?: boolean | null; className?: string }

function FeedbackButtons({ onLike, onDislike, liked, className }: FeedbackButtonsProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <button type="button" onClick={onLike} className={cn('inline-flex items-center justify-center rounded-md p-1.5 transition-colors hover:bg-accent', liked === true && 'text-green-500')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked === true ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
      </button>
      <button type="button" onClick={onDislike} className={cn('inline-flex items-center justify-center rounded-md p-1.5 transition-colors hover:bg-accent', liked === false && 'text-red-500')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked === false ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>
      </button>
    </div>
  )
}

export { FeedbackButtons }
`,

  'suggestion-chips': `import { cn } from '@/lib/utils'

interface SuggestionChipsProps { suggestions: string[]; onSelect?: (suggestion: string) => void; className?: string }

function SuggestionChips({ suggestions, onSelect, className }: SuggestionChipsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {suggestions.map((s, i) => (
        <button key={i} type="button" onClick={() => onSelect?.(s)}
          className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
          {s}
        </button>
      ))}
    </div>
  )
}

export { SuggestionChips }
`,

  'message-bubble': `import * as React from 'react'
import { cn } from '@/lib/utils'

interface MessageBubbleProps { role: 'user' | 'assistant'; content: string; avatar?: string; timestamp?: Date; className?: string; children?: React.ReactNode }

function MessageBubble({ role, content, avatar, timestamp, className, children }: MessageBubbleProps) {
  return (
    <div className={cn('flex gap-3', role === 'user' ? 'flex-row-reverse' : 'flex-row', className)}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
        {avatar || (role === 'user' ? 'U' : 'AI')}
      </div>
      <div className={cn('flex max-w-[80%] flex-col gap-1', role === 'user' ? 'items-end' : 'items-start')}>
        <div className={cn('rounded-lg px-4 py-2 text-sm', role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
          {content}
          {children}
        </div>
        {timestamp && <time className="text-xs text-muted-foreground">{timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>}
      </div>
    </div>
  )
}

export { MessageBubble }
`,

  // ─── Layout ───────────────────────────────────────────────────────────

  'responsive-sidebar': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveSidebarProps extends React.HTMLAttributes<HTMLDivElement> { breakpoint?: number }

function ResponsiveSidebar({ breakpoint = 768, className, children, ...props }: ResponsiveSidebarProps) {
  const [isMobile, setIsMobile] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => { const mq = window.matchMedia(\`(max-width: \${breakpoint}px)\`); setIsMobile(mq.matches); const h = (e: MediaQueryListEvent) => setIsMobile(e.matches); mq.addEventListener('change', h); return () => mq.removeEventListener('change', h) }, [breakpoint])
  if (isMobile) return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed left-4 top-4 z-40 rounded-md border bg-background p-2 shadow-sm lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
      {open && <div className="fixed inset-0 z-50"><div className="fixed inset-0 bg-black/80" onClick={() => setOpen(false)} /><aside className={cn('fixed inset-y-0 left-0 z-50 w-72 border-r bg-background p-4', className)} {...props}>{children}</aside></div>}
    </>
  )
  return <aside className={cn('h-full w-64 shrink-0 border-r bg-background p-4', className)} {...props}>{children}</aside>
}

export { ResponsiveSidebar }
`,

  'bottom-sheet': `'use client'
import { Drawer as DrawerPrimitive } from 'vaul'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface BottomSheetProps { open?: boolean; onOpenChange?: (open: boolean) => void; snapPoints?: (string | number)[]; children?: React.ReactNode }

function BottomSheet({ open, onOpenChange, snapPoints = ['400px', 1], children }: BottomSheetProps) {
  return (
    <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange} snapPoints={snapPoints}>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl border bg-background">
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
          <div className="p-4">{children}</div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  )
}

const BottomSheetTrigger = DrawerPrimitive.Trigger

export { BottomSheet, BottomSheetTrigger }
`,

  'split-view': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface SplitViewProps extends React.HTMLAttributes<HTMLDivElement> { direction?: 'horizontal' | 'vertical'; defaultSizes?: [number, number] }

function SplitView({ direction = 'horizontal', defaultSizes = [50, 50], className, children, ...props }: SplitViewProps) {
  const childArray = React.Children.toArray(children)
  return (
    <div className={cn('flex h-full w-full', direction === 'vertical' ? 'flex-col' : 'flex-row', className)} {...props}>
      <div style={{ flexBasis: \`\${defaultSizes[0]}%\` }} className="overflow-auto">{childArray[0]}</div>
      <div className={cn('shrink-0 bg-border', direction === 'vertical' ? 'h-px w-full' : 'h-full w-px')} />
      <div style={{ flexBasis: \`\${defaultSizes[1]}%\` }} className="overflow-auto">{childArray[1]}</div>
    </div>
  )
}

export { SplitView }
`,

  // ─── Data View Components ─────────────────────────────────────────────

  'list-view': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ListViewItem { id: string; [key: string]: any }

export interface ListViewProps<T extends ListViewItem> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  onItemClick?: (item: T) => void
  selectedId?: string
  emptyMessage?: string
  searchable?: boolean
  searchPlaceholder?: string
  className?: string
}

function ListView<T extends ListViewItem>({ items, renderItem, onItemClick, selectedId, emptyMessage = 'No items found', searchable, searchPlaceholder = 'Search...', className }: ListViewProps<T>) {
  const [search, setSearch] = React.useState('')
  const filtered = searchable ? items.filter(item => JSON.stringify(item).toLowerCase().includes(search.toLowerCase())) : items
  return (
    <div className={cn('flex flex-col', className)}>
      {searchable && <div className="border-b p-2"><input value={search} onChange={e => setSearch(e.target.value)} placeholder={searchPlaceholder} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" /></div>}
      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? <div className="flex items-center justify-center p-8 text-sm text-muted-foreground">{emptyMessage}</div> :
          filtered.map((item, i) => (
            <div key={item.id} onClick={() => onItemClick?.(item)} className={cn('border-b px-4 py-3 cursor-pointer transition-colors hover:bg-accent', selectedId === item.id && 'bg-accent', onItemClick && 'cursor-pointer')}>
              {renderItem(item, i)}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export { ListView }
`,

  'grid-view': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface GridViewItem { id: string; [key: string]: any }

export interface GridViewProps<T extends GridViewItem> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  columns?: { default: number; sm?: number; md?: number; lg?: number; xl?: number }
  gap?: 'sm' | 'md' | 'lg'
  emptyMessage?: string
  className?: string
}

function GridView<T extends GridViewItem>({ items, renderItem, columns = { default: 1, sm: 2, md: 3, lg: 4 }, gap = 'md', emptyMessage = 'No items found', className }: GridViewProps<T>) {
  const gapClass = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' }[gap]
  const colClass = \`grid-cols-\${columns.default} \${columns.sm ? \`sm:grid-cols-\${columns.sm}\` : ''} \${columns.md ? \`md:grid-cols-\${columns.md}\` : ''} \${columns.lg ? \`lg:grid-cols-\${columns.lg}\` : ''} \${columns.xl ? \`xl:grid-cols-\${columns.xl}\` : ''}\`

  if (items.length === 0) return <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-sm text-muted-foreground">{emptyMessage}</div>

  return <div className={cn('grid', gapClass, colClass, className)}>{items.map(item => <div key={item.id}>{renderItem(item)}</div>)}</div>
}

export { GridView }
`,

  'detail-view': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DetailField { label: string; value: React.ReactNode; span?: 1 | 2; copyable?: boolean }
export interface DetailSection { title: string; fields: DetailField[] }

export interface DetailViewProps {
  title?: string
  sections: DetailSection[]
  actions?: React.ReactNode
  className?: string
}

function DetailView({ title, sections, actions, className }: DetailViewProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between">
          {title && <h2 className="text-xl font-semibold tracking-tight">{title}</h2>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {sections.map((section, si) => (
        <div key={si} className="rounded-lg border bg-card">
          <div className="border-b px-6 py-3"><h3 className="text-sm font-semibold">{section.title}</h3></div>
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
            {section.fields.map((field, fi) => (
              <div key={fi} className={cn('bg-card px-6 py-4', field.span === 2 && 'sm:col-span-2')}>
                <dt className="text-sm font-medium text-muted-foreground">{field.label}</dt>
                <dd className="mt-1 text-sm">{field.value}</dd>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export { DetailView }
`,

  'master-detail': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MasterDetailProps {
  master: React.ReactNode
  detail: React.ReactNode
  masterWidth?: string
  showDetail?: boolean
  onBack?: () => void
  breakpoint?: number
  className?: string
}

function MasterDetail({ master, detail, masterWidth = '320px', showDetail = false, onBack, breakpoint = 768, className }: MasterDetailProps) {
  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia(\`(max-width: \${breakpoint}px)\`)
    setIsMobile(mq.matches)
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [breakpoint])

  if (isMobile) {
    return (
      <div className={cn('h-full', className)}>
        {showDetail ? (
          <div className="h-full flex flex-col">
            <div className="border-b p-2">
              <button type="button" onClick={onBack} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm hover:bg-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                Back
              </button>
            </div>
            <div className="flex-1 overflow-auto">{detail}</div>
          </div>
        ) : (
          <div className="h-full overflow-auto">{master}</div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex h-full', className)}>
      <div className="border-r overflow-auto" style={{ width: masterWidth, minWidth: masterWidth }}>{master}</div>
      <div className="flex-1 overflow-auto">{detail}</div>
    </div>
  )
}

export { MasterDetail }
`,

  'data-grid': `'use client'
import * as React from 'react'
import { type ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, useReactTable, type SortingState } from '@tanstack/react-table'
import { cn } from '@/lib/utils'

interface DataGridProps<TData, TValue> { columns: ColumnDef<TData, TValue>[]; data: TData[]; editable?: boolean; onCellEdit?: (rowIndex: number, columnId: string, value: unknown) => void; className?: string }

function DataGrid<TData, TValue>({ columns, data, editable, onCellEdit, className }: DataGridProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(), onSortingChange: setSorting, state: { sorting } })

  return (
    <div className={cn('w-full overflow-auto rounded-md border', className)}>
      <table className="w-full text-sm">
        <thead className="bg-muted/50">{table.getHeaderGroups().map(hg => <tr key={hg.id}>{hg.headers.map(h => <th key={h.id} className="h-10 px-3 text-left font-medium text-muted-foreground cursor-pointer select-none hover:bg-muted" onClick={h.column.getToggleSortingHandler()}>{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}{h.column.getIsSorted() === 'asc' ? ' ↑' : h.column.getIsSorted() === 'desc' ? ' ↓' : ''}</th>)}</tr>)}</thead>
        <tbody>{table.getRowModel().rows.map(r => <tr key={r.id} className="border-t hover:bg-muted/30">{r.getVisibleCells().map(c => <td key={c.id} className="px-3 py-2">{flexRender(c.column.columnDef.cell, c.getContext())}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export { DataGrid }
`,

  'property-list': `import * as React from 'react'
import { cn } from '@/lib/utils'

export interface PropertyItem { label: string; value: React.ReactNode; copyable?: boolean }

function PropertyList({ items, className }: { items: PropertyItem[]; className?: string }) {
  return (
    <div className={cn('divide-y rounded-lg border', className)}>
      {items.map((item, i) => (
        <div key={i} className="flex items-start justify-between gap-4 px-4 py-3">
          <dt className="text-sm font-medium text-muted-foreground whitespace-nowrap">{item.label}</dt>
          <dd className="text-sm text-right">{item.value}</dd>
        </div>
      ))}
    </div>
  )
}

export { PropertyList }
`,

  'description-list': `import * as React from 'react'
import { cn } from '@/lib/utils'

const DescriptionList = React.forwardRef<HTMLDListElement, React.HTMLAttributes<HTMLDListElement>>(
  ({ className, ...props }, ref) => <dl ref={ref} className={cn('grid gap-3 sm:grid-cols-[auto_1fr]', className)} {...props} />
)
DescriptionList.displayName = 'DescriptionList'

const DescriptionTerm = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => <dt ref={ref} className={cn('text-sm font-medium text-muted-foreground', className)} {...props} />
)
DescriptionTerm.displayName = 'DescriptionTerm'

const DescriptionDetail = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => <dd ref={ref} className={cn('text-sm', className)} {...props} />
)
DescriptionDetail.displayName = 'DescriptionDetail'

export { DescriptionList, DescriptionTerm, DescriptionDetail }
`,

  'sortable-list': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SortableItem { id: string; [key: string]: any }

function SortableList<T extends SortableItem>({ items, onReorder, renderItem, className }: { items: T[]; onReorder?: (items: T[]) => void; renderItem: (item: T, index: number) => React.ReactNode; className?: string }) {
  const [dragIdx, setDragIdx] = React.useState<number | null>(null)
  const [overIdx, setOverIdx] = React.useState<number | null>(null)

  const handleDragEnd = () => {
    if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx && onReorder) {
      const next = [...items]
      const [moved] = next.splice(dragIdx, 1)
      next.splice(overIdx, 0, moved)
      onReorder(next)
    }
    setDragIdx(null)
    setOverIdx(null)
  }

  return (
    <div className={cn('space-y-1', className)}>
      {items.map((item, i) => (
        <div key={item.id} draggable onDragStart={() => setDragIdx(i)} onDragOver={(e) => { e.preventDefault(); setOverIdx(i) }} onDragEnd={handleDragEnd}
          className={cn('flex items-center gap-2 rounded-md border bg-card p-3 cursor-grab active:cursor-grabbing transition-colors', dragIdx === i && 'opacity-50', overIdx === i && dragIdx !== i && 'border-primary')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted-foreground"><circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/></svg>
          <div className="flex-1">{renderItem(item, i)}</div>
        </div>
      ))}
    </div>
  )
}

export { SortableList }
`,

  'infinite-scroll': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  onLoadMore: () => void | Promise<void>
  hasMore: boolean
  loading?: boolean
  loader?: React.ReactNode
  endMessage?: React.ReactNode
  threshold?: number
}

function InfiniteScroll({ onLoadMore, hasMore, loading, loader, endMessage, threshold = 100, className, children, ...props }: InfiniteScrollProps) {
  const sentinelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!hasMore || loading) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) onLoadMore() }, { rootMargin: \`\${threshold}px\` })
    if (sentinelRef.current) observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore, threshold])

  return (
    <div className={cn(className)} {...props}>
      {children}
      <div ref={sentinelRef} />
      {loading && (loader || <div className="flex justify-center py-4"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>)}
      {!hasMore && endMessage}
    </div>
  )
}

export { InfiniteScroll }
`,

  'virtualized-list': `'use client'
import * as React from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cn } from '@/lib/utils'

interface VirtualizedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  estimateSize?: number
  className?: string
  overscan?: number
}

function VirtualizedList<T>({ items, renderItem, estimateSize = 40, className, overscan = 5 }: VirtualizedListProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({ count: items.length, getScrollElement: () => parentRef.current, estimateSize: () => estimateSize, overscan })

  return (
    <div ref={parentRef} className={cn('overflow-auto', className)}>
      <div style={{ height: \`\${virtualizer.getTotalSize()}px\`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(vRow => (
          <div key={vRow.key} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: \`\${vRow.size}px\`, transform: \`translateY(\${vRow.start}px)\` }}>
            {renderItem(items[vRow.index], vRow.index)}
          </div>
        ))}
      </div>
    </div>
  )
}

export { VirtualizedList }
`,

  'command-bar': `'use client'
import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '@/lib/utils'

interface CommandBarProps { open?: boolean; onOpenChange?: (open: boolean) => void; placeholder?: string; children?: React.ReactNode; className?: string }

function CommandBar({ open, onOpenChange, placeholder = 'Type a command or search...', children, className }: CommandBarProps) {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => { if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onOpenChange?.(!open) } }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
      <CommandPrimitive className={cn('relative z-50 w-full max-w-lg overflow-hidden rounded-xl border bg-popover shadow-2xl', className)}>
        <div className="flex items-center border-b px-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 shrink-0 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <CommandPrimitive.Input placeholder={placeholder} className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground" />
        </div>
        <CommandPrimitive.List className="max-h-[300px] overflow-y-auto p-2">{children}</CommandPrimitive.List>
      </CommandPrimitive>
    </div>
  )
}

export { CommandBar }
`,

  'notification-center': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface Notification { id: string; title: string; description?: string; time: string; read: boolean; avatar?: string }

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkRead?: (id: string) => void
  onMarkAllRead?: () => void
  onClear?: (id: string) => void
  className?: string
}

function NotificationCenter({ notifications, onMarkRead, onMarkAllRead, onClear, className }: NotificationCenterProps) {
  const unread = notifications.filter(n => !n.read).length
  return (
    <div className={cn('w-80 rounded-lg border bg-popover shadow-md', className)}>
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2"><h4 className="text-sm font-semibold">Notifications</h4>{unread > 0 && <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-primary-foreground">{unread}</span>}</div>
        {unread > 0 && <button type="button" onClick={onMarkAllRead} className="text-xs text-muted-foreground hover:text-foreground">Mark all read</button>}
      </div>
      <div className="max-h-80 overflow-auto">
        {notifications.length === 0 ? <p className="p-8 text-center text-sm text-muted-foreground">No notifications</p> :
          notifications.map(n => (
            <div key={n.id} onClick={() => !n.read && onMarkRead?.(n.id)} className={cn('flex gap-3 border-b px-4 py-3 transition-colors hover:bg-accent cursor-pointer', !n.read && 'bg-accent/50')}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs">{n.avatar || n.title[0]}</div>
              <div className="flex-1 min-w-0"><p className={cn('text-sm truncate', !n.read && 'font-medium')}>{n.title}</p>{n.description && <p className="text-xs text-muted-foreground truncate">{n.description}</p>}<p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p></div>
              <button type="button" onClick={(e) => { e.stopPropagation(); onClear?.(n.id) }} className="shrink-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100">&times;</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export { NotificationCenter, type Notification }
`,

  'tag-input': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface TagInputProps {
  value?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  max?: number
  suggestions?: string[]
  className?: string
}

function TagInput({ value = [], onChange, placeholder = 'Add tag...', max, suggestions = [], className }: TagInputProps) {
  const [input, setInput] = React.useState('')
  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addTag = (tag: string) => {
    const t = tag.trim()
    if (!t || value.includes(t) || (max && value.length >= max)) return
    onChange?.([...value, t])
    setInput('')
  }

  const removeTag = (tag: string) => onChange?.(value.filter(t => t !== tag))

  const filtered = suggestions.filter(s => s.toLowerCase().includes(input.toLowerCase()) && !value.includes(s))

  return (
    <div className={cn('relative', className)}>
      <div className={cn('flex flex-wrap items-center gap-1.5 rounded-md border px-3 py-2 text-sm', focused && 'ring-2 ring-ring')} onClick={() => inputRef.current?.focus()}>
        {value.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
            {tag}
            <button type="button" onClick={(e) => { e.stopPropagation(); removeTag(tag) }} className="hover:text-destructive">&times;</button>
          </span>
        ))}
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(input) } else if (e.key === 'Backspace' && !input && value.length) removeTag(value[value.length - 1]) }}
          placeholder={value.length === 0 ? placeholder : ''} className="flex-1 min-w-[60px] bg-transparent outline-none placeholder:text-muted-foreground" />
        {max && <span className="text-xs text-muted-foreground">{value.length}/{max}</span>}
      </div>
      {focused && input && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
          {filtered.slice(0, 5).map(s => (
            <div key={s} onMouseDown={() => addTag(s)} className="cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-accent">{s}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export { TagInput }
`,
};
