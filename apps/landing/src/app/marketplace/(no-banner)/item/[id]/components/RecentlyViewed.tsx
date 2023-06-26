'use client';
//THIRD PARTY MODULES
import { TItemCard } from '_@landing/utils/type';
import { useEffect, useMemo, useState } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import MainCard from '_@landing/components/card/MainCard';
//HOOK
import { useCacheLocalStorage } from '_@landing/hooks/useCacheLocalStorage';
//RELATIVE MODULES
import ContentBox from './ContentBox';
import { TypeMarketDetail } from '../type';
import { MARKET_ITEM_RECENTLY_VIEWED } from '../constants';

type Props = {
  data: NonNullable<TypeMarketDetail>;
};

function RecentlyViewed({ data }: Props) {
  const [recentlyItems, setRecentlyItems] = useState<TItemCard[]>([]);

  const id = useMemo(() => data.listingId.toString(), [data.listingId]);
  const { setItems, getItems } = useCacheLocalStorage<TypeMarketDetail>({
    key: MARKET_ITEM_RECENTLY_VIEWED,
    maxItem: 5,
  });

  useEffect(() => {
    const items = getItems();

    if (items) {
      const itemsNotIncludeCurrent = items
        .filter((item) => item.__key !== id)
        .map((item) => ({ ...item, totalSale: 0, chain: '' }));

      setRecentlyItems(itemsNotIncludeCurrent);
    }
    if (data) {
      setItems(id, data);
    }
  }, [data, getItems, id, setItems]);

  return (
    <Show when={recentlyItems.length}>
      <ContentBox title="Recently viewed">
        {recentlyItems.length &&
          recentlyItems.map((item, index) => <MainCard key={index} value={item} />)}
      </ContentBox>
    </Show>
  );
}

export default RecentlyViewed;
