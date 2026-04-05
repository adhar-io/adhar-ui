// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface DropdownMenuProps {
  open?: boolean;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  onOpenChange?: (open: boolean) => void;
  trigger?: any;
  children?: any;
}

@Component({
  selector: 'dropdown-menu',
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
        aria-haspopup="menu"
        [attr.aria-expanded]="isOpen"
        (click)="toggle()"
        [class]="triggerClass"
      >
        {{trigger}}
      </button>
      <ng-container *ngIf="isOpen"
        ><div
          role="menu"
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
export default class DropdownMenu {
  @Input()
  className!: DropdownMenuProps['className'];
  @Input()
  triggerClass!: DropdownMenuProps['triggerClass'];
  @Input()
  trigger!: DropdownMenuProps['trigger'];
  @Input()
  contentClass!: DropdownMenuProps['contentClass'];
}
