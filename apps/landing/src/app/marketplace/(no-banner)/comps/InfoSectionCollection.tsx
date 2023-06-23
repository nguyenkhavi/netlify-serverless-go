//THIRD PARTY MODULES
import dayjs from 'dayjs';
import classcat from 'classcat';
import { RouterOutputs } from '_@landing/utils/api';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import ShareIcon from '_@shared/icons/ShareIcon';

type InfoSectionProps = {
  data: RouterOutputs['myProfile']['profile'] | null;
};

const labelClasses = 'text-text-50 text-body2 md:text-h6';
const valueClasses = 'text-h6 md:text-h5-bold text-end';

export default function InfoSectionCollection({ data }: InfoSectionProps) {
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
            <p className="max-w-[31.5rem] text-body3 text-text-70 md:text-body1 ">
              {data?.description || ''}
            </p>
            <p className="mt-4 text-body3 text-text-50 md:mt-6 md:text-body2">
              Created date:{' '}
              <span className="text-text-100">{dayjs(data?.createdAt).format('MMM D, YYYY')}</span>
            </p>
          </div>
          <ul
            className={classcat([
              'mt-4 grid gap-2 rounded-[10px] bg-secondary-300 p-4 lg:mt-0 lg:p-6',
              'border border-text-10',
            ])}
          >
            <li className="grid grid-cols-[100px_1fr] gap-5">
              <span className={labelClasses}>Floor</span>
              <p className={valueClasses}>0.0013 BUSD</p>
            </li>
            <li className="grid grid-cols-[100px_1fr] gap-5">
              <span className={labelClasses}>Volume</span>
              <p className={valueClasses}>77.6K BUSD</p>
            </li>
            <li className="grid grid-cols-[100px_1fr] gap-5">
              <span className={labelClasses}>NFTs</span>
              <p className={valueClasses}>971</p>
            </li>
            <li className="grid grid-cols-[100px_1fr] gap-5">
              <span className={labelClasses}>Owners</span>
              <p className={valueClasses}>57K</p>
            </li>
          </ul>
        </div>
        <Button
          className={classcat([
            'w-max border-none bg-secondary-400',
            'ow:w-29.25  [&>svg]:h-3.75',
            'mt-12 lg:mt-6',
          ])}
          leadingIcon={<ShareIcon />}
        >
          <span className="text-gradient-pr">Share</span>
        </Button>
      </div>
    </section>
  );
}
