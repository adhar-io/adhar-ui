// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DropdownMenuItemProps {
  disabled?: boolean;
  /** "destructive" for delete-style actions */
  variant?: "default" | "destructive";
  /** Indent to line up with items that have a leading icon */
  inset?: boolean;
  className?: string;
  onClick?: () => void;
  /** Alias of `onClick` */
  onSelect?: () => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { dropdownMenuItemVariants } from "./dropdown-menu.styles.ts";

@Component({
  selector: "adhar-dropdown-menu-item",
  template: `
    <div
      role="menuitem"
      [attr.tabIndex]="-1"
      [attr.aria-disabled]="disabled ? true : undefined"
      [attr.data-disabled]="disabled ? '' : undefined"
      (click)="activate()"
      (keydown)="handleKeyDown($event)"
      [class]="classes"
    >
      <ng-content></ng-content>
    </div>
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
export default class DropdownMenuItem {
  @Input() variant!: DropdownMenuItemProps["variant"];
  @Input() inset!: DropdownMenuItemProps["inset"];
  @Input() className!: DropdownMenuItemProps["className"];
  @Input() disabled!: DropdownMenuItemProps["disabled"];
  @Input() onClick!: DropdownMenuItemProps["onClick"];
  @Input() onSelect!: DropdownMenuItemProps["onSelect"];

  get classes() {
    return cn(
      dropdownMenuItemVariants({
        variant: this.variant,
        inset: !!this.inset,
      }),
      this.className
    );
  }
  activate() {
    if (this.disabled) return;
    this.onClick?.();
    this.onSelect?.();
  }
  handleKeyDown(event: any) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      /* Route through click so DropdownMenu sees it and closes. */
      if (!this.disabled) event.currentTarget.click();
    }
  }
}
