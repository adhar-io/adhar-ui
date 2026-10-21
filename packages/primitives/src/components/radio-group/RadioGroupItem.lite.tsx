import { Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { radioGroupIndicatorVariants, radioGroupItemVariants } from './radio-group.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-radio-group-item' },
});

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

// Tab order is managed by RadioGroup (roving tabindex): only the checked item,
// or the first enabled one, is tabbable, and arrow keys move between items.
export default function RadioGroupItem(props: RadioGroupItemProps) {
  const state = useStore({
    get classes(): string {
      return cn(radioGroupItemVariants({ size: props.size }), props.className);
    },
    get indicatorClasses(): string {
      return cn(radioGroupIndicatorVariants({ size: props.size }), props.indicatorClass);
    },
  });

  return (
    <button
      type='button'
      role='radio'
      id={props.id}
      className={state.classes}
      value={props.value}
      tabIndex={props.checked ? 0 : -1}
      aria-checked={props.checked ? true : false}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      data-state={props.checked ? 'checked' : 'unchecked'}
      disabled={props.disabled}
      onClick={() => (props.disabled ? undefined : props.onSelect?.(props.value))}
    >
      <Show when={props.checked}>
        <span className={state.indicatorClasses} aria-hidden='true' />
      </Show>
    </button>
  );
}
