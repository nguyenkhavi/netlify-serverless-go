//THIRD PARTY MODULES
import { z } from 'zod';

const emailAddressSchema = z.object({
  email_address: z.string().email(),
});
export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
export enum EWebhookEventType {
  USER_CREATED = 'user.created',
}

export const unsafeMetadataSchema = z.object({
  dob: z.string().datetime(),
  gender: z.nativeEnum(EGender),
});

export const dataSchema = z
  .object({
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    id: z.string(),
    username: z.string(),
    email_addresses: z.array(emailAddressSchema).min(1),
    unsafe_metadata: unsafeMetadataSchema,
  })
  .transform((data) => ({
    firstName: data.first_name,
    lastName: data.last_name,
    email: `${data.email_addresses[0]?.email_address}`,
    id: data.id,
    dob: data.unsafe_metadata.dob,
    gender: data.unsafe_metadata.gender,
    username: data.username,
  }));

export const userCreatedWebhookSchema = z.object({
  data: dataSchema,
  type: z.nativeEnum(EWebhookEventType),
});
export type UserCreatedWebhookInput = z.infer<typeof userCreatedWebhookSchema>;
