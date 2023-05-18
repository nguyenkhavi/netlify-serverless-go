'use client';
import React from 'react';
import { InstagramLogin } from '@amraneze/react-instagram-login';
import { api } from '_@landing/utils/api';

function InstagramConnectButton() {
  const { mutateAsync: connectInstagram } =
    api.user.connectInstagram.useMutation();
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
