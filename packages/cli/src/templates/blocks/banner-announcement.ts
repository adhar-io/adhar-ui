// deno-lint-ignore-file
export const template = `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function AnnouncementBanner({ message, ctaLabel, onCta, dismissible = true, variant = 'default', className }: { message: React.ReactNode; ctaLabel?: string; onCta?: () => void; dismissible?: boolean; variant?: 'default' | 'gradient' | 'success' | 'warning'; className?: string }) {
  const [open, setOpen] = React.useState(true)
  if (!open) return null
  const styles = {
    default: 'bg-foreground text-background',
    gradient: 'bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground',
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-500 text-white',
  }[variant]
  return (
    <div className={cn('relative w-full', styles, className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-sm">
        <span className="font-medium">{message}</span>
        {ctaLabel && <button onClick={onCta} className="rounded-md border border-current/20 bg-current/10 px-3 py-1 text-xs font-semibold transition-colors hover:bg-current/20">{ctaLabel}</button>}
        {dismissible && <button onClick={() => setOpen(false)} aria-label="Dismiss" className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100">×</button>}
      </div>
    </div>
  )
}
`;
