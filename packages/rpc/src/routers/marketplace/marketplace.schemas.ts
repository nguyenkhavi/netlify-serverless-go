import { z } from 'zod';

export const purchaseSuccessSchema = z.object({
  name: z.string(),
  orderNumber: z.string(),
  numberOfUnits: z.number().int(),
  totalAmount: z.number().int(),
  fromUserAddress: z.string(),
});
export type PurchaseSuccessInput = z.infer<typeof purchaseSuccessSchema>;
