// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AccordionTriggerProps {
  open?: boolean;
  /** The owning item’s value — lets Accordion’s onValueChange handle the click */
  value?: string;
  disabled?: boolean;
  className?: string;
  /** Class for the heading element wrapping the trigger */
  headingClass?: string;
  /** Give the trigger an id and pass it to AccordionContent `aria-labelledby` */
  id?: string;
  /** ID of the AccordionContent region this trigger toggles */
  "aria-controls"?: string;
  onClick?: () => void;
  children?: any;
}

// Wrapped in a heading per the WAI-ARIA accordion pattern, so screen-reader
// users can jump between sections with heading navigation.

import { cn } from "@adhar-ui/utils";
import { accordionTriggerVariants } from "./accordion.styles.ts";

@Component({
  selector: "adhar-accordion-trigger",
  template: `
    <h3 [class]="headingClasses">
      <button
        type="button"
        data-accordion-trigger=""
        [attr.id]="id"
        [attr.disabled]="disabled"
        [attr.aria-expanded]="open ? true : false"
        [attr.aria-controls]="'aria-controls'"
        [attr.data-state]="open ? 'open' : 'closed'"
        [attr.data-value]="value"
        (click)="onClick?.()"
        [class]="classes"
      >
        <ng-content></ng-content>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          class="shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
    </h3>
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
export default class AccordionTrigger {
  @Input() className!: AccordionTriggerProps["className"];
  @Input() headingClass!: AccordionTriggerProps["headingClass"];
  @Input() id!: AccordionTriggerProps["id"];
  @Input() disabled!: AccordionTriggerProps["disabled"];
  @Input() open!: AccordionTriggerProps["open"];
  @Input() value!: AccordionTriggerProps["value"];
  @Input() onClick!: AccordionTriggerProps["onClick"];

  get classes() {
    return cn(
      accordionTriggerVariants(),
      "w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm disabled:cursor-not-allowed disabled:opacity-50",
      this.className
    );
  }
  get headingClasses() {
    return cn("flex", this.headingClass);
  }
}
