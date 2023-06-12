//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { ICollection } from '_@landing/utils/type';
import { dbIndex, dbOS } from '_@landing/utils/constants';

export async function addCollection(db: IDBPDatabase, data: ICollection) {
  try{
    await db.add(dbOS.collection, data);
  }catch(e){
    console.log('ignore duplicate data')
  }
}

export async function getCollectionByContract(db: IDBPDatabase, contract: string) {
  return db.getFromIndex(dbOS.collection, dbIndex.collectionAddressIndex, contract);
}

export async function getAllCollectionByChain(db: IDBPDatabase, chain: string) {
  return db.getAllFromIndex(dbOS.collection, dbIndex.collectionChainIndex, chain);
}

export async function batchAddCollection(db: IDBPDatabase, data: ICollection[]) {
  return db.add(dbOS.collection, data);
}

export async function getAllCollections(db: IDBPDatabase) {
  return db.getAll(dbOS.collection);
}
export async function getCollectionsByOwner(db: IDBPDatabase, owner: string) {
  return db.getAllFromIndex(dbOS.collection, dbIndex.collectionOwnerIndex, owner);
}

export async function getCollectionsByCategory(db: IDBPDatabase, category: string) {
  return db.getAllFromIndex(dbOS.collection, dbIndex.collectionCategoryIndex, category);
}
