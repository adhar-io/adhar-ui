// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

export function LoadingPage({ rows = 6, withHeader = true, className }: { rows?: number; withHeader?: boolean; className?: string }) {
  return (
    <div className={cn('mx-auto max-w-4xl p-6 space-y-6', className)}>
      {withHeader && (
        <div className="space-y-2">
          <div className="h-8 w-1/3 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-2/3 rounded-md bg-muted animate-pulse" />
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map(i => (
          <div key={i} className="rounded-xl border bg-card p-5 space-y-2">
            <div className="h-3 w-1/3 rounded bg-muted animate-pulse" />
            <div className="h-7 w-1/2 rounded-md bg-muted animate-pulse" />
            <div className="h-2 w-1/4 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border bg-card divide-y">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4">
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-3/5 rounded bg-muted animate-pulse" />
              <div className="h-2.5 w-2/5 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-7 w-16 rounded-md bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
`;
