import { z } from 'zod';

export const purchaseSuccessSchema = z.object({
  orderNumber: z.string(),
  numberOfUnits: z.number().int(),
  totalAmount: z.number(),
  fromUserAddress: z.string(),
});
export type PurchaseSuccessInput = z.infer<typeof purchaseSuccessSchema>;
