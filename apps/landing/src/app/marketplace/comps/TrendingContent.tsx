//THIRD PARTY MODULES
import { useCallback, useEffect, useState } from 'react';
import { ICategory, IItemCard } from '_@landing/utils/type';
import { getTrendingMarketByCategory } from '_@landing/services';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import MainCard from '_@landing/components/card/MainCard';
//RELATIVE MODULES
import ContentBox, { ContentBoxProps } from './ContentBox';

type TrendingContentProps = {
  category: ICategory;
} & Omit<ContentBoxProps, 'children'>;

export default function TrendingContent({ category, ...props }: TrendingContentProps) {
  const [data, setData] = useState<IItemCard[]>([]);
  const { db } = useIndexedDBContext();
  const [isLoading, setIsLoading] = useState(true);

  const _getData = useCallback(() => {
    if (!category || !db) return;
    getTrendingMarketByCategory(db, category.id, { page: 0, pageSize: 4 })
      .then((res) => {
        setData(res.data as IItemCard[]);
      })
      .catch((error) => console.log('---Error', error))
      .finally(() => setIsLoading(false));
  }, [category, db]);

  useEffect(() => {
    _getData();
  }, [_getData]);
  if (isLoading) return <></>;
  return (
    <ContentBox {...props}>
      <Show when={data.length === 0}>
        <div className="pointer-events-none h-87.5 opacity-0"></div>
      </Show>

      {data.map((item, index) => (
        <MainCard
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
