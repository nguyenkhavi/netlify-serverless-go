//LAYOUT, COMPONENTS
import MainCard from '_@landing/components/card/MainCard';
//RELATIVE MODULES
import ContentBox from './ContentBox';

const MOCK_DATA = [
  {
    url: 'images/marketplace/trending.png',
    name: 'Golden Hand',
    prices: '0.08 BUSD',
  },
  {
    url: 'images/marketplace/trending.png',
    name: 'Golden Hand',
    prices: '0.08 BUSD',
  },
  {
    url: 'images/marketplace/trending.png',
    name: 'Golden Hand',
    prices: '0.08 BUSD',
  },
  {
    url: 'images/marketplace/trending.png',
    name: 'Golden Hand',
    prices: '0.08 BUSD',
  },
];

export default function TrendingInNature() {
  return (
    <ContentBox title="Trending in Nature" pathViewAll="#">
      {MOCK_DATA.map((item, index) => (
        <MainCard
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay={index * 50}
          key={index}
          url={item.url}
          name={item.name}
          prices={item.prices}
        />
      ))}
    </ContentBox>
  );
}
