//THIRD PARTY MODULES
import { Token } from '_@landing/utils/type';
import { Tokens } from '_@landing/utils/constants';

export async function getAllTokenByChain(chainId: string): Promise<Token[]> {
  return Object.values(Tokens).filter((token) => token.chainId == chainId);
}

export async function getTokenByAddress(address: string): Promise<Token | undefined> {
  return Object.values(Tokens).find((token) => token.address == address);
}

export async function getAllToken(): Promise<Token[]> {
  return Object.values(Tokens);
}

export async function getPaymentTokensByChain(chainId: string): Promise<Token[]> {
  return Object.values(Tokens).filter((token) => token.chainId == chainId && token.isPaymentToken);
}
