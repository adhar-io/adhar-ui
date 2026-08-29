// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandSeparatorProps {
  className?: string;
}

@Component({
  selector: "command-separator",
  template: `
    <div
      role="separator"
      aria-orientation="horizontal"
      [class]="className"
    ></div>
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
export default class CommandSeparator {
  @Input() className!: CommandSeparatorProps["className"];
}
