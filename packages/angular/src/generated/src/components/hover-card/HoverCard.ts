// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface HoverCardProps {
  className?: string;
  children?: any;
}

// CSS-only: HoverCardContent is shown while the pointer is over, or keyboard
// focus is inside, this wrapper. Escape is not needed since moving away hides it.

import { cn } from "@adhar-ui/utils";
import { hoverCardVariants } from "./hover-card.styles.ts";

@Component({
  selector: "adhar-hover-card",
  template: ` <div [class]="classes"><ng-content></ng-content></div> `,
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
export default class HoverCard {
  @Input() className!: HoverCardProps["className"];

  get classes() {
    return cn(hoverCardVariants(), this.className);
  }
}
