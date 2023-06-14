'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useState } from 'react';
//SHARED
import ChevronBottomIcon from '_@shared/icons/ChevronBottomIcon';
//RELATIVE MODULES

export interface IBasePaginationClientProps {
  perPage: number;
  totalItems: number;
  className?: string;
  onChange: (page: number) => void;
}

const disableClasses = 'ow:cursor-not-allowed text-foundation-black-100 pointer-events-none';
const buttonArrowClasses = 'h-5 w-5 grid place-items-center';

export default function BasePaginationClient({
  perPage,
  totalItems,
  className,
  onChange,
}: IBasePaginationClientProps) {
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(totalItems / perPage);

  const pages = getPagesWithFirstAndLast(page, totalPage);

  const handleChangePage = (pageNumber: number) => () => {
    setPage(pageNumber);
    onChange(pageNumber);
  };

  const changePageBy = (increment: 1 | -1) => () => {
    handleChangePage(page + increment);
  };

  return (
    <div
      className={classcat([
        'flex h-12.5 w-max items-center rounded-[27px] bg-secondary-300',
        'px-6',
        className,
      ])}
    >
      <button className={classcat([buttonArrowClasses, page <= 1 ? disableClasses : ''])}>
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
                page === item
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

      <button className={classcat([buttonArrowClasses, page >= totalPage ? disableClasses : ''])}>
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
    if (pages[0] > 2) pages.unshift(0);

    pages.unshift(1);
  }

  if (pages[pages.length - 1] < totalPage) {
    if (pages[pages.length - 1] < totalPage - 1) pages.push(0);

    pages.push(totalPage);
  }

  return pages;
};
