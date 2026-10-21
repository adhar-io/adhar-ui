// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CardDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardDescriptionVariants } from "./card.styles.ts";

@Component({
  selector: "adhar-card-description",
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
export default class CardDescription {
  @Input() className!: CardDescriptionProps["className"];
  @Input() id!: CardDescriptionProps["id"];

  get classes() {
    return cn(cardDescriptionVariants(), this.className);
  }
}
