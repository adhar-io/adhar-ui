// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TextareaProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  name?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
}

@Component({
  selector: "textarea",
  template: `
    <textarea
      [attr.placeholder]="placeholder"
      [attr.value]="value"
      [attr.disabled]="disabled"
      [attr.readOnly]="readonly"
      [attr.required]="required"
      [attr.rows]="rows || 3"
      [attr.name]="name"
      [attr.id]="id"
      [attr.aria-label]="'aria-label'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.aria-invalid]="'aria-invalid'"
      (change)="onChange?.($event)"
      (focus)="onFocus?.($event)"
      (blur)="onBlur?.($event)"
      [class]="className"
    ></textarea>
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
export default class Textarea {
  @Input() placeholder!: TextareaProps["placeholder"];
  @Input() value!: TextareaProps["value"];
  @Input() disabled!: TextareaProps["disabled"];
  @Input() readonly!: TextareaProps["readonly"];
  @Input() required!: TextareaProps["required"];
  @Input() rows!: TextareaProps["rows"];
  @Input() name!: TextareaProps["name"];
  @Input() id!: TextareaProps["id"];
  @Input() onChange!: TextareaProps["onChange"];
  @Input() onFocus!: TextareaProps["onFocus"];
  @Input() onBlur!: TextareaProps["onBlur"];
  @Input() className!: TextareaProps["className"];
}
