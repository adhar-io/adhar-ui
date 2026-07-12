// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

interface Post { title: string; excerpt: string; author: string; date: string; readTime?: string; category?: string; image?: string; href?: string; featured?: boolean }

export function BlogGrid({ heading = 'Latest articles', subheading, posts, className }: { heading?: string; subheading?: string; posts: Post[]; className?: string }) {
  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured)
  return (
    <section className={cn('py-16 px-4', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-3">
          <div><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>{subheading && <p className="mt-2 text-muted-foreground">{subheading}</p>}</div>
          <a href="#" className="text-sm font-medium text-primary hover:underline">View all →</a>
        </div>
        {featured && (
          <a href={featured.href || '#'} className="group mb-10 grid gap-6 rounded-2xl border bg-card overflow-hidden md:grid-cols-2 hover:shadow-lg transition-shadow">
            <div className="aspect-[16/10] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" style={featured.image ? { backgroundImage: \`url(\${featured.image})\`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} />
            <div className="flex flex-col justify-center p-8">
              {featured.category && <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">{featured.category}</span>}
              <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{featured.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><span className="font-medium text-foreground">{featured.author}</span><span>·</span><span>{featured.date}</span>{featured.readTime && <><span>·</span><span>{featured.readTime}</span></>}</div>
            </div>
          </a>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <a key={i} href={p.href || '#'} className="group flex flex-col rounded-xl border bg-card overflow-hidden hover:shadow-md hover:border-primary/30 transition-all">
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/40" style={p.image ? { backgroundImage: \`url(\${p.image})\`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} />
              <div className="flex flex-col gap-2 p-5">
                {p.category && <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{p.category}</span>}
                <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{p.excerpt}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t"><span>{p.author}</span><span>·</span><span>{p.date}</span></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
`;
