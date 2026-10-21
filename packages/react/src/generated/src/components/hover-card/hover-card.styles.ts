import { cva } from 'class-variance-authority';
export const hoverCardVariants = cva('group relative inline-block');
export const hoverCardContentVariants = cva(['absolute z-50 w-64', 'rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-md',
// Hidden by default; revealed on hover or keyboard focus of the trigger.
'invisible opacity-0', 'transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none', 'group-hover:visible group-hover:opacity-100 group-hover:delay-300', 'group-focus-within:visible group-focus-within:opacity-100'].join(' '), {
  variants: {
    side: {
      top: 'bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0',
      bottom: 'top-full left-1/2 mt-2 -translate-x-1/2 -translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0',
      left: 'right-full top-1/2 mr-2 -translate-y-1/2',
      right: 'left-full top-1/2 ml-2 -translate-y-1/2'
    }
  },
  defaultVariants: {
    side: 'bottom'
  }
});
export type HoverCardContentVariants = Parameters<typeof hoverCardContentVariants>[0]