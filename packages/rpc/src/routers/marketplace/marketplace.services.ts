import { TRPCError } from '@trpc/server';
import { TProfile, userProfileTable } from '_@rpc/drizzle/userProfile';
import { PurchaseSuccessInput } from '_@rpc/routers/marketplace/marketplace.schemas';
import { db } from '_@rpc/services/drizzle';
import { DEFAULT_MAIL_SENDER, sendMail } from '_@rpc/services/mail';
import { eq } from 'drizzle-orm';
import * as dayjs from 'dayjs';

export const purchaseSuccess = async (input: PurchaseSuccessInput, profile: TProfile) => {
  const profiles = await db
    .select()
    .from(userProfileTable)
    .where(eq(userProfileTable.wallet, input.fromUserAddress))
    .limit(1)
    .execute();
  if (!profiles.length) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'fromUserAddress not found!' });
  }
  const saleProfile = profiles[0];
  const { orderNumber, numberOfUnits, totalAmount } = input;
  const dateOfPurchase = dayjs().format('DD MMM YYYY');
  return Promise.all([
    sendMail({
      from: DEFAULT_MAIL_SENDER,
      templateId: 'SENDGRID_PURCHASE_SUCCESS_TEMPLATE_ID',
      dynamicTemplateData: {
        name: profile.username,
        orderNumber,
        dateOfPurchase: dateOfPurchase,
        numberOfItems: numberOfUnits,
        totalAmount,
      },
    }),
    sendMail({
      from: DEFAULT_MAIL_SENDER,
      templateId: 'SENDGRID_SALE_SUCCESS_TEMPLATE_ID',
      dynamicTemplateData: {
        name: saleProfile.username,
        orderNumber,
        dateOfSale: dateOfPurchase,
        numberOfUnits: numberOfUnits,
        totalAmount,
      },
    }),
  ]);
};
