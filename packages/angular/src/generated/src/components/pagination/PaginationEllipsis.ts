// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationEllipsisProps {
  className?: string;
  /** Screen-reader label (default "More pages") */
  label?: string;
}

import { cn } from "@adhar-ui/utils";
import { paginationEllipsisVariants } from "./pagination.styles.ts";

@Component({
  selector: "adhar-pagination-ellipsis",
  template: `
    <span [class]="classes"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
      </svg>
      <span class="sr-only">{{label || 'More pages'}}</span></span
    >
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
export default class PaginationEllipsis {
  @Input() className!: PaginationEllipsisProps["className"];
  @Input() label!: PaginationEllipsisProps["label"];

  get classes() {
    return cn(paginationEllipsisVariants(), this.className);
  }
}
