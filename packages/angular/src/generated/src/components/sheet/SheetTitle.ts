// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SheetTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Sheet as `aria-labelledby` so it is announced on open.

import { cn } from "@adhar-ui/utils";
import { sheetTitleVariants } from "./sheet.styles.ts";

@Component({
  selector: "adhar-sheet-title",
  template: `
    <h2 [attr.id]="id" [class]="classes"><ng-content></ng-content></h2>
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
export default class SheetTitle {
  @Input() className!: SheetTitleProps["className"];
  @Input() id!: SheetTitleProps["id"];

  get classes() {
    return cn(sheetTitleVariants(), this.className);
  }
}
