//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import { TItemStore } from '_@landing/utils/type';
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
import { SkeCard } from '_@landing/components/skeleton/skeleton';
import BasePagination from '_@shared/components/pagination/BasePagination';

export default function ItemContent() {
  const { user } = useAuthStore();
  const query = useSearchParams();
  const [data, setData] = useState<TItemStore>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { db } = useIndexedDBContext();

  const page = +(query.get('page') || 1);

  const _getData = useCallback(() => {
    if (!user?.profile.wallet || !db) return;
    setIsLoading(true);
    getItemByOwner(db, user.profile.wallet, {
      page: page - 1,
      pageSize: pageSize,
    })
      .then((res) => {
        setData(res.data as TItemStore);
        setTotalItems(res.total);
      })
      .finally(() => setIsLoading(false));
  }, [user, db, page]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <SkeCard
                  key={index}
                  paragraph
                  className="[&>div:first-child]:aspect-square [&>div:first-child]:h-auto"
                />
              ))
          : data.map((item, index) => (
              <React.Fragment key={index}>
                <MyItemCard value={item} />
                <Show when={(index + 1) % 6 === 0}>
                  <HomeAdvHorizontal
                    className={classcat(['col-span-full md:hidden'])}
                    isHome={false}
                  />
                </Show>
              </React.Fragment>
            ))}
      </div>
      <Show when={data.length === 0 && !isLoading}>
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
