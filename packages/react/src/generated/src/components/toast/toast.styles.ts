import { cva } from 'class-variance-authority';
export const toastVariants = cva(['group pointer-events-auto relative flex w-full items-start justify-between', 'gap-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg', 'transition-all duration-300 motion-reduce:transition-none', 'data-[swipe=cancel]:translate-x-0', 'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]', 'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]', 'data-[state=open]:animate-in data-[state=closed]:animate-out', 'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full', 'data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full'].join(' '), {
  variants: {
    variant: {
      default: 'border bg-background text-foreground',
      destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
      success: 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400',
      warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
      info: 'border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
export const toastTitleVariants = cva('text-sm font-semibold');
export const toastDescriptionVariants = cva('text-sm opacity-90');
export const toastCloseVariants = cva(['absolute right-2 top-2 rounded-md p-1 opacity-60', 'transition-opacity hover:opacity-100 motion-reduce:transition-none', 'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
// Fade out only where hover exists; touch users always see the button.
'[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100'].join(' '));
export type ToastVariants = Parameters<typeof toastVariants>[0]