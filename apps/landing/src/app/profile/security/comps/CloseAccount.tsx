'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
//LAYOUT, COMPONENTS
import ModalCloseAccount from '_@landing/components/modal/ModalCloseAccount';
//SHARED
import WarningIcon from '_@shared/icons/WarningIcon';

export default function CloseAccount() {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <h1 className="mb-4 text-h5-bold text-primary">Close Account</h1>
      <div
        className={classcat([
          'md:flex md:items-center',
          'md:pb-7 md:pl-4 md:pr-10 md:pt-5',
          'md:rounded-[10px] md:border md:border-text-10',
        ])}
      >
        <WarningIcon className="shrink-0 text-error md:mr-5" />
        <p className="mt-3 text-body1 text-text-50 md:mt-0">
          Closing your user account will delete all your information on Fleamint such as your past
          trades, transactions etc. Once you submit the request to close your account, you’ll
          receive a confirmation link via email and a moderator will process your request.
        </p>
      </div>
      <button className="mt-2 text-base text-error md:mt-4" onClick={() => setOpen(true)}>
        <span className="underline">Close Account</span>
      </button>
      <ModalCloseAccount open={open} setOpen={setOpen} />
    </section>
  );
}
