/**
 * Navigation demos — Tabs, Accordion, DropdownMenu, ContextMenu, Menubar,
 * NavigationMenu, Breadcrumb, Pagination, Sidebar
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function TabsDemo() {
  const [tab, setTab] = useState('account');
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Default tabs</p>
        <div className='inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground'>
          {['account', 'password', 'team', 'billing'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
                tab === t ? 'bg-background text-foreground shadow-sm' : '',
              )}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className='mt-4 rounded-md border p-4'>
          <h3 className='text-sm font-semibold'>{tab.charAt(0).toUpperCase() + tab.slice(1)}</h3>
          <p className='mt-1 text-sm text-muted-foreground'>
            Content for the {tab} tab. Change your {tab} settings here.
          </p>
          {tab === 'account' && (
            <div className='mt-3 space-y-2'>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Name</label>
                <input
                  className='flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm'
                  defaultValue='John Doe'
                />
              </div>
            </div>
          )}
          {tab === 'password' && (
            <div className='mt-3 space-y-2'>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Current password</label>
                <input
                  type='password'
                  className='flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm'
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Disabled tab</p>
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
      </div>
    </div>
  );
}

export function AccordionDemo() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['1']));
  const toggle = (id: string) => {
    const next = new Set(openItems);
    next.has(id) ? next.delete(id) : next.add(id);
    setOpenItems(next);
  };
  const items = [
    {
      id: '1',
      title: 'Is it accessible?',
      content:
        'Yes. It adheres to the WAI-ARIA design pattern. All interactive elements are keyboard-navigable and screen-reader friendly.',
    },
    {
      id: '2',
      title: 'Is it styled?',
      content:
        'Yes. It comes with default styles that match the Adhar UI design system. You can customize everything since you own the code.',
    },
    {
      id: '3',
      title: 'Is it animated?',
      content:
        'Yes. It uses CSS transitions for smooth open/close animations. The chevron rotates 180 degrees when expanded.',
    },
    {
      id: '4',
      title: 'Can I use it with any framework?',
      content:
        'Yes. Components are compiled from Mitosis to React, Vue, Solid, Svelte, and Angular.',
    },
  ];
  return (
    <div className='max-w-lg'>
      {items.map((item) => (
        <div key={item.id} className='border-b'>
          <button
            className='flex w-full items-center justify-between py-4 font-medium text-sm hover:underline'
            onClick={() => toggle(item.id)}
          >
            {item.title}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              className={cn(
                'h-4 w-4 shrink-0 transition-transform duration-200',
                openItems.has(item.id) && 'rotate-180',
              )}
            >
              <path d='m6 9 6 6 6-6' />
            </svg>
          </button>
          {openItems.has(item.id) && (
            <div className='pb-4 text-sm text-muted-foreground leading-relaxed'>{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function DropdownMenuDemo() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState({ status: true, activity: false });
  return (
    <div className='space-y-4'>
      <div className='relative inline-block'>
        <button
          onClick={() => setOpen(!open)}
          className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
        >
          Open Menu ▾
        </button>
        {open && (
          <div className='absolute right-0 z-50 mt-2 min-w-[200px] rounded-md border bg-popover p-1 shadow-md'>
            <div className='px-2 py-1.5 text-sm font-semibold'>My Account</div>
            <div className='-mx-1 my-1 h-px bg-muted' />
            {['Profile', 'Settings', 'Keyboard shortcuts'].map((item) => (
              <div
                key={item}
                className='flex items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
                onClick={() => setOpen(false)}
              >
                {item}
                {item === 'Keyboard shortcuts' && (
                  <kbd className='ml-auto inline-flex h-5 items-center rounded border bg-muted px-1 font-mono text-[10px] text-muted-foreground'>
                    ⌘K
                  </kbd>
                )}
              </div>
            ))}
            <div className='-mx-1 my-1 h-px bg-muted' />
            <div
              className='flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
              onClick={() => setChecked({ ...checked, status: !checked.status })}
            >
              <span className='mr-2 flex h-3.5 w-3.5 items-center justify-center'>
                {checked.status && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='12'
                    height='12'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path d='M20 6 9 17l-5-5' />
                  </svg>
                )}
              </span>
              Show status bar
            </div>
            <div
              className='flex items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
              onClick={() => setChecked({ ...checked, activity: !checked.activity })}
            >
              <span className='mr-2 flex h-3.5 w-3.5 items-center justify-center'>
                {checked.activity && (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='12'
                    height='12'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path d='M20 6 9 17l-5-5' />
                  </svg>
                )}
              </span>
              Show activity log
            </div>
            <div className='-mx-1 my-1 h-px bg-muted' />
            <div
              className='flex items-center rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-accent cursor-default'
              onClick={() => setOpen(false)}
            >
              Log out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ContextMenuDemo() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  return (
    <div>
      <div
        className='flex h-40 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground'
        onContextMenu={(e) => {
          e.preventDefault();
          setMenu({ x: e.clientX, y: e.clientY });
        }}
      >
        Right-click anywhere in this area
      </div>
      {menu && (
        <>
          <div className='fixed inset-0 z-40' onClick={() => setMenu(null)} />
          <div
            className='fixed z-50 min-w-[160px] rounded-md border bg-popover p-1 shadow-md'
            style={{ left: menu.x, top: menu.y }}
          >
            {['Cut', 'Copy', 'Paste'].map((item) => (
              <div
                key={item}
                className='flex items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
                onClick={() => setMenu(null)}
              >
                {item}
                <kbd className='ml-auto text-[10px] text-muted-foreground'>⌘{item[0]}</kbd>
              </div>
            ))}
            <div className='-mx-1 my-1 h-px bg-muted' />
            <div
              className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
              onClick={() => setMenu(null)}
            >
              Select All
            </div>
            <div className='-mx-1 my-1 h-px bg-muted' />
            <div
              className='rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-accent cursor-default'
              onClick={() => setMenu(null)}
            >
              Delete
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function MenubarDemo() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menus: Record<string, string[]> = {
    File: ['New File', 'Open', 'Save', 'Save As', 'Exit'],
    Edit: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'],
    View: ['Zoom In', 'Zoom Out', 'Full Screen'],
    Help: ['Documentation', 'About'],
  };
  return (
    <div className='relative'>
      <div className='flex h-10 items-center space-x-1 rounded-md border bg-background p-1'>
        {Object.keys(menus).map((m) => (
          <button
            key={m}
            onMouseEnter={() => openMenu && setOpenMenu(m)}
            onClick={() => setOpenMenu(openMenu === m ? null : m)}
            className={cn(
              'flex items-center rounded-sm px-3 py-1.5 text-sm font-medium hover:bg-accent',
              openMenu === m && 'bg-accent',
            )}
          >
            {m}
          </button>
        ))}
      </div>
      {openMenu && (
        <>
          <div className='fixed inset-0 z-40' onClick={() => setOpenMenu(null)} />
          <div
            className='absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-md border bg-popover p-1 shadow-md'
            style={{ left: Object.keys(menus).indexOf(openMenu) * 60 }}
          >
            {menus[openMenu].map((item) => (
              <div
                key={item}
                className='rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-default'
                onClick={() => setOpenMenu(null)}
              >
                {item}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function NavigationMenuDemo() {
  return (
    <div className='space-y-4'>
      <p className='text-xs font-medium text-muted-foreground'>Horizontal navigation</p>
      <nav className='flex items-center space-x-1'>
        {[
          { label: 'Getting Started', active: true },
          { label: 'Components', active: false },
          { label: 'Documentation', active: false },
          { label: 'Blog', active: false },
        ].map((item) => (
          <a
            key={item.label}
            href='#'
            className={cn(
              'inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent',
              item.active ? 'bg-accent/50' : '',
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <p className='text-xs font-medium text-muted-foreground'>With icons</p>
      <nav className='flex items-center space-x-1'>
        {[
          { label: 'Home', icon: '🏠' },
          { label: 'Products', icon: '📦' },
          { label: 'Pricing', icon: '💰' },
          { label: 'About', icon: 'ℹ️' },
        ].map((item) => (
          <a
            key={item.label}
            href='#'
            className='inline-flex h-10 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent'
          >
            <span>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export function BreadcrumbDemo() {
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Default</p>
        <nav aria-label='breadcrumb'>
          <ol className='flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground'>
            <li>
              <a href='#' className='hover:text-foreground transition-colors'>Home</a>
            </li>
            <li>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='m9 18 6-6-6-6' />
              </svg>
            </li>
            <li>
              <a href='#' className='hover:text-foreground transition-colors'>Components</a>
            </li>
            <li>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='m9 18 6-6-6-6' />
              </svg>
            </li>
            <li>
              <span className='font-normal text-foreground'>Breadcrumb</span>
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>With ellipsis</p>
        <nav aria-label='breadcrumb'>
          <ol className='flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground'>
            <li>
              <a href='#' className='hover:text-foreground'>Home</a>
            </li>
            <li>/</li>
            <li>
              <span className='flex h-9 w-9 items-center justify-center'>⋯</span>
            </li>
            <li>/</li>
            <li>
              <a href='#' className='hover:text-foreground'>Settings</a>
            </li>
            <li>/</li>
            <li>
              <span className='text-foreground'>Profile</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

export function PaginationDemo() {
  const [page, setPage] = useState(3);
  const total = 10;
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Default</p>
        <nav className='flex justify-center'>
          <ul className='flex items-center gap-1'>
            <li>
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className='inline-flex h-10 items-center justify-center rounded-md px-3 text-sm hover:bg-accent gap-1 disabled:opacity-50'
              >
                ← Prev
              </button>
            </li>
            {[1, 2, 3, 4, 5].map((p) => (
              <li key={p}>
                <button
                  onClick={() => setPage(p)}
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-md text-sm hover:bg-accent',
                    page === p && 'border bg-background font-medium',
                  )}
                >
                  {p}
                </button>
              </li>
            ))}
            <li>
              <span className='flex h-10 w-10 items-center justify-center text-sm'>⋯</span>
            </li>
            <li>
              <button
                onClick={() => setPage(total)}
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-md text-sm hover:bg-accent',
                  page === total && 'border bg-background font-medium',
                )}
              >
                {total}
              </button>
            </li>
            <li>
              <button
                onClick={() => setPage(Math.min(total, page + 1))}
                disabled={page === total}
                className='inline-flex h-10 items-center justify-center rounded-md px-3 text-sm hover:bg-accent gap-1 disabled:opacity-50'
              >
                Next →
              </button>
            </li>
          </ul>
        </nav>
        <p className='text-center text-xs text-muted-foreground mt-2'>Page {page} of {total}</p>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Compact</p>
        <div className='flex items-center gap-2 text-sm'>
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className='h-8 rounded-md border px-2 text-xs hover:bg-accent disabled:opacity-50'
          >
            Prev
          </button>
          <span className='text-muted-foreground'>{page} / {total}</span>
          <button
            disabled={page >= total}
            onClick={() => setPage(page + 1)}
            className='h-8 rounded-md border px-2 text-xs hover:bg-accent disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export function SidebarDemo() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState('Dashboard');
  const items = [
    { group: 'Main', items: ['Dashboard', 'Projects', 'Tasks'] },
    { group: 'Settings', items: ['Profile', 'Team', 'Billing'] },
  ];
  return (
    <div className='flex h-64 rounded-md border overflow-hidden max-w-lg'>
      <aside
        className={cn(
          'flex flex-col border-r bg-muted/30 transition-all duration-200',
          open ? 'w-52' : 'w-14',
        )}
      >
        <div className='flex h-12 items-center justify-between border-b px-3'>
          {open && <span className='text-sm font-bold truncate'>Adhar UI</span>}
          <button
            onClick={() => setOpen(!open)}
            className='rounded-md p-1.5 hover:bg-accent shrink-0'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <line x1='4' x2='20' y1='12' y2='12' />
              <line x1='4' x2='20' y1='6' y2='6' />
              <line x1='4' x2='20' y1='18' y2='18' />
            </svg>
          </button>
        </div>
        <nav className='flex-1 overflow-auto py-2'>
          {items.map((group) => (
            <div key={group.group} className='mb-2'>
              {open && (
                <p className='px-3 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider'>
                  {group.group}
                </p>
              )}
              {group.items.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md mx-1 px-3 py-2 text-sm transition-colors hover:bg-accent',
                    active === item && 'bg-accent font-medium',
                    !open && 'justify-center',
                  )}
                >
                  <span className='text-muted-foreground'>{item[0]}</span>
                  {open && <span className='truncate'>{item}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        {open && (
          <div className='border-t p-3'>
            <div className='flex items-center gap-2'>
              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs'>
                J
              </span>
              <div className='truncate'>
                <p className='text-xs font-medium truncate'>John Doe</p>
                <p className='text-[10px] text-muted-foreground truncate'>john@example.com</p>
              </div>
            </div>
          </div>
        )}
      </aside>
      <div className='flex-1 p-4'>
        <h2 className='text-sm font-semibold'>{active}</h2>
        <p className='mt-2 text-sm text-muted-foreground'>Content for {active} page.</p>
      </div>
    </div>
  );
}
