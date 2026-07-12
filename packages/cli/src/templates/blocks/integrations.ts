// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

interface Integration { name: string; description?: string; logo?: React.ReactNode; href?: string; status?: 'available' | 'coming-soon' | 'beta' }

export function IntegrationsGrid({ heading = 'Integrations', subheading = 'Connect with the tools you already use', integrations, columns = 4, className }: { heading?: string; subheading?: string; integrations: Integration[]; columns?: 3 | 4 | 5; className?: string }) {
  const cols = { 3: 'sm:grid-cols-2 md:grid-cols-3', 4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4', 5: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5' }[columns]
  return (
    <section className={cn('py-16 px-4', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
          {subheading && <p className="mt-3 text-lg text-muted-foreground">{subheading}</p>}
        </div>
        <div className={cn('grid gap-3', cols)}>
          {integrations.map((it, i) => (
            <a key={i} href={it.href || '#'} className={cn('group flex flex-col items-start gap-3 rounded-xl border bg-card p-5 transition-all', it.status === 'coming-soon' ? 'opacity-60 pointer-events-none' : 'hover:border-primary/40 hover:shadow-md')}>
              <div className="flex items-center justify-between w-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">{it.logo || <span className="text-base font-bold">{it.name[0]}</span>}</div>
                {it.status && it.status !== 'available' && <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide', it.status === 'beta' ? 'bg-amber-500/10 text-amber-600' : 'bg-muted text-muted-foreground')}>{it.status === 'coming-soon' ? 'Soon' : it.status}</span>}
              </div>
              <div>
                <h3 className="text-sm font-semibold">{it.name}</h3>
                {it.description && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{it.description}</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
`;
