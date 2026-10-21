// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CardFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardFooterVariants } from "./card.styles.ts";

@Component({
  selector: "adhar-card-footer",
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
export default class CardFooter {
  @Input() className!: CardFooterProps["className"];
  @Input() id!: CardFooterProps["id"];

  get classes() {
    return cn(cardFooterVariants(), this.className);
  }
}
