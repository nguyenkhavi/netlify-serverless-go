'use client';

//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
import { Sepolia } from '@thirdweb-dev/chains';
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  safeWallet,
  walletConnectV1,
} from '@thirdweb-dev/react';

export default function Provider({ children }: PropsWithChildren) {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnectV1(), safeWallet()]}
    >
      {children}
    </ThirdwebProvider>
  );
}
