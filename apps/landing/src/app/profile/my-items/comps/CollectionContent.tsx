//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';
import { MOCK_DATA_COLLECTION } from '_@landing/mock/Item';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
//LAYOUT, COMPONENTS
import CollectionCard from '_@landing/components/card/CollectionCard';

export default function CollectionContent() {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-4">
      {[...MOCK_DATA_COLLECTION, ...MOCK_DATA_COLLECTION].map((item, index) => (
        <React.Fragment key={index}>
          <CollectionCard value={item} view="grid" />
          {(index + 1) % 6 === 0 ? (
            <HomeAdvHorizontal className={classcat(['col-span-full md:hidden'])} isHome={false} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}
