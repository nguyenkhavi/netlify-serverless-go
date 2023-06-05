//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//SHARED
import VerifyIcon from '_@shared/icons/VerifyIcon';
import TwitterIcon from '_@shared/icons/TwitterIcon';
import InstagramIcon from '_@shared/icons/InstagramIcon';

export default function ProfileBanner() {
  return (
    <section
      className={classcat([
        'rounded-[10px] border-[.5px] border-text-10 bg-secondary-200',
        'relative mb-5 overflow-hidden lg:mb-7',
        'pb-5 lg:pb-18',
      ])}
    >
      <img className="relative z-[1] h-51 w-full object-cover lg:h-57" src="/images/profile/cover.jpeg" alt="" />
      <div
        className={classcat([
          'mx-auto mb-2 overflow-hidden rounded-full lg:mx-0',
          'h-15 w-15 md:h-30 md:w-30 lg:h-42 lg:w-42',
          '-mt-7.5 md:-mt-15 lg:-mt-21 lg:ml-18.75',
          'relative z-[2] border border-primary lg:absolute',
        ])}
      >
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
          alt=""
        />
      </div>
      <div
        className={classcat(['lg:ml-60.75 lg:mt-5 lg:flex lg:grow lg:pl-3 lg:pr-7', 'flex-wrap'])}
      >
        <h1 className="mb-2.5 text-center text-h6 lg:mb-0 lg:mr-16 lg:text-h5-bold">@Kevin _Smiith</h1>
        <div className="mb-12.5 flex justify-center text-caption lg:mb-0 lg:mr-auto">
          <p className="flex items-center">
            <VerifyIcon className="h-4 shrink-0" />
            ID Verified
          </p>
          <p className="flex items-center">
            <VerifyIcon className="h-4 shrink-0" />
            Address Verified
          </p>
        </div>
        <div className="grid grid-cols-[repeat(2,34px)] justify-center gap-2">
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="h-8.5 w-full" />
          </Link>
          <Link href="#" target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="h-8.5 w-full" />
          </Link>
        </div>
      </div>
    </section>
  );
}
