//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import { SkeLine } from '_@landing/components/skeleton/skeleton';

export default function BrowseCategory() {
  const { category } = useIndexedDBContext();
  const params = useParams();

  const categoryId = useMemo(() => {
    if (params.id === undefined) return '';
    return params.id;
  }, [params.id]);

  return (
    <div
      className={classcat(['bg-secondary-300 p-6', 'rounded-[15px] border-[.5px] border-text-20'])}
    >
      <h3 className="mb-8 text-h5 text-text-100">Browse Categories</h3>
      <div className="grid gap-4">
        <Show when={category.loading}>
          <SkeLine />
          <SkeLine />
          <SkeLine />
          <SkeLine />
        </Show>
        <Show when={!category.loading}>
          <Link
            className={classcat([
              'text-body2 hover:text-gradient-pr',
              categoryId === '' ? 'text-gradient-pr' : '',
            ])}
            href="/marketplace"
          >
            All
          </Link>
          {category.data.map((category, i) => (
            <Link
              className={classcat([
                'text-body2 hover:text-gradient-pr',
                categoryId === category.id.toString() ? 'text-gradient-pr' : '',
              ])}
              href={`/marketplace/category/${category.id}`}
              key={i}
            >
              {category.name}
            </Link>
          ))}
        </Show>
      </div>
      <Link
        href="/marketplace/category"
        className="mx-auto mt-6 block cursor-pointer text-center text-underline text-text-80 underline"
      >
        See All
      </Link>
    </div>
  );
}
