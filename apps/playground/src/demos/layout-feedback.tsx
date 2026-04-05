/**
 * Layout + Feedback demos — Card, ScrollArea, Collapsible, Resizable, Alert, AlertDialog, Toast
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function CardDemo() {
  return (
    <div className='space-y-6'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Default card with form</p>
        <div className='max-w-sm rounded-lg border bg-card text-card-foreground shadow-sm'>
          <div className='flex flex-col space-y-1.5 p-6'>
            <h3 className='text-2xl font-semibold leading-none tracking-tight'>Create project</h3>
            <p className='text-sm text-muted-foreground'>Deploy your new project in one-click.</p>
          </div>
          <div className='p-6 pt-0 space-y-3'>
            <div className='space-y-1'>
              <label className='text-sm font-medium'>Name</label>
              <input
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                placeholder='My Project'
              />
            </div>
            <div className='space-y-1'>
              <label className='text-sm font-medium'>Framework</label>
              <select className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'>
                <option>React</option>
                <option>Vue</option>
                <option>Svelte</option>
              </select>
            </div>
          </div>
          <div className='flex items-center p-6 pt-0 justify-between'>
            <button className='h-10 rounded-md border border-input px-4 text-sm hover:bg-accent'>
              Cancel
            </button>
            <button className='h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90'>
              Deploy
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Notification card</p>
        <div className='max-w-sm rounded-lg border p-4'>
          <div className='flex items-start gap-3'>
            <span className='mt-0.5 flex h-2 w-2 rounded-full bg-blue-500' />
            <div>
              <h4 className='text-sm font-semibold'>New message</h4>
              <p className='text-sm text-muted-foreground mt-1'>
                You have a new message from Alice.
              </p>
              <p className='text-xs text-muted-foreground mt-2'>5 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Horizontal card</p>
        <div className='max-w-md flex rounded-lg border overflow-hidden'>
          <div className='w-32 bg-muted flex items-center justify-center text-xs text-muted-foreground'>
            Image
          </div>
          <div className='p-4 flex-1'>
            <h4 className='text-sm font-semibold'>Article Title</h4>
            <p className='text-sm text-muted-foreground mt-1'>
              Brief description of the article content goes here.
            </p>
            <p className='text-xs text-muted-foreground mt-2'>5 min read</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScrollAreaDemo() {
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Vertical scroll</p>
        <div className='h-48 w-64 overflow-hidden rounded-md border'>
          <div className='h-full overflow-auto p-4'>
            <h4 className='mb-4 text-sm font-medium'>Tags</h4>
            {Array.from(
              { length: 25 },
              (_, i) => <div key={i} className='border-b py-2 text-sm'>Tag {i + 1}</div>,
            )}
          </div>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Horizontal scroll</p>
        <div className='w-72 overflow-hidden rounded-md border'>
          <div className='overflow-x-auto p-4'>
            <div className='flex gap-3' style={{ width: '600px' }}>
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
      </div>
    </div>
  );
}

export function CollapsibleDemo() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(true);
  return (
    <div className='space-y-4 max-w-sm'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h4 className='text-sm font-semibold'>@adhar-ui/react starred 3 repositories</h4>
          <button onClick={() => setOpen1(!open1)} className='rounded p-1 hover:bg-accent text-sm'>
            {open1 ? '▲' : '▼'}
          </button>
        </div>
        <div className='rounded-md border px-4 py-3 text-sm font-mono'>@adhar-ui/primitives</div>
        {open1 && (
          <>
            <div className='rounded-md border px-4 py-3 text-sm font-mono'>@adhar-ui/tokens</div>
            <div className='rounded-md border px-4 py-3 text-sm font-mono'>@adhar-ui/utils</div>
          </>
        )}
      </div>
      <div className='rounded-md border p-4 space-y-2'>
        <button
          onClick={() => setOpen2(!open2)}
          className='flex w-full items-center justify-between text-sm font-medium'
        >
          {open2 ? 'Hide details' : 'Show details'}
          <span>{open2 ? '▲' : '▼'}</span>
        </button>
        {open2 && (
          <div className='pt-2 text-sm text-muted-foreground'>
            Additional information that can be collapsed to save space. This pattern is useful for
            progressive disclosure.
          </div>
        )}
      </div>
    </div>
  );
}

export function ResizableDemo() {
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Horizontal</p>
        <div className='flex h-48 w-full max-w-lg rounded-lg border'>
          <div className='flex-1 overflow-auto p-4'>
            <h4 className='text-sm font-semibold'>Panel 1</h4>
            <p className='text-sm text-muted-foreground'>Left panel content</p>
          </div>
          <div className='relative flex w-px items-center justify-center bg-border'>
            <div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border'>
              <span className='text-[8px]'>⋮</span>
            </div>
          </div>
          <div className='flex-1 overflow-auto p-4'>
            <h4 className='text-sm font-semibold'>Panel 2</h4>
            <p className='text-sm text-muted-foreground'>Middle panel</p>
          </div>
          <div className='relative flex w-px items-center justify-center bg-border'>
            <div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border'>
              <span className='text-[8px]'>⋮</span>
            </div>
          </div>
          <div className='flex-1 overflow-auto p-4'>
            <h4 className='text-sm font-semibold'>Panel 3</h4>
            <p className='text-sm text-muted-foreground'>Right panel</p>
          </div>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Vertical</p>
        <div className='flex flex-col h-48 max-w-xs rounded-lg border'>
          <div className='flex-1 overflow-auto p-4 border-b'>
            <h4 className='text-sm font-semibold'>Top</h4>
          </div>
          <div className='flex-1 overflow-auto p-4'>
            <h4 className='text-sm font-semibold'>Bottom</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AlertDemo() {
  return (
    <div className='space-y-4 max-w-lg'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Default</p>
        <div className='relative w-full rounded-lg border p-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='absolute left-4 top-4'
          >
            <circle cx='12' cy='12' r='10' />
            <path d='M12 16v-4' />
            <path d='M12 8h.01' />
          </svg>
          <h5 className='mb-1 pl-7 font-medium leading-none tracking-tight'>Heads up!</h5>
          <div className='text-sm pl-7 [&_p]:leading-relaxed'>
            You can add components using the CLI.
          </div>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Destructive</p>
        <div className='relative w-full rounded-lg border border-destructive/50 text-destructive p-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='absolute left-4 top-4 text-destructive'
          >
            <circle cx='12' cy='12' r='10' />
            <line x1='12' x2='12' y1='8' y2='12' />
            <line x1='12' x2='12.01' y1='16' y2='16' />
          </svg>
          <h5 className='mb-1 pl-7 font-medium leading-none tracking-tight'>Error</h5>
          <div className='text-sm pl-7'>Something went wrong. Please try again.</div>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Success</p>
        <div className='relative w-full rounded-lg border border-green-500/50 text-green-700 dark:text-green-400 p-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='absolute left-4 top-4 text-green-500'
          >
            <path d='M20 6 9 17l-5-5' />
          </svg>
          <h5 className='mb-1 pl-7 font-medium leading-none tracking-tight'>Success</h5>
          <div className='text-sm pl-7'>Your changes have been saved successfully.</div>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Warning</p>
        <div className='relative w-full rounded-lg border border-yellow-500/50 text-yellow-700 dark:text-yellow-400 p-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='absolute left-4 top-4 text-yellow-500'
          >
            <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' />
            <line x1='12' x2='12' y1='9' y2='13' />
            <line x1='12' x2='12.01' y1='17' y2='17' />
          </svg>
          <h5 className='mb-1 pl-7 font-medium leading-none tracking-tight'>Warning</h5>
          <div className='text-sm pl-7'>Your session will expire in 5 minutes.</div>
        </div>
      </div>
    </div>
  );
}

export function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className='inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 text-sm font-medium text-destructive-foreground hover:bg-destructive/90'
      >
        Delete Account
      </button>
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='fixed inset-0 bg-black/80' onClick={() => setOpen(false)} />
          <div className='relative z-50 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg'>
            <h2 className='text-lg font-semibold'>Are you absolutely sure?</h2>
            <p className='mt-2 text-sm text-muted-foreground'>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </p>
            <div className='mt-6 flex justify-end gap-2'>
              <button
                onClick={() => setOpen(false)}
                className='h-10 rounded-md border border-input px-4 text-sm hover:bg-accent'
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className='h-10 rounded-md bg-destructive px-4 text-sm text-destructive-foreground hover:bg-destructive/90'
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ToastDemo() {
  const [toasts, setToasts] = useState<
    { id: number; title: string; desc: string; variant: string }[]
  >([]);
  const addToast = (title: string, desc: string, variant: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, title, desc, variant }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };
  return (
    <div className='space-y-3'>
      <div className='flex flex-wrap gap-2'>
        <button
          onClick={() => addToast('Event created', 'Your event has been saved.', 'default')}
          className='h-9 rounded-md border px-3 text-sm hover:bg-accent'
        >
          Default toast
        </button>
        <button
          onClick={() => addToast('Success!', 'Your profile has been updated.', 'success')}
          className='h-9 rounded-md border px-3 text-sm hover:bg-accent text-green-600'
        >
          Success toast
        </button>
        <button
          onClick={() => addToast('Error', 'Something went wrong.', 'error')}
          className='h-9 rounded-md border px-3 text-sm hover:bg-accent text-destructive'
        >
          Error toast
        </button>
      </div>
      <div className='fixed bottom-4 right-4 z-50 space-y-2'>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'rounded-lg border bg-background p-4 shadow-lg w-72 animate-in slide-in-from-right',
              t.variant === 'error' && 'border-destructive/50',
            )}
          >
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-sm font-semibold'>{t.title}</p>
                <p className='text-sm text-muted-foreground'>{t.desc}</p>
              </div>
              <button
                onClick={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))}
                className='text-muted-foreground hover:text-foreground ml-2'
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
