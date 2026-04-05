// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface TabsTriggerProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (value: string) => void;
  children?: any;
}

@Component({
  selector: 'tabs-trigger',
  template: `
    <button
      type="button"
      role="tab"
      [attr.aria-selected]="active"
      [attr.disabled]="disabled"
      [attr.tabIndex]="active ? 0 : -1"
      [attr.data-value]="value"
      (click)="onClick?.(value)"
      [class]="className"
    >
      <ng-content></ng-content>
    </button>
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
export default class TabsTrigger {
  @Input()
  active!: TabsTriggerProps['active'];
  @Input()
  disabled!: TabsTriggerProps['disabled'];
  @Input()
  value!: TabsTriggerProps['value'];
  @Input()
  onClick!: TabsTriggerProps['onClick'];
  @Input()
  className!: TabsTriggerProps['className'];
}
