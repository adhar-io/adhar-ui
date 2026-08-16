// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DialogFooterProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "dialog-footer",
  template: ` <div [class]="className"><ng-content></ng-content></div> `,
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
}
