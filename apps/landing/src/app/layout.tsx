//THIRD PARTY MODULES
import { Metadata } from 'next';
import classcat from 'classcat';
import { Archivo } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
//LAYOUT, COMPONENTS
import Header from '_@landing/layouts/Header';
import Footer from '_@landing/layouts/footer/Footer';
//RELATIVE MODULES
import './globals.css';
import ClientProvider from './provider/ClientProvider';

export const metadata: Metadata = {
  title: 'Fleamint',
  description: 'Design amazing digital experiences that create more happy in the world.',
};

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider>
      <ClerkProvider>
        <html lang="en" className={classcat([archivo.variable, 'hidden-scrollbar'])}>
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </ClerkProvider>
    </ClientProvider>
  );
}
