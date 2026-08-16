// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface AccordionItemProps {
  value: string;
  className?: string;
  children?: any;
}

@Component({
  selector: "accordion-item",
  template: `
    <div [attr.data-value]="value" [class]="className">
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
  @Input() value!: AccordionItemProps["value"];
  @Input() className!: AccordionItemProps["className"];
}
