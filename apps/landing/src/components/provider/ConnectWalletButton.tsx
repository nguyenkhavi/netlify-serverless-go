'use client';

//THIRD PARTY MODULES
import { nextApi } from '_@landing/utils/api';
import { useCallback, useEffect } from 'react';
import useAuthStore from '_@landing/stores/auth/useAuthStore';
import { ConnectWallet, useAddress, useSDK } from '@thirdweb-dev/react';
//CONFIG
import { generateSignedMessage } from '_@rpc/config/utils';
export function ConnectWalletButton() {
  const sdk = useSDK();
  const { user } = useAuthStore();

  const address = useAddress();
  const { mutate: connectWallet } = nextApi.userConnectInstagram.useMutation({});

  const signAndSend = useCallback(async () => {
    if (sdk && address && user?.profile.userId) {
      const signature = await sdk.wallet.sign(generateSignedMessage(user.profile.userId));
      connectWallet({
        code: signature,
      });
    }
  }, [address, connectWallet, sdk, user]);
  useEffect(() => {
    signAndSend();
  }, [signAndSend]);
  return <ConnectWallet theme="dark" />;
}
