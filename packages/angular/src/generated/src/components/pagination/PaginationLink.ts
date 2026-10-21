// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationLinkProps {
  href?: string;
  /** Marks this link as the current page (sets aria-current="page") */
  isActive?: boolean;
  /** Removes the link from navigation and the tab order */
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
  "aria-label"?: string;
  /** Use for client-side paging; not called while disabled */
  onClick?: (event: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationLinkVariants } from "./pagination.styles.ts";

@Component({
  selector: "adhar-pagination-link",
  template: `
    <a
      [attr.href]="disabled ? undefined : href"
      [attr.role]="href && !disabled ? undefined : 'link'"
      [attr.tabIndex]="disabled ? -1 : href ? undefined : 0"
      [attr.aria-current]="isActive ? 'page' : undefined"
      [attr.aria-disabled]="disabled ? true : undefined"
      [attr.aria-label]="'aria-label'"
      (click)="handleClick($event)"
      (keydown)="
          if (!href && $event.key === 'Enter') handleClick($event);
        "
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
export default class PaginationLink {
  @Input() isActive!: PaginationLinkProps["isActive"];
  @Input() size!: PaginationLinkProps["size"];
  @Input() className!: PaginationLinkProps["className"];
  @Input() disabled!: PaginationLinkProps["disabled"];
  @Input() onClick!: PaginationLinkProps["onClick"];
  @Input() href!: PaginationLinkProps["href"];

  get classes() {
    return cn(
      paginationLinkVariants({
        isActive: !!this.isActive,
        size: this.size,
      }),
      this.className
    );
  }
  handleClick(event: any) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.onClick?.(event);
  }
}
