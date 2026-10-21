// @ts-nocheck
import { cva } from 'class-variance-authority';
export const sheetOverlayVariants = cva(['fixed inset-0 z-50 bg-black/80', 'data-[state=open]:animate-in data-[state=closed]:animate-out', 'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'].join(' '));
export const sheetContentVariants = cva(['fixed z-50 flex flex-col gap-4 overflow-y-auto bg-background p-6 shadow-lg outline-none', 'transition ease-in-out duration-300 motion-reduce:transition-none', 'data-[state=open]:animate-in data-[state=closed]:animate-out'].join(' '), {
  variants: {
    side: {
      top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
      right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'
    }
  },
  defaultVariants: {
    side: 'right'
  }
});
export const sheetHeaderVariants = cva('flex flex-col space-y-2 text-center sm:text-left');
export const sheetFooterVariants = cva('mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end');
export const sheetTitleVariants = cva('text-lg font-semibold text-foreground');
export const sheetDescriptionVariants = cva('text-sm text-muted-foreground');
export const sheetCloseVariants = cva(['absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background', 'transition-opacity hover:opacity-100 motion-reduce:transition-none', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'].join(' '));
export type SheetVariants = Parameters<typeof sheetContentVariants>[0]