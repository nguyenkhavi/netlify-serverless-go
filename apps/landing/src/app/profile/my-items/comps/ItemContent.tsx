//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getItemByOwner } from '_@landing/services';
import { pageSize } from '_@landing/utils/constants';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
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
  const { db } = useIndexedDBContext();
  const page = +(query.get('page') || 1);

  const { data: itemByOwner = { data: [], total: 0 }, isLoading } = useQuery({
    queryKey: ['getItemByOwner', user, db, page],
    queryFn: () => {
      if (!user?.profile.wallet || !db) return { data: [], total: 0 };
      return getItemByOwner(db, user.profile.wallet, {
        page: page - 1,
        pageSize: pageSize,
      });
    },
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  return (
    <>
      <div className="rounded-b-lg pt-6 lg:bg-secondary-200 lg:p-4 lg:pt-10">
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
            : itemByOwner.data.map((item, index) => (
                <React.Fragment key={index}>
                  <MyItemCard className="bg-secondary-300 lg:bg-transparent" value={item} />
                  <Show when={(index + 1) % 6 === 0}>
                    <HomeAdvHorizontal
                      className={classcat(['col-span-full md:hidden'])}
                      isHome={false}
                    />
                  </Show>
                </React.Fragment>
              ))}
        </div>
      </div>
      <Show when={itemByOwner.data.length === 0 && !isLoading}>
        <NoData />
      </Show>
      <Show when={itemByOwner.total > pageSize}>
        <div className="mt-6 flex justify-center md:mt-6 lg:mb-14">
          <BasePagination perPage={pageSize} totalItems={itemByOwner.total} />
        </div>
      </Show>
    </>
  );
}
