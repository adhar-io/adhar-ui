// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CollapsibleContentProps {
  open?: boolean;
  id?: string;
  className?: string;
  /** Class for the required inner overflow-hidden wrapper */
  innerClass?: string;
  children?: any;
}

@Component({
  selector: "collapsible-content",
  template: `
    <div
      [attr.id]="id"
      [attr.data-state]="open ? 'open' : 'closed'"
      [attr.aria-hidden]="open ? false : true"
      [class]="className"
    >
      <div [class]="innerClass"><ng-content></ng-content></div>
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
export default class CollapsibleContent {
  @Input() id!: CollapsibleContentProps["id"];
  @Input() open!: CollapsibleContentProps["open"];
  @Input() className!: CollapsibleContentProps["className"];
  @Input() innerClass!: CollapsibleContentProps["innerClass"];
}
