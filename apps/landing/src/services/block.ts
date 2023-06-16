//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { dbIndex, dbOS } from '_@landing/utils/constants';
import { ILastBlock, ListenerService } from '_@landing/utils/type';

type BlockType = {
  chain: string;
  id: string;
  lastBlock: number;
  service: number;
};

export async function getLastBlock(db: IDBPDatabase, chain: string, service: ListenerService) {
  return db
    .getFromIndex(dbOS.lastBlock, dbIndex.lastBlockIdIndex, service + '_' + chain)
    .then((data: BlockType) => Number(data.lastBlock))
    .catch(() => NaN);
}

export async function updateLastBlock(
  db: IDBPDatabase,
  service: ListenerService,
  lastBlock: number,
  chain: string,
) {
  const data: ILastBlock = {
    service,
    lastBlock,
    chain,
    ///id : service_chain for get index
    id: service + '_' + chain,
  };
  return db.put(dbOS.lastBlock, data);
}
