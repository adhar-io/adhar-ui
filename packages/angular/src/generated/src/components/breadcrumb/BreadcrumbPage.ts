// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.

import { cn } from "@adhar-ui/utils";
import { breadcrumbPageVariants } from "./breadcrumb.styles.ts";

@Component({
  selector: "adhar-breadcrumb-page",
  template: `
    <span aria-current="page" [class]="classes"><ng-content></ng-content></span>
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

  get classes() {
    return cn(breadcrumbPageVariants(), this.className);
  }
}
