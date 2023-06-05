//THIRD PARTY MODULES
import classcat from 'classcat';
import { ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export type TModalProps = {
  children: ReactNode;
  open: boolean;
  owStyles?: {
    contentClasses?: string;
    overlayClasses?: string;
  };
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
};

export default function BaseModal({
  children,
  open,
  owStyles,
  onClose,
  onOpenChange,
}: TModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={classcat([
            'fixed inset-0 z-10 bg-black/[.6] backdrop-blur-[26.5px]',
            owStyles?.overlayClasses,
          ])}
        />
        <DialogPrimitive.Content
          className={classcat([
            'fixed left-0 top-0 z-overlay h-screen w-screen px-4',
            'flex justify-center overflow-auto py-10',
          ])}
        >
          <div
            className={classcat([
              'h-max rounded-[10px] bg-secondary-200 focus:outline-none',
              owStyles?.contentClasses,
            ])}
          >
            {children}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
