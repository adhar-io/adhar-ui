// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandListProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
  children?: any;
}

@Component({
  selector: "command-list",
  template: `
    <div
      role="listbox"
      [attr.id]="id"
      [attr.aria-label]="'aria-label' || 'Suggestions'"
      [class]="className"
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
export default class CommandList {
  @Input() id!: CommandListProps["id"];
  @Input() className!: CommandListProps["className"];
}
