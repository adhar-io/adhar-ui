// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationItemProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationItemVariants } from "./pagination.styles.ts";

@Component({
  selector: "adhar-pagination-item",
  template: `
    <li [attr.id]="id" [class]="classes"><ng-content></ng-content></li>
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
export default class PaginationItem {
  @Input() className!: PaginationItemProps["className"];
  @Input() id!: PaginationItemProps["id"];

  get classes() {
    return cn(paginationItemVariants(), this.className);
  }
}
