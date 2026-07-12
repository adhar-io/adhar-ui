// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

interface Stat { label: string; value: string }
interface Activity { id: string; title: string; timestamp: string; description?: string }

export function ProfilePage({ name, role, bio, avatar, coverImage, location, joinedDate, stats, activities, socials, onEdit, className }: { name: string; role?: string; bio?: string; avatar?: string; coverImage?: string; location?: string; joinedDate?: string; stats?: Stat[]; activities?: Activity[]; socials?: { type: string; url: string }[]; onEdit?: () => void; className?: string }) {
  return (
    <div className={cn('mx-auto max-w-4xl', className)}>
      <div className="h-48 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/15 to-transparent" style={coverImage ? { backgroundImage: \`url(\${coverImage})\`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} />
      <div className="px-6 -mt-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="h-32 w-32 rounded-2xl ring-4 ring-background bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-3xl font-bold text-primary overflow-hidden">{avatar ? <img src={avatar} alt={name} className="h-full w-full object-cover" /> : name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
          <button onClick={onEdit} className="inline-flex h-9 items-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent">Edit profile</button>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
          {bio && <p className="mt-3 text-sm leading-relaxed max-w-2xl">{bio}</p>}
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            {location && <span className="inline-flex items-center gap-1">📍 {location}</span>}
            {joinedDate && <span className="inline-flex items-center gap-1">📅 Joined {joinedDate}</span>}
            {socials?.map((s, i) => <a key={i} href={s.url} className="hover:text-foreground">@ {s.type}</a>)}
          </div>
        </div>
        {stats && (
          <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <div className="text-2xl font-bold tabular-nums">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {activities && (
          <div className="mt-10">
            <h2 className="text-base font-semibold mb-4">Recent activity</h2>
            <div className="space-y-3">
              {activities.map(a => (
                <div key={a.id} className="flex gap-3 rounded-lg border bg-card p-4">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{a.title}</p>
                    {a.description && <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>}
                    <p className="text-xs text-muted-foreground/60 mt-1.5">{a.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
`;
