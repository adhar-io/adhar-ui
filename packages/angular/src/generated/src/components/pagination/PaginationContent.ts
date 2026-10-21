// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationContentProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationContentVariants } from "./pagination.styles.ts";

@Component({
  selector: "adhar-pagination-content",
  template: `
    <ul [attr.id]="id" [class]="classes">
      <ng-content></ng-content>
    </ul>
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
export default class PaginationContent {
  @Input() className!: PaginationContentProps["className"];
  @Input() id!: PaginationContentProps["id"];

  get classes() {
    return cn(paginationContentVariants(), this.className);
  }
}
