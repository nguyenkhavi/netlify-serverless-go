import * as crypto from 'crypto';

const ENC = process.env.TOTP_ENCRYPTION_KEY as string;
const ALGO = process.env.TOTP_ENCRYPTION_ALGO as string;

export const encrypt = (plainText: string) => {
  const iv = crypto.randomBytes(16).toString('hex').slice(0, 16);
  const cipher = crypto.createCipheriv(ALGO, ENC, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return `${iv}:${encrypted}`;
};

export const decrypt = (cipherText: string) => {
  const [iv, cipher] = cipherText.split(':');
  const decipher = crypto.createDecipheriv(ALGO, ENC, iv);
  const decrypted = decipher.update(cipher, 'base64', 'utf8');
  return decrypted + decipher.final('utf8');
};
