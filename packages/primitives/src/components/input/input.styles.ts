import { cva } from 'npm:class-variance-authority@0.7.1';

export const inputVariants = cva(
  [
    'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
    'ring-offset-background transition-colors duration-150',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive',
    'motion-reduce:transition-none',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-8 text-xs px-2.5',
        default: 'h-10',
        lg: 'h-12 text-base px-4',
      },
      variant: {
        default: '',
        ghost: 'border-transparent hover:border-input focus-visible:border-input',
        flush: 'border-0 border-b border-input rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
);

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

export type InputVariants = Parameters<typeof inputVariants>[0];
