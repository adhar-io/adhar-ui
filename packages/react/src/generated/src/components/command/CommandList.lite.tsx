// @ts-nocheck
import * as React from "react";

export interface CommandListProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function CommandList(props: CommandListProps) {
  return (
    <div
      role="listbox"
      id={props.id}
      aria-label={props["aria-label"] || "Suggestions"}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default CommandList;
