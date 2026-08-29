// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CollapsibleTriggerProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  /** ID of the content region this trigger controls */
  "aria-controls"?: string;
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

@Component({
  selector: "collapsible-trigger",
  template: `
    <button
      type="button"
      [attr.id]="id"
      [attr.disabled]="disabled"
      [attr.aria-expanded]="open ? true : false"
      [attr.aria-controls]="'aria-controls'"
      [attr.data-state]="open ? 'open' : 'closed'"
      (click)="disabled ? undefined : onOpenChange?.(!open)"
      [class]="className"
    >
      <ng-content></ng-content>
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
export default class CollapsibleTrigger {
  @Input() id!: CollapsibleTriggerProps["id"];
  @Input() disabled!: CollapsibleTriggerProps["disabled"];
  @Input() open!: CollapsibleTriggerProps["open"];
  @Input() onOpenChange!: CollapsibleTriggerProps["onOpenChange"];
  @Input() className!: CollapsibleTriggerProps["className"];
}
