'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { Fragment } from 'react';
import * as Select from '@radix-ui/react-select';
//TYPES MODULES

type SelectProps = Select.SelectProps;
type SelectContentProps = Select.SelectContentProps;
type SelectItemProps = Select.SelectItemProps;
type SelectValueProps = Select.SelectValueProps;

export type BaseSelectProps = {
  contentProps?: SelectContentProps;
  itemProps?: Partial<SelectItemProps>;
  valueProps?: SelectValueProps;
  withPortal?: boolean;
  options: Array<{ label: JSX.Element | string; value: string }>;
} & SelectProps;

const BaseSelect = ({
  contentProps: { className: contentClassName, ...contentProps } = {},
  itemProps = {},
  valueProps = {},
  options = [],
  withPortal = true,
  ...rootProps
}: BaseSelectProps) => {
  const selectRef = React.useRef<HTMLButtonElement>(null);
  const ContentWrapper = withPortal ? Select.Portal : Fragment;

  return (
    <Select.Root {...rootProps}>
      <Select.Trigger
        ref={selectRef}
        className={classcat([
          'flex items-center justify-between p-3 w-full h-12',
          'bg-yel-25 border border-blu-300 outline-none',
        ])}
      >
        <Select.Value {...valueProps} />
        <Select.Icon>
          <p>Icon here</p>
        </Select.Icon>
      </Select.Trigger>
      <ContentWrapper>
        <Select.Content
          ref={(ref) => {
            if (ref && selectRef.current) {
              ref.style.width = `${selectRef.current.offsetWidth}px`;
            }
          }}
          position="popper"
          side="bottom"
          sideOffset={-1}
          className={classcat([
            'flex max-h-[250px] bg-yel-50 border border-blu-300',
            contentClassName,
          ])}
          {...contentProps}
        >
          <Select.Viewport className="p-3">
            {/* <Select.Group> */}
            {options.map((option) => {
              const selectedValue = rootProps.value
                ? rootProps.value
                : rootProps.defaultValue;
              const isActive = selectedValue === option.value;
              return (
                <Select.Item
                  key={option.value}
                  className={classcat([
                    'pi-4 py-2 outline-none hover:bg-yel-25 [&>span]:text-14lig [&>span]:text-blu-400 cursor-pointer',
                    `${isActive ? 'bg-yel-25' : ''}`,
                  ])}
                  value={option.value}
                  {...itemProps}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              );
            })}
            {/* </Select.Group> */}
          </Select.Viewport>
        </Select.Content>
      </ContentWrapper>
    </Select.Root>
  );
};

export default BaseSelect;
