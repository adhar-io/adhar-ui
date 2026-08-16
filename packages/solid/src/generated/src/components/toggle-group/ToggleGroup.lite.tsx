// @ts-nocheck
export interface ToggleGroupProps {
  /** 'single' allows one active item, 'multiple' allows many (semantic hint) */
  type?: "single" | "multiple";
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children?: any;
}

function ToggleGroup(props: ToggleGroupProps) {
  return (
    <div
      class={props.className}
      role="group"
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      aria-disabled={props.disabled}
      data-type={props.type || "single"}
      data-orientation={props.orientation || "horizontal"}
    >
      {props.children}
    </div>
  );
}

export default ToggleGroup;
