//THIRD PARTY MODULES
import classcat from 'classcat';
import { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import AuthProvider from '_@landing/stores/auth/AuthProvider';
import ClientProvider from '_@landing/app/provider/ClientProvider';
//LAYOUT, COMPONENTS
import Header from '_@landing/layouts/Header';
import Footer from '_@landing/layouts/footer/Footer';
import ModalFeedback from '_@landing/components/modal/ModalFeedback';
//RELATIVE MODULES
import './globals.css';
import IndexedDBProvider from './provider/IndexedDBProvider';

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
    <ClerkProvider>
      <ClientProvider>
        <AuthProvider>
          <IndexedDBProvider>
            <html lang="en" className={classcat([archivo.variable, 'hidden-scrollbar'])}>
              <body>
                <Header />
                {/* <SessionProvider>{children}</SessionProvider> */}
                {children}
                <Footer />
                <ModalFeedback />
              </body>
            </html>
          </IndexedDBProvider>
        </AuthProvider>
      </ClientProvider>
    </ClerkProvider>
  );
}
