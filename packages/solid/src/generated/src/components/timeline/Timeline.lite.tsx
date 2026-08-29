// @ts-nocheck
export interface TimelineProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function Timeline(props: TimelineProps) {
  return (
    <ol class={props.className} aria-label={props["aria-label"] || "Timeline"}>
      {props.children}
    </ol>
  );
}

export default Timeline;
