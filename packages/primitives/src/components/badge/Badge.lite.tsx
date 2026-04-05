import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  children?: any;
}

export default function Badge(props: BadgeProps) {
  return (
    <div className={props.className} role='status'>
      {props.children}
    </div>
  );
}
