// deno-lint-ignore-file
export const template = `import { cn } from '@/lib/utils'

export function VideoHero({ headline, subheadline, videoSrc, posterSrc, primaryCta, secondaryCta, className }: { headline: string; subheadline?: string; videoSrc?: string; posterSrc?: string; primaryCta?: { label: string; onClick?: () => void }; secondaryCta?: { label: string; onClick?: () => void }; className?: string }) {
  return (
    <section className={cn('relative overflow-hidden py-24 px-4 text-center', className)}>
      {videoSrc && <video autoPlay muted loop playsInline poster={posterSrc} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"><source src={videoSrc} /></video>}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{headline}</h1>
        {subheadline && <p className="mt-6 text-lg text-muted-foreground sm:text-xl">{subheadline}</p>}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            {primaryCta && <button onClick={primaryCta.onClick} className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-7 text-base font-semibold text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25">{primaryCta.label}</button>}
            {secondaryCta && <button onClick={secondaryCta.onClick} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input bg-background/60 backdrop-blur px-7 text-base font-semibold hover:bg-accent"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>{secondaryCta.label}</button>}
          </div>
        )}
      </div>
    </section>
  )
}
`;
