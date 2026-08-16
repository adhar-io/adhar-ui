// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbListProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "breadcrumb-list",
  template: `
    <ol [class]="className">
      <ng-content></ng-content>
    </ol>
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
export default class BreadcrumbList {
  @Input() className!: BreadcrumbListProps["className"];
}
