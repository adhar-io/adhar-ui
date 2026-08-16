// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DialogTitleProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "dialog-title",
  template: ` <h2 [class]="className"><ng-content></ng-content></h2> `,
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
}
