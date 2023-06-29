'use client';
//THIRD PARTY MODULES
import * as React from 'react';
import classcat from 'classcat';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//SHARED
import ChevronLeftIcon from '_@shared/icons/ChevronLeftIcon';
import ChevronRightIcon from '_@shared/icons/ChevronRightIcon';
//RELATIVE MODULES

export interface IBasePaginationProps {
  perPage: number;
  totalItems: number;
  className?: string;
}

const disableClasses = 'ow:cursor-not-allowed text-foundation-black-100 pointer-events-none';
const buttonArrowClasses = [
  'h-6 w-6 grid place-items-center shrink-0',
  'hover:bg-main-gradient rounded-lg [&>svg]:hover:text-black',
];

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
        'flex h-14 w-max items-center space-x-2 rounded-[100px] bg-secondary-300',
        'px-4',
        className,
      ])}
    >
      <button className={classcat([buttonArrowClasses, currentPage <= 1 ? disableClasses : ''])}>
        <ChevronLeftIcon
          className={classcat(['cursor-pointer text-primary'])}
          onClick={changePageBy(-1)}
        />
      </button>

      <div className="flex items-center [&>*]:shrink-0">
        {pages.map((item, index) =>
          item ? (
            <button
              className={classcat([
                'h-8 w-8 rounded-lg hover:text-body3 md:h-10 md:w-10',
                currentPage === item
                  ? 'bg-main-gradient text-body3 text-[#475467]'
                  : 'text-body2 hover:bg-main-gradient hover:text-[#475467]',
              ])}
              key={index}
              onClick={handleChangePage(item)}
            >
              <span>{item}</span>
            </button>
          ) : (
            <span className="inline-block h-10 w-10 text-center leading-[40px]" key={index}>
              ...
            </span>
          ),
        )}
      </div>

      <button
        className={classcat([buttonArrowClasses, currentPage >= totalPage ? disableClasses : ''])}
      >
        <ChevronRightIcon
          className={classcat(['cursor-pointer text-primary'])}
          onClick={changePageBy(1)}
        />
      </button>
    </div>
  );
}

const getPagesWithFirstAndLast = (currentPage: number, totalPage: number) => {
  const pages = [currentPage];

  let pageBefore = currentPage - 1;
  let count = 1;

  while (pageBefore >= 1 && count > 0) {
    pages.unshift(pageBefore);

    pageBefore--;
    count--;
  }

  let pageAfter = currentPage + 1;
  count = 1;

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
