//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';

export type ContentBoxProps = {
  title: string;
  pathViewAll: string;
  children: React.ReactNode;
};

export default function ContentBox({ title, pathViewAll, children }: ContentBoxProps) {
  return (
    <div>
      <div className="mb-5 flex h-7 items-center justify-between md:h-9">
        <h2 className="text-h6 md:text-h4">{title}</h2>
        <Link href={pathViewAll} className="text-caption text-text-60 hover:text-primary">
          View All
        </Link>
      </div>
      <div
        className={classcat([
          'grid grid-cols-2 gap-7 md:grid-cols-4',
          'nth-1:block nth-2:block [&>*]:hidden [&>*]:md:block',
        ])}
      >
        {children}
      </div>
    </div>
  );
}
