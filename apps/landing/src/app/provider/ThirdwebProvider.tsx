'use client';

//THIRD PARTY MODULES
import { ethers } from 'ethers';
import { PropsWithChildren } from 'react';
import { Sepolia } from '@thirdweb-dev/chains';
import { ThirdwebProvider, magicLink } from '@thirdweb-dev/react';

export default function Provider({ children }: PropsWithChildren) {
  //https://ethereum.stackexchange.com/questions/138536/uncaught-error-missing-provider
  const signer = (
    typeof window !== 'undefined' && window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum).getSigner()
      : ethers.providers.getDefaultProvider()
  ) as any;

  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      supportedWallets={[
        magicLink({
          apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY || '',
        }),
      ]}
      thirdwebApiKey={process.env.NEXT_PUBLIC_THIRDWEB_API_KEY}
      signer={signer}
    >
      {children}
    </ThirdwebProvider>
  );
}
