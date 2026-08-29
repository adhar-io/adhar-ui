// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

// Command menu / palette container. Filtering & keyboard navigation are driven
// by the consumer (controlled), keeping the primitive framework-portable.

@Component({
  selector: "command",
  template: `
    <div [attr.aria-label]="'aria-label' || 'Command menu'" [class]="className">
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
export default class Command {
  @Input() className!: CommandProps["className"];
}
