/**
 * @adhar-ui/svelte
 *
 * Svelte components for the Adhar UI design system.
 * Components are compiled from @adhar-ui/primitives Mitosis sources.
 *
 * Svelte components are output as .tsx files containing Svelte SFC syntax.
 * Import them directly in your Svelte project.
 */

// -- Utilities --
export { cn } from '@adhar-ui/utils';

// -- Tokens --
export type { Breakpoint, ThemePreset } from '@adhar-ui/tokens';
export { breakpoints, breakpointValues } from '@adhar-ui/tokens';

// -- Style variants --
export {
  avatarVariants,
  badgeVariants,
  buttonVariants,
  inputVariants,
  separatorVariants,
  skeletonVariants,
} from '@adhar-ui/primitives';
export { cardVariants } from '../../primitives/src/components/card/card.styles.ts';
export { alertVariants } from '../../primitives/src/components/alert/alert.styles.ts';

// -- Accessibility and icon utilities --
export { announce, createFocusTrap, createRovingTabIndex, skipNavClasses } from '@adhar-ui/a11y';
export { getIcon, hasIcon, registerIcon, registerIcons, renderIconSvg } from '@adhar-ui/icons';
