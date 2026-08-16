import { cva } from 'npm:class-variance-authority@0.7.1';

export const radioGroupVariants = cva('grid gap-2 motion-reduce:transition-none', {
  variants: {
    orientation: {
      vertical: 'grid-flow-row',
      horizontal: 'grid-flow-col auto-cols-max gap-4',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export const radioGroupItemVariants = cva(
  [
    'aspect-square rounded-full border border-input text-primary cursor-pointer',
    'flex items-center justify-center shadow-sm',
    'ring-offset-background transition-colors duration-150 motion-reduce:transition-none',
    'enabled:hover:border-primary/60',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-[checked=true]:border-primary',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const radioGroupIndicatorVariants = cva('rounded-full bg-primary', {
  variants: {
    size: {
      sm: 'h-1.5 w-1.5',
      default: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type RadioGroupVariants = Parameters<typeof radioGroupVariants>[0];
export type RadioGroupItemVariants = Parameters<typeof radioGroupItemVariants>[0];
