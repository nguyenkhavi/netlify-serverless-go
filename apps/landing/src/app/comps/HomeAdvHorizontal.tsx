//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import HeaderLogoIcon from '_@shared/icons/HeaderLogoIcon';

type Props = {
  className?: string;
  isHome?: boolean;
};

export default function HomeAdvHorizontal({ className, isHome = false }: Props) {
  return (
    <div
      className={classcat([
        'rounded-[10px] bg-header-bg py-5.5 pl-3.5 pr-4.5',
        'border-[.5px] border-text-20 sm:px-6 sm:py-[24.5px]',
        'xlg:px-20',
        className,
      ])}
    >
      <div
        className={classcat([
          'grid grid-flow-col items-center justify-center',
          'sm:mx-auto sm:justify-between',
          isHome ? 'xl:justify-start' : '',
        ])}
      >
        <HeaderLogoIcon
          className={classcat([
            'h-[28px] w-[23px] sm:h-[40px] sm:w-[34px] ',
            isHome ? 'xl:mr-[307px]' : '',
          ])}
        />
        <span className="ml-3 mr-2 text-center text-subtitle2 sm:text-h4 xl:mx-0">
          “<span className="text-bold mr-1 text-primary">50%</span>
          Off Through This Saturday”
        </span>
        <Button
          as={Link}
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={classcat(['sm:btnmd ow:w-29 sm:w-34.5', isHome ? 'xl:ml-18' : ''])}
        >
          Click Here
        </Button>
      </div>
    </div>
  );
}
