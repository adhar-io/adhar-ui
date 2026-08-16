// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AccordionTriggerProps {
  open?: boolean;
  className?: string;
  onClick?: () => void;
  children?: any;
}

@Component({
  selector: "accordion-trigger",
  template: `
    <button
      type="button"
      [attr.aria-expanded]="open"
      (click)="onClick?.()"
      [class]="className"
    >
      <ng-content></ng-content>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        [ngStyle]="{
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }"
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </button>
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
  @Input() open!: AccordionTriggerProps["open"];
  @Input() onClick!: AccordionTriggerProps["onClick"];
  @Input() className!: AccordionTriggerProps["className"];
}
