// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface InputProps {
  type?: string;
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** @deprecated Use `readOnly` */
  readonly?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  name?: string;
  id?: string;
  form?: string;
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
  /** File inputs: accepted types, e.g. "image/*" */
  accept?: string;
  /** File / email inputs: allow multiple values */
  multiple?: boolean;
  list?: string;
  title?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-errormessage"?: string;
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  /** Fires on every keystroke with the current string value */
  onValueChange?: (value: string) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}

import { cn } from "@adhar-ui/utils";
import { inputVariants } from "./input.styles.ts";

@Component({
  selector: "adhar-input",
  template: `
    <input
      [attr.type]="type || 'text'"
      [attr.placeholder]="placeholder"
      [attr.value]="value"
      [attr.defaultValue]="defaultValue"
      [attr.disabled]="disabled"
      [attr.readOnly]="readOnly || readonly"
      [attr.required]="required"
      [attr.name]="name"
      [attr.id]="id"
      [attr.form]="form"
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
      [attr.accept]="accept"
      [attr.multiple]="multiple"
      [attr.list]="list"
      [attr.title]="title"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.aria-invalid]="invalid || 'aria-invalid' ? true : undefined"
      [attr.aria-errormessage]="'aria-errormessage'"
      (change)="onChange?.($event)"
      (input)="handleInput($event)"
      (focus)="onFocus?.($event)"
      (blur)="onBlur?.($event)"
      (keydown)="onKeyDown?.($event)"
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
export default class Input {
  @Input() size!: InputProps["size"];
  @Input() variant!: InputProps["variant"];
  @Input() className!: InputProps["className"];
  @Input() onInput!: InputProps["onInput"];
  @Input() onValueChange!: InputProps["onValueChange"];
  @Input() type!: InputProps["type"];
  @Input() placeholder!: InputProps["placeholder"];
  @Input() value!: InputProps["value"];
  @Input() defaultValue!: InputProps["defaultValue"];
  @Input() disabled!: InputProps["disabled"];
  @Input() readOnly!: InputProps["readOnly"];
  @Input() readonly!: InputProps["readonly"];
  @Input() required!: InputProps["required"];
  @Input() name!: InputProps["name"];
  @Input() id!: InputProps["id"];
  @Input() form!: InputProps["form"];
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
  @Input() accept!: InputProps["accept"];
  @Input() multiple!: InputProps["multiple"];
  @Input() list!: InputProps["list"];
  @Input() title!: InputProps["title"];
  @Input() invalid!: InputProps["invalid"];
  @Input() onChange!: InputProps["onChange"];
  @Input() onFocus!: InputProps["onFocus"];
  @Input() onBlur!: InputProps["onBlur"];
  @Input() onKeyDown!: InputProps["onKeyDown"];

  get classes() {
    return cn(
      inputVariants({
        size: this.size,
        variant: this.variant,
      }),
      this.className
    );
  }
  handleInput(event: any) {
    this.onInput?.(event);
    this.onValueChange?.(event.target.value);
  }
}
