'use client';
//THIRD PARTY MODULES
import * as React from 'react';
import classcat from 'classcat';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//SHARED
import ChevronBottomIcon from '_@shared/icons/ChevronBottomIcon';
//RELATIVE MODULES

export interface IBasePaginationProps {
  perPage: number;
  totalItems: number;
  className?: string;
}

const disableClasses = 'ow:cursor-not-allowed text-foundation-black-100 pointer-events-none';
const buttonArrowClasses = 'h-5 w-5 grid place-items-center';

export default function BasePagination({ perPage, totalItems, className }: IBasePaginationProps) {
  const params = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const totalPage = Math.ceil(totalItems / perPage);
  const currentPage = +(params.get('page') || 1);

  const pages = getPagesWithFirstAndLast(currentPage, totalPage);

  const setPageToUrl = (pageNumber: number) => {
    const newParams = new URLSearchParams(params);

    newParams.set('page', pageNumber.toString());

    router.push(`${pathName}?${newParams.toString()}`);
  };

  const handleChangePage = (pageNumber: number) => () => {
    console.log(pageNumber);
    setPageToUrl(pageNumber);
  };

  const changePageBy = (increment: 1 | -1) => () => {
    setPageToUrl(currentPage + increment);
  };

  React.useEffect(() => {
    if (currentPage > totalPage && totalPage > 0) {
      const newParams = new URLSearchParams(params);

      newParams.set('page', '1');

      router.push(`${pathName}?${newParams}`);
    }
  }, [totalPage, currentPage, params, router, pathName]);

  return (
    <div
      className={classcat([
        'flex h-12.5 w-max items-center rounded-[27px] bg-secondary-300',
        'px-6',
        className,
      ])}
    >
      <button className={classcat([buttonArrowClasses, currentPage <= 1 ? disableClasses : ''])}>
        <ChevronBottomIcon
          className={classcat(['h-3 w-4 rotate-90 cursor-pointer text-primary'])}
          onClick={changePageBy(-1)}
        />
      </button>

      <div className="mx-8">
        {pages.map((item, index) =>
          item ? (
            <button
              className={classcat([
                'rounded',
                currentPage === item
                  ? 'bg-main-gradient text-secondary-100'
                  : 'hover:bg-main-gradient hover:text-secondary-100',
              ])}
              key={index}
              onClick={handleChangePage(item)}
            >
              <span className="block min-w-[22px]">{item}</span>
            </button>
          ) : (
            <span className="mr-2 inline-block min-w-[22px] text-center" key={index}>
              ...
            </span>
          ),
        )}
      </div>

      <button
        className={classcat([buttonArrowClasses, currentPage >= totalPage ? disableClasses : ''])}
      >
        <ChevronBottomIcon
          className={classcat(['h-3 w-4 -rotate-90 cursor-pointer text-primary'])}
          onClick={changePageBy(1)}
        />
      </button>
    </div>
  );
}

const getPagesWithFirstAndLast = (currentPage: number, totalPage: number) => {
  const pages = [currentPage];

  let pageBefore = currentPage - 1;
  let count = 2;

  while (pageBefore >= 1 && count > 0) {
    pages.unshift(pageBefore);

    pageBefore--;
    count--;
  }

  let pageAfter = currentPage + 1;
  count = 2;

  while (pageAfter <= totalPage && count > 0) {
    pages.push(pageAfter);

    pageAfter++;
    count--;
  }

  if (pages[0] > 1) {
    // To show 3-dots
    if (pages[0] > 2) pages.unshift(0);

    pages.unshift(1);
  }

  if (pages[pages.length - 1] < totalPage) {
    // To show 3-dots
    if (pages[pages.length - 1] < totalPage - 1) pages.push(0);

    pages.push(totalPage);
  }

  return pages;
};

// const getPages = (currentPage: number, totalPage: number) => {
//   const pages = [currentPage];
//   while (pages.length < 5 && pages.length < totalPage) {
//     if (pages[pages.length - 1]! < totalPage) pages.push(pages[pages.length - 1]! + 1);

//     if (pages[0]! > 1) pages.unshift(pages[0]! - 1);
//   }

//   return pages;
// };
