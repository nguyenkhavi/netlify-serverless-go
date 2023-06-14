import * as ip2location from 'ip-to-location';

export const getLocationDetail = async (ip: string) => {
  try {
    const data = await ip2location.fetch(ip);
    if ('status' in data) {
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
};
