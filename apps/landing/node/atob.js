export default function atob() {
  if (typeof window !== 'undefined') {
    return window.atob;
  }
  return function atob(str) {
    return Buffer.from(str, 'base64').toString('binary');
  };
}
