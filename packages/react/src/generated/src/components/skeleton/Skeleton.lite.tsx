// @ts-nocheck
import * as React from "react";

export interface SkeletonProps {
  className?: string;
}

function Skeleton(props: SkeletonProps) {
  return (
    <div aria-hidden="true" role="presentation" className={props.className} />
  );
}

export default Skeleton;
