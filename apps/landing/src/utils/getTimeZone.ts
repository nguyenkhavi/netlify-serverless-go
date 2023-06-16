const getTimeZone = () => {
  return new Date().getTimezoneOffset() / 60;
};

export default getTimeZone;
