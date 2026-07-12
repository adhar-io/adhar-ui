/**
 * Curated preview "schematics" for the blocks gallery.
 *
 * Blocks are full page sections — rendering them at scale-[0.55] looks
 * cramped and breaks layouts. These are hand-designed mini-illustrations
 * sized for ~280x160 cards, like Stripe / Vercel / Linear gallery cards.
 *
 * Each preview uses theme tokens (--primary, --border, --card) so it works
 * in both light and dark mode automatically.
 */
import React from 'react';

// ─── Shared visual primitives ────────────────────────────────────────────────
const Bar = ({ w, h = 6, opacity = 0.6, color = 'bg-foreground' }: { w: string | number; h?: number; opacity?: number; color?: string }) => (
  <div className={`rounded-sm ${color}`} style={{ width: w, height: h, opacity: opacity * 0.4 }} />
);
const Pill = ({ label, primary = false, size = 'default' }: { label?: string; primary?: boolean; size?: 'sm' | 'default' }) => (
  <div className={`px-2 rounded-md text-[9px] font-semibold flex items-center ${size === 'sm' ? 'h-4' : 'h-5'} ${primary ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground/70'}`}>
    {label || ''}
  </div>
);
const Frame = ({ children, pad = true }: { children: React.ReactNode; pad?: boolean }) => (
  <div className={`relative w-full h-full ${pad ? 'p-3' : ''} flex items-center justify-center`}>{children}</div>
);

// ─── Preview kinds ───────────────────────────────────────────────────────────
type Kind =
  | 'login' | 'signup' | 'forgot-password' | 'otp-verify'
  | 'dashboard-stats' | 'dashboard-chart' | 'dashboard-activity' | 'dashboard-overview'
  | 'hero' | 'features' | 'pricing' | 'testimonials' | 'cta' | 'faq' | 'footer' | 'header'
  | 'newsletter' | 'integrations' | 'comparison-table' | 'video-hero' | 'banner-announcement'
  | 'team-grid' | 'blog-grid' | 'stats-grid'
  | 'sidebar-layout' | 'command-menu'
  | 'settings-profile' | 'settings-account' | 'settings-notifications' | 'settings-billing' | 'settings-page'
  | 'table-page' | 'detail-page' | 'list-filter-page' | 'kanban-page'
  | 'billing-invoices' | 'notifications-center' | 'search-results' | 'profile'
  | 'onboarding' | 'timeline-page' | 'empty-state-page' | 'loading-page' | 'tabs-page' | 'card-grid'
  | 'multistep-form' | 'stepper-form'
  | 'product-card' | 'product-grid' | 'cart' | 'checkout'
  | 'chat-page' | 'ai-playground'
  | '404' | '500' | 'maintenance'
  | 'generic';

const SLUG_TO_KIND: Record<string, Kind> = {
  // map full slug names like 'block-login' → 'login'
};

// ─── Preview renderers ───────────────────────────────────────────────────────
function Render({ kind }: { kind: Kind }) {
  switch (kind) {
    // ── Auth ────────────────────────────────────────────────────────────
    case 'login':
    case 'signup':
      return (
        <Frame pad={false}>
          <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5' />
          <div className='relative w-44 rounded-lg border bg-card p-3 shadow-md'>
            <div className='w-7 h-7 mx-auto mb-2 rounded-lg bg-primary/15 flex items-center justify-center'>
              <div className='w-3.5 h-3.5 rounded bg-primary' />
            </div>
            <div className='text-center mb-3'>
              <div className='text-[10px] font-bold'>{kind === 'login' ? 'Welcome back' : 'Create account'}</div>
              <div className='text-[8px] text-muted-foreground'>Continue with email</div>
            </div>
            <div className='space-y-1.5'>
              <div className='h-5 rounded border border-border bg-background' />
              <div className='h-5 rounded border border-border bg-background' />
              {kind === 'signup' && <div className='h-5 rounded border border-border bg-background' />}
              <div className='h-5 rounded bg-primary' />
            </div>
            <div className='flex items-center gap-1 my-2'>
              <div className='flex-1 h-px bg-border' />
              <span className='text-[8px] text-muted-foreground'>or</span>
              <div className='flex-1 h-px bg-border' />
            </div>
            <div className='flex gap-1'>
              <div className='flex-1 h-5 rounded border border-border bg-background' />
              <div className='flex-1 h-5 rounded border border-border bg-background' />
            </div>
          </div>
        </Frame>
      );
    case 'forgot-password':
      return (
        <Frame>
          <div className='w-44 rounded-lg border bg-card p-3 shadow-md'>
            <div className='w-7 h-7 mx-auto mb-2 rounded-full bg-primary/15 flex items-center justify-center text-primary'>🔑</div>
            <div className='text-center mb-3'>
              <div className='text-[10px] font-bold'>Reset password</div>
              <div className='text-[8px] text-muted-foreground'>We'll email you a link</div>
            </div>
            <div className='space-y-1.5'>
              <div className='h-5 rounded border border-border bg-background' />
              <div className='h-5 rounded bg-primary' />
            </div>
            <div className='text-center mt-2 text-[8px] text-primary'>← Back to login</div>
          </div>
        </Frame>
      );
    case 'otp-verify':
      return (
        <Frame>
          <div className='w-48 text-center'>
            <div className='text-[10px] font-bold mb-1'>Enter verification code</div>
            <div className='text-[8px] text-muted-foreground mb-3'>Sent to you****@meridian.co</div>
            <div className='flex gap-1 justify-center'>
              {[2, 0, 4, 7, 9, 1].map((d, i) => (
                <div key={i} className={`w-6 h-7 rounded-md border ${i === 3 ? 'border-primary ring-2 ring-primary/20' : 'border-border'} bg-card flex items-center justify-center text-[10px] font-mono font-bold`}>
                  {i < 4 ? d : ''}
                </div>
              ))}
            </div>
            <div className='text-[8px] text-muted-foreground mt-3'>Resend in <span className='font-mono'>0:42</span></div>
          </div>
        </Frame>
      );

    // ── Dashboard ───────────────────────────────────────────────────────
    case 'dashboard-stats':
    case 'stats-grid':
      return (
        <Frame>
          <div className='grid grid-cols-2 gap-1.5 w-full max-w-[200px]'>
            {[
              { l: 'Revenue', v: '$48K', c: '+12%', up: true },
              { l: 'Users', v: '2.3K', c: '+18%', up: true },
              { l: 'MRR', v: '$12K', c: '+4%', up: true },
              { l: 'Churn', v: '2.1%', c: '-0.3%', up: false },
            ].map((s, i) => (
              <div key={i} className='rounded-md border bg-card p-2'>
                <div className='text-[7px] text-muted-foreground uppercase tracking-wider'>{s.l}</div>
                <div className='text-sm font-bold tabular-nums'>{s.v}</div>
                <div className={`text-[8px] font-semibold ${s.up ? 'text-emerald-500' : 'text-rose-500'}`}>{s.up ? '↑' : '↓'} {s.c}</div>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'dashboard-chart':
      return (
        <Frame>
          <div className='w-full max-w-[200px] rounded-md border bg-card p-2.5'>
            <div className='flex items-center justify-between mb-2'>
              <div className='text-[9px] font-semibold'>Revenue</div>
              <Pill label='30d' size='sm' />
            </div>
            <svg width='100%' height='50' viewBox='0 0 200 60'>
              <defs><linearGradient id='dc-area' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stopColor='hsl(var(--primary))' stopOpacity='0.4' /><stop offset='1' stopColor='hsl(var(--primary))' stopOpacity='0' /></linearGradient></defs>
              <path d='M0,40 Q40,20 70,28 T130,18 T200,22 L200,60 L0,60 Z' fill='url(#dc-area)' />
              <path d='M0,40 Q40,20 70,28 T130,18 T200,22' fill='none' stroke='hsl(var(--primary))' strokeWidth='1.5' />
            </svg>
          </div>
        </Frame>
      );
    case 'dashboard-activity':
      return (
        <Frame>
          <div className='w-full max-w-[200px] rounded-md border bg-card p-2 space-y-1'>
            <div className='text-[9px] font-semibold mb-1'>Recent activity</div>
            {[
              // Hard-code full class names so Tailwind's content scanner picks them up
              { bg: 'bg-emerald-500/15', tx: 'text-emerald-500', n: 'PM' },
              { bg: 'bg-blue-500/15', tx: 'text-blue-500', n: 'MC' },
              { bg: 'bg-amber-500/15', tx: 'text-amber-500', n: 'SR' },
            ].map((u, i) => (
              <div key={i} className='flex items-center gap-1.5'>
                <div className={`w-5 h-5 rounded-full ${u.bg} ${u.tx} flex items-center justify-center text-[7px] font-bold`}>{u.n}</div>
                <div className='flex-1'><Bar w='80%' h={3} opacity={0.7} /></div>
                <span className='text-[7px] text-muted-foreground'>{i + 2}m</span>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'dashboard-overview':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 grid grid-cols-2 gap-1'>
            <div className='col-span-2 grid grid-cols-4 gap-1'>
              {[1,2,3,4].map(i => <div key={i} className='rounded border bg-card p-1.5'><div className='text-[7px] text-muted-foreground'>KPI</div><div className='text-[10px] font-bold'>{i*12}K</div></div>)}
            </div>
            <div className='col-span-1 rounded border bg-card p-2'>
              <div className='text-[8px] font-semibold mb-1'>Chart</div>
              <svg width='100%' height='30' viewBox='0 0 80 30'><polyline points='0,22 20,12 40,18 60,8 80,14' fill='none' stroke='hsl(var(--primary))' strokeWidth='1.5' /></svg>
            </div>
            <div className='col-span-1 rounded border bg-card p-2'>
              <div className='text-[8px] font-semibold mb-1'>Activity</div>
              {[1,2,3].map(i => <div key={i} className='flex gap-1 mb-0.5 items-center'><div className='w-2 h-2 rounded-full bg-primary/40'/><Bar w='80%' h={2.5} opacity={0.5}/></div>)}
            </div>
          </div>
        </Frame>
      );

    // ── Marketing ───────────────────────────────────────────────────────
    case 'hero':
      return (
        <Frame>
          <div className='text-center space-y-1.5'>
            <Pill label='✨ NEW' primary size='sm' />
            <div className='text-sm font-bold tracking-tight leading-tight'>Build something<br/>incredible</div>
            <div className='text-[8px] text-muted-foreground max-w-[170px] mx-auto'>The fastest way to ship modern apps. Designed for teams.</div>
            <div className='flex items-center justify-center gap-1.5 pt-1'>
              <div className='h-6 px-3 rounded-md bg-primary text-primary-foreground text-[9px] font-bold flex items-center'>Get started</div>
              <div className='h-6 px-3 rounded-md border border-border bg-card text-[9px] font-medium flex items-center'>Demo</div>
            </div>
          </div>
        </Frame>
      );
    case 'video-hero':
      return (
        <Frame pad={false}>
          <div className='absolute inset-0 bg-gradient-to-br from-primary/30 via-foreground/10 to-foreground/40' />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/80' />
          <div className='relative text-center space-y-2'>
            <div className='text-sm font-black tracking-tight'>Watch it in action</div>
            <div className='flex items-center justify-center gap-1.5'>
              <div className='h-7 px-4 rounded-md bg-primary text-primary-foreground text-[10px] font-bold flex items-center shadow-lg'>Get started</div>
              <div className='h-7 px-3 rounded-md bg-card/80 backdrop-blur border text-[10px] font-medium flex items-center gap-1'>▶ Watch demo</div>
            </div>
          </div>
        </Frame>
      );
    case 'features':
      return (
        <Frame>
          <div className='grid grid-cols-3 gap-1.5 w-full max-w-[210px]'>
            {[{ i: '⚡', t: 'Fast' }, { i: '🔒', t: 'Secure' }, { i: '✨', t: 'Smart' }].map((f, i) => (
              <div key={i} className='rounded-md border bg-card p-2 flex flex-col gap-1'>
                <div className='w-5 h-5 rounded bg-primary/15 flex items-center justify-center text-[10px]'>{f.i}</div>
                <div className='text-[9px] font-semibold'>{f.t}</div>
                <Bar w='100%' h={2} opacity={0.5} />
                <Bar w='70%' h={2} opacity={0.5} />
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'pricing':
    case 'comparison-table':
      return (
        <Frame>
          <div className='grid grid-cols-3 gap-1.5 w-full max-w-[210px]'>
            {['Starter', 'Pro', 'Team'].map((p, i) => (
              <div key={p} className={`rounded-md border bg-card p-2 flex flex-col gap-1 ${i === 1 ? 'ring-2 ring-primary' : ''}`}>
                <div className='text-[7px] font-bold uppercase tracking-wider text-muted-foreground'>{p}</div>
                <div className='text-base font-bold tabular-nums'>${[0, 29, 99][i]}</div>
                <div className='space-y-0.5 mt-1'>
                  {[1, 2, 3].map(j => <div key={j} className='flex items-center gap-1 text-[7px] text-muted-foreground'><span className='text-primary'>✓</span><Bar w='80%' h={2} opacity={0.5} /></div>)}
                </div>
                <div className={`mt-1 h-4 rounded text-[8px] flex items-center justify-center font-bold ${i === 1 ? 'bg-primary text-primary-foreground' : 'border border-border'}`}>Choose</div>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'testimonials':
      return (
        <Frame>
          <div className='grid grid-cols-2 gap-1.5 w-full max-w-[210px]'>
            {[{ n: 'PM', q: 'Replaced 3 tools' }, { n: 'MC', q: 'Saved hours' }].map((t, i) => (
              <div key={i} className='rounded-md border bg-card p-2'>
                <div className='text-[8px] italic font-medium leading-snug'>"{t.q}."</div>
                <div className='flex items-center gap-1 mt-2'>
                  <div className='w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center text-[7px] font-bold text-primary'>{t.n}</div>
                  <Bar w={36} h={2} opacity={0.5} />
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'cta':
      return (
        <Frame>
          <div className='text-center space-y-1.5 w-full max-w-[200px] rounded-lg p-3 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20'>
            <div className='text-xs font-bold tracking-tight'>Ready to ship?</div>
            <div className='text-[8px] text-muted-foreground'>Join thousands of teams</div>
            <div className='h-6 px-4 rounded-md bg-primary text-primary-foreground text-[9px] font-bold inline-flex items-center'>Start free trial</div>
          </div>
        </Frame>
      );
    case 'faq':
      return (
        <Frame>
          <div className='w-full max-w-[200px] divide-y divide-border border bg-card rounded-md'>
            {[true, false, false].map((open, i) => (
              <div key={i} className={`px-2 py-1.5 ${open ? '' : 'text-muted-foreground'}`}>
                <div className='flex items-center justify-between'>
                  <Bar w='65%' h={3} opacity={open ? 1 : 0.6} />
                  <span className='text-[10px]'>{open ? '−' : '+'}</span>
                </div>
                {open && <div className='mt-1.5 space-y-0.5'><Bar w='100%' h={2} opacity={0.5} /><Bar w='80%' h={2} opacity={0.5} /></div>}
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'footer':
      return (
        <Frame>
          <div className='w-full max-w-[210px] border-t border-border pt-2'>
            <div className='grid grid-cols-4 gap-2'>
              {['Product', 'Company', 'Resources', 'Legal'].map(t => (
                <div key={t} className='space-y-1'>
                  <div className='text-[7px] font-bold'>{t}</div>
                  {[1,2,3].map(i => <Bar key={i} w='90%' h={2} opacity={0.4} />)}
                </div>
              ))}
            </div>
            <div className='flex items-center justify-between mt-3 pt-2 border-t border-border'>
              <div className='text-[7px] text-muted-foreground'>© 2026 Acme</div>
              <div className='flex gap-1'>
                {['•','•','•'].map((d, i) => <div key={i} className='w-2 h-2 rounded-full bg-muted' />)}
              </div>
            </div>
          </div>
        </Frame>
      );
    case 'header':
      return (
        <Frame>
          <div className='w-full max-w-[210px] flex items-center justify-between border-b border-border pb-2'>
            <div className='flex items-center gap-2'>
              <div className='w-5 h-5 rounded bg-primary' />
              <div className='text-[9px] font-bold'>Brand</div>
            </div>
            <div className='hidden sm:flex items-center gap-2 text-[8px] text-muted-foreground'>
              <span>Product</span><span>Pricing</span><span>Docs</span>
            </div>
            <div className='flex items-center gap-1'>
              <div className='h-5 px-2 rounded border border-border text-[8px] font-medium flex items-center'>Sign in</div>
              <div className='h-5 px-2 rounded bg-primary text-primary-foreground text-[8px] font-bold flex items-center'>Get started</div>
            </div>
          </div>
        </Frame>
      );
    case 'newsletter':
      return (
        <Frame>
          <div className='text-center w-full max-w-[200px] rounded-lg p-3 bg-gradient-to-br from-primary/8 to-card border'>
            <div className='text-xs font-bold'>Stay in the loop</div>
            <div className='text-[8px] text-muted-foreground mb-2'>Weekly. No spam.</div>
            <div className='flex gap-1'>
              <div className='flex-1 h-6 rounded-md border border-border bg-background flex items-center px-2'>
                <span className='text-[8px] text-muted-foreground'>you@company.com</span>
              </div>
              <div className='h-6 px-2 rounded-md bg-primary text-primary-foreground text-[8px] font-bold flex items-center'>Join</div>
            </div>
          </div>
        </Frame>
      );
    case 'integrations':
      return (
        <Frame>
          <div className='grid grid-cols-4 gap-1 w-full max-w-[200px]'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className='aspect-square rounded-md border bg-card flex items-center justify-center text-muted-foreground'>
                <div className='w-3 h-3 rounded' style={{ background: ['#61DAFB', '#4FC08D', '#FF3E00', '#DD0031', '#06B6D4', '#3178C6', '#FF5D01', '#000'][i] }} />
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'banner-announcement':
      return (
        <Frame>
          <div className='w-full max-w-[230px] flex items-center justify-center gap-2 rounded-md bg-foreground text-background py-1.5 px-2'>
            <span className='text-[8px] font-medium'>🎉 New: Adhar UI v2.0 is here</span>
            <span className='text-[8px] font-bold border border-current/20 rounded px-1.5 py-px'>Read more</span>
          </div>
        </Frame>
      );
    case 'team-grid':
      return (
        <Frame>
          <div className='grid grid-cols-3 gap-2'>
            {[
              { c: 'from-purple-400 to-pink-400', n: 'PM' },
              { c: 'from-emerald-400 to-cyan-400', n: 'MC' },
              { c: 'from-amber-400 to-rose-400', n: 'SR' },
            ].map((m, i) => (
              <div key={i} className='text-center'>
                <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${m.c} flex items-center justify-center text-white text-[10px] font-bold mb-1 ring-2 ring-card shadow`}>{m.n}</div>
                <Bar w='80%' h={3} opacity={0.7} />
                <div className='h-0.5' />
                <Bar w='60%' h={2} opacity={0.5} />
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'blog-grid':
      return (
        <Frame>
          <div className='grid grid-cols-2 gap-1.5 w-full max-w-[210px]'>
            {[1, 2].map(i => (
              <div key={i} className='rounded-md border bg-card overflow-hidden'>
                <div className='aspect-video bg-gradient-to-br from-primary/15 to-primary/5' />
                <div className='p-1.5'>
                  <Pill label='Tutorial' size='sm' />
                  <div className='mt-1 space-y-0.5'>
                    <Bar w='90%' h={3} opacity={0.7} />
                    <Bar w='70%' h={3} opacity={0.7} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );

    // ── Settings (shared template) ──────────────────────────────────────
    case 'settings-page':
    case 'settings-profile':
    case 'settings-account':
    case 'settings-notifications':
    case 'settings-billing': {
      const labels: Record<string, string[]> = {
        'settings-profile': ['Name', 'Email', 'Bio'],
        'settings-account': ['Username', 'Password', 'Email'],
        'settings-notifications': ['Email', 'Push', 'Weekly'],
        'settings-billing': ['Plan', 'Card', 'Address'],
        'settings-page': ['Profile', 'Account', 'Billing'],
      };
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 flex gap-2'>
            <div className='w-[35%] space-y-0.5'>
              {labels[kind].map((l, i) => (
                <div key={i} className={`px-1.5 py-1 rounded ${i === 0 ? 'bg-primary/10 text-primary' : 'text-muted-foreground'} text-[8px] font-medium`}>{l}</div>
              ))}
            </div>
            <div className='flex-1 rounded-md border bg-card p-2 space-y-1.5'>
              <div className='text-[9px] font-bold'>{labels[kind][0]}</div>
              {[1,2,3].map(i => (
                <div key={i} className='space-y-0.5'>
                  <Bar w='30%' h={2} opacity={0.5} />
                  <div className='h-3.5 rounded border border-border bg-background' />
                </div>
              ))}
              <div className='h-4 px-2 rounded bg-primary text-primary-foreground text-[8px] font-bold flex items-center w-fit'>Save</div>
            </div>
          </div>
        </Frame>
      );
    }

    // ── App: list / detail / table / kanban ──────────────────────────────
    case 'table-page':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border bg-card overflow-hidden'>
            <div className='flex items-center justify-between px-2 py-1.5 border-b border-border'>
              <div className='text-[8px] font-bold'>Users</div>
              <div className='h-4 px-1.5 rounded bg-primary text-primary-foreground text-[7px] font-bold flex items-center'>+ New</div>
            </div>
            <div className='flex items-center px-2 py-1 border-b border-border bg-muted/30'>
              {['Name', 'Status', 'Date'].map(h => <div key={h} className='flex-1 text-[7px] font-bold text-muted-foreground uppercase'>{h}</div>)}
            </div>
            {[1,2,3,4].map(i => (
              <div key={i} className='flex items-center px-2 py-1 border-b border-border/50 last:border-0'>
                <div className='flex-1 text-[8px] font-medium'>Row {i}</div>
                <div className='flex-1'><Pill label='Active' size='sm' /></div>
                <div className='flex-1 text-[7px] text-muted-foreground'>Mar {i + 5}</div>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'detail-page':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border bg-card p-2 flex flex-col gap-1.5'>
            <div className='flex items-center gap-1 text-[7px] text-muted-foreground'>
              <span>Users</span><span>›</span><span>Alice</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-[8px] font-bold text-primary'>A</div>
              <div className='flex-1'>
                <div className='text-[10px] font-bold'>Alice Johnson</div>
                <div className='text-[7px] text-muted-foreground'>alice@meridian.co</div>
              </div>
              <div className='h-4 px-2 rounded border text-[8px] font-medium flex items-center'>Edit</div>
            </div>
            <div className='grid grid-cols-3 gap-1 mt-1'>
              {[1,2,3].map(i => <div key={i} className='rounded border bg-card/50 p-1.5'><Bar w='60%' h={2.5} opacity={0.5} /><div className='h-0.5' /><Bar w='40%' h={4} opacity={1} /></div>)}
            </div>
          </div>
        </Frame>
      );
    case 'list-filter-page':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 flex gap-1.5'>
            <div className='w-[30%] rounded-md border bg-card p-1.5 space-y-1'>
              <div className='text-[7px] font-bold mb-1'>Filters</div>
              {[1,2,3,4].map(i => (
                <div key={i} className='flex items-center gap-1'>
                  <div className={`w-2 h-2 rounded ${i === 1 ? 'bg-primary' : 'border border-border'}`} />
                  <Bar w='80%' h={2} opacity={0.5} />
                </div>
              ))}
            </div>
            <div className='flex-1 space-y-1'>
              {[1,2,3,4].map(i => (
                <div key={i} className='flex items-center gap-1.5 rounded border bg-card p-1.5'>
                  <div className='w-3 h-3 rounded bg-muted' />
                  <Bar w='60%' h={3} opacity={0.7} />
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );
    case 'kanban-page':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 grid grid-cols-3 gap-1'>
            {['Todo', 'Doing', 'Done'].map((c, i) => (
              <div key={c} className='rounded-md bg-muted/30 p-1 flex flex-col gap-0.5'>
                <div className='text-[7px] font-bold uppercase tracking-wider text-muted-foreground'>{c}</div>
                {[1,2].map(j => (
                  <div key={j} className='rounded-sm bg-card p-1 shadow-sm'>
                    <Bar w='80%' h={2} opacity={0.7} />
                    {j === 1 && <><div className='h-0.5' /><Bar w='50%' h={2} opacity={0.5} /></>}
                  </div>
                ))}
                {i !== 2 && <div className='rounded-sm bg-card p-1 shadow-sm h-3' />}
              </div>
            ))}
          </div>
        </Frame>
      );

    case 'billing-invoices':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 flex flex-col gap-1.5'>
            <div className='rounded-md border bg-card p-2 flex items-center justify-between'>
              <div>
                <div className='text-[7px] uppercase tracking-wider text-muted-foreground'>Plan</div>
                <div className='text-[10px] font-bold'>Pro · $29/mo</div>
              </div>
              <div className='h-4 px-2 rounded bg-primary text-primary-foreground text-[7px] font-bold flex items-center'>Upgrade</div>
            </div>
            <div className='flex-1 rounded-md border bg-card overflow-hidden'>
              <div className='px-2 py-1 border-b border-border bg-muted/30 text-[7px] font-bold'>Invoices</div>
              {[1,2,3].map(i => (
                <div key={i} className='flex items-center px-2 py-0.5 border-b border-border/50 last:border-0 text-[7px]'>
                  <span className='flex-1 font-mono'>INV-00{i}</span>
                  <span className='flex-1 font-mono tabular-nums'>$29.00</span>
                  <Pill label='Paid' primary size='sm' />
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );
    case 'notifications-center':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border bg-card overflow-hidden'>
            <div className='flex items-center justify-between px-2 py-1.5 border-b border-border'>
              <div className='text-[8px] font-bold'>Notifications</div>
              <div className='text-[7px] text-primary'>Mark all read</div>
            </div>
            {[
              { c: 'bg-primary', label: 'Marcus replied to your comment', unread: true },
              { c: 'bg-emerald-500', label: 'Deployment succeeded', unread: true },
              { c: 'bg-muted-foreground/40', label: 'New team member joined', unread: false },
            ].map((n, i) => (
              <div key={i} className={`flex items-center gap-1.5 px-2 py-1.5 border-b border-border/50 last:border-0 ${n.unread ? 'bg-primary/[0.03]' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${n.c}`} />
                <Bar w='80%' h={2.5} opacity={0.7} />
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'search-results':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 flex flex-col gap-1.5'>
            <div className='h-6 rounded-md border border-border bg-card flex items-center px-2 gap-1'>
              <svg width='9' height='9' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-muted-foreground'><circle cx='11' cy='11' r='8' /><path d='m21 21-4.3-4.3' /></svg>
              <span className='text-[8px] text-muted-foreground'>design system</span>
            </div>
            <div className='flex gap-1'>
              {['All', 'Pages', 'Components'].map((f, i) => (
                <div key={f} className={`h-4 px-1.5 rounded text-[7px] font-medium flex items-center ${i === 0 ? 'bg-primary/10 text-primary' : 'border border-border text-muted-foreground'}`}>{f}</div>
              ))}
            </div>
            {[1,2,3].map(i => (
              <div key={i}>
                <div className='text-[7px] text-muted-foreground'>adhar.dev/docs/{i}</div>
                <Bar w='80%' h={3} opacity={0.7} />
                <div className='h-0.5' />
                <Bar w='100%' h={2} opacity={0.4} />
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'profile':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 flex flex-col'>
            <div className='h-10 rounded-t-md bg-gradient-to-br from-primary/30 via-primary/15 to-transparent' />
            <div className='flex-1 px-2 -mt-4'>
              <div className='w-9 h-9 rounded-xl ring-2 ring-card bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-[10px] font-bold text-primary'>PM</div>
              <div className='mt-1.5'>
                <div className='text-[10px] font-bold'>Priya Menon</div>
                <div className='text-[7px] text-muted-foreground'>Product Manager · SF</div>
              </div>
              <div className='grid grid-cols-3 gap-1 mt-2'>
                {[{ l: 'Projects', v: '12' }, { l: 'Followers', v: '1.2K' }, { l: 'Posts', v: '48' }].map(s => (
                  <div key={s.l} className='rounded border bg-card p-1 text-center'>
                    <div className='text-[10px] font-bold'>{s.v}</div>
                    <div className='text-[6px] text-muted-foreground'>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Frame>
      );
    case 'onboarding':
      return (
        <Frame>
          <div className='w-full max-w-[200px] rounded-lg border bg-card overflow-hidden shadow'>
            <div className='aspect-[16/9] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent flex items-center justify-center text-2xl'>✨</div>
            <div className='p-2'>
              <div className='flex gap-0.5 mb-1.5'>
                {[1,2,3,4].map(i => <div key={i} className={`h-1 rounded-full ${i === 1 ? 'w-4 bg-primary' : 'w-3 bg-muted'}`} />)}
              </div>
              <div className='text-[10px] font-bold'>Welcome aboard</div>
              <div className='text-[7px] text-muted-foreground mb-2'>Let's set up your workspace</div>
              <div className='flex justify-end'>
                <div className='h-5 px-3 rounded bg-primary text-primary-foreground text-[8px] font-bold flex items-center'>Next →</div>
              </div>
            </div>
          </div>
        </Frame>
      );
    case 'timeline-page':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 flex flex-col gap-1.5'>
            <div className='text-[7px] font-bold uppercase tracking-wider text-muted-foreground'>Today</div>
            <div className='relative space-y-1 before:absolute before:left-2 before:top-1 before:bottom-1 before:w-px before:bg-border'>
              {[
                { c: 'bg-emerald-500/15 text-emerald-500', label: 'Deployment succeeded' },
                { c: 'bg-blue-500/15 text-blue-500', label: 'New comment from Marcus' },
                { c: 'bg-amber-500/15 text-amber-500', label: 'PR review requested' },
              ].map((e, i) => (
                <div key={i} className='relative flex gap-2 ml-0'>
                  <div className={`relative z-10 w-4 h-4 rounded-full ${e.c} flex items-center justify-center text-[7px] ring-2 ring-background`}>•</div>
                  <div className='flex-1 rounded border bg-card p-1.5'>
                    <Bar w='80%' h={3} opacity={0.7} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );
    case 'empty-state-page':
      return (
        <Frame>
          <div className='text-center'>
            <div className='w-14 h-14 mx-auto rounded-full bg-muted flex items-center justify-center text-muted-foreground text-2xl mb-2'>📭</div>
            <div className='text-[10px] font-bold mb-1'>Nothing here yet</div>
            <div className='text-[7px] text-muted-foreground mb-2 max-w-[150px]'>Create your first item to get started</div>
            <div className='h-5 px-3 rounded bg-primary text-primary-foreground text-[8px] font-bold inline-flex items-center'>+ Create</div>
          </div>
        </Frame>
      );
    case 'loading-page':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 space-y-1.5'>
            <div className='space-y-1'>
              <div className='h-3 w-1/3 rounded bg-muted animate-pulse' />
              <div className='h-2 w-2/3 rounded bg-muted animate-pulse' />
            </div>
            <div className='grid grid-cols-3 gap-1'>
              {[1,2,3].map(i => <div key={i} className='rounded border bg-card p-1 space-y-0.5'><div className='h-1.5 w-1/3 rounded bg-muted animate-pulse' /><div className='h-3 w-1/2 rounded bg-muted animate-pulse' /></div>)}
            </div>
            <div className='rounded border bg-card divide-y divide-border'>
              {[1,2,3].map(i => (
                <div key={i} className='flex items-center gap-1.5 p-1.5'>
                  <div className='w-4 h-4 rounded-full bg-muted animate-pulse' />
                  <div className='flex-1 space-y-0.5'>
                    <div className='h-1.5 w-3/5 rounded bg-muted animate-pulse' />
                    <div className='h-1 w-2/5 rounded bg-muted animate-pulse' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );
    case 'tabs-page':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 flex flex-col gap-1.5'>
            <div className='text-[10px] font-bold'>Settings</div>
            <div className='flex gap-1 border-b border-border'>
              {['Overview', 'Activity', 'Members', 'Billing'].map((t, i) => (
                <div key={t} className={`px-2 py-1 text-[8px] font-medium border-b-2 -mb-px ${i === 0 ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'}`}>{t}</div>
              ))}
            </div>
            <div className='flex-1 space-y-1'>
              <Bar w='80%' h={3} opacity={0.7} />
              <Bar w='100%' h={2} opacity={0.4} />
              <Bar w='90%' h={2} opacity={0.4} />
            </div>
          </div>
        </Frame>
      );
    case 'card-grid':
      return (
        <Frame>
          <div className='grid grid-cols-3 gap-1.5 w-full max-w-[210px]'>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className='rounded-md border bg-card overflow-hidden'>
                <div className='aspect-video bg-gradient-to-br from-primary/15 to-muted' />
                <div className='p-1 space-y-0.5'>
                  <Bar w='80%' h={2.5} opacity={0.7} />
                  <Bar w='60%' h={2} opacity={0.4} />
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'sidebar-layout':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border bg-card overflow-hidden flex'>
            <div className='w-[28%] bg-muted/20 border-r border-border p-1 space-y-0.5'>
              <div className='flex items-center gap-1 px-1 py-1 mb-1'>
                <div className='w-3 h-3 rounded bg-primary' />
                <div className='text-[7px] font-bold'>Adhar</div>
              </div>
              {[true, false, false, false].map((act, i) => (
                <div key={i} className={`px-1 py-1 rounded text-[7px] ${act ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'}`}>
                  Item {i + 1}
                </div>
              ))}
            </div>
            <div className='flex-1 p-1.5 space-y-1'>
              <div className='flex items-center justify-between'>
                <div className='text-[8px] font-bold'>Home</div>
                <div className='h-4 px-1.5 rounded bg-primary text-primary-foreground text-[7px] font-bold flex items-center'>+ New</div>
              </div>
              <Bar w='80%' h={3} opacity={0.5} />
              <Bar w='100%' h={2} opacity={0.4} />
            </div>
          </div>
        </Frame>
      );
    case 'command-menu':
      return (
        <Frame pad={false}>
          <div className='absolute inset-x-3 top-3 rounded-md border bg-card shadow-lg overflow-hidden'>
            <div className='flex items-center gap-1.5 px-2 py-1.5 border-b border-border'>
              <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-muted-foreground'><circle cx='11' cy='11' r='8' /><path d='m21 21-4.3-4.3' /></svg>
              <span className='text-[8px] text-muted-foreground'>Type a command…</span>
              <kbd className='ml-auto text-[7px] font-mono text-muted-foreground/60'>⌘K</kbd>
            </div>
            <div className='py-0.5'>
              <div className='px-2 py-1 text-[8px] bg-primary/10 text-primary font-medium flex items-center justify-between'><span>→ New page</span><kbd className='text-[7px] font-mono'>⌘N</kbd></div>
              <div className='px-2 py-1 text-[8px] text-muted-foreground'>Search docs</div>
              <div className='px-2 py-1 text-[8px] text-muted-foreground'>Open settings</div>
            </div>
          </div>
        </Frame>
      );

    // ── Forms ───────────────────────────────────────────────────────────
    case 'multistep-form':
      return (
        <Frame>
          <div className='w-full max-w-[200px] rounded-lg border bg-card p-2'>
            <div className='flex justify-between text-[7px] text-muted-foreground mb-1'><span>Step 2 of 4</span><span>50%</span></div>
            <div className='h-1 rounded-full bg-muted overflow-hidden mb-2'><div className='h-full w-1/2 bg-primary rounded-full' /></div>
            <div className='text-[10px] font-bold'>Your details</div>
            <div className='text-[7px] text-muted-foreground mb-1.5'>Tell us about yourself</div>
            <div className='space-y-1'>
              <div className='h-4 rounded border border-border bg-background' />
              <div className='h-4 rounded border border-border bg-background' />
            </div>
            <div className='flex justify-between mt-2'>
              <div className='h-4 px-2 rounded border text-[7px] font-medium flex items-center'>← Back</div>
              <div className='h-4 px-2 rounded bg-primary text-primary-foreground text-[7px] font-bold flex items-center'>Continue →</div>
            </div>
          </div>
        </Frame>
      );
    case 'stepper-form':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 grid grid-cols-[35%_1fr] gap-1.5'>
            <div className='space-y-1'>
              {[
                { st: 'done', label: 'Account' },
                { st: 'done', label: 'Profile' },
                { st: 'active', label: 'Settings' },
                { st: 'todo', label: 'Review' },
              ].map((s, i) => (
                <div key={i} className={`flex items-center gap-1 p-1 rounded ${s.st === 'active' ? 'bg-primary/10' : ''}`}>
                  <div className={`w-3 h-3 rounded-full text-[7px] flex items-center justify-center font-bold ${s.st === 'done' ? 'bg-primary text-primary-foreground' : s.st === 'active' ? 'border border-primary text-primary' : 'border border-border'}`}>
                    {s.st === 'done' ? '✓' : i + 1}
                  </div>
                  <span className={`text-[7px] ${s.st === 'active' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className='rounded-md border bg-card p-2 space-y-1'>
              <div className='text-[9px] font-bold'>Settings</div>
              <Bar w='100%' h={3} opacity={0.5} />
              <div className='h-4 rounded border border-border bg-background' />
              <div className='h-4 rounded border border-border bg-background' />
            </div>
          </div>
        </Frame>
      );

    // ── E-commerce ──────────────────────────────────────────────────────
    case 'product-card':
      return (
        <Frame>
          <div className='w-32 rounded-lg border bg-card overflow-hidden'>
            <div className='aspect-square bg-gradient-to-br from-stone-200 to-stone-400 dark:from-stone-700 dark:to-stone-900 flex items-center justify-center text-3xl'>👞</div>
            <div className='p-2'>
              <div className='text-[10px] font-medium'>Suede Loafers</div>
              <div className='text-[10px] font-bold mt-0.5'>$156</div>
              <div className='flex items-center gap-0.5 mt-0.5'>
                {'★★★★★'.split('').map((s, i) => <span key={i} className='text-amber-500 text-[8px]'>{s}</span>)}
                <span className='text-[7px] text-muted-foreground ml-1'>(48)</span>
              </div>
            </div>
          </div>
        </Frame>
      );
    case 'product-grid':
      return (
        <Frame>
          <div className='grid grid-cols-3 gap-1 w-full max-w-[210px]'>
            {['🧥','👞','🎒','🧶','👔','👟'].map((emoji, i) => (
              <div key={i} className='rounded border bg-card overflow-hidden'>
                <div className='aspect-square bg-gradient-to-br from-stone-100 to-stone-300 dark:from-stone-700 dark:to-stone-900 flex items-center justify-center text-lg'>{emoji}</div>
                <div className='p-1'>
                  <Bar w='80%' h={2} opacity={0.7} />
                  <div className='text-[7px] font-bold mt-0.5'>${(i + 1) * 29}</div>
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );
    case 'cart':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border bg-card flex flex-col'>
            <div className='px-2 py-1 border-b border-border text-[8px] font-bold'>Your cart (3)</div>
            <div className='flex-1 divide-y divide-border'>
              {[1,2,3].map(i => (
                <div key={i} className='flex items-center gap-1.5 px-2 py-1'>
                  <div className='w-5 h-5 rounded bg-muted' />
                  <div className='flex-1'>
                    <Bar w='70%' h={2} opacity={0.7} />
                    <div className='text-[7px] font-bold mt-0.5'>${i * 29}</div>
                  </div>
                  <div className='flex items-center text-[7px] font-mono text-muted-foreground'>−1+</div>
                </div>
              ))}
            </div>
            <div className='px-2 py-1.5 border-t border-border flex items-center justify-between'>
              <span className='text-[8px] font-bold'>Total $174</span>
              <div className='h-4 px-2 rounded bg-primary text-primary-foreground text-[7px] font-bold flex items-center'>Checkout</div>
            </div>
          </div>
        </Frame>
      );
    case 'checkout':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 grid grid-cols-2 gap-1.5'>
            <div className='space-y-1'>
              <div className='text-[8px] font-bold'>Shipping</div>
              <div className='h-3.5 rounded border border-border bg-background' />
              <div className='h-3.5 rounded border border-border bg-background' />
              <div className='text-[8px] font-bold mt-1'>Payment</div>
              <div className='h-3.5 rounded border border-border bg-background' />
            </div>
            <div className='rounded-md border bg-card p-1.5 space-y-1'>
              <div className='text-[8px] font-bold'>Order summary</div>
              {[1,2].map(i => <div key={i} className='flex justify-between text-[7px]'><span className='text-muted-foreground'>Item {i}</span><span>${i * 29}</span></div>)}
              <div className='border-t border-border pt-1 flex justify-between text-[8px] font-bold'><span>Total</span><span>$87</span></div>
              <div className='h-4 rounded bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center'>Pay $87</div>
            </div>
          </div>
        </Frame>
      );

    // ── AI ──────────────────────────────────────────────────────────────
    case 'chat-page':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border bg-card flex'>
            <div className='w-[26%] border-r border-border p-1 space-y-0.5'>
              <div className='text-[7px] font-bold mb-1 px-1'>Chats</div>
              {[true, false, false].map((act, i) => (
                <div key={i} className={`px-1 py-0.5 rounded text-[7px] ${act ? 'bg-accent font-medium' : 'text-muted-foreground'}`}>Chat {i + 1}</div>
              ))}
            </div>
            <div className='flex-1 flex flex-col p-1.5 gap-1'>
              <div className='self-start max-w-[70%] rounded-lg rounded-bl-sm bg-muted px-1.5 py-0.5'><Bar w={50} h={2} opacity={0.7} /></div>
              <div className='self-end max-w-[70%] rounded-lg rounded-br-sm bg-primary text-primary-foreground px-1.5 py-0.5'><div className='h-1 w-10 rounded bg-primary-foreground/70' /></div>
              <div className='self-start max-w-[70%] rounded-lg rounded-bl-sm bg-muted px-1.5 py-0.5'><Bar w={70} h={2} opacity={0.7} /></div>
              <div className='mt-auto h-4 rounded border border-border bg-background flex items-center px-1 text-[7px] text-muted-foreground'>Message…</div>
            </div>
          </div>
        </Frame>
      );
    case 'ai-playground':
      return (
        <Frame pad={false}>
          <div className='absolute inset-2 rounded-md border bg-card flex flex-col'>
            <div className='flex items-center justify-between px-2 py-1 border-b border-border'>
              <div className='text-[8px] font-bold'>Playground</div>
              <Pill label='gpt-4' size='sm' />
            </div>
            <div className='flex-1 grid grid-cols-2 divide-x divide-border'>
              <div className='p-1.5 space-y-1'>
                <div className='text-[7px] text-muted-foreground'>Prompt</div>
                <Bar w='80%' h={2} opacity={0.7} />
                <Bar w='100%' h={2} opacity={0.5} />
                <Bar w='60%' h={2} opacity={0.5} />
              </div>
              <div className='p-1.5 space-y-1'>
                <div className='text-[7px] text-muted-foreground'>Output</div>
                <Bar w='100%' h={2} opacity={0.7} />
                <Bar w='90%' h={2} opacity={0.7} />
                <Bar w='40%' h={2} opacity={0.7} />
              </div>
            </div>
          </div>
        </Frame>
      );

    // ── Errors ──────────────────────────────────────────────────────────
    case '404':
      return (
        <Frame>
          <div className='text-center'>
            <div className='text-3xl font-black text-muted-foreground/30 leading-none'>404</div>
            <div className='text-[10px] font-bold mt-1'>Page not found</div>
            <div className='text-[7px] text-muted-foreground mb-2'>Looks like a broken link</div>
            <div className='h-5 px-3 rounded bg-primary text-primary-foreground text-[8px] font-bold inline-flex items-center'>← Go home</div>
          </div>
        </Frame>
      );
    case '500':
      return (
        <Frame>
          <div className='text-center'>
            <div className='w-10 h-10 mx-auto rounded-full bg-rose-500/15 text-rose-500 text-xl flex items-center justify-center mb-1'>⚠</div>
            <div className='text-[10px] font-bold'>Something went wrong</div>
            <div className='text-[7px] text-muted-foreground mb-2'>Our team has been notified</div>
            <div className='flex gap-1 justify-center'>
              <div className='h-5 px-2 rounded bg-primary text-primary-foreground text-[8px] font-bold flex items-center'>Try again</div>
              <div className='h-5 px-2 rounded border text-[8px] font-medium flex items-center'>Go home</div>
            </div>
          </div>
        </Frame>
      );
    case 'maintenance':
      return (
        <Frame>
          <div className='text-center'>
            <div className='w-10 h-10 mx-auto rounded-full bg-amber-500/15 text-amber-500 text-xl flex items-center justify-center mb-1'>🔧</div>
            <div className='text-[10px] font-bold'>Under maintenance</div>
            <div className='text-[7px] text-muted-foreground mb-2'>Back in ~30 minutes</div>
            <div className='flex gap-1 justify-center'>
              <div className='h-5 w-32 rounded border border-border bg-background flex items-center px-2 text-[7px] text-muted-foreground'>your@email.com</div>
              <div className='h-5 px-2 rounded bg-primary text-primary-foreground text-[8px] font-bold flex items-center'>Notify</div>
            </div>
          </div>
        </Frame>
      );

    case 'generic':
    default:
      return (
        <Frame>
          <div className='flex flex-col items-center gap-1 text-muted-foreground/40'>
            <svg className='w-8 h-8' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.4}>
              <rect x='3' y='3' width='18' height='18' rx='3' />
              <path d='M3 9h18M9 21V9' />
            </svg>
            <span className='text-[9px] font-semibold uppercase tracking-wider'>Block</span>
          </div>
        </Frame>
      );
  }
}

// Build slug map from kind names (most slugs map 1:1 to kind names)
const KIND_SLUGS: Kind[] = [
  'login', 'signup', 'forgot-password', 'otp-verify',
  'dashboard-stats', 'dashboard-chart', 'dashboard-activity', 'dashboard-overview',
  'hero', 'features', 'pricing', 'testimonials', 'cta', 'faq', 'footer', 'header',
  'newsletter', 'integrations', 'comparison-table', 'video-hero', 'banner-announcement',
  'team-grid', 'blog-grid', 'stats-grid',
  'sidebar-layout', 'command-menu',
  'settings-profile', 'settings-account', 'settings-notifications', 'settings-billing', 'settings-page',
  'table-page', 'detail-page', 'list-filter-page', 'kanban-page',
  'billing-invoices', 'notifications-center', 'search-results', 'profile',
  'onboarding', 'timeline-page', 'empty-state-page', 'loading-page', 'tabs-page', 'card-grid',
  'multistep-form', 'stepper-form',
  'product-card', 'product-grid', 'cart', 'checkout',
  'chat-page', 'ai-playground',
  '404', '500', 'maintenance',
];
KIND_SLUGS.forEach((k) => { SLUG_TO_KIND[k] = k; });

// ─── Public component ───────────────────────────────────────────────────────
export function BlockPreview({ slug, className = '' }: { slug: string; className?: string }) {
  // Strip the `block-` prefix so callers can pass either form
  const key = slug.replace(/^block-/, '');
  const kind = SLUG_TO_KIND[key] || 'generic';
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Render kind={kind} />
    </div>
  );
}
