import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CommandSeparatorProps {
  className?: string;
}

export default function CommandSeparator(props: CommandSeparatorProps) {
  return <div role='separator' aria-orientation='horizontal' className={props.className} />;
}
