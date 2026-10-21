// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DialogFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { dialogFooterVariants } from "./dialog.styles.ts";

@Component({
  selector: "adhar-dialog-footer",
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
export default class DialogFooter {
  @Input() className!: DialogFooterProps["className"];
  @Input() id!: DialogFooterProps["id"];

  get classes() {
    return cn(dialogFooterVariants(), this.className);
  }
}
