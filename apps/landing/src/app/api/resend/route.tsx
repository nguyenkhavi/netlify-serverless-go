//THIRD PARTY MODULES
import { Resend } from 'resend';
//HOOK
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'resend@resend.dev',
      to: 'vu.dinh@sens-vn.com',
      subject: 'Welcome to Resend!',
      html: emailHtml,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

const emailHtml = `
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <style>
      @font-face {
        font-family: 'Archivo';
        font-style: normal;
        font-weight: 400;
        mso-font-alt: 'Verdana';
        src: url(https://fonts.gstatic.com/s/archivo/v18/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxKsv4Rn.woff2)
          format('woff2');
      }
      @font-face {
        font-family: 'Archivo';
        font-style: normal;
        font-weight: 500;
        mso-font-alt: 'Verdana';
        src: url(https://fonts.gstatic.com/s/archivo/v18/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxKsv4Rn.woff2)
          format('woff2');
      }
      @font-face {
        font-family: 'Archivo';
        font-style: normal;
        font-weight: 700;
        mso-font-alt: 'Verdana';
        src: url(https://fonts.gstatic.com/s/archivo/v18/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxKsv4Rn.woff2)
          format('woff2');
      }
      @media (min-width: 1024px) {
        .lg_mt_30px_ {
          margin-top: 30px !important;
        }

        .lg_mt_5px_ {
          margin-top: 5px !important;
        }

        .lg_h_116px_ {
          height: 116px !important;
        }

        .lg_w_99_5px_ {
          width: 99.5px !important;
        }

        .lg_p_4 {
          padding: 1rem !important;
        }

        .lg_px_50px_ {
          padding-left: 50px !important;
          padding-right: 50px !important;
        }

        .lg_px_68px_ {
          padding-left: 68px !important;
          padding-right: 68px !important;
        }

        .lg_py_60px_ {
          padding-top: 60px !important;
          padding-bottom: 60px !important;
        }

        .lg_text_24px_ {
          font-size: 24px !important;
        }

        .lg_leading_36px_ {
          line-height: 36px !important;
        }
      }
      * {
        font-family: 'Archivo', Verdana;
      }
    </style>
  </head>
  <body
    class="lg_px_50px_"
    data-id="__react-email-body"
    style="
      margin-top: 0px;
      margin-bottom: 0px;
      margin-left: auto;
      margin-right: auto;
      max-width: 900px;
      border-radius: 10px;
      background-color: rgb(255, 255, 255);
      padding-top: 2.5rem;
      padding-bottom: 2.5rem;
      padding-left: 1rem;
      padding-right: 1rem;
    ">
    <table
      align="center"
      width="100%"
      class="lg_p_4"
      data-id="__react-email-container"
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        max-width: none;
        width: 100%;
        background-color: rgb(18, 18, 18);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 2rem;
      ">
      <tbody>
        <tr style="width: 100%">
          <td>
            <img
              class="lg_w_99_5px_ lg_h_116px_"
              data-id="react-email-img"
              alt="Fleamint"
              src="http://cdn.mcauto-images-production.sendgrid.net/d51b0cd7e286d65b/e82b91e1-3736-43aa-8aa2-2316453a8d8a/86x100.png"
              width="86"
              height="100"
              style="
                display: block;
                outline: none;
                border: none;
                text-decoration: none;
                margin-left: auto;
                margin-right: auto;
              " />
            <h1
              class="lg_mt_5px_ lg_text_24px_ lg_leading_36px_"
              data-id="react-email-heading"
              style="
                margin-bottom: 0px;
                margin-top: 10px;
                text-align: center;
                font-weight: 700;
                color: rgb(255, 255, 255);
                font-size: 20px;
                line-height: 30px;
              ">
              Successful Purchase🎉 🎉
            </h1>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      align="center"
      width="100%"
      class="lg_px_68px_ lg_py_60px_"
      data-id="__react-email-container"
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="
        max-width: none;
        width: 100%;
        border-color: rgb(185, 186, 189);
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-width: 1px;
        border-style: solid;
        background-color: rgb(246, 247, 247);
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
        color: rgb(10, 10, 14);
      ">
      <tbody>
        <tr style="width: 100%">
          <td>
            <p
              data-id="react-email-text"
              style="
                font-size: 14px;
                line-height: 24px;
                margin: 16px 0;
                margin-top: 0px;
                margin-bottom: 1.5rem;
              ">
              Dear Teddy,
            </p>
            <p
              data-id="react-email-text"
              style="
                font-size: 14px;
                line-height: 24px;
                margin: 16px 0;
                margin-top: 1.5rem;
                margin-bottom: 1.5rem;
              ">
              Congratulations on your recent purchase from our online store! We're excited to let
              you know that your order has been successfully processed and is on its way to you.
            </p>
            <p
              data-id="react-email-text"
              style="
                font-size: 14px;
                line-height: 24px;
                margin: 16px 0;
                margin-top: 0px;
                margin-bottom: 0px;
              ">
              Order Details:
            </p>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td></td>
                  <td data-id="__react-email-column" style="width: 1.5rem">
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 0px;
                        margin-bottom: 0px;
                        display: flex;
                        align-items: center;
                      ">
                      <span
                        style="
                          width: 5px;
                          height: 5px;
                          background-color: #0a0a0e;
                          border-radius: 50%;
                          margin-left: auto;
                          margin-right: auto;
                        "></span>
                    </p>
                  </td>
                  <td data-id="__react-email-column">
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 0px;
                        margin-bottom: 0px;
                      ">
                      Order Number: 321023
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td></td>
                  <td data-id="__react-email-column" style="width: 1.5rem">
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 0px;
                        margin-bottom: 0px;
                        display: flex;
                        align-items: center;
                      ">
                      <span
                        style="
                          width: 5px;
                          height: 5px;
                          background-color: #0a0a0e;
                          border-radius: 50%;
                          margin-left: auto;
                          margin-right: auto;
                        "></span>
                    </p>
                  </td>
                  <td data-id="__react-email-column">
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 0px;
                        margin-bottom: 0px;
                      ">
                      Date of Purchased: 25 May 2023
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td></td>
                  <td data-id="__react-email-column" style="width: 1.5rem">
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 0px;
                        margin-bottom: 0px;
                        display: flex;
                        align-items: center;
                      ">
                      <span
                        style="
                          width: 5px;
                          height: 5px;
                          background-color: #0a0a0e;
                          border-radius: 50%;
                          margin-left: auto;
                          margin-right: auto;
                        "></span>
                    </p>
                  </td>
                  <td data-id="__react-email-column">
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 0px;
                        margin-bottom: 0px;
                      ">
                      No of Items Purchased: 05
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td></td>
                  <td data-id="__react-email-column" style="width: 1.5rem">
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 0px;
                        margin-bottom: 0px;
                        display: flex;
                        align-items: center;
                      ">
                      <span
                        style="
                          width: 5px;
                          height: 5px;
                          background-color: #0a0a0e;
                          border-radius: 50%;
                          margin-left: auto;
                          margin-right: auto;
                        "></span>
                    </p>
                  </td>
                  <td data-id="__react-email-column">
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 0px;
                        margin-bottom: 0px;
                      ">
                      Total Amount: $1200
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              width="100%"
              data-id="react-email-section"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 1.5rem;
                        margin-bottom: 1.5rem;
                      ">
                      If you have any questions or need assistance, our friendly customer support
                      team is ready to help.
                    </p>
                    <p
                      data-id="react-email-text"
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 16px 0;
                        margin-top: 0px;
                        margin-bottom: 0px;
                      ">
                      Best Regards
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <table
      align="center"
      width="100%"
      class="lg_mt_30px_"
      data-id="__react-email-container"
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="max-width: none; width: 100%; color: rgb(10, 10, 14); margin-top: 15px">
      <tbody>
        <tr style="width: 100%">
          <td>
            <p
              data-id="react-email-text"
              style="
                font-size: 18px;
                line-height: 28px;
                margin: 0;
                font-weight: 500;
                text-align: center;
              ">
              Follow Us
            </p>
            <table
              align="center"
              width="100%"
              data-id="__react-email-container"
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="
                max-width: none;
                width: 100%;
                display: flex;
                margin-top: 5px;
                margin-bottom: 5px;
              ">
              <tbody style="margin-left: auto; margin-right: auto">
                <tr style="width: 100%">
                  <td></td>
                  <td
                    data-id="__react-email-column"
                    style="width: 3rem; display: inline-grid; justify-items: center">
                    <a
                      href="https://www.facebook.com/"
                      data-id="react-email-link"
                      target="_blank"
                      style="color: #067df7; text-decoration: none"
                      ><img
                        data-id="react-email-img"
                        alt="Facebook"
                        src="http://cdn.mcauto-images-production.sendgrid.net/d51b0cd7e286d65b/b1918892-2300-4a51-9175-b9c5bfb0f825/80x80.png"
                        width="40"
                        height="40"
                        style="display: block; outline: none; border: none; text-decoration: none"
                    /></a>
                  </td>
                  <td
                    data-id="__react-email-column"
                    style="width: 3rem; display: inline-grid; justify-items: center">
                    <a
                      href="https://www.instagram.com/"
                      data-id="react-email-link"
                      target="_blank"
                      style="color: #067df7; text-decoration: none"
                      ><img
                        data-id="react-email-img"
                        alt="Instagram"
                        src="http://cdn.mcauto-images-production.sendgrid.net/d51b0cd7e286d65b/d86b2102-e29f-428f-a262-4b471cee1894/80x80.png"
                        width="40"
                        height="40"
                        style="display: block; outline: none; border: none; text-decoration: none"
                    /></a>
                  </td>
                  <td
                    data-id="__react-email-column"
                    style="width: 3rem; display: inline-grid; justify-items: center">
                    <a
                      href="https://twitter.com/"
                      data-id="react-email-link"
                      target="_blank"
                      style="color: #067df7; text-decoration: none"
                      ><img
                        data-id="react-email-img"
                        alt="Twitter"
                        src="http://cdn.mcauto-images-production.sendgrid.net/d51b0cd7e286d65b/29fd1f62-f03a-4a58-ad8b-913974f62360/80x80.png"
                        width="40"
                        height="40"
                        style="display: block; outline: none; border: none; text-decoration: none"
                    /></a>
                  </td>
                  <td
                    data-id="__react-email-column"
                    style="width: 3rem; display: inline-grid; justify-items: center">
                    <a
                      href="https://discord.com/"
                      data-id="react-email-link"
                      target="_blank"
                      style="color: #067df7; text-decoration: none"
                      ><img
                        data-id="react-email-img"
                        alt="Discord"
                        src="http://cdn.mcauto-images-production.sendgrid.net/d51b0cd7e286d65b/81c35ed9-cc99-45d4-982e-d085b9b49147/80x80.png"
                        width="40"
                        height="40"
                        style="display: block; outline: none; border: none; text-decoration: none"
                    /></a>
                  </td>
                  <td
                    data-id="__react-email-column"
                    style="width: 3rem; display: inline-grid; justify-items: center">
                    <a
                      href="https://www.github.com/"
                      data-id="react-email-link"
                      target="_blank"
                      style="color: #067df7; text-decoration: none"
                      ><img
                        data-id="react-email-img"
                        alt="Github"
                        src="http://cdn.mcauto-images-production.sendgrid.net/d51b0cd7e286d65b/2965796d-502f-4ea6-8cee-8cfee57fb32c/80x80.png"
                        width="40"
                        height="40"
                        style="display: block; outline: none; border: none; text-decoration: none"
                    /></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              data-id="react-email-text"
              style="
                font-size: 14px;
                line-height: 24px;
                margin: 16px 0;
                margin-top: 5px;
                margin-bottom: 5px;
                color: rgb(49, 49, 48);
                font-weight: 500;
                text-align: center;
              ">
              Copyright © 2023. All Rights Reserved.
            </p>
            <p
              data-id="react-email-text"
              style="
                font-size: 18px;
                line-height: 28px;
                margin: 16px 0;
                margin-top: 5px;
                margin-bottom: 5px;
                font-weight: 500;
                text-align: center;
              ">
              Fleamint
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
