// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface CollapsibleContentProps {
  open?: boolean;
  id?: string;
  className?: string;
  /** Class for the required inner overflow-hidden wrapper */
  innerClass?: string;
  /** ID of the trigger, to expose the content as a labelled region */
  "aria-labelledby"?: string;
  children?: any;
}

// Animates height with the grid-rows 0fr → 1fr technique; closed content is
// `invisible`, so it is skipped by Tab and screen readers but stays mounted.

import { cn } from "@adhar-ui/utils";
import {
  collapsibleContentInnerVariants,
  collapsibleContentVariants,
} from "./collapsible.styles.ts";

@Component({
  selector: "adhar-collapsible-content",
  template: `
    <div
      [attr.id]="id"
      [attr.role]="'aria-labelledby' ? 'region' : undefined"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.data-state]="open ? 'open' : 'closed'"
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
export default class CollapsibleContent {
  @Input() open!: CollapsibleContentProps["open"];
  @Input() className!: CollapsibleContentProps["className"];
  @Input() innerClass!: CollapsibleContentProps["innerClass"];
  @Input() id!: CollapsibleContentProps["id"];

  get classes() {
    return cn(
      collapsibleContentVariants({
        open: !!this.open,
      }),
      this.className
    );
  }
  get innerClasses() {
    return cn(collapsibleContentInnerVariants(), this.innerClass);
  }
}
