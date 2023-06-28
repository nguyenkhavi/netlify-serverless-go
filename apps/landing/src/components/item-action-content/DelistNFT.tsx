//THIRD PARTY MODULES
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

export default function DelistNFT() {
  const { hideDialog } = dialogMyItemCardStore();

  return (
    <div>
      <h2 className="text-body2 md:text-h6">Delist NFT</h2>
      <p className="mt-1 text-body3 text-text-50 md:text-body1">
        Do you really want to remove your NFT from sale? <br /> <br />
        If you delist this item it would no longer be visible for sale on the Fleamint marketplace
      </p>
      <Button className="btnmd mt-4">Delist NFT</Button>
      <Button className="btnmd mt-2 md:mt-4" variant="outlined" onClick={hideDialog}>
        Cancel
      </Button>
    </div>
  );
}
