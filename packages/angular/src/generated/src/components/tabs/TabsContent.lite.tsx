// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface TabsContentProps {
  value: string;
  active?: boolean;
  className?: string;
  children?: any;
}

@Component({
  selector: 'tabs-content',
  template: `
    <div
      role="tabpanel"
      [attr.data-value]="value"
      [attr.hidden]="!active"
      [attr.tabIndex]="0"
      [class]="className"
    >
      <ng-container *ngIf="active"><ng-content></ng-content></ng-container>
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
export default class TabsContent {
  @Input()
  value!: TabsContentProps['value'];
  @Input()
  active!: TabsContentProps['active'];
  @Input()
  className!: TabsContentProps['className'];
}
