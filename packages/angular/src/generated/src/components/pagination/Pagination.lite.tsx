// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

@Component({
  selector: "pagination",
  template: `
    <nav
      role="navigation"
      [attr.aria-label]="'aria-label' || 'Pagination'"
      [class]="className"
    >
      <ng-content></ng-content>
    </nav>
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
export default class Pagination {
  @Input() className!: PaginationProps["className"];
}
