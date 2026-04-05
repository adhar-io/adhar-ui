// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface SkeletonProps {
  className?: string;
}

@Component({
  selector: 'skeleton',
  template: `
    <div aria-hidden="true" role="presentation" [class]="className"></div>
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
export default class Skeleton {
  @Input()
  className!: SkeletonProps['className'];
}
