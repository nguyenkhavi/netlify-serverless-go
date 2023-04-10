'use client'

import { useEffect, useState } from 'react'
import Logo from '_@landing/components/icons/Logo'

export default function Header() {
  const [isStickyHeader, setIsStickyHeader] = useState(false)
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 150) {
        setIsStickyHeader(true)
      }
      if (window.scrollY <= 1) {
        setIsStickyHeader(false)
      }
    }
  }, [])

  return (
    <header
      id="header"
      className={`sticky z-[999] flex items-center justify-between p-4 transition-[top] duration-500 ease-in-out lg:px-10 ${
        isStickyHeader ? 'top-0 bg-white' : '-top-30 bg-transparent'
      }`}
    >
      <Logo />
      <button className="rounded-full bg-foundation-orange-500 px-6 py-2 text-14 font-medium text-white">
        Get Started
      </button>
    </header>
  )
}
