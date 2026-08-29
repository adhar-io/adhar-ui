// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandShortcutProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

@Component({
  selector: "command-shortcut",
  template: `
    <span [attr.aria-label]="'aria-label'" [class]="className"
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
}
