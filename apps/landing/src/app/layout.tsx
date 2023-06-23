//THIRD PARTY MODULES
import classcat from 'classcat';
import { Metadata } from 'next';
import { Archivo } from 'next/font/google';
// import AnimationProvider from './provider/AnimationProvider'
import 'stream-chat-react/dist/css/v2/index.css';
import AuthProvider from '_@landing/stores/auth/AuthProvider';
import ClientProvider from '_@landing/app/provider/ClientProvider';
//LAYOUT, COMPONENTS
import Header from '_@landing/layouts/Header';
import Footer from '_@landing/layouts/footer/Footer';
import BaseToast from '_@shared/components/toast/BaseToast';
import ModalFeedback from '_@landing/components/modal/ModalFeedback';
//HOOK
import getMyProfileOnServer from '_@landing/server/auth';
//RELATIVE MODULES
import './globals.css';
import ThirdwebProvider from './provider/ThirdwebProvider';
import IndexedDBProvider from './provider/IndexedDBProvider';
import ConnectWalletProvider from './provider/ConnectWalletProvider';

export const metadata: Metadata = {
  title: 'Fleamint',
  description: 'Design amazing digital experiences that create more happy in the world.',
};

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getMyProfileOnServer();
  return (
    <ClientProvider>
      <ThirdwebProvider>
        <IndexedDBProvider>
          <AuthProvider user={user}>
            <ConnectWalletProvider>
              {/* <AnimationProvider> */}
              <html lang="en" className={classcat([archivo.variable, 'hidden-scrollbar'])}>
                <body>
                  <Header />
                  {children}
                  <Footer />
                  <ModalFeedback />
                  <BaseToast />
                </body>
              </html>
              {/* </AnimationProvider> */}
            </ConnectWalletProvider>
          </AuthProvider>
        </IndexedDBProvider>
      </ThirdwebProvider>
    </ClientProvider>
  );
}
