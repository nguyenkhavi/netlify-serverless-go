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
    <section className="grid gap-4">
      <h1 className="text-h5-bold text-primary">Close Account</h1>
      <div
        className={classcat([
          'rounded-lg border border-text-10',
          'grid gap-4 p-6 md:grid-flow-col',
        ])}
      >
        <WarningIcon className="shrink-0 text-error" />
        <p className="text-body1 text-text-50">
          Closing your user account will delete all your information on Fleamint such as your past
          trades, transactions etc. Once you submit the request to close your account, you’ll
          receive a confirmation link via email and a moderator will process your request.
        </p>
      </div>
      <button
        className="text-start text-[15px] font-bold leading-[26px] text-error underline"
        onClick={() => setOpen(true)}
      >
        Close Account
      </button>
      <ModalCloseAccount open={open} setOpen={setOpen} />
    </section>
  );
}
