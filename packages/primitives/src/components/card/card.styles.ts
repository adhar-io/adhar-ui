import { cva } from 'npm:class-variance-authority@0.7.1';

export const cardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm', {
  variants: {
    padding: {
      none: '',
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    padding: 'none',
  },
});

export const cardHeaderVariants = cva('flex flex-col space-y-1.5 p-6');
export const cardTitleVariants = cva('text-2xl font-semibold leading-none tracking-tight');
export const cardDescriptionVariants = cva('text-sm text-muted-foreground');
export const cardContentVariants = cva('p-6 pt-0');
export const cardFooterVariants = cva('flex items-center p-6 pt-0');

export type CardVariants = Parameters<typeof cardVariants>[0];
