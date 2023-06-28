//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { Fragment, PropsWithChildren } from 'react';
//RELATIVE MODULES

type Props = {
  show: boolean;
};

function Wrapper({ show, children }: PropsWithChildren<Props>) {
  if (show) {
    return (
      <div
        id="chat-wrapper"
        className={classcat([
          'scrollbar grow overflow-auto',
          'max-h-[calc(100vh-var(--header-height)-10.5rem)] min-h-[calc(100vh-var(--header-height)-10.5rem)]',
          'md:max-h-[calc(100vh-var(--header-height)-20rem)] md:min-h-[calc(100vh-var(--header-height)-20rem)]',
        ])}
      >
        {children}
      </div>
    );
  }
  return <Fragment>{children}</Fragment>;
}

export default Wrapper;
