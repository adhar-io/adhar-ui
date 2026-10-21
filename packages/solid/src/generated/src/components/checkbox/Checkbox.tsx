// @ts-nocheck
import { onMount, on, createEffect, createMemo, createSignal } from "solid-js";

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state when uncontrolled */
  defaultChecked?: boolean;
  /** Shows the mixed (dash) state, e.g. for a "select all" with some rows selected */
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive ring + aria-invalid */
  invalid?: boolean;
  size?: "sm" | "default" | "lg";
  name?: string;
  id?: string;
  form?: string;
  value?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Fires with the next checked state */
  onChange?: (checked: boolean) => void;
  /** Alias of `onChange` */
  onCheckedChange?: (checked: boolean) => void;
}

import { cn } from "@adhar-ui/utils";
import { checkboxVariants } from "./checkbox.styles.ts";

function Checkbox(props: CheckboxProps) {
  const [internalChecked, setInternalChecked] = createSignal(false);

  const isChecked = createMemo(() => {
    return props.checked !== undefined ? !!props.checked : internalChecked();
  });

  const classes = createMemo(() => {
    return cn(
      checkboxVariants({
        size: props.size,
      }),
      props.className
    );
  });

  const dataState = createMemo(() => {
    if (props.indeterminate) return "indeterminate";
    return isChecked() ? "checked" : "unchecked";
  });

  function syncIndeterminate() {
    if (inputRef) inputRef.indeterminate = !!props.indeterminate;
  }

  function handleChange(event: any) {
    const next = !!event.target.checked;
    setInternalChecked(next);
    props.onChange?.(next);
    props.onCheckedChange?.(next);
  }

  let inputRef: HTMLInputElement;

  setInternalChecked(!!props.defaultChecked);

  onMount(() => {
    syncIndeterminate();
  });

  const onUpdateFn_0_props_indeterminate = createMemo(
    () => props.indeterminate
  );
  function onUpdateFn_0() {
    syncIndeterminate();
  }
  createEffect(on(() => [onUpdateFn_0_props_indeterminate()], onUpdateFn_0));

  return (
    <input
      class={classes()}
      type="checkbox"
      ref={inputRef!}
      checked={isChecked()}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      id={props.id}
      form={props.form}
      value={props.value}
      data-state={dataState()}
      aria-checked={props.indeterminate ? "mixed" : undefined}
      aria-invalid={props.invalid ? true : undefined}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      aria-describedby={props["aria-describedby"]}
      onInput={(event) => handleChange(event)}
    />
  );
}

export default Checkbox;
