//THIRD PARTY MODULES
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { pageSize } from '_@landing/utils/constants';
import { TCollectionCard } from '_@landing/utils/type';
import { getCollectionsByOwner } from '_@landing/services';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import NoData from '_@landing/components/NoData';
import CollectionCard from '_@landing/components/card/CollectionCard';
import BasePagination from '_@shared/components/pagination/BasePagination';

export default function CollectionContent() {
  const { user } = useAuthStore();
  const query = useSearchParams();
  const { db } = useIndexedDBContext();
  const page = +(query.get('page') || 0);

  const { data: collectionsByOwner } = useQuery({
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
  if (!collectionsByOwner?.data || !collectionsByOwner.total) return null;
  const data = collectionsByOwner.data as TCollectionCard[];
  return (
    <>
      <Show when={data.length > 0}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-6">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <CollectionCard value={item} view="grid" />
              {/* <Show when={(index + 1) % 6 === 0}>
                <HomeAdvHorizontal
                  className={classcat(['col-span-full md:hidden'])}
                  isHome={false}
                />
              </Show> */}
            </React.Fragment>
          ))}
        </div>
      </Show>
      <Show when={data.length === 0}>
        <NoData />
      </Show>
      <Show when={collectionsByOwner.total > pageSize}>
        <div className="mt-10 flex justify-center">
          <BasePagination perPage={pageSize} totalItems={collectionsByOwner.total} />
        </div>
      </Show>
    </>
  );
}
