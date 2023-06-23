export default function MyItemIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 20 20"
      color="#A2A4A7"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10.001 0c-.5 0-1 .19-1.41.59l-3.3 3.29 4.71 4.699 4.71-4.7-3.3-3.29C11.001.19 10.501 0 10.001 0zM3.882 5.29L.592 8.588c-.79.78-.79 2.04 0 2.82l3.29 3.3 4.7-4.71-4.7-4.71zm12.238 0l-4.699 4.709 4.7 4.71 3.29-3.3c.789-.78.789-2.04 0-2.82l-3.29-3.3zm-6.119 6.129l-4.71 4.699 3.3 3.29c.78.79 2.04.79 2.82 0l3.3-3.29-4.71-4.7z"
      ></path>
    </svg>
  );
}

export function MyItemActiveIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 25 25"
      {...props}
    >
      <path
        fill="url(#paint0_linear_5790_35434)"
        d="M12.751 2.02c-.5 0-1 .19-1.41.59l-3.3 3.289 4.71 4.7 4.71-4.7-3.3-3.29c-.41-.4-.91-.59-1.41-.59zM6.632 7.309l-3.29 3.3c-.79.78-.79 2.04 0 2.82l3.29 3.299 4.7-4.71-4.7-4.71zm12.238 0l-4.699 4.71 4.7 4.709 3.29-3.3c.789-.78.789-2.04 0-2.82l-3.29-3.3zm-6.119 6.13l-4.71 4.698 3.3 3.29c.78.79 2.04.79 2.82 0l3.3-3.29-4.71-4.699z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5790_35434"
          x1="2.75"
          x2="22.753"
          y1="12.023"
          y2="12.023"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
