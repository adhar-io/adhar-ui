// deno-lint-ignore-file
export const template = `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface OnboardingStep { id: string; title: string; description: string; image?: React.ReactNode; content?: React.ReactNode }

export function Onboarding({ steps, onComplete, onSkip, className }: { steps: OnboardingStep[]; onComplete?: () => void; onSkip?: () => void; className?: string }) {
  const [current, setCurrent] = React.useState(0)
  const isLast = current === steps.length - 1
  const step = steps[current]
  return (
    <div className={cn('flex min-h-screen items-center justify-center p-4', className)}>
      <div className="w-full max-w-2xl rounded-2xl border bg-card overflow-hidden shadow-xl">
        <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent flex items-center justify-center">
          {step.image || <span className="text-7xl">✨</span>}
          {onSkip && current < steps.length - 1 && <button onClick={onSkip} className="absolute right-4 top-4 text-xs text-muted-foreground hover:text-foreground">Skip tour</button>}
        </div>
        <div className="p-8">
          <div className="flex items-center gap-2 mb-4">
            {steps.map((_, i) => (
              <div key={i} className={cn('h-1.5 rounded-full transition-all', i === current ? 'w-8 bg-primary' : i < current ? 'w-6 bg-primary/60' : 'w-6 bg-muted')} />
            ))}
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{step.title}</h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">{step.description}</p>
          {step.content && <div className="mt-6">{step.content}</div>}
          <div className="mt-8 flex items-center justify-between gap-2">
            <button disabled={current === 0} onClick={() => setCurrent(c => c - 1)} className="text-sm font-medium text-muted-foreground hover:text-foreground disabled:invisible">← Back</button>
            <button onClick={() => isLast ? onComplete?.() : setCurrent(c => c + 1)} className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">{isLast ? 'Get started' : 'Next →'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
`;
