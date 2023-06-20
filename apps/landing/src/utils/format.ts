export const formatAddress = (value: string) => {
  return value.length > 10
    ? value.substring(0, 6) + '....' + value.substring(value.length - 4)
    : value;
};

export const formatTokenId = (value: string) => {
  return value.length > 14 ? value.substring(0, 14) + '..' : value;
};

export const formatFullName = (firstName: string, lastName: string): string => {
  return [firstName, lastName].join(' ').trim();
};
