//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import BasePagination from '_@shared/components/pagination/BasePagination';
//SHARED
import FilterIcon from '_@shared/icons/FilterIcon';
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';

type ContentWithBackProps = {
  path: string;
  title: string;
  children: React.ReactNode;
};

export default function ContentWithBack({ path, title, children }: ContentWithBackProps) {
  return (
    <div className="px-[--px]">
      <div className="mb-6 flex items-center md:mb-7">
        <Link
          href={path}
          className="mr-2 grid h-6 w-6 place-items-center rounded hover:bg-secondary-400"
        >
          <ArrowRightIcon className="rotate-180" />
        </Link>
        <p className="mr-8 text-h5-bold md:text-h3">{title}</p>
        <div
          className={classcat([
            'flex h-11.25 w-max items-center bg-secondary-200',
            'cursor-pointer rounded border-[.5px] border-text-10 px-3',
          ])}
        >
          <FilterIcon className="h-5.25 w-5.25" />
          <div className="ml-1.25 text-body3 text-text-60">
            <span>A to Z</span>
            <span className="px-1">-</span>
            <span>Z to A</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 xlg:gap-10 ">{children}</div>
      <div className="my-16 flex justify-center">
        <BasePagination perPage={1} totalItems={20} />
      </div>
    </div>
  );
}
