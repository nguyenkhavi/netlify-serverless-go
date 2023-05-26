//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import * as Select from '@radix-ui/react-select';
//SHARED
import ChevronBottomIcon from '_@shared/icons/ChevronBottomIcon';
//TYPES MODULES
import type { SelectProps } from '@radix-ui/react-select';

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
  };
  options: { label: string; value: string }[];
  seeMore?: React.ReactNode;
} & SelectProps;

const BaseSelect = React.forwardRef<HTMLButtonElement, BaseSelectProps>(
  ({ name, placeholder, owStyles, options, seeMore, ...props }, ref) => {
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
          <Select.Content className="z-dropdown overflow-hidden rounded-e rounded-s border border-text-30 bg-black pb-4 pt-7">
            <Select.Viewport className="[&>[role~=option]:not(:last-child)]:mb-3.75">
              {options.map((option, index) => (
                <Select.Item
                  key={index}
                  value={option.value}
                  className="data-[highlighted]:text-red flex h-[25px] select-none items-center px-4.5 text-text-80"
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
