// deno-lint-ignore-file
export const template = `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface Tab { id: string; label: string; count?: number; content: React.ReactNode; icon?: React.ReactNode }

export function TabsPage({ heading, subheading, headerActions, tabs, defaultTab, className }: { heading?: string; subheading?: string; headerActions?: React.ReactNode; tabs: Tab[]; defaultTab?: string; className?: string }) {
  const [active, setActive] = React.useState(defaultTab || tabs[0]?.id)
  const current = tabs.find(t => t.id === active)
  return (
    <div className={cn('mx-auto max-w-6xl p-6 space-y-6', className)}>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>{heading && <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>}{subheading && <p className="mt-1 text-sm text-muted-foreground">{subheading}</p>}</div>
        {headerActions}
      </div>
      <div className="flex items-center gap-1 border-b overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} className={cn('inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap', active === t.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
            {t.icon}{t.label}{typeof t.count === 'number' && <span className={cn('inline-flex items-center justify-center h-4 min-w-4 rounded-full px-1.5 text-[10px] font-bold', active === t.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>{t.count}</span>}
          </button>
        ))}
      </div>
      <div>{current?.content}</div>
    </div>
  )
}
`;
