// @ts-nocheck
import * as React from "react";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

function Separator(props: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={props.orientation || "horizontal"}
      className={props.className}
    />
  );
}

export default Separator;
