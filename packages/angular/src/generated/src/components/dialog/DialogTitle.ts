// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DialogTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Dialog as `aria-labelledby` so it is announced on open.

import { cn } from "@adhar-ui/utils";
import { dialogTitleVariants } from "./dialog.styles.ts";

@Component({
  selector: "adhar-dialog-title",
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
export default class DialogTitle {
  @Input() className!: DialogTitleProps["className"];
  @Input() id!: DialogTitleProps["id"];

  get classes() {
    return cn(dialogTitleVariants(), this.className);
  }
}
