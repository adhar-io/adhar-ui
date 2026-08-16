// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationNextProps {
  href?: string;
  disabled?: boolean;
  className?: string;
  /** Visible label (default "Next") */
  label?: string;
  "aria-label"?: string;
  onClick?: (event: any) => void;
}

@Component({
  selector: "pagination-next",
  template: `
    <a
      [attr.href]="href"
      [attr.aria-label]="'aria-label' || 'Go to next page'"
      [attr.aria-disabled]="disabled ? true : false"
      (click)="onClick?.($event)"
      [class]="className"
      ><span>{{label || 'Next'}}</span>
      <svg
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
        <path d="m9 18 6-6-6-6"></path></svg
    ></a>
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
export default class PaginationNext {
  @Input() href!: PaginationNextProps["href"];
  @Input() disabled!: PaginationNextProps["disabled"];
  @Input() onClick!: PaginationNextProps["onClick"];
  @Input() className!: PaginationNextProps["className"];
  @Input() label!: PaginationNextProps["label"];
}
