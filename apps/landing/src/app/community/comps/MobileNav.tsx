//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { usePathname } from 'next/navigation';
import * as Popover from '@radix-ui/react-popover';
import { cloneElement, useMemo, useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import MenuIcon from '_@shared/icons/MenuIcon';
import CloseIcon from '_@shared/icons/CloseIcon';
//RELATIVE MODULES
import { menuData } from '../constants/constants';

function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkActive = useMemo(
    () => menuData.find((item) => pathname === item.path)?.label,
    [pathname],
  );

  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className={classcat([
            'rounded-[theme(spacing[1.25])] border-none bg-secondary-200',
            'ow:h-10.5 ow:w-11.25 ow:p-0 [&>svg]:ml-2 [&>svg]:h-6 [&>svg]:w-6',
          ])}
          leadingIcon={<MenuIcon className={classcat(['text-text-50'])} />}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className={classcat([
            'relative border border-solid border-text-20 bg-secondary will-change-[transform,opacity]',
            'w-79.5',
          ])}
          sideOffset={-56}
          onPointerDownOutside={() => {
            setOpen(false);
          }}
        >
          <ul className="grid gap-6 p-4">
            {menuData.map((menu, i) => (
              <li key={i}>
                <Link
                  href={menu.path}
                  className={classcat([
                    'flex items-center hover:text-primary',
                    linkActive === menu.label ? 'text-primary' : 'text-text-50',
                  ])}
                >
                  {cloneElement(menu.icon, { color: 'currentColor', className: 'mr-1' })}
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => setOpen(false)}
            className={classcat([
              'absolute right-4 top-4',
              'rounded-[theme(spacing[1.25])] border-none bg-secondary-200',
              'ow:h-10.5 ow:w-11.25 ow:p-0 [&>svg]:ml-2 [&>svg]:h-6 [&>svg]:w-6',
            ])}
            leadingIcon={<CloseIcon className={classcat(['text-text-50'])} />}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default MobileNav;
