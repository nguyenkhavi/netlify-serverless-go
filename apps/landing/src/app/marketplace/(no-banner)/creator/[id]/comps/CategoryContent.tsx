'use client';
//THIRD PARTY MODULES
import { ICategory } from '_@landing/utils/type'
import { useSearchParams } from 'next/navigation'
import { pageSize } from '_@landing/utils/constants'
import { getCategoryByUser } from '_@landing/services'
import React, { useCallback, useEffect, useState } from 'react'
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal'
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show'
import NoData from '_@landing/components/NoData'
import CategoryCard from '_@landing/components/card/CategoryCard'
import BasePagination from '_@shared/components/pagination/BasePagination'
import { SkeCard, SkeImage, SkeLine } from '_@landing/components/skeleton/skeleton'

type CategoryContentProps = {
  userWalletId: string;
};
export default function CategoryContent({ userWalletId }: CategoryContentProps) {
  const query = useSearchParams();
  const [data, setData] = useState<ICategory[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { db } = useIndexedDBContext();

  const _getData = useCallback(() => {
    if (!userWalletId || !db) return;
    const page = +(query.get('page') || 1);
    const searchText = query.get('k') || '';
    setIsLoading(true);
    getCategoryByUser(db, userWalletId, {
      page: page - 1,
      pageSize: pageSize,
      search: searchText,
    })
      .then((res) => {
        setData(res.data as ICategory[]);
        setTotalItems(res.total);
      })
      .finally(() => setIsLoading(false));
  }, [userWalletId, db, query]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <>
      <Show when={data.length === 0 && !isLoading}>
        <NoData />
      </Show>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-10 xlg:gap-y-6">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <SkeImage className='aspect-square ow:h-auto' />
                  <SkeLine className='mt-2 w-1/2'/>
                </div>
              ))
          : data.map((item, index) => (
              <React.Fragment key={index}>
                <CategoryCard value={item} />
                <Show when={(index + 1) % 4 === 0}>
                  <HomeAdvHorizontal className="col-span-full md:hidden" isHome={false} />
                </Show>
                <Show when={(index + 1) % 6 === 0}>
                  <HomeAdvHorizontal className="col-span-full hidden md:block" isHome={false} />
                </Show>
              </React.Fragment>
            ))}
      </div>
      <Show when={totalItems > pageSize}>
        <div className="flex justify-center">
          <BasePagination perPage={pageSize} totalItems={totalItems} />
        </div>
      </Show>
    </>
  );
}
