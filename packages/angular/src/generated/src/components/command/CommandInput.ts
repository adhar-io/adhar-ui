// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  wrapperClass?: string;
  "aria-label"?: string;
  /** ID of the listbox this input controls (for combobox semantics) */
  "aria-controls"?: string;
  /** ID of the highlighted CommandItem, so screen readers follow the highlight */
  "aria-activedescendant"?: string;
  onValueChange?: (value: string) => void;
  onKeyDown?: (event: any) => void;
}

import { cn } from "@adhar-ui/utils";
import {
  commandInputVariants,
  commandInputWrapperVariants,
} from "./command.styles.ts";

@Component({
  selector: "adhar-command-input",
  template: `
    <div [class]="wrapperClasses">
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
        class="shrink-0 text-muted-foreground"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
      <input
        type="text"
        role="combobox"
        aria-expanded="true"
        aria-autocomplete="list"
        autocomplete="off"
        autoCorrect="off"
        [attr.aria-controls]="'aria-controls'"
        [attr.aria-activedescendant]="'aria-activedescendant'"
        [attr.aria-label]="'aria-label' || 'Search'"
        [attr.placeholder]="placeholder"
        [attr.value]="value"
        [attr.disabled]="disabled"
        [attr.autoFocus]="autoFocus"
        [attr.spellcheck]="false"
        (input)="handleInput($event)"
        (keydown)="onKeyDown?.($event)"
        [class]="classes"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export default class CommandInput {
  @Input() className!: CommandInputProps["className"];
  @Input() wrapperClass!: CommandInputProps["wrapperClass"];
  @Input() onValueChange!: CommandInputProps["onValueChange"];
  @Input() placeholder!: CommandInputProps["placeholder"];
  @Input() value!: CommandInputProps["value"];
  @Input() disabled!: CommandInputProps["disabled"];
  @Input() autoFocus!: CommandInputProps["autoFocus"];
  @Input() onKeyDown!: CommandInputProps["onKeyDown"];

  get classes() {
    return cn(commandInputVariants(), this.className);
  }
  get wrapperClasses() {
    return cn(commandInputWrapperVariants(), this.wrapperClass);
  }
  handleInput(event: any) {
    this.onValueChange?.(event.target.value);
  }
}
