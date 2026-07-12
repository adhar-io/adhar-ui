// deno-lint-ignore-file
/**
 * Block templates: Pre-composed page sections built from base components.
 * Each block imports from the user's ui/ directory and composes a full section.
 *
 * Blocks are installed via `adhar-ui add block-login` just like components.
 * They go into the same ui/ directory and can be customized freely.
 *
 * NEW BLOCKS go in their own file under ./blocks/ (one file per block) for
 * easier maintenance — see ./blocks/index.ts. The two maps are merged at the
 * bottom so consumers see a unified `blockTemplates` record.
 */

import { newBlockTemplates } from './blocks/index.ts';

const legacyBlockTemplates: Record<string, string> = {
  // ─── Authentication ───────────────────────────────────────────────────

  'block-login': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function LoginPage({ onSubmit, onSocialLogin, className }: { onSubmit?: (data: { email: string; password: string; remember: boolean }) => void; onSocialLogin?: (provider: string) => void; className?: string }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [remember, setRemember] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSubmit?.({ email, password, remember }) }

  return (
    <div className={cn('flex min-h-screen items-center justify-center px-4 py-12', className)}>
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center"><h1 className="text-2xl font-bold tracking-tight">Welcome back</h1><p className="mt-2 text-sm text-muted-foreground">Sign in to your account</p></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2"><label className="text-sm font-medium">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><label className="text-sm font-medium">Password</label><a href="#" className="text-sm text-primary hover:underline">Forgot password?</a></div><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="h-4 w-4 rounded accent-primary" /><label className="text-sm">Remember me</label></div>
          <button type="submit" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">Sign in</button>
        </form>
        <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div></div>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => onSocialLogin?.('google')} className="inline-flex h-10 items-center justify-center rounded-md border border-input text-sm font-medium hover:bg-accent">Google</button>
          <button type="button" onClick={() => onSocialLogin?.('github')} className="inline-flex h-10 items-center justify-center rounded-md border border-input text-sm font-medium hover:bg-accent">GitHub</button>
        </div>
        <p className="text-center text-sm text-muted-foreground">Don't have an account? <a href="#" className="text-primary hover:underline">Sign up</a></p>
      </div>
    </div>
  )
}
`,

  'block-signup': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function SignUpPage({ onSubmit, className }: { onSubmit?: (data: { name: string; email: string; password: string }) => void; className?: string }) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const [terms, setTerms] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (password !== confirm) return; onSubmit?.({ name, email, password }) }

  return (
    <div className={cn('flex min-h-screen items-center justify-center px-4 py-12', className)}>
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center"><h1 className="text-2xl font-bold tracking-tight">Create an account</h1><p className="mt-2 text-sm text-muted-foreground">Enter your details to get started</p></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2"><label className="text-sm font-medium">Full name</label><input value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create password" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Confirm password</label><input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm password" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} required className="h-4 w-4 rounded accent-primary" /><label className="text-sm">I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a></label></div>
          <button type="submit" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">Create account</button>
        </form>
        <p className="text-center text-sm text-muted-foreground">Already have an account? <a href="#" className="text-primary hover:underline">Sign in</a></p>
      </div>
    </div>
  )
}
`,

  'block-forgot-password': `import * as React from 'react'
import { cn } from '@/lib/utils'

export function ForgotPasswordPage({ onSubmit, className }: { onSubmit?: (email: string) => void; className?: string }) {
  const [email, setEmail] = React.useState('')
  const [sent, setSent] = React.useState(false)

  return (
    <div className={cn('flex min-h-screen items-center justify-center px-4 py-12', className)}>
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center"><h1 className="text-2xl font-bold tracking-tight">Reset password</h1><p className="mt-2 text-sm text-muted-foreground">{sent ? 'Check your email for a reset link' : 'Enter your email to receive a reset link'}</p></div>
        {!sent ? (
          <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(email); setSent(true) }} className="space-y-4">
            <div className="space-y-2"><label className="text-sm font-medium">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
            <button type="submit" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">Send reset link</button>
          </form>
        ) : <div className="rounded-md border bg-muted/50 p-4 text-center text-sm">We sent a reset link to <strong>{email}</strong></div>}
        <p className="text-center text-sm text-muted-foreground"><a href="#" className="text-primary hover:underline">Back to sign in</a></p>
      </div>
    </div>
  )
}
`,

  'block-otp-verify': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function OTPVerifyPage({ onVerify, onResend, className }: { onVerify?: (code: string) => void; onResend?: () => void; className?: string }) {
  const [digits, setDigits] = React.useState(['', '', '', '', '', ''])
  const refs = React.useRef<(HTMLInputElement | null)[]>([])
  const handleChange = (i: number, v: string) => { if (v.length > 1) return; const next = [...digits]; next[i] = v; setDigits(next); if (v && i < 5) refs.current[i + 1]?.focus() }
  const handleKeyDown = (i: number, e: React.KeyboardEvent) => { if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus() }

  return (
    <div className={cn('flex min-h-screen items-center justify-center px-4 py-12', className)}>
      <div className="w-full max-w-sm space-y-6 text-center">
        <div><h1 className="text-2xl font-bold tracking-tight">Verify your email</h1><p className="mt-2 text-sm text-muted-foreground">Enter the 6-digit code sent to your email</p></div>
        <div className="flex justify-center gap-2">{digits.map((d, i) => <input key={i} ref={el => { refs.current[i] = el }} maxLength={1} value={d} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} className="flex h-12 w-12 items-center justify-center rounded-md border border-input bg-background text-center text-lg font-semibold focus:ring-2 focus:ring-ring focus:outline-none" />)}</div>
        <button onClick={() => onVerify?.(digits.join(''))} disabled={digits.some(d => !d)} className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">Verify</button>
        <p className="text-sm text-muted-foreground">Didn't receive a code? <button type="button" onClick={onResend} className="text-primary hover:underline">Resend</button></p>
      </div>
    </div>
  )
}
`,

  // ─── Dashboard ────────────────────────────────────────────────────────

  'block-dashboard-stats': `import { cn } from '@/lib/utils'

interface Stat { title: string; value: string; change: string; trend: 'up' | 'down' | 'neutral'; icon?: React.ReactNode }

export function DashboardStats({ stats, className }: { stats: Stat[]; className?: string }) {
  const trendColor = { up: 'text-green-600', down: 'text-red-600', neutral: 'text-muted-foreground' }
  const trendIcon = { up: '\\u2191', down: '\\u2193', neutral: '\\u2192' }
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {stats.map((s, i) => (
        <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between"><p className="text-sm font-medium text-muted-foreground">{s.title}</p>{s.icon}</div>
          <div className="mt-2 flex items-baseline gap-2"><h2 className="text-3xl font-bold tracking-tight">{s.value}</h2><span className={cn('text-sm font-medium', trendColor[s.trend])}>{trendIcon[s.trend]} {s.change}</span></div>
        </div>
      ))}
    </div>
  )
}
`,

  'block-dashboard-activity': `import * as React from 'react'
import { cn } from '@/lib/utils'

interface Activity { id: string; user: string; action: string; target: string; time: string; avatar?: string }

export function ActivityFeed({ activities, onLoadMore, className }: { activities: Activity[]; onLoadMore?: () => void; className?: string }) {
  return (
    <div className={cn('rounded-lg border bg-card', className)}>
      <div className="border-b px-6 py-4"><h3 className="text-sm font-semibold">Recent Activity</h3></div>
      <div className="divide-y">
        {activities.map(a => (
          <div key={a.id} className="flex items-start gap-3 px-6 py-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">{a.avatar || a.user[0]}</div>
            <div className="flex-1 min-w-0"><p className="text-sm"><span className="font-medium">{a.user}</span> {a.action} <span className="font-medium">{a.target}</span></p><p className="mt-0.5 text-xs text-muted-foreground">{a.time}</p></div>
          </div>
        ))}
      </div>
      {onLoadMore && <div className="border-t px-6 py-3 text-center"><button type="button" onClick={onLoadMore} className="text-sm text-primary hover:underline">Load more</button></div>}
    </div>
  )
}
`,

  'block-dashboard-chart': `import { cn } from '@/lib/utils'

export function DashboardChart({ title, children, className }: { title: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-lg border bg-card', className)}>
      <div className="flex items-center justify-between border-b px-6 py-4"><h3 className="text-sm font-semibold">{title}</h3></div>
      <div className="p-6">{children || <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">Chart goes here. Use the Chart component with recharts.</div>}</div>
    </div>
  )
}
`,

  'block-dashboard-overview': `import { cn } from '@/lib/utils'

export function DashboardOverview({ statsSlot, chartSlot, activitySlot, className }: { statsSlot: React.ReactNode; chartSlot: React.ReactNode; activitySlot: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {statsSlot}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">{chartSlot}</div>
        <div className="lg:col-span-3">{activitySlot}</div>
      </div>
    </div>
  )
}
`,

  // ─── Marketing ────────────────────────────────────────────────────────

  'block-hero': `import { cn } from '@/lib/utils'

export function HeroSection({ title, subtitle, primaryAction, secondaryAction, badge, className }: { title: string; subtitle: string; primaryAction?: { label: string; onClick?: () => void }; secondaryAction?: { label: string; onClick?: () => void }; badge?: string; className?: string }) {
  return (
    <section className={cn('px-4 py-20 text-center md:py-32', className)}>
      <div className="mx-auto max-w-3xl space-y-6">
        {badge && <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">{badge}</span>}
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {primaryAction && <button onClick={primaryAction.onClick} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90">{primaryAction.label}</button>}
          {secondaryAction && <button onClick={secondaryAction.onClick} className="inline-flex h-11 items-center justify-center rounded-md border border-input px-8 text-sm font-medium hover:bg-accent">{secondaryAction.label}</button>}
        </div>
      </div>
    </section>
  )
}
`,

  'block-features': `import { cn } from '@/lib/utils'

interface Feature { title: string; description: string; icon?: React.ReactNode }

export function FeaturesGrid({ title, subtitle, features, columns = 3, className }: { title: string; subtitle?: string; features: Feature[]; columns?: 2 | 3 | 4; className?: string }) {
  const colClass = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }
  return (
    <section className={cn('px-4 py-20', className)}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12"><h2 className="text-3xl font-bold tracking-tight">{title}</h2>{subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}</div>
        <div className={cn('grid gap-8', colClass[columns])}>
          {features.map((f, i) => (
            <div key={i} className="rounded-lg border p-6">
              {f.icon && <div className="mb-4 text-primary">{f.icon}</div>}
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`,

  'block-pricing': `import { cn } from '@/lib/utils'

interface Plan { name: string; price: string; period?: string; description: string; features: string[]; cta: string; popular?: boolean; onSelect?: () => void }

export function PricingTable({ title, subtitle, plans, className }: { title: string; subtitle?: string; plans: Plan[]; className?: string }) {
  return (
    <section className={cn('px-4 py-20', className)}>
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12"><h2 className="text-3xl font-bold tracking-tight">{title}</h2>{subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}</div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <div key={i} className={cn('relative rounded-lg border p-8', p.popular && 'border-primary shadow-lg ring-1 ring-primary')}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">Popular</span>}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1"><span className="text-4xl font-bold tracking-tight">{p.price}</span>{p.period && <span className="text-sm text-muted-foreground">/{p.period}</span>}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <ul className="mt-6 space-y-3">{p.features.map((f, fi) => <li key={fi} className="flex items-center gap-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary shrink-0"><path d="M20 6 9 17l-5-5"/></svg>{f}</li>)}</ul>
              <button onClick={p.onSelect} className={cn('mt-8 inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-medium', p.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input hover:bg-accent')}>{p.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`,

  'block-testimonials': `import { cn } from '@/lib/utils'

interface Testimonial { quote: string; name: string; role: string; company: string; avatar?: string }

export function Testimonials({ title, testimonials, className }: { title: string; testimonials: Testimonial[]; className?: string }) {
  return (
    <section className={cn('px-4 py-20', className)}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold tracking-tight mb-12">{title}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-lg border p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">{t.avatar || t.name[0]}</div>
                <div><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}, {t.company}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`,

  'block-cta': `import { cn } from '@/lib/utils'

export function CTASection({ title, description, primaryAction, secondaryAction, className }: { title: string; description: string; primaryAction: { label: string; onClick?: () => void }; secondaryAction?: { label: string; onClick?: () => void }; className?: string }) {
  return (
    <section className={cn('px-4 py-20', className)}>
      <div className="mx-auto max-w-2xl rounded-lg border bg-card p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        <p className="mt-4 text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button onClick={primaryAction.onClick} className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/90">{primaryAction.label}</button>
          {secondaryAction && <button onClick={secondaryAction.onClick} className="inline-flex h-11 items-center justify-center rounded-md border border-input px-8 text-sm font-medium hover:bg-accent">{secondaryAction.label}</button>}
        </div>
      </div>
    </section>
  )
}
`,

  'block-faq': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface FAQItem { question: string; answer: string }

export function FAQSection({ title, items, className }: { title: string; items: FAQItem[]; className?: string }) {
  const [search, setSearch] = React.useState('')
  const [openIdx, setOpenIdx] = React.useState<number | null>(null)
  const filtered = items.filter(i => i.question.toLowerCase().includes(search.toLowerCase()) || i.answer.toLowerCase().includes(search.toLowerCase()))

  return (
    <section className={cn('px-4 py-20', className)}>
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-3xl font-bold tracking-tight mb-4">{title}</h2>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..." className="mt-4 mb-8 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <div className="divide-y">
          {filtered.map((item, i) => (
            <div key={i}>
              <button className="flex w-full items-center justify-between py-4 text-left text-sm font-medium hover:underline" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {item.question}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn('h-4 w-4 shrink-0 transition-transform', openIdx === i && 'rotate-180')}><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {openIdx === i && <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`,

  'block-footer': `import { cn } from '@/lib/utils'

interface FooterLink { label: string; href: string }
interface FooterColumn { title: string; links: FooterLink[] }

export function Footer({ logo, columns, copyright, className }: { logo?: React.ReactNode; columns: FooterColumn[]; copyright: string; className?: string }) {
  return (
    <footer className={cn('border-t', className)}>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">{logo || <span className="text-lg font-bold">Adhar UI</span>}<p className="mt-3 text-sm text-muted-foreground max-w-xs">The open, framework-agnostic design system.</p></div>
          {columns.map((col, i) => (
            <div key={i}><h4 className="text-sm font-semibold mb-3">{col.title}</h4><ul className="space-y-2">{col.links.map((l, li) => <li key={li}><a href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</a></li>)}</ul></div>
          ))}
        </div>
        <div className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">{copyright}</div>
      </div>
    </footer>
  )
}
`,

  // ─── Navigation ───────────────────────────────────────────────────────

  'block-header': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface NavItem { label: string; href: string; active?: boolean }

export function Header({ logo, navItems, actions, className }: { logo?: React.ReactNode; navItems: NavItem[]; actions?: React.ReactNode; className?: string }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  return (
    <header className={cn('sticky top-0 z-50 border-b bg-background/95 backdrop-blur', className)}>
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
        <div className="mr-6">{logo || <span className="text-lg font-bold">Logo</span>}</div>
        <nav className="hidden md:flex md:gap-6">{navItems.map(item => <a key={item.label} href={item.href} className={cn('text-sm transition-colors hover:text-foreground', item.active ? 'text-foreground font-medium' : 'text-muted-foreground')}>{item.label}</a>)}</nav>
        <div className="ml-auto flex items-center gap-2">{actions}<button className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border" onClick={() => setMobileOpen(!mobileOpen)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></button></div>
      </div>
      {mobileOpen && <div className="border-t md:hidden"><nav className="flex flex-col p-4 gap-2">{navItems.map(item => <a key={item.label} href={item.href} className="rounded-md px-3 py-2 text-sm hover:bg-accent">{item.label}</a>)}</nav></div>}
    </header>
  )
}
`,

  'block-sidebar-layout': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface SidebarItem { label: string; href: string; icon?: React.ReactNode; active?: boolean }
interface SidebarGroup { title?: string; items: SidebarItem[] }

export function SidebarLayout({ groups, header, children, className }: { groups: SidebarGroup[]; header?: React.ReactNode; children: React.ReactNode; className?: string }) {
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <div className={cn('flex h-screen', className)}>
      <aside className={cn('flex flex-col border-r bg-muted/30 transition-all', collapsed ? 'w-16' : 'w-64')}>
        <div className="flex h-14 items-center justify-between border-b px-4">
          {!collapsed && <span className="text-sm font-bold">Menu</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="rounded-md p-1.5 hover:bg-accent"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg></button>
        </div>
        <nav className="flex-1 overflow-auto py-2">
          {groups.map((g, gi) => (
            <div key={gi} className="mb-2">
              {g.title && !collapsed && <p className="px-4 py-1 text-xs font-medium text-muted-foreground uppercase">{g.title}</p>}
              {g.items.map(item => (
                <a key={item.label} href={item.href} className={cn('flex items-center gap-2 rounded-md mx-2 px-3 py-2 text-sm transition-colors hover:bg-accent', item.active && 'bg-accent font-medium')}>
                  {item.icon}{!collapsed && item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        {header && <div className="flex h-14 items-center border-b px-6">{header}</div>}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
`,

  'block-command-menu': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface CommandItem { label: string; description?: string; shortcut?: string; onSelect?: () => void; group?: string }

export function CommandMenuPage({ items, placeholder, className }: { items: CommandItem[]; placeholder?: string; className?: string }) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  React.useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(o => !o) } }; document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h) }, [])
  const filtered = items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
  const groups = [...new Set(filtered.map(i => i.group || 'Actions'))]
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div className={cn('relative z-50 w-full max-w-lg overflow-hidden rounded-xl border bg-popover shadow-2xl', className)}>
        <div className="flex items-center border-b px-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 shrink-0 opacity-50"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><input value={search} onChange={e => setSearch(e.target.value)} placeholder={placeholder || 'Type a command...'} className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground" autoFocus /></div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {groups.map(g => <div key={g}><p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{g}</p>{filtered.filter(i => (i.group || 'Actions') === g).map(i => <div key={i.label} onClick={() => { i.onSelect?.(); setOpen(false) }} className="flex items-center justify-between rounded-md px-2 py-2 text-sm cursor-default hover:bg-accent"><span>{i.label}{i.description && <span className="ml-2 text-muted-foreground">{i.description}</span>}</span>{i.shortcut && <kbd className="inline-flex h-5 items-center rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">{i.shortcut}</kbd>}</div>)}</div>)}
          {filtered.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No results found.</p>}
        </div>
      </div>
    </div>
  )
}
`,

  // ─── Settings ─────────────────────────────────────────────────────────

  'block-settings-profile': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function SettingsProfile({ defaultValues, onSave, className }: { defaultValues?: { name?: string; email?: string; bio?: string }; onSave?: (data: Record<string, string>) => void; className?: string }) {
  const [name, setName] = React.useState(defaultValues?.name || '')
  const [email, setEmail] = React.useState(defaultValues?.email || '')
  const [bio, setBio] = React.useState(defaultValues?.bio || '')
  return (
    <div className={cn('space-y-6', className)}>
      <div><h3 className="text-lg font-semibold">Profile</h3><p className="text-sm text-muted-foreground">Manage your public profile information.</p></div>
      <div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-xl font-medium">{name?.[0] || '?'}</div><button type="button" className="text-sm text-primary hover:underline">Change avatar</button></div>
      <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><label className="text-sm font-medium">Name</label><input value={name} onChange={e => setName(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div><div className="space-y-2"><label className="text-sm font-medium">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div></div>
      <div className="space-y-2"><label className="text-sm font-medium">Bio</label><textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div>
      <div className="flex gap-3"><button onClick={() => onSave?.({ name, email, bio })} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save changes</button><button className="inline-flex h-10 items-center justify-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent">Cancel</button></div>
    </div>
  )
}
`,

  'block-settings-account': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function SettingsAccount({ className }: { className?: string }) {
  const [twoFactor, setTwoFactor] = React.useState(false)
  return (
    <div className={cn('space-y-8', className)}>
      <div><h3 className="text-lg font-semibold">Account</h3><p className="text-sm text-muted-foreground">Manage your account security.</p></div>
      <div className="rounded-lg border p-6 space-y-4"><h4 className="text-sm font-semibold">Change Password</h4><div className="space-y-3 max-w-sm"><div className="space-y-2"><label className="text-sm font-medium">Current password</label><input type="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div><div className="space-y-2"><label className="text-sm font-medium">New password</label><input type="password" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" /></div></div><button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Update password</button></div>
      <div className="rounded-lg border p-6"><div className="flex items-center justify-between"><div><h4 className="text-sm font-semibold">Two-factor authentication</h4><p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p></div><button type="button" role="switch" aria-checked={twoFactor} onClick={() => setTwoFactor(!twoFactor)} className={cn('inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors', twoFactor ? 'bg-primary' : 'bg-input')}><span className={cn('block h-5 w-5 rounded-full bg-background shadow-lg transition-transform', twoFactor ? 'translate-x-5' : 'translate-x-0')} /></button></div></div>
      <div className="rounded-lg border border-destructive/50 p-6"><h4 className="text-sm font-semibold text-destructive">Danger Zone</h4><p className="mt-1 text-sm text-muted-foreground">Permanently delete your account and all associated data.</p><button className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">Delete account</button></div>
    </div>
  )
}
`,

  'block-settings-notifications': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface NotifChannel { label: string; email: boolean; push: boolean; sms: boolean }

export function SettingsNotifications({ channels: initial, onSave, className }: { channels: NotifChannel[]; onSave?: (channels: NotifChannel[]) => void; className?: string }) {
  const [channels, setChannels] = React.useState(initial)
  const toggle = (idx: number, key: 'email' | 'push' | 'sms') => { const next = [...channels]; next[idx] = { ...next[idx], [key]: !next[idx][key] }; setChannels(next) }
  const Sw = ({ on, onClick }: { on: boolean; onClick: () => void }) => <button type="button" role="switch" aria-checked={on} onClick={onClick} className={cn('inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors', on ? 'bg-primary' : 'bg-input')}><span className={cn('block h-4 w-4 rounded-full bg-background shadow transition-transform', on ? 'translate-x-4' : 'translate-x-0')} /></button>
  return (
    <div className={cn('space-y-6', className)}>
      <div><h3 className="text-lg font-semibold">Notifications</h3><p className="text-sm text-muted-foreground">Choose how you want to be notified.</p></div>
      <div className="rounded-lg border overflow-hidden"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Category</th><th className="px-4 py-3 text-center font-medium">Email</th><th className="px-4 py-3 text-center font-medium">Push</th><th className="px-4 py-3 text-center font-medium">SMS</th></tr></thead><tbody>{channels.map((c, i) => <tr key={i} className="border-b"><td className="px-4 py-3">{c.label}</td><td className="px-4 py-3 text-center"><Sw on={c.email} onClick={() => toggle(i, 'email')} /></td><td className="px-4 py-3 text-center"><Sw on={c.push} onClick={() => toggle(i, 'push')} /></td><td className="px-4 py-3 text-center"><Sw on={c.sms} onClick={() => toggle(i, 'sms')} /></td></tr>)}</tbody></table></div>
      <button onClick={() => onSave?.(channels)} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save preferences</button>
    </div>
  )
}
`,

  'block-settings-billing': `import { cn } from '@/lib/utils'

export function SettingsBilling({ plan, usage, className }: { plan: { name: string; price: string; period: string }; usage: { label: string; used: number; total: number }[]; className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      <div><h3 className="text-lg font-semibold">Billing</h3><p className="text-sm text-muted-foreground">Manage your plan and billing information.</p></div>
      <div className="rounded-lg border p-6"><div className="flex items-center justify-between"><div><h4 className="text-sm font-semibold">Current Plan</h4><p className="text-2xl font-bold mt-1">{plan.name}<span className="text-sm font-normal text-muted-foreground ml-2">{plan.price}/{plan.period}</span></p></div><button className="inline-flex h-10 items-center justify-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent">Change plan</button></div></div>
      <div className="rounded-lg border p-6 space-y-4"><h4 className="text-sm font-semibold">Usage</h4>{usage.map((u, i) => <div key={i}><div className="flex items-center justify-between text-sm mb-1"><span>{u.label}</span><span className="text-muted-foreground">{u.used.toLocaleString()} / {u.total.toLocaleString()}</span></div><div className="h-2 w-full overflow-hidden rounded-full bg-secondary"><div className="h-full bg-primary transition-all" style={{ width: \`\${(u.used / u.total) * 100}%\` }} /></div></div>)}</div>
    </div>
  )
}
`,

  'block-settings-page': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function SettingsPage({ tabs, className }: { tabs: { label: string; content: React.ReactNode }[]; className?: string }) {
  const [active, setActive] = React.useState(0)
  return (
    <div className={cn('mx-auto max-w-3xl space-y-6', className)}>
      <div><h1 className="text-2xl font-bold tracking-tight">Settings</h1><p className="text-muted-foreground">Manage your account settings and preferences.</p></div>
      <div className="flex gap-1 border-b">{tabs.map((t, i) => <button key={i} onClick={() => setActive(i)} className={cn('px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px', active === i ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>{t.label}</button>)}</div>
      <div>{tabs[active]?.content}</div>
    </div>
  )
}
`,

  // ─── Data Pages ───────────────────────────────────────────────────────

  'block-table-page': `import { cn } from '@/lib/utils'

export function TablePage({ title, description, searchPlaceholder, actions, children, className }: { title: string; description?: string; searchPlaceholder?: string; actions?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold tracking-tight">{title}</h1>{description && <p className="text-muted-foreground">{description}</p>}</div>{actions}</div>
      {children}
    </div>
  )
}
`,

  'block-detail-page': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function DetailPage({ title, subtitle, status, actions, tabs, className }: { title: string; subtitle?: string; status?: { label: string; variant?: string }; actions?: React.ReactNode; tabs: { label: string; content: React.ReactNode }[]; className?: string }) {
  const [activeTab, setActiveTab] = React.useState(0)
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><div className="flex items-center gap-3"><h1 className="text-2xl font-bold tracking-tight">{title}</h1>{status && <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">{status.label}</span>}</div>{subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}</div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="flex gap-1 border-b">{tabs.map((t, i) => <button key={i} onClick={() => setActiveTab(i)} className={cn('px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors', activeTab === i ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>{t.label}</button>)}</div>
      <div>{tabs[activeTab]?.content}</div>
    </div>
  )
}
`,

  'block-list-filter-page': `import { cn } from '@/lib/utils'

export function ListFilterPage({ title, filters, children, className }: { title: string; filters: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex h-full gap-6', className)}>
      <aside className="hidden w-64 shrink-0 lg:block"><div className="sticky top-6 space-y-6"><h2 className="text-sm font-semibold">Filters</h2>{filters}</div></aside>
      <div className="flex-1 space-y-4"><h1 className="text-2xl font-bold tracking-tight">{title}</h1>{children}</div>
    </div>
  )
}
`,

  'block-kanban-page': `import { cn } from '@/lib/utils'

export function KanbanPage({ title, actions, children, className }: { title: string; actions?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="flex items-center justify-between border-b px-6 py-4"><h1 className="text-xl font-bold">{title}</h1>{actions}</div>
      <div className="flex-1 overflow-x-auto p-6">{children}</div>
    </div>
  )
}
`,

  // ─── E-commerce ───────────────────────────────────────────────────────

  'block-product-card': `import { cn } from '@/lib/utils'

interface Product { name: string; price: string; image?: string; rating?: number; badge?: string }

export function ProductCard({ product, onAddToCart, onWishlist, className }: { product: Product; onAddToCart?: () => void; onWishlist?: () => void; className?: string }) {
  return (
    <div className={cn('group rounded-lg border bg-card overflow-hidden', className)}>
      <div className="relative aspect-square bg-muted">{product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-muted-foreground">Image</div>}{product.badge && <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">{product.badge}</span>}{onWishlist && <button onClick={onWishlist} className="absolute top-2 right-2 rounded-full bg-background/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-background"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></button>}</div>
      <div className="p-4"><h3 className="text-sm font-semibold">{product.name}</h3><div className="mt-1 flex items-center justify-between"><span className="text-lg font-bold">{product.price}</span>{product.rating && <span className="text-xs text-muted-foreground">{'\\u2605'.repeat(Math.round(product.rating))} {product.rating}</span>}</div><button onClick={onAddToCart} className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">Add to cart</button></div>
    </div>
  )
}
`,

  'block-product-grid': `import { cn } from '@/lib/utils'

export function ProductGrid({ title, filterSlot, sortSlot, children, className }: { title: string; filterSlot?: React.ReactNode; sortSlot?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold tracking-tight">{title}</h1><div className="flex items-center gap-3">{filterSlot}{sortSlot}</div></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
    </div>
  )
}
`,

  'block-cart': `import { cn } from '@/lib/utils'

interface CartItem { id: string; name: string; price: string; quantity: number; image?: string }

export function ShoppingCart({ items, onUpdateQty, onRemove, onCheckout, className }: { items: CartItem[]; onUpdateQty?: (id: string, qty: number) => void; onRemove?: (id: string) => void; onCheckout?: () => void; className?: string }) {
  const total = items.reduce((s, i) => s + parseFloat(i.price.replace(/[^0-9.]/g, '')) * i.quantity, 0)
  return (
    <div className={cn('mx-auto max-w-2xl space-y-6', className)}>
      <h1 className="text-2xl font-bold tracking-tight">Shopping Cart ({items.length})</h1>
      {items.length === 0 ? <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">Your cart is empty</div> : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
              <div className="h-16 w-16 shrink-0 rounded-md bg-muted">{item.image && <img src={item.image} alt={item.name} className="h-full w-full rounded-md object-cover" />}</div>
              <div className="flex-1 min-w-0"><h3 className="text-sm font-semibold truncate">{item.name}</h3><p className="text-sm font-bold mt-0.5">{item.price}</p></div>
              <div className="flex items-center gap-2"><button onClick={() => onUpdateQty?.(item.id, item.quantity - 1)} className="h-8 w-8 rounded-md border text-sm hover:bg-accent">-</button><span className="w-8 text-center text-sm">{item.quantity}</span><button onClick={() => onUpdateQty?.(item.id, item.quantity + 1)} className="h-8 w-8 rounded-md border text-sm hover:bg-accent">+</button></div>
              <button onClick={() => onRemove?.(item.id)} className="text-muted-foreground hover:text-destructive">&times;</button>
            </div>
          ))}
          <div className="rounded-lg border p-4"><div className="flex items-center justify-between text-lg font-bold"><span>Total</span><span>\${total.toFixed(2)}</span></div><button onClick={onCheckout} className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">Checkout</button></div>
        </div>
      )}
    </div>
  )
}
`,

  'block-checkout': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function CheckoutPage({ steps, className }: { steps: { label: string; content: React.ReactNode }[]; className?: string }) {
  const [active, setActive] = React.useState(0)
  return (
    <div className={cn('mx-auto max-w-2xl space-y-8', className)}>
      <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
      <div className="flex items-center gap-2">{steps.map((s, i) => <React.Fragment key={i}><div className="flex items-center gap-2"><div className={cn('flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium', i <= active ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30 text-muted-foreground')}>{i < active ? '\\u2713' : i + 1}</div><span className={cn('text-sm', i <= active ? 'font-medium' : 'text-muted-foreground')}>{s.label}</span></div>{i < steps.length - 1 && <div className="h-[2px] flex-1 bg-muted-foreground/20" />}</React.Fragment>)}</div>
      <div className="rounded-lg border p-6">{steps[active]?.content}</div>
      <div className="flex justify-between"><button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0} className="inline-flex h-10 items-center justify-center rounded-md border border-input px-4 text-sm font-medium hover:bg-accent disabled:opacity-50">Back</button><button onClick={() => setActive(Math.min(steps.length - 1, active + 1))} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">{active === steps.length - 1 ? 'Place Order' : 'Continue'}</button></div>
    </div>
  )
}
`,

  // ─── AI Pages ─────────────────────────────────────────────────────────

  'block-chat-page': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface Message { id: string; role: 'user' | 'assistant'; content: string }
interface Conversation { id: string; title: string; active?: boolean }

export function ChatPage({ conversations, messages, onSend, onNewChat, onSelectConversation, suggestions, className }: { conversations: Conversation[]; messages: Message[]; onSend?: (msg: string) => void; onNewChat?: () => void; onSelectConversation?: (id: string) => void; suggestions?: string[]; className?: string }) {
  const [input, setInput] = React.useState('')
  const bottomRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  const send = () => { if (!input.trim()) return; onSend?.(input.trim()); setInput('') }

  return (
    <div className={cn('flex h-screen', className)}>
      <aside className="hidden w-64 flex-col border-r md:flex">
        <div className="flex h-14 items-center justify-between border-b px-4"><span className="text-sm font-semibold">Conversations</span><button onClick={onNewChat} className="rounded-md p-1.5 hover:bg-accent"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button></div>
        <nav className="flex-1 overflow-auto p-2">{conversations.map(c => <button key={c.id} onClick={() => onSelectConversation?.(c.id)} className={cn('flex w-full items-center rounded-md px-3 py-2 text-sm text-left hover:bg-accent truncate', c.active && 'bg-accent font-medium')}>{c.title}</button>)}</nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && suggestions && <div className="flex h-full flex-col items-center justify-center gap-4"><h2 className="text-xl font-semibold">How can I help?</h2><div className="flex flex-wrap justify-center gap-2">{suggestions.map((s, i) => <button key={i} onClick={() => { onSend?.(s) }} className="rounded-full border px-3 py-1.5 text-sm hover:bg-accent">{s}</button>)}</div></div>}
          {messages.map(m => <div key={m.id} className={cn('flex gap-3', m.role === 'user' ? 'justify-end' : '')}>{m.role === 'assistant' && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">AI</div>}<div className={cn('max-w-[70%] rounded-lg px-4 py-2 text-sm', m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>{m.content}</div></div>)}
          <div ref={bottomRef} />
        </div>
        <div className="border-t p-4"><div className="mx-auto flex max-w-2xl gap-2"><textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} placeholder="Message..." rows={1} className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /><button onClick={send} disabled={!input.trim()} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">Send</button></div></div>
      </div>
    </div>
  )
}
`,

  'block-ai-playground': `import { cn } from '@/lib/utils'

export function AIPlayground({ leftSlot, rightSlot, controlsSlot, className }: { leftSlot: React.ReactNode; rightSlot: React.ReactNode; controlsSlot?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex h-screen flex-col', className)}>
      <div className="flex h-14 items-center justify-between border-b px-4"><h1 className="text-sm font-bold">AI Playground</h1>{controlsSlot}</div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto border-r p-4">{leftSlot}</div>
        <div className="flex-1 overflow-auto p-4">{rightSlot}</div>
      </div>
    </div>
  )
}
`,

  // ─── Error Pages ──────────────────────────────────────────────────────

  'block-404': `import { cn } from '@/lib/utils'

export function NotFoundPage({ onGoHome, className }: { onGoHome?: () => void; className?: string }) {
  return (
    <div className={cn('flex min-h-screen flex-col items-center justify-center px-4 text-center', className)}>
      <h1 className="text-8xl font-bold text-muted-foreground/20">404</h1>
      <h2 className="mt-4 text-2xl font-bold">Page not found</h2>
      <p className="mt-2 text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
      <button onClick={onGoHome} className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90">Go home</button>
    </div>
  )
}
`,

  'block-500': `import { cn } from '@/lib/utils'

export function ServerErrorPage({ onRetry, onGoHome, className }: { onRetry?: () => void; onGoHome?: () => void; className?: string }) {
  return (
    <div className={cn('flex min-h-screen flex-col items-center justify-center px-4 text-center', className)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-destructive mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-muted-foreground">An unexpected error occurred. Please try again.</p>
      <div className="mt-8 flex gap-3"><button onClick={onRetry} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90">Try again</button><button onClick={onGoHome} className="inline-flex h-10 items-center justify-center rounded-md border border-input px-6 text-sm font-medium hover:bg-accent">Go home</button></div>
    </div>
  )
}
`,

  'block-maintenance': `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function MaintenancePage({ estimatedTime, onNotify, className }: { estimatedTime?: string; onNotify?: (email: string) => void; className?: string }) {
  const [email, setEmail] = React.useState('')
  return (
    <div className={cn('flex min-h-screen flex-col items-center justify-center px-4 text-center', className)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground mb-4"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
      <h2 className="text-2xl font-bold">Under Maintenance</h2>
      <p className="mt-2 text-muted-foreground">We're performing scheduled maintenance. We'll be back shortly.</p>
      {estimatedTime && <p className="mt-1 text-sm text-muted-foreground">Estimated time: {estimatedTime}</p>}
      {onNotify && <div className="mt-8 flex gap-2"><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="flex h-10 w-60 rounded-md border border-input bg-background px-3 py-2 text-sm" /><button onClick={() => onNotify(email)} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">Notify me</button></div>}
    </div>
  )
}
`,
};

/** Unified block templates: legacy inline blocks + new per-file blocks. */
export const blockTemplates: Record<string, string> = {
  ...legacyBlockTemplates,
  ...newBlockTemplates,
};
