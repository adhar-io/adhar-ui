// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandSeparatorProps {
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { commandSeparatorVariants } from "./command.styles.ts";

@Component({
  selector: "adhar-command-separator",
  template: `
    <div role="separator" aria-orientation="horizontal" [class]="classes"></div>
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

  get classes() {
    return cn(commandSeparatorVariants(), this.className);
  }
}
