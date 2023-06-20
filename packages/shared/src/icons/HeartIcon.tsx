function HeartIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
      {...props}
    >
      <path
        fill="#8B8E92"
        d="M8.008 14.501H8c-1.542-.03-5.992-4.303-5.992-8.35 0-1.943 1.507-3.65 3.226-3.65 1.367 0 2.287 1.002 2.774 1.732.486-.728 1.405-1.732 2.773-1.732 1.72 0 3.227 1.707 3.227 3.651 0 4.045-4.45 8.318-5.993 8.348h-.007v.001zM5.234 3.453c-1.242 0-2.33 1.262-2.33 2.7 0 3.642 4.2 7.357 5.105 7.396.906-.039 5.105-3.754 5.105-7.396 0-1.438-1.089-2.7-2.33-2.7-1.51 0-2.353 1.863-2.36 1.881-.137.357-.69.357-.828 0-.009-.019-.852-1.88-2.362-1.88z"
      ></path>
    </svg>
  );
}

export default HeartIcon;

export function HeartActiveIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="url(#paint0_linear_5538_108415)"
        d="M8 14.352h-.008C6.45 14.322 2 10.05 2 6.003c0-1.944 1.508-3.65 3.226-3.65 1.367 0 2.287 1.002 2.774 1.732.486-.729 1.406-1.732 2.773-1.732 1.72 0 3.227 1.706 3.227 3.65 0 4.046-4.45 8.318-5.993 8.348h-.006v.001z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5538_108415"
          x1="2"
          x2="13.993"
          y1="8.353"
          y2="8.353"
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
