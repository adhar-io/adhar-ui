import { cva } from 'class-variance-authority';

export const statCardVariants = cva(
  [
    'rounded-xl border border-border bg-card text-card-foreground p-5',
    'transition-shadow duration-200 motion-reduce:transition-none',
  ].join(' '),
  {
    variants: {
      interactive: {
        true:
          'cursor-pointer hover:shadow-md hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        false: '',
      },
    },
    defaultVariants: {
      interactive: false,
    },
  },
);

export const statCardTrendVariants = cva(
  'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium [&_svg]:size-3',
  {
    variants: {
      trend: {
        up: 'bg-green-500/15 text-green-600 dark:text-green-400',
        down: 'bg-destructive/15 text-destructive',
        neutral: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      trend: 'neutral',
    },
  },
);

export type StatCardVariants = Parameters<typeof statCardVariants>[0];
export type StatCardTrendVariants = Parameters<typeof statCardTrendVariants>[0];
