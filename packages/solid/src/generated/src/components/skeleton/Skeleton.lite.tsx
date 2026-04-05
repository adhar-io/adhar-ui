// @ts-nocheck
export interface SkeletonProps {
  className?: string;
}

function Skeleton(props: SkeletonProps) {
  return <div class={props.className} aria-hidden='true' role='presentation'></div>;
}

export default Skeleton;
