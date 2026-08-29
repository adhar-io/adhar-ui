// @ts-nocheck
import * as React from "react";

export interface CommandSeparatorProps {
  className?: string;
}

function CommandSeparator(props: CommandSeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={props.className}
    />
  );
}

export default CommandSeparator;
