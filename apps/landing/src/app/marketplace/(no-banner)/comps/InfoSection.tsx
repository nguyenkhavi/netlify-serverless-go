//THIRD PARTY MODULES
import classcat from 'classcat';
import { RouterOutputs } from '_@landing/utils/api';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import ShareIcon from '_@shared/icons/ShareIcon';

type InfoSectionProps = {
  data: RouterOutputs['myProfile']['profile'] | null;
};

export default function InfoSection({ data }: InfoSectionProps) {
  return (
    <section className="relative z-0">
      <div className="relative h-50 bg-banner-bg bg-cover bg-no-repeat">
        <div className="absolute inset-0 z-10 bg-[#343434]/[.84] backdrop-blur-[28px]"></div>
      </div>
      <div
        className={classcat([
          'mx-auto -mt-18 rounded-[10px] px-6 pb-6 lg:px-15',
          'relative z-sticky w-[--content-width]  bg-secondary-200',
        ])}
      >
        <div className="mb-4 -translate-y-1/2">
          <img
            className={classcat([
              'rounded-full border-2 border-solid border-primary',
              'h-30.5 w-30.5',
            ])}
            src={data?.avatarUrl || '/images/profile/avatar-default.webp'}
            alt=""
          />
        </div>
        <div className="-mt-15.25 justify-between lg:flex">
          <div>
            <h1 className="mb-2 text-h5-bold md:text-h4">@{data?.username}</h1>
            <p className="max-w-[31.5rem] pb-10 text-body3 text-text-70 md:pb-12 md:text-body1">
              {data?.description || ''}
            </p>
          </div>
        </div>
        <Button
          className={classcat([
            'w-max border-none bg-secondary-400',
            'ow:w-29.25 [&>svg]:h-3.75',
            'mt-6',
          ])}
          leadingIcon={<ShareIcon />}
        >
          <span className="text-gradient-pr">Share</span>
        </Button>
      </div>
    </section>
  );
}
