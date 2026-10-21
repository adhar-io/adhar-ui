// @ts-nocheck
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state when uncontrolled */
  defaultChecked?: boolean;
  /** Shows the mixed (dash) state, e.g. for a "select all" with some rows selected */
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive ring + aria-invalid */
  invalid?: boolean;
  size?: "sm" | "default" | "lg";
  name?: string;
  id?: string;
  form?: string;
  value?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Fires with the next checked state */
  onChange?: (checked: boolean) => void;
  /** Alias of `onChange` */
  onCheckedChange?: (checked: boolean) => void;
}

import { cn } from "@adhar-ui/utils";
import { checkboxVariants } from "./checkbox.styles.ts";

@Component({
  selector: "adhar-checkbox",
  template: `
    <input
      type="checkbox"
      #inputRef
      [attr.checked]="isChecked"
      [attr.disabled]="disabled"
      [attr.required]="required"
      [attr.name]="name"
      [attr.id]="id"
      [attr.form]="form"
      [attr.value]="value"
      [attr.data-state]="dataState"
      [attr.aria-checked]="indeterminate ? 'mixed' : undefined"
      [attr.aria-invalid]="invalid ? true : undefined"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-describedby]="'aria-describedby'"
      (change)="handleChange($event)"
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
export default class Checkbox {
  @Input() defaultChecked!: CheckboxProps["defaultChecked"];
  @Input() indeterminate!: CheckboxProps["indeterminate"];
  @Input() checked!: CheckboxProps["checked"];
  @Input() size!: CheckboxProps["size"];
  @Input() className!: CheckboxProps["className"];
  @Input() onChange!: CheckboxProps["onChange"];
  @Input() onCheckedChange!: CheckboxProps["onCheckedChange"];
  @Input() disabled!: CheckboxProps["disabled"];
  @Input() required!: CheckboxProps["required"];
  @Input() name!: CheckboxProps["name"];
  @Input() id!: CheckboxProps["id"];
  @Input() form!: CheckboxProps["form"];
  @Input() value!: CheckboxProps["value"];
  @Input() invalid!: CheckboxProps["invalid"];

  @ViewChild("inputRef") inputRef!: ElementRef;

  internalChecked = false;
  get isChecked() {
    return this.checked !== undefined ? !!this.checked : this.internalChecked;
  }
  get classes() {
    return cn(
      checkboxVariants({
        size: this.size,
      }),
      this.className
    );
  }
  get dataState() {
    if (this.indeterminate) return "indeterminate";
    return this.isChecked ? "checked" : "unchecked";
  }
  syncIndeterminate() {
    if (this.inputRef?.nativeElement)
      this.inputRef!.nativeElement.indeterminate = !!this.indeterminate;
  }
  handleChange(event: any) {
    const next = !!event.target.checked;
    this.internalChecked = next;
    this.onChange?.(next);
    this.onCheckedChange?.(next);
  }

  ngOnInit() {
    this.internalChecked = !!this.defaultChecked;

    if (typeof window !== "undefined") {
      this.syncIndeterminate();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      this.syncIndeterminate();
    }
  }
}
