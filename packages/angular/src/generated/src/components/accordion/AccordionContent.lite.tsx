// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  children?: any;
}

@Component({
  selector: "accordion-content",
  template: `
    <div
      role="region"
      [attr.hidden]="!open"
      [ngStyle]="{
          overflow: 'hidden',
          transition: 'height 0.2s ease-out'
        }"
      [class]="className"
    >
      <div><ng-content></ng-content></div>
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
  @Input() open!: AccordionContentProps["open"];
  @Input() className!: AccordionContentProps["className"];
}
