//THIRD PARTY MODULES
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import SellerCard from '_@landing/components/card/SellerCard';
//RELATIVE MODULES
import ContentBox from './ContentBox';

export default function TopSellers() {
  const { bestSeller } = useIndexedDBContext();

  if (!bestSeller) return null;
  return (
    <ContentBox title="Top sellers" pathViewAll="/marketplace/top-seller">
      {bestSeller.slice(0, 4).map((item, index) => (
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
