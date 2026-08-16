// @ts-nocheck
import * as React from "react";

export interface DropdownMenuSeparatorProps {
  className?: string;
}

function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  return <div role="separator" className={props.className} />;
}

export default DropdownMenuSeparator;
