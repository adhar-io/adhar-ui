/**
 * Overlay demos — Dialog, Sheet (4 sides), Tooltip (4 positions), Popover, HoverCard, Drawer
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'
      >
        Open Dialog
      </button>
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='fixed inset-0 bg-black/80' onClick={() => setOpen(false)} />
          <div className='relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg'>
            <h2 className='text-lg font-semibold'>Edit Profile</h2>
            <p className='mt-1 text-sm text-muted-foreground'>
              Make changes to your profile here. Click save when done.
            </p>
            <div className='mt-4 space-y-3'>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Name</label>
                <input
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  defaultValue='John Doe'
                />
              </div>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Email</label>
                <input
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  defaultValue='john@example.com'
                />
              </div>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Bio</label>
                <textarea
                  className='flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  defaultValue='Software developer'
                  rows={2}
                />
              </div>
            </div>
            <div className='mt-6 flex justify-end gap-2'>
              <button
                className='h-10 rounded-md border border-input px-4 text-sm hover:bg-accent'
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'
                onClick={() => setOpen(false)}
              >
                Save changes
              </button>
            </div>
            <button
              className='absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100'
              onClick={() => setOpen(false)}
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
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SheetDemo() {
  const [side, setSide] = useState<string | null>(null);
  const sideStyles: Record<string, string> = {
    right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
    top: 'inset-x-0 top-0 border-b h-auto max-h-[50vh]',
    bottom: 'inset-x-0 bottom-0 border-t h-auto max-h-[50vh]',
  };
  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2'>
        {['left', 'right', 'top', 'bottom'].map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className='h-9 rounded-md border px-3 text-sm hover:bg-accent'
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      {side && (
        <div className='fixed inset-0 z-50'>
          <div className='fixed inset-0 bg-black/80' onClick={() => setSide(null)} />
          <div className={cn('fixed z-50 bg-background p-6 shadow-lg', sideStyles[side])}>
            <h2 className='text-lg font-semibold'>Sheet ({side})</h2>
            <p className='mt-2 text-sm text-muted-foreground'>
              This sheet slides in from the {side}. Use it for navigation, filters, or forms.
            </p>
            <div className='mt-4 space-y-2'>
              <div className='space-y-1'>
                <label className='text-sm font-medium'>Field</label>
                <input
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                  placeholder='Enter value...'
                />
              </div>
            </div>
            <div className='mt-4'>
              <button
                className='h-9 rounded-md border px-3 text-sm hover:bg-accent'
                onClick={() => setSide(null)}
              >
                Close
              </button>
            </div>
            <button
              className='absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100'
              onClick={() => setSide(null)}
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
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function TooltipDemo() {
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Positions</p>
        <div className='flex gap-6 py-12 justify-center'>
          {[
            { side: 'top', pos: 'bottom-full left-1/2 -translate-x-1/2 mb-2' },
            { side: 'right', pos: 'left-full top-1/2 -translate-y-1/2 ml-2' },
            { side: 'bottom', pos: 'top-full left-1/2 -translate-x-1/2 mt-2' },
            { side: 'left', pos: 'right-full top-1/2 -translate-y-1/2 mr-2' },
          ].map(({ side, pos }) => (
            <div key={side} className='group relative inline-flex'>
              <button className='h-9 rounded-md border px-3 text-sm hover:bg-accent'>{side}</button>
              <div
                className={cn(
                  'absolute z-50 hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md group-hover:block whitespace-nowrap',
                  pos,
                )}
              >
                Tooltip on {side}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Rich content</p>
        <div className='group relative inline-flex'>
          <button className='h-9 rounded-md border px-3 text-sm hover:bg-accent'>
            Hover for details
          </button>
          <div className='absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 hidden rounded-md border bg-popover px-4 py-3 shadow-md group-hover:block w-64'>
            <h4 className='text-sm font-semibold'>Tooltip with rich content</h4>
            <p className='text-xs text-muted-foreground mt-1'>
              Tooltips can contain any content — text, links, or small interactive elements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className='space-y-4'>
      <div className='relative inline-block'>
        <button
          onClick={() => setOpen(!open)}
          className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
        >
          Open popover
        </button>
        {open && (
          <div className='absolute left-0 z-50 mt-2 w-80 rounded-md border bg-popover p-4 shadow-md'>
            <h4 className='font-medium text-sm mb-3'>Dimensions</h4>
            <div className='grid gap-3'>
              {[['Width', '100%'], ['Max Width', '640px'], ['Height', '25px'], [
                'Max Height',
                'none',
              ]].map(([label, value]) => (
                <div key={label} className='grid grid-cols-3 items-center gap-4'>
                  <label className='text-sm'>{label}</label>
                  <input
                    className='col-span-2 h-8 rounded-md border border-input bg-background px-2 text-sm'
                    defaultValue={value}
                  />
                </div>
              ))}
            </div>
            <div className='mt-3 flex justify-end'>
              <button
                onClick={() => setOpen(false)}
                className='h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90'
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function HoverCardDemo() {
  return (
    <div className='py-8 space-y-4'>
      <p className='text-xs font-medium text-muted-foreground'>Hover over the links below</p>
      <div className='flex gap-6'>
        <div className='group relative inline-block'>
          <a href='#' className='text-sm font-medium text-primary underline underline-offset-4'>
            @adhar-ui
          </a>
          <div className='absolute z-50 mt-2 w-72 rounded-md border bg-popover p-4 shadow-md hidden group-hover:block'>
            <div className='flex gap-3'>
              <span className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium'>
                A
              </span>
              <div>
                <h4 className='text-sm font-semibold'>Adhar UI</h4>
                <p className='text-xs text-muted-foreground mt-1'>
                  Framework-agnostic design system with components, blocks, and design tool sync.
                </p>
                <div className='flex gap-3 mt-2 text-xs text-muted-foreground'>
                  <span>127 entries</span>
                  <span>5 frameworks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='group relative inline-block'>
          <a href='#' className='text-sm font-medium text-primary underline underline-offset-4'>
            @john-doe
          </a>
          <div className='absolute z-50 mt-2 w-64 rounded-md border bg-popover p-4 shadow-md hidden group-hover:block'>
            <div className='flex gap-3'>
              <span className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium'>
                JD
              </span>
              <div>
                <h4 className='text-sm font-semibold'>John Doe</h4>
                <p className='text-xs text-muted-foreground mt-1'>
                  Full-stack developer. Building open source tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
      >
        Open Drawer (bottom)
      </button>
      {open && (
        <div className='fixed inset-0 z-50'>
          <div className='fixed inset-0 bg-black/80' onClick={() => setOpen(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl border bg-background'>
            <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />
            <div className='p-6'>
              <h2 className='text-lg font-semibold'>Mobile Drawer</h2>
              <p className='mt-2 text-sm text-muted-foreground'>
                This drawer slides up from the bottom. Ideal for mobile interfaces -- filters,
                actions, or forms.
              </p>
              <div className='mt-4 space-y-2'>
                {['Option 1', 'Option 2', 'Option 3'].map((opt) => (
                  <button
                    key={opt}
                    className='flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-accent'
                    onClick={() => setOpen(false)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setOpen(false)}
                className='mt-4 h-10 w-full rounded-md border text-sm hover:bg-accent'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
