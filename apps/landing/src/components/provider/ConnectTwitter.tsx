'use client';

//THIRD PARTY MODULES
import TwitterLogin from 'react-twitter-auth';
import React, { useLayoutEffect } from 'react';
import cookieHandler from '_@landing/utils/cookieHandler';

type Props = {
  onSuccess?: (data: string) => void;
  onFailure?: (e: string) => void;
};

const ConnectTwitterBtn = ({ onSuccess = () => {}, onFailure = () => {} }: Props) => {
  useLayoutEffect(() => {
    const origFetch = window.fetch;
    (window as any).fetch = async (...args: any) => {
      // attach bearer token to request
      const [url, options] = args;
      const session = cookieHandler.get('session');
      options.headers = {
        ...options.headers,
        authorization: `Bearer ${session}`,
      };

      const response = await origFetch.apply(window, [url, options]);

      const data = await response.clone().json();
      console.log({
        data,
      });
      return {
        ok: true,
        status: 200,
        json: async () => data.result.data,
      };
    };
    return () => {
      window.fetch = origFetch;
    };
  }, []);

  return (
    <TwitterLogin
      loginUrl={process.env.NEXT_PUBLIC_TWITTER_LOGIN_URL as string}
      onFailure={onFailure}
      onSuccess={onSuccess}
      requestTokenUrl={process.env.NEXT_PUBLIC_TWITTER_REQUEST_TOKEN_URL as string}
    />
  );
};

export default ConnectTwitterBtn;
