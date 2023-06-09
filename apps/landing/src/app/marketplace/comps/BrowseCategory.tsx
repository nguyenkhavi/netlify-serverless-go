//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';

export const MOCK_DATA = [
  { label: 'All', id: '' },
  { label: 'PFP', id: '1' },
  { label: 'Wildlife', id: '2' },
  { label: 'Nature', id: '3' },
  { label: 'Gaming', id: '4' },
  { label: 'Art', id: '5' },
];

export default function BrowseCategory() {
  const params = useParams();

  const categoryId = useMemo(() => {
    if (params.id === undefined) return '';
    return params.id;
  }, [params.id]);

  return (
    <div
      className={classcat([
        'bg-secondary-300 px-6.25 py-7.5',
        'mt-5.25 rounded-[15px] border-[.5px] border-text-20',
      ])}
    >
      <h3 className="mb-7.5 text-h5 text-text-100">Browse Categories</h3>
      <div className="grid gap-3">
        {MOCK_DATA.map((category, i) => (
          <Link
            className={classcat([
              'text-body2 hover:text-primary',
              categoryId === category.id ? 'text-primary' : '',
            ])}
            href={`/marketplace${category.id === '' ? '' : '/category/' + category.id}`}
            key={i}
          >
            {category.label}
          </Link>
        ))}
      </div>
      <Link
        href="/marketplace/category"
        className="mx-auto mt-11 block cursor-pointer text-center text-underline underline"
      >
        See All
      </Link>
    </div>
  );
}
