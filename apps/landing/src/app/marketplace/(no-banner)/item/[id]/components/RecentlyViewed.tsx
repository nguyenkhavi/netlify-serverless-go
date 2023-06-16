'use client';
//THIRD PARTY MODULES
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
  data: TypeMarketDetail;
};

function RecentlyViewed({ data }: Props) {
  const [recentlyItems, setRecentlyItems] = useState<any[]>([]);

  const id = useMemo(() => data.listingId.toString(), [data.listingId]);
  const { setItems, getItems } = useCacheLocalStorage<TypeMarketDetail>({
    key: MARKET_ITEM_RECENTLY_VIEWED,
    maxItem: 5,
  });

  useEffect(() => {
    const items = getItems();

    if (items) {
      const itemsNotIncludeCurrent = items.filter((item) => item.__key !== id);
      const recentlyItems = itemsNotIncludeCurrent.map((item) => ({
        url: item.item.metadata.image,
        name: item.item.metadata.name,
        prices: `${item.price} ${item.token.name}`,
      }));
      setRecentlyItems(recentlyItems);
    }
    if (data) {
      setItems(id, data);
    }
  }, [data, getItems, id, setItems]);

  return (
    <Show when={recentlyItems.length}>
      <ContentBox title="Recently viewed">
        {recentlyItems.map((item, index) => (
          <MainCard
            data-sal="slide-up"
            data-sal-duration="800"
            data-sal-delay={index * 50}
            key={index}
            value={item}
          />
        ))}
      </ContentBox>
    </Show>
  );
}

export default RecentlyViewed;
