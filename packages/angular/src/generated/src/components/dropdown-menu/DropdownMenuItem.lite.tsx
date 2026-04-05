// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface DropdownMenuItemProps {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: any;
}

@Component({
  selector: 'dropdown-menu-item',
  template: `
    <div
      role="menuitem"
      [attr.tabIndex]="disabled ? -1 : 0"
      [attr.aria-disabled]="disabled"
      (click)="
          if (!disabled) {
            onClick?.();
          }
        "
      (keydown)="
          if (($event.key === 'Enter' || $event.key === ' ') && !disabled) {
            $event.preventDefault();
            onClick?.();
          }
        "
      [class]="className"
    >
      <ng-content></ng-content>
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
export default class DropdownMenuItem {
  @Input()
  disabled!: DropdownMenuItemProps['disabled'];
  @Input()
  onClick!: DropdownMenuItemProps['onClick'];
  @Input()
  className!: DropdownMenuItemProps['className'];
}
