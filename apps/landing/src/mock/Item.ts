//LAYOUT, COMPONENTS
import { CardValue } from '_@landing/components/card/MainCard';
import { TSellerCard } from '_@landing/components/card/SellerCard';
import { CategoryCard } from '_@landing/components/card/CategoryCard';
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

export const MOCK_DATA_COLLECTION: CollectionCard[] = Array(8)
  .fill({
    url: '/images/marketplace/collection.png',
    name: 'Golden Hand',
    prices: '0.08 BUSD',
    description:
      'Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.',
    owner: 'Diamon',
    pricesDollar: '$24.00',
  })
  .map((item, index) => ({ ...item, id: index + 1 }));

export const MOCK_DATA_CATEGORY_ITEM: CategoryCard[] = Array(12).fill({
  url: '/images/marketplace/collection.png',
  name: 'Property',
});

export const MOCK_DATA_SELLER: TSellerCard[] = [
  {
    url: '/images/marketplace/sellers-1.png',
    name: 'Minh',
    id: 1,
  },
  {
    url: '/images/marketplace/sellers-2.png',
    name: 'Paul',
    id: 2,
  },
  {
    url: '/images/marketplace/sellers-3.png',
    name: 'Syed',
    id: 3,
  },
  {
    url: '/images/marketplace/sellers-1.png',
    name: 'Jon',
    id: 4,
  },
  {
    url: '/images/marketplace/sellers-1.png',
    name: 'Minh',
    id: 1,
  },
  {
    url: '/images/marketplace/sellers-2.png',
    name: 'Paul',
    id: 2,
  },
  {
    url: '/images/marketplace/sellers-3.png',
    name: 'Syed',
    id: 3,
  },
  {
    url: '/images/marketplace/sellers-1.png',
    name: 'Jon',
    id: 4,
  },
  {
    url: '/images/marketplace/sellers-1.png',
    name: 'Minh',
    id: 1,
  },
  {
    url: '/images/marketplace/sellers-2.png',
    name: 'Paul',
    id: 2,
  },
  {
    url: '/images/marketplace/sellers-3.png',
    name: 'Syed',
    id: 3,
  },
  {
    url: '/images/marketplace/sellers-1.png',
    name: 'Jon',
    id: 4,
  },
];
