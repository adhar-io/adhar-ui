// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SwitchProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state when uncontrolled */
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: "sm" | "default" | "lg";
  /** Submits `value` (default "on") under this name when checked */
  name?: string;
  value?: string;
  form?: string;
  id?: string;
  className?: string;
  thumbClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Fires with the next checked state */
  onChange?: (checked: boolean) => void;
  /** Alias of `onChange` */
  onCheckedChange?: (checked: boolean) => void;
}

import { cn } from "@adhar-ui/utils";
import { switchThumbVariants, switchVariants } from "./switch.styles.ts";

@Component({
  selector: "adhar-switch",
  template: `
    <button
      type="button"
      role="switch"
      [attr.id]="id"
      [attr.aria-checked]="isChecked"
      [attr.aria-required]="required ? true : undefined"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.data-state]="dataState"
      [attr.disabled]="disabled"
      (click)="handleClick()"
      [class]="classes"
    >
      <span [attr.data-state]="dataState" [class]="thumbClasses"></span>
      <ng-container *ngIf="name && isChecked"
        ><input
          type="hidden"
          [attr.name]="name"
          [attr.value]="value || 'on'"
          [attr.form]="form"
      /></ng-container>
    </button>
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
export default class Switch {
  @Input() defaultChecked!: SwitchProps["defaultChecked"];
  @Input() checked!: SwitchProps["checked"];
  @Input() size!: SwitchProps["size"];
  @Input() className!: SwitchProps["className"];
  @Input() thumbClass!: SwitchProps["thumbClass"];
  @Input() disabled!: SwitchProps["disabled"];
  @Input() onChange!: SwitchProps["onChange"];
  @Input() onCheckedChange!: SwitchProps["onCheckedChange"];
  @Input() id!: SwitchProps["id"];
  @Input() required!: SwitchProps["required"];
  @Input() name!: SwitchProps["name"];
  @Input() value!: SwitchProps["value"];
  @Input() form!: SwitchProps["form"];

  internalChecked = false;
  get isChecked() {
    return this.checked !== undefined ? !!this.checked : this.internalChecked;
  }
  get dataState() {
    return this.isChecked ? "checked" : "unchecked";
  }
  get classes() {
    return cn(
      switchVariants({
        size: this.size,
      }),
      this.className
    );
  }
  get thumbClasses() {
    return cn(
      switchThumbVariants({
        size: this.size,
      }),
      this.thumbClass
    );
  }
  handleClick() {
    if (this.disabled) return;
    const next = !this.isChecked;
    this.internalChecked = next;
    this.onChange?.(next);
    this.onCheckedChange?.(next);
  }

  ngOnInit() {
    this.internalChecked = !!this.defaultChecked;
  }
}
