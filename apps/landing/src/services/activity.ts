//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { ActivityAction } from '_@rpc/drizzle/enum';
import { dbIndex, dbOS } from '_@landing/utils/constants';
import { ActivityType, IActivity } from '_@landing/utils/type';

export async function addActivity(db: IDBPDatabase, data: IActivity) {
  try {
    await db.add(dbOS.activity, data);
  } catch (e) {
    //
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

export async function getAllBuyActivities(db: IDBPDatabase): Promise<IActivity[]> {
  return db.getAllFromIndex(dbOS.activity, dbIndex.activityTypeIndex, ActivityType.BUY);
}
