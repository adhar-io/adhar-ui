import { onMount, onUpdate, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { radioGroupVariants } from './radio-group.styles.ts';
import { rovingFocus, syncTabStops } from '../_internal/dom.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-radio-group' },
});

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

export default function RadioGroup(props: RadioGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);

  const state = useStore({
    get classes(): string {
      return cn(radioGroupVariants({ orientation: props.orientation }), props.className);
    },
    syncTabs() {
      syncTabStops(groupRef, '[role="radio"]', '[aria-checked="true"]');
    },
    handleKeyDown(event: any) {
      if (props.disabled) return;
      rovingFocus(event, groupRef, '[role="radio"]', {
        orientation: 'both',
        loop: props.loop !== false,
        activate: true,
      });
    },
    handleClick(event: any) {
      if (props.disabled) return;
      const item = event.target.closest ? event.target.closest('[role="radio"]') : null;
      if (!item || item.disabled || !groupRef || !groupRef.contains(item)) return;
      props.onValueChange?.(item.getAttribute('value') || '');
    },
  });

  onMount(() => {
    state.syncTabs();
  });

  onUpdate(() => {
    /* Wait for items to re-render their aria-checked before picking the tab stop. */
    setTimeout(() => state.syncTabs());
  }, [props.value]);

  return (
    <div
      ref={groupRef}
      className={state.classes}
      id={props.id}
      role='radiogroup'
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      aria-orientation={props.orientation || 'vertical'}
      aria-required={props.required ? true : undefined}
      aria-disabled={props.disabled ? true : undefined}
      data-orientation={props.orientation || 'vertical'}
      data-disabled={props.disabled ? '' : undefined}
      onKeyDown={(event) => state.handleKeyDown(event)}
      onClick={(event) => state.handleClick(event)}
    >
      {props.children}
      <Show when={props.name}>
        <input type='hidden' name={props.name} value={props.value || ''} form={props.form} />
      </Show>
    </div>
  );
}
