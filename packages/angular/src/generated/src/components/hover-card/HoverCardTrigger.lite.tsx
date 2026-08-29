// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface HoverCardTriggerProps {
  className?: string;
  /** ID of the content this trigger describes (for AT association) */
  "aria-describedby"?: string;
  children?: any;
}

// Focusable so the card opens on keyboard focus (group-focus-within), not just hover.

@Component({
  selector: "hover-card-trigger",
  template: `
    <span
      [attr.tabIndex]="0"
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
  @Input() className!: HoverCardTriggerProps["className"];
}
