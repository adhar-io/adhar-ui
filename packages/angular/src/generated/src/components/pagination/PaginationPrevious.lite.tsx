// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationPreviousProps {
  href?: string;
  disabled?: boolean;
  className?: string;
  /** Visible label (default "Previous") */
  label?: string;
  "aria-label"?: string;
  onClick?: (event: any) => void;
}

@Component({
  selector: "pagination-previous",
  template: `
    <a
      [attr.href]="href"
      [attr.aria-label]="'aria-label' || 'Go to previous page'"
      [attr.aria-disabled]="disabled ? true : false"
      (click)="onClick?.($event)"
      [class]="className"
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
      >
        <path d="m15 18-6-6 6-6"></path>
      </svg>
      <span>{{label || 'Previous'}}</span></a
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
export default class PaginationPrevious {
  @Input() href!: PaginationPreviousProps["href"];
  @Input() disabled!: PaginationPreviousProps["disabled"];
  @Input() onClick!: PaginationPreviousProps["onClick"];
  @Input() className!: PaginationPreviousProps["className"];
  @Input() label!: PaginationPreviousProps["label"];
}
