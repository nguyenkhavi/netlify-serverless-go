//THIRD PARTY MODULES
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

export default function BurnNFT() {
  const { hideDialog } = dialogMyItemCardStore();

  return (
    <div>
      <h2 className="text-body2 md:text-h6">Burn NFT</h2>
      <p className="mt-1 text-body3 text-text-50 md:text-body1">
        Are you sure you want to delete/burn this NFT? This action cannot be undone. Your NFT will
        be deleted
      </p>
      <Button className="btnmd mt-4">Burn NFT</Button>
      <Button className="btnmd mt-2 md:mt-4" variant="outlined" onClick={hideDialog}>
        Cancel
      </Button>
    </div>
  );
}
