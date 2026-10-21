// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

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
  const classes = createMemo(() => {
    return cn(
      separatorVariants({
        orientation: props.orientation,
      }),
      props.className
    );
  });

  const isDecorative = createMemo(() => {
    return props.decorative !== false;
  });

  return (
    <div
      class={classes()}
      role={isDecorative() ? "none" : "separator"}
      aria-orientation={
        isDecorative() ? undefined : props.orientation || "horizontal"
      }
      data-orientation={props.orientation || "horizontal"}
    ></div>
  );
}

export default Separator;
