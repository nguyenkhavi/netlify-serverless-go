//SHARED
import { ToastProps } from '_@shared/stores/toast/toastStore';
//RELATIVE MODULES
import { TDataCheckout } from './type';

export function handleAddToCart(
  value: TDataCheckout,
  openToast: (message: string, type: ToastProps['type']) => void,
) {
  let cartValues: TDataCheckout[] = [];

  if (window.localStorage.getItem('cart')) {
    cartValues = JSON.parse(window.localStorage.getItem('cart') || '');
  }

  if (cartValues.find((item) => item.listingId === value.listingId)) {
    openToast('Item already in cart', 'error');
    return;
  }

  cartValues.push(value);
  window.localStorage.setItem('cart', JSON.stringify(cartValues));

  openToast('Add to cart successfully', 'success');
}
