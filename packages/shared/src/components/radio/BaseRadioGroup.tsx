'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { forwardRef } from 'react';
import { Root, Item, Indicator, RadioGroupProps } from '@radix-ui/react-radio-group';
//SHARED
import { Assign } from '_@shared/utils/type';

export type BaseRadioGroupOption = {
  value: string;
  label: string;
};

export type BaseRadioGroupProps = Assign<
  RadioGroupProps,
  {
    isValid?: boolean;
    ariaLabel?: string;
    className?: string;
    options: BaseRadioGroupOption[];
    onChange?: (value: string) => void;
  }
>;

const BaseRadioGroup = forwardRef<HTMLDivElement, BaseRadioGroupProps>(
  (
    { isValid = true, ariaLabel = '', options = [], className = '', onChange = () => {}, ...props },
    forwardRef,
  ) => {
    return (
      <Root
        {...props}
        ref={forwardRef}
        aria-label={ariaLabel}
        data-valid={isValid}
        onValueChange={onChange}
        className={classcat([
          'grid',
          'data-[valid="false"]:ring data-[valid="false"]:ring-error',
          className,
        ])}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={classcat([
              'group cursor-pointer select-none',
              'inline-grid auto-cols-max grid-flow-col items-center gap-2',
            ])}
          >
            <Item
              id={option.value}
              value={option.value}
              className={classcat([
                'relative',
                'focus-visible:outline-none',
                'h-3.5 w-3.5 rounded-full border border-grey-200',
                'group-hover:border-text-100',
              ])}
            >
              <Indicator
                className={classcat([
                  'h-2 w-2 rounded-full bg-grey-200 group-hover:bg-text-100',
                  'absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2',
                ])}
              />
            </Item>
            <span className="text-base text-text-80 group-hover:text-text-100">{option.label}</span>
          </label>
        ))}
      </Root>
    );
  },
);

BaseRadioGroup.displayName = 'BaseRadioGroup';
export default BaseRadioGroup;
