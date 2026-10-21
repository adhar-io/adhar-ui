// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandShortcutProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandShortcutVariants } from "./command.styles.ts";

@Component({
  selector: "adhar-command-shortcut",
  template: `
    <span [attr.aria-label]="'aria-label'" [class]="classes"
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
export default class CommandShortcut {
  @Input() className!: CommandShortcutProps["className"];

  get classes() {
    return cn(commandShortcutVariants(), this.className);
  }
}
