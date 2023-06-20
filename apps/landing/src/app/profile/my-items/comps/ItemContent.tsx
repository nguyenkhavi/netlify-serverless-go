//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import { IItemsStore } from '_@landing/utils/type';
import { getItemByOwner } from '_@landing/services';
import { pageSize } from '_@landing/utils/constants';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import React, { useCallback, useEffect, useState } from 'react';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import NoData from '_@landing/components/NoData';
import MyItemCard from '_@landing/components/card/MyItemCard';
import BasePagination from '_@shared/components/pagination/BasePagination';

export default function ItemContent() {
  const { user } = useAuthStore();
  const query = useSearchParams();
  const [data, setData] = useState<IItemsStore[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const { db } = useIndexedDBContext();

  const page = +(query.get('page') || 1);

  const _getData = useCallback(() => {
    if (!user?.profile.wallet || !db) return;
    getItemByOwner(db, user.profile.wallet, {
      page: page - 1,
      pageSize: pageSize,
    }).then((res) => {
      setData(res.data as IItemsStore[]);
      setTotalItems(res.total);
    });
  }, [user, db, page]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <>
      <Show when={data.length > 0}>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-4">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <MyItemCard value={item} />
              {(index + 1) % 6 === 0 ? (
                <HomeAdvHorizontal
                  className={classcat(['col-span-full md:hidden'])}
                  isHome={false}
                />
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </Show>
      <Show when={data.length === 0}>
        <NoData />
      </Show>
      <Show when={totalItems > pageSize}>
        <div className="mt-10 flex justify-center">
          <BasePagination perPage={pageSize} totalItems={totalItems} />
        </div>
      </Show>
    </>
  );
}
