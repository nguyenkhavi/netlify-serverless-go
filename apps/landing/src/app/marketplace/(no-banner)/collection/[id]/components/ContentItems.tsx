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
import BasePagination from '_@shared/components/pagination/BasePagination';

export default function ContentItems() {
  const { id: collectionAddress } = useParams();
  const query = useSearchParams();
  const [data, setData] = useState<TItemCard[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const { db } = useIndexedDBContext();

  const page = +(query.get('page') || 1);

  const _getData = useCallback(() => {
    if (!db || !collectionAddress) return;
    getItemMarketByCollection(db, collectionAddress, {
      page: page - 1,
      pageSize: pageSize,
    }).then((res) => {
      setData(res.data as TItemCard[]);
      setTotalItems(res.total);
    });
  }, [db, page, collectionAddress]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <>
      <Show when={data.length === 0}>
        <NoData />
      </Show>
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4 md:gap-x-7.5 xlg:gap-y-5">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <MainCard value={item} />
            {(index + 1) % 4 === 0 ? (
              <HomeAdvHorizontal
                className={classcat(['col-span-full', (index + 1) % 8 === 0 ? '' : 'md:hidden'])}
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
