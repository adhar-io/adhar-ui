// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DropdownMenuSeparatorProps {
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { dropdownMenuSeparatorVariants } from "./dropdown-menu.styles.ts";

@Component({
  selector: "adhar-dropdown-menu-separator",
  template: ` <div role="separator" [class]="classes"></div> `,
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
export default class DropdownMenuSeparator {
  @Input() className!: DropdownMenuSeparatorProps["className"];

  get classes() {
    return cn(dropdownMenuSeparatorVariants(), this.className);
  }
}
