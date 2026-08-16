// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationLinkProps {
  href?: string;
  /** Marks this link as the current page (sets aria-current="page") */
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  onClick?: (event: any) => void;
  children?: any;
}

@Component({
  selector: "pagination-link",
  template: `
    <a
      [attr.href]="href"
      [attr.aria-current]="isActive ? 'page' : undefined"
      [attr.aria-disabled]="disabled ? true : false"
      [attr.aria-label]="'aria-label'"
      (click)="onClick?.($event)"
      [class]="className"
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
export default class PaginationLink {
  @Input() href!: PaginationLinkProps["href"];
  @Input() isActive!: PaginationLinkProps["isActive"];
  @Input() disabled!: PaginationLinkProps["disabled"];
  @Input() onClick!: PaginationLinkProps["onClick"];
  @Input() className!: PaginationLinkProps["className"];
}
