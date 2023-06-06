//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { MOCK_DATA_ITEM } from '_@landing/mock/Item';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import MainCard from '_@landing/components/card/MainCard';

export default function ItemContent() {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-4">
      {[...MOCK_DATA_ITEM, ...MOCK_DATA_ITEM].map((item, index) => (
        <React.Fragment key={index}>
          <MainCard value={item} view="grid-only" />
          {(index + 1) % 6 === 0 ? (
            <HomeAdvHorizontal className={classcat(['col-span-full md:hidden'])} isHome={false} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}
