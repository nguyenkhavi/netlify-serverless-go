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

export function HeartActiveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="none" viewBox="0 0 33 33">
      <g filter="url(#filter0_d_5384_28632)">
        <path
          fill="url(#paint0_linear_5384_28632)"
          d="M16.008 22.5H16c-1.542-.03-5.992-4.303-5.992-8.35 0-1.943 1.507-3.65 3.226-3.65 1.367 0 2.287 1.002 2.774 1.732.486-.728 1.405-1.732 2.773-1.732 1.72 0 3.227 1.707 3.227 3.651 0 4.046-4.45 8.318-5.993 8.348h-.007v.001z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_5384_28632"
          width="32"
          height="32"
          x="0.008"
          y="0.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset></feOffset>
          <feGaussianBlur stdDeviation="5"></feGaussianBlur>
          <feColorMatrix values="0 0 0 0 0.0980392 0 0 0 0 0.792157 0 0 0 0 0.607843 0 0 0 1 0"></feColorMatrix>
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_5384_28632"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_5384_28632" result="shape"></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_5384_28632"
          x1="10.008"
          x2="22"
          y1="16.5"
          y2="16.5"
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
