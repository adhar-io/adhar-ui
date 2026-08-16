// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CardDescriptionProps {
  className?: string;
  children?: any;
}

@Component({
  selector: "card-description",
  template: ` <p [class]="className"><ng-content></ng-content></p> `,
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
export default class CardDescription {
  @Input() className!: CardDescriptionProps["className"];
}
