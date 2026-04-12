import { cva } from 'npm:class-variance-authority@0.7.1';

export const alertVariants = cva(
  [
    'relative w-full rounded-lg border p-4',
    '[&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px]',
    '[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 bg-destructive/5 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success:
          'border-green-500/50 bg-green-500/5 text-green-700 dark:text-green-400 [&>svg]:text-green-500',
        warning:
          'border-yellow-500/50 bg-yellow-500/5 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-500',
        info:
          'border-blue-500/50 bg-blue-500/5 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const alertTitleVariants = cva('mb-1 font-medium leading-none tracking-tight');
export const alertDescriptionVariants = cva('text-sm [&_p]:leading-relaxed');

export type AlertVariants = Parameters<typeof alertVariants>[0];
