/**
 * Prop types for consumers of the CVA-only API. Keep in sync with the
 * interface(s) in `Toggle.lite.tsx`, which are the source of truth.
 */
export interface ToggleProps {
  /** Whether the toggle is currently pressed/on (controlled) */
  pressed?: boolean;
  /** Initial pressed state when uncontrolled */
  defaultPressed?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  id?: string;
  title?: string;
  'aria-label'?: string;
  /** Fired with the next pressed state when activated */
  onPressedChange?: (pressed: boolean) => void;
  children?: any;
}
