//THIRD PARTY MODULES
import React from 'react'
import classcat from 'classcat'
import { MOCK_DATA_ITEM } from '_@landing/mock/Item'
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal'
//LAYOUT, COMPONENTS
import MainCardOld from '_@landing/components/card/MainCardOld'
//LAYOUT, COMPONENTS

export default function ItemContent() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-6">
      {MOCK_DATA_ITEM.map((item, index) => (
        <React.Fragment key={index}>
          <MainCardOld value={item} />
          {(index + 1) % 4 === 0 ? (
            <HomeAdvHorizontal
              className={classcat(['col-span-full', index + 1 === 4 ? 'md:hidden' : ''])}
              isHome={false}
            />
          ) : null}
        </React.Fragment>
      ))}
    </div>
   
  );
}
