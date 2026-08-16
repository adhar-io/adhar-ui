// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface KbdProps {
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  "aria-label"?: string;
  children?: any;
}

@Component({
  selector: "kbd",
  template: `
    <kbd [attr.aria-label]="'aria-label'" [class]="className"
      ><ng-content></ng-content
    ></kbd>
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
export default class Kbd {
  @Input() className!: KbdProps["className"];
}
