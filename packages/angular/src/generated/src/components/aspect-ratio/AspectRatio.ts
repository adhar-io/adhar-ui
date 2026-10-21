// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AspectRatioProps {
  /** Width / height. A number (16 / 9) or a CSS value ("16 / 9"). Default 16 / 9. */
  ratio?: number | string;
  className?: string;
  children?: any;
}

// Constrains its child to a fixed aspect ratio using the native CSS property.

import { cn } from "@adhar-ui/utils";
import { aspectRatioVariants } from "./aspect-ratio.styles.ts";

@Component({
  selector: "adhar-aspect-ratio",
  template: `
    <div
      [ngStyle]="{
          aspectRatio: ratioValue
        }"
      [class]="classes"
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
export default class AspectRatio {
  @Input() className!: AspectRatioProps["className"];
  @Input() ratio!: AspectRatioProps["ratio"];

  get classes() {
    return cn(aspectRatioVariants(), this.className);
  }
  get ratioValue() {
    return this.ratio === undefined || this.ratio === null
      ? "16 / 9"
      : String(this.ratio);
  }
}
