/**
 * Display component demos — Badge, Avatar, Separator, Skeleton, Progress, Spinner, AspectRatio
 * Each with all variants and states.
 */
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function BadgeDemo() {
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Variants</p>
        <div className='flex flex-wrap gap-2'>
          {[
            { v: 'default', c: 'border-transparent bg-primary text-primary-foreground' },
            { v: 'secondary', c: 'border-transparent bg-secondary text-secondary-foreground' },
            {
              v: 'destructive',
              c: 'border-transparent bg-destructive text-destructive-foreground',
            },
            { v: 'outline', c: 'text-foreground' },
          ].map((b) => (
            <span
              key={b.v}
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                b.c,
              )}
            >
              {b.v}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Use cases</p>
        <div className='flex flex-wrap gap-2'>
          <span className='inline-flex items-center rounded-full border border-transparent bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2.5 py-0.5 text-xs font-semibold'>
            Active
          </span>
          <span className='inline-flex items-center rounded-full border border-transparent bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2.5 py-0.5 text-xs font-semibold'>
            Pending
          </span>
          <span className='inline-flex items-center rounded-full border border-transparent bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2.5 py-0.5 text-xs font-semibold'>
            Rejected
          </span>
          <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold'>
            v0.1.0
          </span>
          <span className='inline-flex items-center rounded-full border border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2.5 py-0.5 text-xs font-semibold'>
            New
          </span>
        </div>
      </div>
    </div>
  );
}

export function AvatarDemo() {
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Sizes</p>
        <div className='flex items-end gap-3'>
          {[
            { s: 'h-6 w-6 text-[10px]', l: 'XS' },
            { s: 'h-8 w-8 text-xs', l: 'SM' },
            { s: 'h-10 w-10 text-sm', l: 'MD' },
            { s: 'h-12 w-12 text-base', l: 'LG' },
            { s: 'h-16 w-16 text-lg', l: 'XL' },
          ].map((a) => (
            <span
              key={a.l}
              className={cn('relative flex shrink-0 overflow-hidden rounded-full', a.s)}
            >
              <span
                className={cn(
                  'flex h-full w-full items-center justify-center rounded-full bg-muted font-medium',
                  a.s.includes('text'),
                )}
              >
                {a.l}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>With image</p>
        <div className='flex items-center gap-3'>
          <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
            <img
              className='aspect-square h-full w-full'
              src='https://github.com/shadcn.png'
              alt='Avatar'
            />
          </span>
          <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
            <img
              className='aspect-square h-full w-full'
              src='https://github.com/vercel.png'
              alt='Avatar'
            />
          </span>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Fallbacks with colors</p>
        <div className='flex items-center gap-3'>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium'>
            JD
          </span>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium'>
            AB
          </span>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white text-sm font-medium'>
            CD
          </span>
          <span className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white text-sm font-medium'>
            EF
          </span>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Avatar group (stacked)</p>
        <div className='flex -space-x-3'>
          {['JD', 'AB', 'CD', 'EF', '+3'].map((initials, i) => (
            <span
              key={i}
              className='relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium'
            >
              {initials}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SeparatorDemo() {
  return (
    <div className='space-y-6'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Horizontal</p>
        <div className='space-y-1'>
          <h4 className='text-sm font-medium'>Adhar UI</h4>
          <p className='text-sm text-muted-foreground'>Framework-agnostic design system.</p>
        </div>
        <div className='my-4 h-[1px] w-full bg-border' />
        <div className='flex h-5 items-center space-x-4 text-sm'>
          <div>Blog</div>
          <div className='h-full w-[1px] bg-border' />
          <div>Docs</div>
          <div className='h-full w-[1px] bg-border' />
          <div>Source</div>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>
          Vertical (in flex container)
        </p>
        <div className='flex h-8 items-center gap-4'>
          <span className='text-sm'>Home</span>
          <div className='h-full w-[1px] bg-border' />
          <span className='text-sm'>About</span>
          <div className='h-full w-[1px] bg-border' />
          <span className='text-sm'>Contact</span>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>With label</p>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <div className='space-y-6'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Card skeleton</p>
        <div className='flex items-center space-x-4'>
          <div className='h-12 w-12 animate-pulse rounded-full bg-muted' />
          <div className='space-y-2'>
            <div className='h-4 w-[250px] animate-pulse rounded-md bg-muted' />
            <div className='h-4 w-[200px] animate-pulse rounded-md bg-muted' />
          </div>
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Text block</p>
        <div className='space-y-2 max-w-sm'>
          <div className='h-4 w-full animate-pulse rounded bg-muted' />
          <div className='h-4 w-5/6 animate-pulse rounded bg-muted' />
          <div className='h-4 w-4/6 animate-pulse rounded bg-muted' />
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Image placeholder</p>
        <div className='h-48 w-full max-w-sm animate-pulse rounded-lg bg-muted' />
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Form skeleton</p>
        <div className='max-w-xs space-y-3'>
          <div className='h-3 w-16 animate-pulse rounded bg-muted' />
          <div className='h-10 w-full animate-pulse rounded-md bg-muted' />
          <div className='h-3 w-20 animate-pulse rounded bg-muted' />
          <div className='h-10 w-full animate-pulse rounded-md bg-muted' />
          <div className='h-10 w-24 animate-pulse rounded-md bg-muted' />
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Table skeleton</p>
        <div className='space-y-2 max-w-md'>
          <div className='grid grid-cols-4 gap-2'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='h-4 animate-pulse rounded bg-muted' />
            ))}
          </div>
          {[...Array(3)].map((_, row) => (
            <div key={row} className='grid grid-cols-4 gap-2'>
              {[...Array(4)].map((_, col) => (
                <div key={col} className='h-4 animate-pulse rounded bg-muted' />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProgressDemo() {
  const [value, setValue] = useState(45);
  return (
    <div className='space-y-6 max-w-sm'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between text-sm'>
          <span>Interactive</span>
          <span className='font-medium'>{value}%</span>
        </div>
        <div className='relative h-4 w-full overflow-hidden rounded-full bg-secondary'>
          <div className='h-full bg-primary transition-all' style={{ width: `${value}%` }} />
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => setValue(Math.max(0, value - 10))}
            className='h-8 rounded-md border px-3 text-xs hover:bg-accent'
          >
            -10
          </button>
          <button
            onClick={() => setValue(Math.min(100, value + 10))}
            className='h-8 rounded-md border px-3 text-xs hover:bg-accent'
          >
            +10
          </button>
          <button
            onClick={() => setValue(0)}
            className='h-8 rounded-md border px-3 text-xs hover:bg-accent'
          >
            Reset
          </button>
        </div>
      </div>
      <div className='space-y-3'>
        <p className='text-xs font-medium text-muted-foreground'>Variants</p>
        {[
          { label: 'Upload', value: 75, color: 'bg-primary' },
          { label: 'Processing', value: 45, color: 'bg-blue-500' },
          { label: 'Storage', value: 90, color: 'bg-orange-500' },
          { label: 'Error', value: 30, color: 'bg-destructive' },
        ].map((p) => (
          <div key={p.label} className='space-y-1'>
            <div className='flex items-center justify-between text-xs'>
              <span>{p.label}</span>
              <span>{p.value}%</span>
            </div>
            <div className='relative h-2 w-full overflow-hidden rounded-full bg-secondary'>
              <div
                className={cn('h-full transition-all rounded-full', p.color)}
                style={{ width: `${p.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='space-y-2'>
        <p className='text-xs font-medium text-muted-foreground'>Indeterminate</p>
        <div className='relative h-2 w-full overflow-hidden rounded-full bg-secondary'>
          <div
            className='h-full w-1/3 animate-[slide_1.5s_ease-in-out_infinite] rounded-full bg-primary'
            style={{ animation: 'slide 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </div>
  );
}

export function SpinnerDemo() {
  return (
    <div className='space-y-4'>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>Sizes</p>
        <div className='flex items-center gap-6'>
          {[{ s: 'h-4 w-4', l: 'Small' }, { s: 'h-6 w-6', l: 'Default' }, {
            s: 'h-8 w-8',
            l: 'Large',
          }, { s: 'h-12 w-12', l: 'XL' }].map((sp) => (
            <div key={sp.l} className='flex flex-col items-center gap-2'>
              <div className={cn('animate-spin', sp.s)}>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
              </div>
              <span className='text-xs text-muted-foreground'>{sp.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-3'>In context</p>
        <button
          disabled
          className='inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground opacity-80'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='none'
            viewBox='0 0 24 24'
            className='animate-spin'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
          Saving...
        </button>
      </div>
    </div>
  );
}

export function AspectRatioDemo() {
  return (
    <div className='space-y-4 max-w-sm'>
      {[
        { ratio: 16 / 9, label: '16:9 — Video' },
        { ratio: 4 / 3, label: '4:3 — Photo' },
        { ratio: 1, label: '1:1 — Square' },
        { ratio: 21 / 9, label: '21:9 — Ultrawide' },
      ].map(({ ratio, label }) => (
        <div key={label}>
          <p className='text-xs text-muted-foreground mb-1'>{label}</p>
          <div
            style={{ position: 'relative', paddingBottom: `${100 / ratio}%` }}
            className='w-full rounded-md bg-muted overflow-hidden'
          >
            <div className='absolute inset-0 flex items-center justify-center text-sm text-muted-foreground'>
              {label.split(' — ')[0]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
