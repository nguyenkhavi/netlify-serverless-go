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
        'mt-7.5 rounded-[5px] bg-header-bg py-5.5 pl-8.5 pr-3.5',
        'sm:mt-9 sm:rounded-[10px] sm:bg-[#040908] sm:px-6 sm:py-[24.5px]',
        'border-[.5px] border-white/25',
        'xlg:px-20 2xl:mx-2.5 2xl:mt-20.5',
      ])}
    >
      <div
        className={classcat([
          'sm:mx-auto sm:max-w-[1088px]',
          'grid grid-flow-col items-center justify-center gap-3',
          'sm:justify-between',
        ])}
      >
        <HeaderLogoIcon className="h-[28px] w-[23px] sm:h-[40px] sm:w-[34px]" />
        <span className="ml-3 mr-2 text-center text-subtitle2 sm:text-h4 xl:mx-0">
          “<span className="text-bold mr-1 text-primary">50%</span>
          Off Through This Saturday”
        </span>
        <Button
          as={Link}
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:btnmd ow:w-29 sm:w-34.5"
        >
          Click Here
        </Button>
      </div>
    </div>
  );
}
