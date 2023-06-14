//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
//SHARED
import ChatIcon from '_@shared/icons/ChatIcon';

interface Props {
  title: string;
}

function CustomChannelHeader({ title }: Props) {
  return (
    <div
      className={classcat([
        'grid grid-flow-col items-center justify-start gap-2 border-b border-solid border-text-10 p-6',
      ])}
    >
      <ChatIcon className={classcat(['h-4 w-4', 'md:h-6 md:w-6'])} />
      <p className={classcat(['text-h6 text-primary-700 md:text-h5-bold'])}>{title}</p>
    </div>
  );
}

export default CustomChannelHeader;
