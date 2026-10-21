// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SelectProps {
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  name?: string;
  id?: string;
  form?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
  /**
   * Text shown while nothing is selected. Rendered as an empty-valued option,
   * so `required` validation fails until the user picks a real option.
   */
  placeholder?: string;
  autoComplete?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  onChange?: (event: any) => void;
  /** Fires with the newly selected option’s value */
  onValueChange?: (value: string) => void;
  onBlur?: (event: any) => void;
  /** <option> / <optgroup> elements */
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { selectTriggerVariants } from "./select.styles.ts";

@Component({
  selector: "adhar-select",
  template: `
    <select
      [attr.value]="value"
      [attr.defaultValue]="defaultValue"
      [attr.disabled]="disabled"
      [attr.required]="required"
      [attr.name]="name"
      [attr.id]="id"
      [attr.form]="form"
      [attr.autoComplete]="autoComplete"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.aria-invalid]="invalid ? true : undefined"
      (change)="handleChange($event)"
      (blur)="onBlur?.($event)"
      [class]="classes"
    >
      <ng-container *ngIf="placeholder"
        ><option value="" [attr.hidden]="true">
          {{placeholder}}
        </option></ng-container
      >
      <ng-content></ng-content>
    </select>
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
export default class Select {
  @Input() size!: SelectProps["size"];
  @Input() className!: SelectProps["className"];
  @Input() onChange!: SelectProps["onChange"];
  @Input() onValueChange!: SelectProps["onValueChange"];
  @Input() value!: SelectProps["value"];
  @Input() defaultValue!: SelectProps["defaultValue"];
  @Input() disabled!: SelectProps["disabled"];
  @Input() required!: SelectProps["required"];
  @Input() name!: SelectProps["name"];
  @Input() id!: SelectProps["id"];
  @Input() form!: SelectProps["form"];
  @Input() autoComplete!: SelectProps["autoComplete"];
  @Input() invalid!: SelectProps["invalid"];
  @Input() onBlur!: SelectProps["onBlur"];
  @Input() placeholder!: SelectProps["placeholder"];

  get classes() {
    return cn(
      selectTriggerVariants({
        size: this.size,
      }),
      this.className
    );
  }
  handleChange(event: any) {
    this.onChange?.(event);
    this.onValueChange?.(event.target.value);
  }
}
