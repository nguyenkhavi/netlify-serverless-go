'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { forwardRef } from 'react';
import {
  Content,
  Item,
  ItemText,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
  SelectProps,
} from '@radix-ui/react-select';
//SHARED
import { Assign } from '_@shared/utils/type';
import ChevronUpIcon from '_@shared/icons/ChevronUpIcon';
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
//RELATIVE MODULES
import Show from './Show';

const triggerClasses = [
  'relative',
  'w-full bg-secondary/70',
  'rounded-[5px] border-[.5px] border-text-10',
  'focus-visible:outline-none focus-visible:ring focus-visible:ring-orange-600',
  'data-[valid="false"]:border-error',
];

const scrollButtonClasses = ['grid place-items-center'];

export type BaseSelectOption = {
  value: string;
  label: string;
};

export type BaseSelectProps = Assign<
  SelectProps,
  {
    isValid?: boolean;
    id?: string;
    name?: string;
    fieldLabel?: string;
    placeholder?: string;
    value?: string;
    onChange?: (newValue: string) => void;
    options: BaseSelectOption[];
    owStyles?: {
      triggerClasses?: string;
    };
  }
>;

const BaseSelect = forwardRef<HTMLButtonElement, BaseSelectProps>(
  (
    {
      isValid = true,
      id = '',
      name = '',
      fieldLabel = '',
      placeholder = '',
      defaultValue = '',
      value = '',
      onChange = () => {},
      options = [],
      owStyles,
      ...props
    },
    forwardedRef,
  ) => {
    const currentValue = value || defaultValue;
    const valueLabel =
      options.find((option) => option.value === currentValue)?.label || placeholder;

    return (
      <Root
        {...props}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onChange}
      >
        <Trigger
          ref={forwardedRef}
          id={id}
          className={classcat([triggerClasses, owStyles?.triggerClasses])}
          data-valid={isValid}
        >
          <Show when={fieldLabel}>
            <span className="absolute left-3.25 top-1.5 text-subtitle2 text-text-20">
              {fieldLabel}
            </span>
          </Show>
          <Value asChild>
            <span
              className={classcat([
                'absolute left-3.25 text-subtitle2',
                currentValue ? 'text-text-50' : 'text-text-20',
                fieldLabel ? 'bottom-1.5' : 'top-1/2 -translate-y-1/2',
              ])}
            >
              {valueLabel}
            </span>
          </Value>
          <ChevronDownIcon
            aria-hidden="true"
            className="absolute bottom-1/2 right-2.5 translate-y-1/2 text-text-30"
          />
        </Trigger>

        <Portal style={{ zIndex: 20 }}>
          <Content
            className={classcat(['rounded-[5px] border-[.5px] border-white/20 bg-secondary'])}
          >
            <ScrollUpButton className={classcat([scrollButtonClasses])}>
              <ChevronUpIcon />
            </ScrollUpButton>

            <Viewport className="max-h-[60vh]">
              {options.map((option) => (
                <Item
                  key={option.value}
                  value={option.value}
                  className={classcat([
                    'cursor-pointer select-none transition',
                    'px-5 py-1.5',
                    'text-body1 text-text-30',
                    'data-[state="checked"]:bg-secondary-300 data-[state="checked"]:text-text-100',
                    'data-[highlighted]:bg-secondary-300 data-[highlighted]:data-[state="checked"]:bg-secondary-400 data-[highlighted]:outline-none',
                  ])}
                >
                  <ItemText>{option.label}</ItemText>
                </Item>
              ))}
            </Viewport>

            <ScrollDownButton className={classcat([scrollButtonClasses])}>
              <ChevronDownIcon />
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>
    );
  },
);

BaseSelect.displayName = 'BaseSelect';
export default BaseSelect;
