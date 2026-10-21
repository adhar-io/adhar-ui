// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CardHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardHeaderVariants } from "./card.styles.ts";

@Component({
  selector: "adhar-card-header",
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
export default class CardHeader {
  @Input() className!: CardHeaderProps["className"];
  @Input() id!: CardHeaderProps["id"];

  get classes() {
    return cn(cardHeaderVariants(), this.className);
  }
}
