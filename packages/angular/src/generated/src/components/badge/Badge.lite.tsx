// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BadgeProps {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info";
  size?: "sm" | "default" | "lg";
  className?: string;
  /** Renders a small leading status dot inheriting the badge's text color */
  dot?: boolean;
  /** Extra classes for the leading dot (e.g. a fixed color) */
  dotClass?: string;
  /**
   * ARIA role. Only set "status" for live, dynamic counters (e.g. unread
   * counts) so screen readers announce changes. Static labels need no role.
   */
  role?: string;
  "aria-label"?: string;
  onClick?: (event: any) => void;
  children?: any;
}

@Component({
  selector: "badge",
  template: `
    <span
      [attr.role]="role"
      [attr.aria-label]="'aria-label'"
      (click)="onClick?.($event)"
      [class]="className"
      ><ng-container *ngIf="dot"
        ><span
          aria-hidden="true"
          [class]="dotClass || 'mr-1 inline-block size-1.5 rounded-full bg-current opacity-70'"
        ></span
      ></ng-container>
      <ng-content></ng-content
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
export default class Badge {
  @Input() role!: BadgeProps["role"];
  @Input() onClick!: BadgeProps["onClick"];
  @Input() className!: BadgeProps["className"];
  @Input() dot!: BadgeProps["dot"];
  @Input() dotClass!: BadgeProps["dotClass"];
}
