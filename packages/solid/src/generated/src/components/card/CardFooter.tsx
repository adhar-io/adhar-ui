// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CardFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardFooterVariants } from "./card.styles.ts";

function CardFooter(props: CardFooterProps) {
  const classes = createMemo(() => {
    return cn(cardFooterVariants(), props.className);
  });

  return (
    <div class={classes()} id={props.id}>
      {props.children}
    </div>
  );
}

export default CardFooter;
