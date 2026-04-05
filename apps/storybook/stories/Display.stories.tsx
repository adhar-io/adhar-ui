import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

export const BadgeVariants: StoryObj = {
  name: 'Badge — Variants',
  render: () => (
    <div className='flex flex-wrap gap-2'>
      {[
        ['default', 'border-transparent bg-primary text-primary-foreground'],
        ['secondary', 'border-transparent bg-secondary text-secondary-foreground'],
        ['destructive', 'border-transparent bg-destructive text-destructive-foreground'],
        ['outline', 'text-foreground'],
      ].map(([v, c]) => (
        <span
          key={v}
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${c}`}
        >
          {v}
        </span>
      ))}
    </div>
  ),
};
export const BadgeUseCases: StoryObj = {
  name: 'Badge — Use Cases',
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <span className='rounded-full bg-green-100 text-green-700 px-2.5 py-0.5 text-xs font-semibold'>
        Active
      </span>
      <span className='rounded-full bg-yellow-100 text-yellow-700 px-2.5 py-0.5 text-xs font-semibold'>
        Pending
      </span>
      <span className='rounded-full bg-red-100 text-red-700 px-2.5 py-0.5 text-xs font-semibold'>
        Failed
      </span>
      <span className='rounded-full border px-2.5 py-0.5 text-xs font-semibold'>v0.1.0</span>
    </div>
  ),
};

export const AvatarSizes: StoryObj = {
  name: 'Avatar — Sizes',
  render: () => (
    <div className='flex items-end gap-3'>
      {[['h-6 w-6 text-[10px]', 'XS'], ['h-8 w-8 text-xs', 'SM'], ['h-10 w-10 text-sm', 'MD'], [
        'h-12 w-12 text-base',
        'LG',
      ], ['h-16 w-16 text-lg', 'XL']].map(([s, l]) => (
        <span key={l} className={`relative flex shrink-0 overflow-hidden rounded-full ${s}`}>
          <span className='flex h-full w-full items-center justify-center rounded-full bg-muted font-medium'>
            {l}
          </span>
        </span>
      ))}
    </div>
  ),
};
export const AvatarFallbacks: StoryObj = {
  name: 'Avatar — Color Fallbacks',
  render: () => (
    <div className='flex gap-3'>
      {[['JD', 'bg-primary text-primary-foreground'], ['AB', 'bg-blue-600 text-white'], [
        'CD',
        'bg-green-600 text-white',
      ], ['EF', 'bg-orange-600 text-white']].map(([i, c]) => (
        <span
          key={i}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${c}`}
        >
          {i}
        </span>
      ))}
    </div>
  ),
};
export const AvatarGroup: StoryObj = {
  name: 'Avatar — Stacked Group',
  render: () => (
    <div className='flex -space-x-3'>
      {['JD', 'AB', 'CD', 'EF', '+3'].map((i, idx) => (
        <span
          key={idx}
          className='relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium'
        >
          {i}
        </span>
      ))}
    </div>
  ),
};

export const SeparatorHorizontal: StoryObj = {
  name: 'Separator — Horizontal',
  render: () => (
    <div>
      <div className='space-y-1'>
        <h4 className='text-sm font-medium'>Title</h4>
        <p className='text-sm text-muted-foreground'>Description</p>
      </div>
      <div className='my-4 h-[1px] w-full bg-border' />
      <p className='text-sm'>Content below separator</p>
    </div>
  ),
};
export const SeparatorVertical: StoryObj = {
  name: 'Separator — Vertical',
  render: () => (
    <div className='flex h-5 items-center space-x-4 text-sm'>
      <div>Blog</div>
      <div className='h-full w-[1px] bg-border' />
      <div>Docs</div>
      <div className='h-full w-[1px] bg-border' />
      <div>Source</div>
    </div>
  ),
};
export const SeparatorWithLabel: StoryObj = {
  name: 'Separator — With Label',
  render: () => (
    <div className='relative'>
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full border-t' />
      </div>
      <div className='relative flex justify-center text-xs uppercase'>
        <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
      </div>
    </div>
  ),
};

export const SkeletonCard: StoryObj = {
  name: 'Skeleton — Card',
  render: () => (
    <div className='flex items-center space-x-4'>
      <div className='h-12 w-12 animate-pulse rounded-full bg-muted' />
      <div className='space-y-2'>
        <div className='h-4 w-[250px] animate-pulse rounded bg-muted' />
        <div className='h-4 w-[200px] animate-pulse rounded bg-muted' />
      </div>
    </div>
  ),
};
export const SkeletonForm: StoryObj = {
  name: 'Skeleton — Form',
  render: () => (
    <div className='max-w-xs space-y-3'>
      <div className='h-3 w-16 animate-pulse rounded bg-muted' />
      <div className='h-10 w-full animate-pulse rounded-md bg-muted' />
      <div className='h-3 w-20 animate-pulse rounded bg-muted' />
      <div className='h-10 w-full animate-pulse rounded-md bg-muted' />
      <div className='h-10 w-24 animate-pulse rounded-md bg-muted' />
    </div>
  ),
};
export const SkeletonTable: StoryObj = {
  name: 'Skeleton — Table',
  render: () => (
    <div className='space-y-2 max-w-md'>
      {[...Array(4)].map((_, r) => (
        <div key={r} className='grid grid-cols-4 gap-2'>
          {[...Array(4)].map((_, c) => (
            <div key={c} className='h-4 animate-pulse rounded bg-muted' />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ProgressInteractive: StoryObj = {
  name: 'Progress — Interactive',
  render: () => {
    const [v, sv] = useState(60);
    return (
      <div className='max-w-sm space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>Progress</span>
          <span>{v}%</span>
        </div>
        <div className='relative h-3 w-full overflow-hidden rounded-full bg-secondary'>
          <div className='h-full bg-primary transition-all' style={{ width: `${v}%` }} />
        </div>
        <div className='flex gap-2'>
          <button
            onClick={() => sv(Math.max(0, v - 10))}
            className='h-8 rounded-md border px-3 text-xs hover:bg-accent'
          >
            -10
          </button>
          <button
            onClick={() => sv(Math.min(100, v + 10))}
            className='h-8 rounded-md border px-3 text-xs hover:bg-accent'
          >
            +10
          </button>
        </div>
      </div>
    );
  },
};
export const ProgressColors: StoryObj = {
  name: 'Progress — Colors',
  render: () => (
    <div className='max-w-sm space-y-3'>
      {[['Primary', 75, 'bg-primary'], ['Success', 90, 'bg-green-500'], [
        'Warning',
        45,
        'bg-yellow-500',
      ], ['Error', 30, 'bg-destructive']].map(([l, v, c]) => (
        <div key={l as string} className='space-y-1'>
          <div className='flex justify-between text-xs'>
            <span>{l}</span>
            <span>{v}%</span>
          </div>
          <div className='h-2 w-full rounded-full bg-secondary'>
            <div className={`h-full rounded-full transition-all ${c}`} style={{ width: `${v}%` }} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SpinnerSizes: StoryObj = {
  name: 'Spinner — Sizes',
  render: () => (
    <div className='flex items-center gap-6'>
      {[['h-4 w-4', 'SM'], ['h-6 w-6', 'MD'], ['h-8 w-8', 'LG'], ['h-12 w-12', 'XL']].map((
        [s, l],
      ) => (
        <div key={l} className='flex flex-col items-center gap-2'>
          <div className={`animate-spin ${s}`}>
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
          <span className='text-xs text-muted-foreground'>{l}</span>
        </div>
      ))}
    </div>
  ),
};
export const SpinnerInButton: StoryObj = {
  name: 'Spinner — In Button',
  render: () => (
    <button
      disabled
      className='inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm text-primary-foreground opacity-80'
    >
      <svg width='16' height='16' fill='none' viewBox='0 0 24 24' className='animate-spin'>
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
      </svg>Saving...
    </button>
  ),
};

export const AspectRatioStory: StoryObj = {
  name: 'Aspect Ratio',
  render: () => (
    <div className='max-w-xs space-y-3'>
      {[{ r: 16 / 9, l: '16:9' }, { r: 4 / 3, l: '4:3' }, { r: 1, l: '1:1' }].map(({ r, l }) => (
        <div key={l}>
          <p className='text-xs text-muted-foreground mb-1'>{l}</p>
          <div
            style={{ paddingBottom: `${100 / r}%`, position: 'relative' }}
            className='w-full rounded-md bg-muted'
          >
            <div className='absolute inset-0 flex items-center justify-center text-sm text-muted-foreground'>
              {l}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

const meta: Meta = { title: 'Components/Display' };
export default meta;
