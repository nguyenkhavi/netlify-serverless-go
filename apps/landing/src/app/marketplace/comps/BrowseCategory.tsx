//THIRD PARTY MODULES
import Link from 'next/link'
import classcat from 'classcat'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'

const MOCK_DATA = [
  { label: 'All', path: '' },
  { label: 'PFP', path: 'pfp' },
  { label: 'Wildlife', path: 'wildlife' },
  { label: 'Nature', path: 'nature' },
  { label: 'Gaming', path: 'gaming' },
  { label: 'Art', path: 'art' },
];

export default function BrowseCategory() {
  const params = useParams();

  const navActive = useMemo(() => {
    if (params.category === undefined) return '';
    return params.category;
  }, [params.category]);

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
              navActive === category.path ? 'text-primary' : '',
            ])}
            href={'/marketplace/' + category.path}
            key={i}
          >
            {category.label}
          </Link>
        ))}
      </div>
      <button className="mx-auto mt-11 block cursor-pointer text-center text-underline underline">See All</button>
    </div>
  );
}
