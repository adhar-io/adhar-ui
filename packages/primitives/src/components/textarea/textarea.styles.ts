import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
  [
    'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2',
    'text-sm ring-offset-background transition-colors duration-150',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive',
    'motion-reduce:transition-none',
    'resize-y',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'min-h-[60px] text-xs',
        default: 'min-h-[80px]',
        lg: 'min-h-[120px] text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type TextareaVariants = Parameters<typeof textareaVariants>[0];
