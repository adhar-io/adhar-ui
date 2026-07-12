// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

interface CardItem { id: string; title: string; description?: string; image?: string; badge?: string; metadata?: { label: string; value: string }[]; href?: string; onClick?: () => void; cta?: string }

export function CardGrid({ heading, subheading, items, columns = 3, headerActions, className }: { heading?: string; subheading?: string; items: CardItem[]; columns?: 2 | 3 | 4; headerActions?: React.ReactNode; className?: string }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' }[columns]
  return (
    <section className={cn('p-6 mx-auto max-w-7xl space-y-6', className)}>
      {(heading || headerActions) && (
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>{heading && <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>}{subheading && <p className="mt-1 text-sm text-muted-foreground">{subheading}</p>}</div>
          {headerActions}
        </div>
      )}
      <div className={cn('grid gap-5', cols)}>
        {items.map(item => {
          const Wrapper: any = item.href ? 'a' : item.onClick ? 'button' : 'div'
          return (
            <Wrapper key={item.id} href={item.href} onClick={item.onClick} className="group flex flex-col rounded-xl border bg-card overflow-hidden text-left transition-all hover:shadow-md hover:border-primary/30">
              {item.image && <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50" style={{ backgroundImage: \`url(\${item.image})\`, backgroundSize: 'cover', backgroundPosition: 'center' }}>{item.badge && <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-background/95 backdrop-blur px-2 py-0.5 text-xs font-semibold">{item.badge}</span>}</div>}
              <div className="flex flex-col gap-2 p-5 flex-1">
                {!item.image && item.badge && <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{item.badge}</span>}
                <h3 className="text-base font-semibold group-hover:text-primary transition-colors">{item.title}</h3>
                {item.description && <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>}
                {item.metadata && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {item.metadata.map((m, i) => <span key={i}><span className="text-muted-foreground/70">{m.label}:</span> <span className="font-medium text-foreground">{m.value}</span></span>)}
                  </div>
                )}
                {item.cta && <span className="mt-auto pt-3 text-sm font-medium text-primary group-hover:underline">{item.cta} →</span>}
              </div>
            </Wrapper>
          )
        })}
      </div>
    </section>
  )
}
`;
