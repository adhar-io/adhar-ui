import { cva } from 'npm:class-variance-authority@0.7.1';

/**
 * A single native input tuned for one-time-code entry: monospace, centered,
 * widely tracked so digits read as separate cells. Because it is a real
 * <input> it gets OS OTP autofill, paste, and the numeric keyboard for free —
 * and behaves identically across every framework target.
 */
export const inputOTPVariants = cva(
  [
    'font-mono text-center tracking-[0.6em] indent-[0.3em]',
    'w-full rounded-lg border border-input bg-background',
    'placeholder:tracking-[0.6em] placeholder:text-muted-foreground/40',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-[color,box-shadow,border-color] duration-150 motion-reduce:transition-none',
    'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-10 text-base',
        default: 'h-12 text-lg',
        lg: 'h-14 text-xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export type InputOTPVariants = Parameters<typeof inputOTPVariants>[0];
