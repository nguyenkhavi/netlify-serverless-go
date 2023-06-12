//THIRD PARTY MODULES
import { IDBPDatabase } from 'idb';
import { ContractEvent, ThirdwebSDK } from '@thirdweb-dev/react';
import { ContractEventNames, parseJson } from '_@landing/utils/constants';
import {
  IChain,
  ICollection,
  IItem,
  IMetadata,
  IMetadataNFT,
  INewProxyDeployed,
  ListenerService,
  NFTType,
} from '_@landing/utils/type';
//RELATIVE MODULES
import { addCollection, addItem, updateLastBlock } from '../services';

export async function handleNewCollections(
  sdk: ThirdwebSDK,
  chain: IChain,
  db: IDBPDatabase<unknown>,
  event: ContractEvent<INewProxyDeployed>,
) {
  const collectionContract = await sdk.getContract(event.data.proxy, 'nft-collection');
  const metadata: IMetadata = await collectionContract.app.metadata.get();
  const appURI = await parseJson(metadata.app_uri);
  // if (!appURI || !appURI.app || appURI.app !== 'Fleamint') return;
  const data: ICollection = {
    address: event.data.proxy,
    chain: chain.chainId,
    owner: event.data.deployer,
    category: appURI?.category || 1,
    name: metadata.name as string,
    type: NFTType.ERC721,
    metadata: metadata,
  };

  await addCollection(db, data);
  sdk.emit(ContractEventNames.newCollections, event.data.proxy);
}
