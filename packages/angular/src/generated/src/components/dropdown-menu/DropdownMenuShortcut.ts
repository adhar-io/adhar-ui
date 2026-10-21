// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DropdownMenuShortcutProps {
  className?: string;
  id?: string;
  children?: any;
}

// Keyboard shortcut hint shown at the end of a DropdownMenuItem.

import { cn } from "@adhar-ui/utils";
import { dropdownMenuShortcutVariants } from "./dropdown-menu.styles.ts";

@Component({
  selector: "adhar-dropdown-menu-shortcut",
  template: `
    <span aria-hidden="true" [attr.id]="id" [class]="classes"
      ><ng-content></ng-content
    ></span>
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
export default class DropdownMenuShortcut {
  @Input() className!: DropdownMenuShortcutProps["className"];
  @Input() id!: DropdownMenuShortcutProps["id"];

  get classes() {
    return cn(dropdownMenuShortcutVariants(), this.className);
  }
}
