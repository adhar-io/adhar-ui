<script context="module" lang="ts">
  export interface SliderProps {
    /** Current value (controlled) */
    value?: number;
    /** Initial value when uncontrolled */
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    size?: "sm" | "default" | "lg";
    name?: string;
    id?: string;
    form?: string;
    /** ID of a <datalist> with tick marks */
    list?: string;
    className?: string;
    orientation?: "horizontal" | "vertical";
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    /** Human-readable value for screen readers (e.g. "$40", "Medium") */
    "aria-valuetext"?: string;
    /** Fires continuously while dragging */
    onInput?: (value: number) => void;
    /** Alias of `onInput` */
    onValueChange?: (value: number) => void;
    /** Fires when the value is committed (drag end / keyboard) */
    onChange?: (value: number) => void;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { sliderVariants } from "./slider.styles.ts";

  export let size: SliderProps["size"] = undefined;
  export let orientation: SliderProps["orientation"] = undefined;
  export let className: SliderProps["className"] = undefined;
  export let onInput: SliderProps["onInput"] = undefined;
  export let onValueChange: SliderProps["onValueChange"] = undefined;
  export let min: SliderProps["min"] = undefined;
  export let max: SliderProps["max"] = undefined;
  export let step: SliderProps["step"] = undefined;
  export let value: SliderProps["value"] = undefined;
  export let defaultValue: SliderProps["defaultValue"] = undefined;
  export let disabled: SliderProps["disabled"] = undefined;
  export let name: SliderProps["name"] = undefined;
  export let id: SliderProps["id"] = undefined;
  export let form: SliderProps["form"] = undefined;
  export let list: SliderProps["list"] = undefined;
  export let onChange: SliderProps["onChange"] = undefined;

  function handleInput(event: any) {
    const next = Number(event.target.value);
    onInput?.(next);
    onValueChange?.(next);
  }
  $: classes = () => {
    return cn(
      sliderVariants({
        size: size,
      }),
      orientation === "vertical"
        ? "[writing-mode:vertical-lr] [direction:rtl] h-auto w-5"
        : "",
      className
    );
  };
</script>

<input
  type="range"
  min={min === undefined ? 0 : min}
  max={max === undefined ? 100 : max}
  step={step || 1}
  {value}
  {defaultValue}
  {disabled}
  {name}
  {id}
  {form}
  {list}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-describedby={"aria-describedby"}
  aria-valuetext={"aria-valuetext"}
  aria-orientation={orientation || "horizontal"}
  on:input={(event) => {
    handleInput(event);
  }}
  on:change={(event) => {
    onChange?.(Number(event.target.value));
  }}
  class={classes()}
/>