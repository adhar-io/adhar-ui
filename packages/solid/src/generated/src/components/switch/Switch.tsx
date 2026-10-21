// @ts-nocheck
import { Show, createSignal, createMemo } from "solid-js";

export interface SwitchProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state when uncontrolled */
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: "sm" | "default" | "lg";
  /** Submits `value` (default "on") under this name when checked */
  name?: string;
  value?: string;
  form?: string;
  id?: string;
  className?: string;
  thumbClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Fires with the next checked state */
  onChange?: (checked: boolean) => void;
  /** Alias of `onChange` */
  onCheckedChange?: (checked: boolean) => void;
}

import { cn } from "@adhar-ui/utils";
import { switchThumbVariants, switchVariants } from "./switch.styles.ts";

function Switch(props: SwitchProps) {
  const [internalChecked, setInternalChecked] = createSignal(false);

  const isChecked = createMemo(() => {
    return props.checked !== undefined ? !!props.checked : internalChecked();
  });

  const dataState = createMemo(() => {
    return isChecked() ? "checked" : "unchecked";
  });

  const classes = createMemo(() => {
    return cn(
      switchVariants({
        size: props.size,
      }),
      props.className
    );
  });

  const thumbClasses = createMemo(() => {
    return cn(
      switchThumbVariants({
        size: props.size,
      }),
      props.thumbClass
    );
  });

  function handleClick() {
    if (props.disabled) return;
    const next = !isChecked();
    setInternalChecked(next);
    props.onChange?.(next);
    props.onCheckedChange?.(next);
  }

  setInternalChecked(!!props.defaultChecked);

  return (
    <button
      class={classes()}
      type="button"
      role="switch"
      id={props.id}
      aria-checked={isChecked()}
      aria-required={props.required ? true : undefined}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      aria-describedby={props["aria-describedby"]}
      data-state={dataState()}
      disabled={props.disabled}
      onClick={(event) => handleClick()}
    >
      <span class={thumbClasses()} data-state={dataState()}></span>
      <Show when={props.name && isChecked()}>
        <input
          type="hidden"
          name={props.name}
          value={props.value || "on"}
          form={props.form}
        />
      </Show>
    </button>
  );
}

export default Switch;
