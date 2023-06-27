//THIRD PARTY MODULES
import NFTABI from '_@landing/utils/NFTABI';
import { useQueryClient } from '@tanstack/react-query';
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
import { useBurnNFT, useContract, useSDK, useSigner } from '@thirdweb-dev/react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
//SHARED
import { toastAction } from '_@shared/stores/toast/toastStore';
//RELATIVE MODULES
import { NFTDataProps } from './type';

export default function BurnNFT({ assetContract, tokenId }: NFTDataProps) {
  const queryClient = useQueryClient();

  const { hideDialog } = dialogMyItemCardStore();
  const sdk = useSDK();
  const signer = useSigner();
  const { contract } = useContract(assetContract, 'nft-collection');
  const { mutateAsync: burn, isLoading } = useBurnNFT(contract);

  const handleBurnNFT = async () => {
    if (!sdk || !signer || !burn || tokenId == undefined || !assetContract) return;
    await burn({ tokenId, amount: 1 });
    queryClient.invalidateQueries(['getItemByOwner']);
    toastAction.openToast('Burn NFT success', 'success');
    hideDialog();
  };
  return (
    <div>
      <h2 className="text-body2 md:text-h6">Burn NFT</h2>
      <p className="mt-1 text-body3 text-text-50 md:text-body1">
        Are you sure you want to delete/burn this NFT? This action cannot be undone. Your NFT will
        be deleted
      </p>
      <Button isLoading={isLoading} onClick={handleBurnNFT} className="btnmd mt-4">
        Burn NFT
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
