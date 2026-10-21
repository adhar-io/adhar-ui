// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SheetFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { sheetFooterVariants } from "./sheet.styles.ts";

@Component({
  selector: "adhar-sheet-footer",
  template: `
    <div [attr.id]="id" [class]="classes"><ng-content></ng-content></div>
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
export default class SheetFooter {
  @Input() className!: SheetFooterProps["className"];
  @Input() id!: SheetFooterProps["id"];

  get classes() {
    return cn(sheetFooterVariants(), this.className);
  }
}
