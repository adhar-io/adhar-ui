// deno-lint-ignore-file
export const template = `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface Notification { id: string; title: string; description?: string; timestamp: string; read?: boolean; type?: 'info' | 'success' | 'warning' | 'error'; avatar?: string; actionLabel?: string; onAction?: () => void }

export function NotificationsCenter({ notifications, onMarkRead, onMarkAllRead, onDismiss, className }: { notifications: Notification[]; onMarkRead?: (id: string) => void; onMarkAllRead?: () => void; onDismiss?: (id: string) => void; className?: string }) {
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all')
  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications
  const unread = notifications.filter(n => !n.read).length
  return (
    <div className={cn('mx-auto max-w-3xl space-y-4 p-6', className)}>
      <div className="flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">{unread} unread · {notifications.length} total</p>
        </div>
        {unread > 0 && <button onClick={onMarkAllRead} className="text-sm font-medium text-primary hover:underline">Mark all as read</button>}
      </div>
      <div className="flex gap-1 border-b">
        {(['all', 'unread'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cn('px-3 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors', filter === f ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
            {f} {f === 'unread' && unread > 0 && <span className="ml-1 inline-flex items-center justify-center h-4 min-w-4 rounded-full bg-primary text-primary-foreground px-1 text-[10px] font-bold">{unread}</span>}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="py-16 text-center"><div className="text-4xl text-muted-foreground/30 mb-2">🔔</div><p className="text-sm text-muted-foreground">You're all caught up.</p></div>
      ) : (
        <div className="rounded-xl border bg-card divide-y">
          {filtered.map(n => (
            <div key={n.id} className={cn('flex items-start gap-3 p-4 group', !n.read && 'bg-primary/[0.03]')}>
              {!n.read && <div className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">{n.avatar || (n.type === 'success' ? '✓' : n.type === 'error' ? '✕' : n.type === 'warning' ? '!' : 'i')}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{n.title}</p>
                    {n.description && <p className="mt-0.5 text-sm text-muted-foreground">{n.description}</p>}
                    <p className="mt-1 text-xs text-muted-foreground/70">{n.timestamp}</p>
                  </div>
                  <button onClick={() => onDismiss?.(n.id)} aria-label="Dismiss" className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity">×</button>
                </div>
                {n.actionLabel && <button onClick={n.onAction} className="mt-3 inline-flex h-7 items-center rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent">{n.actionLabel}</button>}
              </div>
              {!n.read && <button onClick={() => onMarkRead?.(n.id)} className="text-xs text-primary hover:underline shrink-0">Mark read</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
`;
