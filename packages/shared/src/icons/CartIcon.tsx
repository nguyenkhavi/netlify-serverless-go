export default function CartIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  const isColorDefault = props.color === undefined || props.color === 'default' ? true : false;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill={isColorDefault ? 'url(#paint0_linear_5077_5054)' : 'currentColor'}
        d="M19.404 3.398a2.55 2.55 0 00-.881-.663 2.611 2.611 0 00-1.087-.235H3.624l-.036-.292A2.481 2.481 0 002.746.632 2.6 2.6 0 001.044 0h-.19A.865.865 0 00.25.244a.823.823 0 00-.25.59c0 .22.09.432.25.589.16.156.378.244.604.244h.19c.21 0 .411.075.568.21a.827.827 0 01.28.526l1.176 9.75a4.135 4.135 0 001.403 2.628 4.333 4.333 0 002.84 1.053h8.92a.865.865 0 00.605-.244.823.823 0 000-1.178.865.865 0 00-.604-.244H7.31a2.607 2.607 0 01-1.475-.461A2.507 2.507 0 014.9 12.5h10.183a4.336 4.336 0 002.74-.97 4.146 4.146 0 001.464-2.458l.67-3.628c.068-.36.053-.73-.043-1.084a2.474 2.474 0 00-.511-.963zm-1.122 1.75l-.672 3.63a2.488 2.488 0 01-.88 1.475 2.602 2.602 0 01-1.646.581H4.63l-.803-6.667h13.61a.872.872 0 01.66.297.828.828 0 01.186.685z"
      ></path>
      <path
        fill={isColorDefault ? 'url(#paint1_linear_5077_5054)' : 'currentColor'}
        d="M5.982 20.002c.944 0 1.709-.747 1.709-1.667s-.765-1.667-1.709-1.667c-.944 0-1.709.746-1.709 1.667 0 .92.765 1.667 1.709 1.667z"
      ></path>
      <path
        fill={isColorDefault ? 'url(#paint2_linear_5077_5054)' : 'currentColor'}
        d="M14.529 20.002c.944 0 1.709-.747 1.709-1.667s-.765-1.667-1.71-1.667c-.943 0-1.708.746-1.708 1.667 0 .92.765 1.667 1.709 1.667z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_5077_5054"
          x1="19.459"
          x2="0"
          y1="7.92"
          y2="7.92"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_5077_5054"
          x1="7.598"
          x2="4.273"
          y1="18.335"
          y2="18.335"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3EDEB5"></stop>
          <stop offset="0.16" stopColor="#47DEB8"></stop>
          <stop offset="0.44" stopColor="#61DFBE"></stop>
          <stop offset="0.78" stopColor="#8AE0C9"></stop>
          <stop offset="0.99" stopColor="#A7E1D1"></stop>
        </linearGradient>
        <linearGradient
          id="paint2_linear_5077_5054"
          x1="16.145"
          x2="12.82"
          y1="18.335"
          y2="18.335"
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
