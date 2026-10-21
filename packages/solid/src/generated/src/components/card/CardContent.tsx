// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CardContentProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardContentVariants } from "./card.styles.ts";

function CardContent(props: CardContentProps) {
  const classes = createMemo(() => {
    return cn(cardContentVariants(), props.className);
  });

  return (
    <div class={classes()} id={props.id}>
      {props.children}
    </div>
  );
}

export default CardContent;
