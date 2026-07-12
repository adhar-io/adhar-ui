// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

interface TimelineEvent { id: string; title: string; description?: string; timestamp: string; icon?: React.ReactNode; iconBg?: string; group?: string }

export function TimelinePage({ heading = 'Activity', subheading, events, className }: { heading?: string; subheading?: string; events: TimelineEvent[]; className?: string }) {
  const grouped = events.reduce<Record<string, TimelineEvent[]>>((acc, e) => { const k = e.group || 'Recent'; if (!acc[k]) acc[k] = []; acc[k].push(e); return acc }, {})
  return (
    <div className={cn('mx-auto max-w-3xl p-6 space-y-8', className)}>
      <div><h1 className="text-2xl font-bold tracking-tight">{heading}</h1>{subheading && <p className="mt-1 text-sm text-muted-foreground">{subheading}</p>}</div>
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 sticky top-0 bg-background py-2 z-10">{group}</h2>
          <div className="relative space-y-4 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-border">
            {items.map(e => (
              <div key={e.id} className="relative flex gap-4">
                <div className={cn('relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-background', e.iconBg || 'bg-primary/15 text-primary')}>{e.icon || '•'}</div>
                <div className="flex-1 min-w-0 pb-4">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold">{e.title}</p>
                      <span className="text-xs text-muted-foreground/70 shrink-0">{e.timestamp}</span>
                    </div>
                    {e.description && <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{e.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
`;
