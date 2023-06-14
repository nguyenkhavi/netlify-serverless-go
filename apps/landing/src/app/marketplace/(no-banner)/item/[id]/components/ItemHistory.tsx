//THIRD PARTY MODULES
import React from 'react';
import dayjs from 'dayjs';
import classcat from 'classcat';
//SHARED
import HistoryIcon from '_@shared/icons/HistoryIcon';

function ItemHistory() {
  return (
    <div className={classcat(['rounded-[theme(spacing[2])] bg-secondary-200'])}>
      <div className={classcat(['grid grid-flow-row'])}>
        <div
          className={classcat([
            'grid grid-flow-col items-center justify-start gap-2 border-b border-text-10 p-4 md:p-6',
          ])}
        >
          <HistoryIcon className="h-4 w-4 text-primary md:h-6 md:w-6" />
          <p className={classcat(['text-h6 text-primary-700 md:text-h5-bold'])}>History</p>
        </div>
        <div className={classcat(['grid grid-flow-row gap-4 p-4 md:px-6 md:pb-15 md:pt-6'])}>
          {mockDataHistory.map((item, index) => (
            <div key={index}>
              <div className="flex flex-wrap justify-between">
                <div className={classcat(['flex flex-nowrap space-x-1'])}>
                  <p className={classcat(['whitespace-nowrap text-body2 text-text-50'])}>
                    Listed by
                  </p>
                  <p className={classcat(['truncate text-body2 text-primary-700'])}>
                    {item.author}
                  </p>
                </div>
                <p className={classcat(['text-body2 text-primary-700'])}>{item.price}</p>
              </div>
              <p className={classcat(['text-body1 text-text-50'])}>
                {dayjs(item.createAt).format('MMM D, YYYY [at] HH:mm')}
              </p>
            </div>
          ))}
        </div>
        <div />
      </div>
    </div>
  );
}

export default ItemHistory;

const mockDataHistory = new Array(3).fill(-1).map(() => ({
  author: '@randompoint',
  price: '2.32 BUSD',
  createAt: new Date(),
}));
