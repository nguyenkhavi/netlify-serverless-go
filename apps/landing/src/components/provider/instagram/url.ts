export function getQueryVariable(location: Location, variable: string): string | null {
  const query = location.search.substring(1);
  const queryParams = query.split('&');
  const [code] = queryParams
    .map((queryParam) => {
      const params = queryParam.split('=');
      return params[0] === variable ? params[1] : null;
    })
    .filter((isCodeAvailable) => isCodeAvailable);

  return code;
}
