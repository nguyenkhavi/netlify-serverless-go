//THIRD PARTY MODULES
import classcat from 'classcat';

export type ContentBoxProps = {
  title: string;
  children: React.ReactNode;
};

export default function ContentBox({ title, children }: ContentBoxProps) {
  return (
    <div>
      <div className="mb-5 flex h-7 items-center justify-between md:h-9">
        <h2 className="text-h6 md:text-h4">{title}</h2>
      </div>
      <div
        className={classcat([
          'grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5',
          'nth-1:block nth-2:block sm:nth-3:block [&>*]:hidden [&>*]:xl:block',
          'md:gap-6',
        ])}
      >
        {children}
      </div>
    </div>
  );
}
