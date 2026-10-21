"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = useState(() => false);

  function isChecked() {
    return props.checked !== undefined ? !!props.checked : internalChecked;
  }

  function classes() {
    return cn(
      checkboxVariants({
        size: props.size,
      }),
      props.className
    );
  }

  function dataState() {
    if (props.indeterminate) return "indeterminate";
    return isChecked() ? "checked" : "unchecked";
  }

  function syncIndeterminate() {
    if (inputRef.current)
      inputRef.current.indeterminate = !!props.indeterminate;
  }

  function handleChange(event: any) {
    const next = !!event.target.checked;
    setInternalChecked(next);
    props.onChange?.(next);
    props.onCheckedChange?.(next);
  }

  const hasInitialized = useRef(false);
  if (!hasInitialized.current) {
    setInternalChecked(!!props.defaultChecked);
    hasInitialized.current = true;
  }

  useEffect(() => {
    syncIndeterminate();
  }, []);
  useEffect(() => {
    syncIndeterminate();
  }, [props.indeterminate]);

  return (
    <input
      type="checkbox"
      ref={inputRef}
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
      onChange={(event) => handleChange(event)}
      className={classes()}
    />
  );
}

export default Checkbox;
