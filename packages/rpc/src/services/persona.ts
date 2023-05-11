import axios from 'axios';
import { verifyInquirySchema } from '../routers/users/user.schemas';

const personaClient = axios.create({
  baseURL: 'https://withpersona.com/api/v1',
  headers: {
    Authorization: `Bearer ${process.env.PERSONA_API_KEY}`,
  },
});
export const verifyInquiryId = (inquiryId: string) => {
  return personaClient
    .get(`inquiries/${inquiryId}`)
    .then((resp) => verifyInquirySchema.parseAsync(resp.data));
};
