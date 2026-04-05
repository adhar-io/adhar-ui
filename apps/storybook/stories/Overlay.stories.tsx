import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

export const DialogStory: StoryObj = {
  name: 'Dialog',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div>
        <button
          onClick={() => so(true)}
          className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground'
        >
          Open Dialog
        </button>
        {o && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='fixed inset-0 bg-black/80' onClick={() => so(false)} />
            <div className='relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg'>
              <h2 className='text-lg font-semibold'>Edit Profile</h2>
              <p className='mt-1 text-sm text-muted-foreground'>Make changes here.</p>
              <div className='mt-4 space-y-3'>
                <label className='text-sm font-medium'>Name</label>
                <input
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm'
                  defaultValue='John Doe'
                />
              </div>
              <div className='mt-6 flex justify-end gap-2'>
                <button
                  className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
                  onClick={() => so(false)}
                >
                  Cancel
                </button>
                <button
                  className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground'
                  onClick={() => so(false)}
                >
                  Save
                </button>
              </div>
              <button
                className='absolute right-4 top-4 opacity-70 hover:opacity-100'
                onClick={() => so(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const SheetRight: StoryObj = {
  name: 'Sheet — Right',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div>
        <button
          onClick={() => so(true)}
          className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
        >
          Open Sheet
        </button>
        {o && (
          <div className='fixed inset-0 z-50'>
            <div className='fixed inset-0 bg-black/80' onClick={() => so(false)} />
            <div className='fixed inset-y-0 right-0 z-50 h-full w-3/4 border-l bg-background p-6 shadow-lg sm:max-w-sm'>
              <h2 className='text-lg font-semibold'>Sheet</h2>
              <p className='mt-2 text-sm text-muted-foreground'>Slides in from the right.</p>
              <button
                className='mt-4 h-9 rounded-md border px-3 text-sm hover:bg-accent'
                onClick={() => so(false)}
              >
                Close
              </button>
              <button
                className='absolute right-4 top-4 opacity-70 hover:opacity-100'
                onClick={() => so(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};
export const SheetLeft: StoryObj = {
  name: 'Sheet — Left',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div>
        <button
          onClick={() => so(true)}
          className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
        >
          Left Sheet
        </button>
        {o && (
          <div className='fixed inset-0 z-50'>
            <div className='fixed inset-0 bg-black/80' onClick={() => so(false)} />
            <div className='fixed inset-y-0 left-0 z-50 h-full w-3/4 border-r bg-background p-6 shadow-lg sm:max-w-sm'>
              <h2 className='text-lg font-semibold'>Left Sheet</h2>
              <button className='mt-4 h-9 rounded-md border px-3 text-sm' onClick={() => so(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};
export const SheetBottom: StoryObj = {
  name: 'Sheet — Bottom',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div>
        <button
          onClick={() => so(true)}
          className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
        >
          Bottom Sheet
        </button>
        {o && (
          <div className='fixed inset-0 z-50'>
            <div className='fixed inset-0 bg-black/80' onClick={() => so(false)} />
            <div className='fixed inset-x-0 bottom-0 z-50 border-t bg-background p-6'>
              <h2 className='text-lg font-semibold'>Bottom Sheet</h2>
              <button className='mt-4 h-9 rounded-md border px-3 text-sm' onClick={() => so(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const TooltipPositions: StoryObj = {
  name: 'Tooltip — Positions',
  render: () => (
    <div className='flex gap-6 py-12 justify-center'>
      {[
        ['top', 'bottom-full left-1/2 -translate-x-1/2 mb-2'],
        ['right', 'left-full top-1/2 -translate-y-1/2 ml-2'],
        ['bottom', 'top-full left-1/2 -translate-x-1/2 mt-2'],
        ['left', 'right-full top-1/2 -translate-y-1/2 mr-2'],
      ].map(([s, p]) => (
        <div key={s} className='group relative inline-flex'>
          <button className='h-9 rounded-md border px-3 text-sm hover:bg-accent'>{s}</button>
          <div
            className={`absolute z-50 hidden rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md group-hover:block whitespace-nowrap ${p}`}
          >
            Tooltip {s}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const PopoverStory: StoryObj = {
  name: 'Popover',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div className='relative inline-block'>
        <button
          onClick={() => so(!o)}
          className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
        >
          Popover
        </button>
        {o && (
          <div className='absolute left-0 z-50 mt-2 w-72 rounded-md border bg-popover p-4 shadow-md'>
            <h4 className='text-sm font-medium mb-2'>Settings</h4>
            <div className='grid grid-cols-3 items-center gap-2'>
              <label className='text-sm'>Width</label>
              <input className='col-span-2 h-8 rounded border px-2 text-sm' defaultValue='100%' />
            </div>
            <button
              onClick={() => so(false)}
              className='mt-3 h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground'
            >
              Apply
            </button>
          </div>
        )}
      </div>
    );
  },
};

export const HoverCardStory: StoryObj = {
  name: 'Hover Card',
  render: () => (
    <div className='py-8'>
      <div className='group relative inline-block'>
        <a href='#' className='text-sm font-medium text-primary underline underline-offset-4'>
          @adhar-ui
        </a>
        <div className='absolute z-50 mt-2 w-64 rounded-md border bg-popover p-4 shadow-md hidden group-hover:block'>
          <div className='flex gap-3'>
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm'>
              A
            </span>
            <div>
              <h4 className='text-sm font-semibold'>Adhar UI</h4>
              <p className='text-xs text-muted-foreground mt-1'>
                Framework-agnostic design system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const DrawerStory: StoryObj = {
  name: 'Drawer',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div>
        <button
          onClick={() => so(true)}
          className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
        >
          Drawer
        </button>
        {o && (
          <div className='fixed inset-0 z-50'>
            <div className='fixed inset-0 bg-black/80' onClick={() => so(false)} />
            <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-xl border bg-background'>
              <div className='mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted' />
              <div className='p-6'>
                <h2 className='text-lg font-semibold'>Drawer</h2>
                <p className='mt-2 text-sm text-muted-foreground'>Mobile-friendly bottom drawer.</p>
                <button
                  onClick={() => so(false)}
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
  },
};

const meta: Meta = { title: 'Components/Overlay' };
export default meta;
