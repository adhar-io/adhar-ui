// @ts-nocheck
import { cva } from 'class-variance-authority';
export const cardVariants = cva('rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow duration-200 motion-reduce:transition-none', {
  variants: {
    padding: {
      none: '',
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8'
    },
    interactive: {
      true: 'cursor-pointer hover:shadow-md hover:border-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      false: ''
    }
  },
  defaultVariants: {
    padding: 'none',
    interactive: false
  }
});
export const cardHeaderVariants = cva('flex flex-col space-y-1.5 p-6');
export const cardTitleVariants = cva('text-xl font-semibold leading-none tracking-tight');
export const cardDescriptionVariants = cva('text-sm text-muted-foreground leading-relaxed');
export const cardContentVariants = cva('p-6 pt-0');
export const cardFooterVariants = cva('flex items-center gap-2 p-6 pt-0');
export type CardVariants = Parameters<typeof cardVariants>[0]