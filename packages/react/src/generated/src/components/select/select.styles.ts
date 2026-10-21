import { cva } from 'class-variance-authority';
export const selectTriggerVariants = cva(['flex w-full items-center justify-between rounded-md border border-input', 'bg-background px-3 py-2 text-sm cursor-pointer', 'ring-offset-background transition-colors duration-150', 'placeholder:text-muted-foreground', 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', 'disabled:cursor-not-allowed disabled:opacity-50', 'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive', 'motion-reduce:transition-none', '[&>span]:line-clamp-1'].join(' '), {
  variants: {
    size: {
      sm: 'h-8 px-2.5 text-xs',
      default: 'h-10',
      lg: 'h-12 px-4 text-base'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});
export const selectContentVariants = cva(['relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border', 'bg-popover text-popover-foreground shadow-md', 'data-[state=open]:animate-in data-[state=closed]:animate-out', 'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', 'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95', 'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2'].join(' '));
export const selectItemVariants = cva(['relative flex w-full cursor-default select-none items-center', 'rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none', 'focus:bg-accent focus:text-accent-foreground', 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'].join(' '));
export const selectSeparatorVariants = cva('-mx-1 my-1 h-px bg-muted');
export const selectLabelVariants = cva('py-1.5 pl-8 pr-2 text-sm font-semibold')