// @ts-nocheck
import { cva } from 'class-variance-authority';
export const accordionItemVariants = cva('border-b');
export const accordionTriggerVariants = cva(['flex flex-1 items-center justify-between py-4 font-medium', 'transition-all duration-200 motion-reduce:transition-none', 'hover:underline', '[&[data-state=open]>svg]:rotate-180'].join(' '));
export const accordionContentVariants = cva(['overflow-hidden text-sm transition-all duration-200 motion-reduce:transition-none', 'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'].join(' '))