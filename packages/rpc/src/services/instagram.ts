import axios from 'axios';
import * as FormData from 'form-data';
import { exchangeCodeForTokenSchema } from '../routers/users/user.schemas';

const instagramClient = axios.create({
  baseURL: 'https://api.instagram.com',
  headers: {
    Authorization: `Bearer ${process.env.PERSONA_API_KEY}`,
  },
});
const exchangeCodeForAccessToken = async (code: string) => {
  const formData = new FormData();
  formData.append('app_id', process.env.INSTAGRAM_APP_ID || '');
  formData.append('app_secret', process.env.INSTAGRAM_APP_SECRET || '');
  formData.append('redirect_uri', process.env.INSTAGRAM_REDIRECT_URI || '');
  formData.append('code', code);
  formData.append('grant_type', 'authorization_code');
  return instagramClient
    .post('oauth/access_token', formData)
    .then((resp) => exchangeCodeForTokenSchema.parseAsync(resp.data.data));
};

export const queryIGUserNode = async (code: string) => {
  const { instagramUid, accessToken } = await exchangeCodeForAccessToken(code);
  // TODO: maybe used when need more field of user profile
  // const profileResp = await instagramClient.get('me', {
  //   baseURL: 'https://graph.instagram.com/',
  //   params: {
  //     fields: 'id,username',
  //     accessToken,
  //   },
  // });
  return { instagramUid, accessToken };
};
