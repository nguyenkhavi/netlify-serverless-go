interface Dimension {
  width: number;
  height: number;
}

function getPopupOffset({ width, height }: Dimension): { top: number; left: number } {
  const wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  const wTop = window.screenTop ? window.screenTop : window.screenY;

  const left = wLeft + window.innerWidth / 2 - width / 2;
  const top = wTop + window.innerHeight / 2 - height / 2;

  return { top, left };
}

function getPopupDimensions({ width, height }: Dimension): string {
  const { top, left } = getPopupOffset({ width, height });

  return `width=${width},height=${height},top=${top},left=${left}`;
}

export function openPopup({
  width,
  height,
  url,
  name,
}: Dimension & {
  url: string;
  name: string;
}): Window | null {
  const settings =
    'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no';

  return window.open(url, name, `${settings},${getPopupDimensions({ width, height })}`);
}
