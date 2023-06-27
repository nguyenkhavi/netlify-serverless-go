import { MailDataRequired } from '@sendgrid/mail';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

export const DEFAULT_MAIL_SENDER = 'dung.bui@sens-vn.com';

const IDMap = {
  SENDGRID_PURCHASE_SUCCESS_TEMPLATE_ID: process.env.SENDGRID_PURCHASE_SUCCESS_TEMPLATE_ID,
  SENDGRID_SALE_SUCCESS_TEMPLATE_ID: process.env.SENDGRID_SALE_SUCCESS_TEMPLATE_ID,
} as const;

type BaseMail<T, D> = MailDataRequired & {
  templateId: T;
  dynamicTemplateData: D;
};

type EmailPurchaseSuccessData = {
  name: string;
  orderNumber: string;
  dateOfPurchase: string;
  numberOfItems: number;
  totalAmount: number;
};

type EmailSaleSuccessData = {
  name: string;
  orderNumber: string;
  dateOfSale: string;
  numberOfUnits: number;
  totalAmount: number;
};

export type Mail =
  | BaseMail<'SENDGRID_PURCHASE_SUCCESS_TEMPLATE_ID', EmailPurchaseSuccessData>
  | BaseMail<'SENDGRID_SALE_SUCCESS_TEMPLATE_ID', EmailSaleSuccessData>;

export const sendMail = async (mail: Mail) => {
  try {
    sgMail.send({
      ...mail,
      templateId: IDMap[mail.templateId] as string,
    });
  } catch (e) {
    console.log(e);
  }
};
