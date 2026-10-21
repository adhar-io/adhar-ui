import * as React from "react";

export interface CardTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardTitleVariants } from "./card.styles.ts";

function CardTitle(props: CardTitleProps) {
  function classes() {
    return cn(cardTitleVariants(), props.className);
  }

  return (
    <h3 id={props.id} className={classes()}>
      {props.children}
    </h3>
  );
}

export default CardTitle;
