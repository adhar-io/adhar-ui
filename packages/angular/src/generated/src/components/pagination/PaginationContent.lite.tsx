// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationContentProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "pagination-content",
  template: `
    <ul [class]="className">
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
}
