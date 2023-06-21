import { ipSchema } from '_@rpc/config/schemas';
import { customAlphabet } from 'nanoid';
export const generateSignedMessage = (uid: string) => {
  return `Connect wallet to user #${uid}`;
};

function isIP(value: string) {
  return ipSchema.safeParse(value).success;
}

export function getClientIpFromXForwardedFor(value: string) {
  if (!value) return undefined;
  return value
    .split(',')
    .map((e) => {
      const ip = e.trim();

      if (ip.includes(':')) {
        const splitted = ip.split(':');

        if (splitted.length === 2) {
          return splitted[0];
        }
      }
      return ip;
    })
    .find((ipLike) => isIP(ipLike));
}

export const getQuery = (reqUrl: string) => {
  const url = new URL(reqUrl);
  const query = new URLSearchParams(url.search);
  return query;
};

const NANOID_DEFAULT_SIZE = 12;
const CUSTOM_ALPHABET_NANOID = '0123456789abcdefghijklmnopqrstuvwxyz';

export const generateNanoid = (size?: number) =>
  customAlphabet(CUSTOM_ALPHABET_NANOID, NANOID_DEFAULT_SIZE)(size);
