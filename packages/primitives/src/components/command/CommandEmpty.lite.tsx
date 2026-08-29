import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

export default function CommandEmpty(props: CommandEmptyProps) {
  return (
    <div role='presentation' className={props.className}>
      {props.children}
    </div>
  );
}
