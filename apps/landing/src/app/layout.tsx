//THIRD PARTY MODULES
import { Metadata } from 'next';
import classcat from 'classcat';
import { Archivo } from 'next/font/google';
import { AuthProvider } from '_@landing/stores/useAuthStore';
import ClientProvider from '_@landing/app/provider/ClientProvider';
//LAYOUT, COMPONENTS
import Header from '_@landing/layouts/Header';
import Footer from '_@landing/layouts/footer/Footer';
import BaseToast from '_@shared/components/toast/BaseToast';
import ModalFeedback from '_@landing/components/modal/ModalFeedback';
import { DialogConfirm } from '_@landing/components/dialog/DialogConfirm';
//RELATIVE MODULES
import './globals.css';

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
    <AuthProvider>
      <ClientProvider>
        <html lang="en" className={classcat([archivo.variable, 'hidden-scrollbar'])}>
          <body>
            <Header />
            {/* <SessionProvider>{children}</SessionProvider> */}
            {children}
            <Footer />
            <ModalFeedback />
            <BaseToast />
            <DialogConfirm />
          </body>
        </html>
      </ClientProvider>
    </AuthProvider>
  );
}
