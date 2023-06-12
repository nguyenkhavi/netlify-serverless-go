//THIRD PARTY MODULES
import { Magic } from '@magic-sdk/admin';
const validate = async (didToken: string | undefined) => {
  try {
    if (!didToken) return false;
    const magicServer = new Magic(process.env.MAGIC_LINK_SECRET_KEY);
    await magicServer.utils.parseAuthorizationHeader(didToken);
    return true;
  } catch (error: any) {
    console.log('Error validating token: ', error);
    return false;
  }
};

export default validate;
