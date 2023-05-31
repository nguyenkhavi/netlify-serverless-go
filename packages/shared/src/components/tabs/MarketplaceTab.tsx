//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import * as TabsPrimitive from '@radix-ui/react-tabs';
//TYPES MODULES
import type { TabsProps as TabsPropsPrimitive } from '@radix-ui/react-tabs';

export type TabType = {
  label: string;
  value: string;
  content: React.ReactNode;
};

export type TabsProps = {
  tabs: TabType[];
  ariaLabel?: string;
  rightOptions?: React.ReactNode;
} & TabsPropsPrimitive;

const lineTabClasses = [
  'relative after:w-full',
  'after:content-[""] after:absolute after:-bottom-[2px] after:left-0 after:h-0',
  'after:ease-in-out after:rounded-full after:bg-main-gradient',
  'data-[state=active]:after:h-[3px]',
];

export default function MarketplaceTab({ tabs, ariaLabel, rightOptions, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root className="flex flex-col" defaultValue={tabs[0]?.value} {...props}>
      <TabsPrimitive.List
        aria-label={ariaLabel}
        className={classcat(['flex shrink-0 border-b border-text-20'])}
      >
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            className={classcat([
              lineTabClasses,
              'data-[state=active]:text-gradient-pr bg-transparent py-2 text-body3 text-text-50 data-[state=active]:text-subtitle2',
              'font-normal [&:not(:first-child)]:ml-10',
              'lg:text-h5 lg:data-[state=active]:text-h5-bold lg:[&:not(:first-child)]:ml-16',
            ])}
            value={tab.value}
            key={tab.value}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
        {rightOptions}
      </TabsPrimitive.List>
      {tabs.map((tab) => (
        <TabsPrimitive.Content className="mt-6" value={tab.value} key={tab.value}>
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
