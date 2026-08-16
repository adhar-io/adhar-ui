// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DialogHeaderProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "dialog-header",
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
export default class DialogHeader {
  @Input() className!: DialogHeaderProps["className"];
}
