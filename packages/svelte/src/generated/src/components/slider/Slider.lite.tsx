// @ts-nocheck
<script context="module" lang="ts">
  export interface SliderProps {
    /** Current value (controlled) */
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    id?: string;
    className?: string;
    orientation?: "horizontal" | "vertical";
    "aria-label"?: string;
    "aria-labelledby"?: string;
    /** Human-readable value for screen readers (e.g. "$40", "Medium") */
    "aria-valuetext"?: string;
    /** Fires continuously while dragging */
    onInput?: (value: number) => void;
    /** Fires when the value is committed (drag end / keyboard) */
    onChange?: (value: number) => void;
  }
</script>

<script lang="ts">
  export let min: SliderProps["min"];
  export let max: SliderProps["max"];
  export let step: SliderProps["step"];
  export let value: SliderProps["value"];
  export let disabled: SliderProps["disabled"];
  export let name: SliderProps["name"];
  export let id: SliderProps["id"];
  export let orientation: SliderProps["orientation"];
  export let onInput: SliderProps["onInput"];
  export let onChange: SliderProps["onChange"];
  export let className: SliderProps["className"];
</script>

<input
  type="range"
  min={min || 0}
  max={max || 100}
  step={step || 1}
  {value}
  {disabled}
  {name}
  {id}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-valuetext={"aria-valuetext"}
  aria-orientation={orientation || "horizontal"}
  on:input={(event) => {
    onInput?.(Number(event.target.value));
  }}
  on:change={(event) => {
    onChange?.(Number(event.target.value));
  }}
  class={className}
/>