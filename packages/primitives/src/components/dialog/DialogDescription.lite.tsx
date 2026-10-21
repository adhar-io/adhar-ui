import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { dialogDescriptionVariants } from './dialog.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dialog-description' },
});

export interface DialogDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Dialog as `aria-describedby`.
export default function DialogDescription(props: DialogDescriptionProps) {
  const state = useStore({
    get classes(): string {
      return cn(dialogDescriptionVariants(), props.className);
    },
  });

  return (
    <p className={state.classes} id={props.id}>
      {props.children}
    </p>
  );
}
