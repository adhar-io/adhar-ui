import * as React from "react";

export interface CardContentProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { cardContentVariants } from "./card.styles.ts";

function CardContent(props: CardContentProps) {
  function classes() {
    return cn(cardContentVariants(), props.className);
  }

  return (
    <div id={props.id} className={classes()}>
      {props.children}
    </div>
  );
}

export default CardContent;
