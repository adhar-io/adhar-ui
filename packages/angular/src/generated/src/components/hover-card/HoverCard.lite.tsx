// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface HoverCardProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "hover-card",
  template: ` <div [class]="className"><ng-content></ng-content></div> `,
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
export default class HoverCard {
  @Input() className!: HoverCardProps["className"];
}
