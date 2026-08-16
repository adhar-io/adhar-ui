import { Show, useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface RadioGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is the selected one */
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  /** Classes for the inner selected-state dot */
  indicatorClass?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Fired with this item's value when the user selects it */
  onSelect?: (value: string) => void;
}

export default function RadioGroupItem(props: RadioGroupItemProps) {
  return (
    <button
      type='button'
      role='radio'
      id={props.id}
      className={props.className}
      value={props.value}
      aria-checked={props.checked ? true : false}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      disabled={props.disabled}
      onClick={() => (props.disabled ? undefined : props.onSelect?.(props.value))}
      onKeyDown={(event) => {
        if ((event.key === ' ' || event.key === 'Enter') && !props.disabled) {
          event.preventDefault();
          props.onSelect?.(props.value);
        }
      }}
    >
      <Show when={props.checked}>
        <span className={props.indicatorClass} aria-hidden='true' />
      </Show>
    </button>
  );
}
