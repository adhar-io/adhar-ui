import * as React from "react";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  /**
   * Purely visual separators (the default) are hidden from assistive tech.
   * Set false when the separator divides meaningful sections.
   */
  decorative?: boolean;
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { separatorVariants } from "./separator.styles.ts";

function Separator(props: SeparatorProps) {
  function classes() {
    return cn(
      separatorVariants({
        orientation: props.orientation,
      }),
      props.className
    );
  }

  function isDecorative() {
    return props.decorative !== false;
  }

  return (
    <div
      role={isDecorative() ? "none" : "separator"}
      aria-orientation={
        isDecorative() ? undefined : props.orientation || "horizontal"
      }
      data-orientation={props.orientation || "horizontal"}
      className={classes()}
    />
  );
}

export default Separator;
