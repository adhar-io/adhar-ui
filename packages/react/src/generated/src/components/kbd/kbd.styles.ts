import { cva } from 'class-variance-authority';
export const kbdVariants = cva(['inline-flex items-center justify-center gap-1 rounded border border-border bg-muted', 'px-1.5 font-mono font-medium text-muted-foreground select-none align-middle', 'shadow-[inset_0_-1px_0_hsl(var(--border))]'].join(' '), {
  variants: {
    size: {
      sm: 'h-4 min-w-4 text-[10px]',
      default: 'h-5 min-w-5 text-xs',
      lg: 'h-6 min-w-6 text-sm'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});
export type KbdVariants = Parameters<typeof kbdVariants>[0]