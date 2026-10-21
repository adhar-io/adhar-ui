// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TabsTriggerProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  /** Give the trigger an id and pass it to TabsContent `aria-labelledby` */
  id?: string;
  /** ID of the TabsContent this trigger shows */
  "aria-controls"?: string;
  onClick?: (value: string) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { tabsTriggerVariants } from "./tabs.styles.ts";

@Component({
  selector: "adhar-tabs-trigger",
  template: `
    <button
      type="button"
      role="tab"
      [attr.id]="id"
      [attr.aria-selected]="active ? true : false"
      [attr.aria-controls]="'aria-controls'"
      [attr.disabled]="disabled"
      [attr.tabIndex]="active ? 0 : -1"
      [attr.data-value]="value"
      [attr.data-state]="active ? 'active' : 'inactive'"
      (click)="onClick?.(value)"
      [class]="classes"
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
export default class TabsTrigger {
  @Input() className!: TabsTriggerProps["className"];
  @Input() id!: TabsTriggerProps["id"];
  @Input() active!: TabsTriggerProps["active"];
  @Input() disabled!: TabsTriggerProps["disabled"];
  @Input() value!: TabsTriggerProps["value"];
  @Input() onClick!: TabsTriggerProps["onClick"];

  get classes() {
    return cn(tabsTriggerVariants(), this.className);
  }
}
