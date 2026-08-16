// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbItemProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "breadcrumb-item",
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
export default class BreadcrumbItem {
  @Input() className!: BreadcrumbItemProps["className"];
}
