import { cva } from 'class-variance-authority';

export const labelVariants = cva(
  [
    'text-sm font-medium leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ].join(' '),
  {
    variants: {
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-destructive",
        false: '',
      },
    },
    defaultVariants: {
      required: false,
    },
  },
);

export type LabelVariants = Parameters<typeof labelVariants>[0];
