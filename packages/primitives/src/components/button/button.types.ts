import type { ButtonVariants } from './button.styles.ts';

export interface ButtonProps {
  /** Button variant */
  variant?: NonNullable<ButtonVariants>['variant'];
  /** Button size */
  size?: NonNullable<ButtonVariants>['size'];
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  class?: string;
  /** Click handler */
  onClick?: (event: MouseEvent) => void;
}
