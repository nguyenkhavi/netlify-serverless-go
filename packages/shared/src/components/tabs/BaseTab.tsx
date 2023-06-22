//THIRD PARTY MODULES
import classcat from 'classcat';
import { ReactElement, ReactNode } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
//TYPES MODULES
import type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from '@radix-ui/react-tabs';

type ChildrenType = { children?: ReactElement | ReactElement[] | ReactNode };

type TabRootProps = ChildrenType & TabsProps;
type TabListProps = ChildrenType & TabsListProps;
type TabTriggerProps = ChildrenType & TabsTriggerProps;
type TabContentProps = ChildrenType & TabsContentProps;

const lineTabClasses = [
  'relative after:w-full',
  'after:content-[""] after:absolute after:-bottom-[2px] after:left-0 after:h-0',
  'after:ease-in-out after:rounded-full after:bg-main-gradient',
  'data-[state=active]:after:h-[3px]',
];

function Root({ className, children, ...props }: TabRootProps) {
  return (
    <TabsPrimitive.Root className={classcat(['flex flex-col', className])} {...props}>
      {children}
    </TabsPrimitive.Root>
  );
}

function List({ className, children, ...props }: TabListProps) {
  return (
    <TabsPrimitive.List
      className={classcat(['flex shrink-0 border-b border-text-20', className])}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );
}

function Trigger({ className, children, ...props }: TabTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={classcat([
        lineTabClasses,
        'bg-transparent py-2 text-body3 text-text-50 data-[state=active]:text-gradient-pr data-[state=active]:text-body3 data-[state=active]:font-bold',
        'font-normal [&:not(:first-child)]:ml-10',
        'lg:text-h5 lg:data-[state=active]:text-h5-bold lg:[&:not(:first-child)]:ml-16',
        className,
      ])}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

function Content({ className, children, ...props }: TabContentProps) {
  return (
    <TabsPrimitive.Content className={classcat(['mt-6 lg:mt-10', className])} {...props}>
      {children}
    </TabsPrimitive.Content>
  );
}

export { Root, List, Trigger, Content };
