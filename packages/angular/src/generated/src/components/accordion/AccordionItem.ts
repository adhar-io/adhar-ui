// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AccordionItemProps {
  value: string;
  /** Exposes data-state="open" for styling */
  open?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { accordionItemVariants } from "./accordion.styles.ts";

@Component({
  selector: "adhar-accordion-item",
  template: `
    <div
      [attr.data-value]="value"
      [attr.data-state]="open ? 'open' : 'closed'"
      [attr.data-disabled]="disabled ? '' : undefined"
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
export default class AccordionItem {
  @Input() className!: AccordionItemProps["className"];
  @Input() value!: AccordionItemProps["value"];
  @Input() open!: AccordionItemProps["open"];
  @Input() disabled!: AccordionItemProps["disabled"];

  get classes() {
    return cn(accordionItemVariants(), this.className);
  }
}
