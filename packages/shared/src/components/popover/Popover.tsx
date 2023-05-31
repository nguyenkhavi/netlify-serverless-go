//THIRD PARTY MODULES
import classcat from 'classcat'
import { ReactNode } from 'react'
import { Content, PopoverProps, Portal, Root, Trigger } from '@radix-ui/react-popover'

export { Trigger };

export type RadixPopoverProps = {
  trigger: ReactNode;
  popover: ReactNode;
  align?: 'start' | 'center' | 'end';
  owStyles?: {
    contentClasses?: string;
  };
} & PopoverProps;

export default function Popover({
  trigger,
  popover,
  align,
  owStyles,
  ...props
}: RadixPopoverProps) {
  return (
    <Root {...props}>
      <Trigger>{trigger}</Trigger>

      <Portal>
        <Content
          align={align}
          className={classcat([
            'rounded border-[.5] border-text-20 bg-secondary-300 p-5.5',
            owStyles?.contentClasses,
          ])}
        >
          {popover}
        </Content>
      </Portal>
    </Root>
  );
}
