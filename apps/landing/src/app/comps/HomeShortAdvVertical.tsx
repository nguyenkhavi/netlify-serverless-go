//THIRD PARTY MODULES
import Link from 'next/link';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import HeaderLogoIcon from '_@shared/icons/HeaderLogoIcon';

export default function HomeShortAdvVertical() {
  return (
    <div className="rounded-[10px] border-[.5px] border-text-20 bg-secondary-300 p-[31px_59px_32px_58px]">
      <HeaderLogoIcon className="m-auto mb-6.25 h-[40px] w-[34px]" />
      <div className="mb-6.25 text-center text-[24px] font-bold leading-[36px]">
        “<span className="text-primary">50%</span> Off Through This Saturday”
      </div>
      <Button
        as={Link}
        href="https://www.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="m-auto w-[117px]"
      >
        Click Here
      </Button>
    </div>
  );
}
