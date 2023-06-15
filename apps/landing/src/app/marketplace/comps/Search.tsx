'use client';

//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { useParams } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import SearchInput from '_@shared/components/SearchInput';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import ChevronBottomIcon from '_@shared/icons/ChevronBottomIcon';
//RELATIVE MODULES
import { MOCK_DATA } from './BrowseCategory';

export default function Search() {
  const params = useParams();
  const searchText = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);

  const [categoryId, label] = useMemo(() => {
    if (!params.id) return ['', ''];

    return [params.id, MOCK_DATA.find((item) => item.id === params.id)?.label];
  }, [params.id]);

  const _handleSearch = () => {
    console.log(searchText.current?.value);
  };

  return (
    <div className="flex px-[--px] pb-6 pt-4 md:pt-6">
      <div className="w-full md:max-w-[633px]">
        <SearchInput
          ref={searchText}
          name="search"
          type="text"
          placeholder="Search products, brands, collection."
          className=" md:text-body1 ow:md:h-11.25"
        />
      </div>
      <Popover open={open} onOpenChange={(value) => setOpen(value)}>
        <PopoverTrigger>
          <div
            className={classcat([
              'rounded-lg border border-text-10',
              'flex items-center justify-center',
              'ml-2 h-full w-26 xlg:hidden',
            ])}
          >
            <span className="text-body3 text-primary">{label ? label : 'All'}</span>
            <ChevronBottomIcon className="ml-1" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="min-w-[125px] ow:px-3 ow:py-4" align="end">
          <div className="grid gap-4">
            {MOCK_DATA.map((category, i) => (
              <Link
                className={classcat([
                  'text-body2 hover:text-primary',
                  categoryId === category.id ? 'text-primary' : 'text-text-50',
                ])}
                href={`/marketplace${category.id === '' ? '' : '/category/' + category.id}`}
                key={i}
                onClick={() => setOpen(false)}
              >
                {category.label}
              </Link>
            ))}
          </div>
          <Link
            href="/marketplace/category"
            className="mx-auto mt-8 block cursor-pointer text-center text-underline text-text-80 underline"
          >
            See all
          </Link>
        </PopoverContent>
      </Popover>
      <Button className="ml-4 hidden p-0 ow:w-29.25 xlg:block" onClick={_handleSearch}>
        Search
      </Button>
    </div>
  );
}
