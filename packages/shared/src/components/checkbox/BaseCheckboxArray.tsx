//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { forwardRef, useId } from 'react';
//SHARED
import CheckIndicatorIcon from '_@shared/icons/CheckIndicatorIcon';

const checkboxTypeClasses = {
  tick: <CheckIndicatorIcon className="text-white" />,
} as const;

export type BaseCheckboxProps = {
  iconType?: keyof typeof checkboxTypeClasses;
  checkboxClassName?: string;
  borderClassName?: string;
  labelClassName?: string;
  label?: string | React.ReactNode;
  // labelRender?: () => React.ReactNode;
  name: string;
} & React.ComponentPropsWithRef<'input'>;

const BaseCheckboxArray = forwardRef(function CheckBox(
  {
    labelClassName,
    iconType = 'tick',
    checkboxClassName,
    borderClassName,
    label,
    disabled,
    ...props
  }: BaseCheckboxProps,
  forwardRef: React.ForwardedRef<HTMLInputElement>,
) {
  const refLabel = React.useRef<HTMLLabelElement>(null);
  const id = useId();
  return (
    <label
      tabIndex={0}
      id={id}
      onKeyDown={(e) => {
        if (e.code === 'Space') {
          e.preventDefault();
          refLabel.current?.click();
          return false;
        }
      }}
      ref={refLabel}
      className={classcat([
        'group outline-none',
        'flex items-center [&_*]:cursor-pointer [&_*]:select-none',
        disabled ? 'opacity-50 ow:[&_*]:cursor-not-allowed' : '',
      ])}
    >
      <div className={classcat(['relative h-4 w-4', checkboxClassName])}>
        <input
          {...props}
          ref={forwardRef}
          className="peer invisible absolute opacity-0"
          type="checkbox"
        />
        <div
          className={classcat([
            'group flex h-full w-full items-center justify-center',
            'rounded-sm border-[1px] border-primary-700 bg-transparent disabled:opacity-50',
            'peer-checked:border-0 peer-checked:bg-primary-shade-300',
            'group-focus-visible:border-primary-shade-200 group-focus-visible:ring-1 group-focus-visible:ring-primary-shade-300',
            borderClassName,
          ])}
        />
        <div className="absolute inset-0 hidden place-content-center peer-checked:grid">
          {checkboxTypeClasses[iconType]}
        </div>
      </div>

      {label ? <span className={classcat(['flex-1 ps-1.5', labelClassName])}>{label}</span> : null}
    </label>
  );
});

export default BaseCheckboxArray;
