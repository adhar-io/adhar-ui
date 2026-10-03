import { cva } from 'class-variance-authority';

export const dialogOverlayVariants = cva(
  [
    'fixed inset-0 z-50 bg-black/80',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ].join(' '),
);

export const dialogContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'grid w-full max-w-lg gap-4 rounded-xl border bg-background p-6 shadow-lg',
    'duration-200',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  ].join(' '),
);

export const dialogHeaderVariants = cva('flex flex-col space-y-1.5 text-center sm:text-left');
export const dialogFooterVariants = cva('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2');
export const dialogTitleVariants = cva('text-lg font-semibold leading-none tracking-tight');
export const dialogDescriptionVariants = cva('text-sm text-muted-foreground');

export const dialogCloseVariants = cva(
  [
    'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background',
    'transition-opacity hover:opacity-100',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:pointer-events-none',
  ].join(' '),
);
