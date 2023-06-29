//THIRD PARTY MODULES
import classcat from 'classcat';
import { TItemCard } from '_@landing/utils/type';
import { useSearchParams } from 'next/navigation';
import { pageSize } from '_@landing/utils/constants';
import React, { useCallback, useEffect, useState } from 'react';
import { getTrendingMarketByCategory } from '_@landing/services';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import NoData from '_@landing/components/NoData';
import BasePagination from '_@shared/components/pagination/BasePagination';
import MainCard, { type TViewMainCard } from '_@landing/components/card/MainCard';
//RELATIVE MODULES
import { SkeletonByView } from './SkeletonByView';

type IPropsComp = {
  view: TViewMainCard;
  categoryId: string;
};

const gridViewClasses = ['grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-6'];
const listViewClasses = ['gap-4'];

export default function TabContentArtItems({ view, categoryId }: IPropsComp) {
  const query = useSearchParams();
  const [data, setData] = useState<TItemCard[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { db } = useIndexedDBContext();

  const _getData = useCallback(() => {
    if (!categoryId || !db) return;

    const page = +(query.get('page') || 1);
    const sort = query.get('sort') || '';
    const [key, value] = sort.split(':');
    const minMaxPrice = query.get('minMaxPrice') || '';
    let minPrice = query.get('minPrice') || '';
    let maxPrice = query.get('maxPrice') || '';

    if (minMaxPrice) {
      minPrice = minMaxPrice.split(':')[0];
      maxPrice = minMaxPrice.split(':')[1];
    }
    setIsLoading(true);
    getTrendingMarketByCategory(db, +categoryId, {
      page: page - 1,
      pageSize: pageSize,
      ...(key === 'date' ? { releaseDate: value === 'desc' ? 'desc' : 'asc' } : {}),
      ...(key === 'price' ? { price: value === 'desc' ? 'desc' : 'asc' } : {}),
      ...(minPrice ? { minPrice: +minPrice } : {}),
      ...(maxPrice ? { maxPrice: +maxPrice } : {}),
    })
      .then((res) => {
        setData(res.data);
        setTotalItems(res.total);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, db, query]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <div>
      <Show when={data.length === 0 && !isLoading}>
        <NoData />
      </Show>
      <div className={classcat(['grid', view === 'grid' ? gridViewClasses : listViewClasses])}>
        {isLoading ? (
          <SkeletonByView view={view} />
        ) : (
          data.map((item, index) => {
            const isShowAdvList = (index + 1) % 2 === 0 && view === 'list';
            return (
              <React.Fragment key={index}>
                <MainCard key={index} value={item} view={view} />
                <Show when={(index + 1) % 8 === 0 || isShowAdvList}>
                  <HomeAdvHorizontal className={classcat(['col-span-full'])} isHome={false} />
                </Show>
              </React.Fragment>
            );
          })
        )}
      </div>
      <Show when={totalItems > pageSize}>
        <div className="mt-10 flex justify-center">
          <BasePagination perPage={pageSize} totalItems={totalItems} />
        </div>
      </Show>
    </div>
  );
}
