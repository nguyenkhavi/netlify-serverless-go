'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import FilterPrice from '_@landing/app/marketplace/comps/FilterPrice';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//RELATIVE MODULES
import FilterBar from '../../comps/FilterBar';
import ItemContent from './comps/ItemContent';
import InfoSection from '../../comps/InfoSection';
import CategoryContent from './comps/CategoryContent';

export default function SellerPage({ params }: { params: { id: string } }) {
  const queryParams = useSearchParams();
  const view = queryParams.get('view') || 'item';

  return (
    <>
      <InfoSection userWalletId={params.id} />
      <FilterBar />

      <div className="flex px-[--px] py-6 xlg:pb-24 xlg:pt-8">
        <Show when={view === 'item'}>
          <div className="hidden w-[284px] shrink-0 xlg:block">
            <FilterPrice className="ow:mt-0" />
            <HomeAdvVertical
              className="relative mt-7.5 h-auto w-full py-8 ow:top-0 xl:grid"
              btnClasses="ow:static mt-6.25"
            />
          </div>
        </Show>
        <div
          className={classcat([
            'relative grid h-max grow gap-10',
            view === 'item' ? 'xlg:ml-8' : '',
          ])}
        >
          {view === 'item' ? (
            <ItemContent userWalletId={params.id} />
          ) : (
            <CategoryContent userWalletId={params.id} />
          )}
        </div>
      </div>
    </>
  );
}
