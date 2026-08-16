// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DropdownMenuSeparatorProps {
  className?: string;
}

@Component({
  selector: "dropdown-menu-separator",
  template: ` <div role="separator" [class]="className"></div> `,
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
}
