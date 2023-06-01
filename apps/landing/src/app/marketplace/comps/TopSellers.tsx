//THIRD PARTY MODULES
import { MOCK_DATA_SELLER } from '_@landing/mock/Item';
//LAYOUT, COMPONENTS
import SellerCard from '_@landing/components/card/SellerCard';
//RELATIVE MODULES
import ContentBox from './ContentBox';

export default function TopSellers() {
  return (
    <ContentBox title="Top sellers" pathViewAll="/marketplace/top-seller">
      {MOCK_DATA_SELLER.slice(0, 4).map((item, index) => (
        <SellerCard
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay={index * 50}
          key={index}
          value={item}
        />
      ))}
    </ContentBox>
  );
}
