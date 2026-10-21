// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface RadioGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is the selected one */
  checked?: boolean;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  id?: string;
  className?: string;
  /** Classes for the inner selected-state dot */
  indicatorClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Fired with this item’s value when the user selects it */
  onSelect?: (value: string) => void;
}

// Tab order is managed by RadioGroup (roving tabindex): only the checked item,
// or the first enabled one, is tabbable, and arrow keys move between items.

import { cn } from "@adhar-ui/utils";
import {
  radioGroupIndicatorVariants,
  radioGroupItemVariants,
} from "./radio-group.styles.ts";

@Component({
  selector: "adhar-radio-group-item",
  template: `
    <button
      type="button"
      role="radio"
      [attr.id]="id"
      [attr.value]="value"
      [attr.tabIndex]="checked ? 0 : -1"
      [attr.aria-checked]="checked ? true : false"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.data-state]="checked ? 'checked' : 'unchecked'"
      [attr.disabled]="disabled"
      (click)="disabled ? undefined : onSelect?.(value)"
      [class]="classes"
    >
      <ng-container *ngIf="checked"
        ><span aria-hidden="true" [class]="indicatorClasses"></span
      ></ng-container>
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
export default class RadioGroupItem {
  @Input() size!: RadioGroupItemProps["size"];
  @Input() className!: RadioGroupItemProps["className"];
  @Input() indicatorClass!: RadioGroupItemProps["indicatorClass"];
  @Input() id!: RadioGroupItemProps["id"];
  @Input() value!: RadioGroupItemProps["value"];
  @Input() checked!: RadioGroupItemProps["checked"];
  @Input() disabled!: RadioGroupItemProps["disabled"];
  @Input() onSelect!: RadioGroupItemProps["onSelect"];

  get classes() {
    return cn(
      radioGroupItemVariants({
        size: this.size,
      }),
      this.className
    );
  }
  get indicatorClasses() {
    return cn(
      radioGroupIndicatorVariants({
        size: this.size,
      }),
      this.indicatorClass
    );
  }
}
