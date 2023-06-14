//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { IActivity } from '_@landing/utils/type';
import { dbIndex, dbOS } from '_@landing/utils/constants';

export async function addActivity(db: IDBPDatabase, data: IActivity) {
  try {
    await db.add(dbOS.activity, data);
  } catch (e) {
    console.log('ignore duplicate data');
  }
}
export async function getAllActivities(db: IDBPDatabase) {
  return db.getAll(dbOS.activity);
}

export async function getAllActivitiesByFromAddress(
  db: IDBPDatabase,
  address: string,
): Promise<IActivity[]> {
  return db.getAllFromIndex(dbOS.activity, dbIndex.activityFromAddressIndex, address);
}

export async function getAllActivitiesByCollectionAddress(
  db: IDBPDatabase,
  address: string,
): Promise<IActivity[]> {
  return db.getAllFromIndex(dbOS.activity, dbIndex.activityAssetContractIndex, address);
}

export async function getAllActivitiesByToAddress(
  db: IDBPDatabase,
  address: string,
): Promise<IActivity[]> {
  return db.getAllFromIndex(dbOS.activity, dbIndex.activityToAddressIndex, address);
}

export async function getAllActivitiesByItem(
  db: IDBPDatabase,
  itemId: string,
): Promise<IActivity[]> {
  return db.getAllFromIndex(dbOS.activity, dbIndex.activityItemIdIndex, itemId);
}
