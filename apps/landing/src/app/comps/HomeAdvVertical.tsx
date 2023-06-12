//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import HeaderLogoIcon from '_@shared/icons/HeaderLogoIcon';

type Props = {
  className?: string;
  btnClasses?: string;
};

export default function HomeAdvVertical({ className, btnClasses }: Props) {
  return (
    <div
      className={classcat([
        'absolute top-16 h-[600px] w-[160px]',
        'rounded-[10px] border-[.5px] border-white/20 bg-[#0D0D0D]',
        'hidden place-items-center 2xl:grid',
        className,
      ])}
    >
      <div className="grid w-[125px] justify-items-center gap-10">
        <HeaderLogoIcon className="h-[40px] w-[34px]" />
        <div className="text-center text-[24px] font-bold leading-[36px]">
          “<span className="text-primary">50%</span> Off Through This Saturday”
        </div>
      </div>

      <Button
        as={Link}
        href="https://www.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={classcat([
          'absolute bottom-[123px] left-[21px] ow:h-[45px] ow:w-[117px]',
          btnClasses,
        ])}
      >
        Click Here
      </Button>
    </div>
  );
}
