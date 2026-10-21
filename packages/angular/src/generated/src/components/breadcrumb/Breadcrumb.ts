// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

@Component({
  selector: "adhar-breadcrumb",
  template: `
    <nav [attr.aria-label]="'aria-label' || 'Breadcrumb'" [class]="className">
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
export default class Breadcrumb {
  @Input() className!: BreadcrumbProps["className"];
}
