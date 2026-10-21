// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

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

@Component({
  selector: "adhar-input-otp",
  template: `
    <input
      type="text"
      autocomplete="one-time-code"
      autoCorrect="off"
      [attr.value]="value"
      [attr.defaultValue]="defaultValue"
      [attr.maxLength]="maxLength"
      [attr.inputMode]="isNumeric ? 'numeric' : 'text'"
      [attr.pattern]="isNumeric ? '[0-9]*' : undefined"
      [attr.autoCapitalize]="isNumeric ? undefined : 'characters'"
      [attr.spellcheck]="false"
      [attr.disabled]="disabled"
      [attr.required]="required"
      [attr.autoFocus]="autoFocus"
      [attr.name]="name"
      [attr.id]="id"
      [attr.form]="form"
      [attr.placeholder]="placeholder"
      [attr.aria-label]="'aria-label' || 'One-time code'"
      [attr.aria-invalid]="invalid || 'aria-invalid' ? true : undefined"
      [attr.aria-describedby]="'aria-describedby'"
      (input)="handleInput($event)"
      [class]="classes"
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
  @Input() length!: InputOTPProps["length"];
  @Input() inputMode!: InputOTPProps["inputMode"];
  @Input() size!: InputOTPProps["size"];
  @Input() className!: InputOTPProps["className"];
  @Input() onValueChange!: InputOTPProps["onValueChange"];
  @Input() onComplete!: InputOTPProps["onComplete"];
  @Input() value!: InputOTPProps["value"];
  @Input() defaultValue!: InputOTPProps["defaultValue"];
  @Input() disabled!: InputOTPProps["disabled"];
  @Input() required!: InputOTPProps["required"];
  @Input() autoFocus!: InputOTPProps["autoFocus"];
  @Input() name!: InputOTPProps["name"];
  @Input() id!: InputOTPProps["id"];
  @Input() form!: InputOTPProps["form"];
  @Input() placeholder!: InputOTPProps["placeholder"];
  @Input() invalid!: InputOTPProps["invalid"];

  lastLength = 0;
  get maxLength() {
    return this.length || 6;
  }
  get isNumeric() {
    return this.inputMode !== "text";
  }
  get classes() {
    return cn(
      inputOTPVariants({
        size: this.size,
      }),
      this.className
    );
  }
  handleInput(event: any) {
    const raw: string = event.target.value || "";
    let next = this.isNumeric ? raw.replace(/\D/g, "") : raw.replace(/\s/g, "");
    next = next.slice(0, this.maxLength);
    if (next !== raw) event.target.value = next;
    this.onValueChange?.(next);
    if (next.length === this.maxLength && this.lastLength < this.maxLength) {
      this.onComplete?.(next);
    }
    this.lastLength = next.length;
  }
}
