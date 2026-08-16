// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface RadioGroupProps {
  /** The value of the currently selected item */
  value?: string;
  /** Form field name (rendered as a hidden input by consumers if needed) */
  name?: string;
  /** Disables the whole group */
  disabled?: boolean;
  /** Marks the group as required for form validation */
  required?: boolean;
  /** Layout direction — also drives arrow-key navigation semantics */
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children?: any;
}

@Component({
  selector: "radio-group",
  template: `
    <div
      role="radiogroup"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-orientation]="orientation || 'vertical'"
      [attr.aria-required]="required"
      [attr.aria-disabled]="disabled"
      [attr.data-orientation]="orientation || 'vertical'"
      [class]="className"
    >
      <ng-content></ng-content>
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
export default class RadioGroup {
  @Input() orientation!: RadioGroupProps["orientation"];
  @Input() required!: RadioGroupProps["required"];
  @Input() disabled!: RadioGroupProps["disabled"];
  @Input() className!: RadioGroupProps["className"];
}
