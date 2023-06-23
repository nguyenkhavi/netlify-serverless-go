//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';

function EmptyPlaceholderRequest() {
  return (
    <div className={classcat(['flex h-full flex-col items-center justify-center'])}>
      <div
        className={classcat(['grid max-w-[370px] grid-flow-row items-center justify-center gap-1'])}
      >
        <p className={classcat(['text-center text-h5-bold text-primary-700'])}>Select a Message</p>
        <p className={classcat(['text-center text-body1 text-text-50'])}>
          Message requested from the people you don’t follow live here. To reply to their message
          you need to accept the request.{' '}
          <a className={classcat(['text-info'])} target="_blank" rel="noopener noreferrer" href="#">
            learn more
          </a>
        </p>
      </div>
    </div>
  );
}

export default EmptyPlaceholderRequest;
