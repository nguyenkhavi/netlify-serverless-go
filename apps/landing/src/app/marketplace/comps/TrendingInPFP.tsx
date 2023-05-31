//THIRD PARTY MODULES
import { MOCK_DATA_ITEM_4 } from '_@landing/mock/Item';
//LAYOUT, COMPONENTS
import MainCard from '_@landing/components/card/MainCard';
//RELATIVE MODULES
import ContentBox from './ContentBox';

export default function TrendingInPFP() {
  return (
    <ContentBox title="Trending in PFP" pathViewAll="#">
      {MOCK_DATA_ITEM_4.map((item, index) => (
        <MainCard
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
