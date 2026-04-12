import type { ButtonVariants } from './button.styles.ts';

export interface ButtonProps {
  /** Visual variant of the button */
  variant?: NonNullable<ButtonVariants>['variant'];
  /** Size of the button */
  size?: NonNullable<ButtonVariants>['size'];
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state (shows spinner, disables interaction) */
  loading?: boolean;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  className?: string;
  /** Accessible label when button has no visible text */
  'aria-label'?: string;
  /** ID of the element this button controls */
  'aria-controls'?: string;
  /** Whether the controlled element is expanded */
  'aria-expanded'?: boolean;
  /** Whether this is a toggle button and its pressed state */
  'aria-pressed'?: boolean;
  /** Click handler */
  onClick?: (event: MouseEvent) => void;
}
