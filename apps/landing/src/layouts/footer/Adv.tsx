//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import HeaderLogoIcon from '_@shared/icons/HeaderLogoIcon';

export default function Adv() {
  return (
    <div
      className={classcat([
        'mt-7.5 rounded-[5px] bg-header-bg px-2.5 py-7.5',
        'sm:mt-9 sm:rounded-[10px] sm:bg-[#040908] sm:px-6 sm:py-[24.5px]',
        'sm:border-[.5px] sm:border-white/25',
        '2xl:mx-2.5 2xl:mt-20.5',
      ])}
    >
      <div
        className={classcat([
          'sm:mx-auto sm:max-w-[1088px]',
          'grid auto-cols-max grid-flow-col items-center justify-center gap-3',
          'sm:justify-between',
        ])}
      >
        <HeaderLogoIcon className="h-[28px] w-[23px] sm:h-[40px] sm:w-[34px]" />
        <span className="text-[14px] font-semibold leading-[26px] sm:text-[24px]">
          <span>“</span>
          <span className="text-bold mr-1 text-primary">50%</span>
          <span>Off Through This Saturday”</span>
        </span>
        <Button
          as={Link}
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={classcat([
            'h-[25px] w-[72px] ow:rounded [&>span]:text-[10px] [&>span]:leading-[13px]',
            'sm:h-[40px] sm:w-[119px] sm:ow:rounded-lg sm:[&>span]:text-[15px] sm:[&>span]:leading-[26px]',
          ])}
        >
          Click Here
        </Button>
      </div>
    </div>
  );
}
