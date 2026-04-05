// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

@Component({
  selector: 'separator',
  template: `
    <div
      role="separator"
      [attr.aria-orientation]="orientation || 'horizontal'"
      [class]="className"
    ></div>
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
export default class Separator {
  @Input()
  orientation!: SeparatorProps['orientation'];
  @Input()
  className!: SeparatorProps['className'];
}
