/**
 * Prop types for consumers of the CVA-only API. Keep in sync with the
 * interface(s) in `Slider.lite.tsx`, which are the source of truth.
 */
export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Initial value when uncontrolled */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  name?: string;
  id?: string;
  form?: string;
  /** ID of a <datalist> with tick marks */
  list?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  /** Human-readable value for screen readers (e.g. "$40", "Medium") */
  'aria-valuetext'?: string;
  /** Fires continuously while dragging */
  onInput?: (value: number) => void;
  /** Alias of `onInput` */
  onValueChange?: (value: number) => void;
  /** Fires when the value is committed (drag end / keyboard) */
  onChange?: (value: number) => void;
}