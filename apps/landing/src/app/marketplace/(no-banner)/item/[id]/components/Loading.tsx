//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';

function Loading() {
  return (
    <div
      className={classcat([
        'flex h-[calc(100vh-(var(--header-height)))] w-screen items-center justify-center',
      ])}
    >
      <div
        className={classcat([
          'inline-block h-12 w-12 animate-spin rounded-full border-[5px] border-solid border-primary-700 border-b-transparent',
        ])}
      />
    </div>
  );
}

export default Loading;
