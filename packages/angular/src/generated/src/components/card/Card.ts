// @ts-nocheck
import { Output, EventEmitter, Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CardProps {
  /** Inner padding. Use ’none’ (default) with CardHeader / CardContent / CardFooter. */
  padding?: "none" | "sm" | "default" | "lg";
  /**
   * Hover / focus affordance for clickable cards. With `onClick` the card is
   * also focusable and activated by Enter / Space.
   */
  interactive?: boolean;
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  onClick?: (event: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardVariants } from "./card.styles.ts";

@Component({
  selector: "adhar-card",
  template: `
    <div
      [attr.id]="id"
      [attr.role]="role || (onClick ? 'button' : undefined)"
      [attr.tabIndex]="onClick ? 0 : undefined"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      (click)="onClick?.($event)"
      (keydown)="handleKeyDown($event)"
      [class]="classes"
    >
      <ng-content></ng-content>
    </div>
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
export default class Card {
  @Input() interactive!: CardProps["interactive"];
  @Input() padding!: CardProps["padding"];
  @Input() className!: CardProps["className"];
  @Input() id!: CardProps["id"];
  @Input() role!: CardProps["role"];
  @Output() onClick = new EventEmitter<any>();

  get isInteractive() {
    return !!this.interactive || !!this.onClick;
  }
  get classes() {
    return cn(
      cardVariants({
        padding: this.padding,
        interactive: this.isInteractive,
      }),
      this.className
    );
  }
  handleKeyDown(event: any) {
    if (
      this.onClick &&
      event.target === event.currentTarget &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      this.onClick.emit(event);
    }
  }
}
