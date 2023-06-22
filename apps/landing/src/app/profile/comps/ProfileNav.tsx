'use client';
//THIRD PARTY MODULES
import React from 'react';
import Link from 'next/link';
import classcat from 'classcat';
import { nextApi } from '_@landing/utils/api';
import { usePathname } from 'next/navigation';
import { feedbackStore } from '_@landing/stores/feedbackStore';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import BookIcon from '_@shared/icons/BookIcon';
import LockIcon from '_@shared/icons/LockIcon';
import FolderIcon from '_@shared/icons/FolderIcon';
import LogoutIcon from '_@shared/icons/LogoutIcon';
import MyItemIcon from '_@shared/icons/MyItemIcon';
import UserBarIcon from '_@shared/icons/UserBarIcon';
import FeedbackIcon from '_@shared/icons/FeedbackIcon';
import UserProfileIcon from '_@shared/icons/UserProfileIcon';

export default function ProfileNav() {
  const { logout } = useAuthStoreAction();
  const { setOpen } = feedbackStore();
  const pathname = usePathname();
  const { data } = nextApi.userVerifiedPercentage.useQuery();
  const process = Number(`${data?.percentage || 0}`.toFixed(2));

  return (
    <div>
      <nav
        className={classcat([
          'w-[364px] bg-secondary-200',
          'rounded-ee-[10px] border-[0.5px] border-text-10',
          'hidden shrink-0 py-8 pl-15 pr-6 lg:block',
        ])}
      >
        <ul className="grid gap-11">
          {PROFILE_NAV.map((nav, i) => (
            <li key={i}>
              <Link
                data-active={pathname === nav.path}
                className={classcat([
                  'flex items-center text-btndefault text-text-50',
                  'hover:text-primary [&_svg]:hover:text-primary',
                  'data-[active=true]:text-primary [&_svg]:data-[active=true]:text-primary',
                ])}
                href={nav.path}
              >
                <span className="grid h-6 w-6 place-items-center">{nav.icon}</span>
                <span className="ml-2">{nav.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-11.5 rounded-[5px] border border-text-10 bg-secondary-300 px-4.5 pb-8 pt-9.5">
          <div className="mb-1.5">
            <span
              style={{ '--process': `${process * 100}%` } as React.CSSProperties}
              className={classcat([
                'relative h-3 w-full overflow-hidden rounded-3xl bg-white',
                'after:absolute after:left-0 after:top-0 after:h-full after:w-[--process] after:bg-primary',
                'after:rounded-3xl',
              ])}
            ></span>
            <p className="text-end text-caption">{process}%</p>
          </div>
          <h2 className="text-subtitle2">Complete your account</h2>
          <p className="text-body3 text-text-60">
            Personalize your account by adding your details.
          </p>
          <div className="flex items-center text-subtitle2">
            <button className="mr-9">Dismiss</button>
            <button>Add Detail</button>
          </div>
        </div>
        <button className="mt-16 flex items-center" onClick={() => setOpen(true)}>
          <FeedbackIcon className="h-5" />
          <span className="ml-2.5">Send us Feedback</span>
        </button>
        <Button
          className={classcat([
            'mt-2.5 ow:border-text-10 ow:bg-text-10 ow:text-white',
            'ow:rounded-[30px] [&>svg]:h-4',
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
};
export const PROFILE_NAV: TProfileNav[] = [
  {
    label: 'Personal Info',
    path: '/profile',
    icon: <UserProfileIcon />,
  },
  {
    label: 'My Items',
    path: '/profile/my-items',
    icon: <MyItemIcon className="h-5" />,
  },
  {
    label: 'Address Book',
    path: '/profile/address',
    icon: <BookIcon className="h-5" />,
  },
  {
    label: 'Account History',
    path: '/profile/account-history',
    icon: <UserBarIcon />,
  },
  {
    label: 'My Portfolio',
    path: '/profile/my-portfolio',
    icon: <FolderIcon className="h-4.75" />,
  },
  {
    label: 'Security',
    path: '/profile/security',
    icon: <LockIcon className="h-5" />,
  },
];
