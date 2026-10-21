"use client";
import * as React from "react";

export interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Shows a spinner, sets aria-busy, and blocks interaction */
  loading?: boolean;
  /** Text announced by screen readers while loading (defaults to "Loading") */
  loadingText?: string;
  /** Stretches the button to fill its container */
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  id?: string;
  title?: string;
  name?: string;
  value?: string;
  form?: string;
  autoFocus?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
  "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { buttonVariants } from "./button.styles.ts";

function Button(props: ButtonProps) {
  function classes() {
    return cn(
      buttonVariants({
        variant: props.variant,
        size: props.size,
        fullWidth: !!props.fullWidth,
      }),
      props.className
    );
  }

  function isIconOnly() {
    return !!props.size && props.size.indexOf("icon") === 0;
  }

  function isInactive() {
    return !!props.disabled || !!props.loading;
  }

  return (
    <button
      id={props.id}
      title={props.title}
      disabled={isInactive()}
      type={props.type || "button"}
      name={props.name}
      value={props.value}
      form={props.form}
      autoFocus={props.autoFocus}
      aria-busy={props.loading ? true : undefined}
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
      aria-controls={props["aria-controls"]}
      aria-expanded={props["aria-expanded"]}
      aria-pressed={props["aria-pressed"]}
      aria-haspopup={props["aria-haspopup"]}
      data-loading={props.loading ? "" : undefined}
      onClick={(event) => {
        if (!isInactive()) props.onClick?.(event);
      }}
      onFocus={(event) => props.onFocus?.(event)}
      onBlur={(event) => props.onBlur?.(event)}
      onKeyDown={(event) => props.onKeyDown?.(event)}
      className={classes()}
    >
      {props.loading ? (
        <>
          <span
            aria-hidden="true"
            className="inline-block size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none"
          />
          <span className="sr-only">{props.loadingText || "Loading"}</span>
        </>
      ) : null}
      {!(props.loading && isIconOnly()) ? <>{props.children}</> : null}
    </button>
  );
}

export default Button;
