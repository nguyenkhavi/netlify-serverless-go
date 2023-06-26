'use client';

//THIRD PARTY MODULES
import { z } from 'zod';
import Link from 'next/link';
import classcat from 'classcat';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { getSearchMarket } from '_@landing/services';
import { useParams, useSearchParams } from 'next/navigation';
import { useIndexedDBContext } from '_@landing/app/provider/IndexedDBProvider';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import BaseInput from '_@shared/components/BaseInput';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import SearchIcon from '_@shared/icons/SearchIcon';
import ChevronBottomIcon from '_@shared/icons/ChevronBottomIcon';
//HOOK
import useFilterQueryString from '_@landing/hooks/useFilterQueryString';

const schema = z.object({
  s: z.string().nonempty(),
});

type FormValues = z.infer<typeof schema>;

export default function Search() {
  const filter = useFilterQueryString();
  const searchParams = useSearchParams();
  const s = searchParams.get('s') || '';
  const { handleSubmit, register } = useForm<FormValues>({ defaultValues: { s } });
  const onSubmit = handleSubmit(filter);

  const params = useParams();
  const { db, category } = useIndexedDBContext();
  const [open, setOpen] = useState(false);
  const [categoryId, label] = useMemo(() => {
    if (!params.id) return ['', ''];
    return [params.id, category.data.find((item) => item.id.toString() === params.id)?.name];
  }, [params.id, category]);

  useEffect(() => {
    (async () => {
      if (!db) return;
      const data = await getSearchMarket(db, s);
      console.log('🚀 ~ file: Search.tsx:47 ~ data:', data);
    })();
  }, [db, s]);

  return (
    <form onSubmit={onSubmit} className="flex px-[--px] pb-6 pt-4 md:pt-6">
      <div className="relative w-full md:max-w-[633px]">
        <BaseInput
          {...register('s')}
          placeholder="Search products, brands, collection."
          className="h-10 pl-12 text-caption md:h-11.25 md:text-body1"
        />
        <SearchIcon
          onClick={onSubmit}
          className="absolute bottom-1/2 left-4 translate-y-1/2 cursor-pointer select-none text-white"
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
            <Link
              className={classcat([
                'text-body2 hover:text-primary',
                categoryId === '' ? 'text-primary' : 'text-text-50',
              ])}
              href="/marketplace"
              onClick={() => setOpen(false)}
            >
              All
            </Link>
            {category.data.map((category, i) => (
              <Link
                className={classcat([
                  'text-body2 hover:text-primary',
                  categoryId === category.id.toString() ? 'text-primary' : 'text-text-50',
                ])}
                href={`/marketplace/category/${category.id}`}
                key={i}
                onClick={() => setOpen(false)}
              >
                {category.name}
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
      <Button type="submit" className="ml-4 hidden p-0 ow:w-29.25 xlg:block">
        Search
      </Button>
    </form>
  );
}
