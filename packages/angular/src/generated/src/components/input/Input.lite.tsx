// @ts-nocheck
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
}

@Component({
  selector: 'input',
  template: `
    <input
      [attr.type]="type || 'text'"
      [attr.placeholder]="placeholder"
      [attr.value]="value"
      [attr.disabled]="disabled"
      [attr.readOnly]="readonly"
      [attr.required]="required"
      [attr.name]="name"
      [attr.id]="id"
      [attr.aria-label]="'aria-label'"
      [attr.aria-describedby]="'aria-describedby'"
      [attr.aria-invalid]="'aria-invalid'"
      (change)="onChange?.($event)"
      (focus)="onFocus?.($event)"
      (blur)="onBlur?.($event)"
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
export default class Input {
  @Input()
  type!: InputProps['type'];
  @Input()
  placeholder!: InputProps['placeholder'];
  @Input()
  value!: InputProps['value'];
  @Input()
  disabled!: InputProps['disabled'];
  @Input()
  readonly!: InputProps['readonly'];
  @Input()
  required!: InputProps['required'];
  @Input()
  name!: InputProps['name'];
  @Input()
  id!: InputProps['id'];
  @Input()
  onChange!: InputProps['onChange'];
  @Input()
  onFocus!: InputProps['onFocus'];
  @Input()
  onBlur!: InputProps['onBlur'];
  @Input()
  className!: InputProps['className'];
}
