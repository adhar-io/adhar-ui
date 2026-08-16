// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CardTitleProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "card-title",
  template: ` <h3 [class]="className"><ng-content></ng-content></h3> `,
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
export default class CardTitle {
  @Input() className!: CardTitleProps["className"];
}
