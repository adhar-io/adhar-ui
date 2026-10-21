import { Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import {
  emptyStateDescriptionVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateVariants,
} from './empty-state.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-empty-state' },
});

export interface EmptyStateProps {
  title?: string;
  description?: string;
  size?: 'sm' | 'default' | 'lg';
  /** Optional illustration/icon element shown in the media circle */
  icon?: any;
  /**
   * ARIA role. Use "status" when the empty state appears in response to a
   * user action (e.g. a search with no results) so it is announced.
   */
  role?: string;
  className?: string;
  iconClass?: string;
  titleClass?: string;
  descriptionClass?: string;
  /** Actions (buttons/links) rendered below the copy */
  children?: any;
}

export default function EmptyState(props: EmptyStateProps) {
  const state = useStore({
    get classes(): string {
      return cn(emptyStateVariants({ size: props.size }), props.className);
    },
    get iconClasses(): string {
      return cn(emptyStateIconVariants({ size: props.size }), props.iconClass);
    },
    get titleClasses(): string {
      return cn(emptyStateTitleVariants(), props.titleClass);
    },
    get descriptionClasses(): string {
      return cn(emptyStateDescriptionVariants(), props.descriptionClass);
    },
  });

  return (
    <div className={state.classes} role={props.role}>
      <Show when={props.icon}>
        <div className={state.iconClasses} aria-hidden='true'>{props.icon}</div>
      </Show>
      <Show when={props.title}>
        <h3 className={state.titleClasses}>{props.title}</h3>
      </Show>
      <Show when={props.description}>
        <p className={state.descriptionClasses}>{props.description}</p>
      </Show>
      <Show when={props.children}>
        <div className='mt-2 flex flex-wrap items-center justify-center gap-2'>
          {props.children}
        </div>
      </Show>
    </div>
  );
}
