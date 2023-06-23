'use client';
//THIRD PARTY MODULES
import { PropsWithChildren, useEffect } from 'react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { magicLink, useConnect, useSDKChainId, useSigner } from '@thirdweb-dev/react';

export default function ConnectWalletProvider({ children }: PropsWithChildren) {
  const signer = useSigner();
  const connect = useConnect();
  const { user } = useAuthStore();
  const chainId = useSDKChainId();
  useEffect(() => {
    (async () => {
      if (signer || !user || !user.metadata.phoneNumber || !connect) return;
      const magicLinkConfig = magicLink({
        apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY || '',
      });

      await connect(magicLinkConfig, {
        phoneNumber: user.metadata.phoneNumber,
        chainId: chainId,
      });
    })();
  }, [signer, chainId, user, connect]);

  return children;
}
