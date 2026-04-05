import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

export const TabsDefault: StoryObj = {
  name: 'Tabs — Default',
  render: () => {
    const [t, st] = useState('account');
    return (
      <div>
        <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1'>
          {['account', 'password', 'settings'].map((v) => (
            <button
              key={v}
              onClick={() => st(v)}
              className={cn(
                'rounded-sm px-3 py-1.5 text-sm font-medium',
                t === v && 'bg-background text-foreground shadow-sm',
              )}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <div className='mt-4 rounded-md border p-4 text-sm'>Content for {t}.</div>
      </div>
    );
  },
};
export const TabsDisabled: StoryObj = {
  name: 'Tabs — Disabled',
  render: () => (
    <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1'>
      <button className='rounded-sm px-3 py-1.5 text-sm font-medium bg-background shadow-sm'>
        Active
      </button>
      <button
        disabled
        className='rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground opacity-50 cursor-not-allowed'
      >
        Disabled
      </button>
      <button className='rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground'>
        Other
      </button>
    </div>
  ),
};

export const AccordionStory: StoryObj = {
  name: 'Accordion',
  render: () => {
    const [o, so] = useState<string | null>('1');
    const items = [{ id: '1', q: 'Is it accessible?', a: 'Yes. WAI-ARIA compliant.' }, {
      id: '2',
      q: 'Is it styled?',
      a: 'Yes. Matches the design system.',
    }, { id: '3', q: 'Is it animated?', a: 'Yes. CSS transitions.' }];
    return (
      <div className='max-w-lg'>
        {items.map((i) => (
          <div key={i.id} className='border-b'>
            <button
              className='flex w-full items-center justify-between py-4 text-sm font-medium hover:underline'
              onClick={() => so(o === i.id ? null : i.id)}
            >
              {i.q}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className={cn('h-4 w-4 transition-transform', o === i.id && 'rotate-180')}
              >
                <path d='m6 9 6 6 6-6' />
              </svg>
            </button>
            {o === i.id && <p className='pb-4 text-sm text-muted-foreground'>{i.a}</p>}
          </div>
        ))}
      </div>
    );
  },
};

export const DropdownMenuStory: StoryObj = {
  name: 'Dropdown Menu',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div className='relative inline-block'>
        <button
          onClick={() => so(!o)}
          className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
        >
          Menu ▾
        </button>
        {o && (
          <>
            <div className='fixed inset-0' onClick={() => so(false)} />
            <div className='absolute right-0 z-50 mt-2 min-w-[180px] rounded-md border bg-popover p-1 shadow-md'>
              <div className='px-2 py-1.5 text-sm font-semibold'>Account</div>
              <div className='-mx-1 my-1 h-px bg-muted' />
              {['Profile', 'Settings', 'Billing'].map((i) => (
                <div
                  key={i}
                  className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
                  onClick={() => so(false)}
                >
                  {i}
                </div>
              ))}
              <div className='-mx-1 my-1 h-px bg-muted' />
              <div
                className='rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-accent cursor-default'
                onClick={() => so(false)}
              >
                Log out
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
};

export const ContextMenuStory: StoryObj = {
  name: 'Context Menu',
  render: () => {
    const [m, sm] = useState<{ x: number; y: number } | null>(null);
    return (
      <div>
        <div
          className='flex h-40 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground'
          onContextMenu={(e) => {
            e.preventDefault();
            sm({ x: e.clientX, y: e.clientY });
          }}
        >
          Right-click here
        </div>
        {m && (
          <>
            <div className='fixed inset-0 z-40' onClick={() => sm(null)} />
            <div
              className='fixed z-50 min-w-[160px] rounded-md border bg-popover p-1 shadow-md'
              style={{ left: m.x, top: m.y }}
            >
              {['Cut ⌘X', 'Copy ⌘C', 'Paste ⌘V'].map((i) => (
                <div
                  key={i}
                  className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
                  onClick={() => sm(null)}
                >
                  {i}
                </div>
              ))}
              <div className='-mx-1 my-1 h-px bg-muted' />
              <div
                className='rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-accent cursor-default'
                onClick={() => sm(null)}
              >
                Delete
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
};

export const MenubarStory: StoryObj = {
  name: 'Menubar',
  render: () => (
    <div className='flex h-10 items-center space-x-1 rounded-md border bg-background p-1'>
      {['File', 'Edit', 'View', 'Help'].map((m) => (
        <button key={m} className='rounded-sm px-3 py-1.5 text-sm font-medium hover:bg-accent'>
          {m}
        </button>
      ))}
    </div>
  ),
};

export const NavigationMenuStory: StoryObj = {
  name: 'Navigation Menu',
  render: () => (
    <nav className='flex items-center space-x-1'>
      {['Home', 'Products', 'Pricing', 'About'].map((l) => (
        <a
          key={l}
          href='#'
          className='inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent'
        >
          {l}
        </a>
      ))}
    </nav>
  ),
};

export const BreadcrumbDefault: StoryObj = {
  name: 'Breadcrumb — Default',
  render: () => (
    <nav>
      <ol className='flex items-center gap-1.5 text-sm text-muted-foreground'>
        <li>
          <a href='#' className='hover:text-foreground'>Home</a>
        </li>
        <li>/</li>
        <li>
          <a href='#' className='hover:text-foreground'>Components</a>
        </li>
        <li>/</li>
        <li className='text-foreground'>Breadcrumb</li>
      </ol>
    </nav>
  ),
};
export const BreadcrumbEllipsis: StoryObj = {
  name: 'Breadcrumb — Ellipsis',
  render: () => (
    <nav>
      <ol className='flex items-center gap-1.5 text-sm text-muted-foreground'>
        <li>
          <a href='#' className='hover:text-foreground'>Home</a>
        </li>
        <li>/</li>
        <li>⋯</li>
        <li>/</li>
        <li>
          <a href='#' className='hover:text-foreground'>Settings</a>
        </li>
        <li>/</li>
        <li className='text-foreground'>Profile</li>
      </ol>
    </nav>
  ),
};

export const PaginationStory: StoryObj = {
  name: 'Pagination',
  render: () => {
    const [p, sp] = useState(3);
    return (
      <nav className='flex justify-center'>
        <ul className='flex items-center gap-1'>
          <li>
            <button
              onClick={() => sp(Math.max(1, p - 1))}
              disabled={p === 1}
              className='h-10 px-3 rounded-md text-sm hover:bg-accent disabled:opacity-50'
            >
              ← Prev
            </button>
          </li>
          {[1, 2, 3, 4, 5].map((n) => (
            <li key={n}>
              <button
                onClick={() => sp(n)}
                className={cn(
                  'h-10 w-10 rounded-md text-sm hover:bg-accent',
                  p === n && 'border bg-background font-medium',
                )}
              >
                {n}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => sp(Math.min(5, p + 1))}
              disabled={p === 5}
              className='h-10 px-3 rounded-md text-sm hover:bg-accent disabled:opacity-50'
            >
              Next →
            </button>
          </li>
        </ul>
      </nav>
    );
  },
};

export const SidebarStory: StoryObj = {
  name: 'Sidebar',
  render: () => {
    const [o, so] = useState(true);
    const [a, sa] = useState('Dashboard');
    return (
      <div className='flex h-56 rounded-md border overflow-hidden'>
        <aside
          className={cn('flex flex-col border-r bg-muted/30 transition-all', o ? 'w-48' : 'w-12')}
        >
          <div className='flex h-10 items-center justify-between border-b px-2'>
            <button onClick={() => so(!o)} className='rounded p-1 hover:bg-accent text-sm'>
              ☰
            </button>
          </div>
          {o && (
            <div className='flex-1 p-2 space-y-0.5'>
              {['Dashboard', 'Components', 'Settings'].map((i) => (
                <button
                  key={i}
                  onClick={() => sa(i)}
                  className={cn(
                    'flex w-full rounded-md px-3 py-1.5 text-sm hover:bg-accent',
                    a === i && 'bg-accent font-medium',
                  )}
                >
                  {i}
                </button>
              ))}
            </div>
          )}
        </aside>
        <div className='flex-1 p-4 text-sm text-muted-foreground'>{a} content</div>
      </div>
    );
  },
};

const meta: Meta = { title: 'Components/Navigation' };
export default meta;
