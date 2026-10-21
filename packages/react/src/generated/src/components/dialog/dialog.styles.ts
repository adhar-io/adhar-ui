import { cva } from 'class-variance-authority';
export const dialogOverlayVariants = cva(['fixed inset-0 z-50 bg-black/80', 'data-[state=open]:animate-in data-[state=closed]:animate-out', 'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'].join(' '));
export const dialogContentVariants = cva(['fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2', 'grid w-[calc(100%-2rem)] gap-4 rounded-xl border bg-background p-6 shadow-lg', 'max-h-[calc(100dvh-2rem)] overflow-y-auto outline-none', 'duration-200', 'data-[state=open]:animate-in data-[state=closed]:animate-out', 'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', 'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'].join(' '), {
  variants: {
    size: {
      sm: 'max-w-sm',
      default: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)]'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});
export const dialogHeaderVariants = cva('flex flex-col space-y-1.5 text-center sm:text-left');
export const dialogFooterVariants = cva('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end');
export const dialogTitleVariants = cva('text-lg font-semibold leading-none tracking-tight');
export const dialogDescriptionVariants = cva('text-sm text-muted-foreground');
export const dialogCloseVariants = cva(['absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background', 'transition-opacity hover:opacity-100', 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', 'disabled:pointer-events-none'].join(' '))