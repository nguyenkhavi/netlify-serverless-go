//THIRD PARTY MODULES
import { ReactNode, useCallback, useEffect } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/Button';
import { openPopup } from '_@landing/components/provider/instagram/popup';
import { getQueryVariable } from '_@landing/components/provider/instagram/url';
//RELATIVE MODULES
import { Error } from './type';

interface Props {
  tag?: string;
  type?: string;
  scope?: string;
  width?: number;
  height?: number;
  clientId: string;
  cssClass?: string;
  buttonText?: string;
  children?: ReactNode;
  redirectUri?: string;
  useRedirect?: boolean;
  implicitAuth?: boolean;
  onFailure: (error: Error) => void;
  onSuccess: (response: string | null) => void;
}

export function ConnectInstagram({
  clientId,
  redirectUri,
  onFailure,
  onSuccess,
  scope = 'user_profile',
  ...rest
}: Props) {
  const { width, height, implicitAuth, useRedirect } = {
    ...rest,
    width: 400,
    height: 800,
    useRedirect: false,
    implicitAuth: false,
  };

  const checkInstagramAuthentication = useCallback(
    (context: Window) => {
      const { location } = context;
      if (implicitAuth) {
        const [, matchedUrl] = location.hash.match(/=(.*)/) || [];
        if (matchedUrl) {
          onSuccess(matchedUrl);
          return true;
        }
      } else if (location.search.includes('code')) {
        onSuccess(getQueryVariable(location, 'code'));
        return true;
      } else if (location.search.includes('error')) {
        onFailure({
          error: getQueryVariable(location, 'error'),
          error_reason: getQueryVariable(location, 'error_reason'),
          error_description: getQueryVariable(location, 'error_description'),
        });
        return true;
      }

      return false;
    },
    [implicitAuth, onFailure, onSuccess],
  );

  const onCredentialsChanged = (
    popup: Window | null,
    resolve?: (value: Record<string, unknown> | string) => void,
    reject?: () => void,
  ): Promise<Record<string, unknown> | string> | void => {
    const error = {
      error: 'closed',
      error_reason: 'oauth_canceled',
      error_description: 'User canceled the authentication',
    };
    if (popup == null) {
      onFailure(error);
      return;
    }
    if (!resolve) {
      return new Promise((res, rej) => onCredentialsChanged(popup, res, rej));
    }
    let isFinished;
    try {
      isFinished = checkInstagramAuthentication(popup);
    } catch (err) {
      // An exception is thrown when we try to access to another website's url
    }

    if (isFinished) {
      popup.close();
    } else if (popup.closed) {
      onFailure(error);
    } else {
      setTimeout(() => onCredentialsChanged(popup, resolve, reject), 0);
    }
  };

  const oAuthSignIn = ({ url, tab = false }: { url: string; tab?: boolean }) => {
    const name = tab ? '_blank' : 'instagram';
    const popup = openPopup({ url, name, width, height });
    onCredentialsChanged(popup);
  };

  const onButtonClicked = () => {
    const _redirectUri = redirectUri || window.location.href;
    const responseType = implicitAuth ? 'token' : 'code';
    const url = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${_redirectUri}&response_type=${responseType}&scope=${scope}`;
    if (useRedirect) {
      window.location.href = url;
    } else {
      oAuthSignIn({ url });
    }
  };

  useEffect(() => {
    checkInstagramAuthentication(window);
  }, [checkInstagramAuthentication]);

  return (
    <Button onClick={onButtonClicked} className="btnsm w-max">
      Connect
    </Button>
  );
}
