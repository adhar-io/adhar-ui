import { useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { toggleGroupVariants } from './toggle-group.styles.ts';
import { rovingFocus } from '../_internal/dom.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-toggle-group' },
});

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

export default function ToggleGroup(props: ToggleGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  const state = useStore({
    get classes(): string {
      return cn(
        toggleGroupVariants({ orientation: props.orientation, attached: !!props.attached }),
        props.className,
      );
    },
    handleKeyDown(event: any) {
      rovingFocus(event, groupRef, 'button', {
        orientation: props.orientation === 'vertical' ? 'vertical' : 'horizontal',
        loop: props.loop !== false,
      });
    },
    handleClick(event: any) {
      if (props.disabled || !props.onValueChange) return;
      const item = event.target.closest ? event.target.closest('button[value]') : null;
      if (!item || item.disabled || !groupRef || !groupRef.contains(item)) return;
      const itemValue: string = item.getAttribute('value') || '';
      if (props.type === 'multiple') {
        const current: string[] = Array.isArray(props.value) ? props.value : [];
        const next = current.indexOf(itemValue) >= 0
          ? current.filter((v) => v !== itemValue)
          : current.concat([itemValue]);
        props.onValueChange(next);
      } else {
        props.onValueChange(props.value === itemValue ? '' : itemValue);
      }
    },
  });

  return (
    <div
      ref={groupRef}
      className={state.classes}
      role='group'
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-disabled={props.disabled ? true : undefined}
      data-type={props.type || 'single'}
      data-orientation={props.orientation || 'horizontal'}
      onKeyDown={(event) => state.handleKeyDown(event)}
      onClick={(event) => state.handleClick(event)}
    >
      {props.children}
    </div>
  );
}
