'use client';
//THIRD PARTY MODULES
import { useEffect } from 'react';
import { api } from '_@landing/utils/api';
import { Sepolia } from '@thirdweb-dev/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnectV1,
  safeWallet,
} from '@thirdweb-dev/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const UseClientProvider = api.withTRPC(({ children }: { children: any }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
});

// Create this Wrapper because of TS error
export default function Wrapper({ children }: { children: any }) {
  // @ts-ignore
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnectV1(), safeWallet()]}
      activeChain={Sepolia}
      key={
        '72031b666e5753233674754566b67fab303f94a42db6f8890be0fae84ebe771a5f5e893d1bbe10ed6008cd2ceb86cb9871226fe6eab701fa05df5e58b33e297c'
      }
    >
      {/* @ts-ignore */}
      <UseClientProvider>{children}</UseClientProvider>
    </ThirdwebProvider>
  );
}
