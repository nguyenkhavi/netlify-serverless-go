'use client';

//THIRD PARTY MODULES
import { useUser } from '@clerk/nextjs';
import { api } from '_@landing/utils/api';
import { useCallback, useEffect } from 'react';
import { ConnectWallet, useAddress, useSDK } from '@thirdweb-dev/react';
//CONFIG
import { generateSignedMessage } from '_@rpc/config/utils';
export function ConnectWalletButton() {
  const sdk = useSDK();
  const { user, isLoaded } = useUser();

  const address = useAddress();
  const { mutate: connectWallet } = api.user.connectWallet.useMutation();

  const signAndSend = useCallback(async () => {
    if (sdk && address && isLoaded && user?.id) {
      const signature = await sdk.wallet.sign(generateSignedMessage(user.id));
      connectWallet({
        signature,
      });
    }
  }, [address, connectWallet, isLoaded, sdk, user]);
  useEffect(() => {
    signAndSend();
  }, [signAndSend]);
  return <ConnectWallet theme="dark" />;
}
