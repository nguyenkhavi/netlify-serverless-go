//THIRD PARTY MODULES
import Decimal from 'decimal.js';
import { IDBPDatabase } from 'idb';
import { queryItemFactory } from '_@landing/utils/queryFactory';
import { Chains, dbIndex, dbOS } from '_@landing/utils/constants';
import {
  ActivityType,
  IAttribute,
  IFilter,
  IItem,
  IMarketData,
  IMarketStatusData,
  IPaging,
  ISorting,
  IToken,
} from '_@landing/utils/type';
//RELATIVE MODULES
import { getCategoryById } from './category';
import { getAllToken, getTokenByAddress } from './token';
import { getAllRawItemByCollection, getItemById } from './item';
import { getAllActivitiesByItem, getAllBuyActivities } from './activity';
import { getAllRawCollectionByOwner, getCollectionByContract } from './collection';
export async function addMarket(db: IDBPDatabase, data: IMarketData) {
  try {
    await db.add(dbOS.market, data);
  } catch (e) {
    console.log('ignore duplicate data');
  }
}

export async function generateStandardMarketAvailable(db: IDBPDatabase, dataMarket: IMarketData[]) {
  const tokenHashMap: Map<string, IToken> = new Map();
  const token = await getAllToken(db);
  token.map((tokenItem) => tokenHashMap.set(tokenItem.address, tokenItem));

  const marketStatus = Promise.all(
    dataMarket.map(async (mk) => {
      const status = await getMarketStatusByListingId(db, mk.listingId);
      return {
        ...mk,
        status,
      };
    }),
  );
  const availableMarket = (await marketStatus).filter((mk) => mk.status?.isAvailable === 1);

  return Promise.all(
    availableMarket.map(async (item) => {
      const activities = (await getAllActivitiesByItem(db, item.itemId)).filter(
        (activity) => activity.type == ActivityType.BUY,
      );
      const itemDetail = await getItemById(db, item.itemId);

      return {
        ...item,
        token: tokenHashMap.get(item.currency),
        item: itemDetail,
        activities,
        totalSale: activities.length,
      };
    }),
  );
}

export async function getTrendingMarketByCategory(
  db: IDBPDatabase,
  category: number,
  query: IPaging & ISorting & IFilter,
) {
  const availableMarket = await getAllAvailableMarketByCategory(db, category);
  const markets = await generateStandardMarketAvailable(db, availableMarket);

  const { data, total } = queryItemFactory(markets, query);
  return { data, total };
}

export async function updateMarket(db: IDBPDatabase, data: IMarketStatusData) {
  await db.put(dbOS.marketStatus, data);
}

export async function getMarketByListingId(
  db: IDBPDatabase,
  listingId: number,
): Promise<IMarketData> {
  return db.getFromIndex(dbOS.market, dbIndex.marketListingIdIndex, listingId);
}

export async function getMarketsByCategory(db: IDBPDatabase, category: number) {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketCategoryIndex, category);
}

export async function getAllAvailableMarketByCategory(
  db: IDBPDatabase,
  category: number,
): Promise<IMarketData[]> {
  const available: IMarketStatusData[] = await getAllAvailableMarket(db);
  const market = await Promise.all(
    available.map(async (mk) => {
      return getMarketByListingId(db, mk.listingId);
    }),
  );
  return market.filter(async (mk) => {
    const collection = await getCollectionByContract(db, mk.assetContract);
    return collection?.category == category;
  });
}

export async function getSearchMarket(db: IDBPDatabase, search: string): Promise<IMarketData[]> {
  const available: IMarketStatusData[] = await getAllAvailableMarket(db);
  const market = await Promise.all(
    available.map(async (mk) => {
      const market = await getMarketByListingId(db, mk.listingId);
      const collection = await getCollectionByContract(db, market.assetContract);
      const item = await getItemById(db, market.itemId);
      return {
        ...market,
        collection,
        item,
      };
    }),
  );
  return market.filter((mk) => {
    return (
      mk.item.name.toLowerCase().includes(search.toLowerCase()) ||
      mk.collection.name.toLowerCase().includes(search.toLowerCase())
    );
  });
}

export async function getMarketsByCollection(db: IDBPDatabase, collection: string) {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketAssetContractIndex, collection);
}

export async function getAllRawMarketsByItem(
  db: IDBPDatabase,
  itemId: string,
): Promise<IMarketData[]> {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketItemIdIndex, itemId);
}

export async function getAvailableMarketByItem(db: IDBPDatabase, itemId: string) {
  const market = await getAllRawMarketsByItem(db, itemId);
  const availableMarket = market.filter(async (mk) => {
    const status = await getMarketStatusByListingId(db, mk.listingId);
    if (status.isAvailable == 1) {
      return true;
    }
    return false;
  });
  return Promise.all(
    availableMarket.map(async (mk) => {
      const token = await getTokenByAddress(db, mk.currency);
      return {
        ...mk,
        token,
      };
    }),
  );
}

export async function getAllAvailableMarket(db: IDBPDatabase): Promise<IMarketStatusData[]> {
  return db.getAllFromIndex(dbOS.marketStatus, dbIndex.marketAvailableIndex, 1);
}

export async function getMarketStatusByListingId(
  db: IDBPDatabase,
  listingId: number,
): Promise<IMarketStatusData> {
  return db.getFromIndex(dbOS.marketStatus, dbIndex.marketListingIdIndex, listingId);
}

export const getKeyOfTrait = (attribute: IAttribute) => {
  return `${attribute.trait_type}_${attribute.value}`;
};

const getRateOfTraitInCollection = (items: IItem[]) => {
  const map = new Map();

  items
    .filter((item) => item.metadata.attributes)
    .forEach((item) => {
      item.metadata.attributes.forEach((attribute) => {
        const key = getKeyOfTrait(attribute);
        map.set(key, (map.get(key) || 0) + 1);
      });
    });

  const totalCount = items.length;
  const percentMap: { [key: string]: number } = {};

  map.forEach((count, key) => {
    const percentage = ((count / totalCount) * 100).toFixed(2);
    percentMap[key] = parseFloat(percentage);
  });

  return percentMap;
};

const getFloorOfTrait = (
  item: IItem,
  markets: Awaited<ReturnType<typeof getAllRawMarketByCollection>>,
) => {
  return item.metadata.attributes?.reduce((obj, attribute) => {
    return {
      ...obj,
      [getKeyOfTrait(attribute)]: markets
        .filter((market) =>
          market.item?.metadata?.attributes.find(
            (item) => item.trait_type === attribute.trait_type && item.value === attribute.value,
          ),
        )
        .sort((a, b) => a.price - b.price)?.[0],
    };
  }, {}) as { [key: string]: Awaited<ReturnType<typeof getAllRawMarketByCollection>>[number] };
};

export async function getMarketDetailByListingId(db: IDBPDatabase, listingId: number) {
  const status = await getMarketStatusByListingId(db, listingId);
  if (status.isAvailable !== 1) return undefined;
  const market = await getMarketByListingId(db, listingId);
  const item = await getItemById(db, market.itemId);
  const activities = await getAllActivitiesByItem(db, market.itemId);
  const collection = await getCollectionByContract(db, market.assetContract);
  const category = await getCategoryById(db, collection.category);
  const token = await getTokenByAddress(db, market.currency);
  const itemsInCollection = await getAllRawItemByCollection(db, collection.address);
  const marketInCollection = await getAllRawMarketByCollection(db, collection.address);
  const rateOfTrailInCollection = await getRateOfTraitInCollection(itemsInCollection);
  const floorOfTrail = await getFloorOfTrait(item, marketInCollection);
  const itemConvert = {
    ...item,
    metadata: {
      ...item.metadata,
      attributes: item.metadata.attributes.map((attribute) => {
        const floor = floorOfTrail?.[getKeyOfTrait(attribute)];
        return {
          ...attribute,
          floor: floor?.price,
          token: floor?.token,
          rate: rateOfTrailInCollection?.[getKeyOfTrait(attribute)],
        };
      }),
    },
  };
  const chain = Object.values(Chains)
    .map((chain) => chain)
    .find((chain) => chain.chainId === item.chain);

  return {
    ...market,
    token,
    item: itemConvert,
    activities,
    collection,
    category,
    chain,
  };
}

export async function getBestSeller(db: IDBPDatabase) {
  const activities = await getAllBuyActivities(db);
  const sellers: { [key: string]: number } = activities.reduce(
    (sellers: { [key: string]: number }, activity) => {
      const { toAddress, price, quantity } = activity;
      const totalPrice = new Decimal(price).mul(quantity).toNumber();

      // eslint-disable-next-line no-prototype-builtins
      if (!sellers.hasOwnProperty(toAddress)) {
        sellers[toAddress] = totalPrice;
      } else {
        sellers[toAddress] += totalPrice;
      }

      return sellers;
    },
    {},
  );
  return Object.keys(sellers)
    .map((seller) => {
      return {
        seller: seller,
        volume: sellers[seller],
      };
    })
    .sort((a, b) => {
      return b.volume - a.volume;
    });
}

export async function getItemMarketByCollection(
  db: IDBPDatabase,
  address: string,
  query: IPaging & ISorting & IFilter,
) {
  const marketByCollection: IMarketData[] = await getMarketsByCollection(db, address);
  const itemFilterByCollection = await generateStandardMarketAvailable(db, marketByCollection);
  const { data, total } = queryItemFactory(itemFilterByCollection, query);

  return {
    data: data,
    total: total,
  };
}

export async function getCategoryByUser(
  db: IDBPDatabase,
  owner: string,
  query: IPaging & ISorting & IFilter,
) {
  const { search, page, pageSize } = query;

  const collections = await getAllRawCollectionByOwner(db, owner);
  const categoryIds: number[] = Array.from(
    new Set(collections.map((collection) => collection.category)),
  );

  let categories = await Promise.all(
    categoryIds.map(async (id) => {
      const category = await getCategoryById(db, id);
      return category;
    }),
  );

  if (search) {
    categories = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return {
    data: categories.slice(page * pageSize, (page + 1) * pageSize),
    total: categoryIds.length,
  };
}

export async function getRawMarketItemByOwner(
  db: IDBPDatabase,
  owner: string,
): Promise<IMarketData[]> {
  return db.getAllFromIndex(dbOS.market, dbIndex.marketCreatorIndex, owner);
}

export async function getMarketItemByOwner(
  db: IDBPDatabase,
  owner: string,
  query: IPaging & ISorting & IFilter,
) {
  const marketByOwner = await getRawMarketItemByOwner(db, owner);
  const marketFilterByCollection = await generateStandardMarketAvailable(db, marketByOwner);
  const { data, total } = queryItemFactory(marketFilterByCollection, query);

  return {
    data: data,
    total: total,
  };
}

export async function getAllRawMarketByCollection(db: IDBPDatabase, address: string) {
  const rawMarket: IMarketData[] = await db.getAllFromIndex(
    dbOS.market,
    dbIndex.marketAssetContractIndex,
    address,
  );

  const marketStatus = await Promise.all(
    rawMarket.map(async (mk) => {
      const status = await getMarketStatusByListingId(db, mk.listingId);
      return {
        ...mk,
        status,
      };
    }),
  );
  const availableMarket = marketStatus.filter((mk) => mk.status.isAvailable == 1);

  return Promise.all(
    availableMarket.map(async (mk) => {
      const item = await getItemById(db, mk.itemId);
      const token = await getTokenByAddress(db, mk.currency);
      return {
        ...mk,
        item,
        token,
      };
    }),
  );
}
