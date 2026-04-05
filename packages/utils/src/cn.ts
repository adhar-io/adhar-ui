/**
 * Class name merging utility.
 *
 * Combines clsx (conditional class composition) with tailwind-merge
 * (Tailwind-aware conflict resolution). This is the primary utility
 * used by every Adhar UI component for className handling.
 *
 * @example
 * ```ts
 * cn('px-2 py-1', 'px-4')           // => 'py-1 px-4'  (px-4 wins over px-2)
 * cn('text-red-500', false && 'hidden') // => 'text-red-500'
 * cn(buttonVariants({ variant: 'outline' }), className) // compose CVA + user class
 * ```
 *
 * @module
 */

import { type ClassValue, clsx } from 'npm:clsx@2.1.1';
import { twMerge } from 'npm:tailwind-merge@3.5.0';

/**
 * Merge class names with Tailwind CSS conflict resolution.
 *
 * @param inputs - Class values to merge. Supports strings, arrays,
 *                 objects (conditional), and falsy values.
 * @returns Merged class string with Tailwind conflicts resolved.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
