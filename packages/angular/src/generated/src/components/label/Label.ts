// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface LabelProps {
  /** ID of the form control this label is bound to (compiles to `for` per framework) */
  htmlFor?: string;
  id?: string;
  /** Appends a required marker (*). The control itself should also set `required`. */
  required?: boolean;
  /** Dims the label to match a disabled control that is not its `peer` sibling */
  disabled?: boolean;
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { labelVariants } from "./label.styles.ts";

@Component({
  selector: "adhar-label",
  template: `
    <label
      [attr.id]="id"
      [attr.for]="htmlFor"
      [attr.data-disabled]="disabled ? '' : undefined"
      [class]="classes"
      ><ng-content></ng-content
    ></label>
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
export default class Label {
  @Input() required!: LabelProps["required"];
  @Input() disabled!: LabelProps["disabled"];
  @Input() className!: LabelProps["className"];
  @Input() id!: LabelProps["id"];
  @Input() htmlFor!: LabelProps["htmlFor"];

  get classes() {
    return cn(
      labelVariants({
        required: !!this.required,
      }),
      this.disabled ? "cursor-not-allowed opacity-70" : "",
      this.className
    );
  }
}
