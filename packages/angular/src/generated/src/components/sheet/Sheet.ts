// @ts-nocheck
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SheetProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  /** Edge the panel slides in from (default "right") */
  side?: "top" | "right" | "bottom" | "left";
  /** "alertdialog" for confirmations that need an explicit choice */
  role?: "dialog" | "alertdialog";
  /** Close when the backdrop is clicked (default true) */
  closeOnOverlayClick?: boolean;
  /** Close on Escape (default true) */
  closeOnEscape?: boolean;
  /** Render the top-right close button (default true) */
  showClose?: boolean;
  /** Accessible label for the close button (default "Close") */
  closeLabel?: string;
  /** ID of the sheet’s title — announced when the dialog opens */
  "aria-labelledby"?: string;
  /** ID of the sheet’s description */
  "aria-describedby"?: string;
  /** Label when there is no visible title */
  "aria-label"?: string;
  id?: string;
  className?: string;
  overlayClass?: string;
  /** Classes for the sheet panel (alias of className) */
  contentClass?: string;
  /** Fires when the sheet asks to close (Escape, backdrop, close button) */
  onClose?: () => void;
  /** Fires with the next open state */
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

// A dialog anchored to a screen edge. Same focus, Escape and scroll-lock
// behaviour as Dialog.

import { cn } from "@adhar-ui/utils";
import {
  sheetCloseVariants,
  sheetContentVariants,
  sheetOverlayVariants,
} from "./sheet.styles.ts";
import {
  focusInto,
  lockBodyScroll,
  trapTab,
  unlockBodyScroll,
} from "../_internal/dom.ts";

@Component({
  selector: "adhar-sheet",
  template: `
    <ng-container *ngIf="isOpen"
      ><div
        data-state="open"
        (click)="handleOverlayClick($event)"
        (keydown)="handleKeyDown($event)"
        [class]="overlayClasses"
      >
        <div
          aria-modal="true"
          data-state="open"
          #contentRef
          [attr.id]="id"
          [attr.role]="role || 'dialog'"
          [attr.aria-labelledby]="'aria-labelledby'"
          [attr.aria-describedby]="'aria-describedby'"
          [attr.aria-label]="'aria-label'"
          [attr.data-side]="side || 'right'"
          [attr.tabIndex]="-1"
          [class]="contentClasses"
        >
          <ng-content></ng-content>
          <ng-container *ngIf="showClose !== false"
            ><button
              type="button"
              [attr.aria-label]="closeLabel || 'Close'"
              (click)="requestClose()"
              [class]="closeClasses"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg></button
          ></ng-container>
        </div></div
    ></ng-container>
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
export default class Sheet {
  @Input() defaultOpen!: SheetProps["defaultOpen"];
  @Input() open!: SheetProps["open"];
  @Input() overlayClass!: SheetProps["overlayClass"];
  @Input() side!: SheetProps["side"];
  @Input() contentClass!: SheetProps["contentClass"];
  @Input() className!: SheetProps["className"];
  @Input() onClose!: SheetProps["onClose"];
  @Input() onOpenChange!: SheetProps["onOpenChange"];
  @Input() closeOnOverlayClick!: SheetProps["closeOnOverlayClick"];
  @Input() closeOnEscape!: SheetProps["closeOnEscape"];
  @Input() id!: SheetProps["id"];
  @Input() role!: SheetProps["role"];
  @Input() showClose!: SheetProps["showClose"];
  @Input() closeLabel!: SheetProps["closeLabel"];

  @ViewChild("contentRef") contentRef!: ElementRef;

  internalOpen = false;
  inst = {
    wasOpen: false,
    restoreTo: null as HTMLElement | null,
  };
  get isOpen() {
    return this.open !== undefined ? !!this.open : this.internalOpen;
  }
  get overlayClasses() {
    return cn(sheetOverlayVariants(), this.overlayClass);
  }
  get contentClasses() {
    return cn(
      sheetContentVariants({
        side: this.side,
      }),
      this.contentClass,
      this.className
    );
  }
  get closeClasses() {
    return cn(sheetCloseVariants());
  }
  requestClose() {
    this.internalOpen = false;
    this.onClose?.();
    this.onOpenChange?.(false);
  }
  handleOverlayClick(event: any) {
    if (
      event.target === event.currentTarget &&
      this.closeOnOverlayClick !== false
    ) {
      this.requestClose();
    }
  }
  handleKeyDown(event: any) {
    if (event.key === "Escape" && this.closeOnEscape !== false) {
      event.stopPropagation();
      this.requestClose();
      return;
    }
    trapTab(event, this.contentRef?.nativeElement);
  }
  syncOpen() {
    if (typeof document === "undefined") return;
    if (this.isOpen && !this.inst.wasOpen) {
      this.inst.wasOpen = true;
      this.inst.restoreTo = document.activeElement as HTMLElement;
      lockBodyScroll();
      setTimeout(() => focusInto(this.contentRef?.nativeElement));
    } else if (!this.isOpen && this.inst.wasOpen) {
      this.inst.wasOpen = false;
      unlockBodyScroll();
      const target = this.inst.restoreTo;
      this.inst.restoreTo = null;
      if (target && target.focus) setTimeout(() => target.focus());
    }
  }

  ngOnInit() {
    this.internalOpen = !!this.defaultOpen;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      this.syncOpen();
    }
  }

  ngOnDestroy() {
    if (this.inst.wasOpen) {
      this.inst.wasOpen = false;
      unlockBodyScroll();
    }
  }
}
