// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface SheetProps {
  open?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  onClose?: () => void;
  children?: any;
}

@Component({
  selector: "sheet",
  template: `
    <div>
      <ng-container *ngIf="open"
        ><div
          (click)="handleOverlayClick($event)"
          (keydown)="handleKeyDown($event)"
          [class]="overlayClass"
        >
          <div
            role="dialog"
            aria-modal="true"
            [attr.data-side]="side || 'right'"
            [attr.tabIndex]="-1"
            [class]="contentClass"
          >
            <ng-content></ng-content>
            <button
              type="button"
              aria-label="Close"
              (click)="onClose?.()"
              [ngStyle]="{
          position: 'absolute',
          top: '16px',
          right: '16px'
        }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div></div
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
export default class Sheet {
  @Input() open!: SheetProps["open"];
  @Input() overlayClass!: SheetProps["overlayClass"];
  @Input() side!: SheetProps["side"];
  @Input() contentClass!: SheetProps["contentClass"];
  @Input() onClose!: SheetProps["onClose"];
}
