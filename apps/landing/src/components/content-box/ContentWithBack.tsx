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
        <Link href={path}>
          <ArrowRightIcon className="rotate-180" />
        </Link>
        <p className="ml-2.5 text-h5-bold md:text-h3">{title}</p>
        <div
          className={classcat([
            'ml-2 flex h-8.75 w-max items-center bg-secondary-200 lg:ml-4',
            'cursor-pointer rounded border-[.5px] border-text-10 px-3',
          ])}
        >
          <FilterIcon className="h-5" />
          <div className="ml-1 text-body3 text-text-50">
            <span>A to Z</span>
            <span className="px-1">-</span>
            <span>Z to A</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-7.5 md:grid-cols-4 md:gap-x-12 xlg:gap-y-9.5 ">
        {children}
      </div>
      <div className="my-16 flex justify-center">
        <BasePagination perPage={1} totalItems={20} />
      </div>
    </div>
  );
}
