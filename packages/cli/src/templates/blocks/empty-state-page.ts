// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

export function EmptyStatePage({ icon, title = 'Nothing here yet', description, primaryCta, secondaryCta, className }: { icon?: React.ReactNode; title?: string; description?: string; primaryCta?: { label: string; onClick?: () => void }; secondaryCta?: { label: string; onClick?: () => void }; className?: string }) {
  return (
    <div className={cn('flex min-h-[480px] flex-col items-center justify-center px-6 text-center', className)}>
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground">{icon || <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>}</div>
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">{description}</p>}
      {(primaryCta || secondaryCta) && (
        <div className="mt-8 flex gap-3">
          {primaryCta && <button onClick={primaryCta.onClick} className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">{primaryCta.label}</button>}
          {secondaryCta && <button onClick={secondaryCta.onClick} className="inline-flex h-10 items-center rounded-md border border-input bg-background px-5 text-sm font-medium hover:bg-accent">{secondaryCta.label}</button>}
        </div>
      )}
    </div>
  )
}
`;
