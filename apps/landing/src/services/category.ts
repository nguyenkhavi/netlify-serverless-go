//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { ICategory } from '_@landing/utils/type';
import { P } from 'drizzle-orm/select.types.d-e43b2599';
import { dbIndex, dbOS } from '_@landing/utils/constants';

export async function getAllCategories(db: IDBPDatabase): Promise<ICategory[]> {
  return db.getAll(dbOS.category);
}

export async function getCategoryById(db: IDBPDatabase, id: number): Promise<ICategory> {
  return db.getFromIndex(dbOS.category, dbIndex.categoryIdIndex, id);
}

export async function insertSeedCategoryData(db: IDBPDatabase) {
  /// seed data
  try {
    db.add(dbOS.category, {
      id: 1,
      name: 'Property',
      description: 'Property',
      image: 'QmQVjK8e7aio1kRoNnATA9PgYttqdykjcH4mpwSfXMNtWx/d21bfeb27456e2632fb4382a627f0823.jpeg',
    });
    db.add(dbOS.category, {
      id: 2,
      name: 'Wine + Spirits',
      description: 'Wine + Spirits',
      image: 'QmQVjK8e7aio1kRoNnATA9PgYttqdykjcH4mpwSfXMNtWx/9a905df0f1f344def04aaf2938e2b70b.jpeg',
    });
    db.add(dbOS.category, {
      id: 3,
      name: 'Arts',
      description: 'Arts',
      image: 'QmQVjK8e7aio1kRoNnATA9PgYttqdykjcH4mpwSfXMNtWx/9bacb167275953e675313e5f1690ed1c.jpeg',
    });
    db.add(dbOS.category, {
      id: 4,
      name: 'Music',
      description: 'Music',
      image: 'QmQVjK8e7aio1kRoNnATA9PgYttqdykjcH4mpwSfXMNtWx/6f0bfd671516dbae38edbfeb639797c1.jpeg',
    });
  } catch (e) {
    //ignore this
  }
}
