// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CardDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardDescriptionVariants } from "./card.styles.ts";

function CardDescription(props: CardDescriptionProps) {
  const classes = createMemo(() => {
    return cn(cardDescriptionVariants(), props.className);
  });

  return (
    <p class={classes()} id={props.id}>
      {props.children}
    </p>
  );
}

export default CardDescription;
