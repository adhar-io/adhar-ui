// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface PopoverProps {
  open?: boolean;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  onOpenChange?: (open: boolean) => void;
  trigger?: any;
  children?: any;
}

@Component({
  selector: 'popover',
  template: `
    <div
      [ngStyle]="{
          position: 'relative',
          display: 'inline-block'
        }"
      [class]="className"
    >
      <button
        type="button"
        aria-haspopup="dialog"
        [attr.aria-expanded]="isOpen"
        (click)="toggle()"
        [class]="triggerClass"
      >
        {{trigger}}
      </button>
      <ng-container *ngIf="isOpen"
        ><div
          role="dialog"
          (keydown)="handleKeyDown($event)"
          [attr.tabIndex]="-1"
          [class]="contentClass"
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
  @Input()
  className!: PopoverProps['className'];
  @Input()
  triggerClass!: PopoverProps['triggerClass'];
  @Input()
  trigger!: PopoverProps['trigger'];
  @Input()
  contentClass!: PopoverProps['contentClass'];
}
