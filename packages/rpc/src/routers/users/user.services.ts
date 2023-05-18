import { TConnectIG, TSetKYC } from './user.schemas';
import { queryIGUserNode } from '../../services/instagram';
import { verifyInquiryId } from '../../services/persona';
export const connectInstagram = async (input: TConnectIG) => {
  const instagramUser = await queryIGUserNode(input.code);
};

export const setKYCInfo = async (input: TSetKYC) => {
  const inquiry = await verifyInquiryId(input.inquiryId);
  // TODO: update user info
};
