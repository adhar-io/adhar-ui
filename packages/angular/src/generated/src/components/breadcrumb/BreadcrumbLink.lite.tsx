// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface BreadcrumbLinkProps {
  href?: string;
  className?: string;
  onClick?: (event: any) => void;
  children?: any;
}

@Component({
  selector: "breadcrumb-link",
  template: `
    <a [attr.href]="href" (click)="onClick?.($event)" [class]="className"
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
  @Input() href!: BreadcrumbLinkProps["href"];
  @Input() onClick!: BreadcrumbLinkProps["onClick"];
  @Input() className!: BreadcrumbLinkProps["className"];
}
