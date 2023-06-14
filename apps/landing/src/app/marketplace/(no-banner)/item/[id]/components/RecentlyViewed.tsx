'use client';
//LAYOUT, COMPONENTS
import MainCard from '_@landing/components/card/MainCard';
import BasePaginationClient from '_@shared/components/pagination/BasePaginationClient';
//RELATIVE MODULES
import ContentBox from './ContentBox';
function RecentlyViewed() {
  const onChange = (page: number) => {
    console.log(page);
  };
  return (
    <>
      <ContentBox title="Recently viewed">
        {MOCK_DATA_ITEM_5.map((item, index) => (
          <MainCard
            data-sal="slide-up"
            data-sal-duration="800"
            data-sal-delay={index * 50}
            key={index}
            value={item}
          />
        ))}
      </ContentBox>
      <div className="flex justify-center md:hidden">
        <BasePaginationClient perPage={1} totalItems={20} onChange={onChange} />
      </div>
    </>
  );
}

export default RecentlyViewed;

export const MOCK_DATA_ITEM_5 = Array(5).fill({
  url: '/images/marketplace/trending.png',
  name: 'Golden Hand',
  prices: '0.08 BUSD',
  description:
    'Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.Lorem ipsum dolor sit amet consectetur. Sit tempus sed placerat magnis.',
  owner: 'Diamon Hands',
  pricesDollar: '$24.00',
});
