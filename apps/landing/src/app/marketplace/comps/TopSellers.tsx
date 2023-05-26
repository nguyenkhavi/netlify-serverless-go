//LAYOUT, COMPONENTS
import SellerCard from '_@landing/components/card/SellerCard';
//RELATIVE MODULES
import ContentBox from './ContentBox';

const MOCK_DATA = [
  {
    url: 'images/marketplace/sellers-1.png',
    name: 'Minh',
  },
  {
    url: 'images/marketplace/sellers-2.png',
    name: 'Paul',
  },
  {
    url: 'images/marketplace/sellers-3.png',
    name: 'Syed',
  },
  {
    url: 'images/marketplace/sellers-1.png',
    name: 'Jon',
  },
];

export default function TopSellers() {
  return (
    <ContentBox title="Top sellers" pathViewAll="#">
      {MOCK_DATA.map((item, index) => (
        <SellerCard
          data-sal="slide-up"
          data-sal-duration="800"
          data-sal-delay={index * 50}
          key={index}
          url={item.url}
          name={item.name}
        />
      ))}
    </ContentBox>
  );
}
