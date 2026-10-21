// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DialogHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { dialogHeaderVariants } from "./dialog.styles.ts";

@Component({
  selector: "adhar-dialog-header",
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
export default class DialogHeader {
  @Input() className!: DialogHeaderProps["className"];
  @Input() id!: DialogHeaderProps["id"];

  get classes() {
    return cn(dialogHeaderVariants(), this.className);
  }
}
