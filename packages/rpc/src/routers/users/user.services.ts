import { TConnectIG, TSetKYC } from './user.schemas';
import { queryIGUserNode } from '../../services/instagram';
import { verifyInquiryId } from '../../services/persona';
export const connectInstagram = async (input: TConnectIG) => {
  const igUser = await queryIGUserNode(input.code);
  // TODO: update user info
};

export const setKYCInfo = async (input: TSetKYC) => {
  const inquiry = await verifyInquiryId(input.inquiryId);
  // TODO: update user info
};
