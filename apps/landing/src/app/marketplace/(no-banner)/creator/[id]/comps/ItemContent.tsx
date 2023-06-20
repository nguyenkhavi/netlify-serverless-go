'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import { IItemsStore } from '_@landing/utils/type';
import { getItemByOwner } from '_@landing/services';
import { pageSize } from '_@landing/utils/constants';
import React, { useCallback, useEffect, useState } from 'react';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import ItemStoreCard from '_@landing/components/card/ItemStoreCard';
import BasePagination from '_@shared/components/pagination/BasePagination';
//LAYOUT, COMPONENTS

type Props = {
  userWalletId: string;
};
export default function ItemContent({ userWalletId }: Props) {
  const query = useSearchParams();
  const [data, setData] = useState<IItemsStore[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const { db } = useIndexedDBContext();

  const page = +(query.get('page') || 1);

  const _getData = useCallback(() => {
    if (!userWalletId || !db) return;
    getItemByOwner(db, userWalletId, {
      page: page - 1,
      pageSize: pageSize,
    }).then((res) => {
      setData(res.data as IItemsStore[]);
      setTotalItems(res.total);
    });
  }, [userWalletId, db, page]);

  useEffect(() => {
    _getData();
  }, [_getData]);
  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-6">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <ItemStoreCard value={item} />
            {(index + 1) % 4 === 0 ? (
              <HomeAdvHorizontal
                className={classcat(['col-span-full', index + 1 === 4 ? 'md:hidden' : ''])}
                isHome={false}
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <Show when={totalItems > pageSize}>
        <div className="flex justify-center">
          <BasePagination perPage={pageSize} totalItems={totalItems} />
        </div>
      </Show>
    </>
  );
}
