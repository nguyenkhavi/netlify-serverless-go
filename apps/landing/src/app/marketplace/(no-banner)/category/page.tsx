'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { ICategory } from '_@landing/utils/type';
import { getAllCategories } from '_@landing/services/category';
import React, { useCallback, useEffect, useState } from 'react';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import { SkeCard } from '_@landing/components/skeleton/skeleton';
import CategoryCard from '_@landing/components/card/CategoryCard';
import ContentWithBack from '_@landing/components/content-box/ContentWithBack';

export default function CategoryPage() {
  const [data, setData] = useState<{ data: ICategory[]; loading: boolean }>({
    data: [],
    loading: true,
  });
  const { db } = useIndexedDBContext();
  const _handleFetchData = useCallback(async () => {
    if (db === null) return;
    getAllCategories(db)
      .then((res) => {
        setData({ data: res, loading: false });
      })
      .catch((_) => {
        setData({ data: [], loading: false });
      });
  }, [db]);

  useEffect(() => {
    _handleFetchData();
  }, [_handleFetchData]);

  return (
    <ContentWithBack title="All Categories" path="/marketplace">
      {data.loading
        ? Array(8)
            .fill(1)
            .map((item, index) => <SkeCard key={index} />)
        : data.data.map((item, index) => (
            <React.Fragment key={index}>
              <CategoryCard value={item} />
              {(index + 1) % 4 === 0 ? (
                <HomeAdvHorizontal
                  className={classcat(['col-span-full', index + 1 === 4 ? 'md:hidden' : ''])}
                  isHome={false}
                />
              ) : null}
            </React.Fragment>
          ))}
    </ContentWithBack>
  );
}
