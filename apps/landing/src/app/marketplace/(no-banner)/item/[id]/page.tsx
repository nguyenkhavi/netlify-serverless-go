'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { getMarketDetailByListingId } from '_@landing/services';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Loading from './components/Loading';
import Show from '_@shared/components/Show';
import NotFound from './components/NotFound';
import ItemHistory from './components/History';
import NFTInfoCard from './components/NFTInfoCard';
import ItemInfoCard from './components/ItemInfoCard';
import ItemImageCard from './components/ItemImageCard';
import StreamChat from './components/stream/StreamChat';
import RecentlyViewed from './components/RecentlyViewed';
//RELATIVE MODULES
import { TypeMarketDetail } from './type';

const Page = () => {
  const { id } = useParams();
  const [state, setState] = useState<{
    data: TypeMarketDetail | undefined;
    loading: boolean;
  }>({
    data: undefined,
    loading: true,
  });

  const { db } = useIndexedDBContext();
  const { user } = useAuthStore();

  const _callData = useCallback(() => {
    if (!db) return;
    getMarketDetailByListingId(db, parseFloat(id))
      .then((marketDetail) => setState((prev) => ({ ...prev, data: marketDetail })))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [db, id]);

  useEffect(() => {
    _callData();
  }, [_callData]);

  if (state.loading) return <Loading />;
  if (!state.loading && !state.data)
    return <NotFound backUrl="/marketplace" backTitle="Back to Marketplace" />;
  if (!state.data) return null;

  return (
    <div className="grid grid-flow-row gap-6 px-[--px] pb-9 pt-10 md:gap-22 md:pb-26.5">
      <div className={classcat(['grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr]'])}>
        <ItemImageCard
          name={state.data.item.name}
          image={state.data.item.metadata.image}
          category={state.data.category}
        />
        <ItemInfoCard data={state.data} />
      </div>
      <div
        className={classcat([
          'grid grid-cols-1 gap-8 md:grid-cols-[1fr_min(theme(spacing[173.5]),55%)]',
          'md:gap-8',
        ])}
      >
        <div className="grid grid-flow-row gap-5 md:gap-8">
          <NFTInfoCard data={state.data} />
          <ItemHistory activities={state.data.activities} token={state.data.token} />
        </div>
        <Show when={user?.profile.userId}>
          <StreamChat />
        </Show>
      </div>
      <HomeAdvHorizontal />
      <RecentlyViewed data={state.data} />
    </div>
  );
};
export default Page;
