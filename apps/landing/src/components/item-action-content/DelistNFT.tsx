//THIRD PARTY MODULES
import { BigNumber } from 'ethers';
import { Chains } from '_@landing/utils/constants';
import { useQueryClient } from '@tanstack/react-query';
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
import {
  useCancelDirectListing,
  useChainId,
  useContract,
  useSDK,
  useSigner,
} from '@thirdweb-dev/react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import { toastAction } from '_@shared/stores/toast/toastStore';
//RELATIVE MODULES
import { ListingProps } from './type';

export default function DelistNFT({ listingId }: ListingProps) {
  const queryClient = useQueryClient();
  const { hideDialog } = dialogMyItemCardStore();
  const chainId = useChainId();
  const sdk = useSDK();
  const signer = useSigner();
  const chain =
    Object.values(Chains).find((chain) => chain.chainId == chainId?.toString()) || Chains.sepolia;
  const { contract } = useContract(chain.marketContract, 'marketplace-v3');
  const { mutateAsync: cancelListing, isLoading } = useCancelDirectListing(contract);
  const handleDelist = async () => {
    if (!chain || !sdk || !signer || listingId == undefined || !cancelListing) return;
    await cancelListing(BigNumber.from(listingId));
    queryClient.invalidateQueries(['getItemByOwner']);
    toastAction.openToast('Delist success', 'success');
    hideDialog();
  };
  return (
    <div>
      <h2 className="text-body2 md:text-h6">Delist NFT</h2>
      <p className="mt-1 text-body3 text-text-50 md:text-body1">
        Do you really want to remove your NFT from sale? <br /> <br />
        If you delist this item it would no longer be visible for sale on the Fleamint marketplace
      </p>
      <Button isLoading={isLoading} onClick={handleDelist} className="btnmd mt-4">
        Delist NFT
      </Button>
      <Button
        disabled={isLoading}
        className="btnmd mt-2 md:mt-4"
        variant="outlined"
        onClick={hideDialog}
      >
        Cancel
      </Button>
    </div>
  );
}
