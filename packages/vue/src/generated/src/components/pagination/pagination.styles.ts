// @ts-nocheck
import { cva } from 'class-variance-authority';
export const paginationVariants = cva('mx-auto flex w-full justify-center');
export const paginationContentVariants = cva('flex flex-row items-center gap-1');
export const paginationItemVariants = cva('');
export const paginationLinkVariants = cva(['inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium cursor-pointer select-none', 'transition-colors duration-150 motion-reduce:transition-none', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', 'aria-disabled:pointer-events-none aria-disabled:opacity-50'].join(' '), {
  variants: {
    isActive: {
      true: 'border border-input bg-background shadow-sm text-foreground',
      false: 'hover:bg-accent hover:text-accent-foreground text-foreground'
    },
    size: {
      sm: 'h-8 min-w-8 px-2 text-xs',
      default: 'h-9 min-w-9 px-2.5',
      lg: 'h-10 min-w-10 px-3'
    }
  },
  defaultVariants: {
    isActive: false,
    size: 'default'
  }
});
export const paginationEllipsisVariants = cva('flex h-9 w-9 items-center justify-center text-muted-foreground [&>svg]:size-4');
export type PaginationLinkVariants = Parameters<typeof paginationLinkVariants>[0]