// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandEmptyVariants } from "./command.styles.ts";

@Component({
  selector: "adhar-command-empty",
  template: `
    <div role="presentation" [class]="classes"><ng-content></ng-content></div>
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
export default class CommandEmpty {
  @Input() className!: CommandEmptyProps["className"];

  get classes() {
    return cn(commandEmptyVariants(), this.className);
  }
}
