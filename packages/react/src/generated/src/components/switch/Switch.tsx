"use client";
import * as React from "react";
import { useState, useRef } from "react";

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
  const [internalChecked, setInternalChecked] = useState(() => false);

  function isChecked() {
    return props.checked !== undefined ? !!props.checked : internalChecked;
  }

  function dataState() {
    return isChecked() ? "checked" : "unchecked";
  }

  function classes() {
    return cn(
      switchVariants({
        size: props.size,
      }),
      props.className
    );
  }

  function thumbClasses() {
    return cn(
      switchThumbVariants({
        size: props.size,
      }),
      props.thumbClass
    );
  }

  function handleClick() {
    if (props.disabled) return;
    const next = !isChecked();
    setInternalChecked(next);
    props.onChange?.(next);
    props.onCheckedChange?.(next);
  }

  const hasInitialized = useRef(false);
  if (!hasInitialized.current) {
    setInternalChecked(!!props.defaultChecked);
    hasInitialized.current = true;
  }

  return (
    <button
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
      className={classes()}
    >
      <span data-state={dataState()} className={thumbClasses()} />
      {props.name && isChecked() ? (
        <input
          type="hidden"
          name={props.name}
          value={props.value || "on"}
          form={props.form}
        />
      ) : null}
    </button>
  );
}

export default Switch;
