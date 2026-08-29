// @ts-nocheck
import { Show } from "solid-js";

export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

function CommandGroup(props: CommandGroupProps) {
  return (
    <div class={props.className} role="group">
      <Show when={props.heading}>
        <div class={props.headingClass} aria-hidden="true">
          {props.heading}
        </div>
      </Show>
      {props.children}
    </div>
  );
}

export default CommandGroup;
