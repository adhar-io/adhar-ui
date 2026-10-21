// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DialogDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Dialog as `aria-describedby`.

import { cn } from "@adhar-ui/utils";
import { dialogDescriptionVariants } from "./dialog.styles.ts";

@Component({
  selector: "adhar-dialog-description",
  template: `
    <p [attr.id]="id" [class]="classes"><ng-content></ng-content></p>
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
export default class DialogDescription {
  @Input() className!: DialogDescriptionProps["className"];
  @Input() id!: DialogDescriptionProps["id"];

  get classes() {
    return cn(dialogDescriptionVariants(), this.className);
  }
}
