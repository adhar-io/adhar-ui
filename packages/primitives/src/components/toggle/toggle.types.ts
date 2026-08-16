import type { ToggleVariants } from './toggle.styles.ts';

export interface ToggleProps {
  /** Whether the toggle is currently pressed/on (controlled) */
  pressed?: boolean;
  /** Visual variant */
  variant?: NonNullable<ToggleVariants>['variant'];
  /** Size of the toggle */
  size?: NonNullable<ToggleVariants>['size'];
  disabled?: boolean;
  className?: string;
  id?: string;
  /** Accessible label — required for icon-only toggles */
  'aria-label'?: string;
  /** Fired with the next pressed state when activated */
  onPressedChange?: (pressed: boolean) => void;
}
