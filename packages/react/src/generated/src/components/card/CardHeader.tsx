import * as React from "react";

export interface CardHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardHeaderVariants } from "./card.styles.ts";

function CardHeader(props: CardHeaderProps) {
  function classes() {
    return cn(cardHeaderVariants(), props.className);
  }

  return (
    <div id={props.id} className={classes()}>
      {props.children}
    </div>
  );
}

export default CardHeader;
