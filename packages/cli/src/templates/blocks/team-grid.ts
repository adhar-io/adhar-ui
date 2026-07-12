// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

interface Member { name: string; role: string; avatar?: string; bio?: string; socials?: { type: 'twitter' | 'linkedin' | 'github' | 'website'; url: string }[] }

export function TeamGrid({ heading = 'Meet the team', subheading = 'The people behind the product', members, columns = 4, className }: { heading?: string; subheading?: string; members: Member[]; columns?: 2 | 3 | 4; className?: string }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 md:grid-cols-3', 4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' }[columns]
  return (
    <section className={cn('py-16 px-4', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
          {subheading && <p className="mt-3 text-lg text-muted-foreground">{subheading}</p>}
        </div>
        <div className={cn('grid gap-6', cols)}>
          {members.map((m, i) => (
            <div key={i} className="text-center">
              <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 ring-2 ring-border">
                {m.avatar ? <img src={m.avatar} alt={m.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-primary">{m.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>}
              </div>
              <h3 className="text-base font-semibold">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
              {m.bio && <p className="mt-2 text-xs text-muted-foreground/80 leading-relaxed">{m.bio}</p>}
              {m.socials && <div className="mt-3 flex justify-center gap-2">{m.socials.map((s, j) => <a key={j} href={s.url} className="text-muted-foreground hover:text-foreground" aria-label={s.type}>•</a>)}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`;
