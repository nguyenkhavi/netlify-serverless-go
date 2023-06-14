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
      className={classcat(['rounded-[10px] bg-secondary-200 p-6', 'ring-1 ring-text-10', 'mt-6'])}
    >
      <div
        className={classcat([
          'grid grid-flow-col justify-center xsm:items-center',
          'xsm:justify-between sm:mx-auto',
        ])}
      >
        <HeaderLogoIcon className={classcat(['h-[28px] w-[23px] sm:h-[40px] sm:w-[34px] '])} />
        <span className="ml-3 mr-2 text-center text-subtitle2 sm:text-h4 xl:mx-0">
          “<span className="mr-1 text-primary">50%</span>
          Off Through This Saturday”
        </span>
        <Button
          as={Link}
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={classcat(['sm:btnmd ow:w-29 sm:w-34.5'])}
        >
          Click Here
        </Button>
      </div>
    </div>
  );
}
