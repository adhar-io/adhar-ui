// deno-lint-ignore-file
export const template = `'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function Newsletter({ heading = 'Stay in the loop', subheading = 'Get the latest updates and tips delivered to your inbox. No spam, unsubscribe anytime.', proofText, onSubscribe, className }: { heading?: string; subheading?: string; proofText?: string; onSubscribe?: (email: string) => void | Promise<void>; className?: string }) {
  const [email, setEmail] = React.useState('')
  const [state, setState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const submit = async (e: React.FormEvent) => { e.preventDefault(); if (!email) return; setState('loading'); try { await onSubscribe?.(email); setState('success'); setEmail('') } catch { setState('error') } }
  return (
    <section className={cn('py-20 px-4', className)}>
      <div className="mx-auto max-w-2xl rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card p-8 sm:p-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">{subheading}</p>
        <form onSubmit={submit} className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-2 sm:max-w-md sm:mx-auto">
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="flex h-11 flex-1 rounded-lg border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <button type="submit" disabled={state === 'loading'} className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">{state === 'loading' ? 'Subscribing…' : 'Subscribe'}</button>
        </form>
        {state === 'success' && <p className="mt-3 text-sm text-emerald-600">✓ You're on the list. Check your inbox.</p>}
        {state === 'error' && <p className="mt-3 text-sm text-destructive">Something went wrong. Please try again.</p>}
        {proofText && <p className="mt-6 text-xs text-muted-foreground/70">{proofText}</p>}
      </div>
    </section>
  )
}
`;
