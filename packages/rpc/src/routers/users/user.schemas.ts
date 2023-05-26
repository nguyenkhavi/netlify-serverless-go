import z from 'zod';
import { EActivityAction } from '@prisma/client';
import { ZPassword, ZPhoneSchema } from '_@rpc/config/schemas';

export const verifyInquirySchema = z
  .object({
    data: z.object({
      attributes: z.object({
        'completed-at': z.string().datetime(),
        'name-first': z.string().nullable(),
        'name-last': z.string().nullable(),
        birthdate: z.string().nullable(),
        'address-street-1': z.string().nullable(),
        'address-street-2': z.string().nullable(),
        'address-city': z.string().nullable(),
        'address-postal-code': z.string().nullable(),
        'identification-number': z.string().nullable(),
        'phone-number': z.string().nullable(),
      }),
    }),
  })
  .transform((data) => {
    const attributes = data.data.attributes;
    return {
      completedAt: new Date(attributes['completed-at']),
      firstName: attributes['name-first'],
      lastName: attributes['name-last'],
      birthDate: attributes['birthdate'],
      addressStreet1: attributes['address-street-1'],
      addressStreet2: attributes['address-street-2'],
      addressCity: attributes['address-city'],
      addressPostalCode: attributes['address-postal-code'],
      identificationNumber: attributes['identification-number'],
      phoneNumber: attributes['phone-number'],
    };
  });

export type TVerifyInquiryRes = z.infer<typeof verifyInquirySchema>;

export const exchangeCodeForTokenSchema = z
  .object({
    access_token: z.string(),
    user_id: z.string(),
  })
  .transform((data) => ({
    accessToken: data.access_token,
    instagramUid: data.user_id,
  }));

export type TExchangeCodeForToken = z.infer<typeof exchangeCodeForTokenSchema>;

export const connectIGSchema = z.object({
  code: z.string(),
});

export type TConnectIG = z.infer<typeof connectIGSchema>;

export const setKYCSchema = z.object({
  inquiryId: z.string(),
});

export type TSetKYC = z.infer<typeof setKYCSchema>;

export const connectWalletSchema = z.object({
  signature: z.string(),
});

export type TConnectWallet = z.infer<typeof connectWalletSchema>;

export const createUserActivitySchema = z.object({
  location: z.string().nullable(),
  action: z.nativeEnum(EActivityAction),
});

export type TCreateUserActivity = z.infer<typeof createUserActivitySchema>;
export const userIdSchema = z.object({
  userId: z.string(),
});

export type UserId = z.infer<typeof userIdSchema>;

export const closeSessionSchema = z.object({
  socketId: z.string(),
  sessionId: z.string(),
});

export type CloseSession = z.infer<typeof closeSessionSchema>;

export const closeAllSessionSchema = z.object({
  userId: z.string(),
  currentSessionId: z.string(),
});

export type CloseAllSession = z.infer<typeof closeAllSessionSchema>;

export const logoutSchema = z.object({
  userId: z.string(),
  currentSessionId: z.string(),
  socketId: z.string(),
});

export type Logout = z.infer<typeof logoutSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  phone: ZPhoneSchema,
  dob: z.string().datetime(),
  newPassword: ZPassword,
});

export type TForgotPassword = z.infer<typeof forgotPasswordSchema>;

export const verifyForgotPasswordTokenSchema = z.object({
  token: z.string(),
});

export type TVerifyForgotPasswordToken = z.infer<typeof verifyForgotPasswordTokenSchema>;
