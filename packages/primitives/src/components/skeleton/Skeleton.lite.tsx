import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface SkeletonProps {
  className?: string;
}

export default function Skeleton(props: SkeletonProps) {
  return <div className={props.className} aria-hidden='true' role='presentation' />;
}
