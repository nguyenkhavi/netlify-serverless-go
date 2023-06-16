//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import React, { ReactNode } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

function NotFound({ backUrl, backTitle }: { backUrl: string; backTitle: ReactNode }) {
  return (
    <div
      className={classcat([
        'grid h-[calc(100vh-(var(--header-height)-theme(spacing[23.25])))] w-full grid-flow-row items-center justify-center',
      ])}
    >
      <div
        className={classcat([
          'flex -translate-y-1/2 flex-col items-center justify-center space-y-4',
        ])}
      >
        <p className="text-h2 text-primary-700">Not Found</p>
        <Button className="ow:md:w-fit" as={Link} href={backUrl}>
          {backTitle}
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
