import { cva } from 'npm:class-variance-authority@0.7.1';

export const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-center justify-between',
    'space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg',
    'transition-all duration-300 motion-reduce:transition-none',
    'data-[swipe=cancel]:translate-x-0',
    'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
    'data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
        success: 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const toastTitleVariants = cva('text-sm font-semibold');
export const toastDescriptionVariants = cva('text-sm opacity-90');
export const toastCloseVariants = cva(
  [
    'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0',
    'transition-opacity hover:text-foreground',
    'focus:opacity-100 focus:outline-none focus:ring-2',
    'group-hover:opacity-100',
  ].join(' '),
);

export type ToastVariants = Parameters<typeof toastVariants>[0];
