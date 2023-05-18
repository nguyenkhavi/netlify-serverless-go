import '_@landing/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ClientProvider from './provider/ClientProvider'
import { Kanit } from 'next/font/google'
import Header from '_@landing/layouts/header/Header'
import Footer from '_@landing/layouts/footer/Footer'

const kanit = Kanit({
  subsets: ['latin'],
  variable: '--font-kanit',
  weight: ['300', '400', '500', '600', '700'],
})

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={kanit.variable}>
      <head>
        <title>SZN-ONE</title>
        <meta name="description" content="SZN-ONE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ClientProvider>
          <ClerkProvider>
            <Header />
            {children}
            <Footer />
          </ClerkProvider>
        </ClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
