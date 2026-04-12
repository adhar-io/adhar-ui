import React, { useState } from 'react';
import { Badge, Callout, CodeBlock, PageHeader } from '../components/ui.tsx';
import * as Demos from '../components/demo-components.tsx';
import { NavIcon } from '../components/icons.tsx';

interface ExampleConfig {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  Demo: React.ComponentType;
  code: string;
}

const examples: ExampleConfig[] = [
  {
    id: 'login-form',
    title: 'Login Form',
    description: 'A complete login form with email, password, and submit button.',
    tags: ['form', 'auth', 'input', 'button'],
    difficulty: 'beginner',
    Demo: () => (
      <div className='w-full max-w-sm mx-auto space-y-4'>
        <div className='text-center mb-6'>
          <h3 className='text-lg font-semibold text-foreground'>Welcome back</h3>
          <p className='text-sm text-muted-foreground'>Sign in to your account</p>
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>Email</label>
          <input
            type='email'
            placeholder='you@example.com'
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          />
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium text-foreground'>Password</label>
          <input
            type='password'
            placeholder='••••••••'
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          />
        </div>
        <button className='inline-flex items-center justify-center w-full h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors'>
          Sign In
        </button>
        <p className='text-center text-xs text-muted-foreground'>
          Don't have an account?{' '}
          <span className='text-primary cursor-pointer hover:underline'>Sign up</span>
        </p>
      </div>
    ),
    code: `import { Input, Button, Label } from "@adhar-ui/react"

export function LoginForm() {
  return (
    <form className="max-w-sm mx-auto space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Welcome back</h3>
        <p className="text-sm text-muted-foreground">Sign in to your account</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>
      <Button className="w-full">Sign In</Button>
    </form>
  )
}`,
  },
  {
    id: 'dashboard-stats',
    title: 'Dashboard Stats',
    description: 'A row of stat cards displaying key metrics, ideal for admin dashboards.',
    tags: ['dashboard', 'card', 'stats'],
    difficulty: 'beginner',
    Demo: () => (
      <div className='grid grid-cols-2 gap-3 w-full max-w-lg'>
        {[
          { label: 'Revenue', value: '$45,231', change: '+12.5%', up: true },
          { label: 'Users', value: '2,350', change: '+180', up: true },
          { label: 'Bounce', value: '24.5%', change: '-2.1%', up: false },
          { label: 'Sessions', value: '14.2K', change: '+8.3%', up: true },
        ].map((s) => (
          <div key={s.label} className='rounded-lg border border-border bg-card p-4'>
            <div className='text-xs text-muted-foreground mb-1'>{s.label}</div>
            <div className='text-xl font-bold text-foreground'>{s.value}</div>
            <div className={`text-xs mt-1 ${s.up ? 'text-emerald-500' : 'text-red-500'}`}>
              {s.change}
            </div>
          </div>
        ))}
      </div>
    ),
    code: `import { Card, Badge } from "@adhar-ui/react"

export function DashboardStats() {
  const stats = [
    { label: 'Revenue', value: '$45,231', change: '+12.5%' },
    { label: 'Users', value: '2,350', change: '+180' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s) => (
        <Card key={s.label} className="p-4">
          <p className="text-xs text-muted-foreground">{s.label}</p>
          <p className="text-xl font-bold">{s.value}</p>
          <Badge variant="secondary">{s.change}</Badge>
        </Card>
      ))}
    </div>
  )
}`,
  },
  {
    id: 'notification-feed',
    title: 'Notification Feed',
    description: 'A notifications list with avatars, timestamps, and unread indicators.',
    tags: ['notification', 'avatar', 'list'],
    difficulty: 'intermediate',
    Demo: () => (
      <div className='w-full max-w-sm space-y-1'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-sm font-semibold text-foreground'>Notifications</h3>
          <span className='text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-medium'>
            3 new
          </span>
        </div>
        {[
          { name: 'Sarah', text: 'Commented on your PR', time: '2m ago', unread: true },
          { name: 'Alex', text: 'Approved your changes', time: '1h ago', unread: true },
          { name: 'Team', text: 'Sprint planning starts soon', time: '3h ago', unread: true },
          { name: 'CI/CD', text: 'Build #142 succeeded', time: '5h ago', unread: false },
        ].map((n, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              n.unread ? 'bg-primary/5' : 'hover:bg-muted/50'
            }`}
          >
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center shrink-0'>
              <span className='text-xs font-medium text-primary'>{n.name[0]}</span>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm text-foreground'>
                <span className='font-medium'>{n.name}</span> {n.text}
              </p>
              <p className='text-[11px] text-muted-foreground mt-0.5'>{n.time}</p>
            </div>
            {n.unread && <span className='w-2 h-2 rounded-full bg-primary shrink-0 mt-2' />}
          </div>
        ))}
      </div>
    ),
    code: `import { Avatar, Badge } from "@adhar-ui/react"

export function NotificationFeed({ notifications }) {
  return (
    <div className="space-y-1">
      {notifications.map((n) => (
        <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg">
          <Avatar src={n.avatar} fallback={n.name[0]} />
          <div>
            <p className="text-sm"><b>{n.name}</b> {n.text}</p>
            <p className="text-xs text-muted-foreground">{n.time}</p>
          </div>
          {n.unread && <Badge variant="default" />}
        </div>
      ))}
    </div>
  )
}`,
  },
  {
    id: 'settings-panel',
    title: 'Settings Panel',
    description: 'A settings page with grouped toggle switches and descriptions.',
    tags: ['settings', 'switch', 'form'],
    difficulty: 'intermediate',
    Demo: () => {
      const [vals, setVals] = React.useState({
        notif: true,
        email: false,
        analytics: true,
        dark: false,
      });
      return (
        <div className='w-full max-w-sm space-y-4'>
          <h3 className='text-sm font-semibold text-foreground'>Preferences</h3>
          {[
            {
              key: 'notif' as const,
              label: 'Push Notifications',
              desc: 'Receive push notifications on your device',
            },
            { key: 'email' as const, label: 'Email Digest', desc: 'Weekly summary of activity' },
            {
              key: 'analytics' as const,
              label: 'Usage Analytics',
              desc: 'Help improve the product with anonymous data',
            },
            { key: 'dark' as const, label: 'Dark Mode', desc: 'Use dark color scheme' },
          ].map((item) => (
            <div key={item.key} className='flex items-center justify-between py-2'>
              <div>
                <div className='text-sm font-medium text-foreground'>{item.label}</div>
                <div className='text-xs text-muted-foreground'>{item.desc}</div>
              </div>
              <button
                onClick={() => setVals((p) => ({ ...p, [item.key]: !p[item.key] }))}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  vals[item.key] ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                    vals[item.key] ? 'translate-x-[18px]' : 'translate-x-[2px]'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      );
    },
    code: `import { Switch, Label } from "@adhar-ui/react"
import { useState } from "react"

export function SettingsPanel() {
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label>Push Notifications</Label>
          <p className="text-xs text-muted-foreground">
            Receive notifications on your device
          </p>
        </div>
        <Switch checked={notifications} onCheckedChange={setNotifications} />
      </div>
    </div>
  )
}`,
  },
  {
    id: 'pricing-table',
    title: 'Pricing Table',
    description: 'A pricing comparison layout with feature lists and CTA buttons.',
    tags: ['pricing', 'card', 'marketing'],
    difficulty: 'advanced',
    Demo: () => (
      <div className='grid grid-cols-2 gap-3 w-full max-w-md'>
        {[
          {
            plan: 'Starter',
            price: '$0',
            period: '/mo',
            features: ['5 projects', '1 GB storage', 'Community support'],
            cta: 'Get Started',
            primary: false,
          },
          {
            plan: 'Pro',
            price: '$29',
            period: '/mo',
            features: ['Unlimited projects', '100 GB storage', 'Priority support'],
            cta: 'Upgrade',
            primary: true,
          },
        ].map((p) => (
          <div
            key={p.plan}
            className={`rounded-xl border p-5 ${
              p.primary ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-card'
            }`}
          >
            <div className='text-sm font-medium text-muted-foreground mb-1'>{p.plan}</div>
            <div className='flex items-baseline gap-0.5 mb-4'>
              <span className='text-2xl font-bold text-foreground'>{p.price}</span>
              <span className='text-xs text-muted-foreground'>{p.period}</span>
            </div>
            <ul className='space-y-2 mb-5'>
              {p.features.map((f) => (
                <li key={f} className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <svg
                    className='w-3.5 h-3.5 text-emerald-500 shrink-0'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full h-8 rounded-md text-xs font-medium transition-colors ${
                p.primary
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'border border-border hover:bg-accent'
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    ),
    code: `import { Card, Button, Badge } from "@adhar-ui/react"

export function PricingTable() {
  const plans = [
    { name: 'Starter', price: '$0', features: ['5 projects', '1 GB', 'Community'] },
    { name: 'Pro', price: '$29', features: ['Unlimited', '100 GB', 'Priority'] },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {plans.map((plan) => (
        <Card key={plan.name} className="p-5">
          <h3>{plan.name}</h3>
          <p className="text-2xl font-bold">{plan.price}</p>
          <ul>{plan.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <Button className="w-full mt-4">Choose Plan</Button>
        </Card>
      ))}
    </div>
  )
}`,
  },
  {
    id: 'command-palette',
    title: 'Command Bar',
    description: 'A ⌘K-style command palette with search and keyboard navigation.',
    tags: ['command', 'search', 'dialog', 'keyboard'],
    difficulty: 'advanced',
    Demo: () => (
      <div className='w-full max-w-sm mx-auto'>
        <div className='rounded-xl border border-border bg-card shadow-lg overflow-hidden'>
          <div className='flex items-center gap-2.5 px-3 border-b border-border'>
            <svg
              className='w-4 h-4 text-muted-foreground'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
            <input
              className='flex-1 h-10 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none'
              placeholder='Type a command...'
            />
          </div>
          <div className='p-1.5'>
            {[
              { icon: '📄', label: 'New File', shortcut: '⌘N' },
              { icon: '🔍', label: 'Search', shortcut: '⌘F' },
              { icon: '⚙️', label: 'Settings', shortcut: '⌘,' },
              { icon: '🎨', label: 'Toggle Theme', shortcut: '⌘⇧T' },
            ].map((cmd, i) => (
              <div
                key={cmd.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                  i === 0 ? 'bg-accent' : 'hover:bg-accent/50'
                }`}
              >
                <NavIcon icon={cmd.icon} />
                <span className='flex-1 text-foreground'>{cmd.label}</span>
                <kbd className='text-[10px] px-1.5 py-0.5 rounded border border-border bg-muted text-muted-foreground font-mono'>
                  {cmd.shortcut}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    code: `import { CommandPalette, CommandGroup, CommandItem } from "@adhar-ui/react"

export function CommandBar() {
  return (
    <CommandPalette>
      <CommandGroup heading="Actions">
        <CommandItem>New File</CommandItem>
        <CommandItem>Search</CommandItem>
        <CommandItem>Settings</CommandItem>
      </CommandGroup>
    </CommandPalette>
  )
}`,
  },
  // ─── New Blocks ────────────────────────────────────────────────────
  {
    id: 'hero-section',
    title: 'Hero Section',
    description: 'A full-width hero section with headline, description, CTA buttons, and social proof.',
    tags: ['marketing', 'landing', 'hero', 'cta'],
    difficulty: 'beginner' as const,
    Demo: () => (
      <div className='w-full max-w-lg mx-auto text-center space-y-5 py-4'>
        <span className='inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20'>New in v0.1.0</span>
        <h1 className='text-2xl font-bold tracking-tight text-foreground'>Build faster with <span className='text-primary'>Adhar UI</span></h1>
        <p className='text-sm text-muted-foreground max-w-md mx-auto leading-relaxed'>A modern, open-source design system with 80+ components for React, Vue, Solid, Svelte, and Angular.</p>
        <div className='flex items-center justify-center gap-3'>
          <button className='h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90'>Get Started</button>
          <button className='h-10 px-5 rounded-md border border-input text-sm font-medium hover:bg-accent'>View on GitHub</button>
        </div>
        <div className='flex items-center justify-center gap-4 pt-2'>
          {['2.5k+ Stars', '500+ Users', '80+ Components'].map((s) => <span key={s} className='text-xs text-muted-foreground'>{s}</span>)}
        </div>
      </div>
    ),
    code: `import { Button, Badge } from "@adhar-ui/react"\n\nexport function HeroSection() {\n  return (\n    <section className="text-center space-y-5 py-16">\n      <Badge variant="outline">New in v0.1.0</Badge>\n      <h1 className="text-4xl font-bold">Build faster with Adhar UI</h1>\n      <p className="text-muted-foreground max-w-md mx-auto">A modern design system.</p>\n      <div className="flex justify-center gap-3">\n        <Button>Get Started</Button>\n        <Button variant="outline">GitHub</Button>\n      </div>\n    </section>\n  )\n}`,
  },
  {
    id: 'user-profile-card',
    title: 'User Profile Card',
    description: 'A profile card with avatar, bio, stats, and action buttons.',
    tags: ['profile', 'card', 'avatar', 'social'],
    difficulty: 'beginner' as const,
    Demo: () => (
      <div className='w-full max-w-xs mx-auto rounded-xl border border-border bg-card p-6 text-center'>
        <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3'>
          <span className='text-xl font-bold text-primary'>JD</span>
        </div>
        <h3 className='text-base font-semibold text-foreground'>Jane Doe</h3>
        <p className='text-xs text-muted-foreground mb-3'>Senior Product Designer</p>
        <div className='flex justify-center gap-6 mb-4'>
          {[{ n: '1.2k', l: 'Following' }, { n: '4.5k', l: 'Followers' }, { n: '128', l: 'Posts' }].map((s) => (
            <div key={s.l} className='text-center'><div className='text-sm font-semibold text-foreground'>{s.n}</div><div className='text-[10px] text-muted-foreground'>{s.l}</div></div>
          ))}
        </div>
        <div className='flex gap-2'>
          <button className='flex-1 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium'>Follow</button>
          <button className='flex-1 h-9 rounded-md border border-input text-sm font-medium'>Message</button>
        </div>
      </div>
    ),
    code: `import { Card, Avatar, Button } from "@adhar-ui/react"\n\nexport function UserProfileCard() {\n  return (\n    <Card className="max-w-xs text-center p-6">\n      <Avatar size="lg" fallback="JD" />\n      <h3 className="font-semibold">Jane Doe</h3>\n      <p className="text-sm text-muted-foreground">Senior Product Designer</p>\n      <div className="flex gap-2 mt-4">\n        <Button className="flex-1">Follow</Button>\n        <Button variant="outline" className="flex-1">Message</Button>\n      </div>\n    </Card>\n  )\n}`,
  },
  {
    id: 'navbar',
    title: 'Navigation Bar',
    description: 'A responsive top navigation bar with logo, links, search, and user menu.',
    tags: ['navigation', 'header', 'layout', 'responsive'],
    difficulty: 'intermediate' as const,
    Demo: () => (
      <div className='w-full rounded-lg border border-border bg-card'>
        <div className='flex items-center h-14 px-4 gap-4'>
          <div className='w-7 h-7 rounded-md bg-primary flex items-center justify-center'><span className='text-white text-xs font-bold'>A</span></div>
          <span className='font-semibold text-sm text-foreground'>Acme Inc</span>
          <nav className='hidden sm:flex items-center gap-4 ml-4'>
            {['Dashboard', 'Projects', 'Team', 'Reports'].map((l) => <a key={l} className='text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors'>{l}</a>)}
          </nav>
          <div className='flex-1' />
          <div className='flex items-center gap-2'>
            <div className='w-36 h-8 rounded-md border border-input bg-background flex items-center px-2 text-xs text-muted-foreground'>Search...</div>
            <div className='w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground'>JD</div>
          </div>
        </div>
      </div>
    ),
    code: `import { Button, Avatar, Input } from "@adhar-ui/react"\n\nexport function Navbar() {\n  return (\n    <header className="border-b">\n      <div className="flex items-center h-14 px-4 gap-4">\n        <Logo />\n        <nav className="flex gap-4">\n          <NavLink href="/dashboard">Dashboard</NavLink>\n          <NavLink href="/projects">Projects</NavLink>\n        </nav>\n        <Input placeholder="Search..." className="w-48 ml-auto" />\n        <Avatar fallback="JD" />\n      </div>\n    </header>\n  )\n}`,
  },
  {
    id: 'data-table',
    title: 'Data Table',
    description: 'A sortable data table with headers, rows, status badges, and actions column.',
    tags: ['table', 'data', 'enterprise', 'admin'],
    difficulty: 'advanced' as const,
    Demo: () => (
      <div className='w-full overflow-x-auto rounded-lg border border-border'>
        <table className='w-full text-sm'>
          <thead><tr className='border-b border-border bg-muted/30'>
            <th className='text-left px-4 py-2.5 font-medium'>Invoice</th>
            <th className='text-left px-4 py-2.5 font-medium'>Status</th>
            <th className='text-left px-4 py-2.5 font-medium'>Method</th>
            <th className='text-right px-4 py-2.5 font-medium'>Amount</th>
          </tr></thead>
          <tbody>
            {[
              { id: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00', color: 'bg-emerald-500/10 text-emerald-600' },
              { id: 'INV-002', status: 'Pending', method: 'PayPal', amount: '$150.00', color: 'bg-amber-500/10 text-amber-600' },
              { id: 'INV-003', status: 'Failed', method: 'Bank Transfer', amount: '$350.00', color: 'bg-red-500/10 text-red-600' },
              { id: 'INV-004', status: 'Paid', method: 'Credit Card', amount: '$450.00', color: 'bg-emerald-500/10 text-emerald-600' },
            ].map((row, i) => (
              <tr key={row.id} className={`border-b border-border last:border-0 ${i % 2 ? 'bg-muted/10' : ''}`}>
                <td className='px-4 py-2.5 font-medium'>{row.id}</td>
                <td className='px-4 py-2.5'><span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${row.color}`}>{row.status}</span></td>
                <td className='px-4 py-2.5 text-muted-foreground'>{row.method}</td>
                <td className='px-4 py-2.5 text-right font-medium'>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    code: `import { Table, Badge } from "@adhar-ui/react"\n\nexport function DataTable({ invoices }) {\n  return (\n    <Table>\n      <TableHeader>\n        <TableRow>\n          <TableHead>Invoice</TableHead>\n          <TableHead>Status</TableHead>\n          <TableHead>Method</TableHead>\n          <TableHead className="text-right">Amount</TableHead>\n        </TableRow>\n      </TableHeader>\n      <TableBody>\n        {invoices.map((inv) => (\n          <TableRow key={inv.id}>\n            <TableCell>{inv.id}</TableCell>\n            <TableCell><Badge>{inv.status}</Badge></TableCell>\n            <TableCell>{inv.method}</TableCell>\n            <TableCell className="text-right">{inv.amount}</TableCell>\n          </TableRow>\n        ))}\n      </TableBody>\n    </Table>\n  )\n}`,
  },
  {
    id: 'chat-interface',
    title: 'Chat Interface',
    description: 'A messaging UI with message bubbles, timestamps, typing indicator, and input.',
    tags: ['chat', 'ai', 'messaging', 'realtime'],
    difficulty: 'advanced' as const,
    Demo: () => (
      <div className='w-full max-w-sm mx-auto rounded-xl border border-border bg-card flex flex-col h-80'>
        <div className='px-4 py-3 border-b border-border flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary'>AI</div>
          <div><div className='text-sm font-medium'>AI Assistant</div><div className='text-[10px] text-emerald-500'>Online</div></div>
        </div>
        <div className='flex-1 overflow-y-auto p-4 space-y-3'>
          <div className='flex gap-2'><div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0'>AI</div><div className='bg-muted rounded-lg rounded-tl-sm px-3 py-2 text-sm max-w-[80%]'>Hello! How can I help you today?</div></div>
          <div className='flex justify-end'><div className='bg-primary text-primary-foreground rounded-lg rounded-tr-sm px-3 py-2 text-sm max-w-[80%]'>Show me a button component</div></div>
          <div className='flex gap-2'><div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0'>AI</div><div className='bg-muted rounded-lg rounded-tl-sm px-3 py-2 text-sm max-w-[80%]'>Here's a button with multiple variants...</div></div>
          <div className='flex gap-2 items-center'><div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0'>AI</div><div className='flex gap-1'><span className='w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce' /><span className='w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.15s]' /><span className='w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.3s]' /></div></div>
        </div>
        <div className='px-3 py-2 border-t border-border flex gap-2'>
          <input className='flex-1 h-9 px-3 rounded-md border border-input bg-background text-sm' placeholder='Type a message...' />
          <button className='h-9 w-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm'>↑</button>
        </div>
      </div>
    ),
    code: `import { Card, Input, Button, Avatar } from "@adhar-ui/react"\n\nexport function ChatInterface() {\n  return (\n    <Card className="flex flex-col h-96">\n      <CardHeader>\n        <Avatar fallback="AI" />\n        <span>AI Assistant</span>\n      </CardHeader>\n      <CardContent className="flex-1 overflow-y-auto">\n        <MessageBubble role="assistant">Hello!</MessageBubble>\n        <MessageBubble role="user">Show me a button</MessageBubble>\n      </CardContent>\n      <CardFooter>\n        <Input placeholder="Type a message..." />\n        <Button size="icon">↑</Button>\n      </CardFooter>\n    </Card>\n  )\n}`,
  },
  {
    id: 'file-upload',
    title: 'File Upload',
    description: 'A drag-and-drop file upload zone with progress indicator and file list.',
    tags: ['upload', 'form', 'file', 'drag-drop'],
    difficulty: 'intermediate' as const,
    Demo: () => (
      <div className='w-full max-w-sm mx-auto space-y-3'>
        <div className='rounded-xl border-2 border-dashed border-border hover:border-primary/40 p-8 text-center transition-colors cursor-pointer'>
          <svg className='w-8 h-8 mx-auto text-muted-foreground mb-2' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}><path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5' /></svg>
          <p className='text-sm font-medium text-foreground'>Drop files here or click to browse</p>
          <p className='text-xs text-muted-foreground mt-1'>PNG, JPG, PDF up to 10MB</p>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center gap-3 p-3 rounded-lg border border-border bg-card'>
            <div className='w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500 text-xs font-bold'>PDF</div>
            <div className='flex-1 min-w-0'><p className='text-sm font-medium truncate'>design-spec.pdf</p><p className='text-[10px] text-muted-foreground'>2.4 MB</p></div>
            <div className='w-16'><div className='h-1.5 rounded-full bg-secondary'><div className='h-full rounded-full bg-primary w-3/4' /></div></div>
            <span className='text-xs text-muted-foreground'>75%</span>
          </div>
          <div className='flex items-center gap-3 p-3 rounded-lg border border-border bg-card'>
            <div className='w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xs font-bold'>PNG</div>
            <div className='flex-1 min-w-0'><p className='text-sm font-medium truncate'>hero-image.png</p><p className='text-[10px] text-muted-foreground'>1.1 MB</p></div>
            <span className='text-xs text-emerald-500 font-medium'>Done</span>
          </div>
        </div>
      </div>
    ),
    code: `import { Card, Progress, Button } from "@adhar-ui/react"\n\nexport function FileUpload() {\n  return (\n    <div className="space-y-3">\n      <div className="border-2 border-dashed rounded-xl p-8 text-center">\n        <UploadIcon />\n        <p>Drop files here or click to browse</p>\n      </div>\n      <FileItem name="design-spec.pdf" progress={75} />\n      <FileItem name="hero-image.png" progress={100} />\n    </div>\n  )\n}`,
  },
  {
    id: 'team-members',
    title: 'Team Members',
    description: 'A team member list with avatars, roles, status indicators, and action menus.',
    tags: ['team', 'list', 'avatar', 'admin'],
    difficulty: 'intermediate' as const,
    Demo: () => (
      <div className='w-full max-w-md mx-auto rounded-xl border border-border bg-card'>
        <div className='px-5 py-4 border-b border-border flex items-center justify-between'>
          <h3 className='text-sm font-semibold text-foreground'>Team Members</h3>
          <button className='h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium'>Invite</button>
        </div>
        {[
          { name: 'Alice Chen', role: 'Lead Designer', status: 'online', initials: 'AC' },
          { name: 'Bob Smith', role: 'Frontend Dev', status: 'online', initials: 'BS' },
          { name: 'Carol Davis', role: 'Backend Dev', status: 'away', initials: 'CD' },
          { name: 'Dan Wilson', role: 'PM', status: 'offline', initials: 'DW' },
        ].map((m) => (
          <div key={m.name} className='flex items-center gap-3 px-5 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors'>
            <div className='relative'>
              <div className='w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground'>{m.initials}</div>
              <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card ${m.status === 'online' ? 'bg-emerald-500' : m.status === 'away' ? 'bg-amber-500' : 'bg-zinc-400'}`} />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium text-foreground'>{m.name}</p>
              <p className='text-xs text-muted-foreground'>{m.role}</p>
            </div>
            <button className='text-muted-foreground hover:text-foreground text-lg'>···</button>
          </div>
        ))}
      </div>
    ),
    code: `import { Card, Avatar, Badge, Button } from "@adhar-ui/react"\n\nexport function TeamMembers({ members }) {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>Team Members</CardTitle>\n        <Button size="sm">Invite</Button>\n      </CardHeader>\n      {members.map((m) => (\n        <div key={m.id} className="flex items-center gap-3 p-4">\n          <Avatar fallback={m.initials} />\n          <div>\n            <p className="font-medium">{m.name}</p>\n            <p className="text-sm text-muted-foreground">{m.role}</p>\n          </div>\n        </div>\n      ))}\n    </Card>\n  )\n}`,
  },
  {
    id: 'sidebar-layout',
    title: 'App Sidebar',
    description: 'A collapsible sidebar with grouped navigation, icons, badges, and user section.',
    tags: ['layout', 'sidebar', 'navigation', 'dashboard'],
    difficulty: 'intermediate' as const,
    Demo: () => (
      <div className='w-56 rounded-xl border border-border bg-card flex flex-col h-80'>
        <div className='p-3 border-b border-border flex items-center gap-2'>
          <div className='w-7 h-7 rounded-md bg-primary flex items-center justify-center'><span className='text-white text-xs font-bold'>A</span></div>
          <span className='text-sm font-semibold text-foreground'>Workspace</span>
        </div>
        <nav className='flex-1 p-2 space-y-0.5 overflow-y-auto'>
          {[
            { label: 'Dashboard', active: true },
            { label: 'Projects', badge: '12' },
            { label: 'Tasks' },
            { label: 'Calendar' },
            { label: 'Messages', badge: '3' },
            { label: 'Settings' },
          ].map((item) => (
            <button key={item.label} className={`flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-sm transition-colors ${item.active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
              <span className='flex-1 text-left'>{item.label}</span>
              {item.badge && <span className='text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground'>{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className='p-3 border-t border-border flex items-center gap-2'>
          <div className='w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground'>JD</div>
          <div className='flex-1 min-w-0'><p className='text-xs font-medium truncate'>John Doe</p></div>
        </div>
      </div>
    ),
    code: `import { Sidebar, SidebarItem, Avatar } from "@adhar-ui/react"\n\nexport function AppSidebar() {\n  return (\n    <Sidebar>\n      <SidebarHeader>\n        <Logo />\n        <span>Workspace</span>\n      </SidebarHeader>\n      <SidebarContent>\n        <SidebarItem active>Dashboard</SidebarItem>\n        <SidebarItem badge="12">Projects</SidebarItem>\n        <SidebarItem>Tasks</SidebarItem>\n      </SidebarContent>\n      <SidebarFooter>\n        <Avatar fallback="JD" size="sm" />\n        <span>John Doe</span>\n      </SidebarFooter>\n    </Sidebar>\n  )\n}`,
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    description: 'A task board with draggable columns and cards showing status, assignees, and priorities.',
    tags: ['kanban', 'project', 'enterprise', 'board'],
    difficulty: 'advanced' as const,
    Demo: () => (
      <div className='w-full flex gap-3 overflow-x-auto pb-2'>
        {[
          { title: 'To Do', color: 'bg-zinc-500', items: [{ t: 'Design landing page', p: 'High', a: 'AC' }, { t: 'Write API docs', p: 'Medium', a: 'BS' }] },
          { title: 'In Progress', color: 'bg-blue-500', items: [{ t: 'Build auth flow', p: 'High', a: 'CD' }] },
          { title: 'Done', color: 'bg-emerald-500', items: [{ t: 'Setup CI/CD', p: 'Low', a: 'DW' }, { t: 'Create DB schema', p: 'Medium', a: 'AC' }] },
        ].map((col) => (
          <div key={col.title} className='w-52 shrink-0 rounded-lg bg-muted/30 border border-border'>
            <div className='px-3 py-2.5 flex items-center gap-2'>
              <span className={`w-2 h-2 rounded-full ${col.color}`} />
              <span className='text-xs font-semibold text-foreground'>{col.title}</span>
              <span className='text-[10px] text-muted-foreground ml-auto'>{col.items.length}</span>
            </div>
            <div className='px-2 pb-2 space-y-2'>
              {col.items.map((item) => (
                <div key={item.t} className='rounded-md border border-border bg-card p-3 cursor-grab hover:shadow-sm transition-shadow'>
                  <p className='text-xs font-medium text-foreground mb-2'>{item.t}</p>
                  <div className='flex items-center justify-between'>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${item.p === 'High' ? 'bg-red-500/10 text-red-600' : item.p === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}`}>{item.p}</span>
                    <div className='w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold text-muted-foreground'>{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
    code: `import { Card, Badge, Avatar } from "@adhar-ui/react"\n\nexport function KanbanBoard({ columns }) {\n  return (\n    <div className="flex gap-4 overflow-x-auto">\n      {columns.map((col) => (\n        <div key={col.id} className="w-64 bg-muted/30 rounded-lg">\n          <h3 className="p-3 font-semibold">{col.title}</h3>\n          {col.tasks.map((task) => (\n            <Card key={task.id} className="m-2 p-3">\n              <p>{task.title}</p>\n              <Badge>{task.priority}</Badge>\n              <Avatar fallback={task.assignee} size="xs" />\n            </Card>\n          ))}\n        </div>\n      ))}\n    </div>\n  )\n}`,
  },
  {
    id: 'footer-section',
    title: 'Footer Section',
    description: 'A multi-column footer with logo, navigation links, social icons, and copyright.',
    tags: ['footer', 'layout', 'marketing', 'links'],
    difficulty: 'beginner' as const,
    Demo: () => (
      <div className='w-full rounded-lg border border-border bg-card p-6'>
        <div className='grid grid-cols-4 gap-4 mb-6'>
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <div className='w-6 h-6 rounded-md bg-primary flex items-center justify-center'><span className='text-white text-[10px] font-bold'>A</span></div>
              <span className='text-sm font-semibold'>Adhar UI</span>
            </div>
            <p className='text-xs text-muted-foreground leading-relaxed'>Open-source design system for modern apps.</p>
          </div>
          {[
            { h: 'Product', links: ['Components', 'Templates', 'Pricing'] },
            { h: 'Resources', links: ['Docs', 'Blog', 'Support'] },
            { h: 'Company', links: ['About', 'Careers', 'Contact'] },
          ].map((col) => (
            <div key={col.h}>
              <h4 className='text-xs font-semibold text-foreground uppercase tracking-wider mb-2'>{col.h}</h4>
              <ul className='space-y-1.5'>{col.links.map((l) => <li key={l}><a className='text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors'>{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className='pt-4 border-t border-border flex items-center justify-between'>
          <span className='text-[10px] text-muted-foreground'>© 2026 Adhar UI. All rights reserved.</span>
          <div className='flex gap-2'>{['GitHub', 'Twitter', 'Discord'].map((s) => <span key={s} className='text-[10px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors'>{s}</span>)}</div>
        </div>
      </div>
    ),
    code: `export function Footer() {\n  return (\n    <footer className="border-t">\n      <div className="grid grid-cols-4 gap-8 py-8">\n        <div>\n          <Logo />\n          <p className="text-sm text-muted-foreground">Open-source design system.</p>\n        </div>\n        <FooterColumn title="Product" links={["Components", "Templates"]} />\n        <FooterColumn title="Resources" links={["Docs", "Blog"]} />\n        <FooterColumn title="Company" links={["About", "Careers"]} />\n      </div>\n      <div className="border-t py-4 text-sm text-muted-foreground">\n        © 2026 Adhar UI\n      </div>\n    </footer>\n  )\n}`,
  },
];

const difficultyColors = {
  beginner: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  intermediate: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  advanced: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
};

export function ExamplesPage({ navigate }: { navigate: (path: string) => void }) {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [diffFilter, setDiffFilter] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<'preview' | 'code'>('preview');
  const detailRef = React.useRef<HTMLDivElement>(null);

  const q = filter.toLowerCase();
  const filtered = examples.filter((ex) => {
    if (diffFilter && ex.difficulty !== diffFilter) return false;
    if (!q) return true;
    return ex.title.toLowerCase().includes(q) || ex.tags.some((t) => t.includes(q));
  });

  const selected = selectedExample ? examples.find((e) => e.id === selectedExample) : null;

  const handleSelect = (id: string) => {
    setSelectedExample(id);
    setDetailTab('preview');
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  // Full-page detail view when a block is selected
  if (selected) {
    const currentIdx = examples.findIndex((e) => e.id === selected.id);
    const prev = currentIdx > 0 ? examples[currentIdx - 1] : null;
    const next = currentIdx < examples.length - 1 ? examples[currentIdx + 1] : null;

    return (
      <div className='space-y-6' ref={detailRef}>
        {/* Breadcrumb */}
        <nav className='flex items-center gap-1.5 text-xs text-muted-foreground'>
          <button onClick={() => setSelectedExample(null)} className='hover:text-foreground transition-colors'>
            Blocks
          </button>
          <svg className='w-3 h-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' d='M9 5l7 7-7 7' />
          </svg>
          <span className='text-foreground font-medium'>{selected.title}</span>
        </nav>

        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
          <div>
            <div className='flex items-center gap-2.5 mb-1'>
              <h1 className='text-xl font-bold text-foreground'>{selected.title}</h1>
              <span className={`text-[10px] px-2 py-0.5 rounded-full capitalize border font-medium ${difficultyColors[selected.difficulty]}`}>
                {selected.difficulty}
              </span>
            </div>
            <p className='text-sm text-muted-foreground leading-relaxed'>{selected.description}</p>
            <div className='flex flex-wrap gap-1.5 mt-2'>
              {selected.tags.map((t) => (
                <span key={t} className='text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium'>{t}</span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setSelectedExample(null)}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0'
          >
            <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' d='M15 19l-7-7 7-7' />
            </svg>
            Back
          </button>
        </div>

        {/* Preview / Code tabs */}
        <div className='rounded-lg border border-border overflow-hidden'>
          <div className='flex items-center border-b border-border/60 bg-muted/10 overflow-x-auto scrollbar-none'>
            <button
              onClick={() => setDetailTab('preview')}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                detailTab === 'preview' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Preview
              {detailTab === 'preview' && <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full' />}
            </button>
            <button
              onClick={() => setDetailTab('code')}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                detailTab === 'code' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Code
              {detailTab === 'code' && <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full' />}
            </button>
          </div>

          {detailTab === 'preview' ? (
            <div className='p-6 sm:p-10 flex items-start justify-center min-h-[320px] overflow-auto bg-[radial-gradient(hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:16px_16px]'>
              <div className='w-full flex items-center justify-center py-4'>
                <selected.Demo />
              </div>
            </div>
          ) : (
            <div className='p-4 sm:p-5'>
              <CodeBlock code={selected.code} language='tsx' showLineNumbers />
            </div>
          )}
        </div>

        {/* Prev / Next */}
        <div className='flex items-center justify-between pt-4 border-t border-border/60'>
          {prev ? (
            <button
              onClick={() => handleSelect(prev.id)}
              className='group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              <svg className='w-4 h-4 group-hover:-translate-x-0.5 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' d='M15 19l-7-7 7-7' />
              </svg>
              <div className='text-left'>
                <div className='text-[10px] text-muted-foreground/60 uppercase tracking-wider'>Previous</div>
                <div className='font-medium'>{prev.title}</div>
              </div>
            </button>
          ) : <div />}
          {next ? (
            <button
              onClick={() => handleSelect(next.id)}
              className='group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              <div className='text-right'>
                <div className='text-[10px] text-muted-foreground/60 uppercase tracking-wider'>Next</div>
                <div className='font-medium'>{next.title}</div>
              </div>
              <svg className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' d='M9 5l7 7-7 7' />
              </svg>
            </button>
          ) : <div />}
        </div>
      </div>
    );
  }

  // Grid view (no block selected)
  return (
    <div className='space-y-6'>
      <PageHeader
        title='Blocks'
        description='Pre-composed page blocks combining multiple components into real-world patterns. Copy, paste, and customize.'
        badge={<Badge variant='success'>{examples.length} blocks</Badge>}
      />

      {/* Filters */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <div className='relative flex-1'>
          <svg
            className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder='Search blocks...'
            className='w-full h-9 pl-10 pr-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
          />
        </div>
        <div className='flex items-center gap-1.5'>
          {(['beginner', 'intermediate', 'advanced'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(diffFilter === d ? null : d)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium capitalize transition-all border ${
                diffFilter === d
                  ? `${difficultyColors[d]}`
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
        {filtered.map((ex) => (
          <button
            key={ex.id}
            onClick={() => handleSelect(ex.id)}
            className='group rounded-xl border border-border bg-card overflow-hidden text-left hover:shadow-md hover:border-primary/20 transition-all'
          >
            <div className='border-b border-border/60 bg-muted/5 p-4 flex items-center justify-center min-h-[120px] max-h-[160px] overflow-hidden relative'>
              <div className='transform scale-[0.55] origin-center pointer-events-none w-full flex items-center justify-center'>
                <ex.Demo />
              </div>
              <div className='absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-muted/10 to-transparent pointer-events-none' />
            </div>
            <div className='p-3.5'>
              <div className='flex items-center gap-2 mb-1'>
                <h3 className='text-[13px] font-medium text-foreground group-hover:text-primary transition-colors flex-1 truncate'>
                  {ex.title}
                </h3>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full capitalize border font-medium shrink-0 ${difficultyColors[ex.difficulty]}`}>
                  {ex.difficulty}
                </span>
              </div>
              <p className='text-xs text-muted-foreground line-clamp-2 mb-2 leading-relaxed'>{ex.description}</p>
              <div className='flex flex-wrap gap-1'>
                {ex.tags.slice(0, 3).map((t) => (
                  <span key={t} className='text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground'>{t}</span>
                ))}
                {ex.tags.length > 3 && <span className='text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground'>+{ex.tags.length - 3}</span>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className='py-12 text-center text-muted-foreground'>
          <p className='text-sm'>No blocks match your filters.</p>
          <button
            onClick={() => { setFilter(''); setDiffFilter(null); }}
            className='text-primary text-sm mt-2 hover:underline'
          >
            Clear filters
          </button>
        </div>
      )}

      <Callout type='tip'>
        All blocks use Adhar UI components. Visit the{' '}
        <button onClick={() => navigate('/playground')} className='text-primary hover:underline font-medium'>Playground</button>
        {' '}to experiment with components interactively.
      </Callout>
    </div>
  );
}
