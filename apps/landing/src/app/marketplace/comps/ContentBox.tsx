'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//HOOK
import useSalAnim from '_@landing/hooks/useSalAnim';

export type ContentBoxProps = {
  title: string;
  pathViewAll: string;
  children: React.ReactNode;
};

export default function ContentBox({ title, pathViewAll, children }: ContentBoxProps) {
  useSalAnim();
  return (
    <div>
      <div className="mb-6 flex h-9 w-[--content-width] items-center justify-between md:w-auto">
        <h2 className="text-h6 md:text-h4">{title}</h2>
        <Link href={pathViewAll} className="text-caption text-text-60 hover:underline">
          View All
        </Link>
      </div>
      <div
        className={classcat([
          'hidden-scrollbar grid gap-6 overflow-x-auto overflow-y-clip md:overflow-visible',
          'grid-cols-[227.5px_227.5px_227.5px_227.5px] md:grid-cols-4',
          'p-[1px] md:w-auto md:p-0',
          'w-[calc(var(--content-width)+16px)] pr-4 md:pr-0',
        ])}
      >
        {children}
      </div>
    </div>
  );
}
