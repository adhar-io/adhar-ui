// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "ghost" | "flush";
  /** Native autocomplete hint (e.g. "email", "current-password", "off") */
  autoComplete?: string;
  /** Virtual keyboard hint on touch devices */
  inputMode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  /** Enter-key label on virtual keyboards */
  enterKeyHint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send";
  autoFocus?: boolean;
  spellcheck?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  /** Min value / date for numeric & date inputs */
  min?: string | number;
  /** Max value / date for numeric & date inputs */
  max?: string | number;
  /** Step increment for numeric & date inputs */
  step?: string | number;
  list?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-errormessage"?: string;
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}

@Component({
  selector: "input",
  template: `
    <input
      [attr.type]="type || 'text'"
      [attr.placeholder]="placeholder"
      [attr.value]="value"
      [attr.defaultValue]="defaultValue"
      [attr.disabled]="disabled"
      [attr.readOnly]="readonly"
      [attr.required]="required"
      [attr.name]="name"
      [attr.id]="id"
      [attr.autoComplete]="autoComplete"
      [attr.inputMode]="inputMode"
      [attr.enterKeyHint]="enterKeyHint"
      [attr.autoFocus]="autoFocus"
      [attr.spellcheck]="spellcheck"
      [attr.maxLength]="maxLength"
      [attr.minLength]="minLength"
      [attr.pattern]="pattern"
      [attr.min]="min"
      [attr.max]="max"
      [attr.step]="step"
      [attr.list]="list"
      [attr.aria-label]="'aria-label'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.aria-invalid]="'aria-invalid'"
      [attr.aria-errormessage]="'aria-errormessage'"
      (change)="onChange?.($event)"
      (input)="onInput?.($event)"
      (focus)="onFocus?.($event)"
      (blur)="onBlur?.($event)"
      (keydown)="onKeyDown?.($event)"
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
export default class Input {
  @Input() type!: InputProps["type"];
  @Input() placeholder!: InputProps["placeholder"];
  @Input() value!: InputProps["value"];
  @Input() defaultValue!: InputProps["defaultValue"];
  @Input() disabled!: InputProps["disabled"];
  @Input() readonly!: InputProps["readonly"];
  @Input() required!: InputProps["required"];
  @Input() name!: InputProps["name"];
  @Input() id!: InputProps["id"];
  @Input() autoComplete!: InputProps["autoComplete"];
  @Input() inputMode!: InputProps["inputMode"];
  @Input() enterKeyHint!: InputProps["enterKeyHint"];
  @Input() autoFocus!: InputProps["autoFocus"];
  @Input() spellcheck!: InputProps["spellcheck"];
  @Input() maxLength!: InputProps["maxLength"];
  @Input() minLength!: InputProps["minLength"];
  @Input() pattern!: InputProps["pattern"];
  @Input() min!: InputProps["min"];
  @Input() max!: InputProps["max"];
  @Input() step!: InputProps["step"];
  @Input() list!: InputProps["list"];
  @Input() onChange!: InputProps["onChange"];
  @Input() onInput!: InputProps["onInput"];
  @Input() onFocus!: InputProps["onFocus"];
  @Input() onBlur!: InputProps["onBlur"];
  @Input() onKeyDown!: InputProps["onKeyDown"];
  @Input() className!: InputProps["className"];
}
