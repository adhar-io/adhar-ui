// deno-lint-ignore-file
export const template = `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface Step { id: string; title: string; description?: string; content: React.ReactNode }

export function MultiStepForm({ steps, onComplete, onCancel, className }: { steps: Step[]; onComplete?: () => void; onCancel?: () => void; className?: string }) {
  const [current, setCurrent] = React.useState(0)
  const isLast = current === steps.length - 1
  const next = () => isLast ? onComplete?.() : setCurrent(c => Math.min(c + 1, steps.length - 1))
  const prev = () => setCurrent(c => Math.max(c - 1, 0))
  return (
    <div className={cn('mx-auto max-w-2xl rounded-2xl border bg-card p-6 sm:p-8', className)}>
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground"><span>Step {current + 1} of {steps.length}</span><span>{Math.round(((current + 1) / steps.length) * 100)}%</span></div>
      <div className="mb-6 h-1.5 w-full rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary transition-all duration-300" style={{ width: \`\${((current + 1) / steps.length) * 100}%\` }} /></div>
      <h2 className="text-xl font-bold">{steps[current].title}</h2>
      {steps[current].description && <p className="mt-1 text-sm text-muted-foreground">{steps[current].description}</p>}
      <div className="mt-6 min-h-[180px]">{steps[current].content}</div>
      <div className="mt-8 flex items-center justify-between gap-2">
        <button onClick={current === 0 ? onCancel : prev} className="inline-flex h-10 items-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent">{current === 0 ? 'Cancel' : '← Back'}</button>
        <button onClick={next} className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">{isLast ? 'Complete' : 'Continue →'}</button>
      </div>
    </div>
  )
}
`;
