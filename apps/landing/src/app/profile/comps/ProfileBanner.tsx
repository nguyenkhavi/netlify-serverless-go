//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import urlWithIpfs from '_@landing/utils/urlWithIpfs';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
//SHARED
import VerifyIcon from '_@shared/icons/VerifyIcon';
import TwitterIcon from '_@shared/icons/TwitterIcon';
import InstagramIcon from '_@shared/icons/InstagramIcon';

export default function ProfileBanner() {
  const { user } = useAuthStore();
  const { instagramUid, twitterUid, personaInquiryId } = user?.profile ?? {};

  if (!user) return <div className="mb-7 h-69 animate-pulse bg-secondary-400" />;

  return (
    <section
      className={classcat([
        'rounded-[10px] border-text-10 bg-secondary-200',
        'relative mb-5 overflow-hidden lg:mb-7',
        'pb-5 lg:pb-18',
      ])}
    >
      <img
        className="relative z-[1] h-[137px] w-full object-cover lg:h-36"
        src={urlWithIpfs(user.profile.coverUrl ?? '/images/profile/cover.jpeg')}
        alt=""
      />
      <div
        className={classcat([
          'overflow-hidden rounded-full',
          'mx-auto mb-4 lg:mx-0',
          'h-15 w-15 md:h-30 md:w-30 lg:h-42 lg:w-42',
          '-mt-7.5 md:-mt-15 lg:-mt-21 lg:ml-[29px]',
          'relative z-[2] lg:absolute',
          'border border-primary lg:border-[3px] lg:border-white',
        ])}
      >
        <img
          className="h-full w-full object-cover"
          src={urlWithIpfs(user.profile.avatarUrl ?? '/images/profile/avatar-default.webp')}
          alt=""
        />
      </div>
      <div className={classcat(['lg:ml-[221px] lg:mt-5 lg:flex lg:grow lg:pr-7', 'flex-wrap'])}>
        <h1 className="mb-2.5 text-center text-h6 lg:mb-0 lg:mr-16 lg:text-h5-bold">
          {user?.profile.firstName + ' ' + user?.profile.lastName}
        </h1>
        <Show when={personaInquiryId}>
          <div className="mb-14 flex justify-center text-caption lg:mb-0 lg:mr-auto">
            <Show when={personaInquiryId}>
              <p className="mr-[14px] flex items-center lg:mr-[23px] lg:text-sm">
                <VerifyIcon className="mr-[2px] h-[18px] w-[18px] shrink-0 lg:mr-1" />
                ID Verified
              </p>
            </Show>

            {/* <p className="flex items-center lg:text-sm">
            <VerifyIcon className="mr-[2px] h-[18px] w-[18px] shrink-0 lg:mr-1" />
            Address Verified
          </p> */}
          </div>
        </Show>
        <div className="grid grid-cols-[repeat(2,40px)] justify-center gap-2">
          <Show when={instagramUid}>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-10 w-10" />
            </Link>
          </Show>
          <Show when={twitterUid}>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <TwitterIcon className="h-10 w-10" />
            </Link>
          </Show>
        </div>
      </div>
    </section>
  );
}
