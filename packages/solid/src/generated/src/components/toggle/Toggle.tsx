// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface ToggleProps {
  /** Whether the toggle is currently pressed/on (controlled) */
  pressed?: boolean;
  /** Initial pressed state when uncontrolled */
  defaultPressed?: boolean;
  disabled?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
  id?: string;
  title?: string;
  "aria-label"?: string;
  /** Fired with the next pressed state when activated */
  onPressedChange?: (pressed: boolean) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { toggleVariants } from "./toggle.styles.ts";

function Toggle(props: ToggleProps) {
  const [internalPressed, setInternalPressed] = createSignal(false);

  const isPressed = createMemo(() => {
    return props.pressed !== undefined ? !!props.pressed : internalPressed();
  });

  const classes = createMemo(() => {
    return cn(
      toggleVariants({
        variant: props.variant,
        size: props.size,
      }),
      props.className
    );
  });

  function handleClick() {
    if (props.disabled) return;
    const next = !isPressed();
    setInternalPressed(next);
    props.onPressedChange?.(next);
  }

  setInternalPressed(!!props.defaultPressed);

  return (
    <button
      class={classes()}
      type="button"
      id={props.id}
      title={props.title}
      aria-pressed={isPressed()}
      aria-label={props["aria-label"]}
      data-state={isPressed() ? "on" : "off"}
      disabled={props.disabled}
      onClick={(event) => handleClick()}
    >
      {props.children}
    </button>
  );
}

export default Toggle;
