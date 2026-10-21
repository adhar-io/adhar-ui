// @ts-nocheck
import { Component, ViewChild, ElementRef, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TabsListProps {
  orientation?: "horizontal" | "vertical";
  /** Stretch the list and its triggers to the container width */
  fullWidth?: boolean;
  /**
   * ’automatic’ (default) selects a tab as soon as arrow keys focus it;
   * ’manual’ only moves focus — Enter / Space selects.
   */
  activationMode?: "automatic" | "manual";
  /** Wrap arrow-key navigation from last to first tab (default true) */
  loop?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { tabsListVariants } from "./tabs.styles.ts";
import { rovingFocus } from "../_internal/dom.ts";

@Component({
  selector: "adhar-tabs-list",
  template: `
    <div
      role="tablist"
      #listRef
      [attr.aria-orientation]="orientation || 'horizontal'"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      (keydown)="handleKeyDown($event)"
      [class]="classes"
    >
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
export default class TabsList {
  @Input() orientation!: TabsListProps["orientation"];
  @Input() fullWidth!: TabsListProps["fullWidth"];
  @Input() className!: TabsListProps["className"];
  @Input() loop!: TabsListProps["loop"];
  @Input() activationMode!: TabsListProps["activationMode"];

  @ViewChild("listRef") listRef!: ElementRef;

  get classes() {
    return cn(
      tabsListVariants({
        orientation: this.orientation,
        fullWidth: !!this.fullWidth,
      }),
      this.className
    );
  }
  handleKeyDown(event: any) {
    rovingFocus(event, this.listRef?.nativeElement, '[role="tab"]', {
      orientation: this.orientation === "vertical" ? "vertical" : "horizontal",
      loop: this.loop !== false,
      activate: this.activationMode !== "manual",
    });
  }
}
