// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface HoverCardContentProps {
  id?: string;
  className?: string;
  children?: any;
}

@Component({
  selector: "hover-card-content",
  template: `
    <div role="tooltip" [attr.id]="id" [class]="className">
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
  @Input() id!: HoverCardContentProps["id"];
  @Input() className!: HoverCardContentProps["className"];
}
