// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TabsContentProps {
  value: string;
  active?: boolean;
  /** Keep inactive panels mounted (hidden) to preserve their state */
  forceMount?: boolean;
  className?: string;
  id?: string;
  /** ID of the TabsTrigger that labels this panel */
  "aria-labelledby"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { tabsContentVariants } from "./tabs.styles.ts";

@Component({
  selector: "adhar-tabs-content",
  template: `
    <div
      role="tabpanel"
      [attr.id]="id"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.data-value]="value"
      [attr.data-state]="active ? 'active' : 'inactive'"
      [attr.hidden]="!active"
      [attr.tabIndex]="0"
      [class]="classes"
    >
      <ng-container *ngIf="active || forceMount"
        ><ng-content></ng-content
      ></ng-container>
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
export default class TabsContent {
  @Input() className!: TabsContentProps["className"];
  @Input() id!: TabsContentProps["id"];
  @Input() value!: TabsContentProps["value"];
  @Input() active!: TabsContentProps["active"];
  @Input() forceMount!: TabsContentProps["forceMount"];

  get classes() {
    return cn(tabsContentVariants(), this.className);
  }
}
