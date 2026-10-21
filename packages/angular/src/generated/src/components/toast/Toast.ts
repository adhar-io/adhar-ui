// @ts-nocheck
import { Component, Input, SimpleChanges } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface ToastProps {
  /** Visible unless explicitly false */
  open?: boolean;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  className?: string;
  titleClass?: string;
  descriptionClass?: string;
  closeClass?: string;
  title?: string;
  description?: string;
  /**
   * Auto-dismiss after this many ms (calls onClose). 0 or omitted keeps the
   * toast open. The timer pauses while hovered or focused.
   */
  duration?: number;
  /** Hide the close button (e.g. when an action closes the toast) */
  hideClose?: boolean;
  /** Accessible label for the close button (default "Close") */
  closeLabel?: string;
  onClose?: () => void;
  /** Actions or extra content below the description */
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import {
  toastCloseVariants,
  toastDescriptionVariants,
  toastTitleVariants,
  toastVariants,
} from "./toast.styles.ts";

@Component({
  selector: "adhar-toast",
  template: `
    <ng-container *ngIf="isOpen"
      ><div
        aria-atomic="true"
        data-state="open"
        [attr.role]="isUrgent ? 'alert' : 'status'"
        [attr.aria-live]="isUrgent ? 'assertive' : 'polite'"
        (mouseenter)="stopTimer()"
        (mouseleave)="startTimer()"
        (focusin)="stopTimer()"
        (focusout)="startTimer()"
        [class]="classes"
      >
        <div class="grid flex-1 gap-1">
          <ng-container *ngIf="title"
            ><div [class]="titleClasses">{{title}}</div></ng-container
          >
          <ng-container *ngIf="description"
            ><div [class]="descriptionClasses">
              {{description}}
            </div></ng-container
          >
          <ng-content></ng-content>
        </div>
        <ng-container *ngIf="!hideClose"
          ><button
            type="button"
            [attr.aria-label]="closeLabel || 'Close'"
            (click)="onClose?.()"
            [class]="closeClasses"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
        ></ng-container></div
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
export default class Toast {
  @Input() duration!: ToastProps["duration"];
  @Input() open!: ToastProps["open"];
  @Input() variant!: ToastProps["variant"];
  @Input() className!: ToastProps["className"];
  @Input() titleClass!: ToastProps["titleClass"];
  @Input() descriptionClass!: ToastProps["descriptionClass"];
  @Input() closeClass!: ToastProps["closeClass"];
  @Input() onClose!: ToastProps["onClose"];
  @Input() title!: ToastProps["title"];
  @Input() description!: ToastProps["description"];
  @Input() hideClose!: ToastProps["hideClose"];
  @Input() closeLabel!: ToastProps["closeLabel"];

  inst = {
    timer: 0 as any,
  };
  get isOpen() {
    return this.open !== false;
  }
  get isUrgent() {
    return this.variant === "destructive" || this.variant === "warning";
  }
  get classes() {
    return cn(
      toastVariants({
        variant: this.variant,
      }),
      this.className
    );
  }
  get titleClasses() {
    return cn(toastTitleVariants(), this.titleClass);
  }
  get descriptionClasses() {
    return cn(toastDescriptionVariants(), this.descriptionClass);
  }
  get closeClasses() {
    return cn(toastCloseVariants(), this.closeClass);
  }
  stopTimer() {
    if (this.inst.timer) clearTimeout(this.inst.timer);
    this.inst.timer = 0;
  }
  startTimer() {
    this.stopTimer();
    if (!this.isOpen || !this.duration || this.duration <= 0) return;
    this.inst.timer = setTimeout(() => {
      this.inst.timer = 0;
      this.onClose?.();
    }, this.duration);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof window !== "undefined") {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
