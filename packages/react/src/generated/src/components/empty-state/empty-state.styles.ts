import { cva } from 'class-variance-authority';
export const emptyStateVariants = cva('flex flex-col items-center justify-center text-center', {
  variants: {
    size: {
      sm: 'gap-2 py-8 px-4',
      default: 'gap-3 py-12 px-6',
      lg: 'gap-4 py-20 px-8'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});
export const emptyStateIconVariants = cva(['flex items-center justify-center rounded-full bg-muted text-muted-foreground', 'mb-1 [&_svg]:size-6'].join(' '), {
  variants: {
    size: {
      sm: 'h-10 w-10',
      default: 'h-14 w-14',
      lg: 'h-16 w-16'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});
export const emptyStateTitleVariants = cva('text-base font-semibold text-foreground');
export const emptyStateDescriptionVariants = cva('max-w-sm text-sm text-muted-foreground');
export type EmptyStateVariants = Parameters<typeof emptyStateVariants>[0]