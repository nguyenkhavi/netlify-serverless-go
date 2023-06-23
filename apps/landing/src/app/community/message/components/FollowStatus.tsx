//THIRD PARTY MODULES
import classcat from 'classcat';
import React, { useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import Switch from '_@shared/components/conditions/Switch';

const classBtnNotFollow = classcat([
  'ow:border-text-30 ow:bg-text-30 ow:text-primary-700',
  'ow:disabled:bg-text-30 ow:disabled:text-primary-700',
  'hover:border-text-30 hover:bg-text-30 ow:hover:text-primary-700',
]);

function FollowStatus() {
  const [follow] = useState<boolean>(true);
  return (
    <Switch.Root>
      <Switch.Case when={follow}>
        <Button className={classcat(['ow:h-10 ow:w-29.25 ow:rounded-[theme(spacing.10)]'])}>
          Following
        </Button>
      </Switch.Case>
      <Switch.Case when={!follow}>
        <Button
          className={classcat([
            'ow:h-10 ow:w-29.25 ow:rounded-[theme(spacing.10)]',
            classBtnNotFollow,
          ])}
        >
          Following
        </Button>
      </Switch.Case>
    </Switch.Root>
  );
}

export default FollowStatus;
