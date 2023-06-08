//THIRD PARTY MODULES
import classcat from 'classcat';
import { ElementRef, forwardRef } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon';
//RELATIVE MODULES
import Show from '../Show';

export type BaseCheckboxProps = {
  label?: string;
  labelClasses?: string;
  rootClasses?: string;
  value?: boolean;
  onChange?: (checked: boolean) => void;
} & Checkbox.CheckboxProps;

const BaseCheckbox = forwardRef<ElementRef<typeof Checkbox.Root>, BaseCheckboxProps>(
  (
    {
      id,
      label,
      labelClasses,
      className,
      value,
      defaultChecked,
      rootClasses,
      onChange = () => {},
      ...props
    },
    ref,
  ) => {
    const currentValue = value || defaultChecked;
    return (
      <div className={classcat(['flex', className])}>
        <Checkbox.Root
          ref={ref}
          className={classcat([
            'h-4 w-4 appearance-none  bg-transparent',
            'flex items-center justify-center',
            'mt-2 shrink-0 rounded border border-text-50',
            rootClasses,
          ])}
          id={id}
          defaultChecked={currentValue}
          onCheckedChange={onChange}
          {...props}
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <Show when={label}>
          <label className={classcat(['ml-2 text-body3 text-text-50', labelClasses])} htmlFor={id}>
            {label}
          </label>
        </Show>
      </div>
    );
  },
);

BaseCheckbox.displayName = 'BaseCheckbox';

export default BaseCheckbox;
