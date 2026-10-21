import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { labelVariants } from './label.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-label' },
});

export interface LabelProps {
  /** ID of the form control this label is bound to (compiles to `for` per framework) */
  htmlFor?: string;
  id?: string;
  /** Appends a required marker (*). The control itself should also set `required`. */
  required?: boolean;
  /** Dims the label to match a disabled control that is not its `peer` sibling */
  disabled?: boolean;
  className?: string;
  children?: any;
}

export default function Label(props: LabelProps) {
  const state = useStore({
    get classes(): string {
      return cn(
        labelVariants({ required: !!props.required }),
        props.disabled ? 'cursor-not-allowed opacity-70' : '',
        props.className,
      );
    },
  });

  return (
    <label
      className={state.classes}
      id={props.id}
      htmlFor={props.htmlFor}
      data-disabled={props.disabled ? '' : undefined}
    >
      {props.children}
    </label>
  );
}
