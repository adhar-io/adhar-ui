// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface KbdProps {
  size?: "sm" | "default" | "lg";
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { kbdVariants } from "./kbd.styles.ts";

@Component({
  selector: "adhar-kbd",
  template: `
    <kbd [attr.aria-label]="'aria-label'" [class]="classes"
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
  @Input() size!: KbdProps["size"];
  @Input() className!: KbdProps["className"];

  get classes() {
    return cn(
      kbdVariants({
        size: this.size,
      }),
      this.className
    );
  }
}
