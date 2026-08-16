import type { RadioGroupItemVariants, RadioGroupVariants } from './radio-group.styles.ts';

export interface RadioGroupProps {
  /** The value of the currently selected item (controlled) */
  value?: string;
  /** Form field name */
  name?: string;
  /** Disables the entire group */
  disabled?: boolean;
  /** Marks the group as required */
  required?: boolean;
  /** Layout & arrow-key navigation direction */
  orientation?: NonNullable<RadioGroupVariants>['orientation'];
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface RadioGroupItemProps {
  /** The value this item represents */
  value: string;
  /** Whether this item is currently selected */
  checked?: boolean;
  /** Disables this item only */
  disabled?: boolean;
  /** Size of the radio control */
  size?: NonNullable<RadioGroupItemVariants>['size'];
  id?: string;
  className?: string;
  indicatorClass?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Fired with this item's value on selection */
  onSelect?: (value: string) => void;
}
