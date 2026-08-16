// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ToggleGroupProps {
  /** 'single' allows one active item, 'multiple' allows many (semantic hint) */
  type?: "single" | "multiple";
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children?: any;
}

@Component({
  selector: "toggle-group",
  template: `
    <div
      role="group"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-disabled]="disabled"
      [attr.data-type]="type || 'single'"
      [attr.data-orientation]="orientation || 'horizontal'"
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
export default class ToggleGroup {
  @Input() disabled!: ToggleGroupProps["disabled"];
  @Input() type!: ToggleGroupProps["type"];
  @Input() orientation!: ToggleGroupProps["orientation"];
  @Input() className!: ToggleGroupProps["className"];
}
