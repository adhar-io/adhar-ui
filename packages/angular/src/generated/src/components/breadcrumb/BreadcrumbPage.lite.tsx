// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.

@Component({
  selector: "breadcrumb-page",
  template: `
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      [class]="className"
      ><ng-content></ng-content
    ></span>
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
export default class BreadcrumbPage {
  @Input() className!: BreadcrumbPageProps["className"];
}
