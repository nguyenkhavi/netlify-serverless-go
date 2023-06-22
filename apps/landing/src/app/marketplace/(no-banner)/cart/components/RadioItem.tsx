//THIRD PARTY MODULES
import classcat from 'classcat';
import { cloneElement } from 'react';
import { Indicator, Item } from '@radix-ui/react-radio-group';

type RadioItemProps = {
  value: string;
  label: string;
  valueSelect: string;
  icon: React.ReactNode;
};

export default function RadioItem({ value, label, icon, valueSelect }: RadioItemProps) {
  return (
    <label className="flex items-center">
      <Item
        value={value}
        className={classcat([
          'relative mr-4 xlg:mr-8',
          'focus-visible:outline-none',
          'h-6 w-6 rounded-full border border-[#BEBEBE]',
          'data-[state="checked"]:border-primary',
        ])}
      >
        <Indicator
          className={classcat([
            'h-4.25 w-4.25 rounded-full bg-primary',
            'absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2',
          ])}
        />
      </Item>
      <div
        className={classcat([
          'flex grow cursor-pointer items-center justify-between rounded-lg p-6',
          valueSelect === value ? 'border-green-gradient' : 'border-2 border-text-20',
        ])}
      >
        <p
          className={classcat([
            'text-body2',
            valueSelect === value ? 'text-primary' : 'text-text-70',
          ])}
        >
          {label}
        </p>
        {cloneElement(icon as React.ReactElement, {
          className: classcat([valueSelect !== value ? '[&_path]:fill-text-70' : '']),
        })}
      </div>
    </label>
  );
}
