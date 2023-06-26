//THIRD PARTY MODULES
import classcat from 'classcat';
import * as ScrollArea from '@radix-ui/react-scroll-area';
//SHARED
import PortraitIcon from '_@shared/icons/PortraitIcon';
//RELATIVE MODULES
import TraitItem from './TraitItem';
import { TypeMarketDetail } from '../type';

function Traits({
  data,
}: {
  data: NonNullable<TypeMarketDetail>['item']['metadata']['attributes'];
}) {
  return (
    <div className={classcat(['rounded-[theme(spacing[2])] bg-secondary-200'])}>
      <div className={classcat(['grid grid-flow-row'])}>
        <div
          className={classcat([
            'grid grid-flow-col items-center justify-start gap-2 border-b border-text-10 p-4 md:p-6',
          ])}
        >
          <PortraitIcon className="h-4 w-4 text-primary md:h-6 md:w-6" />
          <p className={classcat(['text-h6 text-primary-700 md:text-h5-bold'])}>Traits</p>
        </div>
        <ScrollArea.Root type="auto">
          <ScrollArea.Viewport className="max-h-66.5 overflow-auto ">
            <div className={classcat(['grid grid-cols-3 gap-1.5 p-4 md:p-6'])}>
              {data?.map((item: any, index: number) => (
                <TraitItem key={index} data={item} />
              ))}
            </div>
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

export default Traits;
