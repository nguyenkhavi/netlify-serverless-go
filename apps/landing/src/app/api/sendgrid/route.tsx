//THIRD PARTY MODULES
import sendgrid from '@sendgrid/mail';
//HOOK
import { NextResponse } from 'next/server';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function GET() {
  try {
    const data = await sendgrid.send({
      from: 'fleamint@sens-vn.com',
      to: 'vu.dinh@sens-vn.com',
      templateId: process.env.SENDGRID_PURCHASE_SUCCESS_TEMPLATE_ID as string,
      dynamicTemplateData: {
        logoText: 'Successful Purchase🎉 🎉',
        name: 'Teddy',
        congratulations:
          "Congratulations on your recent purchase from our online store! We're excited to let you know that your order has been successfully processed and is on its way to you.",
        detailsText: 'Order',
        orderNumber: '321023',
        dateText: 'Date of Purchase',
        date: '25 May 2023',
        noText: 'No of Items Purchased',
        no: '05',
        total: '1200',
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}
