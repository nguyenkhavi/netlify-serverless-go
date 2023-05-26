'use client';

//THIRD PARTY MODULES
import TwitterLogin from 'react-twitter-auth';
import React, { useLayoutEffect } from 'react';

const ConnectTwitterBtn = () => {
  useLayoutEffect(() => {
    const origFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await origFetch(...args);

      const data = await response.clone().json();

      return {
        ok: true,
        status: 200,
        json: async () => data.result.data.json,
      };
    };
    return () => {
      window.fetch = origFetch;
    };
  }, []);

  return (
    <div>
      <TwitterLogin
        loginUrl={process.env.NEXT_PUBLIC_TWITTER_LOGIN_URL as string}
        onFailure={() => {
          console.log('handle connect fail');
        }}
        onSuccess={(data) => {
          console.log('handle connect success', data);
        }}
        requestTokenUrl={process.env.NEXT_PUBLIC_TWITTER_REQUEST_TOKEN_URL as string}
      />
    </div>
  );
};

export default ConnectTwitterBtn;
