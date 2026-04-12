import { cva } from 'npm:class-variance-authority@0.7.1';

export const sheetOverlayVariants = cva(
  [
    'fixed inset-0 z-50 bg-black/80',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ].join(' '),
);

export const sheetContentVariants = cva(
  [
    'fixed z-50 gap-4 bg-background p-6 shadow-lg',
    'transition ease-in-out duration-300 motion-reduce:transition-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
  ].join(' '),
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

export const sheetHeaderVariants = cva('flex flex-col space-y-2 text-center sm:text-left');
export const sheetFooterVariants = cva('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2');
export const sheetTitleVariants = cva('text-lg font-semibold text-foreground');
export const sheetDescriptionVariants = cva('text-sm text-muted-foreground');

export type SheetVariants = Parameters<typeof sheetContentVariants>[0];
