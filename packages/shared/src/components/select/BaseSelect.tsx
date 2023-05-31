//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import * as Select from '@radix-ui/react-select';
//SHARED
import ChevronBottomIcon from '_@shared/icons/ChevronBottomIcon';
//TYPES MODULES
import type { SelectProps, SelectContentProps } from '@radix-ui/react-select';

const baseClasses = [
  'p-[5px] h-8.75 bg-black',
  'inline-flex items-center justify-center',
  'rounded-lg border-[.5px] border-text-10',
  'px-4 text-body3 text-text-80 outline-none',
];

export type BaseSelectProps = {
  name: string;
  placeholder?: string;
  owStyles?: {
    triggerClasses?: string;
    itemClasses?: string;
    contentClasses?: string;
  };
  options: { label: string; value: string }[];
  seeMore?: React.ReactNode;
  selectContentProps?: SelectContentProps;
} & SelectProps;

const BaseSelect = React.forwardRef<HTMLButtonElement, BaseSelectProps>(
  ({ name, placeholder, owStyles, options, seeMore, selectContentProps, ...props }, ref) => {
    return (
      <Select.Root {...props}>
        <Select.Trigger ref={ref} className={classcat([baseClasses, owStyles?.triggerClasses])}>
          <Select.Value placeholder={placeholder} />
          <input type="hidden" name={name} />
          <Select.Icon className="ml-1">
            <ChevronBottomIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={classcat([
              'z-dropdown overflow-hidden rounded-e rounded-s border border-text-30 bg-black pb-4 pt-7',
              owStyles?.contentClasses,
            ])}
            {...selectContentProps}
          >
            <Select.Viewport>
              {options.map((option, index) => (
                <Select.Item
                  key={index}
                  value={option.value}
                  className={classcat([
                    'data-[highlighted]:text-red flex h-[25px] cursor-pointer select-none items-center px-4.5 text-text-80',
                    'my-1.75 outline-none hover:text-primary',
                    owStyles?.itemClasses,
                  ])}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
              {seeMore}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  },
);

BaseSelect.displayName = 'BaseSelect';
export default BaseSelect;
