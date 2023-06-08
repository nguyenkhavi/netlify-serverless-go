'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, forwardRef } from 'react';
//SHARED
import CloseIcon from '_@shared/icons/CloseIcon';
//RELATIVE MODULES
import Show from '../Show';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({ className, children, ...props }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={classcat(className)} {...props}>
    <div className="fixed inset-0 z-50">{children}</div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={classcat(['bg-background/80 fixed inset-0 z-[-1] backdrop-blur-sm', className])}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { showClose?: boolean }
>(({ className, showClose = true, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <div className="mx-4 flex h-full items-center justify-center">
      <DialogPrimitive.Content
        ref={ref}
        className={classcat([
          'relative max-h-[calc(100%-32px)] px-9 py-8',
          'w-full overflow-y-auto sm:max-w-lg',
          'border border-text-10',
          'rounded-b-lg bg-secondary-200 shadow-lg sm:rounded-lg',
          className,
        ])}
        {...props}
      >
        {children}
        <Show when={showClose}>
          <DialogPrimitive.Close
            className={classcat([
              'absolute right-4 top-4 rounded-sm disabled:pointer-events-none',
              'opacity-70 transition-opacity hover:opacity-100',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
            ])}
          >
            <CloseIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </Show>
      </DialogPrimitive.Content>
    </div>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classcat(['flex flex-col space-y-1.5 text-center sm:text-left', className])}
    {...props}
  />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={classcat([
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    ])}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={classcat(['text-lg font-semibold leading-none tracking-tight', className])}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={classcat(['text-muted-foreground text-sm', className])}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
