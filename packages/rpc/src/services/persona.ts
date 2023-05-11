import api from 'api';
const personaSDK = api('@personaidentities/v2023-01-05#17kgj53elcjlwfsp');
personaSDK.auth(`Bearer test ${process.env.PERSONA_API_KEY}`);

export const verifyInquiryId = (inquiryId: string) => {
  return (
    personaSDK
      .apiv1inquiriesinquiryId({
        inquiryid: inquiryId,
        'persona-version': '2023-01-05',
      })
      //TODO: Check the response later
      .then(() => true)
      .catch(() => false)
  );
};

export default personaSDK;
