import { Show, useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface EmptyStateProps {
  title?: string;
  description?: string;
  /** Optional illustration/icon element shown in the media circle */
  icon?: any;
  className?: string;
  iconClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  /** Actions (buttons/links) rendered below the copy */
  children?: any;
}

export default function EmptyState(props: EmptyStateProps) {
  return (
    <div className={props.className} role='status'>
      <Show when={props.icon}>
        <div className={props.iconClass} aria-hidden='true'>{props.icon}</div>
      </Show>
      <Show when={props.title}>
        <h3 className={props.titleClass}>{props.title}</h3>
      </Show>
      <Show when={props.description}>
        <p className={props.descriptionClass}>{props.description}</p>
      </Show>
      <Show when={props.children}>
        <div className='mt-2 flex flex-wrap items-center justify-center gap-2'>
          {props.children}
        </div>
      </Show>
    </div>
  );
}
