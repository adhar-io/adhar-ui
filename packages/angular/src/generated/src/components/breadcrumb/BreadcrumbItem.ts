// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbItemProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbItemVariants } from "./breadcrumb.styles.ts";

@Component({
  selector: "adhar-breadcrumb-item",
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
export default class BreadcrumbItem {
  @Input() className!: BreadcrumbItemProps["className"];
  @Input() id!: BreadcrumbItemProps["id"];

  get classes() {
    return cn(breadcrumbItemVariants(), this.className);
  }
}
