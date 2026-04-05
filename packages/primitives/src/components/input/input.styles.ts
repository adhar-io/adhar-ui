import { cva } from 'npm:class-variance-authority@0.7.1';

export const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-9 text-xs',
        default: 'h-10',
        lg: 'h-11 text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type InputVariants = Parameters<typeof inputVariants>[0];
