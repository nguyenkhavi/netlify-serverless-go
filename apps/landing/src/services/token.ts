//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { IToken } from '_@landing/utils/type';
import { dbIndex, dbOS } from '_@landing/utils/constants';

export async function getAllTokenByChain(db: IDBPDatabase, chainId: string): Promise<IToken[]> {
  return db.getAllFromIndex(dbOS.token, dbIndex.tokenChainIndex, chainId);
}

export async function getTokenByAddress(db: IDBPDatabase, address: string): Promise<IToken> {
  return db.getFromIndex(dbOS.token, dbIndex.tokenAddressIndex, address);
}

export async function insertSeedTokenData(db: IDBPDatabase) {
  try {
    db.add(dbOS.token, {
      chain: '11155111',
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      name: 'BUSD',
      symbol: 'BUSD',
      decimal: 18,
      image: 'QmdEpFzLA3hkTk2rTpfyLeQLrH97Sxb2U2LgLMcRYgN2Xh/BUSD.png',
    });
  } catch (e) {
    /// ignore this
  }
}
