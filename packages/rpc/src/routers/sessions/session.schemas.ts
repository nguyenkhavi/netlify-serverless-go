import { z } from 'zod';

export const revokeTokenSchema = z.object({
  sessionId: z.number(),
});
export type RevokeTokenInput = z.infer<typeof revokeTokenSchema>;
