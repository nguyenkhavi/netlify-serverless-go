import { ipSchema } from '_@rpc/config/schemas';

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
