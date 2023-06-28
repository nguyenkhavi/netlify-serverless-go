//THIRD PARTY MODULES
import { dialogMyItemCardStore } from '_@landing/stores/dialogStore';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';

export default function ConfirmAddress() {
  const { hideDialog } = dialogMyItemCardStore();

  return (
    <div className="text-center">
      <h2 className="text-h6">Confirm Address</h2>
      <p className="mt-1 text-body1 text-text-50">Are you sure this address is correct?</p>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button className="btnmd" variant="outlined" onClick={hideDialog}>
          No
        </Button>
        <Button className="btnmd">Yes</Button>
      </div>
    </div>
  );
}
