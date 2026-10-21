// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface HoverCardTriggerProps {
  className?: string;
  /** ID of the content this trigger describes (for AT association) */
  "aria-describedby"?: string;
  /** Set false when the child is already focusable (a link or button) */
  focusable?: boolean;
  children?: any;
}

// Focusable so the card opens on keyboard focus (group-focus-within), not just hover.

@Component({
  selector: "adhar-hover-card-trigger",
  template: `
    <span
      [attr.tabIndex]="focusable === false ? undefined : 0"
      [attr.aria-describedby]="'aria-describedby'"
      [class]="className"
      ><ng-content></ng-content
    ></span>
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
export default class HoverCardTrigger {
  @Input() focusable!: HoverCardTriggerProps["focusable"];
  @Input() className!: HoverCardTriggerProps["className"];
}
