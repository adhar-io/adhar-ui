// @ts-nocheck
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface PopoverProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /** Move focus into the content on open (default true) */
  autoFocus?: boolean;
  disabled?: boolean;
  /** Prefix for the content id, wired to the trigger’s aria-controls */
  id?: string;
  className?: string;
  /** Trigger classes. Defaults to an outline button. */
  triggerClass?: string;
  contentClass?: string;
  /** Accessible label for the trigger when its content is an icon */
  triggerLabel?: string;
  /** Accessible label for the popover panel */
  "aria-label"?: string;
  onOpenChange?: (open: boolean) => void;
  /** Content of the trigger button (text or icon — not another button) */
  trigger?: any;
  children?: any;
}

// Closes on Escape, on a click outside (via a transparent backdrop, so it needs
// no document listeners), and when focus tabs out of the popover.

import { cn } from "@adhar-ui/utils";
import { popoverContentVariants } from "./popover.styles.ts";
import { buttonVariants } from "../button/button.styles.ts";
import { placementVariants } from "../_internal/placement.styles.ts";
import { focusInto } from "../_internal/dom.ts";

@Component({
  selector: "adhar-popover",
  template: `
    <div
      #rootRef
      [attr.data-state]="isOpen ? 'open' : 'closed'"
      (keydown)="handleKeyDown($event)"
      (focusout)="handleFocusOut($event)"
      [class]="rootClasses"
    >
      <button
        type="button"
        aria-haspopup="dialog"
        #triggerRef
        [attr.disabled]="disabled"
        [attr.aria-label]="triggerLabel"
        [attr.aria-expanded]="isOpen"
        [attr.aria-controls]="isOpen ? contentId : undefined"
        [attr.data-state]="isOpen ? 'open' : 'closed'"
        (click)="setOpen(!isOpen, false)"
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
          role="dialog"
          data-state="open"
          #contentRef
          [attr.id]="contentId"
          [attr.aria-label]="'aria-label'"
          [attr.data-side]="resolvedSide"
          [attr.tabIndex]="-1"
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
export default class Popover {
  @Input() defaultOpen!: PopoverProps["defaultOpen"];
  @Input() autoFocus!: PopoverProps["autoFocus"];
  @Input() open!: PopoverProps["open"];
  @Input() side!: PopoverProps["side"];
  @Input() id!: PopoverProps["id"];
  @Input() className!: PopoverProps["className"];
  @Input() triggerClass!: PopoverProps["triggerClass"];
  @Input() align!: PopoverProps["align"];
  @Input() contentClass!: PopoverProps["contentClass"];
  @Input() disabled!: PopoverProps["disabled"];
  @Input() onOpenChange!: PopoverProps["onOpenChange"];
  @Input() triggerLabel!: PopoverProps["triggerLabel"];
  @Input() trigger!: PopoverProps["trigger"];

  @ViewChild("rootRef") rootRef!: ElementRef;
  @ViewChild("triggerRef") triggerRef!: ElementRef;
  @ViewChild("contentRef") contentRef!: ElementRef;

  internalOpen = false;
  get isOpen() {
    return this.open !== undefined ? !!this.open : this.internalOpen;
  }
  get resolvedSide() {
    return this.side || "bottom";
  }
  get contentId() {
    return this.id ? this.id + "-content" : undefined;
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
        align: this.align,
      }),
      popoverContentVariants(),
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
  handleKeyDown(event: any) {
    if (event.key === "Escape" && this.isOpen) {
      event.stopPropagation();
      this.setOpen(false, true);
    }
  }
  handleFocusOut(event: any) {
    const next = event.relatedTarget;
    if (
      this.isOpen &&
      next &&
      this.rootRef?.nativeElement &&
      !this.rootRef?.nativeElement.contains(next)
    )
      this.setOpen(false, false);
  }

  ngOnInit() {
    this.internalOpen = !!this.defaultOpen;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      if (this.isOpen && this.autoFocus !== false)
        setTimeout(() => focusInto(this.contentRef?.nativeElement));
    }
  }
}
