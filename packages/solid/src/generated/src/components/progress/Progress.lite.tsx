// @ts-nocheck
export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  indicatorClass?: string;
  "aria-label"?: string;
}

function Progress(props: ProgressProps) {
  return (
    <div
      class={props.className}
      role="progressbar"
      aria-valuenow={props.value || 0}
      aria-valuemin={0}
      aria-valuemax={props.max || 100}
      aria-label={props["aria-label"] || "Progress"}
    >
      <div
        class={props.indicatorClass}
        style={{
          transform: `translateX(-${100 - (props.value || 0)}%)`,
        }}
      ></div>
    </div>
  );
}

export default Progress;
