// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "command-empty",
  template: `
    <div role="presentation" [class]="className"><ng-content></ng-content></div>
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
}
