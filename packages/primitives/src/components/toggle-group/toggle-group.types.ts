import type { ToggleGroupVariants } from './toggle-group.styles.ts';

export interface ToggleGroupProps {
  /** 'single' allows one active item, 'multiple' allows many */
  type?: 'single' | 'multiple';
  orientation?: NonNullable<ToggleGroupVariants>['orientation'];
  /** Render as a joined segmented control */
  attached?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface ToggleGroupItemProps {
  /** The value this item represents */
  value: string;
  /** Whether this item is pressed/on */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  /** Fired with this item's value when activated */
  onToggle?: (value: string) => void;
}
