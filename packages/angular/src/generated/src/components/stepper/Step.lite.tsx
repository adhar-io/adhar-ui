// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface StepProps {
  state?: "complete" | "current" | "upcoming" | "error";
  /** Number shown in the indicator when not complete */
  stepNumber?: number;
  label?: string;
  description?: string;
  /** Hide the trailing connector on the last step */
  last?: boolean;
  clickable?: boolean;
  className?: string;
  indicatorClass?: string;
  connectorClass?: string;
  labelClass?: string;
  descriptionClass?: string;
  onSelect?: () => void;
  children?: any;
}

@Component({
  selector: "step",
  template: `
    <li
      [attr.aria-current]="state === 'current' ? 'step' : undefined"
      [class]="className"
    >
      <button
        type="button"
        [attr.disabled]="!clickable"
        [attr.aria-label]="label"
        (click)="onSelect?.()"
        [class]="indicatorClass"
      >
        <ng-container *ngIf="state === 'complete'"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5"></path></svg
        ></ng-container>
        <ng-container *ngIf="state !== 'complete'"
          ><span>{{stepNumber}}</span></ng-container
        >
      </button>
      <div>
        <ng-container *ngIf="label"
          ><span [class]="labelClass">{{label}}</span></ng-container
        >
        <ng-container *ngIf="description"
          ><span [class]="descriptionClass">{{description}}</span></ng-container
        >
        <ng-content></ng-content>
      </div>
      <ng-container *ngIf="!last"
        ><span aria-hidden="true" [class]="connectorClass"></span
      ></ng-container>
    </li>
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
export default class Step {
  @Input() state!: StepProps["state"];
  @Input() className!: StepProps["className"];
  @Input() clickable!: StepProps["clickable"];
  @Input() label!: StepProps["label"];
  @Input() onSelect!: StepProps["onSelect"];
  @Input() indicatorClass!: StepProps["indicatorClass"];
  @Input() stepNumber!: StepProps["stepNumber"];
  @Input() labelClass!: StepProps["labelClass"];
  @Input() description!: StepProps["description"];
  @Input() descriptionClass!: StepProps["descriptionClass"];
  @Input() last!: StepProps["last"];
  @Input() connectorClass!: StepProps["connectorClass"];
}
