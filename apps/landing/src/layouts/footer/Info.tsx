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
    <div
      className={classcat([
        'md:flex md:flex-wrap md:items-start md:justify-between',
        '2xl:relative',
      ])}
    >
      <div
        className={classcat([
          'grid auto-cols-max grid-flow-col items-start justify-between',
          'md:min-w-[480px] s-924:min-w-[560px] s-1036:min-w-[640px]',
          's-1117:min-w-[480px]',
          '2xl:absolute 2xl:right-[355px]',
        ])}
      >
        {LINK_LIST.map((linkList) => (
          <div
            key={linkList.title}
            className={classcat(['grid justify-items-center gap-[10px]', 'md:justify-items-start'])}
          >
            <div className="text-subtitle2 md:text-subtitle1">{linkList.title}</div>
            <div
              className={classcat(['grid justify-items-center gap-2', 'md:justify-items-start'])}
            >
              {linkList.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-body3 text-[color:#A6A6A6] hover:underline"
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
          'mt-7.5 grid justify-items-center',
          'md:-order-1 md:mt-0 md:justify-items-start',
        ])}
      >
        <LogoWhiteIcon />
        <div
          className={classcat([
            'mt-[11px] w-[215px] text-center text-[12px] font-medium leading-[20px] text-[color:#A6A6A6]',
            'md:text-left',
          ])}
        >
          Design amazing digital experiences that create more happy in the world.
        </div>
      </div>

      <div
        className={classcat([
          'mt-5 grid justify-items-center gap-[7px]',
          'md:mx-auto md:mt-7.5',
          's-1117:mx-0 s-1117:mt-0 s-1117:justify-items-start',
          '2xl:mr-[55px]',
        ])}
      >
        <div className="text-subtitle2 md:text-subtitle1">Follow Us</div>
        <div className="grid grid-cols-[repeat(5,30px)] gap-2">
          {SOCIAL_LIST.map((social) => {
            const Icon = social.Icon;
            return (
              <Link key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
                <Icon />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
