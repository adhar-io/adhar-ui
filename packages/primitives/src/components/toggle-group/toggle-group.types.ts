/**
 * Prop types for consumers of the CVA-only API. Keep in sync with the
 * interface(s) in `ToggleGroup.lite.tsx`, `ToggleGroupItem.lite.tsx`, which are the source of truth.
 */
export interface ToggleGroupProps {
  /** ’single’ allows one active item, ’multiple’ allows many */
  type?: 'single' | 'multiple';
  /**
   * Current value — a string for type="single" (’’ when nothing is pressed),
   * an array of strings for type="multiple". Used to compute `onValueChange`.
   */
  value?: string | string[];
  orientation?: 'horizontal' | 'vertical';
  /** Segmented-control look: items share borders with no gaps */
  attached?: boolean;
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /**
   * Fires with the next value when an item is activated: the item’s value or
   * ’’ (single), or the toggled array (multiple).
   */
  onValueChange?: (value: any) => void;
  children?: any;
}
export interface ToggleGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is currently pressed/on */
  pressed?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  id?: string;
  title?: string;
  'aria-label'?: string;
  /** Fired with this item’s value when activated */
  onToggle?: (value: string) => void;
  children?: any;
}
