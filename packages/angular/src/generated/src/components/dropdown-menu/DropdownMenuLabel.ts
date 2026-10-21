// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DropdownMenuLabelProps {
  className?: string;
  id?: string;
  children?: any;
}

// Non-interactive heading for a group of menu items.

import { cn } from "@adhar-ui/utils";
import { dropdownMenuLabelVariants } from "./dropdown-menu.styles.ts";

@Component({
  selector: "adhar-dropdown-menu-label",
  template: `
    <div role="presentation" [attr.id]="id" [class]="classes">
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
export default class DropdownMenuLabel {
  @Input() className!: DropdownMenuLabelProps["className"];
  @Input() id!: DropdownMenuLabelProps["id"];

  get classes() {
    return cn(dropdownMenuLabelVariants(), this.className);
  }
}
