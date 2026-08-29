// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TimelineProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

@Component({
  selector: "timeline",
  template: `
    <ol [attr.aria-label]="'aria-label' || 'Timeline'" [class]="className">
      <ng-content></ng-content>
    </ol>
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
export default class Timeline {
  @Input() className!: TimelineProps["className"];
}
