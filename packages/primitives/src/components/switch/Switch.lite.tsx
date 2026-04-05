import { useMetadata, useState } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  thumbClass?: string;
  'aria-label'?: string;
  onChange?: (checked: boolean) => void;
}

export default function Switch(props: SwitchProps) {
  const state = useState({
    get isChecked() {
      return props.checked || false;
    },
    handleClick() {
      if (!props.disabled) {
        props.onChange?.(!state.isChecked);
      }
    },
    handleKeyDown(event: any) {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        state.handleClick();
      }
    },
  });

  return (
    <button
      type='button'
      role='switch'
      className={props.className}
      id={props.id}
      aria-checked={state.isChecked}
      aria-label={props['aria-label']}
      disabled={props.disabled}
      onClick={() => state.handleClick()}
      onKeyDown={(event) => state.handleKeyDown(event)}
    >
      <span className={props.thumbClass} />
    </button>
  );
}
