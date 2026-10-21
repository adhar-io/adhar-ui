// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  /** Class for the inner padding wrapper */
  innerClass?: string;
  /** Give the region an id and pass it to AccordionTrigger `aria-controls` */
  id?: string;
  /** ID of the AccordionTrigger that labels this region */
  "aria-labelledby"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { accordionContentVariants } from "./accordion.styles.ts";

@Component({
  selector: "adhar-accordion-content",
  template: `
    <div
      role="region"
      [attr.id]="id"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.data-state]="open ? 'open' : 'closed'"
      [attr.hidden]="!open"
      [class]="classes"
    >
      <div [class]="innerClasses"><ng-content></ng-content></div>
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
export default class AccordionContent {
  @Input() className!: AccordionContentProps["className"];
  @Input() innerClass!: AccordionContentProps["innerClass"];
  @Input() id!: AccordionContentProps["id"];
  @Input() open!: AccordionContentProps["open"];

  get classes() {
    return cn(accordionContentVariants(), this.className);
  }
  get innerClasses() {
    return cn("pb-4 pt-0", this.innerClass);
  }
}
