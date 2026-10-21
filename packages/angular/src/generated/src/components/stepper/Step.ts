// @ts-nocheck
import { Component, Input } from "@angular/core";

import { CommonModule } from "@angular/common";

export interface StepProps {
  state?: "complete" | "current" | "upcoming" | "error";
  /** Number shown in the indicator when not complete */
  stepNumber?: number;
  label?: string;
  description?: string;
  /** Match the parent Stepper’s orientation */
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "default" | "lg";
  /** Hide the trailing connector on the last step */
  last?: boolean;
  /** Lets users jump to this step via the indicator */
  clickable?: boolean;
  className?: string;
  indicatorClass?: string;
  connectorClass?: string;
  labelClass?: string;
  descriptionClass?: string;
  onSelect?: () => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import {
  stepConnectorClass,
  stepDescriptionVariants,
  stepIndicatorClass,
  stepLabelClass,
  stepVariants,
} from "./stepper.styles.ts";

@Component({
  selector: "adhar-step",
  template: `
    <li
      [attr.aria-current]="stepState === 'current' ? 'step' : undefined"
      [attr.data-state]="stepState"
      [class]="classes"
    >
      <button
        type="button"
        [attr.disabled]="!clickable"
        [attr.aria-label]="label ? label + ', ' + statusText : statusText"
        (click)="onSelect?.()"
        [class]="indicatorClasses"
      >
        <ng-container *ngIf="stepState === 'complete'"
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
        <ng-container *ngIf="stepState === 'error'"
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
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path></svg
        ></ng-container>
        <ng-container
          *ngIf="stepState === 'current' || stepState === 'upcoming'"
          ><span aria-hidden="true">{{stepNumber}}</span></ng-container
        >
      </button>
      <div class="min-w-0">
        <ng-container *ngIf="label"
          ><span
            aria-hidden="true"
            [class]="labelClasses"
            >{{label}}</span
          ></ng-container
        >
        <ng-container *ngIf="description"
          ><span
            [class]="descriptionClasses"
            >{{description}}</span
          ></ng-container
        >
        <ng-content></ng-content>
      </div>
      <ng-container *ngIf="!last"
        ><span aria-hidden="true" [class]="connectorClasses"></span
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
  @Input() orientation!: StepProps["orientation"];
  @Input() className!: StepProps["className"];
  @Input() size!: StepProps["size"];
  @Input() clickable!: StepProps["clickable"];
  @Input() indicatorClass!: StepProps["indicatorClass"];
  @Input() connectorClass!: StepProps["connectorClass"];
  @Input() labelClass!: StepProps["labelClass"];
  @Input() descriptionClass!: StepProps["descriptionClass"];
  @Input() label!: StepProps["label"];
  @Input() onSelect!: StepProps["onSelect"];
  @Input() stepNumber!: StepProps["stepNumber"];
  @Input() description!: StepProps["description"];
  @Input() last!: StepProps["last"];

  get stepState() {
    return this.state || "upcoming";
  }
  get classes() {
    return cn(
      stepVariants({
        orientation: this.orientation,
      }),
      this.className
    );
  }
  get indicatorClasses() {
    return cn(
      stepIndicatorClass(this.stepState, this.size),
      this.clickable
        ? "cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        : "cursor-default",
      this.indicatorClass
    );
  }
  get connectorClasses() {
    return cn(
      stepConnectorClass(this.stepState, this.orientation),
      this.connectorClass
    );
  }
  get labelClasses() {
    return cn(stepLabelClass(this.stepState), "block", this.labelClass);
  }
  get descriptionClasses() {
    return cn(stepDescriptionVariants(), "block", this.descriptionClass);
  }
  get statusText() {
    if (this.stepState === "complete") return "Completed";
    if (this.stepState === "current") return "Current step";
    if (this.stepState === "error") return "Error";
    return "Not started";
  }
}
