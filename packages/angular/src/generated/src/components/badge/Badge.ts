// @ts-nocheck
import { Output, EventEmitter, Component, Input } from "@angular/core";

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
  id?: string;
  title?: string;
  /** Renders a small leading status dot inheriting the badge’s text color */
  dot?: boolean;
  /** Extra classes for the leading dot (e.g. a fixed color) */
  dotClass?: string;
  /**
   * ARIA role. Only set "status" for live, dynamic counters (e.g. unread
   * counts) so screen readers announce changes. Static labels need no role.
   * Defaults to "button" when `onClick` is set.
   */
  role?: string;
  "aria-label"?: string;
  /** Makes the badge interactive: focusable, and activated by Enter / Space */
  onClick?: (event: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { badgeVariants } from "./badge.styles.ts";

@Component({
  selector: "adhar-badge",
  template: `
    <span
      [attr.id]="id"
      [attr.title]="title"
      [attr.role]="role || (onClick ? 'button' : undefined)"
      [attr.tabIndex]="onClick ? 0 : undefined"
      [attr.aria-label]="'aria-label'"
      (click)="onClick?.($event)"
      (keydown)="handleKeyDown($event)"
      [class]="classes"
      ><ng-container *ngIf="dot"
        ><span aria-hidden="true" [class]="dotClasses"></span
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
  @Input() variant!: BadgeProps["variant"];
  @Input() size!: BadgeProps["size"];
  @Input() className!: BadgeProps["className"];
  @Input() dotClass!: BadgeProps["dotClass"];
  @Input() id!: BadgeProps["id"];
  @Input() title!: BadgeProps["title"];
  @Input() role!: BadgeProps["role"];
  @Input() dot!: BadgeProps["dot"];
  @Output() onClick = new EventEmitter<any>();

  get classes() {
    return cn(
      badgeVariants({
        variant: this.variant,
        size: this.size,
      }),
      this.onClick ? "cursor-pointer" : "",
      this.className
    );
  }
  get dotClasses() {
    return cn(
      "mr-1 inline-block size-1.5 shrink-0 rounded-full bg-current opacity-70",
      this.dotClass
    );
  }
  handleKeyDown(event: any) {
    if (this.onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      this.onClick.emit(event);
    }
  }
}
