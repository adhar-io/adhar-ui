// @ts-nocheck
import { Show } from "solid-js";

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
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Fired with this item's value when the user selects it */
  onSelect?: (value: string) => void;
}

function RadioGroupItem(props: RadioGroupItemProps) {
  return (
    <button
      class={props.className}
      type="button"
      role="radio"
      id={props.id}
      value={props.value}
      aria-checked={props.checked ? true : false}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      disabled={props.disabled}
      onClick={(event) =>
        props.disabled ? undefined : props.onSelect?.(props.value)
      }
      onKeyDown={(event) => {
        if ((event.key === " " || event.key === "Enter") && !props.disabled) {
          event.preventDefault();
          props.onSelect?.(props.value);
        }
      }}
    >
      <Show when={props.checked}>
        <span class={props.indicatorClass} aria-hidden="true"></span>
      </Show>
    </button>
  );
}

export default RadioGroupItem;
