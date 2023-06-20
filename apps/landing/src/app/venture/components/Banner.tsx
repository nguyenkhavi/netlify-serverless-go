//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
//SHARED
import CheckCircleIcon from '_@shared/icons/CheckCircleIcon';

export default function Banner() {
  return (
    <section
      className={classcat([
        'mx-auto w-[--content-width] overflow-hidden rounded-[20px] p-6 xlg:p-10',
        'relative mt-6.25 h-118.5 xlg:mt-0 xlg:h-198',
        'mb-12 grid items-end xlg:mb-6',
      ])}
    >
      <Image
        src="/images/venture/bg-banner.jpeg"
        alt=""
        fill
        className={classcat(['absolute inset-0 z-[-1] object-cover'])}
      />
      <div>
        <Image
          src="/images/venture/logo.png"
          alt=""
          className="h-15.5 w-17.5 rounded border border-primary xlg:h-24.25 xlg:w-27.5"
          width={110}
          height={97}
        />
        <h1 className={classcat(['mt-1.75 text-h4'])}>
          Golden Box for Lighting
          <CheckCircleIcon className="ml-2.5 inline-block xlg:h-8.5 xlg:w-8.5" />
        </h1>
        <h2 className={classcat(['mt-1.25 text-h6'])}>
          By GOLDENPEACELOVER
          <CheckCircleIcon className="ml-2.5 inline-block h-3.5 w-3.5 xlg:h-5 xlg:w-5" />
        </h2>
        <p className="text-body1 text-text-80">12,000 items- 0.03 BUSD</p>
        <ul className={classcat(['mt-2.5 grid grid-flow-col justify-start gap-2.5'])}>
          <li className={classcat([timeItemClasses])}>
            <p>1</p>
            <p>day</p>
          </li>
          <li className={classcat([timeItemClasses])}>
            <p>6</p>
            <p>hrs</p>
          </li>
          <li className={classcat([timeItemClasses])}>
            <p>20</p>
            <p>mins</p>
          </li>
          <li className={classcat([timeItemClasses])}>
            <p>5</p>
            <p>secs</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

const timeItemClasses = [
  'h-12.5 w-12.5 rounded bg-[#303030]',
  'flex flex-col text-caption justify-center items-center',
  '[&>p]:uppercase',
];
