'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { feedbackStore } from '_@landing/stores/feedbackStore';
import { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import MenuIcon from '_@shared/icons/MenuIcon';
import LogoutIcon from '_@shared/icons/LogoutIcon';
import VerifyIcon from '_@shared/icons/VerifyIcon';
import FeedbackIcon from '_@shared/icons/FeedbackIcon';
import ChevronDownIcon from '_@shared/icons/ChevronDownIcon';
import QuestionCircleIcon from '_@shared/icons/QuestionCircleIcon';
//RELATIVE MODULES
import { PROFILE_NAV } from './ProfileNav';

type ProfileNavMobileProps = {
  title: string;
  isBorder?: boolean;
};

export default function ProfileNavMobile({ title, isBorder = true }: ProfileNavMobileProps) {
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  return (
    <div
      className={classcat([
        'flex items-center py-4',
        'mx-[calc(var(--px)*-1)] px-[--px]',
        'lg:hidden',
        isBorder && 'border-b border-text-10',
      ])}
    >
      <h2 className="mr-auto text-subtitle1 text-text-80">{title}</h2>
      <Popover open={openStatus} onOpenChange={(open) => setOpenStatus(open)}>
        <PopoverTrigger>
          <div
            className={classcat([
              'mr-2.5 flex h-10.5 items-center rounded-[5px] bg-secondary-200 p-2.5',
              'text-body3 text-text-50',
            ])}
            onClick={() => setOpenStatus(!openStatus)}
          >
            Account status
            <ChevronDownIcon className="text-current" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <AccountStatusDropdown />
        </PopoverContent>
      </Popover>
      <Popover open={openProfileDropdown} onOpenChange={(open) => setOpenProfileDropdown(open)}>
        <PopoverTrigger>
          <div
            className="grid h-10.5 w-10.5 place-items-center rounded-[5px] bg-secondary-200"
            onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
          >
            <MenuIcon className="h-6 text-text-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent align="end">
          <ProfileDropdown />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ProfileDropdown() {
  const { logout } = useAuthStoreAction();
  const { setOpen } = feedbackStore();
  const pathname = usePathname();

  return (
    <div>
      <ul className="grid gap-7.5">
        {PROFILE_NAV.map((nav, i) => (
          <li key={i}>
            <Link
              data-active={pathname === nav.path}
              className={classcat([
                'flex items-center text-btnlg text-text-50',
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
      <button className="mt-7.5 flex items-center text-body2" onClick={() => setOpen(true)}>
        <FeedbackIcon className="h-5" />
        <span className="ml-2.5">Send us Feedback</span>
      </button>
      <Button
        className={classcat([
          'mt-2.5 ow:border-text-10 ow:bg-text-10 ow:text-white',
          'rounded-[30px] [&>svg]:h-4',
        ])}
        trailingIcon={<LogoutIcon />}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}

function AccountStatusDropdown() {
  return (
    <div>
      <div
        className={classcat([
          'grid place-items-center justify-center py-3.75',
          'rounded-[10px] border border-text-10',
          'mb-6.25 max-w-[330px] grow',
        ])}
      >
        <p className="text-h6">Verification Level : 2</p>
        <QuestionCircleIcon className="h-8 w-8" />
        <p className="text-subtitle2 text-primary">Upgrade</p>
      </div>
      <div
        className={classcat([
          'rounded-[10px] border border-text-10 px-4',
          'flex max-w-[320px] items-center py-3.75',
        ])}
      >
        <VerifyIcon className="mr-4 h-10 w-9 shrink-0" />
        <div>
          <p className="text-h6">2FA Not Enabled</p>
          <p className="text-body3 text-text-50">
            Enabling two-factor authentication is great way to secure your account
          </p>
          <Link href="/profile/security" className="text-subtitle2 text-primary">
            Setup 2FA Now
          </Link>
        </div>
      </div>
    </div>
  );
}
