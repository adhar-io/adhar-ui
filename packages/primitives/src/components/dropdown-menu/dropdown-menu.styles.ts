import { cva } from 'class-variance-authority';

export const dropdownMenuContentVariants = cva(
  [
    'z-50 min-w-[8rem] max-h-[min(24rem,calc(100dvh-6rem))] overflow-y-auto rounded-md border bg-popover p-1 outline-none',
    'text-popover-foreground shadow-md',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  ].join(' '),
);

export const dropdownMenuItemVariants = cva(
  [
    'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5',
    'text-sm outline-none',
    'hover:bg-accent hover:text-accent-foreground',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'transition-colors duration-100 motion-reduce:transition-none',
    'focus:bg-accent focus:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        destructive:
          'text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive',
      },
      inset: {
        true: 'pl-8',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const dropdownMenuSeparatorVariants = cva('-mx-1 my-1 h-px bg-muted');
export const dropdownMenuLabelVariants = cva('px-2 py-1.5 text-sm font-semibold');
export const dropdownMenuShortcutVariants = cva('ml-auto text-xs tracking-widest opacity-60');
