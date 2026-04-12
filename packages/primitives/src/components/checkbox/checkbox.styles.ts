import { cva } from 'npm:class-variance-authority@0.7.1';

export const checkboxVariants = cva(
  [
    'peer shrink-0 rounded-sm border border-primary ring-offset-background',
    'transition-colors duration-150 motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
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

export type CheckboxVariants = Parameters<typeof checkboxVariants>[0];
