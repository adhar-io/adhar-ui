// @ts-nocheck
/**
 * Prop types for consumers of the CVA-only API. Keep in sync with the
 * interface(s) in `RadioGroup.lite.tsx`, `RadioGroupItem.lite.tsx`, which are the source of truth.
 */
export interface RadioGroupProps {
  /** The value of the currently selected item */
  value?: string;
  /** Submits the selected value under this name */
  name?: string;
  form?: string;
  /** Disables the whole group */
  disabled?: boolean;
  /** Marks the group as required for form validation */
  required?: boolean;
  /** Layout direction — also drives arrow-key navigation */
  orientation?: 'horizontal' | 'vertical';
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  /**
   * Fires with the value of the item the user picked (click, Space, or arrow
   * keys). Lets the group own selection instead of wiring every item’s onSelect.
   */
  onValueChange?: (value: string) => void;
  children?: any;
}
export interface RadioGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is the selected one */
  checked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  id?: string;
  className?: string;
  /** Classes for the inner selected-state dot */
  indicatorClass?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  /** Fired with this item’s value when the user selects it */
  onSelect?: (value: string) => void;
}