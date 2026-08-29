// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface StepperProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label"?: string;
  children?: any;
}

@Component({
  selector: "stepper",
  template: `
    <ol
      [attr.aria-label]="'aria-label' || 'Progress'"
      [attr.data-orientation]="orientation || 'horizontal'"
      [class]="className"
    >
      <ng-content></ng-content>
    </ol>
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
export default class Stepper {
  @Input() orientation!: StepperProps["orientation"];
  @Input() className!: StepperProps["className"];
}
