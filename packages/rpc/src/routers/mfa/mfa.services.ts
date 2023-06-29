import { TRPCError } from '@trpc/server';
import { VerifyTOTPInput } from '_@rpc/routers/mfa/mfa.schemas';
import { setTOTPSecret } from '_@rpc/routers/users';
import { decrypt, encrypt } from '_@rpc/services/otp/aes-256';
import * as speakeasy from 'speakeasy';
import { getCacheTOTPSecret, setCacheTOTPSecret } from '_@rpc/services/otp/key-value-store';

const appName = process.env.APP_NAME as string;

const totpCodeValid = (code: string, encryptedMfaSecret: string) => {
  const decryptedMfaSecret = decrypt(encryptedMfaSecret);

  return speakeasy.totp.verify({
    secret: decryptedMfaSecret,
    encoding: 'base32',
    token: code,
    window: 2, // ? totp code is valid for 2 * 30 seconds
  });
};

export const registerTOTP = async (uid: string) => {
  const secret = speakeasy.generateSecret({
    name: appName,
    length: 10, // ? Secret key length equal to 10, make the base 32 format of it have 16 chars
    issuer: appName,
  });
  const encryptedMfaSecret = encrypt(secret.base32);
  await setCacheTOTPSecret(uid, encryptedMfaSecret);

  return {
    secretBase32: secret.base32,
    otpauthUrl: secret.otpauth_url,
  };
};

export const verifyTOTP = async (uid: string, input: VerifyTOTPInput) => {
  const { totpCode } = input;

  const totpPending = await getCacheTOTPSecret(uid);
  const currentSecret = totpPending.value;

  const mfaCodeMatching = totpCodeValid(totpCode, currentSecret);

  if (!mfaCodeMatching) {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'OTP Code is invalid' });
  }
  const backUpKey = decrypt(currentSecret);
  await setTOTPSecret(uid, currentSecret);
  return {
    backUpKey,
    uid,
  };
};

export const turnOffTOTP = (uid: string) => {
  return setTOTPSecret(uid, null);
};
