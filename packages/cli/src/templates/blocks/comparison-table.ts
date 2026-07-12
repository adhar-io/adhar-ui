// deno-lint-ignore-file
export const template = `import * as React from 'react'
import { cn } from '@/lib/utils'

interface Plan { name: string; price: string; period?: string; description?: string; cta: string; popular?: boolean; onSelect?: () => void }
interface Feature { label: string; values: (boolean | string)[]; tooltip?: string; group?: string }

export function ComparisonTable({ heading = 'Compare plans', subheading, plans, features, className }: { heading?: string; subheading?: string; plans: Plan[]; features: Feature[]; className?: string }) {
  const grouped = features.reduce<Record<string, Feature[]>>((acc, f) => { const k = f.group || ''; if (!acc[k]) acc[k] = []; acc[k].push(f); return acc }, {})
  return (
    <section className={cn('py-16 px-4', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
          {subheading && <p className="mt-3 text-lg text-muted-foreground">{subheading}</p>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b">
                <th className="py-4 text-left font-medium text-sm text-muted-foreground" />
                {plans.map((p, i) => (
                  <th key={i} className={cn('py-4 px-4 text-left', p.popular && 'relative')}>
                    {p.popular && <span className="absolute -top-2 left-4 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground uppercase tracking-wider">Popular</span>}
                    <div className="text-base font-semibold">{p.name}</div>
                    <div className="mt-1 flex items-baseline gap-1"><span className="text-2xl font-bold">{p.price}</span>{p.period && <span className="text-xs text-muted-foreground">{p.period}</span>}</div>
                    {p.description && <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>}
                    <button onClick={p.onSelect} className={cn('mt-3 inline-flex h-9 w-full items-center justify-center rounded-md text-xs font-semibold transition-colors', p.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input hover:bg-accent')}>{p.cta}</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped).map(([group, items]) => (
                <React.Fragment key={group}>
                  {group && <tr><td colSpan={plans.length + 1} className="pt-8 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{group}</td></tr>}
                  {items.map((f, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 text-sm font-medium">{f.label}</td>
                      {f.values.map((v, j) => (
                        <td key={j} className="py-3 px-4 text-sm">
                          {typeof v === 'boolean' ? (v ? <span className="text-primary">✓</span> : <span className="text-muted-foreground/40">—</span>) : <span className="text-foreground/80">{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
`;
