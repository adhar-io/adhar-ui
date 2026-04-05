// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  indicatorClass?: string;
  'aria-label'?: string;
}

@Component({
  selector: 'progress',
  template: `
    <div
      role="progressbar"
      [attr.aria-valuenow]="value || 0"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max || 100"
      [attr.aria-label]="'aria-label' || 'Progress'"
      [class]="className"
    >
      <div
        [ngStyle]="{
          transform: \`translateX(-\${100 - (value || 0)}%)\`
        }"
        [class]="indicatorClass"
      ></div>
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
export default class Progress {
  @Input()
  value!: ProgressProps['value'];
  @Input()
  max!: ProgressProps['max'];
  @Input()
  className!: ProgressProps['className'];
  @Input()
  indicatorClass!: ProgressProps['indicatorClass'];
}
