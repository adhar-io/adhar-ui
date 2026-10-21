// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationPreviousProps {
  href?: string;
  /** Removes the link from navigation and the tab order (e.g. on the first page) */
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
  /** Visible label (default "Previous") */
  label?: string;
  /** Show only the chevron; the label stays available to screen readers */
  iconOnly?: boolean;
  "aria-label"?: string;
  onClick?: (event: any) => void;
}

import { cn } from "@adhar-ui/utils";
import { paginationLinkVariants } from "./pagination.styles.ts";

@Component({
  selector: "adhar-pagination-previous",
  template: `
    <a
      [attr.href]="disabled ? undefined : href"
      [attr.role]="href && !disabled ? undefined : 'link'"
      [attr.tabIndex]="disabled ? -1 : href ? undefined : 0"
      [attr.aria-label]="'aria-label' || 'Go to previous page'"
      [attr.aria-disabled]="disabled ? true : undefined"
      (click)="handleClick($event)"
      (keydown)="
          if (!href && $event.key === 'Enter') handleClick($event);
        "
      [class]="classes"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m15 18-6-6 6-6"></path>
      </svg>
      <span [class]="labelClasses">{{label || 'Previous'}}</span></a
    >
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
export default class PaginationPrevious {
  @Input() size!: PaginationPreviousProps["size"];
  @Input() iconOnly!: PaginationPreviousProps["iconOnly"];
  @Input() className!: PaginationPreviousProps["className"];
  @Input() disabled!: PaginationPreviousProps["disabled"];
  @Input() onClick!: PaginationPreviousProps["onClick"];
  @Input() href!: PaginationPreviousProps["href"];
  @Input() label!: PaginationPreviousProps["label"];

  get classes() {
    return cn(
      paginationLinkVariants({
        isActive: false,
        size: this.size,
      }),
      this.iconOnly ? "" : "gap-1 pl-2.5",
      this.className
    );
  }
  get labelClasses() {
    return this.iconOnly ? "sr-only" : "hidden sm:inline";
  }
  handleClick(event: any) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.onClick?.(event);
  }
}
