<script context="module" lang="ts">
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
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import {
    stepConnectorClass,
    stepDescriptionVariants,
    stepIndicatorClass,
    stepLabelClass,
    stepVariants,
  } from "./stepper.styles.ts";

  export let state: StepProps["state"] = undefined;
  export let orientation: StepProps["orientation"] = undefined;
  export let className: StepProps["className"] = undefined;
  export let size: StepProps["size"] = undefined;
  export let clickable: StepProps["clickable"] = undefined;
  export let indicatorClass: StepProps["indicatorClass"] = undefined;
  export let connectorClass: StepProps["connectorClass"] = undefined;
  export let labelClass: StepProps["labelClass"] = undefined;
  export let descriptionClass: StepProps["descriptionClass"] = undefined;
  export let label: StepProps["label"] = undefined;
  export let onSelect: StepProps["onSelect"] = undefined;
  export let stepNumber: StepProps["stepNumber"] = undefined;
  export let description: StepProps["description"] = undefined;

  export let last: StepProps["last"] = undefined;

  $: stepState = () => {
    return state || "upcoming";
  };
  $: classes = () => {
    return cn(
      stepVariants({
        orientation: orientation,
      }),
      className
    );
  };
  $: indicatorClasses = () => {
    return cn(
      stepIndicatorClass(stepState(), size),
      clickable
        ? "cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        : "cursor-default",
      indicatorClass
    );
  };
  $: connectorClasses = () => {
    return cn(stepConnectorClass(stepState(), orientation), connectorClass);
  };
  $: labelClasses = () => {
    return cn(stepLabelClass(stepState()), "block", labelClass);
  };
  $: descriptionClasses = () => {
    return cn(stepDescriptionVariants(), "block", descriptionClass);
  };
  $: statusText = () => {
    if (stepState() === "complete") return "Completed";
    if (stepState() === "current") return "Current step";
    if (stepState() === "error") return "Error";
    return "Not started";
  };
</script>

<li
  aria-current={stepState() === "current" ? "step" : undefined}
  data-state={stepState()}
  class={classes()}
>
  <button
    type="button"
    disabled={!clickable}
    aria-label={label ? label + ", " + statusText() : statusText()}
    on:click={(event) => {
      onSelect?.();
    }}
    class={indicatorClasses()}
  >
    {#if stepState() === "complete"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg
      >
    {/if}
    {#if stepState() === "error"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
      >
    {/if}
    {#if stepState() === "current" || stepState() === "upcoming"}
      <span aria-hidden="true">{stepNumber}</span>
    {/if}</button
  >
  <div class="min-w-0">
    {#if label}
      <span aria-hidden="true" class={labelClasses()}>{label}</span>
    {/if}
    {#if description}
      <span class={descriptionClasses()}>{description}</span>
    {/if}<slot />
  </div>
  {#if !last}
    <span aria-hidden="true" class={connectorClasses()} />
  {/if}
</li>