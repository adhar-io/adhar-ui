// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

interface Stat { label: string; value: string; description?: string; trend?: { value: string; positive: boolean }; icon?: React.ReactNode }

export function StatsGrid({ heading, subheading, stats, columns = 4, className }: { heading?: string; subheading?: string; stats: Stat[]; columns?: 2 | 3 | 4; className?: string }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns]
  return (
    <section className={cn('py-16 px-4', className)}>
      <div className="mx-auto max-w-6xl">
        {(heading || subheading) && <div className="mb-12 text-center">{heading && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>}{subheading && <p className="mt-3 text-lg text-muted-foreground">{subheading}</p>}</div>}
        <div className={cn('grid gap-6', cols)}>
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
              {s.icon && <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">{s.icon}</div>}
              <div className="text-3xl font-bold tabular-nums">{s.value}</div>
              <div className="mt-1 text-sm font-medium text-muted-foreground">{s.label}</div>
              {s.description && <div className="mt-3 text-xs text-muted-foreground/80 leading-relaxed">{s.description}</div>}
              {s.trend && <div className={cn('mt-3 inline-flex items-center gap-1 text-xs font-semibold', s.trend.positive ? 'text-emerald-600' : 'text-rose-600')}>{s.trend.positive ? '↑' : '↓'} {s.trend.value}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`;
