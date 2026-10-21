// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface StepperProps {
  /** Pass the same orientation to each Step */
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { stepperVariants } from "./stepper.styles.ts";

@Component({
  selector: "adhar-stepper",
  template: `
    <ol
      [attr.aria-label]="'aria-label' || 'Progress'"
      [attr.data-orientation]="orientation || 'horizontal'"
      [class]="classes"
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

  get classes() {
    return cn(
      stepperVariants({
        orientation: this.orientation,
      }),
      this.className
    );
  }
}
