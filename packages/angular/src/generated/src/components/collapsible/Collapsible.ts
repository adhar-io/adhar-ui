// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CollapsibleProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
}

@Component({
  selector: "adhar-collapsible",
  template: `
    <div
      [attr.data-state]="open ? 'open' : 'closed'"
      [attr.data-disabled]="disabled ? '' : undefined"
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
export default class Collapsible {
  @Input() open!: CollapsibleProps["open"];
  @Input() disabled!: CollapsibleProps["disabled"];
  @Input() className!: CollapsibleProps["className"];
}
