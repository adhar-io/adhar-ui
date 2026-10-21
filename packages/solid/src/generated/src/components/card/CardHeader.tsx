// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CardHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardHeaderVariants } from "./card.styles.ts";

function CardHeader(props: CardHeaderProps) {
  const classes = createMemo(() => {
    return cn(cardHeaderVariants(), props.className);
  });

  return (
    <div class={classes()} id={props.id}>
      {props.children}
    </div>
  );
}

export default CardHeader;
