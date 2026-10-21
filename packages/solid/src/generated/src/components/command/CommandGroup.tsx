// @ts-nocheck
import { Show, createSignal, createMemo } from "solid-js";

export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import {
  commandGroupHeadingVariants,
  commandGroupVariants,
} from "./command.styles.ts";

function CommandGroup(props: CommandGroupProps) {
  const classes = createMemo(() => {
    return cn(commandGroupVariants(), props.className);
  });

  const headingClasses = createMemo(() => {
    return cn(commandGroupHeadingVariants(), props.headingClass);
  });

  return (
    <div class={classes()} role="group" aria-label={props.heading}>
      <Show when={props.heading}>
        <div class={headingClasses()} aria-hidden="true">
          {props.heading}
        </div>
      </Show>
      {props.children}
    </div>
  );
}

export default CommandGroup;
