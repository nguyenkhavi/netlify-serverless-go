//SHARED
import { toastAction } from '_@shared/stores/toast/toastStore';

interface CustomError extends Error {
  code: number;
}

const conflictMap = {
  CONFLICT_EMAIL: {
    message: 'The email has already existed',
    path: 'email',
  },
  CONFLICT_PHONE: {
    message: 'The phone number has already existed',
    path: 'phone.phoneNumber',
  },
};

export default async function errorHandler(err: CustomError, setError: Function) {
  //"Magic RPC Error: [-10011] User canceled login"
  if (err.code === -10011) return;
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
  } else if (err.message.includes('CONFLICT')) {
    const conflict = conflictMap?.[err.message as keyof typeof conflictMap];
    if (conflict) {
      setError(conflict.path, {
        type: 'manual',
        message: conflict.message,
      });
    }
  } else {
    toastAction.openToast(err?.message, 'error');
  }
}
