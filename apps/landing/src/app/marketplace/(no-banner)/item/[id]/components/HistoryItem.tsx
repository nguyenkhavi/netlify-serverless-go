//THIRD PARTY MODULES
import classcat from 'classcat';
import dayjs, { Dayjs } from 'dayjs';
import { useSDK } from '@thirdweb-dev/react';
import { IActivity, IToken } from '_@landing/utils/type';
import { useCallback, useEffect, useState } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//RELATIVE MODULES
import User from './User';
import HistoryActivityType from './HistoryActivityType';

function HistoryItem({ data, token }: { data: IActivity; token: IToken }) {
  const sdk = useSDK();
  const [time, setTime] = useState<Dayjs>();

  const _getTime = useCallback(async () => {
    if (!sdk) return;
    const provider = await sdk.getProvider();
    provider
      .getBlock(data.blockNumber)
      .then((block) => {
        const time = dayjs.unix(block.timestamp);
        setTime(time);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data.blockNumber, sdk]);

  useEffect(() => {
    _getTime();
  }, [_getTime]);

  return (
    <div>
      <div className="grid grid-flow-col justify-between gap-4">
        <div className={classcat(['flex flex-nowrap space-x-1 overflow-hidden'])}>
          <HistoryActivityType type={data.type} />
          <User wallet={data.fromAddress} />
        </div>
        <p className={classcat(['text-body2 text-primary-700'])}>
          {data.price} {token.symbol}
        </p>
      </div>
      <Show when={time}>
        <p className={classcat(['text-body1 text-text-50'])}>
          {dayjs(time).format('MMM D, YYYY [at] HH:mm')}
        </p>
      </Show>
    </div>
  );
}

export default HistoryItem;
