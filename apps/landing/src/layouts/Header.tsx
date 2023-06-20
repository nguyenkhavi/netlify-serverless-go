'use client';
//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import useAuthStore, { useAuthStoreAction } from '_@landing/stores/auth/useAuthStore';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/Show';
import Button from '_@shared/components/Button';
import { Popover, PopoverContent, PopoverTrigger } from '_@shared/components/popover/Popover';
//SHARED
import MenuIcon from '_@shared/icons/MenuIcon';
import CartIcon from '_@shared/icons/CartIcon';
import WalletIcon from '_@shared/icons/WalletIcon';
import MenuCloseIcon from '_@shared/icons/MenuCloseIcon';
import HeaderLogoIcon from '_@shared/icons/HeaderLogoIcon';

export default function Header() {
  const { user } = useAuthStore();
  const { logout } = useAuthStoreAction();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname();

  const linkActive = useMemo(() => {
    if (pathname === '/') return 'Home';
    return menuData
      .map((item) => item)
      .splice(1)
      .find((item) => pathname.includes(item.path))?.label;
  }, [pathname]);

  const _handleCloseDropdown = () => {
    setOpenDropdown(false);
  };

  const onSignOut = () => {
    logout();
    setOpenDropdown(false);
  };

  return (
    <header
      className={classcat([
        'sticky top-0 z-sticky',
        'h-[--header-height] bg-secondary-200 px-[--site-padding]',
        'relative flex items-center',
      ])}
    >
      <button className="mr-2 lg:hidden">
        {openMenu ? (
          <MenuCloseIcon onClick={() => setOpenMenu(false)} />
        ) : (
          <MenuIcon onClick={() => setOpenMenu(true)} />
        )}
      </button>

      <Link href="/" className="grid h-8 w-8 place-items-center md:h-10 md:w-10">
        <HeaderLogoIcon className="h-full w-full" />
      </Link>

      <div
        data-show={openMenu}
        className={classcat([
          'grid grid-rows-[0fr] overflow-hidden data-[show=true]:grid-rows-[1fr] lg:grid-rows-[1fr]',
          'absolute left-0 top-[--header-height] w-full lg:static lg:w-auto ',
          'px-[--px] transition-all duration-200 lg:px-0',
          'bg-black lg:h-full lg:bg-transparent lg:py-0',
          openMenu ? 'py-6' : 'px-0',
        ])}
      >
        <ul
          className={classcat([
            'items-center gap-3.75 lg:h-full lg:grid-flow-col lg:gap-5.5',
            'grid lg:ml-14.25',
            'overflow-hidden',
          ])}
        >
          {menuData.map((menu, i) => (
            <li key={i}>
              <Link
                className="text-btndefault hover:text-primary data-[active=true]:text-primary"
                data-active={menu.label === linkActive}
                href={menu.path}
              >
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={classcat(['ml-auto grid grid-flow-col', user ? 'gap-6' : ''])}>
        <Show when={!user && !['/auth/sign-in', '/auth/sign-up'].includes(pathname)}>
          <Link
            href="/auth/sign-in"
            className={classcat([
              'flex shrink-0 items-center',
              'mr-6.25 h-11.25 font-medium leading-[17px] hover:text-primary',
            ])}
          >
            Log In
          </Link>
          <Button className="btnsm ow:w-29.25" href="/auth/sign-up" as={Link}>
            Sign up
          </Button>
        </Show>
        <Show when={user}>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-[#1D1D1D]">
            <WalletIcon />
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-[#1D1D1D]">
            <CartIcon />
          </button>
          <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
            <PopoverTrigger>
              <div className="h-10 w-10 overflow-auto rounded-full">
                <img
                  src="/images/profile/avatar.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="min-w-[15rem] ow:z-dropdown ow:px-3 ow:py-4">
              <div className="grid gap-4">
                <Link
                  className={itemDropdownClasses}
                  href="/profile"
                  onClick={_handleCloseDropdown}
                >
                  My Profile
                </Link>
                <Link className={itemDropdownClasses} href="#" onClick={_handleCloseDropdown}>
                  Purchase History
                </Link>
                <button
                  className={classcat([itemDropdownClasses, 'text-start'])}
                  onClick={onSignOut}
                >
                  Log Out
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </Show>
      </div>
    </header>
  );
}

const itemDropdownClasses = 'text-body2 hover:text-primary text-text-50';

const menuData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Marketplace',
    path: '/marketplace',
  },
  {
    label: 'DEX',
    path: '/dex',
  },
  {
    label: 'Community',
    path: '/community',
  },
  {
    label: 'Venture',
    path: '/venture',
  },
];
