// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationItemProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "pagination-item",
  template: ` <li [class]="className"><ng-content></ng-content></li> `,
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
export default class PaginationItem {
  @Input() className!: PaginationItemProps["className"];
}
