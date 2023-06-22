import axios from 'axios';
import { HmacSHA1, enc } from 'crypto-js';

const consumerKey = process.env.TWITTER_CONSUMER_KEY || '';
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET || '';
const twitterApiBaseUrl = 'https://api.twitter.com';

const twitterAxiosInstance = axios.create({
  baseURL: twitterApiBaseUrl,
});

export interface RequestTokenResponse {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed?: string;
}

interface ObtainAccessTokenResponse {
  oauth_token: string;
  oauth_token_secret: string;
  user_id: string;
  screen_name: string;
}

export const requestToken = async () => {
  const oauthSignature = requestTokenSignature({
    method: 'POST',
    apiUrl: `${twitterApiBaseUrl}/oauth/request_token`,
    callbackUrl: '',
  });

  const res = await twitterAxiosInstance.post(
    '/oauth/request_token',
    {},
    {
      headers: {
        Authorization: `OAuth ${oauthSignature}`,
      },
    },
  );

  return parseOAuthData<RequestTokenResponse>(res.data);
};

export const obtainOauthAccessToken = async ({
  oauthToken,
  oauthVerifier,
}: {
  oauthToken: string;
  oauthVerifier: string;
}) => {
  const oauthSignature = accessTokenSignature({
    oauthToken,
    oauthVerifier,
  });

  const res = await twitterAxiosInstance.post(
    'oauth/access_token',
    {},
    {
      headers: {
        Authorization: `OAuth ${oauthSignature}`,
      },
    },
  );
  const responseText = res.data;

  return parseOAuthData<ObtainAccessTokenResponse>(responseText);
};

const parseOAuthData = <TResponse>(responseText: string) =>
  responseText.split('&').reduce((prev, el) => {
    const [key, value] = el.split('=');
    return { ...prev, [key]: value };
  }, {} as TResponse);

const requestTokenSignature = ({
  method,
  apiUrl,
  callbackUrl,
}: {
  method: string;
  apiUrl: string;
  callbackUrl: string;
}) => {
  const params = {
    oauth_consumer_key: consumerKey,
    oauth_version: '1.0',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_callback: callbackUrl,
    oauth_timestamp: (Date.now() / 1000).toFixed(),
    oauth_nonce: Math.random()
      .toString(36)
      .replace(/[^a-z]/, '')
      .substring(2),
  };

  return makeSignature(params, method, apiUrl);
};

const accessTokenSignature = ({
  oauthToken,
  oauthVerifier,
}: {
  oauthToken: string;
  oauthVerifier: string;
}) => {
  const params = {
    oauth_consumer_key: consumerKey,
    oauth_version: '1.0',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_token: oauthToken,
    oauth_verifier: oauthVerifier,
    oauth_timestamp: (Date.now() / 1000).toFixed(),
    oauth_nonce: Math.random()
      .toString(36)
      .replace(/[^a-z]/, '')
      .substr(2),
  };

  return makeSignature(params, 'POST', `${twitterApiBaseUrl}/oauth/access_token`);
};

const makeSignature = (params: any, method: string, apiUrl: string) => {
  const paramsBaseString = Object.keys(params)
    .sort()
    .reduce((prev: string, el: any) => {
      return (prev += `&${el}=${params[el]}`);
    }, '')
    .substring(1);

  const signatureBaseString = `${method.toUpperCase()}&${encodeURIComponent(
    apiUrl,
  )}&${encodeURIComponent(paramsBaseString)}`;

  const signingKey = `${encodeURIComponent(consumerSecret)}&`;

  const oauth_signature = enc.Base64.stringify(HmacSHA1(signatureBaseString, signingKey));

  const paramsWithSignature = {
    ...params,
    oauth_signature: encodeURIComponent(oauth_signature),
  };

  return Object.keys(paramsWithSignature)
    .sort()
    .reduce((prev: string, el: any) => {
      return (prev += `,${el}="${paramsWithSignature[el]}"`);
    }, '')
    .substring(1);
};
