// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AspectRatioProps {
  /** CSS aspect-ratio value, e.g. "16 / 9", "1 / 1", "4 / 3" (default "16 / 9") */
  ratio?: string;
  className?: string;
  children?: any;
}

// Constrains its child to a fixed aspect ratio using the native CSS property.

@Component({
  selector: "aspect-ratio",
  template: `
    <div
      [ngStyle]="{
          aspectRatio: ratio || '16 / 9'
        }"
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
export default class AspectRatio {
  @Input() ratio!: AspectRatioProps["ratio"];
  @Input() className!: AspectRatioProps["className"];
}
