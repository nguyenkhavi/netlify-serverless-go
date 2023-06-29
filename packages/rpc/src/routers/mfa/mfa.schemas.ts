import { z } from 'zod';

export const verifyTOTPSchema = z.object({
  totpCode: z.string(),
});
export type VerifyTOTPInput = z.infer<typeof verifyTOTPSchema>;
