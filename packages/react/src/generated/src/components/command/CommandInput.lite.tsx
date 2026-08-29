// @ts-nocheck
"use client";
import * as React from "react";

export interface CommandInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  wrapperClass?: string;
  "aria-label"?: string;
  /** ID of the listbox this input controls (for combobox semantics) */
  "aria-controls"?: string;
  onValueChange?: (value: string) => void;
  onKeyDown?: (event: any) => void;
}

function CommandInput(props: CommandInputProps) {
  return (
    <div className={props.wrapperClass}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0 text-muted-foreground"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        role="combobox"
        aria-expanded="true"
        aria-autocomplete="list"
        autoComplete="off"
        autoCorrect="off"
        aria-controls={props["aria-controls"]}
        aria-label={props["aria-label"] || "Search"}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        spellCheck={false}
        onInput={(event) => props.onValueChange?.(event.target.value)}
        onKeyDown={(event) => props.onKeyDown?.(event)}
        className={props.className}
      />
    </div>
  );
}

export default CommandInput;
