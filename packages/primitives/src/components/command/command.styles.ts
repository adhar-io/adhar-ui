import { cva } from 'class-variance-authority';

export const commandVariants = cva(
  'flex h-full w-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground',
);

/** Wrapper around the search input row (holds the leading icon). */
export const commandInputWrapperVariants = cva(
  'flex items-center gap-2 border-b border-border px-3',
);

export const commandInputVariants = cva(
  [
    'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none',
    'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
);

export const commandListVariants = cva('max-h-80 overflow-y-auto overflow-x-hidden p-1 scroll-py-1');

export const commandEmptyVariants = cva('py-6 text-center text-sm text-muted-foreground');

export const commandGroupVariants = cva('overflow-hidden p-1 text-foreground');

export const commandGroupHeadingVariants = cva(
  'px-2 py-1.5 text-xs font-medium text-muted-foreground',
);

export const commandItemVariants = cva(
  [
    'relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none',
    'transition-colors duration-100 motion-reduce:transition-none',
    'aria-selected:bg-accent aria-selected:text-accent-foreground',
    'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
    'hover:bg-accent hover:text-accent-foreground',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground',
  ].join(' '),
);

export const commandSeparatorVariants = cva('-mx-1 my-1 h-px bg-border');

export const commandShortcutVariants = cva(
  'ml-auto text-xs tracking-widest text-muted-foreground',
);
