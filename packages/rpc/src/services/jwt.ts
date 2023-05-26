import jwt from 'jsonwebtoken';
type TResetPasswordPayload = {
  userId: string;
};

export const generateResetPasswordToken = (payload: TResetPasswordPayload) => {
  const secret = process.env.JWT_CONFIRM_SECRET || '';
  const token = jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_CONFIRM_EXPIRES || '',
  });
  return token;
};

export const verifyResetPasswordToken = (token: string) => {
  const secret = process.env.JWT_CONFIRM_SECRET || '';
  try {
    const payload = jwt.verify(token, secret) as TResetPasswordPayload;
    return { payload, valid: true };
  } catch (e) {
    return { payload: null, valid: false };
  }
};
