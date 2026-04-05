// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
  'aria-label'?: string;
  onChange?: (checked: boolean) => void;
}

@Component({
  selector: 'checkbox',
  template: `
    <input
      type="checkbox"
      role="checkbox"
      [attr.checked]="isChecked"
      [attr.disabled]="disabled"
      [attr.required]="required"
      [attr.name]="name"
      [attr.id]="id"
      [attr.value]="value"
      [attr.aria-checked]="isChecked"
      [attr.aria-label]="'aria-label'"
      (change)="handleChange($event)"
      [class]="className"
    />
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
export default class Checkbox {
  @Input()
  disabled!: CheckboxProps['disabled'];
  @Input()
  required!: CheckboxProps['required'];
  @Input()
  name!: CheckboxProps['name'];
  @Input()
  id!: CheckboxProps['id'];
  @Input()
  value!: CheckboxProps['value'];
  @Input()
  className!: CheckboxProps['className'];
}
