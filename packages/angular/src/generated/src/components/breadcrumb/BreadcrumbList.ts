// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbListProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbListVariants } from "./breadcrumb.styles.ts";

@Component({
  selector: "adhar-breadcrumb-list",
  template: `
    <ol [attr.id]="id" [class]="classes">
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
  @Input() id!: BreadcrumbListProps["id"];

  get classes() {
    return cn(breadcrumbListVariants(), this.className);
  }
}
