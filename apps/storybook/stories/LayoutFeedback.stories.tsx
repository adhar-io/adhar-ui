import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

export const CardDefault: StoryObj = {
  name: 'Card — Default',
  render: () => (
    <div className='max-w-sm rounded-lg border bg-card shadow-sm'>
      <div className='flex flex-col space-y-1.5 p-6'>
        <h3 className='text-2xl font-semibold tracking-tight'>Create project</h3>
        <p className='text-sm text-muted-foreground'>Deploy in one-click.</p>
      </div>
      <div className='p-6 pt-0 space-y-3'>
        <label className='text-sm font-medium'>Name</label>
        <input
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm'
          placeholder='Project'
        />
      </div>
      <div className='flex items-center p-6 pt-0 justify-between'>
        <button className='h-10 rounded-md border px-4 text-sm hover:bg-accent'>Cancel</button>
        <button className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground'>
          Deploy
        </button>
      </div>
    </div>
  ),
};
export const CardHorizontal: StoryObj = {
  name: 'Card — Horizontal',
  render: () => (
    <div className='max-w-md flex rounded-lg border overflow-hidden'>
      <div className='w-32 bg-muted flex items-center justify-center text-xs text-muted-foreground'>
        Image
      </div>
      <div className='p-4'>
        <h4 className='text-sm font-semibold'>Article Title</h4>
        <p className='text-sm text-muted-foreground mt-1'>Brief description of the article.</p>
      </div>
    </div>
  ),
};

export const ScrollAreaVertical: StoryObj = {
  name: 'Scroll Area — Vertical',
  render: () => (
    <div className='h-48 w-64 overflow-hidden rounded-md border'>
      <div className='h-full overflow-auto p-4'>
        <h4 className='mb-4 text-sm font-medium'>Tags</h4>
        {Array.from(
          { length: 20 },
          (_, i) => <div key={i} className='border-b py-2 text-sm'>Tag {i + 1}</div>,
        )}
      </div>
    </div>
  ),
};
export const ScrollAreaHorizontal: StoryObj = {
  name: 'Scroll Area — Horizontal',
  render: () => (
    <div className='w-72 overflow-hidden rounded-md border'>
      <div className='overflow-x-auto p-4'>
        <div className='flex gap-3' style={{ width: 600 }}>
          {Array.from(
            { length: 10 },
            (_, i) => (
              <div
                key={i}
                className='h-20 w-20 shrink-0 rounded-md bg-muted flex items-center justify-center text-sm'
              >
                {i + 1}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  ),
};

export const CollapsibleStory: StoryObj = {
  name: 'Collapsible',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div className='max-w-sm space-y-2'>
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-semibold'>3 repos</h4>
          <button onClick={() => so(!o)} className='rounded p-1 hover:bg-accent text-sm'>
            {o ? '▲' : '▼'}
          </button>
        </div>
        <div className='rounded-md border px-4 py-3 text-sm font-mono'>@adhar-ui/primitives</div>
        {o && (
          <>
            <div className='rounded-md border px-4 py-3 text-sm font-mono'>@adhar-ui/tokens</div>
            <div className='rounded-md border px-4 py-3 text-sm font-mono'>@adhar-ui/utils</div>
          </>
        )}
      </div>
    );
  },
};

export const ResizableHorizontal: StoryObj = {
  name: 'Resizable — Horizontal',
  render: () => (
    <div className='flex h-48 max-w-lg rounded-lg border'>
      <div className='flex-1 p-4'>
        <h4 className='text-sm font-semibold'>Left</h4>
      </div>
      <div className='flex w-px items-center justify-center bg-border'>
        <div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border text-[8px]'>
          ⋮
        </div>
      </div>
      <div className='flex-1 p-4'>
        <h4 className='text-sm font-semibold'>Right</h4>
      </div>
    </div>
  ),
};

export const AlertDefault: StoryObj = {
  name: 'Alert — Default',
  render: () => (
    <div className='max-w-lg rounded-lg border p-4'>
      <h5 className='mb-1 font-medium text-sm'>Heads up!</h5>
      <p className='text-sm text-muted-foreground'>You can add components using the CLI.</p>
    </div>
  ),
};
export const AlertDestructive: StoryObj = {
  name: 'Alert — Destructive',
  render: () => (
    <div className='max-w-lg rounded-lg border border-destructive/50 text-destructive p-4'>
      <h5 className='mb-1 font-medium text-sm'>Error</h5>
      <p className='text-sm'>Something went wrong.</p>
    </div>
  ),
};
export const AlertSuccess: StoryObj = {
  name: 'Alert — Success',
  render: () => (
    <div className='max-w-lg rounded-lg border border-green-500/50 text-green-700 p-4'>
      <h5 className='mb-1 font-medium text-sm'>Success</h5>
      <p className='text-sm'>Changes saved.</p>
    </div>
  ),
};
export const AlertWarning: StoryObj = {
  name: 'Alert — Warning',
  render: () => (
    <div className='max-w-lg rounded-lg border border-yellow-500/50 text-yellow-700 p-4'>
      <h5 className='mb-1 font-medium text-sm'>Warning</h5>
      <p className='text-sm'>Session expires in 5 min.</p>
    </div>
  ),
};

export const AlertDialogStory: StoryObj = {
  name: 'Alert Dialog',
  render: () => {
    const [o, so] = useState(false);
    return (
      <div>
        <button
          onClick={() => so(true)}
          className='h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground'
        >
          Delete
        </button>
        {o && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <div className='fixed inset-0 bg-black/80' onClick={() => so(false)} />
            <div className='relative z-50 max-w-md rounded-lg border bg-background p-6 shadow-lg'>
              <h2 className='text-lg font-semibold'>Are you sure?</h2>
              <p className='mt-2 text-sm text-muted-foreground'>This cannot be undone.</p>
              <div className='mt-6 flex justify-end gap-2'>
                <button
                  onClick={() => so(false)}
                  className='h-10 rounded-md border px-4 text-sm hover:bg-accent'
                >
                  Cancel
                </button>
                <button
                  onClick={() => so(false)}
                  className='h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const ToastStory: StoryObj = {
  name: 'Toast',
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div>
        <button
          onClick={() => {
            setShow(true);
            setTimeout(() => setShow(false), 3000);
          }}
          className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground'
        >
          Show Toast
        </button>
        {show && (
          <div className='fixed bottom-4 right-4 z-50 rounded-lg border bg-background p-4 shadow-lg w-72'>
            <p className='text-sm font-semibold'>Saved</p>
            <p className='text-sm text-muted-foreground'>Your changes have been saved.</p>
          </div>
        )}
      </div>
    );
  },
};

const meta: Meta = { title: 'Components/Layout & Feedback' };
export default meta;
