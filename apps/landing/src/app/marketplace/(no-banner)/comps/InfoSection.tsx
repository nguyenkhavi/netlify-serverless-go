//THIRD PARTY MODULES
import dayjs from 'dayjs';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
//SHARED
import ShareIcon from '_@shared/icons/ShareIcon';

type InfoCreator = {
  name: string;
  image: string;
  description: string;
  createdAt?: string;
  wallet?: {
    floor: string;
    volume: string;
    nfts: string;
    owners: string;
  };
};

type InfoSectionProps = {
  data: InfoCreator;
  isCollection?: boolean;
  contentClasses?: string;
};

const labelClasses = 'text-text-50 text-body2 md:text-h6';
const valueClasses = 'text-h6 md:text-h5-bold text-end';

export default function InfoSection({
  data,
  isCollection = false,
  contentClasses = '',
}: InfoSectionProps) {
  return (
    <section className="relative z-0">
      <div className="relative h-50 bg-banner-bg bg-cover bg-no-repeat">
        <div className="absolute inset-0 z-10 bg-[#343434]/[.84] backdrop-blur-[28px]"></div>
      </div>
      <div
        className={classcat([
          'mx-auto -mt-18 rounded-[10px] px-6 pb-6 lg:px-15',
          'relative z-sticky w-[--content-width]  bg-secondary-200',
          contentClasses,
        ])}
      >
        <div className="mb-4 -translate-y-1/2">
          <img
            className={classcat([
              'h-20 w-20 rounded-full border-2 border-solid border-primary',
              'md:h-30.5 md:w-30.5',
            ])}
            src={data.image}
            alt=""
          />
        </div>
        <div className="-mt-10 justify-between md:-mt-15.25 lg:flex">
          <div>
            <h1 className="mb-2 text-h5-bold md:text-h4">
              {!isCollection && '@'}
              {data.name}
            </h1>
            <p className="max-w-[31.5rem] text-body3 text-text-70 md:text-body1">
              {data.description}
            </p>
            <Show when={data.createdAt}>
              <p className="mt-6 text-body3 text-text-50 md:mt-4 md:text-body2">
                Created date:{' '}
                <span className="text-text-100">{dayjs(data.createdAt).format('MMM D, YYYY')}</span>
              </p>
            </Show>
          </div>
          <Show when={isCollection}>
            <ul
              className={classcat([
                'mt-6 grid gap-2 rounded-[10px] bg-secondary-300 p-4 lg:mt-0 lg:p-6',
                'md:border md:border-text-10',
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
          </Show>
        </div>
        <Button
          className={classcat([
            'w-max border-none bg-secondary-400',
            'ow:w-29.25  [&>svg]:h-3.75',
            isCollection ? 'mt-12 lg:mt-6' : 'mt-16 lg:mt-18',
          ])}
          leadingIcon={<ShareIcon />}
        >
          <span className="text-gradient-pr">Share</span>
        </Button>
      </div>
    </section>
  );
}
