import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { alertDescriptionVariants } from './alert.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-alert-description' },
});

export interface AlertDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function AlertDescription(props: AlertDescriptionProps) {
  const state = useStore({
    get classes(): string {
      return cn(alertDescriptionVariants(), props.className);
    },
  });

  return (
    <div className={state.classes} id={props.id}>
      {props.children}
    </div>
  );
}
