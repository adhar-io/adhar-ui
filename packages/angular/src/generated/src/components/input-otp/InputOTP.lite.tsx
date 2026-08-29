// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface InputOTPProps {
  value?: string;
  /** Number of digits/characters (maxLength). Default 6. */
  length?: number;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  /** Fired on every change with the current value */
  onValueChange?: (value: string) => void;
  /** Fired once the value reaches `length` characters */
  onComplete?: (value: string) => void;
}

@Component({
  selector: "input-otp",
  template: `
    <input
      type="text"
      autocomplete="one-time-code"
      autoCorrect="off"
      [attr.value]="value"
      [attr.maxLength]="length || 6"
      [attr.inputMode]="inputMode || 'numeric'"
      [attr.spellcheck]="false"
      [attr.disabled]="disabled"
      [attr.name]="name"
      [attr.id]="id"
      [attr.placeholder]="placeholder"
      [attr.aria-label]="'aria-label' || 'One-time code'"
      [attr.aria-invalid]="'aria-invalid'"
      [attr.aria-describedby]="'aria-describedby'"
      (input)="
          onValueChange?.($event.target.value);
          if ($event.target.value.length >= (length || 6)) {
            onComplete?.($event.target.value);
          }
        "
      [class]="className"
    />
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
export default class InputOTP {
  @Input() value!: InputOTPProps["value"];
  @Input() length!: InputOTPProps["length"];
  @Input() inputMode!: InputOTPProps["inputMode"];
  @Input() disabled!: InputOTPProps["disabled"];
  @Input() name!: InputOTPProps["name"];
  @Input() id!: InputOTPProps["id"];
  @Input() placeholder!: InputOTPProps["placeholder"];
  @Input() onValueChange!: InputOTPProps["onValueChange"];
  @Input() onComplete!: InputOTPProps["onComplete"];
  @Input() className!: InputOTPProps["className"];
}
