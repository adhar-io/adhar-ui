import { cva } from 'class-variance-authority';

/**
 * Styles a native `<input type="checkbox">`. `accent-color` themes the native
 * box, check and indeterminate dash in every engine, so the control keeps its
 * built-in keyboard, form and label behaviour on every framework target.
 */
export const checkboxVariants = cva(
  [
    'peer shrink-0 cursor-pointer rounded-sm accent-primary align-middle',
    'ring-offset-background transition-shadow duration-150 motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-destructive',
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
