//THIRD PARTY MODULES
import React, { PropsWithChildren } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
//LAYOUT, COMPONENTS
import BrowserOnly from '_@shared/components/BrowserOnly';
//SHARED
import CrossIcon from '_@shared/icons/CrossIcon';

type Props = {
  open: boolean;
  onOpen: (state: boolean) => void;
};

const Modal = ({ open, onOpen, children }: PropsWithChildren<Props>) => (
  <BrowserOnly>
    <Dialog.Root open={open} onOpenChange={onOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px]"
              onClick={() => onOpen(false)}
              aria-label="Close"
            >
              <CrossIcon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </BrowserOnly>
);

export default Modal;
