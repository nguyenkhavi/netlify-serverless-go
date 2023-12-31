//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import { TCollectionCard } from '_@landing/utils/type';
import React, { useCallback, useEffect, useState } from 'react';
import { getTrendingCollectionsByCategory } from '_@landing/services';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import NoData from '_@landing/components/NoData';
import { TViewMainCard } from '_@landing/components/card/MainCard';
import CollectionCard from '_@landing/components/card/CollectionCard';
import BasePagination from '_@shared/components/pagination/BasePagination';
//RELATIVE MODULES
import { SkeletonByView } from './SkeletonByView';

const gridViewClasses = ['grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-6'];

export default function TabContentCollection({
  view,
  categoryId,
}: {
  view: TViewMainCard;
  categoryId: string;
}) {
  const query = useSearchParams();
  const [data, setData] = useState<TCollectionCard[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { db } = useIndexedDBContext();
  const pageSize = view === 'grid' ? 16 : 6;

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
    getTrendingCollectionsByCategory(db, +categoryId, {
      page: page - 1,
      pageSize: pageSize,
      ...(key === 'price' ? { price: value === 'desc' ? 'desc' : 'asc' } : {}),
      ...(minPrice ? { minPrice: +minPrice } : {}),
      ...(maxPrice ? { maxPrice: +maxPrice } : {}),
    })
      .then((res) => {
        setData(res.data as TCollectionCard[]);
        setTotalItems(res.total);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, db, query, pageSize]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <div>
      <Show when={data.length === 0 && !isLoading}>
        <NoData />
      </Show>
      <div className={classcat(['grid', view === 'grid' ? gridViewClasses : 'gap-4'])}>
        {isLoading ? (
          <SkeletonByView view={view} />
        ) : (
          data.map((item, index) => {
            const isShowAdvList = (index + 1) % 2 === 0 && view === 'list';
            return (
              <React.Fragment key={index}>
                <CollectionCard value={item} view={view} />
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
