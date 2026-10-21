// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ProgressProps {
  /** Current value. Omit (or pass null) for an indeterminate, busy bar. */
  value?: number | null;
  max?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
  indicatorClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Human-readable value, e.g. "3 of 10 files" (defaults to the percentage) */
  "aria-valuetext"?: string;
}

import { cn } from "@adhar-ui/utils";
import {
  progressIndicatorVariants,
  progressVariants,
} from "./progress.styles.ts";
import { clamp } from "../_internal/dom.ts";

@Component({
  selector: "adhar-progress",
  template: `
    <div
      role="progressbar"
      [attr.aria-valuenow]="isIndeterminate ? undefined : value as number"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="maxValue"
      [attr.aria-valuetext]="'aria-valuetext' || percentText"
      [attr.aria-busy]="isIndeterminate ? true : undefined"
      [attr.aria-label]="'aria-labelledby' ? undefined : 'aria-label' || 'Progress'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.data-state]="isIndeterminate ? 'indeterminate' : percent >= 100 ? 'complete' : 'loading'"
      [class]="classes"
    >
      <div
        [ngStyle]="{
          transform: indicatorTransform
        }"
        [class]="indicatorClasses"
      ></div>
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
export default class Progress {
  @Input() value!: ProgressProps["value"];
  @Input() max!: ProgressProps["max"];
  @Input() size!: ProgressProps["size"];
  @Input() className!: ProgressProps["className"];
  @Input() indicatorClass!: ProgressProps["indicatorClass"];

  get isIndeterminate() {
    return this.value === undefined || this.value === null;
  }
  get maxValue() {
    return this.max && this.max > 0 ? this.max : 100;
  }
  get percent() {
    if (this.isIndeterminate) return 0;
    return clamp(((this.value as number) / this.maxValue) * 100, 0, 100);
  }
  get classes() {
    return cn(
      progressVariants({
        size: this.size,
      }),
      this.className
    );
  }
  get indicatorClasses() {
    return cn(
      progressIndicatorVariants(),
      this.isIndeterminate ? "animate-pulse motion-reduce:animate-none" : "",
      this.indicatorClass
    );
  }
  get indicatorTransform() {
    return this.isIndeterminate
      ? "translateX(0)"
      : "translateX(-" + (100 - this.percent) + "%)";
  }
  get percentText() {
    return this.isIndeterminate ? undefined : Math.round(this.percent) + "%";
  }
}
