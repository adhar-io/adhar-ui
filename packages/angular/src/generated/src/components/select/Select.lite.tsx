// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface SelectProps {
  value?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  'aria-label'?: string;
  onChange?: (event: any) => void;
  children?: any;
}

@Component({
  selector: 'select',
  template: `
    <select
      [attr.value]="value"
      [attr.disabled]="disabled"
      [attr.required]="required"
      [attr.name]="name"
      [attr.id]="id"
      [attr.aria-label]="'aria-label'"
      (change)="onChange?.($event)"
      [class]="className"
    >
      <ng-content></ng-content>
    </select>
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
export default class Select {
  @Input()
  value!: SelectProps['value'];
  @Input()
  disabled!: SelectProps['disabled'];
  @Input()
  required!: SelectProps['required'];
  @Input()
  name!: SelectProps['name'];
  @Input()
  id!: SelectProps['id'];
  @Input()
  onChange!: SelectProps['onChange'];
  @Input()
  className!: SelectProps['className'];
}
