// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TimelineProps {
  className?: string;
  id?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { timelineVariants } from "./timeline.styles.ts";

@Component({
  selector: "adhar-timeline",
  template: `
    <ol
      [attr.id]="id"
      [attr.aria-label]="'aria-label' || 'Timeline'"
      [class]="classes"
    >
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
  @Input() id!: TimelineProps["id"];

  get classes() {
    return cn(timelineVariants(), this.className);
  }
}
