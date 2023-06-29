//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';

const ellipseClasses1 = ['absolute rounded-full bg-primary blur-[330px] h-[416px] w-[467px]'];

const ringClasses = [
  'absolute inset-0',
  'h-full w-full rounded-full border-2',
  'border-[white_transparent_transparent_transparent]',
  'animate-spin-ring ',
];

function Loading() {
  return (
    <div
      className={classcat([
        'flex h-[calc(100vh-(var(--header-height)))] w-screen items-center justify-center',
      ])}
    >
      <div className="relative mx-auto h-10 w-10">
        <div className={classcat([ringClasses, 'animation-delay-[-0.45s]'])}></div>
        <div className={classcat([ringClasses, 'animation-delay-[-0.3s]'])}></div>
        <div className={classcat([ringClasses, 'animation-delay-[-0.15s]'])}></div>
      </div>

      <div
        className={classcat([
          ellipseClasses1,
          'right-[calc(100%+42px)] top-[345px] block xlg:hidden',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses1,
          'bottom-[calc(100%+6px)] left-[389px] hidden xlg:block',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses1,
          'right-[calc(100%-8px)] top-[738px] hidden xlg:block',
        ])}
      />
      <div
        className={classcat([
          ellipseClasses1,
          'left-[calc(100%+12px)] top-[409px] hidden xlg:block',
        ])}
      />
    </div>
  );
}

export default Loading;
