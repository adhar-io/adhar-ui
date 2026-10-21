// @ts-nocheck
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DropdownMenuProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /** Close the menu after an item is chosen (default true) */
  closeOnSelect?: boolean;
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  disabled?: boolean;
  /** Prefix for the menu id, wired to the trigger’s aria-controls */
  id?: string;
  className?: string;
  /** Trigger classes. Defaults to an outline button. */
  triggerClass?: string;
  contentClass?: string;
  /** Accessible label for the trigger when its content is an icon */
  triggerLabel?: string;
  onOpenChange?: (open: boolean) => void;
  /** Content of the trigger button (text or icon — not another button) */
  trigger?: any;
  children?: any;
}

// WAI-ARIA menu button: Enter / Space / ArrowDown open the menu on the first
// item, ArrowUp on the last; arrows, Home and End move between items; Escape
// and Tab close it. Outside clicks hit a transparent backdrop.

import { cn } from "@adhar-ui/utils";
import { dropdownMenuContentVariants } from "./dropdown-menu.styles.ts";
import { buttonVariants } from "../button/button.styles.ts";
import { placementVariants } from "../_internal/placement.styles.ts";
import { rovingFocus } from "../_internal/dom.ts";

@Component({
  selector: "adhar-dropdown-menu",
  template: `
    <div [attr.data-state]="isOpen ? 'open' : 'closed'" [class]="rootClasses">
      <button
        type="button"
        aria-haspopup="menu"
        #triggerRef
        [attr.disabled]="disabled"
        [attr.aria-label]="triggerLabel"
        [attr.aria-expanded]="isOpen"
        [attr.aria-controls]="isOpen ? menuId : undefined"
        [attr.data-state]="isOpen ? 'open' : 'closed'"
        (click)="setOpen(!isOpen, false)"
        (keydown)="handleTriggerKeyDown($event)"
        [class]="triggerClasses"
      >
        {{trigger}}
      </button>
      <ng-container *ngIf="isOpen"
        ><div
          aria-hidden="true"
          class="fixed inset-0 z-40"
          (click)="setOpen(false, true)"
        ></div>
        <div
          role="menu"
          aria-orientation="vertical"
          data-state="open"
          #contentRef
          [attr.id]="menuId"
          [attr.data-side]="resolvedSide"
          [attr.tabIndex]="-1"
          (keydown)="handleContentKeyDown($event)"
          (click)="handleContentClick($event)"
          [class]="contentClasses"
        >
          <ng-content></ng-content></div
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
export default class DropdownMenu {
  @Input() defaultOpen!: DropdownMenuProps["defaultOpen"];
  @Input() open!: DropdownMenuProps["open"];
  @Input() side!: DropdownMenuProps["side"];
  @Input() id!: DropdownMenuProps["id"];
  @Input() className!: DropdownMenuProps["className"];
  @Input() triggerClass!: DropdownMenuProps["triggerClass"];
  @Input() align!: DropdownMenuProps["align"];
  @Input() contentClass!: DropdownMenuProps["contentClass"];
  @Input() disabled!: DropdownMenuProps["disabled"];
  @Input() onOpenChange!: DropdownMenuProps["onOpenChange"];
  @Input() loop!: DropdownMenuProps["loop"];
  @Input() closeOnSelect!: DropdownMenuProps["closeOnSelect"];
  @Input() triggerLabel!: DropdownMenuProps["triggerLabel"];
  @Input() trigger!: DropdownMenuProps["trigger"];

  @ViewChild("triggerRef") triggerRef!: ElementRef;
  @ViewChild("contentRef") contentRef!: ElementRef;

  internalOpen = false;
  inst = {
    focusLast: false,
  };
  get isOpen() {
    return this.open !== undefined ? !!this.open : this.internalOpen;
  }
  get resolvedSide() {
    return this.side || "bottom";
  }
  get menuId() {
    return this.id ? this.id + "-menu" : undefined;
  }
  get rootClasses() {
    return cn("relative inline-block", this.className);
  }
  get triggerClasses() {
    return this.triggerClass === undefined
      ? buttonVariants({
          variant: "outline",
        })
      : this.triggerClass;
  }
  get contentClasses() {
    return cn(
      placementVariants({
        side: this.resolvedSide,
        align: this.align || "start",
      }),
      dropdownMenuContentVariants(),
      this.contentClass
    );
  }
  setOpen(next: boolean, restoreFocus: boolean) {
    if (next && this.disabled) return;
    this.internalOpen = next;
    this.onOpenChange?.(next);
    if (!next && restoreFocus && this.triggerRef?.nativeElement)
      this.triggerRef?.nativeElement.focus();
  }
  focusItem(last: boolean) {
    if (!this.contentRef?.nativeElement) return;
    const items = Array.from(
      this.contentRef?.nativeElement.querySelectorAll(
        '[role="menuitem"]:not([aria-disabled="true"])'
      )
    ) as HTMLElement[];
    const target = last ? items[items.length - 1] : items[0];
    (target || this.contentRef?.nativeElement).focus();
  }
  handleTriggerKeyDown(event: any) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      this.inst.focusLast = event.key === "ArrowUp";
      if (this.isOpen) this.focusItem(this.inst.focusLast);
      else this.setOpen(true, false);
    }
  }
  handleContentKeyDown(event: any) {
    if (event.key === "Escape") {
      event.stopPropagation();
      this.setOpen(false, true);
      return;
    }
    if (event.key === "Tab") {
      this.setOpen(false, false);
      return;
    }
    rovingFocus(event, this.contentRef?.nativeElement, '[role="menuitem"]', {
      orientation: "vertical",
      loop: this.loop !== false,
    });
  }
  handleContentClick(event: any) {
    const item = event.target.closest
      ? event.target.closest('[role="menuitem"]')
      : null;
    if (!item || item.getAttribute("aria-disabled") === "true") return;
    if (this.closeOnSelect !== false) this.setOpen(false, true);
  }

  ngOnInit() {
    this.internalOpen = !!this.defaultOpen;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      if (this.isOpen) {
        const last = this.inst.focusLast;
        this.inst.focusLast = false;
        setTimeout(() => this.focusItem(last));
      }
    }
  }
}
