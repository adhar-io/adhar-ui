// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PaginationNextProps {
  href?: string;
  /** Removes the link from navigation and the tab order (e.g. on the last page) */
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
  /** Visible label (default "Next") */
  label?: string;
  /** Show only the chevron; the label stays available to screen readers */
  iconOnly?: boolean;
  "aria-label"?: string;
  onClick?: (event: any) => void;
}

import { cn } from "@adhar-ui/utils";
import { paginationLinkVariants } from "./pagination.styles.ts";

@Component({
  selector: "adhar-pagination-next",
  template: `
    <a
      [attr.href]="disabled ? undefined : href"
      [attr.role]="href && !disabled ? undefined : 'link'"
      [attr.tabIndex]="disabled ? -1 : href ? undefined : 0"
      [attr.aria-label]="'aria-label' || 'Go to next page'"
      [attr.aria-disabled]="disabled ? true : undefined"
      (click)="handleClick($event)"
      (keydown)="
          if (!href && $event.key === 'Enter') handleClick($event);
        "
      [class]="classes"
      ><span [class]="labelClasses">{{label || 'Next'}}</span>
      <svg
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
        <path d="m9 18 6-6-6-6"></path></svg
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
export default class PaginationNext {
  @Input() size!: PaginationNextProps["size"];
  @Input() iconOnly!: PaginationNextProps["iconOnly"];
  @Input() className!: PaginationNextProps["className"];
  @Input() disabled!: PaginationNextProps["disabled"];
  @Input() onClick!: PaginationNextProps["onClick"];
  @Input() href!: PaginationNextProps["href"];
  @Input() label!: PaginationNextProps["label"];

  get classes() {
    return cn(
      paginationLinkVariants({
        isActive: false,
        size: this.size,
      }),
      this.iconOnly ? "" : "gap-1 pr-2.5",
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
