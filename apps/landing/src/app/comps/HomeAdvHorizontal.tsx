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
        'rounded-[10px] bg-secondary-200 px-4 py-[22.5px] md:p-6',
        'ring-1 ring-text-10',
        className,
      ])}
    >
      <div
        className={classcat([
          'grid grid-flow-col justify-center xsm:items-center',
          'xsm:justify-between sm:mx-auto',
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
          “<span className="mr-1 text-primary">50%</span>
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
