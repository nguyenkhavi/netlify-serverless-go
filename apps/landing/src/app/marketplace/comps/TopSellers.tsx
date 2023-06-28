//THIRD PARTY MODULES
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import SellerCard from '_@landing/components/card/SellerCard';
import { SkeImage, SkeLine } from '_@landing/components/skeleton/skeleton';
//RELATIVE MODULES
import ContentBox from './ContentBox';

export default function TopSellers() {
  const { bestSeller } = useIndexedDBContext();

  return (
    <ContentBox title="Top sellers" pathViewAll="/marketplace/top-seller">
      {bestSeller.loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-[10px] p-4 ring-1 ring-[#303030]">
              <SkeImage className="aspect-[201/236] ow:h-auto" />
              <SkeLine className="mt-2 ow:w-1/2" />
            </div>
          ))
        : bestSeller.data
            .slice(0, 4)
            .map((item, index) => (
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
