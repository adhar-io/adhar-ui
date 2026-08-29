// @ts-nocheck
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  export let state: StepProps["state"];
  export let className: StepProps["className"];
  export let clickable: StepProps["clickable"];
  export let label: StepProps["label"];
  export let onSelect: StepProps["onSelect"];
  export let indicatorClass: StepProps["indicatorClass"];
  export let stepNumber: StepProps["stepNumber"];
  export let labelClass: StepProps["labelClass"];
  export let description: StepProps["description"];
  export let descriptionClass: StepProps["descriptionClass"];

  export let last: StepProps["last"];
  export let connectorClass: StepProps["connectorClass"];
</script>

<li aria-current={state === "current" ? "step" : undefined} class={className}>
  <button
    type="button"
    disabled={!clickable}
    aria-label={label}
    on:click={(event) => {
      onSelect?.();
    }}
    class={indicatorClass}
  >
    {#if state === "complete"}
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
    {#if state !== "complete"}
      <span>{stepNumber}</span>
    {/if}</button
  >
  <div>
    {#if label}
      <span class={labelClass}>{label}</span>
    {/if}
    {#if description}
      <span class={descriptionClass}>{description}</span>
    {/if}<slot />
  </div>
  {#if !last}
    <span aria-hidden="true" class={connectorClass} />
  {/if}
</li>