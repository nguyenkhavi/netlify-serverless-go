'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { TItemCard } from '_@landing/utils/type';
import { pageSize } from '_@landing/utils/constants';
import { useParams, useSearchParams } from 'next/navigation';
import { getItemMarketByCollection } from '_@landing/services';
import React, { useCallback, useEffect, useState } from 'react';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import NoData from '_@landing/components/NoData';
import MainCard from '_@landing/components/card/MainCard';
import { SkeCard } from '_@landing/components/skeleton/skeleton';
import BasePagination from '_@shared/components/pagination/BasePagination';

export default function ContentItems() {
  const { id: collectionAddress } = useParams();
  const query = useSearchParams();
  const [data, setData] = useState<TItemCard[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { db } = useIndexedDBContext();

  const _getData = useCallback(() => {
    if (!db || !collectionAddress) return;
    const page = +(query.get('page') || 1);
    const searchText = query.get('k') || '';
    const sort = query.get('sort') || '';
    const [key, value] = sort.split(':'); // 'price:asc' => ['price', 'asc']
    const minMaxPrice = query.get('minMaxPrice') || '';
    let minPrice = query.get('minPrice') || '';
    let maxPrice = query.get('maxPrice') || '';

    if (minMaxPrice) {
      minPrice = minMaxPrice.split(':')[0];
      maxPrice = minMaxPrice.split(':')[1];
    }

    setIsLoading(true);
    getItemMarketByCollection(db, collectionAddress, {
      page: page - 1,
      pageSize: pageSize,
      search: searchText,
      ...(key === 'date' ? { releaseDate: value === 'desc' ? 'desc' : 'asc' } : {}),
      ...(key === 'price' ? { price: value === 'desc' ? 'desc' : 'asc' } : {}),
      ...(minPrice ? { minPrice: +minPrice } : {}),
      ...(maxPrice ? { maxPrice: +maxPrice } : {}),
    })
      .then((res) => {
        setData(res.data as TItemCard[]);
        setTotalItems(res.total);
      })
      .finally(() => setIsLoading(false));
  }, [db, query, collectionAddress]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <>
      <Show when={data.length === 0 && isLoading === false}>
        <NoData />
      </Show>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-6">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => <SkeCard key={index} paragraph />)
          : data.map((item, index) => (
              <React.Fragment key={index}>
                <MainCard value={item} />
                {(index + 1) % 4 === 0 ? (
                  <HomeAdvHorizontal
                    className={classcat([
                      'col-span-full md:my-4',
                      (index + 1) % 8 === 0 ? '' : 'md:hidden',
                    ])}
                    isHome={false}
                  />
                ) : null}
              </React.Fragment>
            ))}
      </div>
      {totalItems > pageSize ? (
        <div className="flex justify-center">
          <BasePagination perPage={pageSize} totalItems={totalItems} />
        </div>
      ) : null}
    </>
  );
}
