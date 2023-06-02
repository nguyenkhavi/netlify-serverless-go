//THIRD PARTY MODULES
import React from 'react';
import { MOCK_DATA_CATEGORY_ITEM } from '_@landing/mock/Item';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import CategoryCard from '_@landing/components/card/CategoryCard';

export default function CategoryContent() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-7.5 md:grid-cols-3 md:gap-x-16.5 xlg:gap-y-7">
      {MOCK_DATA_CATEGORY_ITEM.slice(0, 9).map((item, index) => (
        <React.Fragment key={index}>
          <CategoryCard value={item} className="[&>p]:mt-2.75"/>
          <Show when={(index + 1) % 4 === 0}>
            <HomeAdvHorizontal className="col-span-full md:hidden" isHome={false} />
          </Show>
          <Show when={(index + 1) % 6 === 0}>
            <HomeAdvHorizontal className="col-span-full hidden md:block" isHome={false} />
          </Show>
        </React.Fragment>
      ))}
    </div>
  );
}
