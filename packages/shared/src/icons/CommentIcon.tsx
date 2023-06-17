function CommentIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        d="M8.008 2.75c3.31 0 6 2.69 6 6s-2.69 6-6 6h-6v-6c0-3.31 2.69-6 6-6zm-5 11h5c2.755 0 5-2.245 5-5s-2.245-5-5-5-5 2.245-5 5v5z"
      ></path>
    </svg>
  );
}

export default CommentIcon;

export function CommentActiveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="none" viewBox="0 0 33 33">
      <g filter="url(#filter0_d_5384_38062)">
        <path fill="url(#paint0_linear_5384_38062)" d="M10.008 16.501v6h6a6 6 0 10-6-6z"></path>
      </g>
      <defs>
        <filter
          id="filter0_d_5384_38062"
          width="32"
          height="32"
          x="0.008"
          y="0.501"
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_5384_38062"></feBlend>
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_5384_38062" result="shape"></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear_5384_38062"
          x1="10.008"
          x2="22"
          y1="16.501"
          y2="16.501"
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
