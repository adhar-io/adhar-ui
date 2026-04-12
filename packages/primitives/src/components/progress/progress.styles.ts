import { cva } from 'npm:class-variance-authority@0.7.1';

export const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-secondary',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        default: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out motion-reduce:transition-none',
);

export type ProgressVariants = Parameters<typeof progressVariants>[0];
