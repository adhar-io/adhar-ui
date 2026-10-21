/**
 * Prop types for consumers of the CVA-only API. Keep in sync with the
 * interface(s) in `Button.lite.tsx`, which are the source of truth.
 */
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Shows a spinner, sets aria-busy, and blocks interaction */
  loading?: boolean;
  /** Text announced by screen readers while loading (defaults to "Loading") */
  loadingText?: string;
  /** Stretches the button to fill its container */
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  id?: string;
  title?: string;
  name?: string;
  value?: string;
  form?: string;
  autoFocus?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-controls'?: string;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  children?: any;
}