import { cva } from 'class-variance-authority';
export const avatarVariants = cva('relative inline-flex shrink-0 overflow-hidden', {
  variants: {
    size: {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      default: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16'
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md'
    }
  },
  defaultVariants: {
    size: 'default',
    shape: 'circle'
  }
});
export const avatarImageVariants = cva('aspect-square h-full w-full object-cover');
export const avatarFallbackVariants = cva('flex h-full w-full select-none items-center justify-center bg-muted font-medium text-muted-foreground', {
  variants: {
    size: {
      xs: 'text-[10px]',
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});
export type AvatarVariants = Parameters<typeof avatarVariants>[0]