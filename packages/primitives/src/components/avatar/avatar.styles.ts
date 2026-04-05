import { cva } from 'npm:class-variance-authority@0.7.1';

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const avatarImageVariants = cva('aspect-square h-full w-full');
export const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground',
);

export type AvatarVariants = Parameters<typeof avatarVariants>[0];
