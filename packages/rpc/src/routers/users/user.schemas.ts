import { SuggestionType } from '_@rpc/drizzle/enum';
import { z } from 'zod';

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
    user_id: z.number(),
  })
  .transform((data) => ({
    accessToken: data.access_token,
    instagramUid: `${data.user_id}`,
  }));

export type TExchangeCodeForToken = z.infer<typeof exchangeCodeForTokenSchema>;

export const connectIGSchema = z.object({
  code: z.string(),
});

export const userByWalletSchema = z.object({
  wallet: z.string(),
});
export type TUserByWallet = z.infer<typeof userByWalletSchema>;

export const userWallets = z.object({
  wallets: z.array(z.string()),
});
export type TUserWallets = z.infer<typeof userWallets>;

export type TConnectIG = z.infer<typeof connectIGSchema>;

export const setKYCSchema = z.object({
  inquiryId: z.string(),
});

export type TSetKYC = z.infer<typeof setKYCSchema>;

export const userIdSchema = z.object({
  userId: z.string(),
});

export type UserId = z.infer<typeof userIdSchema>;

export const createShippingAddressSchema = z.object({
  country: z.string(),
  state: z.string(),
  street: z.string(),
  secondStreet: z.string(),
  apartmentNumber: z.string(),
  postalCode: z.string(),
  contactNumber: z.string(),
  dialCode: z.string(),
  additionalInformation: z.string().optional(),
  isDefault: z.boolean(),
});

export type CreateShippingAddress = z.infer<typeof createShippingAddressSchema>;

export const updateShippingAddressSchema = z.object({
  id: z.number(),
  country: z.string(),
  state: z.string(),
  street: z.string(),
  secondStreet: z.string(),
  apartmentNumber: z.string(),
  postCode: z.string(),
  contactNumber: z.string(),
  dialCode: z.string(),
  additionalInformation: z.string().optional(),
  isDefault: z.boolean(),
});

export type UpdateShippingAddress = z.infer<typeof updateShippingAddressSchema>;

export const userDeleteShippingAddressSchema = z.object({
  id: z.number(),
});

export type UserGetShippingAddressById = z.infer<typeof userDeleteShippingAddressSchema>;

export const updateUserInformationSchema = z.object({
  coverUrl: z.string().optional(),
  avatarUrl: z.string().optional(),
  aboutMe: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateUserInformation = z.infer<typeof updateUserInformationSchema>;

export const createSuggestionSchema = z.object({
  type: z.nativeEnum(SuggestionType),
  detail: z.string().nonempty(),
});

export type CreateSuggestionInput = z.infer<typeof createSuggestionSchema>;

export const getPublicProfileSchema = z.object({
  userId: z.string(),
});

export type GetPublicProfileInput = z.infer<typeof getPublicProfileSchema>;
