import * as React from "react";

export interface CardFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardFooterVariants } from "./card.styles.ts";

function CardFooter(props: CardFooterProps) {
  function classes() {
    return cn(cardFooterVariants(), props.className);
  }

  return (
    <div id={props.id} className={classes()}>
      {props.children}
    </div>
  );
}

export default CardFooter;
