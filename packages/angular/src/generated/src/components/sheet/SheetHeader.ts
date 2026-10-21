// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SheetHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { sheetHeaderVariants } from "./sheet.styles.ts";

@Component({
  selector: "adhar-sheet-header",
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
export default class SheetHeader {
  @Input() className!: SheetHeaderProps["className"];
  @Input() id!: SheetHeaderProps["id"];

  get classes() {
    return cn(sheetHeaderVariants(), this.className);
  }
}
