// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandListProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandListVariants } from "./command.styles.ts";

@Component({
  selector: "adhar-command-list",
  template: `
    <div
      role="listbox"
      [attr.id]="id"
      [attr.aria-label]="'aria-label' || 'Suggestions'"
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
export default class CommandList {
  @Input() className!: CommandListProps["className"];
  @Input() id!: CommandListProps["id"];

  get classes() {
    return cn(commandListVariants(), this.className);
  }
}
