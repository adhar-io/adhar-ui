// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ScrollAreaProps {
  orientation?: "vertical" | "horizontal" | "both";
  className?: string;
  /** Adds tabindex so keyboard users can scroll the region */
  focusable?: boolean;
  "aria-label"?: string;
  children?: any;
}

@Component({
  selector: "scroll-area",
  template: `
    <div
      [attr.tabIndex]="focusable ? 0 : undefined"
      [attr.role]="focusable ? 'region' : undefined"
      [attr.aria-label]="'aria-label'"
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
export default class ScrollArea {
  @Input() focusable!: ScrollAreaProps["focusable"];
  @Input() orientation!: ScrollAreaProps["orientation"];
  @Input() className!: ScrollAreaProps["className"];
}
