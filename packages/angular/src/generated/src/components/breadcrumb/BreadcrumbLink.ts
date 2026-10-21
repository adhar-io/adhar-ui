// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbLinkProps {
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  /** Use for client-side routing; call event.preventDefault() to stop the native navigation */
  onClick?: (event: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbLinkVariants } from "./breadcrumb.styles.ts";

@Component({
  selector: "adhar-breadcrumb-link",
  template: `
    <a
      [attr.href]="href"
      [attr.target]="target"
      [attr.rel]="rel"
      (click)="onClick?.($event)"
      [class]="classes"
      ><ng-content></ng-content
    ></a>
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
export default class BreadcrumbLink {
  @Input() className!: BreadcrumbLinkProps["className"];
  @Input() href!: BreadcrumbLinkProps["href"];
  @Input() target!: BreadcrumbLinkProps["target"];
  @Input() rel!: BreadcrumbLinkProps["rel"];
  @Input() onClick!: BreadcrumbLinkProps["onClick"];

  get classes() {
    return cn(breadcrumbLinkVariants(), this.className);
  }
}
