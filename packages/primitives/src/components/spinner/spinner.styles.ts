import { cva } from 'npm:class-variance-authority@0.7.1';

export const spinnerVariants = cva(
  'animate-spin text-muted-foreground motion-reduce:animate-none',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type SpinnerVariants = Parameters<typeof spinnerVariants>[0];
