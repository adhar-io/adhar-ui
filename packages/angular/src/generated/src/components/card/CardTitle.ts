// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CardTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardTitleVariants } from "./card.styles.ts";

@Component({
  selector: "adhar-card-title",
  template: `
    <h3 [attr.id]="id" [class]="classes"><ng-content></ng-content></h3>
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
export default class CardTitle {
  @Input() className!: CardTitleProps["className"];
  @Input() id!: CardTitleProps["id"];

  get classes() {
    return cn(cardTitleVariants(), this.className);
  }
}
