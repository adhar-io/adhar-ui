// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbSeparatorProps {
  className?: string;
  /** Custom separator content; defaults to a chevron */
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbSeparatorVariants } from "./breadcrumb.styles.ts";

@Component({
  selector: "adhar-breadcrumb-separator",
  template: `
    <li role="presentation" aria-hidden="true" [class]="classes">
      <ng-container *ngIf="children"><ng-content></ng-content></ng-container
      ><ng-container *ngIf="!(children)"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path></svg
      ></ng-container>
    </li>
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
export default class BreadcrumbSeparator {
  @Input() className!: BreadcrumbSeparatorProps["className"];

  get classes() {
    return cn(breadcrumbSeparatorVariants(), this.className);
  }
}
