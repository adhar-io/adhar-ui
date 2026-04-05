// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface ToastProps {
  open?: boolean;
  variant?: 'default' | 'destructive' | 'success';
  className?: string;
  titleClass?: string;
  descriptionClass?: string;
  closeClass?: string;
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  children?: any;
}

@Component({
  selector: 'toast',
  template: `
    <div>
      <ng-container *ngIf="isOpen"
        ><div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          [class]="className"
        >
          <div>
            <ng-container *ngIf="title"
              ><div [class]="titleClass">{{title}}</div></ng-container
            >
            <ng-container *ngIf="description"
              ><div [class]="descriptionClass">
                {{description}}
              </div></ng-container
            >
            <ng-content></ng-content>
          </div>
          <button
            type="button"
            aria-label="Close"
            (click)="onClose?.()"
            [class]="closeClass"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div></ng-container
      >
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
export default class Toast {
  @Input()
  className!: ToastProps['className'];
  @Input()
  title!: ToastProps['title'];
  @Input()
  titleClass!: ToastProps['titleClass'];
  @Input()
  description!: ToastProps['description'];
  @Input()
  descriptionClass!: ToastProps['descriptionClass'];
  @Input()
  onClose!: ToastProps['onClose'];
  @Input()
  closeClass!: ToastProps['closeClass'];
}
