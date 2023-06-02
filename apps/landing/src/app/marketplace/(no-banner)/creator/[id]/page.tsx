'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import HomeAdvVertical from '_@landing/app/comps/HomeAdvVertical';
import FilterPrice from '_@landing/app/marketplace/comps/FilterPrice';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import BasePagination from '_@shared/components/pagination/BasePagination';
//RELATIVE MODULES
import ItemContent from './comps/ItemContent';
import FilterBar from '../../comps/FilterBar';
import InfoSection from '../../comps/InfoSection';
import CategoryContent from './comps/CategoryContent';

const DATA_CREATOR = {
  name: 'Versace',
  image: '/images/marketplace/banner-1.jpeg',
  description:
    'Design amazing digital experiences that create more happy in the world.design amazing digital experiences that create more happy in the world.',
};

export default function SellerPage() {
  const params = useSearchParams();
  const view = params.get('view') || 'item';
  return (
    <>
      <InfoSection data={DATA_CREATOR} />
      <FilterBar />

      <div className="flex px-[--px] pb-8.5 pt-6.25">
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
          className={classcat(['relative grid grow gap-6.25', view === 'item' ? 'xlg:ml-8' : ''])}
        >
          {view === 'item' ? <ItemContent /> : <CategoryContent />}
          <div className="flex justify-center">
            <BasePagination perPage={1} totalItems={20} />
          </div>
        </div>
      </div>
    </>
  );
}
