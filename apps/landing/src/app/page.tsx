'use client'

import InstagramConnectButton from '_@landing/components/provider/InstagramConnectButton'
import KYCButton from '_@landing/components/provider/KYCButton'

import { useUser, useSession } from '@clerk/nextjs'

export default function Home() {
  const { user } = useUser()
  const { session } = useSession()
  session?.user.getSessions().then((data) => {
    console.log({ session: data })
  })
  session?.getToken({ template: 'test' }).then((token) => {
    console.log({ token })
  })
  if (!user) return 'Opps!!!'
  console.log('external accounts', user.externalAccounts)
  console.log({ user })

  return (
    <main className="relative before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-[url('/images/background-footer-light.png')] before:bg-top before:bg-repeat before:opacity-20 before:mix-blend-overlay">
      <KYCButton />
      <InstagramConnectButton />
    </main>
  )
}
