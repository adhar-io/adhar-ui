// deno-lint-ignore-file
export const template = `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface Step { id: string; title: string; description?: string; content: React.ReactNode }

export function StepperForm({ steps, onComplete, className }: { steps: Step[]; onComplete?: () => void; className?: string }) {
  const [current, setCurrent] = React.useState(0)
  return (
    <div className={cn('mx-auto max-w-4xl grid gap-8 lg:grid-cols-[260px_1fr]', className)}>
      <aside className="space-y-1">
        {steps.map((step, i) => {
          const done = i < current
          const active = i === current
          return (
            <button key={step.id} onClick={() => i <= current && setCurrent(i)} disabled={i > current} className={cn('flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors', active ? 'bg-primary/10' : done ? 'hover:bg-accent/50' : 'opacity-50 cursor-not-allowed')}>
              <span className={cn('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold', done ? 'bg-primary text-primary-foreground' : active ? 'border-2 border-primary text-primary' : 'border-2 border-muted-foreground/30 text-muted-foreground/60')}>{done ? '✓' : i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className={cn('text-sm font-semibold', active && 'text-primary')}>{step.title}</div>
                {step.description && <div className="mt-0.5 text-xs text-muted-foreground">{step.description}</div>}
              </div>
            </button>
          )
        })}
      </aside>
      <div className="rounded-xl border bg-card p-6 sm:p-8">
        <h2 className="text-xl font-bold">{steps[current].title}</h2>
        {steps[current].description && <p className="mt-1 text-sm text-muted-foreground">{steps[current].description}</p>}
        <div className="mt-6">{steps[current].content}</div>
        <div className="mt-8 flex items-center justify-between border-t pt-6">
          <button disabled={current === 0} onClick={() => setCurrent(c => c - 1)} className="inline-flex h-10 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent disabled:opacity-40">← Back</button>
          <button onClick={() => current === steps.length - 1 ? onComplete?.() : setCurrent(c => c + 1)} className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">{current === steps.length - 1 ? 'Submit' : 'Continue →'}</button>
        </div>
      </div>
    </div>
  )
}
`;
