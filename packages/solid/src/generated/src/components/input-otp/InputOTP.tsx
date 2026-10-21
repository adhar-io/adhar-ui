// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface InputOTPProps {
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  /** Number of digits/characters (maxLength). Default 6. */
  length?: number;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  form?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
  placeholder?: string;
  /**
   * "numeric" (default) shows the number pad and strips non-digits.
   * "text" allows alphanumeric codes.
   */
  inputMode?: "numeric" | "text";
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  /** Fired on every change with the current value */
  onValueChange?: (value: string) => void;
  /** Fired once each time the value reaches `length` characters */
  onComplete?: (value: string) => void;
}

import { cn } from "@adhar-ui/utils";
import { inputOTPVariants } from "./input-otp.styles.ts";

function InputOTP(props: InputOTPProps) {
  const [lastLength, setLastLength] = createSignal(0);

  const maxLength = createMemo(() => {
    return props.length || 6;
  });

  const isNumeric = createMemo(() => {
    return props.inputMode !== "text";
  });

  const classes = createMemo(() => {
    return cn(
      inputOTPVariants({
        size: props.size,
      }),
      props.className
    );
  });

  function handleInput(event: any) {
    const raw: string = event.target.value || "";
    let next = isNumeric() ? raw.replace(/\D/g, "") : raw.replace(/\s/g, "");
    next = next.slice(0, maxLength());
    if (next !== raw) event.target.value = next;
    props.onValueChange?.(next);
    if (next.length === maxLength() && lastLength() < maxLength()) {
      props.onComplete?.(next);
    }
    setLastLength(next.length);
  }

  return (
    <input
      class={classes()}
      type="text"
      autoComplete="one-time-code"
      autoCorrect="off"
      value={props.value}
      defaultValue={props.defaultValue}
      maxLength={maxLength()}
      inputMode={isNumeric() ? "numeric" : "text"}
      pattern={isNumeric() ? "[0-9]*" : undefined}
      autoCapitalize={isNumeric() ? undefined : "characters"}
      spellcheck={false}
      disabled={props.disabled}
      required={props.required}
      autoFocus={props.autoFocus}
      name={props.name}
      id={props.id}
      form={props.form}
      placeholder={props.placeholder}
      aria-label={props["aria-label"] || "One-time code"}
      aria-invalid={props.invalid || props["aria-invalid"] ? true : undefined}
      aria-describedby={props["aria-describedby"]}
      onInput={(event) => handleInput(event)}
    />
  );
}

export default InputOTP;
