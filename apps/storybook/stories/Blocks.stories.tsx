import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

/* ─── Login ───────────────────────────────────────────────────────── */

function Login({ showSocial = true, title = 'Welcome back' }: { showSocial?: boolean; title?: string }) {
  return (
    <div className='max-w-xs mx-auto space-y-4 py-4'>
      <h3 className='text-lg font-bold text-center'>{title}</h3>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <label className='text-xs font-medium'>Email</label>
          <input placeholder='you@example.com' className='flex h-9 w-full rounded-md border px-3 text-sm' />
        </div>
        <div className='space-y-1'>
          <label className='text-xs font-medium'>Password</label>
          <input type='password' placeholder='••••••••' className='flex h-9 w-full rounded-md border px-3 text-sm' />
        </div>
        <button className='h-9 w-full rounded-md bg-primary text-sm text-primary-foreground'>Sign in</button>
      </div>
      {showSocial && (
        <>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'><div className='w-full border-t' /></div>
            <div className='relative flex justify-center text-xs'><span className='bg-background px-2 text-muted-foreground'>or</span></div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <button className='h-9 rounded-md border text-xs'>Google</button>
            <button className='h-9 rounded-md border text-xs'>GitHub</button>
          </div>
        </>
      )}
    </div>
  );
}

export const BlockLoginStory: StoryObj<typeof Login> = {
  name: 'Block \u2014 Login',
  render: (args) => <Login {...args} />,
  args: { showSocial: true, title: 'Welcome back' },
  argTypes: {
    showSocial: { control: 'boolean' },
    title: { control: 'text' },
  },
};

/* ─── Dashboard ───────────────────────────────────────────────────── */

function Dashboard({ cards = 3 }: { cards?: number }) {
  const allCards = [
    { t: 'Revenue', v: '$45K', c: '+20%' },
    { t: 'Users', v: '2.3K', c: '+12%' },
    { t: 'Orders', v: '384', c: '+8%' },
    { t: 'Visits', v: '18K', c: '+15%' },
    { t: 'Conversion', v: '3.2%', c: '+0.5%' },
    { t: 'Avg. Order', v: '$85', c: '+3%' },
  ];
  const shown = allCards.slice(0, cards);
  return (
    <div className='space-y-4'>
      <div className={cn('grid gap-3', cards <= 3 ? 'grid-cols-3' : 'grid-cols-3')}>
        {shown.map((s) => (
          <div key={s.t} className='rounded-lg border p-3'>
            <p className='text-xs text-muted-foreground'>{s.t}</p>
            <p className='text-lg font-bold'>{s.v}</p>
            <p className='text-xs text-green-600'>&uarr; {s.c}</p>
          </div>
        ))}
      </div>
      <div className='rounded-lg border p-4'>
        <h4 className='text-xs font-semibold mb-2'>Weekly</h4>
        <div className='flex items-end gap-1 h-16'>
          {[40, 65, 45, 80, 55, 70, 90].map((v, i) => (
            <div key={i} className='flex-1 rounded-t-sm bg-primary' style={{ height: `${v}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const BlockDashboardStory: StoryObj<typeof Dashboard> = {
  name: 'Block \u2014 Dashboard',
  render: (args) => <Dashboard {...args} />,
  args: { cards: 3 },
  argTypes: { cards: { control: { type: 'number', min: 2, max: 6 } } },
};

/* ─── Hero ────────────────────────────────────────────────────────── */

function Hero({ alignment = 'center', showCTA = true }: { alignment?: 'left' | 'center'; showCTA?: boolean }) {
  return (
    <div className={cn('py-8', alignment === 'center' ? 'text-center' : 'text-left max-w-md')}>
      <span className='rounded-full border px-3 py-1 text-xs font-medium'>New</span>
      <h1 className='mt-4 text-2xl font-bold'>Build faster with Adhar UI</h1>
      <p className='mt-2 text-sm text-muted-foreground'>Components you own. 5 frameworks.</p>
      {showCTA && (
        <div className={cn('mt-4 flex gap-2', alignment === 'center' ? 'justify-center' : '')}>
          <button className='h-9 rounded-md bg-primary px-4 text-sm text-primary-foreground'>Get Started</button>
          <button className='h-9 rounded-md border px-4 text-sm'>Learn More</button>
        </div>
      )}
    </div>
  );
}

export const BlockHeroStory: StoryObj<typeof Hero> = {
  name: 'Block \u2014 Hero',
  render: (args) => <Hero {...args} />,
  args: { alignment: 'center', showCTA: true },
  argTypes: {
    alignment: { control: 'select', options: ['left', 'center'] },
    showCTA: { control: 'boolean' },
  },
};

/* ─── Pricing ─────────────────────────────────────────────────────── */

function Pricing({ tiers = 3, highlighted = 'pro' }: { tiers?: number; highlighted?: 'none' | 'pro' | 'enterprise' }) {
  const allTiers = [
    { n: 'Free', p: '$0', f: ['5 projects', 'Basic support'] },
    { n: 'Pro', p: '$19', f: ['Unlimited projects', 'Priority support'] },
    { n: 'Enterprise', p: '$99', f: ['Custom deploy', 'Dedicated support'] },
    { n: 'Ultimate', p: '$249', f: ['White-label', 'SLA 99.99%'] },
  ];
  const shown = allTiers.slice(0, tiers);
  return (
    <div className={cn('grid gap-3 max-w-2xl', tiers <= 3 ? 'grid-cols-3' : 'grid-cols-4')}>
      {shown.map((pl) => {
        const isPop = highlighted !== 'none' && pl.n.toLowerCase() === highlighted;
        return (
          <div key={pl.n} className={cn('rounded-lg border p-4', isPop && 'border-primary ring-1 ring-primary')}>
            <h3 className='text-sm font-semibold'>{pl.n}</h3>
            <p className='text-2xl font-bold mt-1'>{pl.p}<span className='text-xs text-muted-foreground'>/mo</span></p>
            <ul className='mt-3 space-y-1'>
              {pl.f.map((f) => <li key={f} className='text-xs text-muted-foreground'>&check; {f}</li>)}
            </ul>
            <button className={cn('mt-3 h-8 w-full rounded-md text-xs', isPop ? 'bg-primary text-primary-foreground' : 'border hover:bg-accent')}>Choose</button>
          </div>
        );
      })}
    </div>
  );
}

export const BlockPricingStory: StoryObj<typeof Pricing> = {
  name: 'Block \u2014 Pricing',
  render: (args) => <Pricing {...args} />,
  args: { tiers: 3, highlighted: 'pro' },
  argTypes: {
    tiers: { control: { type: 'number', min: 2, max: 4 } },
    highlighted: { control: 'select', options: ['none', 'pro', 'enterprise'] },
  },
};

/* ─── Settings ────────────────────────────────────────────────────── */

function Settings({ activeTab = 'general' }: { activeTab?: 'general' | 'notifications' | 'security' }) {
  const [t, st] = useState(activeTab);
  React.useEffect(() => { st(activeTab); }, [activeTab]);
  return (
    <div className='max-w-md space-y-3'>
      <div className='flex gap-1 border-b'>
        {(['general', 'notifications', 'security'] as const).map((tab) => (
          <button key={tab} onClick={() => st(tab)} className={cn(
            'px-3 py-1.5 text-xs font-medium border-b-2 -mb-px',
            t === tab ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground',
          )}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        ))}
      </div>
      <div className='rounded-lg border p-4 space-y-3'>
        {t === 'general' && (
          <>
            <div className='space-y-1'>
              <label className='text-xs font-medium'>Name</label>
              <input defaultValue='John' className='h-8 w-full rounded-md border px-2 text-sm' />
            </div>
            <div className='space-y-1'>
              <label className='text-xs font-medium'>Bio</label>
              <textarea rows={2} className='w-full rounded-md border px-2 py-1 text-sm' defaultValue='Developer' />
            </div>
          </>
        )}
        {t === 'notifications' && (
          <div className='space-y-3'>
            {['Email notifications', 'Push notifications', 'SMS alerts'].map((n) => (
              <label key={n} className='flex items-center justify-between'>
                <span className='text-sm'>{n}</span>
                <input type='checkbox' defaultChecked className='h-4 w-4 accent-primary' />
              </label>
            ))}
          </div>
        )}
        {t === 'security' && (
          <div className='space-y-3'>
            <div className='space-y-1'>
              <label className='text-xs font-medium'>Current Password</label>
              <input type='password' className='h-8 w-full rounded-md border px-2 text-sm' />
            </div>
            <div className='space-y-1'>
              <label className='text-xs font-medium'>New Password</label>
              <input type='password' className='h-8 w-full rounded-md border px-2 text-sm' />
            </div>
          </div>
        )}
        <button className='h-8 rounded-md bg-primary px-4 text-xs text-primary-foreground'>Save</button>
      </div>
    </div>
  );
}

export const BlockSettingsStory: StoryObj<typeof Settings> = {
  name: 'Block \u2014 Settings',
  render: (args) => <Settings {...args} />,
  args: { activeTab: 'general' },
  argTypes: { activeTab: { control: 'select', options: ['general', 'notifications', 'security'] } },
};

/* ─── Error Pages ─────────────────────────────────────────────────── */

function ErrorPage({ code = '404' }: { code?: '404' | '500' | '403' }) {
  const pages: Record<string, { t: string; btn: string }> = {
    '404': { t: 'Page not found', btn: 'Go home' },
    '500': { t: 'Internal server error', btn: 'Retry' },
    '403': { t: 'Access forbidden', btn: 'Request access' },
  };
  const p = pages[code];
  return (
    <div className='rounded-lg border p-8 text-center max-w-sm mx-auto'>
      <p className='text-5xl font-bold text-muted-foreground/20'>{code}</p>
      <h3 className='mt-3 text-sm font-bold'>{p.t}</h3>
      <p className='mt-1 text-xs text-muted-foreground'>The requested resource could not be served.</p>
      <button className='mt-4 h-8 rounded-md bg-primary px-4 text-xs text-primary-foreground'>{p.btn}</button>
    </div>
  );
}

export const BlockErrorStory: StoryObj<typeof ErrorPage> = {
  name: 'Block \u2014 Error Pages',
  render: (args) => <ErrorPage {...args} />,
  args: { code: '404' },
  argTypes: { code: { control: 'select', options: ['404', '500', '403'] } },
};

/* ─── Chat Page ───────────────────────────────────────────────────── */

function ChatPage({ showSidebar = true }: { showSidebar?: boolean }) {
  return (
    <div className='flex h-56 rounded-md border overflow-hidden'>
      {showSidebar && (
        <div className='w-40 border-r bg-muted/30 p-2 space-y-1'>
          <button className='w-full rounded-md bg-accent px-2 py-1.5 text-xs text-left font-medium'>Active chat</button>
          {['Chat 2', 'Chat 3'].map((c) => (
            <button key={c} className='w-full rounded-md px-2 py-1.5 text-xs text-left hover:bg-accent text-muted-foreground'>{c}</button>
          ))}
        </div>
      )}
      <div className='flex flex-1 flex-col'>
        <div className='flex-1 p-3 space-y-2'>
          <div className='flex gap-2'>
            <div className='h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[8px]'>AI</div>
            <div className='rounded-lg bg-muted px-2.5 py-1.5 text-xs max-w-[80%]'>How can I help?</div>
          </div>
        </div>
        <div className='border-t p-2 flex gap-1'>
          <input placeholder='Message...' className='flex-1 h-7 rounded-md border px-2 text-xs' />
          <button className='h-7 rounded-md bg-primary px-2 text-xs text-primary-foreground'>Send</button>
        </div>
      </div>
    </div>
  );
}

export const BlockChatPageStory: StoryObj<typeof ChatPage> = {
  name: 'Block \u2014 Chat Page',
  render: (args) => <ChatPage {...args} />,
  args: { showSidebar: true },
  argTypes: { showSidebar: { control: 'boolean' } },
};

/* ─── Product Grid ────────────────────────────────────────────────── */

function ProductGrid({ columns = 3, showFilters = false }: { columns?: number; showFilters?: boolean }) {
  const products = ['Headphones', 'Keyboard', 'Mouse', 'Monitor', 'Webcam', 'Speaker'];
  const shown = products.slice(0, columns * 2);
  return (
    <div className='space-y-3'>
      {showFilters && (
        <div className='flex gap-2'>
          {['All', 'Audio', 'Input', 'Display'].map((f) => (
            <button key={f} className='h-7 rounded-full border px-3 text-xs hover:bg-accent'>{f}</button>
          ))}
        </div>
      )}
      <div className={cn('grid gap-3', columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-4')} style={{ maxWidth: columns * 180 }}>
        {shown.map((n) => (
          <div key={n} className='rounded-lg border overflow-hidden'>
            <div className='aspect-square bg-muted flex items-center justify-center text-xs text-muted-foreground'>Image</div>
            <div className='p-3'>
              <p className='text-xs font-semibold'>{n}</p>
              <p className='text-sm font-bold mt-0.5'>$99</p>
              <button className='mt-2 h-7 w-full rounded-md bg-primary text-[10px] text-primary-foreground'>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const BlockProductStory: StoryObj<typeof ProductGrid> = {
  name: 'Block \u2014 Products',
  render: (args) => <ProductGrid {...args} />,
  args: { columns: 3, showFilters: false },
  argTypes: {
    columns: { control: { type: 'number', min: 2, max: 4 } },
    showFilters: { control: 'boolean' },
  },
};

/* ─── Checkout ────────────────────────────────────────────────────── */

function Checkout({ step = 1 }: { step?: number }) {
  const [s, ss] = useState(step - 1);
  React.useEffect(() => { ss(step - 1); }, [step]);
  const steps = ['Shipping', 'Payment', 'Review', 'Confirm'];
  const shownSteps = steps.slice(0, Math.max(step + 1, 3));
  return (
    <div className='max-w-sm space-y-4'>
      <div className='flex items-center gap-1'>
        {shownSteps.map((label, i) => (
          <React.Fragment key={label}>
            <div className='flex items-center gap-1'>
              <div className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full text-xs border-2',
                i <= s ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30 text-muted-foreground',
              )}>{i < s ? '\u2713' : i + 1}</div>
              <span className='text-xs'>{label}</span>
            </div>
            {i < shownSteps.length - 1 && <div className='h-0.5 flex-1 bg-muted' />}
          </React.Fragment>
        ))}
      </div>
      <div className='rounded-md border p-4'>
        {s === 0 && (
          <div className='space-y-2'>
            <div className='space-y-1'><label className='text-xs font-medium'>Address</label><input className='h-8 w-full rounded-md border px-2 text-sm' placeholder='123 Main St' /></div>
            <div className='space-y-1'><label className='text-xs font-medium'>City</label><input className='h-8 w-full rounded-md border px-2 text-sm' placeholder='New York' /></div>
          </div>
        )}
        {s === 1 && (
          <div className='space-y-2'>
            <div className='space-y-1'><label className='text-xs font-medium'>Card Number</label><input className='h-8 w-full rounded-md border px-2 text-sm' placeholder='4242 4242 4242 4242' /></div>
            <div className='grid grid-cols-2 gap-2'>
              <div className='space-y-1'><label className='text-xs font-medium'>Expiry</label><input className='h-8 w-full rounded-md border px-2 text-sm' placeholder='MM/YY' /></div>
              <div className='space-y-1'><label className='text-xs font-medium'>CVC</label><input className='h-8 w-full rounded-md border px-2 text-sm' placeholder='123' /></div>
            </div>
          </div>
        )}
        {s >= 2 && (
          <div className='text-sm space-y-1'>
            <p className='font-medium'>Order Summary</p>
            <p className='text-muted-foreground'>1x Headphones - $99</p>
            <p className='font-bold mt-2'>Total: $99</p>
          </div>
        )}
      </div>
      <div className='flex justify-between'>
        <button onClick={() => ss(Math.max(0, s - 1))} disabled={s === 0} className='h-8 rounded-md border px-3 text-xs disabled:opacity-50'>Back</button>
        <button onClick={() => ss(Math.min(3, s + 1))} className='h-8 rounded-md bg-primary px-3 text-xs text-primary-foreground'>{s >= 2 ? 'Place Order' : 'Next'}</button>
      </div>
    </div>
  );
}

export const BlockCheckoutStory: StoryObj<typeof Checkout> = {
  name: 'Block \u2014 Checkout',
  render: (args) => <Checkout {...args} />,
  args: { step: 1 },
  argTypes: { step: { control: { type: 'number', min: 1, max: 4 } } },
};

const meta: Meta = { title: 'Blocks' };
export default meta;
