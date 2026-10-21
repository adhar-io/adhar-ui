// @ts-nocheck
import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
} from "@angular/core";

import { CommonModule } from "@angular/common";

export interface DialogProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  size?: "sm" | "default" | "lg" | "xl" | "full";
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
  /** ID of the DialogTitle — announced when the dialog opens */
  "aria-labelledby"?: string;
  /** ID of the DialogDescription */
  "aria-describedby"?: string;
  /** Label when there is no visible title */
  "aria-label"?: string;
  id?: string;
  className?: string;
  overlayClass?: string;
  /** Classes for the dialog panel (alias of className) */
  contentClass?: string;
  /** Fires when the dialog asks to close (Escape, backdrop, close button) */
  onClose?: () => void;
  /** Fires with the next open state */
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

// Focus moves into the dialog on open (the first [data-autofocus] element, else
// the first focusable one) and returns to the previously focused element on
// close. Tab is trapped inside and page scroll is locked while open.

import { cn } from "@adhar-ui/utils";
import {
  dialogCloseVariants,
  dialogContentVariants,
  dialogOverlayVariants,
} from "./dialog.styles.ts";
import {
  focusInto,
  lockBodyScroll,
  trapTab,
  unlockBodyScroll,
} from "../_internal/dom.ts";

@Component({
  selector: "adhar-dialog",
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
export default class Dialog {
  @Input() defaultOpen!: DialogProps["defaultOpen"];
  @Input() open!: DialogProps["open"];
  @Input() overlayClass!: DialogProps["overlayClass"];
  @Input() size!: DialogProps["size"];
  @Input() contentClass!: DialogProps["contentClass"];
  @Input() className!: DialogProps["className"];
  @Input() onClose!: DialogProps["onClose"];
  @Input() onOpenChange!: DialogProps["onOpenChange"];
  @Input() closeOnOverlayClick!: DialogProps["closeOnOverlayClick"];
  @Input() closeOnEscape!: DialogProps["closeOnEscape"];
  @Input() id!: DialogProps["id"];
  @Input() role!: DialogProps["role"];
  @Input() showClose!: DialogProps["showClose"];
  @Input() closeLabel!: DialogProps["closeLabel"];

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
    return cn(dialogOverlayVariants(), this.overlayClass);
  }
  get contentClasses() {
    return cn(
      dialogContentVariants({
        size: this.size,
      }),
      this.contentClass,
      this.className
    );
  }
  get closeClasses() {
    return cn(dialogCloseVariants());
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
