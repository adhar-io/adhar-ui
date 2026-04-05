/**
 * Block demos — representative examples from each of the 9 block categories.
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function BlockLoginDemo() {
  return (
    <div className='max-w-xs mx-auto space-y-4 py-4'>
      <div className='text-center'>
        <h3 className='text-lg font-bold'>Welcome back</h3>
        <p className='text-sm text-muted-foreground'>Sign in to your account</p>
      </div>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <label className='text-xs font-medium'>Email</label>
          <input
            placeholder='you@example.com'
            className='flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm'
          />
        </div>
        <div className='space-y-1'>
          <div className='flex justify-between'>
            <label className='text-xs font-medium'>Password</label>
            <a href='#' className='text-xs text-primary hover:underline'>Forgot?</a>
          </div>
          <input
            type='password'
            placeholder='••••••••'
            className='flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm'
          />
        </div>
        <div className='flex items-center gap-2'>
          <input type='checkbox' className='h-3.5 w-3.5 accent-primary' />
          <label className='text-xs'>Remember me</label>
        </div>
        <button className='h-9 w-full rounded-md bg-primary text-sm text-primary-foreground hover:bg-primary/90'>
          Sign in
        </button>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs'>
          <span className='bg-background px-2 text-muted-foreground'>or</span>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <button className='h-9 rounded-md border text-xs hover:bg-accent'>Google</button>
        <button className='h-9 rounded-md border text-xs hover:bg-accent'>GitHub</button>
      </div>
      <p className='text-center text-xs text-muted-foreground'>
        No account? <a href='#' className='text-primary hover:underline'>Sign up</a>
      </p>
    </div>
  );
}

export function BlockDashboardDemo() {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-4 gap-3'>
        {[
          { t: 'Revenue', v: '$45K', c: '+20%', up: true },
          { t: 'Users', v: '2.3K', c: '+12%', up: true },
          { t: 'Orders', v: '384', c: '+8%', up: true },
          { t: 'Bounce', v: '24%', c: '-4%', up: false },
        ].map((s) => (
          <div key={s.t} className='rounded-lg border p-3'>
            <p className='text-[10px] text-muted-foreground'>{s.t}</p>
            <p className='text-lg font-bold mt-0.5'>{s.v}</p>
            <p className={cn('text-[10px] font-medium', s.up ? 'text-green-600' : 'text-red-600')}>
              {s.up ? '↑' : '↓'} {s.c}
            </p>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-5 gap-3'>
        <div className='col-span-3 rounded-lg border p-4'>
          <h4 className='text-xs font-semibold mb-3'>Weekly Revenue</h4>
          <div className='flex items-end gap-1 h-20'>
            {[40, 65, 45, 80, 55, 70, 90].map((v, i) => (
              <div
                key={i}
                className='flex-1 rounded-t-sm bg-primary hover:bg-primary/80 transition-colors'
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
          <div className='flex justify-between mt-1 text-[9px] text-muted-foreground'>
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>
        <div className='col-span-2 rounded-lg border p-4'>
          <h4 className='text-xs font-semibold mb-3'>Activity</h4>
          <div className='space-y-3'>
            {[{ u: 'Alice', a: 'deployed v2.1', t: '5m' }, {
              u: 'Bob',
              a: 'merged PR #42',
              t: '1h',
            }, { u: 'Carol', a: 'created issue', t: '3h' }].map((a) => (
              <div key={a.u} className='flex items-center gap-2'>
                <div className='h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[9px] font-medium'>
                  {a.u[0]}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-[11px] truncate'>
                    <span className='font-medium'>{a.u}</span> {a.a}
                  </p>
                  <p className='text-[9px] text-muted-foreground'>{a.t} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlockHeroDemo() {
  return (
    <div className='text-center py-6 space-y-4'>
      <span className='inline-flex rounded-full border px-3 py-1 text-xs font-medium'>
        ✨ Just launched v0.1.0
      </span>
      <h1 className='text-2xl font-bold tracking-tight'>Build UIs faster with Adhar UI</h1>
      <p className='text-sm text-muted-foreground max-w-md mx-auto'>
        Framework-agnostic components you own. Works with React, Vue, Solid, Svelte, and Angular.
      </p>
      <div className='flex justify-center gap-2'>
        <button className='h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'>
          Get Started
        </button>
        <button className='h-9 rounded-md border px-4 text-sm hover:bg-accent'>
          Documentation
        </button>
      </div>
    </div>
  );
}

export function BlockPricingDemo() {
  return (
    <div className='grid grid-cols-3 gap-3 max-w-lg'>
      {[{ n: 'Free', p: '$0', f: ['5 projects', 'Basic support', '1GB storage'] }, {
        n: 'Pro',
        p: '$19',
        f: ['Unlimited projects', 'Priority support', '100GB storage', 'Custom domains'],
        pop: true,
      }, {
        n: 'Enterprise',
        p: '$99',
        f: ['Everything in Pro', 'SSO/SAML', 'Audit logs', 'Dedicated support'],
      }].map((pl) => (
        <div
          key={pl.n}
          className={cn(
            'rounded-lg border p-4 relative',
            pl.pop && 'border-primary ring-1 ring-primary',
          )}
        >
          {pl.pop && (
            <span className='absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground'>
              Popular
            </span>
          )}
          <h3 className='text-sm font-semibold'>{pl.n}</h3>
          <p className='text-2xl font-bold mt-1'>
            {pl.p}
            <span className='text-xs text-muted-foreground font-normal'>/mo</span>
          </p>
          <ul className='mt-3 space-y-1.5'>
            {pl.f.map((f) => (
              <li key={f} className='flex items-center gap-1.5 text-xs'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='12'
                  height='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  className='text-primary shrink-0'
                >
                  <path d='M20 6 9 17l-5-5' />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button
            className={cn(
              'mt-4 h-8 w-full rounded-md text-xs font-medium',
              pl.pop
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border hover:bg-accent',
            )}
          >
            Choose {pl.n}
          </button>
        </div>
      ))}
    </div>
  );
}

export function BlockSettingsDemo() {
  const [tab, setTab] = useState('profile');
  return (
    <div className='max-w-md space-y-3'>
      <h2 className='text-lg font-bold'>Settings</h2>
      <div className='flex gap-1 border-b'>
        {['profile', 'account', 'notifications', 'billing'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium border-b-2 -mb-px transition-colors',
              tab === t
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className='rounded-lg border p-4 space-y-3'>
        {tab === 'profile' && (
          <>
            <div className='flex items-center gap-3 mb-3'>
              <div className='h-12 w-12 rounded-full bg-muted flex items-center justify-center font-semibold'>
                JD
              </div>
              <div>
                <p className='text-sm font-semibold'>John Doe</p>
                <button className='text-xs text-primary hover:underline'>Change avatar</button>
              </div>
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium'>Name</label>
              <input
                defaultValue='John Doe'
                className='flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium'>Bio</label>
              <textarea
                defaultValue='Full-stack developer'
                rows={2}
                className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
              />
            </div>
          </>
        )}
        {tab === 'account' && (
          <>
            <div className='space-y-2'>
              <label className='text-xs font-medium'>Current password</label>
              <input
                type='password'
                className='flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium'>New password</label>
              <input
                type='password'
                className='flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm'
              />
            </div>
            <div className='mt-3 rounded-md border border-destructive/50 p-3'>
              <p className='text-xs font-semibold text-destructive'>Danger Zone</p>
              <p className='text-xs text-muted-foreground mt-1'>Permanently delete your account</p>
              <button className='mt-2 h-7 rounded-md bg-destructive px-3 text-xs text-destructive-foreground hover:bg-destructive/90'>
                Delete
              </button>
            </div>
          </>
        )}
        {tab === 'notifications' && (
          <div className='space-y-3'>
            {['Email notifications', 'Push notifications', 'SMS alerts', 'Weekly digest'].map(
              (n) => (
                <div key={n} className='flex items-center justify-between'>
                  <span className='text-sm'>{n}</span>
                  <button className='inline-flex h-5 w-9 items-center rounded-full bg-primary'>
                    <span className='block h-4 w-4 translate-x-4 rounded-full bg-white shadow' />
                  </button>
                </div>
              ),
            )}
          </div>
        )}
        {tab === 'billing' && (
          <>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-semibold'>Pro Plan</p>
                <p className='text-xs text-muted-foreground'>$19/month</p>
              </div>
              <button className='h-7 rounded-md border px-3 text-xs hover:bg-accent'>
                Change plan
              </button>
            </div>
            <div className='mt-3 space-y-2'>
              {[{ l: 'Storage', u: 45, t: 100 }, { l: 'API calls', u: 8200, t: 10000 }].map((u) => (
                <div key={u.l}>
                  <div className='flex justify-between text-xs mb-1'>
                    <span>{u.l}</span>
                    <span className='text-muted-foreground'>
                      {u.u.toLocaleString()}/{u.t.toLocaleString()}
                    </span>
                  </div>
                  <div className='h-1.5 w-full rounded-full bg-secondary'>
                    <div
                      className='h-full rounded-full bg-primary'
                      style={{ width: `${(u.u / u.t) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <button className='h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'>
          Save changes
        </button>
      </div>
    </div>
  );
}

export function BlockErrorDemo() {
  return (
    <div className='space-y-6'>
      {[{
        code: '404',
        title: 'Page not found',
        desc: "The page you're looking for doesn't exist.",
        btn: 'Go home',
      }, {
        code: '500',
        title: 'Server error',
        desc: 'An unexpected error occurred. Try again.',
        btn: 'Retry',
      }, {
        code: '🔧',
        title: 'Under maintenance',
        desc: "We're performing scheduled maintenance.",
        btn: 'Notify me',
      }].map((e) => (
        <div key={e.code} className='rounded-lg border p-6 text-center'>
          <p className='text-3xl font-bold text-muted-foreground/20'>{e.code}</p>
          <h3 className='mt-2 text-sm font-bold'>{e.title}</h3>
          <p className='mt-1 text-xs text-muted-foreground'>{e.desc}</p>
          <button className='mt-3 h-8 rounded-md bg-primary px-4 text-xs text-primary-foreground hover:bg-primary/90'>
            {e.btn}
          </button>
        </div>
      ))}
    </div>
  );
}

export function BlockChatPageDemo() {
  return (
    <div className='flex h-64 rounded-md border overflow-hidden'>
      <div className='w-44 border-r bg-muted/30 flex flex-col'>
        <div className='flex items-center justify-between border-b p-2'>
          <span className='text-xs font-semibold'>Chats</span>
          <button className='h-6 w-6 rounded-md hover:bg-accent flex items-center justify-center text-xs'>
            +
          </button>
        </div>
        <div className='flex-1 overflow-auto p-1 space-y-0.5'>
          <button className='w-full rounded-md bg-accent px-2 py-1.5 text-xs text-left font-medium truncate'>
            Design review
          </button>
          {['Bug report', 'Feature request', 'Code review'].map((c) => (
            <button
              key={c}
              className='w-full rounded-md px-2 py-1.5 text-xs text-left hover:bg-accent truncate text-muted-foreground'
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='border-b px-3 py-2 flex items-center gap-2'>
          <div className='h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px] font-bold'>
            AI
          </div>
          <span className='text-xs font-semibold'>Design review</span>
        </div>
        <div className='flex-1 overflow-auto p-3 space-y-2'>
          <div className='flex gap-2'>
            <div className='h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px]'>
              AI
            </div>
            <div className='rounded-lg bg-muted px-2.5 py-1.5 text-xs max-w-[80%]'>
              How can I help with the design?
            </div>
          </div>
          <div className='flex gap-2 justify-end'>
            <div className='rounded-lg bg-primary text-primary-foreground px-2.5 py-1.5 text-xs max-w-[80%]'>
              Review the button variants
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px]'>
              AI
            </div>
            <div className='rounded-lg bg-muted px-2.5 py-1.5 text-xs max-w-[80%]'>
              I see 6 variants. The destructive variant could use higher contrast.
            </div>
          </div>
        </div>
        <div className='border-t p-2'>
          <div className='flex gap-1'>
            <input
              placeholder='Message...'
              className='flex-1 h-7 rounded-md border bg-background px-2 text-xs'
            />
            <button className='h-7 rounded-md bg-primary px-2 text-xs text-primary-foreground'>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlockProductDemo() {
  return (
    <div className='grid grid-cols-3 gap-3 max-w-md'>
      {[{ n: 'Wireless Headphones', p: '$99.99', r: 4.5, badge: 'New' }, {
        n: 'Mechanical Keyboard',
        p: '$149.99',
        r: 4.8,
        badge: '',
      }, { n: 'Gaming Mouse', p: '$79.99', r: 4.2, badge: 'Sale' }].map((prod) => (
        <div
          key={prod.n}
          className='group rounded-lg border overflow-hidden hover:shadow-md transition-shadow'
        >
          <div className='aspect-square bg-muted flex items-center justify-center text-xs text-muted-foreground relative'>
            {prod.badge && (
              <span className='absolute top-1.5 left-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-primary-foreground'>
                {prod.badge}
              </span>
            )}
            <button className='absolute top-1.5 right-1.5 rounded-full bg-background/80 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
              </svg>
            </button>Image
          </div>
          <div className='p-3'>
            <p className='text-xs font-semibold truncate'>{prod.n}</p>
            <div className='flex items-center justify-between mt-1'>
              <span className='text-sm font-bold'>{prod.p}</span>
              <span className='text-[10px] text-muted-foreground'>
                {'★'.repeat(Math.round(prod.r))} {prod.r}
              </span>
            </div>
            <button className='mt-2 h-7 w-full rounded-md bg-primary text-[10px] font-medium text-primary-foreground hover:bg-primary/90'>
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlockCheckoutDemo() {
  const [step, setStep] = useState(0);
  const steps = ['Shipping', 'Payment', 'Review'];
  return (
    <div className='max-w-sm space-y-4'>
      <div className='flex items-center gap-1'>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className='flex items-center gap-1.5'>
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium border-2',
                  i <= step
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/30 text-muted-foreground',
                )}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className={cn('text-xs', i <= step ? 'font-medium' : 'text-muted-foreground')}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn('h-0.5 flex-1', i < step ? 'bg-primary' : 'bg-muted-foreground/20')}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='rounded-md border p-4 space-y-3'>
        {step === 0 && (
          <>
            <div className='space-y-2'>
              <label className='text-xs font-medium'>Full name</label>
              <input
                className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm'
                placeholder='John Doe'
              />
            </div>
            <div className='space-y-2'>
              <label className='text-xs font-medium'>Address</label>
              <input
                className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm'
                placeholder='123 Main St'
              />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div className='space-y-2'>
                <label className='text-xs font-medium'>City</label>
                <input className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm' />
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-medium'>ZIP</label>
                <input className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm' />
              </div>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className='space-y-2'>
              <label className='text-xs font-medium'>Card number</label>
              <input
                className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm font-mono'
                placeholder='4242 4242 4242 4242'
              />
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <div className='space-y-2'>
                <label className='text-xs font-medium'>Exp</label>
                <input
                  className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm font-mono'
                  placeholder='MM/YY'
                />
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-medium'>CVC</label>
                <input
                  className='flex h-8 w-full rounded-md border border-input bg-background px-2 text-sm font-mono'
                  placeholder='123'
                />
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <div className='space-y-2'>
            <p className='text-sm font-semibold'>Order Summary</p>
            <div className='space-y-1 text-sm'>
              {[['Headphones × 1', '$99.99'], ['Shipping', '$5.00'], ['Tax', '$8.40']].map((
                [l, v],
              ) => (
                <div key={l} className='flex justify-between'>
                  <span className='text-muted-foreground'>{l}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div className='border-t pt-1 flex justify-between font-bold text-sm'>
              <span>Total</span>
              <span>$113.39</span>
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-between'>
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className='h-8 rounded-md border px-3 text-xs hover:bg-accent disabled:opacity-50'
        >
          Back
        </button>
        <button
          onClick={() => setStep(Math.min(2, step + 1))}
          className='h-8 rounded-md bg-primary px-3 text-xs text-primary-foreground hover:bg-primary/90'
        >
          {step === 2 ? 'Place Order' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
