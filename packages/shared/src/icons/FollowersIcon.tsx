function FollowersIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
      {...props}
    >
      <g>
        <path
          fill="#B9BABD"
          fillRule="evenodd"
          d="M8.203 1.834a3.333 3.333 0 100 6.667 3.333 3.333 0 000-6.667zm0 7.333c-1.597 0-3.05.463-4.119 1.114-.533.327-.989.71-1.318 1.127-.324.41-.563.901-.563 1.426 0 .563.274 1.007.669 1.324.373.3.866.499 1.39.637 1.051.278 2.455.372 3.941.372.153 0 .307-.001.457-.003a.666.666 0 00.593-.952 3.982 3.982 0 01-.383-1.711c0-.835.255-1.608.691-2.249a.667.667 0 00-.48-1.038 8.26 8.26 0 00-.878-.047zm7.139 2.046a.667.667 0 00-.943-.943l-2.121 2.121-.943-.942a.666.666 0 00-.943.942l1.367 1.367a.733.733 0 001.037 0l2.546-2.545z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}

export function FollowersActiveIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
      {...props}
    >
      <g clipPath="url(#clip0_6226_109381)">
        <path
          fill="url(#paint0_linear_6226_109381)"
          fillRule="evenodd"
          d="M8.203 1.834a3.333 3.333 0 100 6.667 3.333 3.333 0 000-6.667zm0 7.333c-1.597 0-3.05.463-4.119 1.114-.533.327-.989.71-1.318 1.127-.324.41-.563.901-.563 1.426 0 .563.274 1.007.669 1.324.373.3.866.499 1.39.637 1.051.278 2.455.372 3.941.372.153 0 .307-.001.457-.003a.666.666 0 00.593-.952 3.982 3.982 0 01-.383-1.711c0-.835.255-1.608.691-2.249a.667.667 0 00-.48-1.038 8.26 8.26 0 00-.878-.047zm7.139 2.046a.667.667 0 00-.943-.943l-2.121 2.121-.943-.942a.666.666 0 00-.943.942l1.367 1.367a.733.733 0 001.037 0l2.546-2.545z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_6226_109381"
          x1="1.336"
          x2="14.662"
          y1="8.002"
          y2="8.002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <clipPath id="clip0_6226_109381">
          <path fill="#fff" d="M0 0H16V16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default FollowersIcon;
