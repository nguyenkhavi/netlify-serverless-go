import axios from 'axios';

const reCapchaClient = axios.create({
  baseURL: 'https://www.google.com/recaptcha/api',
});

export const verifyReCapchaToken = (token: string) => {
  return reCapchaClient
    .post('siteverify', undefined, {
      params: {
        secret: process.env.GOOGLE_RECAPTCHA_SECRET,
        response: token,
      },
    })
    .then((resp) => !!resp.data?.success)
    .catch(() => false);
};
