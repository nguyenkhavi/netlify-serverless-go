'use client';

//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
//SHARED
import ArrowRightCircleIcon from '_@shared/icons/ArrowRightCircleIcon';
//HOOK
import useScrollableAnim from '_@landing/hooks/useScrollableAnim';
//RELATIVE MODULES
import './Banner.css';

const MOCK_SLIDE = [
  {
    id: 1,
    image: '/images/marketplace/banner-1.jpeg',
    title: 'The popular art work in USA 1',
    status: 'Live Now',
    price: '20 editions available for $2200',
  },
  {
    id: 1,
    image: '/images/marketplace/banner-1.jpeg',
    title: 'The popular art work in USA 2',
    status: 'Live Now',
    price: '20 editions available for $2200',
  },
  {
    id: 1,
    image: '/images/marketplace/banner-1.jpeg',
    title: 'The popular art work in USA 3',
    status: 'Live Now',
    price: '20 editions available for $2200',
  },
];

export default function Banner() {
  const [containerRef, { prev, next }] = useScrollableAnim(MOCK_SLIDE.length);

  return (
    <div className="relative overflow-hidden">
      <ArrowRightCircleIcon
        className={classcat([
          'absolute left-3 top-1/2 z-[9] -translate-y-1/2 rotate-180',
          'cursor-pointer xlg:left-15 xlg:h-10 xlg:w-10',
        ])}
        onClick={prev}
      />
      <ArrowRightCircleIcon
        className={classcat([
          'absolute right-3 top-1/2 z-[9] -translate-y-1/2',
          'cursor-pointer xlg:right-15 xlg:h-10 xlg:w-10',
        ])}
        onClick={next}
      />
      <div ref={containerRef} className="flex">
        {MOCK_SLIDE.map((item, index) => (
          <div
            key={index}
            className={classcat([
              'relative flex overflow-hidden rounded-xl px-4 py-6 xlg:py-22',
              'mx-[--site-padding] h-full basis-[--content-width] xlg:justify-center',
              'shrink-0 grow bg-banner-bg bg-cover bg-no-repeat xlg:mx-0 xlg:basis-full',
            ])}
          >
            <div className="absolute inset-0 z-10 bg-black/[.84] backdrop-blur-[20px]"></div>
            <div
              className={classcat([
                'z-20 h-25.5 w-25.5 overflow-hidden rounded xlg:rounded-[10px]',
                'xlg:h-80 xlg:w-80',
              ])}
            >
              <Image
                src={item.image}
                className="h-full w-full object-cover"
                alt="image"
                width={320}
                height={320}
              />
            </div>
            <div className="z-20 ml-4.5 max-w-[169px] xlg:ml-11 xlg:max-w-[475px]">
              <p className="text-h6 text-text-100 xlg:text-h2">{item.title}</p>
              <p
                className={classcat([
                  'text-body3 text-text-100 xlg:mt-3.75 xlg:text-h4 xlg:text-text-80',
                  'dot-live relative w-max',
                ])}
              >
                {item.status}
              </p>
              <small className="text-caption text-text-60 xlg:mt-1.25 xlg:text-h5 xlg:text-text-80">
                {item.price}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
