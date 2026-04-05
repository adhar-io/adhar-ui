// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface DialogDescriptionProps {
  className?: string;
  children?: any;
}

@Component({
  selector: 'dialog-description',
  template: ` <p [class]="className"><ng-content></ng-content></p> `,
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
export default class DialogDescription {
  @Input()
  className!: DialogDescriptionProps['className'];
}
