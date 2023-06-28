export default async function waitfor(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
