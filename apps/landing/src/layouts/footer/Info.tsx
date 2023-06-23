//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
//SHARED
import GithubIcon from '_@shared/icons/GithubIcon';
import TwitterIcon from '_@shared/icons/TwitterIcon';
import DiscordIcon from '_@shared/icons/DiscordIcon';
import FacebookIcon from '_@shared/icons/FacebookIcon';
import InstagramIcon from '_@shared/icons/InstagramIcon';
import LogoWhiteIcon from '_@shared/icons/LogoWhiteIcon';

const LINK_LIST = [
  {
    title: 'About Us',
    links: [
      {
        title: 'About',
        href: '/',
      },
      {
        title: 'Legal',
        href: '/',
      },
      {
        title: 'Careers',
        href: '/',
      },
      {
        title: 'Terms',
        href: '/',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Bug Bounty',
        href: '/',
      },
      {
        title: 'FAQ',
        href: '/',
      },
      {
        title: 'Licensing',
        href: '/',
      },
      {
        title: 'Tutorials',
        href: '/',
      },
    ],
  },
  {
    title: 'Products',
    links: [
      {
        title: 'Brands',
        href: '/',
      },
      {
        title: 'Ventures',
        href: '/',
      },
      {
        title: 'Dex',
        href: '/',
      },
      {
        title: 'Launchpad',
        href: '/',
      },
      {
        title: 'Community',
        href: '/',
      },
    ],
  },
];

const SOCIAL_LIST = [
  {
    href: 'https://www.facebook.com/',
    Icon: FacebookIcon,
  },
  {
    href: 'https://www.instagram.com/',
    Icon: InstagramIcon,
  },
  {
    href: 'https://twitter.com/',
    Icon: TwitterIcon,
  },
  {
    href: 'https://discord.com/',
    Icon: DiscordIcon,
  },
  {
    href: 'https://github.com/',
    Icon: GithubIcon,
  },
];

export default function Info() {
  return (
    <div className={classcat(['md:flex md:flex-wrap md:items-start', '2xl:relative'])}>
      <div
        className={classcat([
          'grid auto-cols-max grid-flow-col items-start justify-between',
          'md:mr-28.75 md:gap-28.75 lg:ml-auto',
        ])}
      >
        {LINK_LIST.map((linkList) => (
          <div key={linkList.title} className={classcat(['grid gap-4'])}>
            <div className="text-subtitle1">{linkList.title}</div>
            <div className={classcat(['grid gap-3'])}>
              {linkList.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="pointer-events-none text-body3 text-text-50 hover:underline"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className={classcat([
          'mt-6 grid justify-items-center',
          'md:-order-1 md:mt-0 md:justify-items-start',
        ])}
      >
        <LogoWhiteIcon />
        <div
          className={classcat([
            'mt-[11px] text-center text-body1 text-text-50 lg:w-[287px] lg:text-start',
          ])}
        >
          Design amazing digital experiences that create more happy in the world.
        </div>
      </div>

      <div
        className={classcat([
          'mt-6 grid justify-items-center gap-1.25',
          'md:mt-0',
          'md:mx-0 md:justify-items-start',
          '2xl:mr-[55px]',
        ])}
      >
        <div className="text-subtitle2 md:text-subtitle1">Follow Us</div>
        <div className="grid grid-cols-[repeat(5,34px)] grid-rows-[34px] gap-2 lg:grid-cols-[repeat(5,40px)] lg:grid-rows-[40px]">
          {SOCIAL_LIST.map((social) => {
            const Icon = social.Icon;
            return (
              <Link
                className="h-full w-full"
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-full w-full" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
