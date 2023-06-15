'use client';
//THIRD PARTY MODULES
import { nextApi } from '_@landing/utils/api';
import { Sepolia } from '@thirdweb-dev/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  safeWallet,
  walletConnectV1,
} from '@thirdweb-dev/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const UseClientProvider = nextApi.withTRPC(({ children }: { children: any }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
});

// Create this Wrapper because of TS error
export default function Wrapper({ children }: { children: any }) {
  // @ts-ignore
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnectV1(), safeWallet()]}
      activeChain={Sepolia}
    >
      {/* @ts-ignore */}
      <UseClientProvider>{children}</UseClientProvider>
    </ThirdwebProvider>
  );
}
