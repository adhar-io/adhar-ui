// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface AccordionProps {
  type?: 'single' | 'multiple';
  className?: string;
  children?: any;
}

@Component({
  selector: 'accordion',
  template: `
    <div [attr.data-type]="type || 'single'" [class]="className">
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
export default class Accordion {
  @Input()
  type!: AccordionProps['type'];
  @Input()
  className!: AccordionProps['className'];
}
