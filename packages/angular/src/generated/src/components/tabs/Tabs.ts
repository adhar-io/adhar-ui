// @ts-nocheck
import { Component, ViewChild, ElementRef, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface TabsProps {
  /** The active tab’s value */
  value?: string;
  /** @deprecated Pass `value`; kept for data-active-tab on first render */
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  id?: string;
  /**
   * Fires with a tab’s value when the user activates it (click, or arrow keys
   * in TabsList). Lets the root own selection instead of every trigger’s onClick.
   */
  onValueChange?: (value: string) => void;
  /** Alias of `onValueChange` */
  onChange?: (value: string) => void;
  children?: any;
}

@Component({
  selector: "adhar-tabs",
  template: `
    <div
      data-adhar-tabs=""
      #rootRef
      [attr.id]="id"
      [attr.data-active-tab]="activeTab"
      [attr.data-orientation]="orientation || 'horizontal'"
      (click)="handleClick($event)"
      [class]="className"
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
export default class Tabs {
  @Input() value!: TabsProps["value"];
  @Input() defaultValue!: TabsProps["defaultValue"];
  @Input() onValueChange!: TabsProps["onValueChange"];
  @Input() onChange!: TabsProps["onChange"];
  @Input() id!: TabsProps["id"];
  @Input() orientation!: TabsProps["orientation"];
  @Input() className!: TabsProps["className"];

  @ViewChild("rootRef") rootRef!: ElementRef;

  get activeTab() {
    return this.value || this.defaultValue || "";
  }
  handleClick(event: any) {
    const tab = event.target.closest
      ? event.target.closest('[role="tab"]')
      : null;
    if (
      !tab ||
      tab.disabled ||
      !this.rootRef?.nativeElement ||
      !this.rootRef?.nativeElement.contains(tab)
    )
      return;
    /* Ignore tabs that belong to a nested Tabs. */
    if (tab.closest("[data-adhar-tabs]") !== this.rootRef?.nativeElement)
      return;
    const value = tab.getAttribute("data-value") || "";
    if (value === this.activeTab) return;
    this.onValueChange?.(value);
    this.onChange?.(value);
  }
}
