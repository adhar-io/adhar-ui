// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CardProps {
  /** Inner padding. Use ’none’ (default) with CardHeader / CardContent / CardFooter. */
  padding?: "none" | "sm" | "default" | "lg";
  /**
   * Hover / focus affordance for clickable cards. With `onClick` the card is
   * also focusable and activated by Enter / Space.
   */
  interactive?: boolean;
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  onClick?: (event: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardVariants } from "./card.styles.ts";

function Card(props: CardProps) {
  const isInteractive = createMemo(() => {
    return !!props.interactive || !!props.onClick;
  });

  const classes = createMemo(() => {
    return cn(
      cardVariants({
        padding: props.padding,
        interactive: isInteractive(),
      }),
      props.className
    );
  });

  function handleKeyDown(event: any) {
    if (
      props.onClick &&
      event.target === event.currentTarget &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      props.onClick(event);
    }
  }

  return (
    <div
      class={classes()}
      id={props.id}
      role={props.role || (props.onClick ? "button" : undefined)}
      tabIndex={props.onClick ? 0 : undefined}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      onClick={(event) => props.onClick?.(event)}
      onKeyDown={(event) => handleKeyDown(event)}
    >
      {props.children}
    </div>
  );
}

export default Card;
