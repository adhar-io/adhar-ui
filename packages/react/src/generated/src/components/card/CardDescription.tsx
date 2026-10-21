import * as React from "react";

export interface CardDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardDescriptionVariants } from "./card.styles.ts";

function CardDescription(props: CardDescriptionProps) {
  function classes() {
    return cn(cardDescriptionVariants(), props.className);
  }

  return (
    <p id={props.id} className={classes()}>
      {props.children}
    </p>
  );
}

export default CardDescription;
