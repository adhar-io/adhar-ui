// @ts-nocheck
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

function Slider(props: SliderProps) {
  return (
    <input
      class={props.className}
      type="range"
      min={props.min || 0}
      max={props.max || 100}
      step={props.step || 1}
      value={props.value}
      disabled={props.disabled}
      name={props.name}
      id={props.id}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      aria-valuetext={props["aria-valuetext"]}
      aria-orientation={props.orientation || "horizontal"}
      onInput={(event) => props.onInput?.(Number(event.target.value))}
      onInput={(event) => props.onChange?.(Number(event.target.value))}
    />
  );
}

export default Slider;
