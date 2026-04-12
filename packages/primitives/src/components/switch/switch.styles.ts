import { cva } from 'npm:class-variance-authority@0.7.1';

export const switchVariants = cva(
  [
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
    'transition-colors duration-200 motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-4 w-7',
        default: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const switchThumbVariants = cva(
  [
    'pointer-events-none block rounded-full bg-background shadow-lg ring-0',
    'transition-transform duration-200 motion-reduce:transition-none',
    'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
        default: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type SwitchVariants = Parameters<typeof switchVariants>[0];
