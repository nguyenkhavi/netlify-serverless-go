'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { nextApi } from '_@landing/utils/api';
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import { SkeImage, SkeLine, SkeParagraph } from '_@landing/components/skeleton/skeleton';
//SHARED
import ShareIcon from '_@shared/icons/ShareIcon';

type InfoSectionProps = {
  userWalletId: string;
};

export default function InfoSection({ userWalletId }: InfoSectionProps) {
  const { data: dataUser, isLoading } = nextApi.getUserByWallet.useQuery(
    { wallet: userWalletId },
    { enabled: !!userWalletId },
  );

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
          {isLoading ? (
            <SkeImage className="rounded-full ow:h-30.5 ow:w-30.5" />
          ) : (
            <img
              className={classcat([
                'rounded-full border-2 border-solid border-primary',
                'h-30.5 w-30.5 object-cover',
              ])}
              src={urlWithIpfs(dataUser?.[0].avatarUrl || '/images/profile/avatar-default.webp')}
              alt=""
            />
          )}
        </div>
        <div className="-mt-15.25 justify-between lg:flex">
          {isLoading ? (
            <div>
              <SkeLine className="ow:w-50" />
              <SkeParagraph className="w-full xlg:w-100" />
              <SkeLine className="mt-6 ow:w-60" />
            </div>
          ) : (
            <div>
              <h1 className="mb-2 text-h5-bold md:text-h4">@{dataUser?.[0].username || ''}</h1>
              <p className="max-w-[31.5rem] pb-10 text-body3 text-text-70 md:pb-12 md:text-body1">
                {dataUser?.[0].description || ''}
              </p>
            </div>
          )}
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
