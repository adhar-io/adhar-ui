// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CardContentProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardContentVariants } from "./card.styles.ts";

@Component({
  selector: "adhar-card-content",
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
export default class CardContent {
  @Input() className!: CardContentProps["className"];
  @Input() id!: CardContentProps["id"];

  get classes() {
    return cn(cardContentVariants(), this.className);
  }
}
