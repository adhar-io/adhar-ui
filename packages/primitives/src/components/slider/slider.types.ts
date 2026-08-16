import type { SliderVariants } from './slider.styles.ts';

export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Minimum value (default 0) */
  min?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Step increment (default 1) */
  step?: number;
  /** Visual size of the track and thumb */
  size?: NonNullable<SliderVariants>['size'];
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Human-readable value announced by screen readers */
  'aria-valuetext'?: string;
  /** Fires continuously while dragging */
  onInput?: (value: number) => void;
  /** Fires when the value is committed */
  onChange?: (value: number) => void;
}
