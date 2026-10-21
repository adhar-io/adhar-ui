// @ts-nocheck
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface RadioGroupProps {
  /** The value of the currently selected item */
  value?: string;
  /** Submits the selected value under this name */
  name?: string;
  form?: string;
  /** Disables the whole group */
  disabled?: boolean;
  /** Marks the group as required for form validation */
  required?: boolean;
  /** Layout direction — also drives arrow-key navigation */
  orientation?: "horizontal" | "vertical";
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /**
   * Fires with the value of the item the user picked (click, Space, or arrow
   * keys). Lets the group own selection instead of wiring every item’s onSelect.
   */
  onValueChange?: (value: string) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { radioGroupVariants } from "./radio-group.styles.ts";
import { rovingFocus, syncTabStops } from "../_internal/dom.ts";

@Component({
  selector: "adhar-radio-group",
  template: `
    <div
      role="radiogroup"
      #groupRef
      [attr.id]="id"
      [attr.aria-label]="'aria-label'"
      [attr.aria-labelledby]="'aria-labelledby'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.aria-orientation]="orientation || 'vertical'"
      [attr.aria-required]="required ? true : undefined"
      [attr.aria-disabled]="disabled ? true : undefined"
      [attr.data-orientation]="orientation || 'vertical'"
      [attr.data-disabled]="disabled ? '' : undefined"
      (keydown)="handleKeyDown($event)"
      (click)="handleClick($event)"
      [class]="classes"
    >
      <ng-content></ng-content>
      <ng-container *ngIf="name"
        ><input
          type="hidden"
          [attr.name]="name"
          [attr.value]="value || ''"
          [attr.form]="form"
      /></ng-container>
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
export default class RadioGroup {
  @Input() value!: RadioGroupProps["value"];
  @Input() orientation!: RadioGroupProps["orientation"];
  @Input() className!: RadioGroupProps["className"];
  @Input() disabled!: RadioGroupProps["disabled"];
  @Input() loop!: RadioGroupProps["loop"];
  @Input() onValueChange!: RadioGroupProps["onValueChange"];
  @Input() id!: RadioGroupProps["id"];
  @Input() required!: RadioGroupProps["required"];
  @Input() name!: RadioGroupProps["name"];
  @Input() form!: RadioGroupProps["form"];

  @ViewChild("groupRef") groupRef!: ElementRef;

  get classes() {
    return cn(
      radioGroupVariants({
        orientation: this.orientation,
      }),
      this.className
    );
  }
  syncTabs() {
    syncTabStops(
      this.groupRef?.nativeElement,
      '[role="radio"]',
      '[aria-checked="true"]'
    );
  }
  handleKeyDown(event: any) {
    if (this.disabled) return;
    rovingFocus(event, this.groupRef?.nativeElement, '[role="radio"]', {
      orientation: "both",
      loop: this.loop !== false,
      activate: true,
    });
  }
  handleClick(event: any) {
    if (this.disabled) return;
    const item = event.target.closest
      ? event.target.closest('[role="radio"]')
      : null;
    if (
      !item ||
      item.disabled ||
      !this.groupRef?.nativeElement ||
      !this.groupRef?.nativeElement.contains(item)
    )
      return;
    this.onValueChange?.(item.getAttribute("value") || "");
  }

  ngOnInit() {
    if (typeof window !== "undefined") {
      this.syncTabs();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      /* Wait for items to re-render their aria-checked before picking the tab stop. */
      setTimeout(() => this.syncTabs());
    }
  }
}
