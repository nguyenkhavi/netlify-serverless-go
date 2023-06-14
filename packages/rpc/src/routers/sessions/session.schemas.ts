import { ZPhoneSchema } from '_@rpc/config/schemas';
import { Gender } from '_@rpc/drizzle/enum';
import { z } from 'zod';

export const revokeTokenSchema = z.object({
  sessionId: z.number(),
});
export type RevokeTokenInput = z.infer<typeof revokeTokenSchema>;

export const signupSchema = z.object({
  lastName: z.string().max(255),
  firstName: z.string().max(255),
  username: z.string().max(255),
  email: z.string().email(),
  phone: ZPhoneSchema,
  dob: z.string().datetime(),
  gender: z.nativeEnum(Gender),
});
export type SignUpInput = z.infer<typeof signupSchema>;

export const postSignupSchema = z.object({
  requestId: z.number(),
  didToken: z.string(),
});
export type PostSignUpInput = z.infer<typeof postSignupSchema>;

export const validateLoginSchema = z.object({
  phone: ZPhoneSchema,
});
export type ValidateLoginInput = z.infer<typeof validateLoginSchema>;
