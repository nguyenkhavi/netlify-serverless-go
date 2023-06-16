//THIRD PARTY MODULES
import classcat from 'classcat';
import { useSearchParams } from 'next/navigation';
import { pageSize } from '_@landing/utils/constants';
import { ICollectionCard } from '_@landing/utils/type';
import { useCallback, useEffect, useState } from 'react';
import { getTrendingCollectionsByCategory } from '_@landing/services';
import HomeAdvHorizontal from '_@landing/app/comps/HomeAdvHorizontal';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import CollectionCard from '_@landing/components/card/CollectionCard';
import BasePagination from '_@shared/components/pagination/BasePagination';

const gridViewClasses = ['grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 md:gap-4'];

export default function TabContentCollection({
  view,
  categoryId,
}: {
  view: string;
  categoryId: string;
}) {
  const query = useSearchParams();
  const [data, setData] = useState<ICollectionCard[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const { db } = useIndexedDBContext();

  const page = +(query.get('page') || 1);

  const _getData = useCallback(() => {
    if (!categoryId || !db) return;
    getTrendingCollectionsByCategory(db, +categoryId, {
      page: page - 1,
      pageSize: pageSize,
    }).then((res) => {
      setData(res.data as ICollectionCard[]);
      setTotalItems(res.total);
    });
  }, [categoryId, db, page]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  return (
    <div>
      <div className={classcat(['grid', view === 'grid' ? gridViewClasses : 'gap-4'])}>
        {data.map((item, index) => (
          <CollectionCard key={index} value={item} view={view} />
        ))}
      </div>
      <HomeAdvHorizontal className="my-6 md:my-10" isHome={false} />

      <Show when={totalItems > pageSize}>
        <div className="flex justify-center">
          <BasePagination perPage={pageSize} totalItems={totalItems} />
        </div>
      </Show>
    </div>
  );
}
