// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface LabelProps {
  /** ID of the form control this label is bound to (compiles to `for` per framework) */
  htmlFor?: string;
  className?: string;
  children?: any;
}

@Component({
  selector: "label",
  template: `
    <label [attr.for]="htmlFor" [class]="className"
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
  @Input() htmlFor!: LabelProps["htmlFor"];
  @Input() className!: LabelProps["className"];
}
