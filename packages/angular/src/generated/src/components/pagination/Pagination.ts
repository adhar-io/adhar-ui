// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationVariants } from "./pagination.styles.ts";

@Component({
  selector: "adhar-pagination",
  template: `
    <nav [attr.aria-label]="'aria-label' || 'Pagination'" [class]="classes">
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

  get classes() {
    return cn(paginationVariants(), this.className);
  }
}
