'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { nextApi } from '_@landing/utils/api';
import { usePathname, useRouter } from 'next/navigation';
import { feedbackStore } from '_@landing/stores/feedbackStore';
import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
//SHARED
import LogoutIcon from '_@shared/icons/LogoutIcon';
import FeedbackIcon from '_@shared/icons/FeedbackIcon';
import LockIcon, { LockActiveIcon } from '_@shared/icons/LockIcon';
import BookIcon, { BookActiveIcon } from '_@shared/icons/BookIcon';
import FolderIcon, { FolderActiveIcon } from '_@shared/icons/FolderIcon';
import MyItemIcon, { MyItemActiveIcon } from '_@shared/icons/MyItemIcon';
import UserBarIcon, { UserBarActiveIcon } from '_@shared/icons/UserBarIcon';
import UserProfileIcon, { UserProfileActiveIcon } from '_@shared/icons/UserProfileIcon';

export default function ProfileNav() {
  const router = useRouter();
  const { logout } = useAuthStoreAction();
  const { setOpen } = feedbackStore();
  const pathname = usePathname();
  const { data } = nextApi.userVerifiedPercentage.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const process = Number((data?.percentage || 0).toFixed(2));

  const [show, setShow] = React.useState(false);

  const _handleDismiss = () => {
    sessionStorage.setItem('hidden-verify', 'true');
    setShow(false);
  };

  const _handleAddDetail = () => {
    router.push('/profile');
  };

  useLayoutEffect(() => {
    sessionStorage.getItem('hidden-verify') === 'true' ? setShow(false) : setShow(true);
  }, []);

  return (
    <div>
      <nav
        className={classcat([
          'w-[364px] bg-secondary-200',
          'rounded-ee-[10px] border-[0.5px] border-text-10',
          'hidden shrink-0 py-8 pl-15 pr-6 lg:block',
          'flex flex-col',
          'min-h-[calc(100vh-var(--header-height))]',
        ])}
      >
        <ul className="grid grow gap-10">
          {PROFILE_NAV.map((nav, i) => (
            <li key={i} className="py-2">
              <Link
                data-active={pathname === nav.path}
                className={classcat([
                  'flex items-center text-btndefault text-text-60',
                  'hover:text-gradient-pr [&_svg]:hover:text-primary',
                  'data-[active=true]:text-gradient-pr [&_svg]:data-[active=true]:text-primary',
                ])}
                href={nav.path}
              >
                <span className="grid h-6 w-6 place-items-center">
                  {pathname === nav.path ? nav.iconActive : nav.icon}
                </span>
                <span className="ml-2">{nav.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Show when={show}>
          <div className="mt-10 rounded-[5px] border border-text-10 bg-secondary-300 px-4 py-5">
            <div className="mb-1">
              <span
                style={{ '--process': `${process * 100}%` } as React.CSSProperties}
                className={classcat([
                  'relative mb-1.25 block h-3 w-full overflow-hidden rounded-3xl bg-white',
                  'after:absolute after:left-0 after:top-0 after:h-full after:w-[--process] after:bg-primary',
                  'after:rounded-3xl',
                ])}
              ></span>
              <p className="text-end text-caption">{process * 100}%</p>
            </div>
            <h2 className="text-subtitle2">Complete your account</h2>
            <p className="mb-4 text-body3 text-[#7F7A7A]">
              Personalize your account by adding your details.
            </p>
            <div className="flex items-center text-subtitle2">
              <button onClick={_handleDismiss} className="mr-6">
                Dismiss
              </button>
              <button onClick={_handleAddDetail}>Add Detail</button>
            </div>
          </div>
        </Show>
        <button className="mt-16 flex items-center" onClick={() => setOpen(true)}>
          <FeedbackIcon className="h-6" />
          <span className="ml-2.5 text-text-60">Send us Feedback</span>
        </button>
        <Button
          className={classcat([
            'mt-2.5 ow:h-14.75 ow:border-text-10 ow:bg-text-10 ow:text-white',
            'ow:rounded-[30px] [&>span]:text-sm [&>svg]:h-4',
          ])}
          onClick={() => logout()}
          trailingIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </nav>
    </div>
  );
}

type TProfileNav = {
  label: string;
  path: string;
  icon: JSX.Element;
  iconActive: JSX.Element;
};
export const PROFILE_NAV: TProfileNav[] = [
  {
    label: 'Personal Info',
    path: '/profile',
    icon: <UserProfileIcon />,
    iconActive: <UserProfileActiveIcon />,
  },
  {
    label: 'My Items',
    path: '/profile/my-items',
    icon: <MyItemIcon className="h-5" />,
    iconActive: <MyItemActiveIcon className="h-5" />,
  },
  {
    label: 'Address Book',
    path: '/profile/address',
    icon: <BookIcon className="h-5" />,
    iconActive: <BookActiveIcon className="h-5" />,
  },
  {
    label: 'Account History',
    path: '/profile/account-history',
    icon: <UserBarIcon />,
    iconActive: <UserBarActiveIcon />,
  },
  {
    label: 'My Portfolio',
    path: '/profile/my-portfolio',
    icon: <FolderIcon className="h-4.75" />,
    iconActive: <FolderActiveIcon className="h-4.75" />,
  },
  {
    label: 'Security',
    path: '/profile/security',
    icon: <LockIcon className="h-5" />,
    iconActive: <LockActiveIcon className="h-5" />,
  },
];
