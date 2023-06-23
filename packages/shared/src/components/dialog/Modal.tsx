'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import * as Dialog from '@radix-ui/react-dialog';
//TYPES MODULES
import type { DialogContentProps } from '@radix-ui/react-dialog';

export const BaseModal = ({ children, className, ...rest }: DialogContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="dir-inset-0 fixed bg-secondary-200 opacity-30" />
      <Dialog.Content
        className={classcat([
          'fixed start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white outline-none',
          className,
        ])}
        {...rest}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export const Root = Dialog.Root;
export const Trigger = Dialog.Trigger;
export const Overlay = Dialog.Overlay;
export const Title = Dialog.Title;
export const Content = Dialog.Content;
export const Description = Dialog.Description;
export const Close = Dialog.Close;

export const Modal = {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Description,
  Close,
  BaseModal,
};
