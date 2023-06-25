export default function urlWithIpfs(url?: string | null) {
  if (!url) return '';
  if (url.startsWith('ipfs://'))
    return process.env.NEXT_PUBLIC_IPFS_GATE_WAY + url.replace('ipfs://', '');
  return url;
}
