//SHARED
import { toastAction } from '_@shared/stores/toast/toastStore';

export default async function errorHandler(err: Error, setError: Function) {
  if (typeof err?.message !== 'string') return;
  const errors = await new Promise((resolve) => {
    return resolve(JSON.parse(err.message));
  }).catch(() => null);

  if (Array.isArray(errors)) {
    errors.forEach((err) => {
      const path = err.path[0];
      setError(path === 'phone' ? 'phone.phoneNumber' : path, {
        type: 'manual',
        message: err.message,
      });
    });
  } else {
    toastAction.openToast(err?.message, 'error');
  }
}
