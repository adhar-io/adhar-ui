import { cva } from 'npm:class-variance-authority@0.7.1';

export const hoverCardVariants = cva('group relative inline-block');

export const hoverCardContentVariants = cva(
  [
    'absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 w-64',
    'rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-md',
    // Hidden by default; revealed on hover or keyboard focus of the trigger.
    'invisible translate-y-1 opacity-0',
    'transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none',
    'group-hover:visible group-hover:translate-y-0 group-hover:opacity-100',
    'group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100',
  ].join(' '),
);

export type HoverCardContentVariants = Parameters<typeof hoverCardContentVariants>[0];
