//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { ActivityType } from '_@landing/utils/type';
//RELATIVE MODULES
import { ACTIVITY_TYPES } from '../constants';

function HistoryActivityType({ type }: { type: ActivityType }) {
  return (
    <p className={classcat(['whitespace-nowrap text-body2 text-text-50'])}>
      {ACTIVITY_TYPES?.[type]} by
    </p>
  );
}

export default HistoryActivityType;
