import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { alertTitleVariants } from './alert.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-alert-title' },
});

export interface AlertTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function AlertTitle(props: AlertTitleProps) {
  const state = useStore({
    get classes(): string {
      return cn(alertTitleVariants(), props.className);
    },
  });

  return (
    <h5 className={state.classes} id={props.id}>
      {props.children}
    </h5>
  );
}
