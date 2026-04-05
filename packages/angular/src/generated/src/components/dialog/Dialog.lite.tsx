// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface DialogProps {
  open?: boolean;
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  onClose?: () => void;
  children?: any;
}

@Component({
  selector: 'dialog',
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
            [attr.tabIndex]="-1"
            [class]="contentClass"
          >
            <ng-content></ng-content>
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
export default class Dialog {
  @Input()
  open!: DialogProps['open'];
  @Input()
  overlayClass!: DialogProps['overlayClass'];
  @Input()
  contentClass!: DialogProps['contentClass'];
}
