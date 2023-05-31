//LAYOUT, COMPONENTS
import { CardValue } from '_@landing/components/card/MainCard';
import { CollectionCard } from '_@landing/components/card/CollectionCard';

export const MOCK_DATA_ITEM: CardValue[] = Array(8).fill({
  url: '/images/marketplace/trending.png',
  name: 'Golden Hand',
  prices: '0.08 BUSD',
  description:
    'Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.',
  owner: 'Diamon Hands',
  pricesDollar: '$24.00',
});

export const MOCK_DATA_ITEM_4: CardValue[] = Array(4).fill({
  url: '/images/marketplace/trending.png',
  name: 'Golden Hand',
  prices: '0.08 BUSD',
  description:
    'Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.',
  owner: 'Diamon Hands',
  pricesDollar: '$24.00',
});

export const MOCK_DATA_COLLECTION: CollectionCard[] = Array(8).fill({
  url: '/images/marketplace/collection.png',
  name: 'Golden Hand',
  prices: '0.08 BUSD',
  description:
    'Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.',
  owner: 'Diamon',
  pricesDollar: '$24.00',
});
