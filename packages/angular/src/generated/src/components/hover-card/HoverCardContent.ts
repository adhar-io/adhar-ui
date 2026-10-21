// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface HoverCardContentProps {
  side?: "top" | "bottom" | "left" | "right";
  id?: string;
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { hoverCardContentVariants } from "./hover-card.styles.ts";

@Component({
  selector: "adhar-hover-card-content",
  template: `
    <div
      role="tooltip"
      [attr.id]="id"
      [attr.data-side]="side || 'bottom'"
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
export default class HoverCardContent {
  @Input() side!: HoverCardContentProps["side"];
  @Input() className!: HoverCardContentProps["className"];
  @Input() id!: HoverCardContentProps["id"];

  get classes() {
    return cn(
      hoverCardContentVariants({
        side: this.side,
      }),
      this.className
    );
  }
}
