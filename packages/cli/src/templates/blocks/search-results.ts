// deno-lint-ignore-file
export const template = `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface Result { id: string; title: string; snippet: string; url: string; meta?: string; type?: string; thumbnail?: string }

export function SearchResults({ query, results, total, filters, onFilterChange, onSearch, className }: { query: string; results: Result[]; total: number; filters?: { label: string; value: string; count?: number }[]; onFilterChange?: (value: string) => void; onSearch?: (q: string) => void; className?: string }) {
  const [search, setSearch] = React.useState(query)
  return (
    <div className={cn('mx-auto max-w-4xl p-6 space-y-6', className)}>
      <form onSubmit={(e) => { e.preventDefault(); onSearch?.(search) }} className="flex gap-2">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} className="flex h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <button type="submit" className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Search</button>
      </form>
      {filters && (
        <div className="flex flex-wrap gap-1.5">
          {filters.map(f => (
            <button key={f.value} onClick={() => onFilterChange?.(f.value)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium hover:border-primary/40 hover:text-foreground text-muted-foreground transition-colors">
              {f.label}{f.count !== undefined && <span className="text-muted-foreground/60 tabular-nums">({f.count})</span>}
            </button>
          ))}
        </div>
      )}
      <div>
        <p className="text-sm text-muted-foreground">About <span className="font-semibold text-foreground tabular-nums">{total.toLocaleString()}</span> results for <span className="font-semibold text-foreground">"{query}"</span></p>
      </div>
      {results.length === 0 ? (
        <div className="py-16 text-center"><p className="text-base font-semibold">No results found</p><p className="mt-1 text-sm text-muted-foreground">Try different keywords or check your spelling.</p></div>
      ) : (
        <div className="space-y-5">
          {results.map(r => (
            <a key={r.id} href={r.url} className="block group">
              <div className="flex items-start gap-4">
                {r.thumbnail && <div className="h-16 w-20 shrink-0 rounded-md bg-muted overflow-hidden" style={{ backgroundImage: \`url(\${r.thumbnail})\`, backgroundSize: 'cover' }} />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {r.type && <span className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">{r.type}</span>}
                    <span className="truncate">{r.url}</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold group-hover:text-primary group-hover:underline transition-colors">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{r.snippet}</p>
                  {r.meta && <p className="mt-1.5 text-xs text-muted-foreground/70">{r.meta}</p>}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
`;
