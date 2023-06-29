//THIRD PARTY MODULES
import classcat from 'classcat';
import { IActivity, Token } from '_@landing/utils/type';
import * as ScrollArea from '@radix-ui/react-scroll-area';
//SHARED
import HistoryIcon from '_@shared/icons/HistoryIcon';
//RELATIVE MODULES
import HistoryItem from './HistoryItem';

type Props = {
  activities: IActivity[];
  token: Token;
};

function History({ activities, token }: Props) {
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
        <ScrollArea.Root type="auto">
          <ScrollArea.Viewport className="grid max-h-87 grid-flow-row gap-4 overflow-auto p-4 md:p-6">
            {activities
              .sort((a, b) => b.blockNumber - a.blockNumber)
              .map((item, index) => (
                <HistoryItem key={index} data={item} token={token} />
              ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="w-2.25 bg-secondary-400 md:w-4.5" orientation="vertical">
            <ScrollArea.Thumb className="w-2.25 rounded-[theme(spacing[7.5])] bg-text-20 md:w-4.5" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
        <div />
      </div>
    </div>
  );
}

export default History;
