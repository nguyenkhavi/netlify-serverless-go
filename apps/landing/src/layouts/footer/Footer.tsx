'use client'
import Logo from '_@landing/components/icons/Logo'
import { Discord, Facebook, Instagram, Twitter } from '_@landing/components/icons/Social'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  return (
    <footer
      className={`p-4 lg:p-10 ${
        pathname === '/'
          ? "relative before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-[url('/images/background-footer-light.png')] before:bg-top before:bg-repeat before:opacity-20 before:mix-blend-overlay lg:pt-30"
          : ''
      }`}
    >
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <Logo width={84} color="#000000" />
        <div>
          <p className="mb-4 text-center text-14 text-foundation-black-100">Follow us</p>
          <div className="flex items-center justify-center [&>*:not(:last-of-type)]:mr-4">
            <Link
              href="https://www.instagram.com/sznonenft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Open our instagram in new tab</span>
              <Instagram />
            </Link>
            <Link
              href="https://www.facebook.com/sznoneofficial/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Open our facebook in new tab</span>
              <Facebook />
            </Link>
            <Link href="https://discord.gg/Br55aPPPqp" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Open our discord in new tab</span>
              <Discord />
            </Link>
            <Link href="https://twitter.com/sznonenft" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">Open our twitter in new tab</span>
              <Twitter />
            </Link>
          </div>
        </div>
      </div>
      <div className="invisible my-4 h-[1px] w-full bg-foundation-black-100 lg:visible" />
      <div className="flex items-center justify-between text-14 text-foundation-black-100 lg:text-base">
        <p>@2023.All rights reserved </p>
        <Link
          href="https://szn-one.com/terms-and-conditions/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Policy/Terms & Agreements
        </Link>
      </div>
    </footer>
  )
}
