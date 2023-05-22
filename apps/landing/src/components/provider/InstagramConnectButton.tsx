'use client';
//THIRD PARTY MODULES
import React from 'react';
import { api } from '_@landing/utils/api';
// @ts-ignore
import { InstagramLogin } from '@amraneze/react-instagram-login';

function InstagramConnectButton() {
  const { mutateAsync: connectInstagram } = api.user.connectInstagram.useMutation();
  const _handleSuccess = (code: string) => {
    connectInstagram({
      code,
    });
  };

  return (
    <InstagramLogin
      clientId={process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}
      buttonText="Connect"
      onSuccess={_handleSuccess}
    />
  );
}

export default InstagramConnectButton;
