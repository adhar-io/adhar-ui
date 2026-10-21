// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CardTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardTitleVariants } from "./card.styles.ts";

function CardTitle(props: CardTitleProps) {
  const classes = createMemo(() => {
    return cn(cardTitleVariants(), props.className);
  });

  return (
    <h3 class={classes()} id={props.id}>
      {props.children}
    </h3>
  );
}

export default CardTitle;
