// @ts-nocheck
import { cva } from 'class-variance-authority';
export const skeletonVariants = cva('animate-pulse rounded-md bg-muted', {
  variants: {
    variant: {
      default: '',
      text: 'h-4 w-full',
      heading: 'h-8 w-3/4',
      avatar: 'h-12 w-12 rounded-full',
      button: 'h-10 w-24',
      card: 'h-48 w-full',
      image: 'aspect-video w-full'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});
export type SkeletonVariants = Parameters<typeof skeletonVariants>[0]