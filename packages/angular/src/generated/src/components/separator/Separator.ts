// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  /**
   * Purely visual separators (the default) are hidden from assistive tech.
   * Set false when the separator divides meaningful sections.
   */
  decorative?: boolean;
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { separatorVariants } from "./separator.styles.ts";

@Component({
  selector: "adhar-separator",
  template: `
    <div
      [attr.role]="isDecorative ? 'none' : 'separator'"
      [attr.aria-orientation]="isDecorative ? undefined : orientation || 'horizontal'"
      [attr.data-orientation]="orientation || 'horizontal'"
      [class]="classes"
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
export default class Separator {
  @Input() orientation!: SeparatorProps["orientation"];
  @Input() className!: SeparatorProps["className"];
  @Input() decorative!: SeparatorProps["decorative"];

  get classes() {
    return cn(
      separatorVariants({
        orientation: this.orientation,
      }),
      this.className
    );
  }
  get isDecorative() {
    return this.decorative !== false;
  }
}
