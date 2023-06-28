//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { pageSize } from '_@landing/utils/constants';
import { TCollectionCard } from '_@landing/utils/type';
import { getCollectionsByOwner } from '_@landing/services';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import NoData from '_@landing/components/NoData';
import { SkeCard } from '_@landing/components/skeleton/skeleton';
import CollectionCard from '_@landing/components/card/CollectionCard';
import BasePagination from '_@shared/components/pagination/BasePagination';

export default function CollectionContent() {
  const { user } = useAuthStore();
  const query = useSearchParams();
  const { db } = useIndexedDBContext();
  const page = +(query.get('page') || 0);

  const { data: collectionsByOwner, isLoading } = useQuery({
    enabled: !!user?.profile.wallet && !!db,
    queryKey: ['collectionsByOwner', user?.profile.wallet],
    queryFn: () => {
      if (!user?.profile.wallet || !db) return undefined;
      return getCollectionsByOwner(db, user.profile.wallet, {
        page: page,
        pageSize: pageSize,
      });
    },
    refetchOnWindowFocus: false,
  });

  const data = (collectionsByOwner?.data || []) as TCollectionCard[];
  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-6">
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
                <CollectionCard value={item} view="grid" isMyItem={true} />
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
      <Show when={(collectionsByOwner?.total || 0) > pageSize}>
        <div className="mt-10 flex justify-center">
          <BasePagination perPage={pageSize} totalItems={collectionsByOwner?.total || 0} />
        </div>
      </Show>
    </>
  );
}
