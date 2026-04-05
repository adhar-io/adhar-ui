/**
 * @adhar-ui/solid
 *
 * SolidJS components for the Adhar UI design system.
 * Components are compiled from @adhar-ui/primitives Mitosis sources.
 *
 * Generated Solid components are available at:
 *   @adhar-ui/solid/generated/src/components/<name>/<Name>.lite.tsx
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
export {
  cardContentVariants,
  cardDescriptionVariants,
  cardFooterVariants,
  cardHeaderVariants,
  cardTitleVariants,
  cardVariants,
} from '../../primitives/src/components/card/card.styles.ts';
export {
  alertDescriptionVariants,
  alertTitleVariants,
  alertVariants,
} from '../../primitives/src/components/alert/alert.styles.ts';

// -- Accessibility and icon utilities --
export { announce, createFocusTrap, createRovingTabIndex, skipNavClasses } from '@adhar-ui/a11y';
export { getIcon, hasIcon, registerIcon, registerIcons, renderIconSvg } from '@adhar-ui/icons';
