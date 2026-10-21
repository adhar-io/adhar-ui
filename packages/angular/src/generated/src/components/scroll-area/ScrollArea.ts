// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ScrollAreaProps {
  orientation?: "vertical" | "horizontal" | "both";
  /** Max height of the scroll viewport, e.g. "20rem" or 320 (px) */
  maxHeight?: string | number;
  className?: string;
  /** Adds tabindex so keyboard users can scroll the region. Requires `aria-label`. */
  focusable?: boolean;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { scrollAreaVariants } from "./scroll-area.styles.ts";

@Component({
  selector: "adhar-scroll-area",
  template: `
    <div
      [ngStyle]="{
          maxHeight: maxHeightValue
        }"
      [attr.tabIndex]="focusable ? 0 : undefined"
      [attr.role]="focusable ? 'region' : undefined"
      [attr.aria-label]="'aria-label'"
      [attr.data-orientation]="orientation || 'vertical'"
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
export default class ScrollArea {
  @Input() orientation!: ScrollAreaProps["orientation"];
  @Input() focusable!: ScrollAreaProps["focusable"];
  @Input() className!: ScrollAreaProps["className"];
  @Input() maxHeight!: ScrollAreaProps["maxHeight"];

  get classes() {
    return cn(
      scrollAreaVariants({
        orientation: this.orientation,
      }),
      this.focusable
        ? "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        : "",
      this.className
    );
  }
  get maxHeightValue() {
    if (this.maxHeight === undefined || this.maxHeight === null)
      return undefined;
    return typeof this.maxHeight === "number"
      ? this.maxHeight + "px"
      : this.maxHeight;
  }
}
